import { vacancyNoiDelta, valueDeltaFromNoiDelta } from '../../math/sensitivity';
import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, clampToBand, discreteMoves, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(
  gpr: number,
  otherIncome: number,
  oldVac: number,
  newVac: number,
  cap: number,
  valueDelta: number,
  noiDelta: number,
): Solution {
  const gross = gpr + otherIncome;
  return {
    formula: 'ΔNOI = (GPR + Other) × (OldVac − NewVac);  ΔValue = ΔNOI / Cap',
    steps: [
      {
        label: 'Gross (GPR + Other)',
        expression: `${formatUsd(gpr)} + ${formatUsd(otherIncome)}`,
        result: formatUsd(gross),
      },
      {
        label: 'NOI change',
        expression: `${formatUsd(gross)} × (${formatPct(oldVac)} − ${formatPct(newVac)})`,
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

export const vacancySensitivityTemplate: QuestionTemplate<'vacancySensitivity'> = {
  kind: 'vacancySensitivity',
  label: 'Vacancy Sensitivity',
  description: 'Change in vacancy → value impact at given cap.',
  category: 'valuation',
  generate(rng) {
    const gpr = pickBand(rng, bands.gpr);
    const otherIncome = pickBand(rng, bands.otherIncome);
    const oldVac = pickBand(rng, bands.vacancy);
    const vacDelta = rng.pickFromSet(discreteMoves.vacancyMoves);
    const newVac = clampToBand(oldVac + vacDelta, bands.vacancy);
    const cap = pickBand(rng, bands.capRate);
    const noiDelta = vacancyNoiDelta({ gpr, otherIncome, oldVacancy: oldVac, newVacancy: newVac });
    const valueDelta = valueDeltaFromNoiDelta(noiDelta, cap);

    return {
      id: nextId('vac'),
      kind: 'vacancySensitivity',
      prompt: `GPR is ${formatUsd(gpr)} with ${formatUsd(otherIncome)} in other income. Cap rate is ${formatPct(cap)}. Vacancy moves from ${formatPct(oldVac)} to ${formatPct(newVac)}. What's the $ change in value?`,
      context: {
        gpr,
        otherIncome,
        oldVacancy: oldVac,
        newVacancy: newVac,
        capRate: cap,
      },
      expected: valueDelta,
      unit: 'usdChange',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(gpr, otherIncome, oldVac, newVac, cap, valueDelta, noiDelta),
    };
  },
};
