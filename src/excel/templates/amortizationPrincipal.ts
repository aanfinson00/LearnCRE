import { evaluateFormula } from '../evaluate';
import type { ExcelTemplate } from '../types';

// $10M loan, 6%/yr, 30-yr amortization, annual payments. Year-3 principal payment.
const sheet = { B1: 0.06, B2: 3, B3: 30, B4: 10_000_000 };
const expected = evaluateFormula('=PPMT(B1,B2,B3,B4)', sheet);

export const amortizationPrincipal: ExcelTemplate = {
  id: 'amortization-principal',
  title: 'Year-3 principal payment on a 30-year loan',
  category: 'finance',
  difficulty: 'intermediate',
  roles: ['mortgageUw'],
  scenario:
    'A $10M loan at 6% annual interest amortizes over 30 years with annual payments. You\'re building an amortization schedule and need to know how much of year 3\'s payment goes to principal (vs. interest).',
  instruction:
    'In B5, compute the principal portion of the year-3 payment. Use PPMT — Excel\'s purpose-built function for this. Note that PPMT returns a negative value (cash outflow).',
  targetCell: 'B5',
  expected,
  tolerancePct: 0.005,
  exampleFormula: '=PPMT(B1,B2,B3,B4)',
  layout: {
    rows: 5,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'Rate' },
      { address: 'B1', role: 'assumption', value: 0.06, format: 'pct' },
      { address: 'A2', role: 'header', text: 'Period (year)' },
      { address: 'B2', role: 'assumption', value: 3, format: 'number' },
      { address: 'A3', role: 'header', text: 'Total periods' },
      { address: 'B3', role: 'assumption', value: 30, format: 'number' },
      { address: 'A4', role: 'header', text: 'Loan amount' },
      { address: 'B4', role: 'assumption', value: 10_000_000, format: 'usd' },
      { address: 'A5', role: 'header', text: 'Year-3 principal' },
      { address: 'B5', role: 'target', format: 'usd' },
    ],
  },
  takeaway:
    'Early in an amortization schedule almost all of the payment is interest; principal builds slowly until very late in the term. PPMT(rate, per, nper, pv) returns the principal portion of any specific period — pair it with IPMT for the interest portion. They sum to PMT.',
  solution: `=PPMT(B1,B2,B3,B4) → ${Math.round(expected).toLocaleString()}. The negative sign reflects that the principal is a cash *outflow* from your perspective.`,
};
