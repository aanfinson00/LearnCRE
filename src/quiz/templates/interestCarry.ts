import { constructionInterestCarry } from '../../math/construction';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const CONSTRUCTION_MONTHS = [12, 18, 24, 30, 36] as const;

function buildSolution(loanAmount: number, rate: number, months: number, carry: number): Solution {
  const avgBalance = loanAmount * 0.5;
  return {
    formula: 'Interest Carry = avg outstanding balance × rate × (months / 12)',
    steps: [
      {
        label: 'Avg outstanding (linear draw)',
        expression: `${formatUsd(loanAmount)} × 0.50`,
        result: formatUsd(avgBalance),
      },
      {
        label: 'Interest carry',
        expression: `${formatUsd(avgBalance)} × ${formatPct(rate)} × (${months} / 12)`,
        result: formatUsd(carry),
      },
    ],
    answerDisplay: formatUsd(carry),
  };
}

export const interestCarryTemplate: QuestionTemplate<'interestCarry'> = {
  kind: 'interestCarry',
  label: 'Construction Interest Carry',
  description: 'Total construction interest cost assuming draws occur evenly from 0 → full loan over the build period.',
  category: 'returns',
  roles: ['development', 'mortgageUw'],
  pattern: 'carry = loan × 0.5 × rate × (months / 12)',
  tips: [
    'Linear draw assumption: average outstanding = 50% of commitment. Actual carry depends on the draw schedule — S-curve draws front-load spending and increase carry.',
    'Interest carry is a line item in every construction budget. Undersizing it is a common sponsor error when rates rise mid-construction.',
    'Lenders often hold back an "interest reserve" from day-1 proceeds to fund carry automatically. Size it from day 1 so you aren\'t chasing capital mid-build.',
    'Rule of thumb: at 7% on a 24-mo build, carry ≈ 7% of the loan (0.5 × 0.07 × 2).',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const loanAmount = pickBand(rng, bands.loanAmount, difficulty);
    const rate = pickBand(rng, bands.interestRate, difficulty);
    const months = rng.pickFromSet(CONSTRUCTION_MONTHS);
    const carry = constructionInterestCarry(loanAmount, rate, months);

    return {
      id: nextId('int_carry'),
      kind: 'interestCarry',
      prompt: `Construction loan commitment is ${formatUsd(loanAmount)} at ${formatPct(rate)} annual interest. Draws occur evenly over ${months} months (linear 0 → 100%). What is the total interest carry?`,
      context: { loanAmount, interestRate: rate, constructionMonths: months },
      expected: carry,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(loanAmount, rate, months, carry),
    };
  },
};
