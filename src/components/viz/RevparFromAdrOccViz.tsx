import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  adr: number;
  roomsAvailable: number;
  revpar: number;
}

export function RevparFromAdrOccViz({ adr, roomsAvailable, revpar }: Props) {
  const occupancy = revpar / adr;
  const adrPct = 100;
  const revparPct = (revpar / adr) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="ADR"
          width={adrPct}
          value={formatUsd(adr)}
          tone="muted"
          labelWidthPx={120}
        />
        <BarRow
          label={`× Occupancy ${formatPct(occupancy, 1)}`}
          width={revparPct}
          value={formatUsd(revpar)}
          tone="good"
          labelWidthPx={120}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">RevPAR (per available room)</span>
          <span className="font-medium text-copper-deep">{formatUsd(revpar)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Rooms × ADR potential / day</span>
          <span className="text-warm-black">
            {formatUsd(roomsAvailable * adr)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          RevPAR is the headline hotel KPI — captures both rate and occupancy
          in one number. Lift via ADR is margin-friendly; lift via occupancy
          adds variable cost on every incremental room sold.
        </div>
      </div>
    </div>
  );
}
