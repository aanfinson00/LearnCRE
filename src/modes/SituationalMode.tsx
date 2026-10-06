import { SituationalSetup } from '../components/SituationalSetup';
import { SituationalScreen } from '../components/SituationalScreen';
import { SituationalResults } from '../components/SituationalResults';
import { useSituational } from '../hooks/useSituational';
import { navigateToMode, useLeaveGuard } from '../router';

export default function SituationalMode() {
  const sit = useSituational();
  useLeaveGuard(sit.state !== null && sit.state.status !== 'finished');

  if (sit.state === null) {
    return (
      <SituationalSetup
        onStart={(config) => sit.start(config)}
        onBack={() => navigateToMode('quiz')}
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
        navigateToMode('quiz');
      }}
    />
  );
}
