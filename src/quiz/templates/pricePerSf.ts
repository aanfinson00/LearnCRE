import { pricePerSf } from '../../math/basis';
import { formatSf, formatUsd, formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(price: number, sf: number): Solution {
  const psf = pricePerSf(price, sf);
  return {
    formula: 'Price / SF = Purchase Price ÷ Building SF',
    steps: [
      {
        label: '$/SF',
        expression: `${formatUsd(price)} / ${formatSf(sf)}`,
        result: formatUsdPerSf(psf),
      },
    ],
    answerDisplay: formatUsdPerSf(psf),
  };
}

export const pricePerSfTemplate: QuestionTemplate<'pricePerSf'> = {
  kind: 'pricePerSf',
  label: 'Price per SF',
  description: 'Back-of-envelope comp sanity check.',
  category: 'valuation',
  tips: [
    'Comp ranges: multifamily $150–350/SF, office $200–500/SF, industrial $100–200/SF, retail $200–500/SF.',
    'Replacement cost is your sanity floor — if $/SF is well below it, you\'re buying below construction cost.',
    'Round numerator and denominator the same direction (both up, both down) to keep error small.',
    'Quick check: $60M / 300k SF → $60M / $300M ≈ 1/5 → $200/SF.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const sf = pickBand(rng, bands.sf, difficulty);
    const psfTarget = pickBand(rng, { min: 120, max: 450, step: 5 }, difficulty);
    const priceStep = difficulty === 'beginner' ? 1_000_000 : difficulty === 'advanced' ? 50_000 : 250_000;
    const price = Math.round((sf * psfTarget) / priceStep) * priceStep;
    const expected = pricePerSf(price, sf);

    return {
      id: nextId('psf'),
      kind: 'pricePerSf',
      prompt: `A ${formatSf(sf)} building is under contract for ${formatUsd(price)}. What's the price per SF?`,
      context: { purchasePrice: price, buildingSf: sf },
      expected,
      unit: 'usdPerSf',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(price, sf),
    };
  },
};
