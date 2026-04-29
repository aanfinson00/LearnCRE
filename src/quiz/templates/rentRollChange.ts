import { rentRollNoiChange, rentRollValueChange } from '../../math/lease';
import {
  formatPct,
  formatSf,
  formatUsdPerSf,
  formatUsdSigned,
} from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(params: {
  oldRent: number;
  newRent: number;
  totalSf: number;
  rolloverPct: number;
  vacancy: number;
  cap: number;
}): Solution {
  const subjectSf = params.totalSf * params.rolloverPct;
  const noiDelta = rentRollNoiChange({
    oldRentPerSf: params.oldRent,
    newRentPerSf: params.newRent,
    subjectSf,
    vacancy: params.vacancy,
  });
  const valueDelta = rentRollValueChange({
    oldRentPerSf: params.oldRent,
    newRentPerSf: params.newRent,
    subjectSf,
    vacancy: params.vacancy,
    capRate: params.cap,
  });
  return {
    formula: 'ΔNOI = ΔRent/SF × subject SF × (1 − vacancy);  ΔValue = ΔNOI / cap',
    steps: [
      {
        label: 'Subject SF',
        expression: `${formatSf(params.totalSf)} × ${formatPct(params.rolloverPct)}`,
        result: formatSf(subjectSf),
      },
      {
        label: 'NOI change',
        expression: `(${formatUsdPerSf(params.newRent)} − ${formatUsdPerSf(params.oldRent)}) × ${formatSf(subjectSf)} × (1 − ${formatPct(params.vacancy)})`,
        result: formatUsdSigned(noiDelta),
      },
      {
        label: 'Value change',
        expression: `${formatUsdSigned(noiDelta)} / ${formatPct(params.cap)}`,
        result: formatUsdSigned(valueDelta),
      },
    ],
    answerDisplay: formatUsdSigned(valueDelta),
  };
}

export const rentRollChangeTemplate: QuestionTemplate<'rentRollChange'> = {
  kind: 'rentRollChange',
  label: 'Rent Roll $/SF Change',
  description: 'Rate change on a portion of the rent roll → value impact.',
  category: 'valuation',
  roles: ['acquisitions'],
  pattern: '(A − B) × C × (1 − D) / E   [rent delta × subject SF × (1−vac) / cap]',
  tips: [
    'ΔValue = (ΔRent/SF × subject SF × (1 − vacancy)) / cap. Each dollar of rent/SF flows through to value at 1/cap multiplier.',
    'Example: $1/SF lift on 100k SF at 5% vacancy and 6% cap → $95k × 16.67 ≈ $1.58M value.',
    'Rollover % matters — if only half the rent roll is rolling to market, apply the change to half the SF.',
    'Ignoring vacancy first and shaving later is a fine estimation shortcut (5% off your gross number).',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const totalSf = pickBand(rng, classBand('sf', assetClass), difficulty);
    const oldRent = pickBand(rng, classBand('rentPerSf', assetClass), difficulty);
    const rentLift = pickBand(rng, bands.rentPerSfDelta, difficulty);
    const newRent = oldRent + rentLift;
    const rolloverPct = pickBand(rng, bands.rolloverPct, difficulty);
    const vacancy = rng.pickFromSet([0, 0.03, 0.05, 0.07, 0.1] as const);
    const cap = pickBand(rng, classBand('capRate', assetClass), difficulty);
    const subjectSf = totalSf * rolloverPct;
    const expected = rentRollValueChange({
      oldRentPerSf: oldRent,
      newRentPerSf: newRent,
      subjectSf,
      vacancy,
      capRate: cap,
    });

    const vacText = vacancy === 0 ? 'no vacancy' : `${formatPct(vacancy)} vacancy`;
    return {
      id: nextId('rrc'),
      kind: 'rentRollChange',
      prompt: `Rate moves from ${formatUsdPerSf(oldRent)} to ${formatUsdPerSf(newRent)} on ${formatPct(rolloverPct)} of a ${formatSf(totalSf)} building. ${vacText}, ${formatPct(cap)} cap. What's the $ change in value?`,
      context: {
        buildingSf: totalSf,
        oldRentPerSf: oldRent,
        newRentPerSf: newRent,
        rolloverPct,
        vacancyRate: vacancy,
        capRate: cap,
      },
      expected,
      unit: 'usdChange',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution({ oldRent, newRent, totalSf, rolloverPct, vacancy, cap }),
    };
  },
};
