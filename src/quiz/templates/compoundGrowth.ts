import { compoundGrowth } from '../../math/growth';
import { formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(start: number, rate: number, years: number): Solution {
  const factor = Math.pow(1 + rate, years);
  const end = compoundGrowth(start, rate, years);
  return {
    formula: 'End = Start × (1 + r)^n',
    steps: [
      {
        label: 'Growth factor',
        expression: `(1 + ${formatPct(rate, 2)})^${years}`,
        result: factor.toFixed(4),
      },
      {
        label: 'End value',
        expression: `${formatUsd(start)} × ${factor.toFixed(4)}`,
        result: formatUsd(end),
      },
    ],
    answerDisplay: formatUsd(end),
  };
}

export const compoundGrowthTemplate: QuestionTemplate<'compoundGrowth'> = {
  kind: 'compoundGrowth',
  label: 'Compound Growth (forward)',
  description: 'Project a value forward at a fixed growth rate.',
  category: 'returns',
  roles: ['acquisitions', 'portfolioMgmt'],
  pattern: 'A × (1 + B)^n   [start × growth factor]',
  tips: [
    'Rule of 72: a value roughly doubles every 72/r% years. At 3% → 24 years; at 4% → 18; at 6% → 12.',
    'Anchors: (1.03)^5 ≈ 1.159; (1.03)^10 ≈ 1.344; (1.05)^5 ≈ 1.276; (1.05)^10 ≈ 1.629.',
    'Linear approx (floor): End ≥ Start × (1 + r × n). Actual is always higher due to compounding.',
    'Sandwich: bracket with the two nearest round rates and interpolate (e.g. 2.75% sits between 2.5% and 3%).',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const start = pickBand(rng, bands.noi, difficulty);
    const rate = pickBand(rng, bands.growthRate, difficulty);
    const years = rng.pickInt(bands.projectionYears.min, bands.projectionYears.max);
    const expected = compoundGrowth(start, rate, years);

    return {
      id: nextId('cg'),
      kind: 'compoundGrowth',
      prompt: `A value of ${formatUsd(start)} grows at ${formatPct(rate, 2)} per year for ${formatYears(years)}. What's the end value?`,
      context: { startValue: start, growthRate: rate, projectionYears: years },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(start, rate, years),
    };
  },
};
