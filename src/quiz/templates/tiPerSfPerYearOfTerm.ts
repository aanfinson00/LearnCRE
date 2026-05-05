import { formatUsd, formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  tiPerSf: number,
  termYears: number,
  expected: number,
): Solution {
  return {
    formula: 'TI/SF/yr = Total TI/SF ÷ Lease Term (years)',
    steps: [
      {
        label: 'Amortized',
        expression: `${formatUsd(tiPerSf)}/SF / ${termYears} years`,
        result: formatUsdPerSf(expected, 2) + '/yr',
      },
    ],
    answerDisplay: formatUsdPerSf(expected, 2) + '/yr',
  };
}

export const tiPerSfPerYearOfTermTemplate: QuestionTemplate<'tiPerSfPerYearOfTerm'> = {
  kind: 'tiPerSfPerYearOfTerm',
  label: 'Office: TI / SF / Year-of-Term',
  description: 'Total TI/SF amortized over lease term — comparable economics across deals.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: 'TI/SF / Term',
  tips: [
    '$60/SF on a 5-year lease = $12/SF/yr amortized. That\'s the apples-to-apples comparison metric vs face rent.',
    'Low TI/SF/yr (<$5) is tenant-pays / minimal-build-out; mid ($8-15) is standard; high ($20+) is heavy build-out.',
    'TI is *additional* to free rent + leasing commissions in NER calculations. Don\'t double-count.',
    'Long leases tolerate higher TI ratios because the amortization compresses across more years.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const tiPerSf = rng.pickFromSet([
      30, 40, 45, 50, 60, 65, 75, 85, 95, 110,
    ] as const);
    const termYears = rng.pickInt(3, 12);
    const expected = tiPerSf / termYears;

    return {
      id: nextId('tiyr'),
      kind: 'tiPerSfPerYearOfTerm',
      prompt: `Landlord is offering ${formatUsd(tiPerSf)}/SF of TI on a ${termYears}-year lease. What\'s the amortized TI cost per SF per year?`,
      context: { tiPerSf, leaseTermYears: termYears },
      expected,
      unit: 'usdPerSf',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(tiPerSf, termYears, expected),
    };
  },
};
