import { useState } from 'react';
import { CAP_PRESETS } from '../quiz/speedDrill';
import type { CellOrder, SpeedDrillConfig } from '../types/speedDrill';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { formatPct } from '../math/rounding';

interface Props {
  onStart: (config: SpeedDrillConfig) => void;
  onBack: () => void;
}

type PresetKey = keyof typeof CAP_PRESETS;

const PRESETS: { key: PresetKey; label: string; hint: string }[] = [
  { key: 'warmup', label: 'Warm-up (5×5)', hint: '20 non-diagonal cells at 100 bps spacing.' },
  { key: 'standard', label: 'Standard (7×7)', hint: '42 cells at 50 bps spacing.' },
  { key: 'gauntlet', label: 'Gauntlet (9×9)', hint: '72 cells across 4%–8%.' },
];

const TIME_BUDGETS: { label: string; value: number | null }[] = [
  { label: '60s', value: 60 },
  { label: '120s', value: 120 },
  { label: '180s', value: 180 },
  { label: 'Untimed', value: null },
];

const ORDERS: { label: string; value: CellOrder }[] = [
  { label: 'Row by row', value: 'rowByRow' },
  { label: 'Col by col', value: 'colByCol' },
  { label: 'Random', value: 'random' },
];

export function SpeedDrillSetup({ onStart, onBack }: Props) {
  const [preset, setPreset] = useState<PresetKey>('standard');
  const [time, setTime] = useState<number | null>(120);
  const [order, setOrder] = useState<CellOrder>('rowByRow');

  const start = () => {
    onStart({
      caps: [...CAP_PRESETS[preset]],
      order,
      timeBudgetSec: time,
      toleranceBand: 0.05,
    });
  };

  const caps = CAP_PRESETS[preset];
  const cellCount = caps.length * caps.length - caps.length;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Cap Rate Times Table</h1>
        <p className="text-sm text-slate-600">
          Fill in % value change going from each starting cap to each ending cap. Diagonal is 0 (same cap = no change).
        </p>
      </header>

      <Card className="space-y-5">
        <div>
          <h2 className="mb-2 font-medium text-slate-900">Grid</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPreset(p.key)}
                className={`rounded-lg border p-3 text-left ${
                  preset === p.key
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="text-sm font-medium">{p.label}</div>
                <div className={`mt-0.5 text-xs ${preset === p.key ? 'text-slate-300' : 'text-slate-500'}`}>
                  {p.hint}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-2 font-mono text-xs text-slate-500 num">
            Caps: {caps.map((c) => formatPct(c)).join('  ')} · {cellCount} cells to fill
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 font-medium text-slate-900">Time budget</h2>
            <div className="flex flex-wrap gap-2">
              {TIME_BUDGETS.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setTime(t.value)}
                  className={`rounded-md border px-3 py-1.5 text-sm ${
                    time === t.value
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-medium text-slate-900">Cell order</h2>
            <div className="flex flex-wrap gap-2">
              {ORDERS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setOrder(o.value)}
                  className={`rounded-md border px-3 py-1.5 text-sm ${
                    order === o.value
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" onClick={onBack} className="text-xs">
            Back to quiz setup
          </Button>
          <Button onClick={start}>
            Start drill <span className="ml-2 text-slate-400">↵</span>
          </Button>
        </div>
      </Card>

      <div className="text-center text-xs text-slate-400">
        Enter to submit · S to skip cell · 5% tolerance band
      </div>
    </div>
  );
}
