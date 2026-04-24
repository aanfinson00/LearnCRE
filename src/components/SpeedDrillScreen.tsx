import { useEffect, useRef, useState } from 'react';
import { cellKey } from '../quiz/speedDrill';
import { formatCellUserInput, parseCellInput, variants } from '../quiz/speedDrillVariants';
import type { Cell, SpeedDrillState } from '../types/speedDrill';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: SpeedDrillState;
  currentCell: Cell | null;
  onSelect: (row: number, col: number) => void;
  onSubmit: (input: number | null, skipped: boolean) => void;
  onFinish: () => void;
  onQuit: () => void;
}

function cellClass(
  row: number,
  col: number,
  isDiagonal: boolean,
  currentRow: number | null,
  currentCol: number | null,
  result: { correct: boolean; skipped: boolean } | undefined,
): string {
  if (isDiagonal) return 'bg-warm-paper text-warm-mute';
  if (row === currentRow && col === currentCol)
    return 'bg-copper/20 ring-2 ring-copper text-warm-black cursor-pointer';
  if (!result) return 'bg-warm-white text-warm-stone hover:bg-warm-paper/50 cursor-pointer';
  if (result.skipped) return 'bg-warm-paper/50 text-warm-mute cursor-pointer';
  if (result.correct) return 'bg-signal-good/15 text-signal-good-ink cursor-pointer';
  return 'bg-signal-bad/15 text-signal-bad-ink cursor-pointer';
}

export function SpeedDrillScreen({ state, currentCell, onSelect, onSubmit, onFinish, onQuit }: Props) {
  const [raw, setRaw] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const variant = variants[state.variantId];

  useEffect(() => {
    setRaw('');
    inputRef.current?.focus();
  }, [currentCell?.row, currentCell?.col, state.status]);

  useEffect(() => {
    const rowCount = state.config.rowValues.length;
    const colCount = state.config.colValues.length;

    const firstNonDiagonalInDir = (
      startRow: number,
      startCol: number,
      dRow: number,
      dCol: number,
    ): { row: number; col: number } | null => {
      let r = startRow + dRow;
      let c = startCol + dCol;
      while (r >= 0 && r < rowCount && c >= 0 && c < colCount) {
        const cell = state.cells.find((x) => x.row === r && x.col === c);
        if (cell && !cell.isDiagonal) return { row: r, col: c };
        r += dRow;
        c += dCol;
      }
      return null;
    };

    const onKey = (e: KeyboardEvent) => {
      if (state.status !== 'active') return;

      if (e.key === 's' || e.key === 'S') {
        const target = e.target as HTMLElement | null;
        if (target?.tagName === 'INPUT') return;
        e.preventDefault();
        onSubmit(null, true);
        return;
      }

      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        if (currentCell === null) return;
        const dr = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0;
        const dc = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0;
        const next = firstNonDiagonalInDir(currentCell.row, currentCell.col, dr, dc);
        if (next) {
          e.preventDefault();
          onSelect(next.row, next.col);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.status, state.config.rowValues.length, state.config.colValues.length, state.cells, currentCell, onSubmit, onSelect]);

  const rows = state.config.rowValues;
  const cols = state.config.colValues;
  const totalCells = state.cells.filter((c) => !c.isDiagonal).length;
  const answered = Object.keys(state.results).length;
  const correct = Object.values(state.results).filter((r) => r.correct && !r.skipped).length;
  const remainingSec = state.remainingMs === null ? null : Math.max(0, state.remainingMs / 1000);

  const submit = () => {
    const parsed = parseCellInput(variant, raw);
    if (parsed === null) return;
    onSubmit(parsed, false);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5 py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-sm text-warm-stone num">
          <span className="font-sans text-xs font-medium text-warm-black">{variant.name}</span>
          <span>
            <span className="text-warm-mute">cell </span>
            {answered}/{totalCells}
          </span>
          <span>
            <span className="text-warm-mute">correct </span>
            {correct}
          </span>
          {remainingSec !== null && (
            <span
              className={`rounded px-2 py-0.5 ${
                remainingSec <= 10 ? 'bg-signal-bad/15 text-signal-bad-ink' : 'bg-warm-paper text-warm-ink'
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

      <Card className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse font-mono text-xs num">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-warm-white px-2 py-1 text-left text-warm-stone text-[10px]">
                {variant.rowAxis.label} ↓ / {variant.colAxis.label} →
              </th>
              {cols.map((c, i) => (
                <th key={i} className="border-b px-2 py-1 text-warm-ink">
                  {variant.colAxis.format(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowVal, r) => (
              <tr key={r}>
                <th className="sticky left-0 z-10 border-r bg-warm-white px-2 py-1 text-left text-warm-ink">
                  {variant.rowAxis.format(rowVal)}
                </th>
                {cols.map((colVal, c) => {
                  const cell = state.cells.find((x) => x.row === r && x.col === c);
                  const isDiagonal = cell?.isDiagonal ?? false;
                  const result = state.results[cellKey(r, c)];
                  const classes = cellClass(
                    r,
                    c,
                    isDiagonal,
                    currentCell?.row ?? null,
                    currentCell?.col ?? null,
                    result,
                  );
                  const isCurrent = currentCell?.row === r && currentCell?.col === c;
                  const display = isDiagonal
                    ? '—'
                    : result
                      ? result.skipped
                        ? '·'
                        : result.userInput !== null
                          ? formatCellUserInput(variant, result.userInput)
                          : '?'
                      : isCurrent
                        ? '?'
                        : '';
                  return (
                    <td
                      key={c}
                      onClick={() => {
                        if (!isDiagonal && state.status === 'active') onSelect(r, c);
                      }}
                      className={`h-10 border border-warm-line px-2 text-center ${classes}`}
                    >
                      {display}
                      {colVal === undefined ? null : null}
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
            <div className="text-warm-ink">
              <span className="font-mono num">{variant.rowAxis.format(currentCell.rowVal)}</span>
              <span className="mx-2 text-warm-mute">×</span>
              <span className="font-mono num">{variant.colAxis.format(currentCell.colVal)}</span>
              <span className="ml-3 text-sm text-warm-stone">{variant.formulaLabel}</span>
            </div>
            <div className="font-mono text-xs text-warm-mute num">
              ±{(state.config.toleranceBand * 100).toFixed(0)}%
            </div>
          </div>
          <div className="flex items-stretch rounded-lg border-2 border-warm-line bg-warm-white focus-within:border-warm-black">
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
              placeholder={variant.inputHint ?? ''}
              className="flex-1 bg-transparent px-3 py-2.5 font-mono outline-none num placeholder:text-warm-mute"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => onSubmit(null, true)} className="text-xs">
              Skip (S)
            </Button>
            <Button onClick={submit} disabled={parseCellInput(variant, raw) === null}>
              Submit <span className="ml-2 text-warm-mute">↵</span>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
