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
  pattern: 'ΔA × (1 − B) / C   where ΔA = rent change, B = vacancy, C = cap',
  tips: [
    'ΔNOI = ΔRent × (1 − vacancy). ΔValue = ΔNOI / cap.',
    'Shortcut ignoring vacancy: ΔValue ≈ ΔRent × (1/cap). $100k rent lift @ 6% ≈ $100k × 16.67 ≈ $1.67M.',
    'Vacancy haircut of 5% just trims the answer by ~5%, so mentally do it unvacancied first then shave.',
    'Sandwich technique: bracket your cap between the two nearest clean caps, solve both, average. 5.75% sits between 5.5% (18.2x) and 6% (16.7x).',
    'OpEx typically stays flat when rent changes, so rent deltas fall almost entirely to NOI (minus mgmt fees if % of EGI).',
  ],
  generate(rng, difficulty = 'intermediate') {
    const oldRent = pickBand(rng, bands.rentLevel, difficulty);
    const rentMove = rng.pickFromSet(discreteMoves.rentMoves);
    const newRent = oldRent + rentMove;
    const vac = rng.pickFromSet(discreteMoves.vacancySetNonZero);
    const cap = pickBand(rng, bands.capRate, difficulty);
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
