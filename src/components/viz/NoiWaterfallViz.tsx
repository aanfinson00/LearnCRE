import { egi, noi as computeNoi, value as computeValue } from '../../math/core';
import { formatPct, formatUsd } from '../../math/rounding';

interface Props {
  gpr: number;
  otherIncome: number;
  vacancy: number;
  opex: number;
  cap: number;
}

export function NoiWaterfallViz({ gpr, otherIncome, vacancy, opex, cap }: Props) {
  const gross = gpr + otherIncome;
  const vacancyHit = gross * vacancy;
  const egiVal = egi({ gpr, otherIncome, vacancyRate: vacancy });
  const noiVal = computeNoi({ gpr, otherIncome, vacancyRate: vacancy, opex });
  const valueVal = computeValue(noiVal, cap);

  const max = gross;
  const w = (n: number) => `${Math.max(2, (Math.abs(n) / max) * 100)}%`;

  const rows: { label: string; value: number; bar: string; tone: string }[] = [
    {
      label: 'GPR',
      value: gpr,
      bar: w(gpr),
      tone: 'bg-warm-mute/40',
    },
    {
      label: '+ Other',
      value: otherIncome,
      bar: w(otherIncome),
      tone: 'bg-warm-mute/30',
    },
    {
      label: `− Vacancy (${formatPct(vacancy, 0)})`,
      value: -vacancyHit,
      bar: w(vacancyHit),
      tone: 'bg-signal-bad/40',
    },
    {
      label: '= EGI',
      value: egiVal,
      bar: w(egiVal),
      tone: 'bg-warm-stone/50',
    },
    {
      label: '− OpEx',
      value: -opex,
      bar: w(opex),
      tone: 'bg-signal-bad/40',
    },
    {
      label: '= NOI',
      value: noiVal,
      bar: w(noiVal),
      tone: 'bg-copper-soft/70',
    },
  ];

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-1.5 num font-mono text-[11px]">
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-[140px_1fr_120px] items-center gap-3"
          >
            <span
              className={`text-right ${r.label.startsWith('=') ? 'font-medium text-warm-black' : 'text-warm-stone'}`}
            >
              {r.label}
            </span>
            <div className="h-3 overflow-hidden rounded bg-warm-paper/60">
              <div
                className={`h-full rounded ${r.tone} transition-all duration-aa-slow ease-aa`}
                style={{ width: r.bar }}
              />
            </div>
            <span
              className={`text-right ${r.value < 0 ? 'text-signal-bad-ink' : 'text-warm-black'}`}
            >
              {r.value < 0 ? '−' : ''}
              {formatUsd(Math.abs(r.value))}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-baseline justify-between border-t border-warm-line pt-2">
        <span className="text-xs text-warm-stone">
          Value = NOI / {formatPct(cap)}
        </span>
        <span className="font-mono num text-base font-medium text-copper-deep">
          {formatUsd(valueVal)}
        </span>
      </div>
    </div>
  );
}
