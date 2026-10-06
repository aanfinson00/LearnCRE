import { MockSetup } from '../components/MockSetup';
import { MockScreen } from '../components/MockScreen';
import { MockResults } from '../components/MockResults';
import { useMockInterview } from '../hooks/useMockInterview';
import { navigateToMode, useLeaveGuard } from '../router';
import { track } from '../analytics';

export default function MockInterviewMode() {
  const mock = useMockInterview();
  useLeaveGuard(mock.state !== null && mock.state.status !== 'finished');

  if (mock.state === null) {
    return (
      <MockSetup
        onStart={(archetypeId) => {
          track('session_started', { mode: 'mockInterview', source: 'setup' });
          mock.start(archetypeId);
        }}
        onBack={() => navigateToMode('quiz')}
      />
    );
  }
  if (mock.state.status === 'finished') {
    return (
      <MockResults
        state={mock.state}
        onRestart={() => {
          const id = mock.state!.spec.id;
          mock.reset();
          track('session_started', { mode: 'mockInterview', source: 'restart' });
          mock.start(id);
        }}
        onNewSetup={mock.reset}
      />
    );
  }
  return (
    <MockScreen
      state={mock.state}
      onSubmit={mock.submit}
      onAdvance={mock.advance}
      onQuit={() => {
        mock.reset();
        navigateToMode('quiz');
      }}
    />
  );
}
