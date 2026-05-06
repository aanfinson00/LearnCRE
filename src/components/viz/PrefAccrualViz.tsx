import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  lpCapital: number;
  prefRate: number;
  holdYears: number;
}

export function PrefAccrualViz({ lpCapital, prefRate, holdYears }: Props) {
  const compoundFactor = Math.pow(1 + prefRate, holdYears) - 1;
  const prefDue = lpCapital * compoundFactor;
  const total = lpCapital + prefDue;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="LP capital"
          width={(lpCapital / total) * 100}
          value={formatUsd(lpCapital)}
          tone="muted"
          labelWidthPx={110}
        />
        <BarRow
          label="+ Pref accrued"
          width={(prefDue / total) * 100}
          value={formatUsd(prefDue)}
          tone="good"
          labelWidthPx={110}
        />
        <BarRow
          label="= LP owed"
          width={100}
          value={formatUsd(total)}
          tone="copper-soft"
          labelWidthPx={110}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Compound factor</span>
          <span className="text-warm-black">
            (1+{formatPct(prefRate, 1)})^{holdYears} − 1 ={' '}
            {(compoundFactor * 100).toFixed(2)}%
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Compound pref accrues annually like a CD — last year's pref earns
          pref next year. Simple pref ({formatPct(prefRate * holdYears)} flat)
          undercounts by ~{((compoundFactor - prefRate * holdYears) * 100).toFixed(1)} pts here.
        </div>
      </div>
    </div>
  );
}
