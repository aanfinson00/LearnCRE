import { formatPct, formatUsd } from '../../math/rounding';

interface Props {
  lpCapital: number;
  gpCapital: number;
  totalDistributable: number;
  gpTake: number;
}

export function GpEffectivePromoteViz({
  lpCapital,
  gpCapital,
  totalDistributable,
  gpTake,
}: Props) {
  const totalCap = lpCapital + gpCapital;
  const totalProfit = totalDistributable - totalCap;
  const gpShareOfCap = gpCapital / totalCap;
  const proRataProfit = gpShareOfCap * totalProfit;
  const promote = gpTake - gpCapital - proRataProfit;
  const lpTake = totalDistributable - gpTake;

  // Stacked bar of total distributable showing LP take + GP pro-rata + GP promote.
  const lpPct = (lpTake / totalDistributable) * 100;
  const gpProRataReturn = gpCapital + proRataProfit;
  const gpProRataPct = (gpProRataReturn / totalDistributable) * 100;
  const promotePct = (promote / totalDistributable) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between font-mono text-[11px] num">
          <span className="text-warm-stone">Total distributed</span>
          <span className="text-warm-black">{formatUsd(totalDistributable)}</span>
        </div>
        <div className="flex h-6 w-full overflow-hidden rounded border border-warm-line">
          <div
            className="flex items-center justify-center bg-warm-mute/40 text-[10px] font-mono text-warm-stone"
            style={{ width: `${lpPct}%` }}
          >
            LP
          </div>
          <div
            className="flex items-center justify-center bg-copper-soft/70 text-[10px] font-mono text-warm-paper"
            style={{ width: `${gpProRataPct}%` }}
          >
            GP pro-rata
          </div>
          <div
            className="flex items-center justify-center bg-copper text-[10px] font-mono text-warm-paper"
            style={{ width: `${promotePct}%` }}
          >
            Promote
          </div>
        </div>
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">GP pro-rata ({formatPct(gpShareOfCap, 0)} of profit)</span>
          <span className="text-warm-black">{formatUsd(gpProRataReturn)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Promote (above pro-rata)</span>
          <span className="font-medium text-copper-deep">
            +{formatUsd(promote)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Effective promote = GP take − (GP co-invest + GP's pro-rata share of
          profit). What the sponsor earns purely for the asset-management
          relationship, beyond their dollar-for-dollar share.
        </div>
      </div>
    </div>
  );
}
