import type { ExcelTemplate } from '../types';

// In-place $24/SF, market $32/SF → 33.3% lift on rollover.
const inPlace = 24;
const market = 32;
const expected = (market - inPlace) / inPlace;

export const markToMarketLift: ExcelTemplate = {
  id: 'mark-to-market-lift',
  title: 'Mark-to-market rent lift on rollover',
  category: 'arithmetic',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  scenario:
    'A tenant\'s in-place rent is $24/SF; recent leases in the building have signed at $32/SF. Compute the percentage rent lift available on rollover.',
  instruction:
    'In B3, compute the percentage uplift from in-place to market. Output the answer as a decimal (the cell formats it as %). The "lift" is the gap divided by the *starting* rent, not the new one.',
  targetCell: 'B3',
  expected,
  tolerancePct: 0.005,
  exampleFormula: '=(B2-B1)/B1',
  layout: {
    rows: 3,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'In-place rent' },
      { address: 'B1', role: 'assumption', value: inPlace, format: 'usdPerSf' },
      { address: 'A2', role: 'header', text: 'Market rent' },
      { address: 'B2', role: 'assumption', value: market, format: 'usdPerSf' },
      { address: 'A3', role: 'header', text: 'Lift on rollover' },
      { address: 'B3', role: 'target', format: 'pct' },
    ],
  },
  takeaway:
    'Mark-to-market % is the most-quoted rent-roll metric in office and industrial underwriting. The denominator matters: dividing by the *new* rent gives a lower (and misleading) number. Always lift = (new − old) / old.',
  solution: `(B2 − B1) / B1 = ($32 − $24) / $24 = $8 / $24 = ${(expected * 100).toFixed(1)}%.`,
};
