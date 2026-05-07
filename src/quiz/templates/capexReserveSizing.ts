import { formatUsd, formatUsdPerSf, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

// Standard per-SF capex reserve assumptions: low for newer / less
// capital-intensive product, higher for older / heavier roll product.
const CAPEX_PER_SF_OPTIONS = [0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5] as const;

function buildSolution(
  buildingSf: number,
  perSf: number,
  holdYears: number,
  reserve: number,
): Solution {
  return {
    formula: 'Reserve = SF × ($/SF/yr capex reserve) × hold years',
    steps: [
      {
        label: 'Annual reserve $',
        expression: `${buildingSf.toLocaleString()} SF × ${formatUsdPerSf(perSf)}`,
        result: formatUsd(buildingSf * perSf),
      },
      {
        label: 'Total reserve over hold',
        expression: `${formatUsd(buildingSf * perSf)}/yr × ${holdYears} yrs`,
        result: formatUsd(reserve),
      },
    ],
    answerDisplay: formatUsd(reserve),
  };
}

export const capexReserveSizingTemplate: QuestionTemplate<'capexReserveSizing'> = {
  kind: 'capexReserveSizing',
  label: 'Capex Reserve Sizing',
  description:
    "Size a hold-period capex reserve from building SF + per-SF reserve assumption + hold years.",
  category: 'returns',
  roles: ['assetManagement', 'acquisitions'],
  pattern: 'reserve = SF × ($/SF/yr) × hold years',
  tips: [
    'Per-SF reserves: ~$0.15-0.25/SF for new / Class A; ~$0.30-0.50/SF for older Class B/C; can be $1+/SF for heavy-roll office or hotel FF&E.',
    'Reserves are an *operating* line — they hit NOI year-by-year, not just a one-time capex bucket. Asset managers fund them quarterly.',
    'Aggressive sponsors strip the reserve to inflate NOI; conservative shops add it back when normalizing.',
    'Hotels reserve % of revenue (3-5%) instead of $/SF — different convention, same purpose.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const buildingSf = pickBand(rng, bands.sf, difficulty);
    const perSf = rng.pickFromSet(CAPEX_PER_SF_OPTIONS);
    const holdYears = pickBand(rng, bands.holdYears, difficulty);
    const reserve = buildingSf * perSf * holdYears;

    return {
      id: nextId('capex_reserve'),
      kind: 'capexReserveSizing',
      prompt: `Building is ${buildingSf.toLocaleString()} SF. Underwriting assumes ${formatUsdPerSf(perSf)}/yr capex reserve over a ${formatYears(holdYears)} hold. Size the total reserve.`,
      context: {
        buildingSf,
        capexReservePerSf: perSf,
        holdYears,
      },
      expected: reserve,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(buildingSf, perSf, holdYears, reserve),
    };
  },
};
