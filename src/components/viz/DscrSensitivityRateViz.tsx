import { formatMultiple, formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  noi: number;
  loanAmount: number;
  interestRate: number;
  amortYears: number;
}

export function DscrSensitivityRateViz({
  noi,
  loanAmount,
  interestRate,
  amortYears,
}: Props) {
  const r = interestRate / 12;
  const n = amortYears * 12;
  const monthlyConstant =
    (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const newDs = loanAmount * monthlyConstant * 12;
  const dscr = noi / newDs;
  const passes = dscr >= 1.20;

  const max = Math.max(noi, newDs);
  const noiPct = (noi / max) * 100;
  const dsPct = (newDs / max) * 100;

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
          tone={passes ? 'good' : 'muted'}
          labelWidthPx={130}
        />
        <BarRow
          label={`DS @ ${formatPct(interestRate)}`}
          width={dsPct}
          value={formatUsd(newDs)}
          tone={passes ? 'stone' : 'bad'}
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">DSCR at stressed rate</span>
          <span
            className={`font-medium ${passes ? 'text-copper-deep' : 'text-signal-bad-ink'}`}
          >
            {formatMultiple(dscr)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">vs 1.20x lender min</span>
          <span className={passes ? 'text-warm-black' : 'text-signal-bad-ink'}>
            {passes ? '+' : ''}
            {Math.round((dscr - 1.20) * 100)} bps
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Refi stress test: hold NOI flat, model debt service at the new rate
          across {amortYears}-yr amort. Below 1.20x usually means the loan
          gets sized down at refi or the sponsor brings fresh equity.
        </div>
      </div>
    </div>
  );
}
