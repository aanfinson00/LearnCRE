import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react';
import { AuthProvider } from './cloud/auth';
import { useCloudSync } from './cloud/useCloudSync';
import { SideNav } from './components/SideNav';
import { ClaimLocalProfile } from './components/ClaimLocalProfile';
import { WelcomeModal } from './components/WelcomeModal';
import { AchievementToastHost } from './components/AchievementToast';
import { FeedbackButton } from './components/FeedbackButton';
import { ScratchSheet } from './components/ScratchSheet';
import { FeedbackContextProvider } from './hooks/useFeedbackContext';
import { ScratchSheetProvider } from './hooks/useScratchSheet';
import { hasSeenWelcome, markEnteredApp } from './storage/onboarding';
import { currentAppPath, navigateToMode, useAppRoute, type Mode } from './router';
import { RouteFallback } from './components/RouteFallback';
import { trackPageview } from './analytics';

// ---------------------------------------------------------------------------
// Standalone (non-shell) routes: public profiles, invites, admin, unsubscribe.
// These always use real paths; they're links from emails and shares.

const PublicProfile = lazy(() =>
  import('./components/PublicProfile').then((m) => ({ default: m.PublicProfile })),
);
const UnsubscribePage = lazy(() =>
  import('./components/NotificationPreferencesCard').then((m) => ({ default: m.UnsubscribePage })),
);
const AdminSubmissionsScreen = lazy(() =>
  import('./components/AdminSubmissionsScreen').then((m) => ({
    default: m.AdminSubmissionsScreen,
  })),
);
const AdminCurriculumScreen = lazy(() =>
  import('./components/AdminCurriculumScreen').then((m) => ({ default: m.AdminCurriculumScreen })),
);
const CohortInviteLanding = lazy(() =>
  import('./components/CohortInviteLanding').then((m) => ({ default: m.CohortInviteLanding })),
);
const MatchInviteLanding = lazy(() =>
  import('./components/MatchInviteLanding').then((m) => ({ default: m.MatchInviteLanding })),
);

const PUBLIC_PROFILE_RE = /^\/u\/([a-z0-9_-]{3,24})\/?$/i;
const COHORT_INVITE_RE = /^\/c\/([a-z0-9-]{3,32})\/?$/i;
const MATCH_INVITE_RE =
  /^\/m\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i;

function specialRoute() {
  const path = window.location.pathname;
  const clean = path.replace(/\/+$/, '');
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token')?.trim() || null;

  const profile = path.match(PUBLIC_PROFILE_RE);
  if (profile) return <PublicProfile handle={profile[1].toLowerCase()} />;

  if (clean === '/unsubscribe' && token) return <UnsubscribePage token={token} />;
  if (clean === '/admin/submissions') return <AdminSubmissionsScreen />;
  if (clean === '/admin/curriculum') return <AdminCurriculumScreen />;

  const cohort = path.match(COHORT_INVITE_RE);
  if (cohort && token) return <CohortInviteLanding slug={cohort[1].toLowerCase()} token={token} />;

  const match = path.match(MATCH_INVITE_RE);
  if (match && token) return <MatchInviteLanding matchId={match[1].toLowerCase()} token={token} />;

  return null;
}

export default function AppRoot({ quickStart = false }: { quickStart?: boolean }) {
  const special = specialRoute();
  return (
    <AuthProvider>
      {special ? (
        <Suspense fallback={<RouteFallback />}>{special}</Suspense>
      ) : (
        <AppShell quickStart={quickStart} />
      )}
    </AuthProvider>
  );
}

// ---------------------------------------------------------------------------
// The main app shell. Each mode is its own lazily loaded chunk.

const named = <K extends string>(loader: () => Promise<Record<K, ComponentType<any>>>, key: K) =>
  lazy(() => loader().then((m) => ({ default: m[key] })));

const QuizMode = lazy(() => import('./modes/QuizMode'));
const SpeedDrillMode = lazy(() => import('./modes/SpeedDrillMode'));
const VocabMode = lazy(() => import('./modes/VocabMode'));
const WalkthroughMode = lazy(() => import('./modes/WalkthroughMode'));
const SituationalMode = lazy(() => import('./modes/SituationalMode'));
const LongformMode = lazy(() => import('./modes/LongformMode'));
const ExcelMode = lazy(() => import('./modes/ExcelMode'));
const ModelingTestMode = lazy(() => import('./modes/ModelingTestMode'));
const MockInterviewMode = lazy(() => import('./modes/MockInterviewMode'));
const CertifyMode = lazy(() => import('./modes/CertifyMode'));

/** Screens that are a single component taking `onBack`. */
const SIMPLE_SCREENS: Partial<Record<Mode, ComponentType<{ onBack: () => void }>>> = {
  study: named(() => import('./components/StudyScreen'), 'StudyScreen'),
  daily: named(() => import('./components/DailyChallengeScreen'), 'DailyChallengeScreen'),
  weekly: named(() => import('./components/WeeklyChallengeScreen'), 'WeeklyChallengeScreen'),
  leaderboards: named(() => import('./components/LeaderboardScreen'), 'LeaderboardScreen'),
  friends: named(() => import('./components/FriendsFeedScreen'), 'FriendsFeedScreen'),
  cohorts: named(() => import('./components/CohortsScreen'), 'CohortsScreen'),
  headToHead: named(() => import('./components/HeadToHeadScreen'), 'HeadToHeadScreen'),
  submitQuestion: named(() => import('./components/QuestionSubmitScreen'), 'QuestionSubmitScreen'),
  feedbackReview: named(() => import('./components/FeedbackReviewScreen'), 'FeedbackReviewScreen'),
  profile: named(() => import('./components/ProfileScreen'), 'ProfileScreen'),
};

const MODE_TITLES: Record<Mode, string> = {
  quiz: 'Quiz',
  speedDrill: 'Speed drill',
  vocab: 'Vocab',
  walkthrough: 'Walkthroughs',
  situational: 'Situational cases',
  longform: 'Case study',
  excel: 'Excel drills',
  modelingTest: 'Modeling tests',
  mockInterview: 'Mock interview',
  daily: 'Daily challenge',
  weekly: 'Weekly themes',
  leaderboards: 'Leaderboards',
  friends: 'Friends',
  cohorts: 'Cohorts',
  headToHead: 'Head-to-head',
  study: 'Study tables',
  submitQuestion: 'Submit a question',
  feedbackReview: 'Feedback studio',
  certify: 'Certifications',
  profile: 'Profile',
};

function AppShell({ quickStart }: { quickStart: boolean }) {
  useCloudSync();
  const route = useAppRoute();
  const [showWelcome, setShowWelcome] = useState<boolean>(() => !hasSeenWelcome());
  // Quick start only applies to the first quiz mount after the landing CTA.
  const [pendingQuickStart, setPendingQuickStart] = useState(quickStart);

  useEffect(() => {
    markEnteredApp();
  }, []);

  // One pageview per distinct URL (cert list → detail → exam each count).
  const path = currentAppPath();
  useEffect(() => {
    document.title = `${MODE_TITLES[route.mode]} · LearnCRE`;
    trackPageview(path, { mode: route.mode });
  }, [path, route.mode]);

  useEffect(() => {
    if (pendingQuickStart && route.mode !== 'quiz') setPendingQuickStart(false);
  }, [route.mode, pendingQuickStart]);

  const back = () => navigateToMode('quiz');

  const content = (() => {
    const Simple = SIMPLE_SCREENS[route.mode];
    if (Simple) return <Simple onBack={back} />;
    switch (route.mode) {
      case 'speedDrill':
        return <SpeedDrillMode />;
      case 'vocab':
        return <VocabMode />;
      case 'walkthrough':
        return <WalkthroughMode />;
      case 'situational':
        return <SituationalMode />;
      case 'longform':
        return <LongformMode />;
      case 'excel':
        return <ExcelMode />;
      case 'modelingTest':
        return <ModelingTestMode />;
      case 'mockInterview':
        return <MockInterviewMode />;
      case 'certify':
        return <CertifyMode view={route.cert} />;
      default:
        return <QuizMode quickStart={pendingQuickStart} />;
    }
  })();

  return (
    <FeedbackContextProvider>
      <ScratchSheetProvider>
        <SideNav active={route.mode} onSwitch={(m) => navigateToMode(m)} />
        <main className="lg:pl-56">
          <div className="px-4 sm:px-6">
            {/* Keyed by mode so switching modes starts that mode fresh. */}
            <Suspense key={route.mode} fallback={<RouteFallback />}>
              {content}
            </Suspense>
          </div>
        </main>
        {showWelcome && (
          <WelcomeModal
            onSkip={() => setShowWelcome(false)}
            onStartQuiz={() => {
              setShowWelcome(false);
              navigateToMode('quiz');
            }}
          />
        )}
        <AchievementToastHost />
        <ScratchSheet />
        <FeedbackButton />
        <ClaimLocalProfile />
      </ScratchSheetProvider>
    </FeedbackContextProvider>
  );
}
