import type { ExcelState } from '../excel/types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: ExcelState;
  onRestart: () => void;
  onNewSetup: () => void;
}

export function ExcelResults({ state, onRestart, onNewSetup }: Props) {
  const counted = state.attempts.filter((a) => !a.skipped);
  const correct = counted.filter((a) => a.correct).length;
  const total = counted.length;
  const skippedCount = state.attempts.filter((a) => a.skipped).length;
  const accuracyPct = total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="space-y-1">
        <h1 className="display text-3xl text-warm-black">
          Excel run complete<span className="text-copper">.</span>
        </h1>
        <p className="text-sm text-warm-stone">
          {correct}/{total} formulas correct · {accuracyPct}% accuracy
          {skippedCount > 0 ? ` · ${skippedCount} skipped` : ''}
        </p>
      </header>

      <Card>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-warm-stone">
          Template-by-template
        </h2>
        <div className="space-y-2.5">
          {state.templates.map((t) => {
            const att = state.attempts.find((a) => a.templateId === t.id);
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
                  : !att.parsedOk
                    ? 'Parse error'
                    : `Off by ${(att.deltaPct * 100).toFixed(1)}%`;
            return (
              <div key={t.id} className={`rounded-lg border-2 p-3 text-sm ${tone}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium text-warm-black">{t.title}</div>
                  <span className="font-mono text-[11px] uppercase tracking-widest num">
                    {verdict}
                  </span>
                </div>
                <div className="mt-1 text-xs text-warm-stone">
                  {t.category} · {t.difficulty}
                  {att && !att.skipped ? ` · ${(att.elapsedMs / 1000).toFixed(0)}s` : ''}
                </div>
                {att && !att.skipped && att.rawFormula ? (
                  <div className="mt-1.5 font-mono text-[11px] text-warm-ink num">
                    {att.rawFormula}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="bg-warm-paper/40 border-warm-line">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Practice tip
        </div>
        <p className="mt-2 text-sm text-warm-ink">
          The point isn’t the literal Excel functions — it’s the speed at which you
          decompose a problem into the right cells and operators. If you got the value but used a
          long-winded formula, the Example column shows the canonical short form. Keep both in mind
          for the next round.
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
