import { formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  inPlaceRent: number,
  marketRent: number,
  rollingUnits: number,
  expected: number,
): Solution {
  const monthlyUplift = (marketRent - inPlaceRent) * rollingUnits;
  return {
    formula: 'Annual Uplift = (Market − In-Place) × Rolling Units × 12',
    steps: [
      {
        label: 'Rent lift per unit',
        expression: `${formatUsd(marketRent)} − ${formatUsd(inPlaceRent)}`,
        result: `${formatUsd(marketRent - inPlaceRent)}/mo`,
      },
      {
        label: 'Monthly NOI uplift',
        expression: `${formatUsd(marketRent - inPlaceRent)} × ${rollingUnits} units`,
        result: `${formatUsd(monthlyUplift)}/mo`,
      },
      {
        label: 'Annualized NOI uplift',
        expression: `${formatUsd(monthlyUplift)} × 12`,
        result: `${formatUsd(expected)}/yr`,
      },
    ],
    answerDisplay: `${formatUsd(expected)}/yr`,
  };
}

export const rollToMarketUpliftTemplate: QuestionTemplate<'rollToMarketUplift'> = {
  kind: 'rollToMarketUplift',
  label: 'MF: Roll-to-Market NOI Uplift',
  description: 'Annualized NOI uplift from renewing or re-leasing below-market units at current market rents.',
  category: 'valuation',
  roles: ['assetManagement', 'acquisitions'],
  pattern: '(Market − In-Place) × Rolling Units × 12',
  tips: [
    'Roll-to-market uplift is the core value-creation thesis in multifamily value-add — converting loss-to-lease into realized income.',
    'This is gross uplift before turnover costs. Subtract: unit make-ready (~$2–5k/unit), leasing concessions, and ~2 weeks of vacancy.',
    'In a softening market, "rolling to market" may mean rolling down — model both upside and downside scenarios.',
    'Concentration risk: if 40%+ of leases expire in a 3-month window, pricing power diminishes and vacancy can spike temporarily.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const inPlaceRent = Math.round(rng.pickRange(1_100, 2_200) / 25) * 25;
    // Market premium of 3–15% above in-place
    const premiumPct = rng.pickFromSet([0.03, 0.05, 0.07, 0.10, 0.12, 0.15] as const);
    const marketRent = Math.round((inPlaceRent * (1 + premiumPct)) / 25) * 25;
    const rollingUnits = rng.pickFromSet([15, 20, 25, 30, 40, 50, 60] as const);
    const expected = (marketRent - inPlaceRent) * rollingUnits * 12;

    return {
      id: nextId('rtm'),
      kind: 'rollToMarketUplift',
      prompt: `A multifamily property has ${rollingUnits} units rolling to new leases over the next 12 months. In-place rents on those units average ${formatUsd(inPlaceRent)}/mo; current market rents are ${formatUsd(marketRent)}/mo. What is the annualized NOI uplift from rolling to market?`,
      context: {
        inPlaceRent,
        marketRent,
        rollingUnits,
      },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(inPlaceRent, marketRent, rollingUnits, expected),
    };
  },
};
