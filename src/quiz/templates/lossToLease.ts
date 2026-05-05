import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(market: number, inPlace: number, expected: number): Solution {
  return {
    formula: 'Loss to Lease = (Market − In-Place) / Market',
    steps: [
      {
        label: 'Gap',
        expression: `${formatUsd(market)} − ${formatUsd(inPlace)}`,
        result: formatUsd(market - inPlace),
      },
      {
        label: 'Loss to Lease',
        expression: `${formatUsd(market - inPlace)} / ${formatUsd(market)}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const lossToLeaseTemplate: QuestionTemplate<'lossToLease'> = {
  kind: 'lossToLease',
  label: 'MF: Loss to Lease',
  description: 'Market rent + in-place rent → embedded mark-to-market upside, as % of market.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: '(Market − In-Place) / Market',
  tips: [
    'Loss to Lease = embedded value-add upside. 5% LTL on a $4M GPR property = $200k/yr of mark-to-market opportunity.',
    'Captured via lease renewals at market or new tenants at market. The natural rent-growth lever beyond CPI.',
    'High LTL (>10%) signals a "value-add story." Watch for sponsor over-pitching: LTL on a stabilized B asset is rarely >5%.',
    'Negative LTL (in-place > market) = "loss to roll" — the asset is *over-rented*; rents will compress on rollover.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const round = 25_000;
    const market =
      Math.round(rng.pickRange(2_000_000, 12_000_000) / round) * round;
    // LTL between -5% and +12% (mostly positive — embedded upside is more common)
    const ltlPct = rng.pickFromSet([
      -0.05, -0.02, 0.02, 0.04, 0.06, 0.08, 0.10, 0.12,
    ] as const);
    const inPlace = Math.round((market * (1 - ltlPct)) / round) * round;
    const expected = (market - inPlace) / market;

    return {
      id: nextId('ltl'),
      kind: 'lossToLease',
      prompt: `Multifamily property: market GPR is ${formatUsd(market)}; in-place GPR is ${formatUsd(inPlace)}. What\'s the loss to lease?`,
      context: { marketRent: market, inPlaceRent: inPlace },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(market, inPlace, expected),
    };
  },
};
