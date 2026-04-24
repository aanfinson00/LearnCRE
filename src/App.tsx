import { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { SpeedDrillSetup } from './components/SpeedDrillSetup';
import { SpeedDrillScreen } from './components/SpeedDrillScreen';
import { SpeedDrillResults } from './components/SpeedDrillResults';
import { useQuizSession } from './hooks/useQuizSession';
import { useSpeedDrill } from './hooks/useSpeedDrill';

type Mode = 'quiz' | 'speedDrill';

export default function App() {
  const [mode, setMode] = useState<Mode>('quiz');
  const { session, stats, start, submit, next, reset, endSession, enterReview, exitReview } =
    useQuizSession();
  const drill = useSpeedDrill();

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
    return <SetupScreen onStart={start} onSwitchToSpeedDrill={() => setMode('speedDrill')} />;
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
