import { useEffect } from 'react';
import { SetupScreen } from '../components/SetupScreen';
import { QuizScreen } from '../components/QuizScreen';
import { ResultsScreen } from '../components/ResultsScreen';
import { ReviewScreen } from '../components/ReviewScreen';
import { useQuizSession } from '../hooks/useQuizSession';
import { useLeaveGuard } from '../router';
import { track, type AnalyticsEvents } from '../analytics';
import type { SessionConfig } from '../types/session';
import { allKinds } from '../quiz/templates';
import type { QuestionKind } from '../types/question';

/** Same starter set the setup screen's Quick start uses. */
const QUICK_START_KINDS: QuestionKind[] = (
  [
    'capCompression',
    'goingInCap',
    'vacancySensitivity',
    'otherIncomeImpact',
    'rentChange',
    'combinedScenario',
    'equityMultiple',
    'irrSimple',
  ] as QuestionKind[]
).filter((k) => allKinds.includes(k));

export default function QuizMode({ quickStart = false }: { quickStart?: boolean }) {
  const { session, stats, start, submit, next, reset, endSession, enterReview, exitReview } =
    useQuizSession();

  const begin = (
    config: SessionConfig,
    source: AnalyticsEvents['session_started']['source'],
  ) => {
    track('session_started', {
      mode: 'quiz',
      source,
      planned_count: config.plannedCount,
      difficulty: config.difficulty,
    });
    start(config);
  };

  // Arriving from the landing page's "Start drilling" CTA: skip setup and
  // drop straight into a 10-question Foundations session.
  useEffect(() => {
    if (!quickStart) return;
    begin({
      mode: 'free',
      categories: QUICK_START_KINDS,
      plannedCount: 10,
      tolerancePreset: 'normal',
      difficulty: 'intermediate',
      assetClass: 'mixed',
      role: 'all',
      spacedRepetition: false,
    }, 'landing_quick_start');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLeaveGuard(
    (session.status === 'active' || session.status === 'answered') && session.attempts.length > 0,
  );

  if (session.status === 'setup') {
    return <SetupScreen onStart={begin} />;
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
        onRestart={() => begin(session.config, 'restart')}
        onNewSetup={reset}
        onReview={enterReview}
        onRetryMistakes={(kinds) => {
          if (kinds.length === 0) return;
          begin({ ...session.config, categories: kinds }, 'retry_mistakes');
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
}
