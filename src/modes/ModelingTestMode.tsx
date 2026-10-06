import { ModelingTestSetup } from '../components/ModelingTestSetup';
import { ModelingTestScreen } from '../components/ModelingTestScreen';
import { ModelingTestResults } from '../components/ModelingTestResults';
import { useModelingTest } from '../hooks/useModelingTest';
import { navigateToMode } from '../router';

// No leave guard: modeling tests auto-save and resume.
export default function ModelingTestMode() {
  const modelingTest = useModelingTest();

  if (modelingTest.state === null) {
    return (
      <ModelingTestSetup
        onOpen={(t) => modelingTest.open(t)}
        onBack={() => navigateToMode('quiz')}
      />
    );
  }
  if (modelingTest.state.status === 'graded') {
    return (
      <ModelingTestResults
        state={modelingTest.state}
        onTryAgain={modelingTest.tryAgain}
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
