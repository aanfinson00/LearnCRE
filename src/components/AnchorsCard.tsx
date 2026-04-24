import { useState } from 'react';
import { Card } from './ui/Card';

interface Row {
  label: string;
  value: string;
  hint?: string;
}

interface Section {
  title: string;
  rows: Row[];
}

const SECTIONS: Section[] = [
  {
    title: 'Cap → NOI multiplier',
    rows: [
      { label: '4.0%', value: '25.0×' },
      { label: '4.5%', value: '22.2×' },
      { label: '5.0%', value: '20.0×' },
      { label: '5.5%', value: '18.2×' },
      { label: '6.0%', value: '16.7×' },
      { label: '6.5%', value: '15.4×' },
      { label: '7.0%', value: '14.3×' },
      { label: '8.0%', value: '12.5×' },
      { label: '10.0%', value: '10.0×' },
    ],
  },
  {
    title: 'Loan constants (30yr monthly amort)',
    rows: [
      { label: '5.00%', value: '644 bps' },
      { label: '5.50%', value: '682 bps' },
      { label: '6.00%', value: '720 bps' },
      { label: '6.50%', value: '759 bps' },
      { label: '7.00%', value: '799 bps' },
      { label: '7.50%', value: '839 bps' },
      { label: 'IO any', value: '= rate' },
    ],
  },
  {
    title: 'IRR → EM (at n years)',
    rows: [
      { label: '10% × 5y', value: '1.61×' },
      { label: '10% × 10y', value: '2.59×' },
      { label: '12% × 5y', value: '1.76×' },
      { label: '15% × 5y', value: '2.01×' },
      { label: '15% × 7y', value: '2.66×' },
      { label: '20% × 5y', value: '2.49×' },
      { label: '20% × 7y', value: '3.58×' },
    ],
  },
  {
    title: 'Rules',
    rows: [
      { label: 'Rule of 72', value: 'yrs to 2× ≈ 72/r%' },
      { label: 'Rule of 114', value: 'yrs to 3× ≈ 114/r%' },
      { label: 'IO CoC', value: '(cap − r × LTV) / (1 − LTV)' },
      { label: 'Value uplift', value: '≈ Δbps / new cap (bps)' },
      { label: 'NER shortcut', value: 'face − TI/term − freeMos×face/12/term' },
      { label: 'Leverage mult', value: 'LTV / (1 − LTV)' },
    ],
  },
];

export function AnchorsCard() {
  const [open, setOpen] = useState(false);
  return (
    <Card className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <div className="font-medium text-slate-900">Mental-math anchors</div>
          <div className="text-xs text-slate-500">
            Cap multipliers, loan constants, IRR → EM, rules of thumb.
          </div>
        </div>
        <span className="text-slate-400">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="grid grid-cols-1 gap-5 pt-2 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                {s.title}
              </div>
              <dl className="font-mono text-sm num">
                {s.rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-baseline justify-between border-b border-dotted border-slate-200 py-1"
                  >
                    <dt className="text-slate-600">{r.label}</dt>
                    <dd className="text-slate-900">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
