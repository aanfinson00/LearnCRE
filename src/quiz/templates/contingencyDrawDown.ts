import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  contingency: number,
  used: number,
  remaining: number,
  remainingPct: number,
): Solution {
  return {
    formula: 'Remaining = (Contingency − Used) ÷ Contingency',
    steps: [
      {
        label: 'Used',
        expression: 'Cumulative approved overruns',
        result: formatUsd(used),
      },
      {
        label: 'Remaining $',
        expression: `${formatUsd(contingency)} − ${formatUsd(used)}`,
        result: formatUsd(remaining),
      },
      {
        label: 'Remaining %',
        expression: `${formatUsd(remaining)} / ${formatUsd(contingency)}`,
        result: formatPct(remainingPct, 1),
      },
    ],
    answerDisplay: formatPct(remainingPct, 1),
  };
}

export const contingencyDrawDownTemplate: QuestionTemplate<'contingencyDrawDown'> = {
  kind: 'contingencyDrawDown',
  label: 'Contingency Draw-Down',
  description: 'Contingency reserve + cumulative overruns → % contingency remaining.',
  category: 'valuation',
  roles: ['development', 'mortgageUw'],
  pattern: '(Contingency − Used) / Contingency',
  tips: [
    'Industry standard: 5% contingency on hard costs for ground-up; 7-10% for repositions.',
    'When contingency drops below 30% remaining mid-project, lender starts asking hard questions.',
    'Below 0% remaining: trip the cost-overrun tier in the LPA — sponsor + LP fund the gap.',
    'Track contingency as % remaining, not just $ remaining — a project with 50% time elapsed should have 50%+ contingency remaining.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const round = difficulty === 'advanced' ? 100_000 : 250_000;
    const hardCostBudget =
      Math.round(rng.pickRange(20_000_000, 100_000_000) / round) * round;
    const contingencyPct = rng.pickFromSet([0.05, 0.075, 0.10] as const);
    const contingency = Math.round((hardCostBudget * contingencyPct) / round) * round;
    // Used between 10% and 90% of contingency
    const usedPct = rng.pickFromSet([0.20, 0.30, 0.40, 0.50, 0.60, 0.70] as const);
    const used = Math.round((contingency * usedPct) / round) * round;
    const remaining = contingency - used;
    const remainingPct = remaining / contingency;

    return {
      id: nextId('cont'),
      kind: 'contingencyDrawDown',
      prompt: `Project has a ${formatPct(contingencyPct, 1)} contingency on a ${formatUsd(hardCostBudget)} hard-cost budget (${formatUsd(contingency)}). To date, ${formatUsd(used)} of approved overruns has hit the contingency. What % of contingency remains?`,
      context: {
        hardCostBudget,
        contingency,
        overrunsToDate: used,
      },
      expected: remainingPct,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(contingency, used, remaining, remainingPct),
    };
  },
};
