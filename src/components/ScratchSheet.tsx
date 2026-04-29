import { useState, useEffect, useRef } from 'react';
import { indexToColLetters } from '../excel/parser';
import { useScratchSheet } from '../hooks/useScratchSheet';

/**
 * Slide-out scratch sheet. Toggled by the floating ⊟ button (bottom-right) or
 * the global `S` key. Cells live in `useScratchSheet` so state survives across
 * questions. Reuses the Excel parser + evaluator for live formula support.
 */
export function ScratchSheet() {
  const { open, setOpen, rows, cols, cells, setCell, clear, evalResult } = useScratchSheet();

  return (
    <>
      {/* Floating trigger — always present in the bottom-right corner */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close scratch sheet' : 'Open scratch sheet'}
        title={open ? 'Close scratch sheet (`)' : 'Open scratch sheet (`)'}
        className={`fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border shadow-aa transition-all duration-aa ease-aa ${
          open
            ? 'border-copper bg-copper text-warm-white'
            : 'border-warm-line bg-warm-white text-warm-stone hover:border-copper hover:text-copper-deep'
        }`}
      >
        <span className="font-mono text-base num">⊟</span>
      </button>

      {/* Backdrop on mobile */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close scratch sheet"
          className="fixed inset-0 z-30 bg-warm-black/30 backdrop-blur-sm sm:hidden"
        />
      )}

      {/* Slide-out panel — full-screen on mobile, fixed-width sidecar on sm+ */}
      <aside
        className={`fixed inset-y-0 right-0 z-30 flex w-full flex-col border-l border-warm-line bg-warm-white shadow-aa transition-transform duration-aa-slow ease-aa sm:max-w-sm ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <header className="flex items-baseline justify-between border-b border-warm-line px-4 py-3">
          <div>
            <div className="display text-lg text-warm-black">
              Scratch<span className="text-copper">.</span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
              Click a cell · type a formula · live preview
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={clear}
              className="rounded-md border border-warm-line bg-warm-white px-2.5 py-1 text-xs text-warm-stone hover:border-signal-bad hover:text-signal-bad-ink"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-warm-line bg-warm-white px-2.5 py-1 text-xs text-warm-stone hover:border-warm-black hover:text-warm-black"
            >
              ✕
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <Grid
            rows={rows}
            cols={cols}
            cells={cells}
            values={evalResult.values}
            errors={evalResult.errors}
            onChange={setCell}
          />

          <div className="mt-4 space-y-1 text-[10px] text-warm-mute">
            <div>
              <span className="font-mono num text-warm-stone">↵</span>{' '}
              moves to next cell · type <span className="font-mono num">=A1+B1</span>{' '}
              to reference others.
            </div>
            <div>
              Supports <span className="font-mono num">+ − × ÷ ^</span>, parens,
              ranges (<span className="font-mono num">A1:A5</span>), SUM AVERAGE MIN
              MAX ROUND ABS IF PMT PV IPMT PPMT NPV IRR.
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Grid({
  rows,
  cols,
  cells,
  values,
  errors,
  onChange,
}: {
  rows: number;
  cols: number;
  cells: Record<string, string>;
  values: Record<string, number>;
  errors: Record<string, string>;
  onChange: (address: string, raw: string) => void;
}) {
  // Build header row + body
  return (
    <div className="overflow-x-auto rounded-lg border border-warm-line bg-warm-paper/30">
      <table className="w-full border-collapse font-mono text-[11px] num">
        <thead>
          <tr className="bg-warm-paper/60">
            <th className="border-r border-warm-line px-1.5 py-1 text-warm-mute" />
            {Array.from({ length: cols }, (_, c) => (
              <th
                key={c}
                className="border-r border-warm-line px-2 py-1 text-center text-[10px] font-medium text-warm-mute last:border-r-0"
              >
                {indexToColLetters(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, r) => (
            <tr key={r} className="border-t border-warm-line">
              <td className="border-r border-warm-line bg-warm-paper/40 px-1.5 py-1 text-center text-[10px] text-warm-mute">
                {r + 1}
              </td>
              {Array.from({ length: cols }, (_, c) => {
                const addr = `${indexToColLetters(c)}${r + 1}`;
                return (
                  <CellInput
                    key={addr}
                    address={addr}
                    raw={cells[addr] ?? ''}
                    value={values[addr]}
                    error={errors[addr]}
                    onChange={(v) => onChange(addr, v)}
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

function CellInput({
  address,
  raw,
  value,
  error,
  onChange,
}: {
  address: string;
  raw: string;
  value: number | undefined;
  error: string | undefined;
  onChange: (raw: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // When unfocused, show the computed value (if any). When focused, show raw formula.
  const display = focused
    ? raw
    : raw === ''
      ? ''
      : error
        ? error.startsWith('#') ? error.split(' ')[0] : '#ERR'
        : value !== undefined && Number.isFinite(value)
          ? formatComputed(value)
          : raw;

  const tone = error
    ? 'bg-signal-bad/10 text-signal-bad-ink'
    : raw !== '' && value !== undefined && !focused
      ? 'bg-copper/5 text-warm-black'
      : 'bg-warm-white text-warm-black';

  // Tab/Enter to advance to next cell
  useEffect(() => {
    if (!focused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Tab') {
        // Let the browser handle Tab natively; for Enter we let blur fire
        if (e.key === 'Enter') {
          e.preventDefault();
          inputRef.current?.blur();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused]);

  return (
    <td
      className={`border-r border-warm-line p-0 last:border-r-0 ${tone}`}
      title={error ? error : undefined}
    >
      <input
        ref={inputRef}
        type="text"
        value={display}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        spellCheck={false}
        autoComplete="off"
        aria-label={`Cell ${address}`}
        className={`w-full bg-transparent px-2 py-1.5 text-right font-mono text-[11px] outline-none num focus:bg-copper/10 ${
          error && !focused ? 'text-signal-bad-ink' : ''
        }`}
      />
    </td>
  );
}

function formatComputed(v: number): string {
  // Match the heuristic from ExcelGrid for visual consistency
  if (Math.abs(v) >= 1000) return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (Math.abs(v) >= 1) return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return v.toLocaleString('en-US', { maximumFractionDigits: 4 });
}
