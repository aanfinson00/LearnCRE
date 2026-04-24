import { useCallback, useMemo, useState } from 'react';
import type { Attempt } from '../types/session';
import { templates } from '../quiz/templates';
import {
  formatBps,
  formatMultiple,
  formatPct,
  formatPctChange,
  formatUsd,
  formatUsdPerSf,
  formatUsdSigned,
} from '../math/rounding';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { SolutionDetails } from './SolutionDetails';
import { useKeyboard } from '../hooks/useKeyboard';
import type { UnitFormat } from '../types/question';

function fmt(value: number, unit: UnitFormat): string {
  switch (unit) {
    case 'usd':
      return formatUsd(value);
    case 'usdChange':
      return formatUsdSigned(value);
    case 'pct':
      return formatPct(value);
    case 'pctChange':
      return formatPctChange(value);
    case 'bps':
      return formatBps(value / 10_000);
    case 'multiple':
      return formatMultiple(value);
    case 'usdPerSf':
      return formatUsdPerSf(value);
  }
}

interface Props {
  attempts: Attempt[];
  onBack: () => void;
}

export function ReviewScreen({ attempts, onBack }: Props) {
  const [mistakesOnly, setMistakesOnly] = useState(false);
  const [index, setIndex] = useState(0);

  const filtered = useMemo(
    () => (mistakesOnly ? attempts.filter((a) => !a.correct) : attempts),
    [attempts, mistakesOnly],
  );
  const safeIndex = Math.min(index, Math.max(0, filtered.length - 1));
  const current = filtered[safeIndex];

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setIndex((i) => Math.min(filtered.length - 1, i + 1)),
    [filtered.length],
  );

  useKeyboard(
    (e) => {
      const target = e.target as HTMLElement | null;
      const inInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';
      if (inInput) return;
      if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N' || e.key === 'Enter') {
        e.preventDefault();
        next();
      } else if (e.key === 'Escape' || e.key === 'q' || e.key === 'Q') {
        e.preventDefault();
        onBack();
      }
    },
    [prev, next, onBack],
  );

  const mistakeCount = attempts.filter((a) => !a.correct).length;

  if (!current) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 py-8">
        <p className="text-warm-stone">
          {mistakesOnly && attempts.length > 0
            ? 'No mistakes to review — every answer was correct.'
            : 'No attempts to review yet.'}
        </p>
        {mistakesOnly && (
          <Button variant="secondary" onClick={() => setMistakesOnly(false)}>
            Show all answers
          </Button>
        )}
        <Button onClick={onBack}>Back</Button>
      </div>
    );
  }

  const template = templates[current.kind];
  const banner = current.skipped
    ? { label: 'Skipped', tone: 'bg-warm-paper border-warm-line text-warm-ink' }
    : current.correct
      ? {
          label: `Correct · off by ${formatPctChange(current.deltaPct)}`,
          tone: 'bg-signal-good/10 border-signal-good/60 text-signal-good-ink',
        }
      : {
          label: `Missed · off by ${formatPctChange(current.deltaPct)}`,
          tone: 'bg-signal-bad/10 border-signal-bad/60 text-signal-bad-ink',
        };

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-6">
      <div className="flex items-center justify-between gap-3">
        <div className="font-mono text-sm text-warm-stone num">
          Review {safeIndex + 1} / {filtered.length}
          {mistakesOnly && (
            <span className="ml-2 text-xs text-signal-bad-ink">(mistakes only)</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setMistakesOnly((v) => !v);
              setIndex(0);
            }}
            disabled={mistakeCount === 0 && !mistakesOnly}
            className={`rounded-md border px-2.5 py-1 text-xs ${
              mistakesOnly
                ? 'border-signal-bad bg-signal-bad/10 text-signal-bad-ink'
                : mistakeCount === 0
                  ? 'cursor-not-allowed border-warm-line bg-warm-paper/50 text-warm-mute'
                  : 'border-warm-line bg-warm-white text-warm-ink hover:border-warm-stone'
            }`}
          >
            {mistakesOnly ? 'Show all' : `Mistakes only (${mistakeCount})`}
          </button>
          <Button variant="ghost" onClick={onBack} className="text-xs">
            Back (Esc)
          </Button>
        </div>
      </div>

      <Card className="space-y-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-warm-paper px-2.5 py-0.5 text-xs font-medium text-warm-ink">
            {template.label}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              template.category === 'valuation'
                ? 'bg-copper-soft/30 text-copper-deep'
                : 'bg-warm-paper text-warm-ink'
            }`}
          >
            {template.category}
          </span>
          {current.question.appliedDifficulty && (
            <span className="inline-flex items-center rounded-full bg-warm-paper/50 px-2.5 py-0.5 text-xs text-warm-stone border border-warm-line">
              {current.question.appliedDifficulty}
            </span>
          )}
          <span className="ml-auto font-mono text-xs text-warm-mute num">
            {(current.elapsedMs / 1000).toFixed(1)}s
          </span>
        </div>

        <p className="text-lg leading-relaxed text-warm-black">{current.question.prompt}</p>

        <div className={`rounded-lg border-2 px-4 py-3 font-medium ${banner.tone}`}>
          {banner.label}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-warm-paper/50 p-3">
            <div className="text-xs uppercase tracking-wide text-warm-stone">Your answer</div>
            <div className="mt-1 font-mono text-lg num">
              {current.userInput === null ? '—' : fmt(current.userInput, current.question.unit)}
            </div>
          </div>
          <div className="rounded-md bg-warm-paper/50 p-3">
            <div className="text-xs uppercase tracking-wide text-warm-stone">Correct</div>
            <div className="mt-1 font-mono text-lg num">
              {current.question.solution.answerDisplay}
            </div>
          </div>
        </div>

        <SolutionDetails question={current.question} defaultOpen showTipsByDefault />
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={prev} disabled={safeIndex === 0}>
          ← Prev
        </Button>
        <div className="flex flex-wrap gap-1 justify-center max-w-md">
          {filtered.map((a, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 w-6 rounded-full transition ${
                i === safeIndex
                  ? 'bg-warm-black'
                  : a.skipped
                    ? 'bg-warm-line'
                    : a.correct
                      ? 'bg-signal-good'
                      : 'bg-signal-bad'
              }`}
              aria-label={`Go to attempt ${i + 1}`}
            />
          ))}
        </div>
        <Button onClick={next} disabled={safeIndex === filtered.length - 1}>
          Next →
        </Button>
      </div>

      <div className="text-center text-xs text-warm-mute">
        ← / → or N / P to navigate · Esc to go back
      </div>
    </div>
  );
}
