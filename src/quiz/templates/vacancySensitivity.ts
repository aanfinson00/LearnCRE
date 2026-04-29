import { vacancyNoiDelta, valueDeltaFromNoiDelta } from '../../math/sensitivity';
import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { applyMove, bands, discreteMoves, pickBand } from '../bands';
import { classBand } from '../assetClasses';
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
  roles: ['acquisitions'],
  pattern: 'gross × (A − B) / C   where A, B = old/new vacancy, C = cap',
  tips: [
    'Each 1% of vacancy on (GPR + Other) hits NOI by 1% × gross → value by gross/cap × 0.01.',
    'Quick formula: ΔValue per 1% vacancy = gross × (1/cap) / 100. At 5% cap that\'s gross × 0.20.',
    '$5M gross × 2% vacancy increase at 6% cap: $100k NOI drop → $100k × 16.67 ≈ $1.67M value loss.',
    'Sandwich for ugly caps: compute at the clean caps above and below (e.g. 6% and 7%), then interpolate.',
    'Vacancy hits gross income (rent + other), not EGI — so sensitivity scales with the TOP line, not NOI.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const gpr = pickBand(rng, bands.gpr, difficulty);
    const otherIncome = pickBand(rng, bands.otherIncome, difficulty);
    const oldVac = pickBand(rng, bands.vacancy, difficulty);
    const vacDelta = rng.pickFromSet(discreteMoves.vacancyMoves);
    const newVac = applyMove(oldVac, vacDelta, bands.vacancy, difficulty);
    const cap = pickBand(rng, classBand('capRate', assetClass), difficulty);
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
