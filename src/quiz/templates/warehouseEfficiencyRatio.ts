import { formatPct, formatSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  warehouseSf: number,
  totalSf: number,
  expected: number,
): Solution {
  const officeSf = totalSf - warehouseSf;
  return {
    formula: 'Warehouse Efficiency = Warehouse SF / Total SF',
    steps: [
      {
        label: 'Office / mezzanine SF',
        expression: `${formatSf(totalSf)} − ${formatSf(warehouseSf)}`,
        result: formatSf(officeSf),
      },
      {
        label: 'Warehouse efficiency ratio',
        expression: `${formatSf(warehouseSf)} / ${formatSf(totalSf)}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const warehouseEfficiencyRatioTemplate: QuestionTemplate<'warehouseEfficiencyRatio'> = {
  kind: 'warehouseEfficiencyRatio',
  label: 'Industrial: Warehouse Efficiency Ratio',
  description: 'Bulk warehouse / distribution SF as a percentage of total building SF.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement', 'development'],
  pattern: 'Warehouse SF / Total Building SF',
  tips: [
    'Modern bulk distribution buildings run 95–98% warehouse efficiency — minimal office footprint is the norm.',
    'Older industrial (pre-1990) often has 15–25% office buildout, reducing usable warehouse SF and rent achievable from logistics tenants.',
    'A low efficiency ratio (e.g., 75%) signals either an owner-user buildout or a conversion candidate that may need demo/rebuild of office space.',
    'Adjusting for efficiency: a 100k SF building at 80% efficiency is functionally only 80k SF of rentable warehouse — adjust comp rents accordingly.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const totalSf = rng.pickFromSet([
      50_000, 75_000, 100_000, 120_000, 150_000, 200_000, 250_000, 300_000,
    ] as const);
    // Office % of total: 2–25%
    const officePct = rng.pickFromSet([0.02, 0.05, 0.08, 0.10, 0.12, 0.15, 0.20, 0.25] as const);
    const officeSf = Math.round((totalSf * officePct) / 500) * 500;
    const warehouseSf = totalSf - officeSf;
    const expected = warehouseSf / totalSf;

    return {
      id: nextId('wer'),
      kind: 'warehouseEfficiencyRatio',
      prompt: `An industrial building has ${totalSf.toLocaleString()} total SF: ${warehouseSf.toLocaleString()} SF of bulk warehouse and ${officeSf.toLocaleString()} SF of office/mezzanine space. What is the warehouse efficiency ratio?`,
      context: {
        buildingSf: totalSf,
        warehouseSf,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(warehouseSf, totalSf, expected),
    };
  },
};
