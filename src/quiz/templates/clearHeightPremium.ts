import { formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  baselineRent: number,
  baselineHeight: number,
  targetHeight: number,
  premiumPerFt: number,
  expected: number,
): Solution {
  const lift = (targetHeight - baselineHeight) * premiumPerFt;
  return {
    formula: 'Adjusted rent = baseline rent + (Δ height × premium per ft)',
    steps: [
      {
        label: 'Δ height',
        expression: `${targetHeight} − ${baselineHeight}`,
        result: `${targetHeight - baselineHeight} ft`,
      },
      {
        label: 'Lift',
        expression: `${targetHeight - baselineHeight} ft × $${premiumPerFt}/SF/ft`,
        result: formatUsdPerSf(lift, 2),
      },
      {
        label: 'Adjusted rent',
        expression: `${formatUsdPerSf(baselineRent, 2)} + ${formatUsdPerSf(lift, 2)}`,
        result: formatUsdPerSf(expected, 2),
      },
    ],
    answerDisplay: formatUsdPerSf(expected, 2),
  };
}

export const clearHeightPremiumTemplate: QuestionTemplate<'clearHeightPremium'> = {
  kind: 'clearHeightPremium',
  label: 'Industrial: Clear-Height Premium',
  description: 'Baseline rent + clear-height premium per foot → adjusted rent for taller industrial.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement', 'development'],
  pattern: 'Base + Δheight × premium',
  tips: [
    'Modern logistics: 32-40 ft clear is the new standard; 24-28 ft is older / Class B.',
    'Premium per ft of clear height: $0.05-0.10/SF/ft in most distribution markets; up to $0.15-0.20 in tight last-mile submarkets.',
    'Vertical storage: 36 ft clear holds ~50% more cubic feet vs 24 ft — that\'s the economic logic behind the rent premium.',
    'Trophy logistics targets 36-40 ft + 50,000+ SF clear-span layout. Older buildings (<28 ft, columned) trade at material discounts.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const baselineHeight = rng.pickFromSet([24, 26, 28, 30] as const);
    const targetHeight = baselineHeight + rng.pickFromSet([4, 6, 8, 10, 12] as const);
    const baselineRent = rng.pickFromSet([6.5, 7.5, 8.0, 9.0, 10.5, 12.0] as const);
    const premiumPerFt = rng.pickFromSet([0.05, 0.075, 0.10, 0.125, 0.15] as const);
    const expected = baselineRent + (targetHeight - baselineHeight) * premiumPerFt;

    return {
      id: nextId('clear'),
      kind: 'clearHeightPremium',
      prompt: `Comp set: ${baselineHeight}-ft clear industrial trades at ${formatUsdPerSf(baselineRent, 2)}. Subject is ${targetHeight}-ft clear; the market premium is $${premiumPerFt.toFixed(3)}/SF per foot of additional clear height. What rent should the subject command?`,
      context: { baselineRent, clearHeight: targetHeight, premiumPerFt },
      expected,
      unit: 'usdPerSf',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(baselineRent, baselineHeight, targetHeight, premiumPerFt, expected),
    };
  },
};
