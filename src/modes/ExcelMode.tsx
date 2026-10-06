import { ExcelSetup } from '../components/ExcelSetup';
import { ExcelScreen } from '../components/ExcelScreen';
import { ExcelResults } from '../components/ExcelResults';
import { useExcel } from '../hooks/useExcel';
import { navigateToMode, useLeaveGuard } from '../router';

export default function ExcelMode() {
  const excel = useExcel();
  useLeaveGuard(excel.state !== null && excel.state.status !== 'finished');

  if (excel.state === null) {
    return (
      <ExcelSetup
        onStart={(config) => excel.start(config)}
        onBack={() => navigateToMode('quiz')}
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
        navigateToMode('quiz');
      }}
    />
  );
}
