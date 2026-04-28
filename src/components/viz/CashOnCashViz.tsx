import { formatPct, formatUsd } from '../../math/rounding';

interface Props {
  noi: number;
  debtServiceAnnual: number;
  equityIn: number;
  loanAmount: number;
  purchasePrice: number;
}

export function CashOnCashViz({
  noi,
  debtServiceAnnual,
  equityIn,
  loanAmount,
  purchasePrice,
}: Props) {
  const cashFlow = noi - debtServiceAnnual;
  const coc = cashFlow / equityIn;
  const positive = cashFlow >= 0;
  const dsPct = noi > 0 ? Math.min(100, (debtServiceAnnual / noi) * 100) : 0;
  const cfPct = Math.max(0, 100 - dsPct);
  const equityShare = (equityIn / purchasePrice) * 100;
  const loanShare = (loanAmount / purchasePrice) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-1.5">
        <div className="text-[10px] uppercase tracking-wider text-warm-mute">
          NOI = {formatUsd(noi)}
        </div>
        <div className="flex h-10 overflow-hidden rounded border border-warm-line">
          <div
            className="flex h-full items-center justify-end pr-2 bg-warm-stone/50 transition-all duration-aa-slow ease-aa font-mono text-[10px] num text-warm-white"
            style={{ width: `${dsPct}%` }}
          >
            {dsPct > 22 ? `DS ${formatUsd(debtServiceAnnual)}` : ''}
          </div>
          <div
            className={`flex h-full items-center justify-start pl-2 transition-all duration-aa-slow ease-aa font-mono text-[10px] num ${
              positive ? 'bg-copper text-warm-white' : 'bg-signal-bad/70 text-warm-white'
            }`}
            style={{ width: `${cfPct}%` }}
          >
            {cfPct > 18 ? `CF ${formatUsd(cashFlow)}` : ''}
          </div>
        </div>
        <div className="grid grid-cols-2 text-[10px] uppercase tracking-wider text-warm-mute">
          <span>Debt service</span>
          <span className="text-right">Cash flow</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="text-[10px] uppercase tracking-wider text-warm-mute">
          Capital stack {formatUsd(purchasePrice)}
        </div>
        <div className="flex h-6 overflow-hidden rounded border border-warm-line">
          <div
            className="bg-warm-stone/30 transition-all duration-aa-slow ease-aa"
            style={{ width: `${loanShare}%` }}
          />
          <div
            className="bg-copper-soft/70 transition-all duration-aa-slow ease-aa"
            style={{ width: `${equityShare}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[10px] num text-warm-mute">
          <span>Loan {formatUsd(loanAmount)}</span>
          <span>Equity {formatUsd(equityIn)}</span>
        </div>
      </div>

      <div className="flex items-baseline justify-between border-t border-warm-line pt-2 text-xs">
        <span className="text-warm-stone">Cash-on-cash return</span>
        <span
          className={`font-mono num font-medium ${
            positive ? 'text-copper-deep' : 'text-signal-bad-ink'
          }`}
        >
          {formatPct(coc)}
        </span>
      </div>
    </div>
  );
}
