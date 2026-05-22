import { formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  studioCount: number,
  studioRent: number,
  oneBrCount: number,
  oneBrRent: number,
  twoBrCount: number,
  twoBrRent: number,
  expected: number,
): Solution {
  const totalUnits = studioCount + oneBrCount + twoBrCount;
  const totalRevenue =
    studioCount * studioRent + oneBrCount * oneBrRent + twoBrCount * twoBrRent;
  return {
    formula: 'Blended Rent = Σ(Units × Rent) / Total Units',
    steps: [
      {
        label: 'Studio revenue',
        expression: `${studioCount} × ${formatUsd(studioRent)}`,
        result: formatUsd(studioCount * studioRent),
      },
      {
        label: '1-BR revenue',
        expression: `${oneBrCount} × ${formatUsd(oneBrRent)}`,
        result: formatUsd(oneBrCount * oneBrRent),
      },
      {
        label: '2-BR revenue',
        expression: `${twoBrCount} × ${formatUsd(twoBrRent)}`,
        result: formatUsd(twoBrCount * twoBrRent),
      },
      {
        label: 'Blended rent',
        expression: `${formatUsd(totalRevenue)} / ${totalUnits} units`,
        result: `${formatUsd(expected)}/mo`,
      },
    ],
    answerDisplay: `${formatUsd(expected)}/mo`,
  };
}

export const blendedUnitMixRentTemplate: QuestionTemplate<'blendedUnitMixRent'> = {
  kind: 'blendedUnitMixRent',
  label: 'MF: Blended Unit-Mix Rent',
  description: 'Weighted-average rent across a multifamily unit mix of studios, 1-BRs, and 2-BRs.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: 'Σ(Units × Rent) / Total Units',
  tips: [
    'Blended rent is the key per-unit revenue driver used to size GPR and NOI in a proforma.',
    'A heavier mix of studios lowers blended rent but may support higher rent/SF; two-bedrooms pull blended rent up in dollar terms.',
    'When comparing two properties, always normalize to blended rent/SF — raw $/unit is misleading across different unit mixes.',
    'Lease-up assumptions should reflect each tier independently; new two-bedrooms typically absorb more slowly than studios.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const studioCount = rng.pickFromSet([10, 15, 20, 25, 30] as const);
    const oneBrCount = rng.pickFromSet([30, 40, 50, 60, 70] as const);
    const twoBrCount = rng.pickFromSet([10, 15, 20, 25, 30] as const);
    const studioRent = Math.round(rng.pickRange(1_000, 1_600) / 50) * 50;
    const oneBrRent = Math.round(rng.pickRange(1_400, 2_200) / 50) * 50;
    const twoBrRent = Math.round(rng.pickRange(1_900, 3_000) / 50) * 50;
    const totalUnits = studioCount + oneBrCount + twoBrCount;
    const totalRevenue =
      studioCount * studioRent + oneBrCount * oneBrRent + twoBrCount * twoBrRent;
    const expected = totalRevenue / totalUnits;

    return {
      id: nextId('bum'),
      kind: 'blendedUnitMixRent',
      prompt: `A multifamily property has the following unit mix: ${studioCount} studios at ${formatUsd(studioRent)}/mo, ${oneBrCount} one-bedrooms at ${formatUsd(oneBrRent)}/mo, and ${twoBrCount} two-bedrooms at ${formatUsd(twoBrRent)}/mo. What's the blended average monthly rent per unit?`,
      context: {
        studioCount,
        studioRent,
        oneBrCount,
        oneBrRent,
        twoBrCount,
        twoBrRent,
        units: totalUnits,
      },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(studioCount, studioRent, oneBrCount, oneBrRent, twoBrCount, twoBrRent, expected),
    };
  },
};
