import { useMemo, useState } from 'react';
import { shuffle } from '../quiz/speedDrill';
import { formatCellExpected, variants } from '../quiz/speedDrillVariants';
import type { CellOrder, DrillVariantId, SpeedDrillConfig } from '../types/speedDrill';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const CRE_VARIANTS: DrillVariantId[] = ['capCompression', 'irrToEm', 'loanConstant', 'noiCapToValue'];
const PURE_MATH_VARIANTS: DrillVariantId[] = [
  'percentOf',
  'divideBy',
  'combinedDiscount',
  'nthRoot',
  'reciprocalTable',
];

interface Props {
  onStart: (config: SpeedDrillConfig) => void;
  onBack: () => void;
}

const TIME_BUDGETS: { label: string; value: number | null }[] = [
  { label: '60s', value: 60 },
  { label: '120s', value: 120 },
  { label: '180s', value: 180 },
  { label: 'Untimed', value: null },
];

const ORDERS: { label: string; value: CellOrder; hint: string }[] = [
  { label: 'Row by row', value: 'rowByRow', hint: 'Sequential — easiest to pattern-spot.' },
  { label: 'Col by col', value: 'colByCol', hint: 'Column-major traversal.' },
  { label: 'Random', value: 'random', hint: 'No order — forces per-cell recall.' },
];

export function SpeedDrillSetup({ onStart, onBack }: Props) {
  const [variantId, setVariantId] = useState<DrillVariantId>('capCompression');
  const [time, setTime] = useState<number | null>(120);
  const [order, setOrder] = useState<CellOrder>('rowByRow');
  const [shuffleAxes, setShuffleAxes] = useState<boolean>(true);
  const [manualNav, setManualNav] = useState<boolean>(false);

  const variant = variants[variantId];

  const previewAxes = useMemo(() => {
    const rowVals = shuffleAxes ? shuffle(variant.rowAxis.values) : [...variant.rowAxis.values];
    const colVals = shuffleAxes ? shuffle(variant.colAxis.values) : [...variant.colAxis.values];
    return { rowVals, colVals };
  }, [variant, shuffleAxes]);

  const nonDiagonalCells = useMemo(() => {
    const r = variant.rowAxis.values.length;
    const c = variant.colAxis.values.length;
    if (!variant.isDiagonalZero) return r * c;
    let diagCount = 0;
    for (const rv of variant.rowAxis.values) {
      for (const cv of variant.colAxis.values) {
        if (Math.abs(rv - cv) < 1e-9) diagCount += 1;
      }
    }
    return r * c - diagCount;
  }, [variant]);

  const renderVariantButton = (id: DrillVariantId) => {
    const v = variants[id];
    const on = variantId === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => setVariantId(id)}
        className={`rounded-lg border p-3 text-left transition-all duration-aa ease-aa ${
          on
            ? 'border-warm-black bg-warm-black text-warm-white'
            : 'border-warm-line bg-warm-white/70 text-warm-ink hover:border-copper hover:text-copper-deep'
        }`}
      >
        <div className="text-sm font-medium">{v.name}</div>
        <div
          className={`mt-0.5 text-xs ${on ? 'text-warm-paper/70' : 'text-warm-stone'}`}
        >
          {v.description}
        </div>
      </button>
    );
  };

  const start = () => {
    onStart({
      variantId,
      rowValues: shuffleAxes ? shuffle(variant.rowAxis.values) : [...variant.rowAxis.values],
      colValues: shuffleAxes ? shuffle(variant.colAxis.values) : [...variant.colAxis.values],
      order: manualNav ? 'rowByRow' : order,
      timeBudgetSec: time,
      toleranceBand: variant.toleranceBand,
      shuffleAxes,
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-warm-black">Times Table Speed Drill</h1>
        <p className="text-sm text-warm-stone">
          Pick a 2D metric. Shuffle the axes to defeat pattern-spotting. Click any cell to tackle it, or
          let the drill step through automatically.
        </p>
      </header>

      <Card className="space-y-5">
        <div className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-widest text-warm-stone">Drill</h2>

          <div>
            <div className="mb-2 text-xs font-medium text-copper-ink">CRE-flavored</div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CRE_VARIANTS.map((id) => renderVariantButton(id))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-medium text-warm-stone">Pure math</div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PURE_MATH_VARIANTS.map((id) => renderVariantButton(id))}
            </div>
          </div>
          <div className="mt-3 font-mono text-xs text-warm-stone num">
            {variant.rowAxis.label}: {previewAxes.rowVals.map(variant.rowAxis.format).join(' · ')}
          </div>
          <div className="font-mono text-xs text-warm-stone num">
            {variant.colAxis.label}: {previewAxes.colVals.map(variant.colAxis.format).join(' · ')}
          </div>
          <div className="mt-1 text-xs text-warm-stone">
            {nonDiagonalCells} cells · ±{(variant.toleranceBand * 100).toFixed(0)}% tolerance
          </div>

          <div className="mt-3 rounded-lg border border-warm-line bg-warm-paper/30 p-3">
            <div className="mb-2 flex items-baseline justify-between">
              <div className="text-[10px] font-medium uppercase tracking-widest text-warm-mute">
                Preview — {Math.min(3, variant.rowAxis.values.length)}×
                {Math.min(3, variant.colAxis.values.length)} sample
              </div>
              <div className="text-[10px] text-warm-mute">
                (unshuffled — what each cell computes)
              </div>
            </div>
            <table className="min-w-full border-collapse font-mono text-[11px] num">
              <thead>
                <tr>
                  <th className="px-1 py-1 text-left text-[9px] font-normal text-warm-mute">
                    {variant.rowAxis.label} ↓ / {variant.colAxis.label} →
                  </th>
                  {variant.colAxis.values.slice(0, 3).map((c, i) => (
                    <th
                      key={i}
                      className="border-b border-warm-line px-2 py-1 text-warm-ink font-medium"
                    >
                      {variant.colAxis.format(c)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variant.rowAxis.values.slice(0, 3).map((rv, r) => (
                  <tr key={r}>
                    <th className="border-r border-warm-line px-2 py-1 text-left text-warm-ink font-medium">
                      {variant.rowAxis.format(rv)}
                    </th>
                    {variant.colAxis.values.slice(0, 3).map((cv, c) => {
                      const isDiag =
                        variant.isDiagonalZero && Math.abs(rv - cv) < 1e-9;
                      const val = isDiag ? 0 : variant.computeCell(rv, cv);
                      return (
                        <td
                          key={c}
                          className={`border border-warm-line px-2 py-1 text-center ${
                            isDiag
                              ? 'bg-warm-paper/60 text-warm-mute'
                              : 'bg-warm-white/70 text-warm-ink'
                          }`}
                        >
                          {isDiag ? '—' : formatCellExpected(variant, val)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-warm-line bg-warm-white p-3 text-sm">
            <input
              type="checkbox"
              checked={shuffleAxes}
              onChange={(e) => setShuffleAxes(e.target.checked)}
              className="h-4 w-4 rounded border-warm-line"
            />
            <div className="flex-1">
              <div className="font-medium text-warm-black">Shuffle row & column order</div>
              <div className="text-xs text-warm-stone">
                Otherwise a sorted grid lets you derive the answers from the pattern.
              </div>
            </div>
          </label>
        </div>

        <div>
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-warm-line bg-warm-white p-3 text-sm">
            <input
              type="checkbox"
              checked={manualNav}
              onChange={(e) => setManualNav(e.target.checked)}
              className="h-4 w-4 rounded border-warm-line"
            />
            <div className="flex-1">
              <div className="font-medium text-warm-black">Manual cell navigation</div>
              <div className="text-xs text-warm-stone">
                Click any cell to answer it — no forced order. Disables Row/Col/Random stepping.
              </div>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 font-medium text-warm-black">Time budget</h2>
            <div className="flex flex-wrap gap-2">
              {TIME_BUDGETS.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setTime(t.value)}
                  className={`rounded-md border px-3 py-1.5 text-sm ${
                    time === t.value
                      ? 'border-warm-black bg-warm-black text-white'
                      : 'border-warm-line bg-warm-white text-warm-ink hover:border-warm-stone'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-medium text-warm-black">Auto-step order</h2>
            <div className="flex flex-wrap gap-2">
              {ORDERS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  disabled={manualNav}
                  onClick={() => setOrder(o.value)}
                  className={`rounded-md border px-3 py-1.5 text-sm transition ${
                    manualNav
                      ? 'cursor-not-allowed border-warm-line bg-warm-paper/50 text-warm-mute'
                      : order === o.value
                        ? 'border-warm-black bg-warm-black text-white'
                        : 'border-warm-line bg-warm-white text-warm-ink hover:border-warm-stone'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <div className="mt-1 text-xs text-warm-stone">
              {manualNav
                ? 'Disabled — manual nav on.'
                : ORDERS.find((o) => o.value === order)?.hint}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" onClick={onBack} className="text-xs">
            Back to quiz setup
          </Button>
          <Button onClick={start}>
            Start drill <span className="ml-2 text-warm-mute">↵</span>
          </Button>
        </div>
      </Card>

      <div className="text-center text-xs text-warm-mute">
        Enter to submit · S to skip · click any cell to jump to it
      </div>
    </div>
  );
}
