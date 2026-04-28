import type { MouseEvent } from 'react';
import type { SheetCell, SheetLayout } from '../excel/types';
import { indexToColLetters } from '../excel/parser';

interface Props {
  layout: SheetLayout;
  /** Live computed value for the target cell, if any */
  livePreview?: number | null;
  /** Whether the live preview is in an error state */
  livePreviewError?: boolean;
  /** Whether to also reveal the correct expected value on the target */
  reveal?: { expected: number; submitted: number | null; correct: boolean } | null;
  /**
   * Set of cell addresses currently referenced in the formula being typed —
   * cells in this set get a copper outline ring.
   */
  highlightedAddresses?: Set<string>;
  /**
   * If provided, cells become clickable. Address is the A1-style cell key,
   * shiftKey indicates modifier state (used to extend a previous click into
   * a range).
   */
  onCellClick?: (address: string, shiftKey: boolean) => void;
}

function formatValue(c: SheetCell, v?: number | null): string {
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
      // Heuristic fallback
      if (Math.abs(v) >= 1000) return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
      return v.toLocaleString('en-US', { maximumFractionDigits: 4 });
  }
}

export function ExcelGrid({
  layout,
  livePreview,
  livePreviewError,
  reveal,
  highlightedAddresses,
  onCellClick,
}: Props) {
  // Build a lookup keyed by address for O(1) access
  const byAddr = new Map(layout.cells.map((c) => [c.address, c]));
  const colHeaders: string[] = [];
  for (let c = 0; c < layout.cols; c++) colHeaders.push(indexToColLetters(c));

  return (
    <div className="overflow-x-auto rounded-lg border border-warm-line bg-warm-white/80 shadow-aa">
      <table className="w-full border-collapse font-mono text-xs num">
        <thead>
          <tr className="bg-warm-paper/60">
            <th className="border-r border-warm-line px-2 py-1.5 text-warm-mute" />
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
              <td className="border-r border-warm-line bg-warm-paper/40 px-2 py-1.5 text-center text-[10px] text-warm-mute">
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
                    livePreview={cell.role === 'target' ? livePreview ?? null : null}
                    livePreviewError={cell.role === 'target' ? !!livePreviewError : false}
                    reveal={cell.role === 'target' ? reveal ?? null : null}
                    highlighted={highlightedAddresses?.has(cell.address) ?? false}
                    onCellClick={onCellClick}
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
  livePreview,
  livePreviewError,
  reveal,
  highlighted,
  onCellClick,
}: {
  cell: SheetCell;
  livePreview: number | null;
  livePreviewError: boolean;
  reveal: { expected: number; submitted: number | null; correct: boolean } | null;
  highlighted: boolean;
  onCellClick?: (address: string, shiftKey: boolean) => void;
}) {
  const baseTd =
    'border-r border-warm-line px-2 py-1.5 last:border-r-0 align-middle whitespace-nowrap relative';

  // Spacers and headers never participate in click-to-insert
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

  const handleMouseDown = (e: MouseEvent<HTMLTableCellElement>) => {
    if (!onCellClick) return;
    // Prevent the input from losing focus before we route the click
    e.preventDefault();
    onCellClick(cell.address, e.shiftKey);
  };

  const interactive = !!onCellClick;
  const interactiveCls = interactive
    ? 'cursor-pointer hover:ring-2 hover:ring-copper/40 hover:ring-inset'
    : '';
  const highlightCls = highlighted ? 'ring-2 ring-copper ring-inset' : '';

  if (cell.role === 'assumption' || cell.role === 'computed') {
    const v = cell.role === 'assumption' ? cell.value : cell.computed;
    return (
      <td
        onMouseDown={interactive ? handleMouseDown : undefined}
        title={interactive ? `Click to insert ${cell.address}` : cell.address}
        className={`${baseTd} bg-warm-white text-right text-warm-black ${interactiveCls} ${highlightCls}`}
      >
        {formatValue(cell, v)}
      </td>
    );
  }

  // target cell
  const tone = reveal
    ? reveal.correct
      ? 'bg-signal-good/10 border-signal-good/60 text-signal-good-ink'
      : 'bg-signal-bad/10 border-signal-bad/60 text-signal-bad-ink'
    : livePreviewError
      ? 'bg-signal-bad/5 border-signal-bad/40 text-signal-bad-ink'
      : livePreview !== null
        ? 'bg-copper/10 border-copper/50 text-copper-deep'
        : 'bg-copper/5 border-copper/30 text-warm-stone';
  const display = reveal
    ? reveal.submitted !== null
      ? formatValue(cell, reveal.submitted)
      : '—'
    : livePreviewError
      ? '⚠'
      : livePreview !== null
        ? formatValue(cell, livePreview)
        : '?';
  return (
    <td
      className={`${baseTd} border-2 text-right font-medium ${tone} ${highlightCls}`}
      title={`Target cell ${cell.address}`}
    >
      {display}
    </td>
  );
}
