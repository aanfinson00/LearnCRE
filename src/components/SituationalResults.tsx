import type { SituationalState } from '../types/situational';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: SituationalState;
  onRestart: () => void;
  onNewSetup: () => void;
}

export function SituationalResults({ state, onRestart, onNewSetup }: Props) {
  const counted = state.attempts.filter((a) => !a.skipped);
  const correct = counted.filter((a) => a.correct).length;
  const total = counted.length;
  const skippedCount = state.attempts.filter((a) => a.skipped).length;
  const accuracyPct = total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="space-y-1">
        <h1 className="display text-3xl text-warm-black">
          Situational complete<span className="text-copper">.</span>
        </h1>
        <p className="text-sm text-warm-stone">
          {correct}/{total} cases nailed · {accuracyPct}% accuracy
          {skippedCount > 0 ? ` · ${skippedCount} skipped` : ''}
        </p>
      </header>

      <Card>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-warm-stone">
          Case-by-case
        </h2>
        <div className="space-y-2.5">
          {state.cases.map((c) => {
            const att = state.attempts.find((a) => a.caseId === c.id);
            const tone = !att
              ? 'border-warm-line bg-warm-paper/30 text-warm-mute'
              : att.skipped
                ? 'border-warm-line bg-warm-paper/40 text-warm-ink'
                : att.correct
                  ? 'border-signal-good/40 bg-signal-good/10 text-signal-good-ink'
                  : 'border-signal-bad/40 bg-signal-bad/10 text-signal-bad-ink';
            const verdict = !att
              ? '—'
              : att.skipped
                ? 'Skipped'
                : att.correct
                  ? 'Correct'
                  : 'Less defensible';
            return (
              <div key={c.id} className={`rounded-lg border-2 p-3 text-sm ${tone}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium text-warm-black">{c.title}</div>
                  <span className="font-mono text-[11px] uppercase tracking-widest num">
                    {verdict}
                  </span>
                </div>
                <div className="mt-1 text-xs text-warm-stone">
                  {c.category} · {c.difficulty}
                  {att && !att.skipped ? ` · ${(att.elapsedMs / 1000).toFixed(0)}s` : ''}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="bg-warm-paper/40 border-warm-line">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          What now
        </div>
        <p className="mt-2 text-sm text-warm-ink">
          Situational reasoning compounds — every case you see, you build a sharper instinct
          for what the right question is. If you got something wrong, the explanation under
          the wrong option is usually the most useful thing on the page.
        </p>
      </Card>

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onNewSetup}>
          Change setup
        </Button>
        <Button onClick={onRestart}>Run again</Button>
      </div>
    </div>
  );
}
