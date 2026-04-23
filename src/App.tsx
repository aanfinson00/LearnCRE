import { useCallback } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { useQuizSession } from './hooks/useQuizSession';

export default function App() {
  const { session, stats, start, submit, next, reset } = useQuizSession();

  const onQuit = useCallback(() => {
    reset();
  }, [reset]);

  if (session.status === 'setup') {
    return <SetupScreen onStart={start} />;
  }

  if (session.status === 'finished') {
    return (
      <ResultsScreen
        stats={stats}
        config={session.config}
        onRestart={() => start(session.config)}
        onNewSetup={reset}
      />
    );
  }

  return (
    <QuizScreen
      session={session}
      stats={stats}
      onSubmit={submit}
      onNext={next}
      onQuit={onQuit}
    />
  );
}
