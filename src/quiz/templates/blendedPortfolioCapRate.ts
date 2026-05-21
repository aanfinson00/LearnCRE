import { blendedCapRate } from '../../math/core';
import { formatBps, formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(
  noi1: number, value1: number,
  noi2: number, value2: number,
  blended: number,
): Solution {
  return {
    formula: 'Blended Cap Rate = (NOI₁ + NOI₂) / (Value₁ + Value₂)',
    steps: [
      {
        label: 'Combined NOI',
        expression: `${formatUsd(noi1)} + ${formatUsd(noi2)}`,
        result: formatUsd(noi1 + noi2),
      },
      {
        label: 'Combined value',
        expression: `${formatUsd(value1)} + ${formatUsd(value2)}`,
        result: formatUsd(value1 + value2),
      },
      {
        label: 'Blended cap rate',
        expression: `${formatUsd(noi1 + noi2)} / ${formatUsd(value1 + value2)}`,
        result: `${formatPct(blended)}  (${formatBps(blended)})`,
      },
    ],
    answerDisplay: formatBps(blended),
  };
}

export const blendedPortfolioCapRateTemplate: QuestionTemplate<'blendedPortfolioCapRate'> = {
  kind: 'blendedPortfolioCapRate',
  label: 'Blended Portfolio Cap Rate',
  description: 'Portfolio-level cap rate: total NOI divided by total value across two assets.',
  category: 'valuation',
  roles: ['portfolioMgmt', 'acquisitions'],
  pattern: '(NOI₁ + NOI₂) / (Value₁ + Value₂)',
  tips: [
    'Blended cap rate is value-weighted, not simple average. A $100M property at 5% cap dominates a $10M property at 8% cap in the blend.',
    'Quick sanity check: blended rate always falls between the individual cap rates, and it\'s pulled toward the larger asset.',
    'Portfolio managers use blended cap to track overall implied yield vs. benchmark and spot defensive tilts (high-quality / low-cap assets dragging down the blend).',
    'Acquisition filter: if a new asset\'s cap rate is below the portfolio blend, it\'s dilutive to near-term income yield even if IRR is attractive.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const capA = pickBand(rng, bands.capRate, difficulty);
    const noiA = pickBand(rng, bands.noi, difficulty);
    const rawValueA = noiA / capA;
    const roundA = difficulty === 'beginner' ? 1_000_000 : 500_000;
    const valueA = Math.round(rawValueA / roundA) * roundA;

    // Property B uses a different cap rate (at least 50 bps away from A)
    const capBOffset = rng.pickFromSet([-0.015, -0.01, -0.005, 0.005, 0.01, 0.015] as const);
    const capB = Math.min(0.10, Math.max(0.035, capA + capBOffset));
    const noiB = pickBand(rng, bands.noi, difficulty);
    const rawValueB = noiB / capB;
    const valueB = Math.round(rawValueB / roundA) * roundA;

    const blended = blendedCapRate(noiA, valueA, noiB, valueB);
    const expectedBps = Math.round(blended * 10_000);

    return {
      id: nextId('blend_cap'),
      kind: 'blendedPortfolioCapRate',
      prompt: `Property A: value ${formatUsd(valueA)}, NOI ${formatUsd(noiA)}. Property B: value ${formatUsd(valueB)}, NOI ${formatUsd(noiB)}. What is the blended portfolio cap rate (bps)?`,
      context: {
        purchasePrice: valueA,
        noi: noiA,
        noi2: noiB,
        value2: valueB,
      },
      expected: expectedBps,
      unit: 'bps',
      tolerance: { type: 'abs', band: 15 },
      solution: buildSolution(noiA, valueA, noiB, valueB, blended),
    };
  },
};
