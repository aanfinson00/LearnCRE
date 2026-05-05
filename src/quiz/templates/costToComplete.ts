import { costToCompletePct } from '../../math/construction';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(incurred: number, totalBudget: number, expected: number): Solution {
  return {
    formula: 'Pct complete = Incurred ÷ Total Budget',
    steps: [
      {
        label: 'Pct complete',
        expression: `${formatUsd(incurred)} / ${formatUsd(totalBudget)}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const costToCompleteTemplate: QuestionTemplate<'costToComplete'> = {
  kind: 'costToComplete',
  label: 'Cost to Complete',
  description: 'Total budget + incurred → % complete by dollars.',
  category: 'valuation',
  roles: ['development', 'acquisitions'],
  pattern: 'Incurred / Budget',
  tips: [
    '"% complete by dollars" is not the same as "% physical complete." Lenders often track both.',
    'Subtract from 1 to get cost-to-complete %. $30M of $50M = 60% in / 40% to go.',
    'Watch for overruns: if incurred > budget, the deal needs additional capital before completing.',
    'Industry rule of thumb: lender draw fundings should track physical completion, not pure incurred-cost percent — protects against frontloaded soft-cost spending.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const round = difficulty === 'beginner' ? 5_000_000 : difficulty === 'advanced' ? 250_000 : 1_000_000;
    const totalBudget =
      Math.round(rng.pickRange(15_000_000, 150_000_000) / round) * round;
    const pct = rng.pickFromSet([0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80] as const);
    const incurred = Math.round((totalBudget * pct) / round) * round;
    const expected = costToCompletePct(incurred, totalBudget);

    return {
      id: nextId('ctc'),
      kind: 'costToComplete',
      prompt: `Total project budget is ${formatUsd(totalBudget)}. To date, ${formatUsd(incurred)} has been incurred. What's the % complete by dollars?`,
      context: { totalBudget, incurred },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(incurred, totalBudget, expected),
    };
  },
};
