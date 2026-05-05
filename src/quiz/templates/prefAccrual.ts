import { prefAccrual } from '../../math/waterfall';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const PREF_RATES = [0.06, 0.07, 0.08, 0.09, 0.10] as const;

function buildSolution(
  lpCapital: number,
  rate: number,
  years: number,
  expected: number,
): Solution {
  const compoundFactor = Math.pow(1 + rate, years) - 1;
  return {
    formula: 'Pref due (compound) = LP capital × ((1 + rate)^years − 1)',
    steps: [
      {
        label: 'Compound factor',
        expression: `(1 + ${formatPct(rate, 2)})^${years} − 1`,
        result: compoundFactor.toFixed(4),
      },
      {
        label: 'Pref due',
        expression: `${formatUsd(lpCapital)} × ${compoundFactor.toFixed(4)}`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: formatUsd(expected),
  };
}

export const prefAccrualTemplate: QuestionTemplate<'prefAccrual'> = {
  kind: 'prefAccrual',
  label: 'Pref Accrual (compound)',
  description: 'LP capital + pref rate + hold years → pref due to LP.',
  category: 'returns',
  roles: ['portfolioMgmt', 'acquisitions'],
  pattern: 'LP × ((1 + r)^n − 1)',
  tips: [
    'Compound pref accrues annually like a CD: each year\'s pref earns pref next year.',
    'Quick mental math: 8% over 5 years compounds to ~46.9%; over 3 years ~26.0%.',
    'Simple pref is just rate × years (8% × 5y = 40%); LPAs that say "compounded" can mean ~7% more dollars at year 5.',
    'Pref is only owed to LP — GP doesn\'t accrue pref on their co-invest in a typical American waterfall.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const lpCapital = pickBand(rng, bands.equityIn, difficulty);
    const rate = rng.pickFromSet(PREF_RATES);
    const years = rng.pickInt(3, 7);
    const expected = prefAccrual(lpCapital, rate, years, 'compound');

    return {
      id: nextId('pref'),
      kind: 'prefAccrual',
      prompt: `LP contributed ${formatUsd(lpCapital)} into a JV with an ${formatPct(rate, 0)} compound preferred return. After ${years} years, what's the cumulative pref due to LP?`,
      context: { lpCapital, prefRate: rate, holdYears: years },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(lpCapital, rate, years, expected),
    };
  },
};
