import { formatPct, formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  inPlace: number,
  market: number,
  prob: number,
  expected: number,
): Solution {
  return {
    formula: 'Expected rent = renewal-prob × in-place + (1 − renewal-prob) × market',
    steps: [
      {
        label: 'Renewal piece',
        expression: `${formatPct(prob, 0)} × ${formatUsdPerSf(inPlace, 2)}`,
        result: formatUsdPerSf(prob * inPlace, 2),
      },
      {
        label: 'Market piece',
        expression: `${formatPct(1 - prob, 0)} × ${formatUsdPerSf(market, 2)}`,
        result: formatUsdPerSf((1 - prob) * market, 2),
      },
      {
        label: 'Expected rent',
        expression: 'Sum',
        result: formatUsdPerSf(expected, 2),
      },
    ],
    answerDisplay: formatUsdPerSf(expected, 2),
  };
}

export const renewalProbabilityWeightedRentTemplate: QuestionTemplate<'renewalProbabilityWeightedRent'> =
  {
    kind: 'renewalProbabilityWeightedRent',
    label: 'Office: Renewal-Probability Weighted Rent',
    description: 'In-place rent + market rent + renewal probability → expected rent at expiration.',
    category: 'valuation',
    roles: ['acquisitions', 'assetManagement'],
    pattern: 'P(renewal) × in-place + (1 − P) × market',
    tips: [
      'Renewal-weighted rent reflects the *expected* economic outcome at lease expiration — accounts for both renew-at-current-rate and roll-to-market scenarios.',
      'Industry rule of thumb: 65-75% renewal probability for office; 50-60% in soft markets; higher for trophy buildings.',
      'When in-place rent is below market, the renewal scenario is *worse* than the roll-to-market scenario for the landlord. Inverse when in-place is above market.',
      'Always pair with downtime + leasing-cost assumptions on the non-renewal path — those are the real drag.',
    ],
    generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
      void difficulty;
      const market = rng.pickFromSet([28, 32, 36, 40, 45, 52, 60] as const);
      // In-place either above or below market
      const direction = rng.pickFromSet([0.85, 0.92, 1.05, 1.15] as const);
      const inPlace = Math.round(market * direction * 4) / 4;
      const prob = rng.pickFromSet([0.50, 0.60, 0.65, 0.70, 0.75, 0.80] as const);
      const expected = prob * inPlace + (1 - prob) * market;

      return {
        id: nextId('renew'),
        kind: 'renewalProbabilityWeightedRent',
        prompt: `Tenant lease is rolling. In-place rent is ${formatUsdPerSf(inPlace, 2)}; market rent is ${formatUsdPerSf(market, 2)}. Renewal probability is ${formatPct(prob, 0)}. What\'s the expected rent post-rollover?`,
        context: { inPlaceRent: inPlace, marketRent: market, renewalProbability: prob },
        expected,
        unit: 'usdPerSf',
        tolerance: { type: 'pct', band: 0.02 },
        solution: buildSolution(inPlace, market, prob, expected),
      };
    },
  };
