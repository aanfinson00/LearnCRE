import { rentNoiDelta, valueDeltaFromNoiDelta } from '../../math/sensitivity';
import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, discreteMoves, pickBand } from '../bands';
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
    const oldRent = pickBand(rng, bands.rentLevel);
    const rentMove = rng.pickFromSet(discreteMoves.rentMoves);
    const newRent = oldRent + rentMove;
    const vac = rng.pickFromSet(discreteMoves.vacancySetNonZero);
    const cap = pickBand(rng, bands.capRate);
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
