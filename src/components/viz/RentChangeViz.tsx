import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  oldRent: number;
  newRent: number;
  vacancy: number;
  cap: number;
}

export function RentChangeViz({ oldRent, newRent, vacancy, cap }: Props) {
  // NOI delta only depends on rent move and vacancy (opex is unchanged on rent move).
  const oldNoi = oldRent * (1 - vacancy);
  const newNoi = newRent * (1 - vacancy);
  const noiDelta = newNoi - oldNoi;
  const valueDelta = noiDelta / cap;
  const grew = newNoi >= oldNoi;
  const max = Math.max(oldNoi, newNoi);
  const oldPct = (oldNoi / max) * 100;
  const newPct = (newNoi / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label={`@ ${formatUsd(oldRent)} rent`}
          width={oldPct}
          value={formatUsd(oldNoi)}
          tone="muted"
          labelWidthPx={140}
        />
        <BarRow
          label={`@ ${formatUsd(newRent)} rent`}
          width={newPct}
          value={formatUsd(newNoi)}
          tone={grew ? 'good' : 'bad'}
          labelWidthPx={140}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">ΔNOI ({formatPct(vacancy)} vacancy)</span>
          <span
            className={noiDelta < 0 ? 'text-signal-bad-ink' : 'text-signal-good-ink'}
          >
            {formatUsdSigned(noiDelta)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">ΔValue @ {formatPct(cap)} cap</span>
          <span
            className={`font-medium ${
              valueDelta < 0 ? 'text-signal-bad-ink' : 'text-copper-deep'
            }`}
          >
            {formatUsdSigned(valueDelta)}
          </span>
        </div>
      </div>
    </div>
  );
}
