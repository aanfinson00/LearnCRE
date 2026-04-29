import { requiredMultiple } from '../../math/returns';
import { formatMultiple, formatPct, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, discreteMoves } from '../bands';
import { nextId } from '../random';

function buildSolution(irr: number, years: number): Solution {
  const em = requiredMultiple(irr, years);
  return {
    formula: 'Required Multiple = (1 + IRR)^years',
    steps: [
      {
        label: 'Required EM',
        expression: `(1 + ${formatPct(irr)})^${years}`,
        result: formatMultiple(em),
      },
    ],
    answerDisplay: formatMultiple(em),
  };
}

export const targetMultipleTemplate: QuestionTemplate<'targetMultiple'> = {
  kind: 'targetMultiple',
  label: 'Target Equity Multiple',
  description: 'Target IRR + years → required EM.',
  category: 'returns',
  roles: ['acquisitions', 'portfolioMgmt'],
  pattern: '(1 + A)^B   [compound growth]',
  tips: [
    'Rule of 72 in reverse: if hold = 72/IRR%, you need EM = 2.0x. 15% over ~5y ≈ 2x; 12% over 6y ≈ 2x; 8% over 9y ≈ 2x.',
    'Required EM anchors (memorize): 10% IRR × 10y → 2.59x; 15% × 5y → 2.01x; 20% × 5y → 2.49x; 15% × 7y → 2.66x.',
    'Sandwich hold periods: need 15% over 6y? 15%×5y = 2.01x, 15%×7y = 2.66x → midpoint ~2.34x (actual 2.31x).',
    'Linear floor: EM ≥ 1 + IRR × years. Actual is always higher due to compounding.',
    'Rule of 114: years to triple ≈ 114 / IRR%. 15% triples in ~7.6 years.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const beginnerIrrs = [0.1, 0.15, 0.2, 0.25] as const;
    const irr =
      difficulty === 'beginner'
        ? rng.pickFromSet(beginnerIrrs)
        : rng.pickFromSet(discreteMoves.targetIrrs);
    const years =
      difficulty === 'beginner'
        ? rng.pickFromSet([5, 7, 10] as const)
        : rng.pickInt(bands.holdYears.min, bands.holdYears.max);
    const expected = requiredMultiple(irr, years);

    return {
      id: nextId('tgtMult'),
      kind: 'targetMultiple',
      prompt: `What equity multiple do you need to hit a ${formatPct(irr, 1)} IRR over ${formatYears(years)}?`,
      context: { targetIrr: irr, holdYears: years },
      expected,
      unit: 'multiple',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(irr, years),
    };
  },
};
