import { annualDebtService, loanConstant } from '../../math/debt';
import { formatMultiple, formatPct, formatUsd, formatYears } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  noi: number;
  dscrTarget: number;
  interestRate: number;
  amortYears: number;
}

export function DscrLoanSizingViz({
  noi,
  dscrTarget,
  interestRate,
  amortYears,
}: Props) {
  const maxDs = noi / dscrTarget;
  const k = loanConstant(interestRate, amortYears);
  const maxLoan = maxDs / k;
  const checkDs = annualDebtService(maxLoan, interestRate, amortYears);
  // The cascade visualizes NOI > DS > Loan, where each step is a sub-relationship.
  // For sizing the bars, we want NOI to be the longest, then DS scaled to NOI by
  // 1/DSCR, and Loan shown by its size relative to NOI for intuition.
  const max = Math.max(noi, maxLoan);
  const noiPct = (noi / max) * 100;
  const dsPct = (maxDs / max) * 100;
  const loanPct = (maxLoan / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="NOI"
          width={noiPct}
          value={formatUsd(noi)}
          tone="muted"
          labelWidthPx={110}
        />
        <BarRow
          label={`÷ ${formatMultiple(dscrTarget)} DSCR`}
          width={dsPct}
          value={formatUsd(maxDs)}
          tone="stone"
          labelWidthPx={110}
        />
        <BarRow
          label="Max loan"
          width={loanPct}
          value={formatUsd(maxLoan)}
          tone="good"
          labelWidthPx={110}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">
            Loan terms ({formatPct(interestRate)}, {formatYears(amortYears)})
          </span>
          <span className="text-warm-black">k = {(k * 100).toFixed(2)}%</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Implied DS at max loan</span>
          <span className="text-warm-black">{formatUsd(checkDs)}</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Cascade: NOI ÷ DSCR = max DS. Max loan = max DS ÷ loan constant.
        </div>
      </div>
    </div>
  );
}
