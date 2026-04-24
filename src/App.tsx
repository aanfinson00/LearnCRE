import { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { SpeedDrillSetup } from './components/SpeedDrillSetup';
import { SpeedDrillScreen } from './components/SpeedDrillScreen';
import { SpeedDrillResults } from './components/SpeedDrillResults';
import { StudyScreen } from './components/StudyScreen';
import { TopNav } from './components/TopNav';
import { WalkthroughSetup } from './components/WalkthroughSetup';
import { WalkthroughScreen } from './components/WalkthroughScreen';
import { WalkthroughResults } from './components/WalkthroughResults';
import { useQuizSession } from './hooks/useQuizSession';
import { useSpeedDrill } from './hooks/useSpeedDrill';
import { useWalkthrough } from './hooks/useWalkthrough';

type Mode = 'quiz' | 'speedDrill' | 'study' | 'walkthrough';

export default function App() {
  const [mode, setMode] = useState<Mode>('quiz');
  const { session, stats, start, submit, next, reset, endSession, enterReview, exitReview } =
    useQuizSession();
  const drill = useSpeedDrill();
  const walk = useWalkthrough();

  const handleSwitch = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
  };

  const showTopNav =
    (mode === 'quiz' && session.status === 'setup') ||
    (mode === 'speedDrill' && drill.state.cells.length === 0) ||
    (mode === 'walkthrough' && walk.state === null) ||
    mode === 'study';

  const innerContent = (() => {
    if (mode === 'study') {
      return <StudyScreen onBack={() => setMode('quiz')} />;
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
    <>
      {showTopNav && <TopNav active={mode} onSwitch={handleSwitch} />}
      {innerContent}
    </>
  );
}
