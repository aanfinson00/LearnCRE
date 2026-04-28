import type { ExcelTemplate } from '../types';

// A1: "Comp"          B1: "Cap"
// A2: "100 Main"      B2: 0.058
// A3: "5 Oak"         B3: 0.062
// A4: "200 Park"      B4: 0.057
// A5: "9 River"       B5: 0.061
// A6: "1 Hill"        B6: 0.060
// A7: "Average cap"   B7: ?
//
// AVERAGE(B2:B6) = 0.0596

export const capRateFromComps: ExcelTemplate = {
  id: 'cap-rate-from-comps',
  title: 'Average cap rate from a comp set',
  category: 'aggregation',
  difficulty: 'beginner',
  scenario:
    'Five recent industrial sale comps have been provided. Compute the average cap rate to anchor your pricing recommendation.',
  instruction:
    'In B7, write the formula that averages the cap rates in B2:B6. Use AVERAGE — typing five numbers manually and dividing by 5 is what we\'re trying to outgrow.',
  targetCell: 'B7',
  expected: (0.058 + 0.062 + 0.057 + 0.061 + 0.06) / 5, // = 0.0596
  tolerancePct: 0.005,
  exampleFormula: '=AVERAGE(B2:B6)',
  layout: {
    rows: 7,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'Comp' },
      { address: 'B1', role: 'header', text: 'Cap rate' },
      { address: 'A2', role: 'header', text: '100 Main' },
      { address: 'B2', role: 'assumption', value: 0.058, format: 'pct' },
      { address: 'A3', role: 'header', text: '5 Oak' },
      { address: 'B3', role: 'assumption', value: 0.062, format: 'pct' },
      { address: 'A4', role: 'header', text: '200 Park' },
      { address: 'B4', role: 'assumption', value: 0.057, format: 'pct' },
      { address: 'A5', role: 'header', text: '9 River' },
      { address: 'B5', role: 'assumption', value: 0.061, format: 'pct' },
      { address: 'A6', role: 'header', text: '1 Hill' },
      { address: 'B6', role: 'assumption', value: 0.06, format: 'pct' },
      { address: 'A7', role: 'header', text: 'Average cap' },
      { address: 'B7', role: 'target', format: 'pct' },
    ],
  },
  takeaway:
    'AVERAGE is the workhorse aggregation function. The bigger lesson is that the *comp set* matters as much as the formula — if any of these comps are stale or off-submarket, the unfiltered average is misleading. Always vet comps before averaging.',
  solution:
    'AVERAGE(B2:B6) = (5.8% + 6.2% + 5.7% + 6.1% + 6.0%) / 5 = 5.96%.',
};
