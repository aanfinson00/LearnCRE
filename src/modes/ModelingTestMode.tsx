import { ModelingTestSetup } from '../components/ModelingTestSetup';
import { ModelingTestScreen } from '../components/ModelingTestScreen';
import { ModelingTestResults } from '../components/ModelingTestResults';
import { useModelingTest } from '../hooks/useModelingTest';
import { navigateToMode } from '../router';
import { track } from '../analytics';

// No leave guard: modeling tests auto-save and resume.
export default function ModelingTestMode() {
  const modelingTest = useModelingTest();

  if (modelingTest.state === null) {
    return (
      <ModelingTestSetup
        onOpen={(t) => {
          track('session_started', { mode: 'modelingTest', source: 'setup' });
          modelingTest.open(t);
        }}
        onBack={() => navigateToMode('quiz')}
      />
    );
  }
  if (modelingTest.state.status === 'graded') {
    return (
      <ModelingTestResults
        state={modelingTest.state}
        onTryAgain={() => {
          track('session_started', { mode: 'modelingTest', source: 'restart' });
          modelingTest.tryAgain();
        }}
        onPickAnother={modelingTest.reset}
      />
    );
  }
  return (
    <ModelingTestScreen
      state={modelingTest.state}
      onSetFormula={modelingTest.setFormula}
      onFocus={modelingTest.focus}
      onSubmit={modelingTest.submit}
      onSaveAndExit={modelingTest.reset}
    />
  );
}
