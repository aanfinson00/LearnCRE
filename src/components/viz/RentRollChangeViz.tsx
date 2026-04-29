import {
  formatPct,
  formatUsd,
  formatUsdPerSf,
  formatUsdSigned,
} from '../../math/rounding';

interface Props {
  buildingSf: number;
  oldRentPerSf: number;
  newRentPerSf: number;
  rolloverPct: number;
  vacancyRate: number;
  capRate: number;
}

export function RentRollChangeViz({
  buildingSf,
  oldRentPerSf,
  newRentPerSf,
  rolloverPct,
  vacancyRate,
  capRate,
}: Props) {
  const rollSf = buildingSf * rolloverPct;
  const stayedSf = buildingSf - rollSf;
  const noiDelta =
    rollSf * (newRentPerSf - oldRentPerSf) * (1 - vacancyRate);
  const valueDelta = noiDelta / capRate;
  const grew = newRentPerSf >= oldRentPerSf;

  // Building bar split: rolled-over portion (highlighted) vs stayed portion.
  const rolledPct = rolloverPct * 100;
  const stayedPct = 100 - rolledPct;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-1.5">
        <div className="text-[10px] uppercase tracking-wider text-warm-mute">
          {formatUsd(buildingSf)} SF building · {formatPct(rolloverPct)} rolling over
        </div>
        <div className="flex h-12 overflow-hidden rounded border border-warm-line">
          <div
            className={`flex h-full items-center justify-end pr-2 transition-all duration-aa-slow ease-aa font-mono text-[10px] num ${
              grew ? 'bg-copper text-warm-white' : 'bg-signal-bad/70 text-warm-white'
            }`}
            style={{ width: `${rolledPct}%` }}
          >
            {rolledPct > 18 ? formatUsdPerSf(newRentPerSf) : ''}
          </div>
          <div
            className="flex h-full items-center justify-start pl-2 bg-warm-mute/30 transition-all duration-aa-slow ease-aa font-mono text-[10px] num text-warm-stone"
            style={{ width: `${stayedPct}%` }}
          >
            {stayedPct > 25 ? formatUsdPerSf(oldRentPerSf) : ''}
          </div>
        </div>
        <div className="grid grid-cols-2 text-[10px] uppercase tracking-wider text-warm-mute">
          <span>Rolled @ new</span>
          <span className="text-right">In place @ old</span>
        </div>
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">
            Rollover SF · ${oldRentPerSf.toFixed(2)} → ${newRentPerSf.toFixed(2)}
          </span>
          <span className="text-warm-black">{formatUsd(rollSf)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">ΔNOI ({formatPct(vacancyRate)} vacancy)</span>
          <span className={noiDelta < 0 ? 'text-signal-bad-ink' : 'text-signal-good-ink'}>
            {formatUsdSigned(noiDelta)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">ΔValue @ {formatPct(capRate)} cap</span>
          <span
            className={`font-medium ${
              valueDelta < 0 ? 'text-signal-bad-ink' : 'text-copper-deep'
            }`}
          >
            {formatUsdSigned(valueDelta)}
          </span>
        </div>
      </div>

      <div className="text-[10px] text-warm-mute">
        Stayed SF: {formatUsd(stayedSf)}.
      </div>
    </div>
  );
}
