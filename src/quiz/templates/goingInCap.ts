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
  generate(rng) {
    const cap = pickBand(rng, bands.capRate);
    const noi = pickBand(rng, bands.noi);
    const priceStep = 100_000;
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
