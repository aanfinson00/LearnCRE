import { formatPct, formatUsd } from '../../math/rounding';

interface Props {
  startValue: number;
  endValue: number;
  projectionYears: number;
}

export function CagrViz({ startValue, endValue, projectionYears }: Props) {
  const cagr = Math.pow(endValue / startValue, 1 / projectionYears) - 1;
  const points = Array.from({ length: projectionYears + 1 }, (_, i) => ({
    year: i,
    value: startValue * Math.pow(1 + cagr, i),
  }));

  const W = 320;
  const H = 110;
  const PAD = 8;
  const minY = Math.min(startValue, endValue);
  const maxY = Math.max(startValue, endValue);
  const x = (i: number) => PAD + (i / projectionYears) * (W - PAD * 2);
  const y = (v: number) =>
    H - PAD - ((v - minY) / (maxY - minY || 1)) * (H - PAD * 2);
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.year)} ${y(p.value)}`)
    .join(' ');

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Visualization
        </div>
        <div className="font-mono text-[10px] text-warm-mute num">
          {projectionYears} yrs
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-28">
        <line
          x1={PAD}
          y1={y(startValue)}
          x2={W - PAD}
          y2={y(startValue)}
          stroke="rgba(125,116,112,0.25)"
          strokeDasharray="2 3"
        />
        <path d={path} fill="none" stroke="#d4895a" strokeWidth="2.25" />
        <circle cx={x(0)} cy={y(startValue)} r="3" fill="#7d7470" />
        <circle cx={x(projectionYears)} cy={y(endValue)} r="3.5" fill="#d4895a" />
      </svg>

      <div className="grid grid-cols-3 gap-3 font-mono text-[11px] num">
        <Cell label="Start" value={formatUsd(startValue)} />
        <Cell label={`End (yr ${projectionYears})`} value={formatUsd(endValue)} highlight />
        <Cell label="CAGR" value={formatPct(cagr)} highlight />
      </div>

      <div className="border-t border-warm-line pt-2 text-[10px] leading-snug text-warm-mute">
        The constant annual rate that would have produced the same end value —
        the apples-to-apples comparison across deals of different hold periods.
      </div>
    </div>
  );
}

function Cell({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-0.5">
      <div className="text-[10px] uppercase tracking-wider text-warm-mute">
        {label}
      </div>
      <div className={highlight ? 'text-copper-deep font-medium' : 'text-warm-black'}>
        {value}
      </div>
    </div>
  );
}
