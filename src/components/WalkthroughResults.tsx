import type { WalkthroughState } from '../types/walkthrough';
import { formatPctChange } from '../math/rounding';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: WalkthroughState;
  onRestart: () => void;
  onNewSetup: () => void;
}

export function WalkthroughResults({ state, onRestart, onNewSetup }: Props) {
  const correct = state.attempts.filter((a) => a.correct && !a.skipped).length;
  const total = state.attempts.length;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="space-y-1">
        <h1 className="display text-3xl text-warm-black">
          Walkthrough complete<span className="text-copper">.</span>
        </h1>
        <p className="text-sm text-warm-stone">
          {correct}/{total} steps correct — {state.def.label}
        </p>
      </header>

      <Card>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-warm-stone">
          Step by step
        </h2>
        <div className="space-y-3">
          {state.def.steps.map((s) => {
            const att = state.attempts.find((a) => a.stepId === s.id);
            const tone = att
              ? att.skipped
                ? 'border-warm-line bg-warm-paper/40 text-warm-ink'
                : att.correct
                  ? 'border-signal-good/40 bg-signal-good/10 text-signal-good-ink'
                  : 'border-signal-bad/40 bg-signal-bad/10 text-signal-bad-ink'
              : 'border-warm-line bg-warm-paper/30 text-warm-mute';
            return (
              <div
                key={s.id}
                className={`rounded-lg border-2 p-3 text-sm ${tone}`}
              >
                <div className="font-medium">{s.label}</div>
                <div className="mt-1 text-warm-ink">{s.resultDescription}</div>
                {att && !att.skipped && !att.correct && (
                  <div className="mt-1 font-mono text-xs num">
                    Off by {formatPctChange(att.deltaPct)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="bg-copper/10 border-copper/40">
        <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">
          Takeaway
        </div>
        <p className="editorial mt-2 text-base leading-relaxed text-warm-ink">
          {state.def.takeaway}
        </p>
      </Card>

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onNewSetup}>
          Pick another walkthrough
        </Button>
        <Button onClick={onRestart}>Run again</Button>
      </div>
    </div>
  );
}
