import { rentNoiDelta, valueDeltaFromNoiDelta } from '../../math/sensitivity';
import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  rentDelta: number,
  vac: number,
  cap: number,
  noiDelta: number,
  valueDelta: number,
): Solution {
  return {
    formula: 'ΔNOI = ΔRent × (1 − Vacancy);  ΔValue = ΔNOI / Cap',
    steps: [
      {
        label: 'NOI change',
        expression: `${formatUsdSigned(rentDelta)} × (1 − ${formatPct(vac)})`,
        result: formatUsdSigned(noiDelta),
      },
      {
        label: 'Value change',
        expression: `${formatUsdSigned(noiDelta)} / ${formatPct(cap)}`,
        result: formatUsdSigned(valueDelta),
      },
    ],
    answerDisplay: formatUsdSigned(valueDelta),
  };
}

export const rentChangeTemplate: QuestionTemplate<'rentChange'> = {
  kind: 'rentChange',
  label: 'Rent Change Impact',
  description: 'Rent $ change at given cap/vacancy → value impact.',
  category: 'valuation',
  generate(rng) {
    const oldRent = rng.pickRange(1_000_000, 6_000_000, { step: 100_000 });
    const rentMove = rng.pickFromSet([-100_000, -50_000, 50_000, 100_000, 150_000, 250_000] as const);
    const newRent = oldRent + rentMove;
    const vac = rng.pickFromSet([0.03, 0.05, 0.07] as const);
    const cap = rng.pickRange(0.045, 0.07, { step: 0.0025 });
    const noiDelta = rentNoiDelta({ oldRent, newRent, vacancyRate: vac });
    const valueDelta = valueDeltaFromNoiDelta(noiDelta, cap);

    return {
      id: nextId('rent'),
      kind: 'rentChange',
      prompt: `Rent moves from ${formatUsd(oldRent)} to ${formatUsd(newRent)} at ${formatPct(vac)} vacancy and a ${formatPct(cap)} cap. What's the $ change in value?`,
      context: { oldRent, newRent, vacancyRate: vac, capRate: cap },
      expected: valueDelta,
      unit: 'usdChange',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(rentMove, vac, cap, noiDelta, valueDelta),
    };
  },
};
