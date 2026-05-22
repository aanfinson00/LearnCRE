import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  commitment: number,
  avgPct: number,
  rate: number,
  months: number,
  expected: number,
): Solution {
  const avgBalance = commitment * avgPct;
  return {
    formula: 'Interest Carry = Commitment × Avg Outstanding % × Rate × (Months / 12)',
    steps: [
      {
        label: 'Avg outstanding balance',
        expression: `${formatUsd(commitment)} × ${formatPct(avgPct, 0)}`,
        result: formatUsd(avgBalance),
      },
      {
        label: 'Interest carry',
        expression: `${formatUsd(avgBalance)} × ${formatPct(rate, 2)} × (${months} / 12)`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: formatUsd(expected),
  };
}

export const constructionInterestCarryTemplate: QuestionTemplate<'constructionInterestCarry'> = {
  kind: 'constructionInterestCarry',
  label: 'Dev: Construction Interest Carry',
  description: 'Estimate total interest carry on a construction loan using average outstanding balance.',
  category: 'returns',
  roles: ['development', 'mortgageUw'],
  pattern: 'Commitment × Avg Outstanding % × Rate × (Months / 12)',
  tips: [
    'Average outstanding balance is typically 50-65% of total commitment for a ratable draw schedule.',
    'Construction interest rolls into the total project cost — it directly raises your all-in basis.',
    'A 100 bps rate increase on a $30M construction loan over 24 months at 55% average balance adds ~$330k to TPC.',
    'Front-loaded draws (site work, foundation) mean actual average balance often exceeds a simple 50% assumption.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const commitment =
      Math.round(rng.pickRange(10_000_000, 60_000_000) / 500_000) * 500_000;
    const avgOutstandingPct = rng.pickFromSet([0.50, 0.55, 0.60, 0.65] as const);
    const rate = rng.pickFromSet([0.065, 0.07, 0.075, 0.08, 0.085] as const);
    const months = rng.pickFromSet([12, 18, 24, 30] as const);
    const expected = commitment * avgOutstandingPct * rate * (months / 12);

    return {
      id: nextId('cic'),
      kind: 'constructionInterestCarry',
      prompt: `Ground-up development: ${formatUsd(commitment)} construction loan at ${formatPct(rate, 1)} annual rate, drawn over ${months} months. Average outstanding balance is ${formatPct(avgOutstandingPct, 0)} of commitment. What's the total interest carry?`,
      context: {
        loanCommitment: commitment,
        avgOutstandingPct,
        interestRate: rate,
        constructionMonths: months,
      },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(commitment, avgOutstandingPct, rate, months, expected),
    };
  },
};
