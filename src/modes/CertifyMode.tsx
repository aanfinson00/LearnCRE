import { CertListScreen } from '../components/CertListScreen';
import { CertDetailScreen } from '../components/CertDetailScreen';
import { FinalExamScreen } from '../components/FinalExamScreen';
import { navigateToMode, type CertView } from '../router';

/** Certification list → detail → final exam, each with its own URL. */
export default function CertifyMode({ view }: { view: CertView }) {
  if (view.kind === 'exam') {
    return (
      <FinalExamScreen
        certId={view.certId}
        onExit={() => navigateToMode('certify', { kind: 'detail', certId: view.certId })}
      />
    );
  }
  if (view.kind === 'detail') {
    return (
      <CertDetailScreen
        certId={view.certId}
        onBack={() => navigateToMode('certify')}
        onDeepLink={(m) => navigateToMode(m)}
        onStartFinalExam={(id) => navigateToMode('certify', { kind: 'exam', certId: id })}
      />
    );
  }
  return (
    <CertListScreen
      onOpenCert={(id) => navigateToMode('certify', { kind: 'detail', certId: id })}
      onBack={() => navigateToMode('quiz')}
    />
  );
}
