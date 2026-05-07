import type { MouseEvent } from 'react';
import { indexToColLetters } from '../excel/parser';
import type { Sheet, SheetCell, SheetLayout } from '../excel/types';
import type { GradingResult } from '../types/modelingTest';

interface Props {
  layout: SheetLayout;
  /** Current resolved values for all cells (assumption + computed + target). */
  sheet: Sheet;
  /** Per-target parse errors. */
  parseErrors: Record<string, string>;
  /** Map of target cell address → set of refs flagged as outputs. */
  outputRefs: Set<string>;
  /** Address of the cell currently focused in the formula bar. */
  focusRef: string | null;
  /** Click on a target cell focuses it; click on an assumption cell inserts. */
  onTargetClick: (address: string) => void;
  onInsertClick: (address: string, shiftKey: boolean) => void;
  /** Cells highlighted because the active formula references them. */
  highlightedAddresses?: Set<string>;
  /** When set, render results coloring on output cells (post-grading). */
  reveal?: GradingResult | null;
}

function formatValue(c: Pick<SheetCell, 'format'>, v?: number | null): string {
  if (v === undefined || v === null || !Number.isFinite(v)) return '—';
  switch (c.format) {
    case 'usd': {
      const sign = v < 0 ? '-' : '';
      const abs = Math.abs(v);
      return `${sign}$${abs.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    case 'usdPerSf':
      return `$${v.toFixed(2)}/SF`;
    case 'pct':
      return `${(v * 100).toFixed(2)}%`;
    case 'multiple':
      return `${v.toFixed(2)}x`;
    case 'years':
      return `${v.toFixed(1)} yrs`;
    case 'bps':
      return `${Math.round(v * 10_000)} bps`;
    case 'number':
      return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
    default:
      if (Math.abs(v) >= 1000) return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
      return v.toLocaleString('en-US', { maximumFractionDigits: 4 });
  }
}

export function ModelingTestGrid({
  layout,
  sheet,
  parseErrors,
  outputRefs,
  focusRef,
  onTargetClick,
  onInsertClick,
  highlightedAddresses,
  reveal,
}: Props) {
  const byAddr = new Map(layout.cells.map((c) => [c.address, c]));
  const colHeaders: string[] = [];
  for (let c = 0; c < layout.cols; c++) colHeaders.push(indexToColLetters(c));
  const outputResultByRef = new Map(reveal?.outputs.map((o) => [o.ref, o]) ?? []);

  return (
    <div className="overflow-x-auto rounded-lg border border-warm-line bg-warm-white/80 shadow-aa">
      <table className="w-full border-collapse font-mono text-xs num">
        <thead>
          <tr className="bg-warm-paper/60">
            {/* Corner cell — sticky to the left so the row-number column has a
                matching opaque header during horizontal scroll. */}
            <th className="sticky left-0 z-20 border-r border-warm-line bg-warm-paper px-2 py-1.5 text-warm-mute" />
            {colHeaders.map((h) => (
              <th
                key={h}
                className="border-r border-warm-line px-2 py-1.5 text-center text-[10px] font-medium text-warm-mute last:border-r-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: layout.rows }, (_, r) => (
            <tr key={r} className="border-t border-warm-line">
              {/* Row-number column — sticky-left so users keep their bearings
                  on phones / narrow viewports during horizontal scroll. */}
              <td className="sticky left-0 z-10 border-r border-warm-line bg-warm-paper px-2 py-1.5 text-center text-[10px] text-warm-mute">
                {r + 1}
              </td>
              {Array.from({ length: layout.cols }, (_, c) => {
                const addr = `${indexToColLetters(c)}${r + 1}`;
                const cell = byAddr.get(addr);
                if (!cell) {
                  return (
                    <td
                      key={c}
                      className="border-r border-warm-line bg-warm-paper/20 px-2 py-1.5 last:border-r-0"
                    />
                  );
                }
                return (
                  <CellTd
                    key={c}
                    cell={cell}
                    sheet={sheet}
                    parseError={parseErrors[cell.address] ?? null}
                    isOutput={outputRefs.has(cell.address)}
                    isFocused={focusRef === cell.address}
                    isHighlighted={highlightedAddresses?.has(cell.address) ?? false}
                    onTargetClick={onTargetClick}
                    onInsertClick={onInsertClick}
                    revealResult={outputResultByRef.get(cell.address) ?? null}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CellTd({
  cell,
  sheet,
  parseError,
  isOutput,
  isFocused,
  isHighlighted,
  onTargetClick,
  onInsertClick,
  revealResult,
}: {
  cell: SheetCell;
  sheet: Sheet;
  parseError: string | null;
  isOutput: boolean;
  isFocused: boolean;
  isHighlighted: boolean;
  onTargetClick: (address: string) => void;
  onInsertClick: (address: string, shiftKey: boolean) => void;
  revealResult: GradingResult['outputs'][number] | null;
}) {
  const baseTd =
    'border-r border-warm-line px-2 py-1.5 last:border-r-0 align-middle whitespace-nowrap relative';
  const highlightCls = isHighlighted ? 'ring-2 ring-copper ring-inset' : '';

  if (cell.role === 'spacer') {
    return <td className={`${baseTd} bg-warm-paper/20`} />;
  }
  if (cell.role === 'header') {
    return (
      <td className={`${baseTd} bg-warm-paper/50 text-[11px] text-warm-stone`}>
        {cell.text ?? cell.label ?? ''}
      </td>
    );
  }

  if (cell.role === 'assumption' || cell.role === 'computed') {
    const v = cell.role === 'assumption' ? cell.value : cell.computed;
    const handleMouseDown = (e: MouseEvent<HTMLTableCellElement>) => {
      e.preventDefault();
      onInsertClick(cell.address, e.shiftKey);
    };
    return (
      <td
        onMouseDown={handleMouseDown}
        title={`Click to insert ${cell.address}`}
        className={`${baseTd} cursor-pointer bg-warm-white text-right text-warm-black hover:ring-2 hover:ring-copper/40 hover:ring-inset ${highlightCls}`}
      >
        {formatValue(cell, v)}
      </td>
    );
  }

  // target cell
  const v = sheet[cell.address];
  const filled = typeof v === 'number' && Number.isFinite(v);
  const handleMouseDown = (e: MouseEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    onTargetClick(cell.address);
  };

  let tone: string;
  let display: string;
  if (revealResult) {
    if (revealResult.grade === 'pass') {
      tone = 'bg-signal-good/15 border-signal-good/60 text-signal-good-ink';
    } else if (revealResult.grade === 'missing') {
      tone = 'bg-warm-paper/60 border-warm-line text-warm-mute';
    } else {
      tone = 'bg-signal-bad/10 border-signal-bad/60 text-signal-bad-ink';
    }
    display = filled ? formatValue(cell, v) : revealResult.grade === 'missing' ? '—' : '⚠';
  } else if (parseError) {
    tone = 'bg-signal-bad/5 border-signal-bad/40 text-signal-bad-ink';
    display = '⚠';
  } else if (filled) {
    tone = isOutput
      ? 'bg-copper/10 border-copper/50 text-copper-deep'
      : 'bg-warm-white border-warm-line text-warm-stone';
    display = formatValue(cell, v);
  } else {
    tone = isOutput
      ? 'bg-copper/5 border-copper/30 text-warm-mute'
      : 'bg-warm-paper/30 border-warm-line/60 text-warm-mute';
    display = '?';
  }
  const focusRing = isFocused ? 'ring-2 ring-copper/80 ring-inset' : '';

  return (
    <td
      onMouseDown={handleMouseDown}
      title={`${cell.label ?? cell.address}${isOutput ? ' · graded output' : ''}`}
      className={`${baseTd} cursor-pointer border-2 text-right font-medium ${tone} ${focusRing} ${highlightCls}`}
    >
      {display}
    </td>
  );
}
