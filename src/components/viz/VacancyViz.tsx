import { vacancyNoiDelta, valueDeltaFromNoiDelta } from '../../math/sensitivity';
import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';

interface Props {
  gpr: number;
  otherIncome: number;
  oldVacancy: number;
  newVacancy: number;
  cap: number;
}

export function VacancyViz({ gpr, otherIncome, oldVacancy, newVacancy, cap }: Props) {
  const gross = gpr + otherIncome;
  const oldEgi = gross * (1 - oldVacancy);
  const newEgi = gross * (1 - newVacancy);
  const noiDelta = vacancyNoiDelta({
    gpr,
    otherIncome,
    oldVacancy,
    newVacancy,
  });
  const valueDelta = valueDeltaFromNoiDelta(noiDelta, cap);

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StackedBar
          label={`@ ${formatPct(oldVacancy)} vacancy`}
          leasedPct={1 - oldVacancy}
          leasedDollars={oldEgi}
          vacantDollars={gross - oldEgi}
        />
        <StackedBar
          label={`@ ${formatPct(newVacancy)} vacancy`}
          leasedPct={1 - newVacancy}
          leasedDollars={newEgi}
          vacantDollars={gross - newEgi}
        />
      </div>

      <div className="space-y-1.5 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">ΔNOI</span>
          <span className={noiDelta < 0 ? 'text-signal-bad-ink' : 'text-signal-good-ink'}>
            {formatUsdSigned(noiDelta)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">ΔValue @ {formatPct(cap)} cap</span>
          <span
            className={`font-medium ${valueDelta < 0 ? 'text-signal-bad-ink' : 'text-copper-deep'}`}
          >
            {formatUsdSigned(valueDelta)}
          </span>
        </div>
      </div>
    </div>
  );
}

function StackedBar({
  label,
  leasedPct,
  leasedDollars,
  vacantDollars,
}: {
  label: string;
  leasedPct: number;
  leasedDollars: number;
  vacantDollars: number;
}) {
  const leased = leasedPct * 100;
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-wider text-warm-mute">{label}</div>
      <div className="flex h-12 overflow-hidden rounded border border-warm-line">
        <div
          className="h-full bg-copper-soft/70 transition-all duration-aa-slow ease-aa flex items-center justify-end pr-2 text-[10px] font-mono text-copper-ink num"
          style={{ width: `${leased}%` }}
        >
          {leased > 30 ? formatUsd(leasedDollars) : ''}
        </div>
        <div
          className="h-full bg-warm-paper transition-all duration-aa-slow ease-aa flex items-center justify-start pl-2 text-[10px] font-mono text-warm-mute num"
          style={{ width: `${100 - leased}%` }}
        >
          {100 - leased > 12 ? formatUsd(vacantDollars) : ''}
        </div>
      </div>
    </div>
  );
}
