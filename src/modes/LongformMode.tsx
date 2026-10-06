import { LongformSetup } from '../components/LongformSetup';
import { LongformScreen } from '../components/LongformScreen';
import { LongformResults } from '../components/LongformResults';
import { useLongform } from '../hooks/useLongform';
import { navigateToMode, useLeaveGuard } from '../router';
import { track } from '../analytics';

export default function LongformMode() {
  const longform = useLongform();
  useLeaveGuard(longform.state !== null && longform.state.status !== 'finished');

  if (longform.state === null) {
    return (
      <LongformSetup
        onStart={(config) => {
          track('session_started', { mode: 'longform', source: 'setup' });
          longform.start(config);
        }}
        onBack={() => navigateToMode('quiz')}
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
          track('session_started', { mode: 'longform', source: 'restart' });
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
        navigateToMode('quiz');
      }}
    />
  );
}
