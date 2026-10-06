import { useEffect } from 'react';
import { SetupScreen } from '../components/SetupScreen';
import { QuizScreen } from '../components/QuizScreen';
import { ResultsScreen } from '../components/ResultsScreen';
import { ReviewScreen } from '../components/ReviewScreen';
import { useQuizSession } from '../hooks/useQuizSession';
import { useLeaveGuard } from '../router';
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

  // Arriving from the landing page's "Start drilling" CTA: skip setup and
  // drop straight into a 10-question Foundations session.
  useEffect(() => {
    if (!quickStart) return;
    start({
      mode: 'free',
      categories: QUICK_START_KINDS,
      plannedCount: 10,
      tolerancePreset: 'normal',
      difficulty: 'intermediate',
      assetClass: 'mixed',
      role: 'all',
      spacedRepetition: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLeaveGuard(
    (session.status === 'active' || session.status === 'answered') && session.attempts.length > 0,
  );

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
}
