import { cellKey } from '../quiz/speedDrill';
import { formatPct, formatPctChange } from '../math/rounding';
import type { SpeedDrillState } from '../types/speedDrill';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: SpeedDrillState;
  onRestart: () => void;
  onNewSetup: () => void;
}

export function SpeedDrillResults({ state, onRestart, onNewSetup }: Props) {
  const caps = state.config.caps;
  const total = caps.length * caps.length - caps.length;
  let correct = 0;
  let skipped = 0;
  let totalElapsed = 0;
  let attempted = 0;
  for (const r of Object.values(state.results)) {
    if (r.skipped) {
      skipped += 1;
    } else {
      attempted += 1;
      totalElapsed += r.elapsedMs;
      if (r.correct) correct += 1;
    }
  }
  const accuracy = attempted === 0 ? 0 : correct / attempted;
  const avgSec = attempted === 0 ? 0 : totalElapsed / attempted / 1000;

  return (
    <div className="mx-auto max-w-4xl space-y-5 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Drill complete</h1>
        <p className="text-sm text-slate-500">
          {attempted}/{total} attempted · {skipped} skipped · Tolerance {formatPct(state.config.toleranceBand)}
        </p>
      </header>

      <Card>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Metric label="Accuracy" value={`${Math.round(accuracy * 100)}%`} />
          <Metric label="Correct" value={`${correct}/${attempted}`} />
          <Metric label="Skipped" value={`${skipped}`} />
          <Metric label="Avg / cell" value={attempted === 0 ? '—' : `${avgSec.toFixed(1)}s`} />
        </div>
      </Card>

      <Card className="overflow-x-auto">
        <h2 className="mb-3 font-medium">Heatmap</h2>
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
                {caps.map((colCap, c) => {
                  if (r === c) {
                    return (
                      <td
                        key={c}
                        className="h-12 border border-slate-200 px-2 text-center bg-slate-50 text-slate-400"
                      >
                        —
                      </td>
                    );
                  }
                  const result = state.results[cellKey(r, c)];
                  const trueVal = rowCap / colCap - 1;
                  let bg = 'bg-slate-50 text-slate-500';
                  if (result) {
                    if (result.skipped) bg = 'bg-slate-100 text-slate-400';
                    else if (result.correct) bg = 'bg-emerald-100 text-emerald-800';
                    else bg = 'bg-rose-100 text-rose-800';
                  }
                  return (
                    <td key={c} className={`h-12 border border-slate-200 px-2 text-center ${bg}`}>
                      <div className="leading-tight">
                        {result && !result.skipped && result.userInput !== null
                          ? formatPctChange(result.userInput, 1)
                          : result?.skipped
                            ? '·'
                            : '—'}
                      </div>
                      <div className="text-[10px] opacity-70 leading-tight">
                        true {formatPctChange(trueVal, 1)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onNewSetup}>
          Change setup
        </Button>
        <Button onClick={onRestart}>Play again</Button>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-xl num text-slate-900">{value}</div>
    </div>
  );
}
