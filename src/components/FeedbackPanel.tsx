import { useState } from 'react';
import type { Question, UnitFormat } from '../types/question';
import type { Attempt } from '../types/session';
import {
  formatBps,
  formatMultiple,
  formatPct,
  formatPctChange,
  formatUsd,
  formatUsdSigned,
} from '../math/rounding';
import { Button } from './ui/Button';

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
  const [expanded, setExpanded] = useState(!correct || skipped);

  const banner = skipped
    ? { label: 'Skipped', tone: 'bg-slate-100 border-slate-300 text-slate-700' }
    : correct
      ? {
          label: `Correct  (off by ${formatPctChange(attempt.deltaPct)})`,
          tone: 'bg-emerald-50 border-emerald-300 text-emerald-800',
        }
      : {
          label: `Off by ${formatPctChange(attempt.deltaPct)}`,
          tone: 'bg-rose-50 border-rose-300 text-rose-800',
        };

  return (
    <div className="space-y-4">
      <div className={`rounded-lg border-2 px-4 py-3 font-medium ${banner.tone}`}>
        {banner.label}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Your answer</div>
          <div className="mt-1 font-mono text-lg num">
            {attempt.userInput === null ? '—' : fmt(attempt.userInput, question.unit)}
          </div>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">Correct</div>
          <div className="mt-1 font-mono text-lg num">{question.solution.answerDisplay}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="text-sm text-slate-600 underline decoration-dotted hover:text-slate-900"
      >
        {expanded ? 'Hide math' : 'Show math'}
      </button>

      {expanded && (
        <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Formula</div>
          <div className="font-mono text-sm text-slate-800">{question.solution.formula}</div>
          <div className="mt-3 space-y-2">
            {question.solution.steps.map((step, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4 text-sm">
                <div className="text-slate-500">{step.label}</div>
                <div className="flex items-baseline gap-2 font-mono num">
                  <span className="text-slate-500">{step.expression}</span>
                  <span className="text-slate-400">=</span>
                  <span className="font-medium text-slate-900">{step.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={onNext}>
          {isLast ? 'See results' : 'Next question'} <span className="ml-2 text-slate-400">↵</span>
        </Button>
      </div>
    </div>
  );
}
