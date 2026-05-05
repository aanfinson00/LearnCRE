import { useMemo } from 'react';
import type { VocabState } from '../types/vocab';
import { termById } from '../quiz/vocab';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: VocabState;
  onRestart: () => void;
  onNewSetup: () => void;
}

export function VocabResults({ state, onRestart, onNewSetup }: Props) {
  const counted = state.attempts.filter((a) => !a.skipped);
  const correct = counted.filter((a) => a.correct).length;
  const accuracy = counted.length === 0 ? 0 : correct / counted.length;
  const durationSec = Math.round((Date.now() - state.startedAt) / 1000);

  // Per-category breakdown
  const byCategory = useMemo(() => {
    const buckets: Record<string, { total: number; correct: number }> = {};
    for (const a of counted) {
      const t = termById(a.termId);
      if (!t) continue;
      if (!buckets[t.category]) buckets[t.category] = { total: 0, correct: 0 };
      buckets[t.category].total += 1;
      if (a.correct) buckets[t.category].correct += 1;
    }
    return buckets;
  }, [counted]);

  // Missed terms — ones to study
  const missedTerms = useMemo(() => {
    return counted
      .filter((a) => !a.correct)
      .map((a) => termById(a.termId))
      .filter((t): t is NonNullable<typeof t> => !!t);
  }, [counted]);

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-10">
      <header className="space-y-2">
        <h1 className="display text-4xl text-warm-black">
          Vocab — Results<span className="text-copper">.</span>
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
          {state.config.mode === 'timed' ? 'Timed drill' : 'Flashcards'} ·{' '}
          {durationSec}s
        </p>
      </header>

      <Card className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        <Metric label="Cards" value={`${state.cards.length}`} />
        <Metric label="Answered" value={`${counted.length}`} />
        <Metric label="Correct" value={`${correct}`} />
        <Metric
          label="Accuracy"
          value={counted.length === 0 ? '—' : `${Math.round(accuracy * 100)}%`}
        />
        <Metric label="Time" value={`${durationSec}s`} />
      </Card>

      {Object.keys(byCategory).length > 0 && (
        <Card className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            By category
          </div>
          <div className="space-y-1.5">
            {Object.entries(byCategory).map(([cat, b]) => {
              const pct = b.total === 0 ? 0 : b.correct / b.total;
              return (
                <div key={cat} className="space-y-0.5">
                  <div className="flex items-baseline justify-between font-mono text-[11px] num">
                    <span className="capitalize text-warm-ink">
                      {cat.replace(/-/g, ' ')}
                    </span>
                    <span className="text-warm-stone">
                      {b.correct}/{b.total} · {Math.round(pct * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-warm-paper">
                    <div
                      className="h-full rounded-full bg-copper transition-all duration-aa-slow ease-aa"
                      style={{ width: `${pct * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {missedTerms.length > 0 && (
        <Card className="space-y-3">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Review — terms you missed
          </div>
          <div className="space-y-2">
            {missedTerms.slice(0, 8).map((t) => (
              <div
                key={t.id}
                className="rounded-md border border-warm-line bg-warm-white/50 p-3"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-warm-black">
                    {t.term}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-warm-mute">
                    {t.category.replace(/-/g, ' ')}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-warm-stone">
                  {t.longDef}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex items-center justify-between border-t border-warm-line pt-3">
        <Button variant="secondary" onClick={onNewSetup} className="text-xs">
          ← New setup
        </Button>
        <Button onClick={onRestart} className="text-xs">
          Run again →
        </Button>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-warm-paper/50 p-3">
      <div className="text-[10px] uppercase tracking-widest text-warm-stone">
        {label}
      </div>
      <div className="mt-1 font-mono text-xl num text-warm-black">{value}</div>
    </div>
  );
}
