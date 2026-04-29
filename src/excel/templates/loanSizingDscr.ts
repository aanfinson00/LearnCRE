import { evaluateFormula } from '../evaluate';
import type { ExcelTemplate } from '../types';

// NOI $1M, DSCR 1.30x, 6%/yr, 30 yr → max loan
const sheet = { B1: 1_000_000, B2: 1.3, B3: 0.06, B4: 30 };
const expected = evaluateFormula('=-PV(B3,B4,B1/B2)', sheet);

export const loanSizingDscr: ExcelTemplate = {
  id: 'loan-sizing-dscr',
  title: 'Maximum loan from a DSCR constraint',
  category: 'finance',
  difficulty: 'intermediate',
  roles: ['mortgageUw', 'acquisitions'],
  scenario:
    'A stabilized asset generates $1M of NOI. The lender requires a 1.30x DSCR with the rate at 6% on a 30-year amortization. Compute the maximum supportable loan.',
  instruction:
    'In B5, compute the loan amount whose annual debt service equals NOI divided by DSCR. Easiest path: PV of an annuity equal to the maximum debt service. Remember PV returns negative — flip the sign.',
  targetCell: 'B5',
  expected,
  tolerancePct: 0.005,
  exampleFormula: '=-PV(B3,B4,B1/B2)',
  layout: {
    rows: 5,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'NOI' },
      { address: 'B1', role: 'assumption', value: 1_000_000, format: 'usd' },
      { address: 'A2', role: 'header', text: 'DSCR target' },
      { address: 'B2', role: 'assumption', value: 1.3, format: 'multiple' },
      { address: 'A3', role: 'header', text: 'Rate' },
      { address: 'B3', role: 'assumption', value: 0.06, format: 'pct' },
      { address: 'A4', role: 'header', text: 'Amortization (yrs)' },
      { address: 'B4', role: 'assumption', value: 30, format: 'years' },
      { address: 'A5', role: 'header', text: 'Max loan' },
      { address: 'B5', role: 'target', format: 'usd' },
    ],
  },
  takeaway:
    'DSCR-based loan sizing is the most common sizing constraint in CRE debt. The trick is recognizing it as a PV problem: max debt service = NOI / DSCR; max loan = PV of that annuity. Same math the lender uses.',
  solution: `Max debt service = NOI / DSCR = $1,000,000 / 1.30 = $769,231. PV of that annuity at 6% for 30 yrs ≈ $${Math.round(expected).toLocaleString()}.`,
};
