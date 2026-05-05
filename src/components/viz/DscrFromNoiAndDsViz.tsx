import { formatMultiple, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  noi: number;
  debtServiceAnnual: number;
}

export function DscrFromNoiAndDsViz({ noi, debtServiceAnnual }: Props) {
  const dscr = noi / debtServiceAnnual;
  const max = Math.max(noi, debtServiceAnnual);
  const noiPct = (noi / max) * 100;
  const dsPct = (debtServiceAnnual / max) * 100;
  const healthy = dscr >= 1.20;

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
          tone={healthy ? 'good' : 'muted'}
          labelWidthPx={90}
        />
        <BarRow
          label="Debt service"
          width={dsPct}
          value={formatUsd(debtServiceAnnual)}
          tone="stone"
          labelWidthPx={90}
        />
      </div>

      <div className="flex items-baseline justify-between border-t border-warm-line pt-2 text-xs">
        <span className="text-warm-stone">DSCR (NOI ÷ DS)</span>
        <span
          className={`font-mono num font-medium ${healthy ? 'text-copper-deep' : 'text-signal-bad-ink'}`}
        >
          {formatMultiple(dscr)}
        </span>
      </div>
    </div>
  );
}
