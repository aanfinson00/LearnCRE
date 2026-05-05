import type { ModelingTestTemplate } from '../../../types/modelingTest';
import type { SheetCell } from '../../types';

const NOI = 5_000_000;
const VALUE = 80_000_000;
const REQ_DSCR = 1.25;
const REQ_LTV = 0.75;
const REQ_DEBT_YIELD = 0.08;
const RATE = 0.06;
const AMORT = 30;

const LOAN_CONSTANT = RATE / (1 - Math.pow(1 + RATE, -AMORT));
const MAX_DS_DSCR = NOI / REQ_DSCR;
const MAX_LOAN_DSCR = MAX_DS_DSCR / LOAN_CONSTANT;
const MAX_LOAN_LTV = VALUE * REQ_LTV;
const MAX_LOAN_DBY = NOI / REQ_DEBT_YIELD;
const FINAL_MAX_LOAN = Math.min(MAX_LOAN_DSCR, MAX_LOAN_LTV, MAX_LOAN_DBY);
const IMPLIED_DSCR_AT_LTV = NOI / (MAX_LOAN_LTV * LOAN_CONSTANT);

const cells: SheetCell[] = [
  { address: 'A1', role: 'header', text: 'Assumptions' },
  { address: 'A2', role: 'header', text: 'NOI' },
  { address: 'B2', role: 'assumption', value: NOI, format: 'usd' },
  { address: 'A3', role: 'header', text: 'Property value' },
  { address: 'B3', role: 'assumption', value: VALUE, format: 'usd' },
  { address: 'A4', role: 'header', text: 'Required DSCR' },
  { address: 'B4', role: 'assumption', value: REQ_DSCR, format: 'multiple' },
  { address: 'A5', role: 'header', text: 'Required LTV' },
  { address: 'B5', role: 'assumption', value: REQ_LTV, format: 'pct' },
  { address: 'A6', role: 'header', text: 'Required debt yield' },
  { address: 'B6', role: 'assumption', value: REQ_DEBT_YIELD, format: 'pct' },
  { address: 'A7', role: 'header', text: 'Loan rate' },
  { address: 'B7', role: 'assumption', value: RATE, format: 'pct' },
  { address: 'A8', role: 'header', text: 'Amortization (years)' },
  { address: 'B8', role: 'assumption', value: AMORT, format: 'number' },

  { address: 'A10', role: 'header', text: 'Step 1 — Loan constant' },
  { address: 'A11', role: 'header', text: 'Loan constant' },
  { address: 'B11', role: 'target', label: 'Loan constant', format: 'pct' },

  { address: 'A13', role: 'header', text: 'Step 2 — Max loan by each constraint' },
  { address: 'A14', role: 'header', text: 'Max loan (DSCR)' },
  { address: 'B14', role: 'target', label: 'Max loan (DSCR)', format: 'usd' },
  { address: 'A15', role: 'header', text: 'Max loan (LTV)' },
  { address: 'B15', role: 'target', label: 'Max loan (LTV)', format: 'usd' },
  { address: 'A16', role: 'header', text: 'Max loan (debt yield)' },
  { address: 'B16', role: 'target', label: 'Max loan (debt yield)', format: 'usd' },

  { address: 'A18', role: 'header', text: 'Step 3 — Final max loan' },
  { address: 'A19', role: 'header', text: 'Final max loan (MIN of above)' },
  { address: 'B19', role: 'target', label: 'Final max loan', format: 'usd' },

  { address: 'A21', role: 'header', text: 'Step 4 — Cross-check' },
  { address: 'A22', role: 'header', text: 'Max annual DS at DSCR limit' },
  { address: 'B22', role: 'target', label: 'Max annual DS (DSCR)', format: 'usd' },
  { address: 'A23', role: 'header', text: 'Implied DSCR at LTV-max loan' },
  { address: 'B23', role: 'target', label: 'Implied DSCR at LTV max', format: 'multiple' },
];

export const loanSizingThreeConstraint: ModelingTestTemplate = {
  id: 'loan-sizing-three-constraint',
  title: 'Loan Sizing — Three Constraints',
  scenario:
    'Permanent loan on a stabilized industrial asset. Lender uses 1.25× DSCR, 75% LTV, and 8% debt yield. Solve the max loan that passes all three, then cross-check by computing the implied DSCR if you sized to LTV.',
  brief: {
    paragraphs: [
      'Stabilized industrial in a tier-2 market. Year-1 NOI $5.0M, $80M asset value (6.25% going-in cap). Lender quotes 6.0% / 30-year permanent.',
      "Three constraints govern loan sizing: (1) DSCR ≥ 1.25× (debt service can't exceed NOI / 1.25), (2) LTV ≤ 75% of value, (3) debt yield ≥ 8% (loan can't exceed NOI / 0.08). The binding constraint is the lowest of the three max-loans.",
    ],
    bullets: [
      'Compute the loan constant first — it converts a loan amount to its annual debt service.',
      'For each of the three constraints, solve the max loan that just satisfies it.',
      'Final max loan is the minimum of the three (binding constraint = whichever is lowest).',
      'Cross-check: if you sized to LTV, what DSCR would you actually have? Should be < 1.25 if DSCR is binding.',
    ],
  },
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  layout: { rows: 24, cols: 3, cells },
  outputs: [
    {
      ref: 'B11',
      label: 'Loan constant',
      format: 'pct',
      expected: LOAN_CONSTANT,
      tolerance: { abs: 0.0001 },
      whenWrongTry:
        '=B7 / (1 - (1 + B7)^-B8) — or equivalently =-PMT(B7, B8, 1). The loan constant times any loan amount gives that loan\'s annual debt service.',
    },
    {
      ref: 'B14',
      label: 'Max loan (DSCR-constrained)',
      format: 'usd',
      expected: MAX_LOAN_DSCR,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Max DS allowed = NOI / DSCR = 5M / 1.25 = $4M. Max loan = max DS / loan constant. Or: =B2/B4/B11.',
    },
    {
      ref: 'B15',
      label: 'Max loan (LTV-constrained)',
      format: 'usd',
      expected: MAX_LOAN_LTV,
      tolerance: { rel: 0.001 },
      whenWrongTry: '=B3 * B5 — value × LTV.',
    },
    {
      ref: 'B16',
      label: 'Max loan (debt yield-constrained)',
      format: 'usd',
      expected: MAX_LOAN_DBY,
      tolerance: { rel: 0.001 },
      whenWrongTry: '=B2 / B6 — NOI ÷ required debt yield.',
    },
    {
      ref: 'B19',
      label: 'Final max loan',
      format: 'usd',
      expected: FINAL_MAX_LOAN,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        '=MIN(B14:B16). The most-restrictive of the three constraints binds — usually DSCR in a higher-rate environment.',
    },
  ],
  checkpoints: [
    {
      ref: 'B22',
      label: 'Max annual DS at DSCR limit',
      format: 'usd',
      expected: MAX_DS_DSCR,
      tolerance: { rel: 0.001 },
      diagnostic:
        'Max annual DS allowed = NOI / required DSCR = 5,000,000 / 1.25 = $4,000,000. If this is wrong, your DSCR-constrained max loan will also be wrong.',
      explains: ['B14', 'B19'],
    },
    {
      ref: 'B23',
      label: 'Implied DSCR at LTV-max loan',
      format: 'multiple',
      expected: IMPLIED_DSCR_AT_LTV,
      tolerance: { abs: 0.005 },
      diagnostic:
        'If you sized at the LTV max ($60M), the actual DSCR = NOI / (LTV_loan × loan_constant) ≈ 1.15× — below the 1.25× threshold, which is why DSCR binds. Formula: =B2 / (B15 * B11).',
      explains: ['B19'],
    },
  ],
  rubric:
    'Loan sizing under multiple constraints is solved by computing the max loan each constraint allows, then taking the minimum. The loan constant (annual debt service per dollar of loan) makes the DSCR step a one-line division. LTV is the simplest (value × LTV); debt yield is NOI ÷ DY. The binding constraint is whichever produces the lowest max-loan — in a 6% / 30-yr environment with 1.25× DSCR, DSCR usually binds before LTV. The implied-DSCR cross-check confirms which constraint binds: at the LTV-max loan, an actual DSCR below 1.25× tells you DSCR is binding.',
};
