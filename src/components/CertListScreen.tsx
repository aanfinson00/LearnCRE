import { CERTS, certById } from '../quiz/certs';
import { useCertProgress } from '../hooks/useCertProgress';
import { CertProgressBar } from './CertProgressBar';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onOpenCert: (certId: string) => void;
  onBack: () => void;
}

export function CertListScreen({ onOpenCert, onBack }: Props) {
  const { views } = useCertProgress();

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="display text-4xl text-warm-black">
            Certify<span className="text-copper">.</span>
          </h1>
          <p className="editorial text-lg text-warm-stone">
            Structured paths through the bank. Each cert is a sequence of modules
            with explicit benchmarks; pass them all and you can sit the final exam.
            Your existing session history retroactively counts toward progress —
            you don't have to start over.
          </p>
        </div>
        <Button variant="secondary" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CERTS.map((cert) => {
          const view = views[cert.id];
          if (!view) return null;
          const moduleProgress = view.totalModules
            ? view.modulesPassed / view.totalModules
            : 0;
          const benchPct = view.totalBenchmarks
            ? view.benchmarksPassed / view.totalBenchmarks
            : 0;
          const prereq = cert.prerequisiteCertId
            ? certById(cert.prerequisiteCertId)
            : undefined;
          const prereqMet = prereq
            ? !!views[prereq.id]?.earned
            : true;

          let cta = 'Open';
          if (view.earned) cta = 'View badge';
          else if (view.eligibleForFinal) cta = 'Take final exam';
          else if (view.benchmarksPassed > 0) cta = 'Continue';
          else if (!prereqMet) cta = 'Locked';

          return (
            <Card
              key={cert.id}
              className={`relative space-y-4 ${
                view.earned ? 'border-signal-good/40' : ''
              }`}
            >
              {view.earned && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-signal-good/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-signal-good-ink">
                  ★ Earned
                </span>
              )}
              <div>
                <div className="display text-2xl text-warm-black">
                  {cert.title}
                </div>
                <p className="mt-1 text-sm text-warm-stone">
                  {cert.description}
                </p>
              </div>

              {prereq && !prereqMet && (
                <div className="rounded-md border border-warm-line bg-warm-paper/40 px-3 py-2 text-xs text-warm-stone">
                  🔒 Earn{' '}
                  <span className="font-medium text-warm-ink">
                    {prereq.title}
                  </span>{' '}
                  first.
                </div>
              )}

              <div className="space-y-3">
                <CertProgressBar
                  label="Modules passed"
                  status={`${view.modulesPassed}/${view.totalModules}`}
                  progress={moduleProgress}
                  passed={view.eligibleForFinal}
                />
                <CertProgressBar
                  label="Benchmarks passed"
                  status={`${view.benchmarksPassed}/${view.totalBenchmarks}`}
                  progress={benchPct}
                  size="sm"
                />
              </div>

              <div className="flex items-center justify-between border-t border-warm-line pt-3">
                <div className="font-mono text-[11px] text-warm-mute num">
                  {view.totalModules} modules · {cert.finalExam.totalQuestions}-Q
                  final
                </div>
                <Button
                  variant={view.earned ? 'secondary' : 'primary'}
                  onClick={() => onOpenCert(cert.id)}
                  disabled={!prereqMet}
                  className="text-xs"
                >
                  {cta} →
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <footer className="text-center text-xs text-warm-mute">
        Certs are local-first and honor-system. No central registry — share by
        downloading the artifact when ready.
      </footer>
    </div>
  );
}
