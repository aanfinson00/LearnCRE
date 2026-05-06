import { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { SpeedDrillSetup } from './components/SpeedDrillSetup';
import { SpeedDrillScreen } from './components/SpeedDrillScreen';
import { SpeedDrillResults } from './components/SpeedDrillResults';
import { ProfileScreen } from './components/ProfileScreen';
import { StudyScreen } from './components/StudyScreen';
import { SideNav } from './components/SideNav';
import { ClaimLocalProfile } from './components/ClaimLocalProfile';
import { DailyChallengeScreen } from './components/DailyChallengeScreen';
import { WeeklyChallengeScreen } from './components/WeeklyChallengeScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { FriendsFeedScreen } from './components/FriendsFeedScreen';
import { CohortsScreen } from './components/CohortsScreen';
import { HeadToHeadScreen } from './components/HeadToHeadScreen';
import { QuestionSubmitScreen } from './components/QuestionSubmitScreen';
import { AdminSubmissionsScreen } from './components/AdminSubmissionsScreen';
import { UnsubscribePage } from './components/NotificationPreferencesCard';
import { PublicProfile } from './components/PublicProfile';
import { useCloudSync } from './cloud/useCloudSync';

const PUBLIC_PROFILE_RE = /^\/u\/([a-z0-9_-]{3,24})\/?$/i;

/** Returns the handle when the current URL is /u/<handle>, else null. */
function detectPublicProfileHandle(): string | null {
  if (typeof window === 'undefined') return null;
  const m = window.location.pathname.match(PUBLIC_PROFILE_RE);
  return m ? m[1].toLowerCase() : null;
}

/** Returns the unsubscribe token when the current URL is /unsubscribe?token=…, else null. */
function detectUnsubscribeToken(): string | null {
  if (typeof window === 'undefined') return null;
  if (window.location.pathname.replace(/\/+$/, '') !== '/unsubscribe') return null;
  const t = new URLSearchParams(window.location.search).get('token');
  return t && t.trim() ? t.trim() : null;
}

/** True when the current URL is /admin/submissions (with optional trailing slash). */
function isAdminSubmissionsRoute(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.replace(/\/+$/, '') === '/admin/submissions';
}
import { WelcomeModal } from './components/WelcomeModal';
import { hasSeenWelcome } from './storage/onboarding';
import { AchievementToastHost } from './components/AchievementToast';
import { FeedbackButton } from './components/FeedbackButton';
import { FeedbackContextProvider } from './hooks/useFeedbackContext';
import { ScratchSheet } from './components/ScratchSheet';
import { ScratchSheetProvider } from './hooks/useScratchSheet';
import { WalkthroughSetup } from './components/WalkthroughSetup';
import { WalkthroughScreen } from './components/WalkthroughScreen';
import { WalkthroughResults } from './components/WalkthroughResults';
import { SituationalSetup } from './components/SituationalSetup';
import { SituationalScreen } from './components/SituationalScreen';
import { SituationalResults } from './components/SituationalResults';
import { ExcelSetup } from './components/ExcelSetup';
import { ExcelScreen } from './components/ExcelScreen';
import { ExcelResults } from './components/ExcelResults';
import { LongformSetup } from './components/LongformSetup';
import { LongformScreen } from './components/LongformScreen';
import { LongformResults } from './components/LongformResults';
import { VocabSetup } from './components/VocabSetup';
import { VocabScreen } from './components/VocabScreen';
import { VocabResults } from './components/VocabResults';
import { MockSetup } from './components/MockSetup';
import { MockScreen } from './components/MockScreen';
import { MockResults } from './components/MockResults';
import { ModelingTestSetup } from './components/ModelingTestSetup';
import { ModelingTestScreen } from './components/ModelingTestScreen';
import { ModelingTestResults } from './components/ModelingTestResults';
import { CertListScreen } from './components/CertListScreen';
import { CertDetailScreen, type CertMode } from './components/CertDetailScreen';
import { FinalExamScreen } from './components/FinalExamScreen';
import { useQuizSession } from './hooks/useQuizSession';
import { useSpeedDrill } from './hooks/useSpeedDrill';
import { useWalkthrough } from './hooks/useWalkthrough';
import { useSituational } from './hooks/useSituational';
import { useExcel } from './hooks/useExcel';
import { useLongform } from './hooks/useLongform';
import { useVocab } from './hooks/useVocab';
import { useMockInterview } from './hooks/useMockInterview';
import { useModelingTest } from './hooks/useModelingTest';

type Mode =
  | 'quiz'
  | 'speedDrill'
  | 'study'
  | 'walkthrough'
  | 'situational'
  | 'excel'
  | 'longform'
  | 'vocab'
  | 'mockInterview'
  | 'modelingTest'
  | 'certify'
  | 'profile'
  | 'daily'
  | 'weekly'
  | 'leaderboards'
  | 'friends'
  | 'cohorts'
  | 'headToHead'
  | 'submitQuestion';

type CertView =
  | { kind: 'list' }
  | { kind: 'detail'; certId: string }
  | { kind: 'exam'; certId: string };

export default function App() {
  const publicHandle = detectPublicProfileHandle();
  if (publicHandle) return <PublicProfile handle={publicHandle} />;

  const unsubscribeToken = detectUnsubscribeToken();
  if (unsubscribeToken) return <UnsubscribePage token={unsubscribeToken} />;

  if (isAdminSubmissionsRoute()) return <AdminSubmissionsScreen />;

  return <AppShell />;
}

function AppShell() {
  useCloudSync();
  const [mode, setMode] = useState<Mode>('quiz');
  const [certView, setCertView] = useState<CertView>({ kind: 'list' });
  const [showWelcome, setShowWelcome] = useState<boolean>(() => !hasSeenWelcome());
  const { session, stats, start, submit, next, reset, endSession, enterReview, exitReview } =
    useQuizSession();
  const drill = useSpeedDrill();
  const walk = useWalkthrough();
  const sit = useSituational();
  const excel = useExcel();
  const longform = useLongform();
  const vocab = useVocab();
  const mock = useMockInterview();
  const modelingTest = useModelingTest();

  const handleSwitch = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    if (m === 'certify') setCertView({ kind: 'list' });
  };

  const handleCertDeepLink = (m: CertMode) => {
    setMode(m);
  };

  const innerContent = (() => {
    if (mode === 'study') {
      return <StudyScreen onBack={() => setMode('quiz')} />;
    }

    if (mode === 'daily') {
      return <DailyChallengeScreen onBack={() => setMode('quiz')} />;
    }

    if (mode === 'weekly') {
      return <WeeklyChallengeScreen onBack={() => setMode('quiz')} />;
    }

    if (mode === 'leaderboards') {
      return <LeaderboardScreen onBack={() => setMode('quiz')} />;
    }

    if (mode === 'friends') {
      return <FriendsFeedScreen onBack={() => setMode('quiz')} />;
    }

    if (mode === 'cohorts') {
      return <CohortsScreen onBack={() => setMode('quiz')} />;
    }

    if (mode === 'headToHead') {
      return <HeadToHeadScreen onBack={() => setMode('quiz')} />;
    }

    if (mode === 'submitQuestion') {
      return <QuestionSubmitScreen onBack={() => setMode('quiz')} />;
    }

    if (mode === 'profile') {
      return <ProfileScreen onBack={() => setMode('quiz')} />;
    }

    if (mode === 'certify') {
      if (certView.kind === 'exam') {
        return (
          <FinalExamScreen
            certId={certView.certId}
            onExit={() =>
              setCertView({ kind: 'detail', certId: certView.certId })
            }
          />
        );
      }
      if (certView.kind === 'detail') {
        return (
          <CertDetailScreen
            certId={certView.certId}
            onBack={() => setCertView({ kind: 'list' })}
            onDeepLink={handleCertDeepLink}
            onStartFinalExam={(id) =>
              setCertView({ kind: 'exam', certId: id })
            }
          />
        );
      }
      return (
        <CertListScreen
          onOpenCert={(id) => setCertView({ kind: 'detail', certId: id })}
          onBack={() => setMode('quiz')}
        />
      );
    }

    if (mode === 'walkthrough') {
      if (walk.state === null) {
        return (
          <WalkthroughSetup
            onStart={(def) => walk.start(def)}
            onBack={() => setMode('quiz')}
          />
        );
      }
      if (walk.state.status === 'finished') {
        return (
          <WalkthroughResults
            state={walk.state}
            onRestart={() => {
              const def = walk.state!.def;
              walk.reset();
              walk.start(def);
            }}
            onNewSetup={walk.reset}
          />
        );
      }
      return (
        <WalkthroughScreen
          state={walk.state}
          onSubmit={walk.submit}
          onAdvance={walk.advance}
          onQuit={() => {
            walk.reset();
            setMode('quiz');
          }}
        />
      );
    }

    if (mode === 'situational') {
      if (sit.state === null) {
        return (
          <SituationalSetup
            onStart={(config) => sit.start(config)}
            onBack={() => setMode('quiz')}
          />
        );
      }
      if (sit.state.status === 'finished') {
        return (
          <SituationalResults
            state={sit.state}
            onRestart={() => {
              const cfg = sit.state!.config;
              sit.reset();
              sit.start(cfg);
            }}
            onNewSetup={sit.reset}
          />
        );
      }
      return (
        <SituationalScreen
          state={sit.state}
          onSubmit={sit.submit}
          onAdvance={sit.advance}
          onQuit={() => {
            sit.reset();
            setMode('quiz');
          }}
        />
      );
    }

    if (mode === 'excel') {
      if (excel.state === null) {
        return (
          <ExcelSetup
            onStart={(config) => excel.start(config)}
            onBack={() => setMode('quiz')}
          />
        );
      }
      if (excel.state.status === 'finished') {
        return (
          <ExcelResults
            state={excel.state}
            onRestart={() => {
              const cfg = excel.state!.config;
              excel.reset();
              excel.start(cfg);
            }}
            onNewSetup={excel.reset}
          />
        );
      }
      return (
        <ExcelScreen
          state={excel.state}
          onSubmit={excel.submit}
          onAdvance={excel.advance}
          onQuit={() => {
            excel.reset();
            setMode('quiz');
          }}
        />
      );
    }

    if (mode === 'longform') {
      if (longform.state === null) {
        return (
          <LongformSetup
            onStart={(config) => longform.start(config)}
            onBack={() => setMode('quiz')}
          />
        );
      }
      if (longform.state.status === 'finished') {
        return (
          <LongformResults
            state={longform.state}
            onRestart={() => {
              const cfg = longform.state!.config;
              longform.reset();
              longform.start(cfg);
            }}
            onNewSetup={longform.reset}
          />
        );
      }
      return (
        <LongformScreen
          state={longform.state}
          onSubmit={longform.submit}
          onAdvance={longform.advance}
          onQuit={() => {
            longform.reset();
            setMode('quiz');
          }}
        />
      );
    }

    if (mode === 'vocab') {
      if (vocab.state === null) {
        return (
          <VocabSetup
            onStart={(config) => vocab.start(config)}
            onBack={() => setMode('quiz')}
          />
        );
      }
      if (vocab.state.status === 'finished') {
        return (
          <VocabResults
            state={vocab.state}
            onRestart={() => {
              const cfg = vocab.state!.config;
              vocab.reset();
              vocab.start(cfg);
            }}
            onNewSetup={vocab.reset}
          />
        );
      }
      return (
        <VocabScreen
          state={vocab.state}
          onSubmit={vocab.submit}
          onAdvance={vocab.advance}
          onFinish={vocab.finish}
          onQuit={() => {
            vocab.reset();
            setMode('quiz');
          }}
        />
      );
    }

    if (mode === 'modelingTest') {
      if (modelingTest.state === null) {
        return (
          <ModelingTestSetup
            onOpen={(t) => modelingTest.open(t)}
            onBack={() => setMode('quiz')}
          />
        );
      }
      if (modelingTest.state.status === 'graded') {
        return (
          <ModelingTestResults
            state={modelingTest.state}
            onTryAgain={modelingTest.tryAgain}
            onPickAnother={modelingTest.reset}
          />
        );
      }
      return (
        <ModelingTestScreen
          state={modelingTest.state}
          onSetFormula={modelingTest.setFormula}
          onFocus={modelingTest.focus}
          onSubmit={modelingTest.submit}
          onSaveAndExit={modelingTest.reset}
        />
      );
    }

    if (mode === 'mockInterview') {
      if (mock.state === null) {
        return (
          <MockSetup
            onStart={(archetypeId) => mock.start(archetypeId)}
            onBack={() => setMode('quiz')}
          />
        );
      }
      if (mock.state.status === 'finished') {
        return (
          <MockResults
            state={mock.state}
            onRestart={() => {
              const id = mock.state!.spec.id;
              mock.reset();
              mock.start(id);
            }}
            onNewSetup={mock.reset}
          />
        );
      }
      return (
        <MockScreen
          state={mock.state}
          onSubmit={mock.submit}
          onAdvance={mock.advance}
          onQuit={() => {
            mock.reset();
            setMode('quiz');
          }}
        />
      );
    }

    if (mode === 'speedDrill') {
      if (drill.state.cells.length === 0) {
        return (
          <SpeedDrillSetup
            onStart={drill.start}
            onBack={() => {
              drill.reset();
              setMode('quiz');
            }}
          />
        );
      }
      if (drill.state.status === 'finished') {
        return (
          <SpeedDrillResults
            state={drill.state}
            onRestart={() => {
              const prior = drill.state.config;
              drill.reset();
              drill.start(prior);
            }}
            onNewSetup={drill.reset}
          />
        );
      }
      return (
        <SpeedDrillScreen
          state={drill.state}
          currentCell={drill.currentCell}
          onSelect={drill.selectCell}
          onSubmit={drill.submit}
          onFinish={drill.finish}
          onQuit={() => {
            drill.reset();
            setMode('quiz');
          }}
        />
      );
    }

    if (session.status === 'setup') {
      return <SetupScreen onStart={start} />;
    }

    if (session.status === 'reviewing') {
      return <ReviewScreen attempts={session.attempts} onBack={exitReview} />;
    }

    if (session.status === 'finished') {
      const mistakeKinds = Array.from(
        new Set(session.attempts.filter((a) => !a.correct).map((a) => a.kind)),
      );
      return (
        <ResultsScreen
          stats={stats}
          config={session.config}
          attemptCount={session.attempts.length}
          mistakeKinds={mistakeKinds}
          onRestart={() => start(session.config)}
          onNewSetup={reset}
          onReview={enterReview}
          onRetryMistakes={(kinds) => {
            if (kinds.length === 0) return;
            start({ ...session.config, categories: kinds });
          }}
        />
      );
    }

    return (
      <QuizScreen
        session={session}
        stats={stats}
        onSubmit={submit}
        onNext={next}
        onEnd={endSession}
        onQuit={reset}
      />
    );
  })();

  return (
    <FeedbackContextProvider>
      <ScratchSheetProvider>
        <SideNav active={mode} onSwitch={handleSwitch} />
        <main className="lg:pl-56">{innerContent}</main>
        {showWelcome && (
          <WelcomeModal
            onSkip={() => setShowWelcome(false)}
            onStartQuiz={() => {
              setShowWelcome(false);
              setMode('quiz');
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
