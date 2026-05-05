import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  cumulativeDraws: number,
  retainagePct: number,
  expected: number,
): Solution {
  return {
    formula: 'Retainage held = Cumulative draws × Retainage %',
    steps: [
      {
        label: 'Held to date',
        expression: `${formatUsd(cumulativeDraws)} × ${formatPct(retainagePct, 0)}`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: formatUsd(expected),
  };
}

export const retainageRunningTemplate: QuestionTemplate<'retainageRunning'> = {
  kind: 'retainageRunning',
  label: 'Cumulative Retainage',
  description: 'Cumulative draws + retainage % → cash held back by lender.',
  category: 'valuation',
  roles: ['development', 'mortgageUw'],
  pattern: 'Cumulative draws × Retainage %',
  tips: [
    'Retainage is held against EACH draw, then released at substantial completion.',
    'Standard retainage: 10% on hard costs; soft costs typically not retained.',
    'Some owner-friendly contracts step down retainage to 5% after 50% completion.',
    'On a $50M project at 10% retainage, the lender holds back ~$5M as the project progresses — material to sponsor cash flow.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const round = difficulty === 'advanced' ? 250_000 : 500_000;
    const cumulativeDraws =
      Math.round(rng.pickRange(5_000_000, 60_000_000) / round) * round;
    const retainagePct = rng.pickFromSet([0.05, 0.075, 0.10] as const);
    const expected = cumulativeDraws * retainagePct;

    return {
      id: nextId('ret'),
      kind: 'retainageRunning',
      prompt: `Cumulative hard-cost draws to date: ${formatUsd(cumulativeDraws)}. The contract retains ${formatPct(retainagePct, 1)} on each draw. How much retainage is the lender currently holding?`,
      context: { cumulativeDraws, retainagePct },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.01 },
      solution: buildSolution(cumulativeDraws, retainagePct, expected),
    };
  },
};
