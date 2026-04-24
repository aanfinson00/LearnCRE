import { useEffect, useRef, useState } from 'react';
import type { Cell, SpeedDrillState } from '../types/speedDrill';
import { formatPct, formatPctChange } from '../math/rounding';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { cellKey } from '../quiz/speedDrill';

interface Props {
  state: SpeedDrillState;
  currentCell: Cell | null;
  onSubmit: (input: number | null, skipped: boolean) => void;
  onFinish: () => void;
  onQuit: () => void;
}

function parsePct(raw: string): number | null {
  const cleaned = raw.replace(/%$/, '').trim();
  if (cleaned === '' || cleaned === '-' || cleaned === '+') return null;
  const num = Number(cleaned);
  if (!Number.isFinite(num)) return null;
  return num / 100;
}

function cellStateClass(
  row: number,
  col: number,
  currentRow: number | null,
  currentCol: number | null,
  result: { correct: boolean; skipped: boolean } | undefined,
): string {
  if (row === col) return 'bg-slate-100 text-slate-400';
  if (row === currentRow && col === currentCol) return 'bg-amber-100 ring-2 ring-amber-500 text-slate-900';
  if (!result) return 'bg-white text-slate-500';
  if (result.skipped) return 'bg-slate-50 text-slate-400';
  if (result.correct) return 'bg-emerald-100 text-emerald-800';
  return 'bg-rose-100 text-rose-800';
}

export function SpeedDrillScreen({ state, currentCell, onSubmit, onFinish, onQuit }: Props) {
  const [raw, setRaw] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRaw('');
    inputRef.current?.focus();
  }, [currentCell?.row, currentCell?.col, state.status]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (state.status !== 'active') return;
      if (e.key === 's' || e.key === 'S') {
        const target = e.target as HTMLElement | null;
        if (target?.tagName === 'INPUT') return;
        e.preventDefault();
        onSubmit(null, true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.status, onSubmit]);

  const caps = state.config.caps;
  const totalCells = caps.length * caps.length - caps.length;
  const answered = Object.keys(state.results).length;
  const correct = Object.values(state.results).filter((r) => r.correct && !r.skipped).length;
  const remainingSec = state.remainingMs === null ? null : Math.max(0, state.remainingMs / 1000);

  const submit = () => {
    const parsed = parsePct(raw);
    if (parsed === null) return;
    onSubmit(parsed, false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5 py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-sm text-slate-600 num">
          <span>
            <span className="text-slate-400">cell </span>
            {answered}/{totalCells}
          </span>
          <span>
            <span className="text-slate-400">correct </span>
            {correct}
          </span>
          {remainingSec !== null && (
            <span
              className={`rounded px-2 py-0.5 ${
                remainingSec <= 10 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {Math.floor(remainingSec / 60)}:{String(Math.floor(remainingSec % 60)).padStart(2, '0')}
            </span>
          )}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" onClick={onFinish} className="text-xs">
            End drill
          </Button>
          <Button variant="ghost" onClick={onQuit} className="text-xs">
            Quit
          </Button>
        </div>
      </div>

      <Card className="space-y-4 overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse font-mono text-xs num">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white px-2 py-1 text-left text-slate-500 text-[10px]">
                from ↓ / to →
              </th>
              {caps.map((c, i) => (
                <th key={i} className="border-b px-2 py-1 text-slate-700">
                  {formatPct(c, 2)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {caps.map((rowCap, r) => (
              <tr key={r}>
                <th className="sticky left-0 z-10 border-r bg-white px-2 py-1 text-left text-slate-700">
                  {formatPct(rowCap, 2)}
                </th>
                {caps.map((_, c) => {
                  const result = state.results[cellKey(r, c)];
                  const classes = cellStateClass(r, c, currentCell?.row ?? null, currentCell?.col ?? null, result);
                  return (
                    <td
                      key={c}
                      className={`h-10 border border-slate-200 px-2 text-center ${classes}`}
                    >
                      {r === c
                        ? '—'
                        : result
                          ? result.skipped
                            ? '·'
                            : formatPctChange(result.userInput ?? 0, 1)
                          : r === (currentCell?.row ?? null) && c === (currentCell?.col ?? null)
                            ? '?'
                            : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {currentCell && state.status === 'active' && (
        <Card className="space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="text-slate-700">
              <span className="font-mono num">{formatPct(currentCell.oldCap, 2)}</span> →{' '}
              <span className="font-mono num">{formatPct(currentCell.newCap, 2)}</span>
              <span className="ml-3 text-sm text-slate-500">% change in value?</span>
            </div>
            <div className="font-mono text-xs text-slate-400 num">±5%</div>
          </div>
          <div className="flex items-stretch rounded-lg border-2 border-slate-300 bg-white focus-within:border-slate-900">
            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="e.g. 6  (for +6%)"
              className="flex-1 bg-transparent px-3 py-2.5 font-mono outline-none num placeholder:text-slate-400"
            />
            <div className="flex items-center px-3 text-slate-500 font-mono">%</div>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => onSubmit(null, true)} className="text-xs">
              Skip (S)
            </Button>
            <Button onClick={submit} disabled={parsePct(raw) === null}>
              Submit <span className="ml-2 text-slate-400">↵</span>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
