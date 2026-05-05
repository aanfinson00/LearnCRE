import { formatPct } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  interestRate: number;
  amortYears: number;
}

export function LoanConstantViz({ interestRate, amortYears }: Props) {
  const r = interestRate / 12;
  const n = amortYears * 12;
  // Monthly payment per $1 loan, then annualized.
  const monthly = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const constant = monthly * 12;
  // Headroom over interest-only constant (= rate) shows the principal layer.
  const interestOnly = interestRate;
  const principalLayer = constant - interestOnly;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Interest only"
          width={(interestOnly / constant) * 100}
          value={formatPct(interestOnly)}
          tone="stone"
          labelWidthPx={110}
        />
        <BarRow
          label="+ Principal"
          width={100}
          value={`${formatPct(constant)} total`}
          tone="good"
          labelWidthPx={110}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Loan constant</span>
          <span className="font-medium text-copper-deep">{formatPct(constant)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-mute">Principal layer</span>
          <span className="text-warm-stone">+{formatPct(principalLayer)}</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          {amortYears}-yr amortizing at {formatPct(interestRate)}. Multiply by
          loan amount to get annual debt service.
        </div>
      </div>
    </div>
  );
}
