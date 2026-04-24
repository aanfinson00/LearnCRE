import { formatMultiple, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(price: number, pgi: number): Solution {
  const grm = price / pgi;
  return {
    formula: 'GRM = Purchase Price / Annual Gross Potential Rent',
    steps: [
      {
        label: 'GRM',
        expression: `${formatUsd(price)} / ${formatUsd(pgi)}`,
        result: formatMultiple(grm, 2),
      },
    ],
    answerDisplay: formatMultiple(grm, 2),
  };
}

export const grossRentMultiplierTemplate: QuestionTemplate<'grossRentMultiplier'> = {
  kind: 'grossRentMultiplier',
  label: 'Gross Rent Multiplier',
  description: 'Price / PGI — quick multifamily/retail benchmark.',
  category: 'valuation',
  tips: [
    'GRM = Price / PGI. Multifamily typically trades 8–14× GRM; lower is cheaper.',
    'Quick inversion: cap rate ≈ (1 − OpEx ratio) / GRM. 12× GRM with 40% OpEx ≈ 5% cap.',
    'GRM ignores OpEx, so it\'s most useful when opex structure is consistent across comps.',
    'Trap: high-OpEx assets look cheap by GRM but expensive by cap. Always cross-check.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const pgi = pickBand(rng, bands.gpr, difficulty);
    const targetGrm = pickBand(rng, { min: 7, max: 15, step: 0.5 }, difficulty);
    const priceStep = difficulty === 'beginner' ? 500_000 : difficulty === 'advanced' ? 25_000 : 100_000;
    const price = Math.round((pgi * targetGrm) / priceStep) * priceStep;
    const expected = price / pgi;

    return {
      id: nextId('grm'),
      kind: 'grossRentMultiplier',
      prompt: `Purchase price ${formatUsd(price)}, gross potential rent ${formatUsd(pgi)}. What's the GRM?`,
      context: { purchasePrice: price, gpr: pgi, pgi },
      expected,
      unit: 'multiple',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(price, pgi),
    };
  },
};
