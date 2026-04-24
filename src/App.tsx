import { SetupScreen } from './components/SetupScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { useQuizSession } from './hooks/useQuizSession';

export default function App() {
  const { session, stats, start, submit, next, reset, endSession, enterReview, exitReview } =
    useQuizSession();

  if (session.status === 'setup') {
    return <SetupScreen onStart={start} />;
  }

  if (session.status === 'reviewing') {
    return <ReviewScreen attempts={session.attempts} onBack={exitReview} />;
  }

  if (session.status === 'finished') {
    return (
      <ResultsScreen
        stats={stats}
        config={session.config}
        attemptCount={session.attempts.length}
        onRestart={() => start(session.config)}
        onNewSetup={reset}
        onReview={enterReview}
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
