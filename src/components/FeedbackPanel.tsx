import type { Question, UnitFormat } from '../types/question';
import type { Attempt } from '../types/session';
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
import { SolutionDetails } from './SolutionDetails';

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
  question: Question;
  attempt: Attempt;
  onNext: () => void;
  isLast: boolean;
}

export function FeedbackPanel({ question, attempt, onNext, isLast }: Props) {
  const correct = attempt.correct;
  const skipped = attempt.skipped;

  const banner = skipped
    ? { label: 'Skipped', tone: 'bg-warm-paper border-warm-line text-warm-ink' }
    : correct
      ? {
          label: `Correct  (within ${formatPctChange(Math.abs(attempt.deltaPct))})`,
          tone: 'bg-signal-good/10 border-signal-good/60 text-signal-good-ink',
        }
      : {
          label: `Missed — off by ${formatPctChange(attempt.deltaPct)}`,
          tone: 'bg-signal-bad/10 border-signal-bad/60 text-signal-bad-ink',
        };

  return (
    <div className="space-y-4">
      <div className={`rounded-lg border-2 px-4 py-3 font-medium ${banner.tone}`}>
        {banner.label}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-warm-paper/50 p-3">
          <div className="text-xs uppercase tracking-wide text-warm-stone">Your answer</div>
          <div className="mt-1 font-mono text-lg num">
            {attempt.userInput === null ? '—' : fmt(attempt.userInput, question.unit)}
          </div>
        </div>
        <div className="rounded-md bg-warm-paper/50 p-3">
          <div className="text-xs uppercase tracking-wide text-warm-stone">Correct</div>
          <div className="mt-1 font-mono text-lg num">{question.solution.answerDisplay}</div>
        </div>
      </div>

      <SolutionDetails question={question} defaultOpen={!correct || skipped} />

      <div className="flex justify-end">
        <Button onClick={onNext}>
          {isLast ? 'See results' : 'Next question'} <span className="ml-2 text-warm-mute">↵</span>
        </Button>
      </div>
    </div>
  );
}
