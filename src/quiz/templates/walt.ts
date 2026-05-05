import { formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

interface Lease {
  rent: number;
  remainingTerm: number;
}

function rentWeightedWalt(leases: Lease[]): number {
  const totalRent = leases.reduce((s, l) => s + l.rent, 0);
  if (totalRent === 0) return 0;
  const weighted = leases.reduce((s, l) => s + l.rent * l.remainingTerm, 0);
  return weighted / totalRent;
}

function buildSolution(leases: Lease[], expected: number): Solution {
  const totalRent = leases.reduce((s, l) => s + l.rent, 0);
  const weighted = leases.reduce((s, l) => s + l.rent * l.remainingTerm, 0);
  return {
    formula: 'WALT = Σ(rent × remaining term) / Σ(rent)',
    steps: [
      {
        label: 'Σ(rent × term)',
        expression: leases.map((l) => `${l.rent.toLocaleString()} × ${l.remainingTerm}`).join(' + '),
        result: weighted.toLocaleString(),
      },
      {
        label: 'Σ(rent)',
        expression: leases.map((l) => l.rent.toLocaleString()).join(' + '),
        result: totalRent.toLocaleString(),
      },
      {
        label: 'WALT',
        expression: `${weighted.toLocaleString()} / ${totalRent.toLocaleString()}`,
        result: formatYears(Math.round(expected * 10) / 10),
      },
    ],
    answerDisplay: formatYears(Math.round(expected * 10) / 10),
  };
}

function leaseLine(rent: number, term: number): string {
  return `$${rent.toLocaleString()} rent / ${term}y remaining`;
}

export const waltTemplate: QuestionTemplate<'walt'> = {
  kind: 'walt',
  label: 'Office: WALT (rent-weighted)',
  description: 'Tenant rents + remaining terms → weighted-average lease term in years.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: 'Σ(rent × term) / Σ(rent)',
  tips: [
    'WALT = the income-weighted "average years left" across all tenants. The most-quoted office rollover-risk metric.',
    'Higher WALT = more income predictability + tighter cap-rate compression. Trophy office at 8+ year WALT trades at premium caps.',
    'Rent-weighted WALT is more common than SF-weighted; it captures economic exposure rather than physical exposure.',
    'A WALT under 4 years signals heavy near-term rollover — underwriting should stress vacancy + leasing costs at expiration.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const numTenants = rng.pickFromSet([3, 4, 5] as const);
    const leases: Lease[] = [];
    for (let i = 0; i < numTenants; i++) {
      const rent = Math.round(rng.pickRange(200_000, 1_500_000) / 50_000) * 50_000;
      const remainingTerm = rng.pickInt(2, 12);
      leases.push({ rent, remainingTerm });
    }
    const expected = rentWeightedWalt(leases);

    return {
      id: nextId('walt'),
      kind: 'walt',
      prompt: `A multi-tenant office building has the following rent roll: ${leases.map((l) => leaseLine(l.rent, l.remainingTerm)).join('; ')}. What\'s the rent-weighted WALT?`,
      context: { leases },
      expected,
      unit: 'multiple',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(leases, expected),
    };
  },
};
