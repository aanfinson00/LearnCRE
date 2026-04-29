import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  noi: number;
  debtYieldTarget: number;
}

export function DebtYieldViz({ noi, debtYieldTarget }: Props) {
  // Max loan = NOI / debt-yield-target
  const maxLoan = noi / debtYieldTarget;
  const max = Math.max(noi, maxLoan);
  const noiPct = (noi / max) * 100;
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
          labelWidthPx={90}
        />
        <BarRow
          label="Max loan"
          width={loanPct}
          value={formatUsd(maxLoan)}
          tone="good"
          labelWidthPx={90}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Debt-yield target</span>
          <span className="text-warm-black">{formatPct(debtYieldTarget)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Loan / NOI</span>
          <span className="font-medium text-copper-deep">
            {(maxLoan / noi).toFixed(2)}x
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Max loan = NOI / debt-yield. Lender protection: at this loan, NOI alone
          covers {formatPct(debtYieldTarget)} of principal.
        </div>
      </div>
    </div>
  );
}
