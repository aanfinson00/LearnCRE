import { equityFirstDraw } from '../../math/construction';
import { formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(args: {
  drawAmount: number;
  equityRemaining: number;
  fromLender: number;
}): Solution {
  return {
    formula: 'Equity-first: equity funds until exhausted, then lender funds the rest',
    steps: [
      {
        label: 'Equity remaining',
        expression: '(Equity committed − drawn so far)',
        result: formatUsd(args.equityRemaining),
      },
      {
        label: 'From lender',
        expression: `max(0, ${formatUsd(args.drawAmount)} − ${formatUsd(args.equityRemaining)})`,
        result: formatUsd(args.fromLender),
      },
    ],
    answerDisplay: formatUsd(args.fromLender),
  };
}

export const drawAllocationTemplate: QuestionTemplate<'drawAllocation'> = {
  kind: 'drawAllocation',
  label: 'Construction Draw Allocation',
  description: 'Equity-first draw: how much of this draw funds from the lender?',
  category: 'valuation',
  roles: ['development', 'mortgageUw'],
  pattern: 'max(0, draw − (equity committed − drawn))',
  tips: [
    'Equity-first means sponsor funds 100% of early draws until equity is exhausted, then lender takes over.',
    'Pari-passu draws split each draw at the committed-capital ratio (e.g. 60/40 D/E).',
    'Lender preference for equity-first: makes the sponsor put their money in first, "in front of" the lender.',
    'If draw question asks for the *equity* portion: it\'s min(equity remaining, draw amount).',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const round = difficulty === 'advanced' ? 100_000 : 250_000;
    const equityCommitted = rng.pickFromSet([
      8_000_000, 10_000_000, 12_500_000, 15_000_000, 17_500_000,
      20_000_000, 22_500_000, 25_000_000, 27_500_000, 30_000_000, 35_000_000,
    ]);
    // Draw scenarios: pre-equity exhaustion (sponsor has remaining capacity) but draw exceeds it.
    // Generate equity already drawn so a meaningful split happens.
    const equityDrawnSoFar = Math.round(
      (equityCommitted *
        rng.pickFromSet([
          0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.825, 0.85, 0.875, 0.90, 0.925, 0.95,
        ] as const)) /
        round,
    ) * round;
    const drawAmount = Math.round(rng.pickRange(1_500_000, 9_000_000) / round) * round;
    const { fromLender } = equityFirstDraw({
      equityCommitted,
      equityDrawnSoFar,
      drawAmount,
    });
    const equityRemaining = equityCommitted - equityDrawnSoFar;

    return {
      id: nextId('draw'),
      kind: 'drawAllocation',
      prompt: `Sponsor committed ${formatUsd(equityCommitted)} of equity, of which ${formatUsd(equityDrawnSoFar)} has been drawn. The deal is on equity-first basis. The next draw is ${formatUsd(drawAmount)}. How much funds from the lender?`,
      context: {
        equityCommitted,
        equityDrawnSoFar,
        drawAmount,
      },
      expected: fromLender,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution({ drawAmount, equityRemaining, fromLender }),
    };
  },
};
