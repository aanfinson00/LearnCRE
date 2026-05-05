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
import { TopNav } from './components/TopNav';
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

type Mode =
  | 'quiz'
  | 'speedDrill'
  | 'study'
  | 'walkthrough'
  | 'situational'
  | 'excel'
  | 'longform'
  | 'vocab'
  | 'certify'
  | 'profile';

type CertView =
  | { kind: 'list' }
  | { kind: 'detail'; certId: string }
  | { kind: 'exam'; certId: string };

export default function App() {
  const [mode, setMode] = useState<Mode>('quiz');
  const [certView, setCertView] = useState<CertView>({ kind: 'list' });
  const { session, stats, start, submit, next, reset, endSession, enterReview, exitReview } =
    useQuizSession();
  const drill = useSpeedDrill();
  const walk = useWalkthrough();
  const sit = useSituational();
  const excel = useExcel();
  const longform = useLongform();
  const vocab = useVocab();

  const handleSwitch = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    if (m === 'certify') setCertView({ kind: 'list' });
  };

  const handleCertDeepLink = (m: CertMode) => {
    setMode(m);
  };

  const showTopNav =
    (mode === 'quiz' && session.status === 'setup') ||
    (mode === 'speedDrill' && drill.state.cells.length === 0) ||
    (mode === 'walkthrough' && walk.state === null) ||
    (mode === 'situational' && sit.state === null) ||
    (mode === 'excel' && excel.state === null) ||
    (mode === 'longform' && longform.state === null) ||
    (mode === 'vocab' && vocab.state === null) ||
    mode === 'study' ||
    (mode === 'certify' && certView.kind !== 'exam') ||
    mode === 'profile';

  const innerContent = (() => {
    if (mode === 'study') {
      return <StudyScreen onBack={() => setMode('quiz')} />;
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
        {showTopNav && <TopNav active={mode} onSwitch={handleSwitch} />}
        {innerContent}
        <AchievementToastHost />
        <ScratchSheet />
        <FeedbackButton />
      </ScratchSheetProvider>
    </FeedbackContextProvider>
  );
}
