import { capRate } from '../../math/core';
import { formatBps, formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(price: number, noi: number): Solution {
  const cap = capRate(price, noi);
  return {
    formula: 'Going-in Cap = NOI / Purchase Price',
    steps: [
      {
        label: 'Cap rate',
        expression: `${formatUsd(noi)} / ${formatUsd(price)}`,
        result: `${formatPct(cap)}  (${formatBps(cap)})`,
      },
    ],
    answerDisplay: formatBps(cap),
  };
}

export const goingInCapTemplate: QuestionTemplate<'goingInCap'> = {
  kind: 'goingInCap',
  label: 'Going-in Cap Rate',
  description: 'Price + NOI → cap rate in bps.',
  category: 'valuation',
  tips: [
    'Cap = NOI / Price. Inverse is the NOI multiple: 5% = 20x, 6% = 16.67x, 7% = 14.29x.',
    'Mental shortcut: NOI / Price, round both to 2 sig figs first. $623k / $12.4M ≈ $620 / $12,400 ≈ 5.0%.',
    'Sanity check: if price looks like ~20× NOI you\'re at 5%, ~15× → ~6.7%, ~10× → 10%.',
    'Round both up or both down together — keeps the error directionally small. Rounding one up and one down stacks errors.',
    'Sandwich: find the nearest clean multiples (e.g. 15× = 6.67%, 16× = 6.25%) and interpolate toward the actual ratio.',
    'Convert cap to bps: 5.25% = 525 bps. Just shift the decimal two places.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const cap = pickBand(rng, bands.capRate, difficulty);
    const noi = pickBand(rng, bands.noi, difficulty);
    const priceStep = difficulty === 'beginner' ? 500_000 : difficulty === 'advanced' ? 25_000 : 100_000;
    const price = Math.round(noi / cap / priceStep) * priceStep;
    const actualCap = capRate(price, noi);
    const expectedBps = Math.round(actualCap * 10_000);

    return {
      id: nextId('giCap'),
      kind: 'goingInCap',
      prompt: `Purchase price is ${formatUsd(price)} and NOI is ${formatUsd(noi)}. What's the going-in cap rate (in bps)?`,
      context: { purchasePrice: price, noi },
      expected: expectedBps,
      unit: 'bps',
      tolerance: { type: 'abs', band: 15 },
      solution: buildSolution(price, noi),
    };
  },
};
