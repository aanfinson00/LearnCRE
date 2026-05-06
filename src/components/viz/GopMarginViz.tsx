import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  totalRevenue: number;
  gopMargin: number;
}

export function GopMarginViz({ totalRevenue, gopMargin }: Props) {
  const gop = totalRevenue * gopMargin;
  const undistributed = totalRevenue - gop;
  const gopPct = gopMargin * 100;
  const undistributedPct = (undistributed / totalRevenue) * 100;
  const healthy = gopMargin >= 0.30;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Total revenue"
          width={100}
          value={formatUsd(totalRevenue)}
          tone="muted"
          labelWidthPx={140}
        />
        <BarRow
          label="− Operating costs"
          width={undistributedPct}
          value={formatUsd(undistributed)}
          tone="bad"
          labelWidthPx={140}
        />
        <BarRow
          label="= GOP"
          width={gopPct}
          value={formatUsd(gop)}
          tone={healthy ? 'good' : 'copper-soft'}
          labelWidthPx={140}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">GOP margin</span>
          <span
            className={`font-medium ${healthy ? 'text-copper-deep' : 'text-signal-bad-ink'}`}
          >
            {formatPct(gopMargin, 1)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Hotel GOP (gross operating profit) sits above NOI — it's pre-FF&E
          reserve, pre-management fee, pre-property tax. Limited-service
          typically 35-45%; full-service 25-35%. Below range usually flags
          rate compression or wage pressure.
        </div>
      </div>
    </div>
  );
}
