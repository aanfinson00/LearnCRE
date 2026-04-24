import type { Question, UnitFormat } from '../types/question';
import {
  formatBps,
  formatMultiple,
  formatPct,
  formatPctChange,
  formatUsd,
  formatUsdPerSf,
  formatUsdSigned,
} from '../math/rounding';

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
  selected: number | null;
  onSelect: (value: number) => void;
  disabled?: boolean;
  correctValue: number | null;
}

export function ChoiceList({ question, selected, onSelect, disabled, correctValue }: Props) {
  if (!question.choices) return null;
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {question.choices.map((choice, i) => {
        const isSelected = selected !== null && Math.abs(choice - selected) < 1e-9;
        const isCorrect =
          correctValue !== null && Math.abs(choice - correctValue) < 1e-9;
        const isWrongPick = disabled && isSelected && !isCorrect;
        const base =
          'flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left font-mono text-base transition num';
        const state = disabled
          ? isCorrect
            ? 'border-emerald-500 bg-emerald-50'
            : isWrongPick
              ? 'border-rose-500 bg-rose-50'
              : 'border-slate-200 bg-white opacity-70'
          : isSelected
            ? 'border-slate-900 bg-slate-50'
            : 'border-slate-200 bg-white hover:border-slate-400';
        return (
          <button
            key={i}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(choice)}
            className={`${base} ${state}`}
          >
            <span className="font-mono text-xs text-slate-400 w-5">{i + 1}.</span>
            <span className="flex-1">{fmt(choice, question.unit)}</span>
          </button>
        );
      })}
    </div>
  );
}
