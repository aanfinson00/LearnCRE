interface Props {
  values: number[];
  width?: number;
  height?: number;
  /** 0..1 highlights the most-recent point with a copper dot */
  highlight?: boolean;
  ariaLabel?: string;
}

export function Sparkline({
  values,
  width = 320,
  height = 60,
  highlight = true,
  ariaLabel = 'Trend sparkline',
}: Props) {
  if (values.length === 0) {
    return (
      <div className="font-mono text-xs text-warm-mute" aria-label={ariaLabel}>
        no data yet
      </div>
    );
  }

  const PAD = 4;
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const range = max - min || 1;

  const x = (i: number) =>
    values.length === 1
      ? width / 2
      : PAD + (i / (values.length - 1)) * (width - PAD * 2);
  const y = (v: number) => height - PAD - ((v - min) / range) * (height - PAD * 2);

  const path = values
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`)
    .join(' ');

  const last = values[values.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-16"
      role="img"
      aria-label={ariaLabel}
    >
      {/* baseline at average */}
      <line
        x1={PAD}
        y1={y(values.reduce((a, b) => a + b, 0) / values.length)}
        x2={width - PAD}
        y2={y(values.reduce((a, b) => a + b, 0) / values.length)}
        stroke="rgba(125,116,112,0.2)"
        strokeDasharray="2 3"
      />
      <path d={path} fill="none" stroke="#d4895a" strokeWidth="1.75" />
      {highlight && (
        <circle
          cx={x(values.length - 1)}
          cy={y(last)}
          r="3"
          fill="#d4895a"
        />
      )}
    </svg>
  );
}
