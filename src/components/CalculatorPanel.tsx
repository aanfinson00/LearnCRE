import { useState } from 'react';
import { evaluateExpression, formatResult } from '../quiz/calculator';

interface HistoryEntry {
  raw: string;
  result: string;
}

export function CalculatorPanel() {
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const parsed = evaluateExpression(raw);
  const preview = parsed !== null ? formatResult(parsed) : null;

  const commit = () => {
    if (parsed === null) return;
    setHistory((h) => [{ raw, result: formatResult(parsed) }, ...h].slice(0, 5));
    setRaw('');
  };

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium text-warm-stone hover:text-warm-black"
      >
        <span>
          <span className="mr-2 font-mono text-copper">⌘</span>
          Calculator
          <span className="ml-2 font-normal text-warm-mute">
            supports $, k, M, %, ^ and parens
          </span>
        </span>
        <span className="text-warm-mute">{open ? '▾' : '▸'}</span>
      </button>

      {open && (
        <div className="border-t border-warm-line px-3 py-3 space-y-2">
          <div className="flex items-stretch rounded-md border border-warm-line bg-warm-white focus-within:border-copper">
            <input
              type="text"
              inputMode="decimal"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  commit();
                }
              }}
              placeholder="e.g. 5M / 6%   or   (1.1)^10   or   500k × 0.95 / 5.5%"
              className="flex-1 bg-transparent px-3 py-2 font-mono text-sm outline-none num placeholder:text-warm-mute/70"
            />
            <div className="flex items-center px-3 font-mono text-sm tabular-nums">
              {preview ? (
                <span className="text-warm-black">{preview}</span>
              ) : raw ? (
                <span className="text-signal-bad-ink">invalid</span>
              ) : (
                <span className="text-warm-mute">—</span>
              )}
            </div>
          </div>

          {history.length > 0 && (
            <div className="space-y-1 pt-1">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between border-b border-dotted border-warm-line/70 pb-1 font-mono text-xs num"
                >
                  <span className="text-warm-stone">{h.raw}</span>
                  <span className="text-warm-black">= {h.result}</span>
                </div>
              ))}
            </div>
          )}

          <div className="text-[10px] text-warm-mute">
            Enter commits to history. Not sent with your answer — keep using the quiz input above.
          </div>
        </div>
      )}
    </div>
  );
}
