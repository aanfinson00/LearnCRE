import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  roomsAvailable: number;
  roomsSold: number;
  totalRevenue: number;
}

export function RevporVsRevparViz({
  roomsAvailable,
  roomsSold,
  totalRevenue,
}: Props) {
  const revpor = totalRevenue / roomsSold;
  const revpar = totalRevenue / roomsAvailable;
  const occupancy = roomsSold / roomsAvailable;
  const max = revpor;
  const revporPct = 100;
  const revparPct = (revpar / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="RevPOR (sold)"
          width={revporPct}
          value={formatUsd(revpor)}
          tone="good"
          labelWidthPx={130}
        />
        <BarRow
          label="RevPAR (available)"
          width={revparPct}
          value={formatUsd(revpar)}
          tone="copper-soft"
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Occupancy bridge</span>
          <span className="text-warm-black">
            {roomsSold} / {roomsAvailable} = {formatPct(occupancy, 1)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">RevPAR ÷ RevPOR</span>
          <span className="font-medium text-copper-deep">
            {formatPct(revpar / revpor, 1)} (= occupancy)
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          RevPOR captures rate + ancillary revenue per occupied room; RevPAR
          spreads it over all rooms. Gap = unsold inventory drag. RevPAR
          climbs faster than RevPOR when occupancy fills.
        </div>
      </div>
    </div>
  );
}
