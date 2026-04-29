import { allInBasis, totalProjectCost } from '../../math/basis';
import { formatPct, formatSf, formatUsd, formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(
  price: number,
  capex: number,
  closingRate: number,
  sf: number,
): Solution {
  const closing = price * closingRate;
  const total = totalProjectCost({ purchasePrice: price, capex, closingCostRate: closingRate });
  const basis = allInBasis({ purchasePrice: price, capex, closingCostRate: closingRate, buildingSf: sf });
  return {
    formula: 'All-In Basis = (Price + CapEx + Closing) / SF',
    steps: [
      {
        label: 'Closing costs',
        expression: `${formatUsd(price)} × ${formatPct(closingRate)}`,
        result: formatUsd(closing),
      },
      {
        label: 'Total all-in cost',
        expression: `${formatUsd(price)} + ${formatUsd(capex)} + ${formatUsd(closing)}`,
        result: formatUsd(total),
      },
      {
        label: 'All-in $/SF',
        expression: `${formatUsd(total)} / ${formatSf(sf)}`,
        result: formatUsdPerSf(basis),
      },
    ],
    answerDisplay: formatUsdPerSf(basis),
  };
}

export const allInBasisTemplate: QuestionTemplate<'allInBasis'> = {
  kind: 'allInBasis',
  label: 'All-In Basis',
  description: 'Total capital per SF after acquisition costs.',
  category: 'valuation',
  roles: ['acquisitions'],
  pattern: '(A + B + A×C) / D   [price + capex + closing%, per SF]',
  tips: [
    'All-in basis = skin in the game. Use it (not price) when computing yield on cost.',
    'Closing costs typically run 1–3% of purchase price — transfer tax, title, legal, due diligence.',
    'Value-add capex flows 1-for-1 into basis; it\'s equity you put in on day one.',
    'Quick check: if closing is 2% of price, round basis by adding ~2% to price, then adding capex, then dividing by SF.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const sf = pickBand(rng, classBand('sf', assetClass), difficulty);
    const psfTarget = pickBand(rng, { min: 150, max: 400, step: 5 }, difficulty);
    const priceStep = difficulty === 'beginner' ? 1_000_000 : difficulty === 'advanced' ? 50_000 : 250_000;
    const price = Math.round((sf * psfTarget) / priceStep) * priceStep;
    const capex = pickBand(rng, bands.capex, difficulty);
    const closingRate = pickBand(rng, bands.closingCostRate, difficulty);
    const expected = allInBasis({ purchasePrice: price, capex, closingCostRate: closingRate, buildingSf: sf });

    return {
      id: nextId('aib'),
      kind: 'allInBasis',
      prompt: `Acquire a ${formatSf(sf)} building for ${formatUsd(price)}. Budget ${formatUsd(capex)} in capex and ${formatPct(closingRate)} closing costs. What's your all-in basis per SF?`,
      context: { purchasePrice: price, capex, closingCostRate: closingRate, buildingSf: sf },
      expected,
      unit: 'usdPerSf',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(price, capex, closingRate, sf),
    };
  },
};
