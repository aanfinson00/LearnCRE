import { SpeedDrillSetup } from '../components/SpeedDrillSetup';
import { SpeedDrillScreen } from '../components/SpeedDrillScreen';
import { SpeedDrillResults } from '../components/SpeedDrillResults';
import { useSpeedDrill } from '../hooks/useSpeedDrill';
import { navigateToMode, useLeaveGuard } from '../router';

export default function SpeedDrillMode() {
  const drill = useSpeedDrill();
  useLeaveGuard(drill.state.cells.length > 0 && drill.state.status === 'active');

  if (drill.state.cells.length === 0) {
    return (
      <SpeedDrillSetup
        onStart={drill.start}
        onBack={() => {
          drill.reset();
          navigateToMode('quiz');
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
        navigateToMode('quiz');
      }}
    />
  );
}
