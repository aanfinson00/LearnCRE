import { loanConstant } from '../../math/debt';
import { formatBps, formatPct, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(rate: number, years: number): Solution {
  const k = loanConstant(rate, years);
  return {
    formula: 'Loan Constant = annualized payment / loan (monthly amort)',
    steps: [
      {
        label: 'Constant',
        expression: `${formatYears(years)} amort @ ${formatPct(rate)}`,
        result: `${formatPct(k, 2)}  (${formatBps(k)})`,
      },
    ],
    answerDisplay: formatBps(k),
  };
}

export const loanConstantTemplate: QuestionTemplate<'loanConstant'> = {
  kind: 'loanConstant',
  label: 'Loan Constant',
  description: 'Annualized payment as % of loan for monthly-amortizing debt.',
  category: 'returns',
  tips: [
    'Memorize: 30yr @ 5% ≈ 644 bps; 30yr @ 6% ≈ 720 bps; 30yr @ 7% ≈ 799 bps; 25yr @ 6% ≈ 773 bps.',
    'IO shortcut: loan constant = interest rate exactly (no principal paydown).',
    'Rule of thumb: each +100 bps of rate adds ~60–80 bps to the constant on 30yr amort.',
    'Longer amort → lower constant (but diminishing returns: 30y vs 25y only saves ~40 bps).',
  ],
  generate(rng, difficulty = 'intermediate') {
    const rate = pickBand(rng, bands.interestRate, difficulty);
    const years =
      difficulty === 'beginner'
        ? rng.pickFromSet([25, 30] as const)
        : rng.pickInt(bands.amortYears.min, bands.amortYears.max);
    const k = loanConstant(rate, years);
    const expectedBps = Math.round(k * 10_000);

    return {
      id: nextId('lc'),
      kind: 'loanConstant',
      prompt: `What's the loan constant for a ${formatYears(years)} amortizing loan at ${formatPct(rate)} (in bps)?`,
      context: { interestRate: rate, amortYears: years },
      expected: expectedBps,
      unit: 'bps',
      tolerance: { type: 'abs', band: 15 },
      solution: buildSolution(rate, years),
    };
  },
};
