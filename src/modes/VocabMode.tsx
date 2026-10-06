import { VocabSetup } from '../components/VocabSetup';
import { VocabScreen } from '../components/VocabScreen';
import { VocabResults } from '../components/VocabResults';
import { useVocab } from '../hooks/useVocab';
import { navigateToMode, useLeaveGuard } from '../router';
import { track } from '../analytics';

export default function VocabMode() {
  const vocab = useVocab();
  useLeaveGuard(vocab.state !== null && vocab.state.status !== 'finished');

  if (vocab.state === null) {
    return (
      <VocabSetup
        onStart={(config) => {
          track('session_started', { mode: 'vocab', source: 'setup' });
          vocab.start(config);
        }}
        onBack={() => navigateToMode('quiz')}
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
          track('session_started', { mode: 'vocab', source: 'restart' });
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
        navigateToMode('quiz');
      }}
    />
  );
}
