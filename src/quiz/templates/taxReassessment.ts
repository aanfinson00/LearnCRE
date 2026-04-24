import { taxReassessmentValueImpact } from '../../math/lease';
import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(params: {
  price: number;
  oldTax: number;
  newRate: number;
  cap: number;
}): Solution {
  const newTax = params.price * params.newRate;
  const delta = newTax - params.oldTax;
  const impact = taxReassessmentValueImpact({
    purchasePrice: params.price,
    oldAnnualTax: params.oldTax,
    newTaxRate: params.newRate,
    capRate: params.cap,
  });
  return {
    formula: 'ΔTax = Price × NewRate − OldTax;  ΔValue = −ΔTax / cap',
    steps: [
      {
        label: 'New tax bill',
        expression: `${formatUsd(params.price)} × ${formatPct(params.newRate, 3)}`,
        result: formatUsd(newTax),
      },
      {
        label: 'Annual tax increase',
        expression: `${formatUsd(newTax)} − ${formatUsd(params.oldTax)}`,
        result: formatUsdSigned(delta),
      },
      {
        label: 'Value impact',
        expression: `${formatUsdSigned(-delta)} / ${formatPct(params.cap)}`,
        result: formatUsdSigned(impact),
      },
    ],
    answerDisplay: formatUsdSigned(impact),
  };
}

export const taxReassessmentTemplate: QuestionTemplate<'taxReassessment'> = {
  kind: 'taxReassessment',
  label: 'Tax Reassessment Impact',
  description: 'Post-sale property tax reassessment → value change.',
  category: 'valuation',
  pattern: '−(A × B − C) / D   [−(new tax − old tax) / cap]',
  tips: [
    'Reassessment hits NOI 1-for-1 like any other opex. Value impact = −ΔTax / cap.',
    'A $100k tax increase at a 6% cap lops ~$1.67M off value. At 5% cap it\'s $2M.',
    'High-tax states (CA, NY, NJ, TX) can reassess 5–15% of purchase price in effective tax — model carefully.',
    'Some jurisdictions reassess only on sale (Prop 13). Others reassess periodically regardless of sale.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const price = pickBand(rng, bands.purchasePrice, difficulty);
    const oldTaxRate = pickBand(rng, { min: 0.004, max: 0.015, step: 0.0005 }, difficulty);
    const oldTax = Math.round((price * oldTaxRate) / 10_000) * 10_000;
    const newRate = pickBand(rng, bands.taxRate, difficulty);
    const cap = pickBand(rng, bands.capRate, difficulty);
    const expected = taxReassessmentValueImpact({
      purchasePrice: price,
      oldAnnualTax: oldTax,
      newTaxRate: newRate,
      capRate: cap,
    });

    return {
      id: nextId('tax'),
      kind: 'taxReassessment',
      prompt: `Buying a ${formatUsd(price)} property. Current tax bill is ${formatUsd(oldTax)}/yr. Post-sale reassessment at ${formatPct(newRate, 3)} of price. Value impact at a ${formatPct(cap)} cap?`,
      context: {
        purchasePrice: price,
        oldAnnualTax: oldTax,
        newTaxRate: newRate,
        capRate: cap,
      },
      expected,
      unit: 'usdChange',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution({ price, oldTax, newRate, cap }),
    };
  },
};
