import { formatPct, formatSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

const SQFT_PER_ACRE = 43_560;

function buildSolution(
  buildingSf: number,
  acres: number,
  expected: number,
): Solution {
  const siteSf = acres * SQFT_PER_ACRE;
  return {
    formula: 'Coverage Ratio = Building SF / (Acres × 43,560)',
    steps: [
      {
        label: 'Site area in SF',
        expression: `${acres} acres × 43,560 SF/acre`,
        result: formatSf(siteSf),
      },
      {
        label: 'Building coverage ratio',
        expression: `${formatSf(buildingSf)} / ${formatSf(siteSf)}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const buildingCoverageRatioTemplate: QuestionTemplate<'buildingCoverageRatio'> = {
  kind: 'buildingCoverageRatio',
  label: 'Industrial: Building Coverage Ratio',
  description: 'Building footprint SF divided by total site area — a core industrial land efficiency metric.',
  category: 'valuation',
  roles: ['acquisitions', 'development', 'assetManagement'],
  pattern: 'Building SF / Site SF  (1 acre = 43,560 SF)',
  tips: [
    'Industrial coverage ratios typically range from 35–55%. Higher coverage = more building on the same land.',
    'Bulk distribution favors lower coverage (35–45%) to accommodate truck courts, trailer parking, and car parking.',
    'Last-mile and urban infill industrial can push 55–65% coverage where land cost is high and truck courts are tight.',
    'Coverage ratio directly impacts truck court depth — below 40% usually allows for 185-ft+ court-to-court clearance.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    // Target coverage in 30–60% range
    const targetCoverage = rng.pickFromSet([0.32, 0.38, 0.42, 0.46, 0.50, 0.55, 0.60] as const);
    const acres = rng.pickFromSet([5, 7, 8, 10, 12, 15, 18, 20, 25, 30, 40, 50] as const);
    const siteSf = acres * SQFT_PER_ACRE;
    const buildingSf = Math.round((siteSf * targetCoverage) / 1_000) * 1_000;
    const expected = buildingSf / siteSf;

    return {
      id: nextId('bcr'),
      kind: 'buildingCoverageRatio',
      prompt: `An industrial building contains ${buildingSf.toLocaleString()} SF on a ${acres}-acre site. What is the building coverage ratio?`,
      context: {
        buildingSf,
        siteAcres: acres,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(buildingSf, acres, expected),
    };
  },
};
