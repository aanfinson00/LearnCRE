import { formatMultiple, formatPct, formatUsd, formatYears } from '../../math/rounding';

interface Props {
  equityIn: number;
  equityOut: number;
  years: number;
  irr: number;
}

export function IrrHoldViz({ equityIn, equityOut, years, irr }: Props) {
  const max = equityOut;
  const min = 0;
  const W = 320;
  const H = 120;
  const PAD = 12;

  const x = (i: number) => PAD + (i / years) * (W - PAD * 2);
  const y = (v: number) => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2);

  // Compounding dots — value at each year if you grew equityIn at irr
  const dots = Array.from({ length: years + 1 }, (_, i) => {
    const v = equityIn * Math.pow(1 + irr, i);
    return { year: i, value: v };
  });

  const path = dots
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.year)} ${y(p.value)}`)
    .join(' ');

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-32">
        {/* baseline */}
        <line
          x1={PAD}
          y1={y(equityIn)}
          x2={W - PAD}
          y2={y(equityIn)}
          stroke="rgba(125,116,112,0.25)"
          strokeDasharray="2 3"
        />
        {/* path */}
        <path d={path} fill="none" stroke="#d4895a" strokeWidth="1.5" />
        {/* dots */}
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={x(d.year)}
            cy={y(d.value)}
            r={i === 0 || i === years ? 4 : 2.25}
            fill={i === years ? '#d4895a' : i === 0 ? '#1c1917' : 'rgba(212,137,90,0.6)'}
          />
        ))}
        {/* year ticks (sparse) */}
        {dots.filter((_, i) => i % Math.ceil(years / 4) === 0 || dots.length - 1 === dots.indexOf(dots.filter(() => true)[0])).map((d) => (
          <text
            key={d.year}
            x={x(d.year)}
            y={H - 1}
            fontSize="8"
            textAnchor="middle"
            fill="rgba(125,116,112,0.7)"
          >
            y{d.year}
          </text>
        ))}
      </svg>

      <div className="grid grid-cols-3 gap-3 font-mono text-[11px] num">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-warm-mute">Year 0 in</div>
          <div className="text-warm-black">{formatUsd(equityIn)}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-warm-mute">
            Year {years} out
          </div>
          <div className="text-warm-black">{formatUsd(equityOut)}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-warm-mute">
            EM · IRR · {formatYears(years)}
          </div>
          <div className="text-copper-deep font-medium">
            {formatMultiple(equityOut / equityIn, 2)} · {formatPct(irr, 2)}
          </div>
        </div>
      </div>
    </div>
  );
}
