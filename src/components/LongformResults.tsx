import type { LongformState } from '../types/longform';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: LongformState;
  onRestart: () => void;
  onNewSetup: () => void;
}

export function LongformResults({ state, onRestart, onNewSetup }: Props) {
  const counted = state.attempts.filter((a) => !a.skipped);
  const total = counted.length;
  const skippedCount = state.attempts.filter((a) => a.skipped).length;
  const avg =
    total === 0
      ? 0
      : Math.round(
          counted.reduce((sum, a) => sum + a.totalScorePct, 0) / total,
        );

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="space-y-1">
        <h1 className="display text-3xl text-warm-black">
          Case study complete<span className="text-copper">.</span>
        </h1>
        <p className="text-sm text-warm-stone">
          Average score: {avg}% across {total} graded case{total === 1 ? '' : 's'}
          {skippedCount > 0 ? ` · ${skippedCount} skipped` : ''}
        </p>
      </header>

      <Card>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-warm-stone">
          Per-case scores
        </h2>
        <div className="space-y-2.5">
          {state.cases.map((c) => {
            const att = state.attempts.find((a) => a.caseId === c.id);
            const tone = !att
              ? 'border-warm-line bg-warm-paper/30 text-warm-mute'
              : att.skipped
                ? 'border-warm-line bg-warm-paper/40 text-warm-ink'
                : att.totalScorePct >= 70
                  ? 'border-signal-good/40 bg-signal-good/10 text-signal-good-ink'
                  : att.totalScorePct >= 40
                    ? 'border-warm-stone/40 bg-warm-stone/10 text-warm-ink'
                    : 'border-signal-bad/40 bg-signal-bad/10 text-signal-bad-ink';
            const verdict = !att
              ? '—'
              : att.skipped
                ? 'Skipped'
                : `${att.totalScorePct}%`;
            return (
              <div key={c.id} className={`rounded-lg border-2 p-3 text-sm ${tone}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium text-warm-black">{c.title}</div>
                  <span className="font-mono text-[11px] uppercase tracking-widest num">
                    {verdict}
                  </span>
                </div>
                <div className="mt-1 text-xs text-warm-stone">
                  {c.difficulty}
                  {att && !att.skipped ? ` · ${(att.elapsedMs / 1000).toFixed(0)}s` : ''}
                </div>
                {att && !att.skipped && (
                  <div className="mt-2 space-y-0.5 font-mono text-[10px] num text-warm-ink">
                    {c.rubric.map((r) => {
                      const s = att.rubricScores[r.id] ?? 0;
                      return (
                        <div key={r.id} className="flex items-baseline justify-between">
                          <span className="truncate text-warm-stone">{r.dimension}</span>
                          <span className="ml-2 shrink-0 text-warm-black">
                            {s}/3
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="bg-warm-paper/40 border-warm-line">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          What this trains
        </div>
        <p className="mt-2 text-sm text-warm-ink">
          Long-form forces you to <em>articulate</em> rather than recognize. The rubric
          dimensions surface where your framing was strong vs where you skipped past
          something. Patterns across multiple sessions (e.g. consistently low on
          "names the residual risk") signal where to drill — those become situational
          cases or quiz templates in a future content batch.
        </p>
        <p className="mt-2 text-sm text-warm-ink">
          Hit the floating 💬 to log feedback on any case (the agent picks it up next
          run).
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
