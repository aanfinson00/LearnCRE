import { compoundGrowth } from '../../math/growth';
import { formatPct, formatUsd } from '../../math/rounding';

interface Props {
  start: number;
  rate: number;
  years: number;
}

export function CompoundGrowthViz({ start, rate, years }: Props) {
  const points = Array.from({ length: years + 1 }, (_, i) => ({
    year: i,
    value: compoundGrowth(start, rate, i),
  }));
  const linear = Array.from({ length: years + 1 }, (_, i) => ({
    year: i,
    value: start * (1 + rate * i),
  }));

  const W = 320;
  const H = 120;
  const PAD = 8;

  const minY = start;
  const maxY = points[points.length - 1].value;

  const x = (i: number) => PAD + (i / years) * (W - PAD * 2);
  const y = (v: number) => H - PAD - ((v - minY) / (maxY - minY)) * (H - PAD * 2);

  const compoundPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.year)} ${y(p.value)}`)
    .join(' ');
  const linearPath = linear
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.year)} ${y(p.value)}`)
    .join(' ');

  const end = points[points.length - 1].value;
  const linearEnd = linear[linear.length - 1].value;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Visualization
        </div>
        <div className="font-mono text-[10px] text-warm-mute num">
          {formatPct(rate)}/yr × {years}y
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-32">
        {/* baseline at start */}
        <line
          x1={PAD}
          y1={y(start)}
          x2={W - PAD}
          y2={y(start)}
          stroke="rgba(125,116,112,0.25)"
          strokeDasharray="2 3"
        />
        {/* linear (floor) */}
        <path
          d={linearPath}
          fill="none"
          stroke="rgba(125,116,112,0.6)"
          strokeWidth="1.25"
          strokeDasharray="3 3"
        />
        {/* compound */}
        <path
          d={compoundPath}
          fill="none"
          stroke="#d4895a"
          strokeWidth="2.25"
        />
        {/* end dot */}
        <circle cx={x(years)} cy={y(end)} r="3.5" fill="#d4895a" />
        <circle cx={x(years)} cy={y(linearEnd)} r="2.5" fill="rgba(125,116,112,0.7)" />
      </svg>

      <div className="grid grid-cols-3 gap-3 font-mono text-[11px] num">
        <Cell label={`Year 0`} value={formatUsd(start)} />
        <Cell label={`Linear floor`} value={formatUsd(linearEnd)} muted />
        <Cell
          label={`Year ${years} (compound)`}
          value={formatUsd(end)}
          highlight
        />
      </div>
    </div>
  );
}

function Cell({
  label,
  value,
  muted,
  highlight,
}: {
  label: string;
  value: string;
  muted?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-0.5">
      <div className="text-[10px] uppercase tracking-wider text-warm-mute">{label}</div>
      <div
        className={`${highlight ? 'text-copper-deep font-medium' : muted ? 'text-warm-mute' : 'text-warm-black'}`}
      >
        {value}
      </div>
    </div>
  );
}
