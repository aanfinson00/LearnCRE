import { evaluateFormula } from '../evaluate';
import type { ExcelTemplate } from '../types';

// Cash flows (simple 5-year hold with mid-deal distributions and a sale at exit):
// A1: "Year 0"   B1: -5,000,000
// A2: "Year 1"   B2:    250,000
// A3: "Year 2"   B3:    250,000
// A4: "Year 3"   B4:    300,000
// A5: "Year 4"   B5:  7,800,000   (combined operating + sale proceeds)
// A6: "IRR"      B6: ?
//
// IRR ≈ ?

const cashflows = [-5_000_000, 250_000, 250_000, 300_000, 7_800_000];
const sheet = {
  B1: cashflows[0],
  B2: cashflows[1],
  B3: cashflows[2],
  B4: cashflows[3],
  B5: cashflows[4],
};
// Compute the canonical answer at module-load via the evaluator itself
const expected = evaluateFormula('=IRR(B1:B5)', sheet);

export const irrFromCashflows: ExcelTemplate = {
  id: 'irr-from-cashflows',
  title: 'IRR from a cash flow series',
  category: 'finance',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  scenario:
    'A 4-year hold on a value-add multifamily deal. $5M of equity in at Year 0; modest interim distributions; sale + final operating year combined into Year 4.',
  instruction:
    'In B6, compute the levered IRR using the IRR function across the cash flow column. The first cell is the equity outlay (negative); the rest are distributions.',
  targetCell: 'B6',
  expected,
  tolerancePct: 0.01,
  exampleFormula: '=IRR(B1:B5)',
  layout: {
    rows: 6,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'Year 0' },
      { address: 'B1', role: 'assumption', value: cashflows[0], format: 'usd' },
      { address: 'A2', role: 'header', text: 'Year 1' },
      { address: 'B2', role: 'assumption', value: cashflows[1], format: 'usd' },
      { address: 'A3', role: 'header', text: 'Year 2' },
      { address: 'B3', role: 'assumption', value: cashflows[2], format: 'usd' },
      { address: 'A4', role: 'header', text: 'Year 3' },
      { address: 'B4', role: 'assumption', value: cashflows[3], format: 'usd' },
      { address: 'A5', role: 'header', text: 'Year 4' },
      { address: 'B5', role: 'assumption', value: cashflows[4], format: 'usd' },
      { address: 'A6', role: 'header', text: 'IRR' },
      { address: 'B6', role: 'target', format: 'pct' },
    ],
  },
  takeaway:
    'IRR is the discount rate that sets NPV of all cash flows to zero. For a clean equity-in / cash-out series like this, =IRR(range) is the right answer; for irregular cash-flow timing, you\'d use XIRR. The series must contain at least one negative and one positive value or IRR has no solution.',
  solution: `=IRR(B1:B5) → ${(expected * 100).toFixed(2)}%. The negative Year 0 cash flow plus four years of positive flows let the solver find the rate where discounted-sum = 0.`,
};
