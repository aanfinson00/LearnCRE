import type { ExcelTemplate } from '../types';

// A1: "Initial equity"    B1: 5,000,000
// A2: "Year 1 distrib"   B2: 250,000
// A3: "Year 2 distrib"   B3: 250,000
// A4: "Year 3 distrib"   B4: 300,000
// A5: "Year 4 distrib"   B5: 300,000
// A6: "Sale proceeds"    B6: 7,500,000
// A7: "Equity multiple"  B7: ?
//
// EM = SUM(B2:B6) / B1 = (250+250+300+300+7500)k / 5000k = 8,600 / 5,000 = 1.72x

const distributions = [250_000, 250_000, 300_000, 300_000, 7_500_000];
const initialEquity = 5_000_000;
const expected = distributions.reduce((a, b) => a + b, 0) / initialEquity;

export const equityMultipleTemplate: ExcelTemplate = {
  id: 'equity-multiple',
  title: 'Equity multiple from distributions',
  category: 'aggregation',
  difficulty: 'beginner',
  scenario:
    'You contributed $5M in equity. Over a 4-year hold the deal returned the distributions below, with the sale proceeds in year 4. Compute the equity multiple.',
  instruction:
    'In B7, compute the equity multiple as total distributions divided by initial equity. Use SUM for the distributions.',
  targetCell: 'B7',
  expected,
  tolerancePct: 0.005,
  exampleFormula: '=SUM(B2:B6)/B1',
  layout: {
    rows: 7,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'Initial equity' },
      { address: 'B1', role: 'assumption', value: initialEquity, format: 'usd' },
      { address: 'A2', role: 'header', text: 'Year 1 distrib' },
      { address: 'B2', role: 'assumption', value: distributions[0], format: 'usd' },
      { address: 'A3', role: 'header', text: 'Year 2 distrib' },
      { address: 'B3', role: 'assumption', value: distributions[1], format: 'usd' },
      { address: 'A4', role: 'header', text: 'Year 3 distrib' },
      { address: 'B4', role: 'assumption', value: distributions[2], format: 'usd' },
      { address: 'A5', role: 'header', text: 'Year 4 distrib' },
      { address: 'B5', role: 'assumption', value: distributions[3], format: 'usd' },
      { address: 'A6', role: 'header', text: 'Sale proceeds' },
      { address: 'B6', role: 'assumption', value: distributions[4], format: 'usd' },
      { address: 'A7', role: 'header', text: 'Equity multiple' },
      { address: 'B7', role: 'target', format: 'multiple' },
    ],
  },
  takeaway:
    'Equity multiple = total cash returned / cash invested. It\'s time-blind — a 1.72x in 4 years and a 1.72x in 7 years are very different deals. Pair it with IRR to get the full picture: EM tells you how much you got back, IRR tells you how fast.',
  solution: `EM = SUM(B2:B6) / B1 = $8,600,000 / $5,000,000 = ${expected.toFixed(2)}x.`,
};
