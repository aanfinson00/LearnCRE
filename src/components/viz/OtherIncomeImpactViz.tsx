import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  otherIncome: number;
  vacancyRate: number;
  capRate: number;
}

export function OtherIncomeImpactViz({
  otherIncome,
  vacancyRate,
  capRate,
}: Props) {
  const netToNoi = otherIncome * (1 - vacancyRate);
  const valueImpact = netToNoi / capRate;
  const grossPct = 100;
  const netPct = (1 - vacancyRate) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Gross other income"
          width={grossPct}
          value={formatUsd(otherIncome)}
          tone="muted"
          labelWidthPx={130}
        />
        <BarRow
          label="× (1 − vacancy)"
          width={netPct}
          value={formatUsd(netToNoi)}
          tone="copper-soft"
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">÷ cap rate ({formatPct(capRate)})</span>
          <span className="font-medium text-copper-deep">
            +{formatUsd(valueImpact)} value
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Other income flows to NOI net of vacancy, then capitalizes at the
          asset's cap rate. Vacancy haircut: {formatPct(vacancyRate)}.
        </div>
      </div>
    </div>
  );
}
