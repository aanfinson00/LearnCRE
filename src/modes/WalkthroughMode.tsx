import { WalkthroughSetup } from '../components/WalkthroughSetup';
import { WalkthroughScreen } from '../components/WalkthroughScreen';
import { WalkthroughResults } from '../components/WalkthroughResults';
import { useWalkthrough } from '../hooks/useWalkthrough';
import { navigateToMode, useLeaveGuard } from '../router';
import { track } from '../analytics';

export default function WalkthroughMode() {
  const walk = useWalkthrough();
  useLeaveGuard(walk.state !== null && walk.state.status !== 'finished');

  if (walk.state === null) {
    return (
      <WalkthroughSetup
        onStart={(def) => {
          track('session_started', { mode: 'walkthrough', source: 'setup' });
          walk.start(def);
        }}
        onBack={() => navigateToMode('quiz')}
      />
    );
  }
  if (walk.state.status === 'finished') {
    return (
      <WalkthroughResults
        state={walk.state}
        onRestart={() => {
          const cfg = walk.state!.def;
          walk.reset();
          track('session_started', { mode: 'walkthrough', source: 'restart' });
          walk.start(cfg);
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
        navigateToMode('quiz');
      }}
    />
  );
}
