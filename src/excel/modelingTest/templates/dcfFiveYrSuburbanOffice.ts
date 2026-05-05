import type { ModelingTestTemplate } from '../../../types/modelingTest';
import type { SheetCell } from '../../types';

const PURCHASE = 50_000_000;
const NOI_Y1 = 3_000_000;
const GROWTH = 0.03;
const EXIT_CAP = 0.065;
const SALE_COSTS_PCT = 0.02;
const LTV = 0.65;
const LOAN = PURCHASE * LTV;
const RATE = 0.06;
const AMORT = 30;

// Pre-computed answer key. Used to label the spec but also asserted by the
// per-template unit tests (which fill in the canonical correct formulas and
// confirm grading returns pass with all outputs ✓).
const NOI_Y2 = NOI_Y1 * (1 + GROWTH);
const NOI_Y3 = NOI_Y2 * (1 + GROWTH);
const NOI_Y4 = NOI_Y3 * (1 + GROWTH);
const NOI_Y5 = NOI_Y4 * (1 + GROWTH);
const ANNUAL_DS = (LOAN * RATE) / (1 - Math.pow(1 + RATE, -AMORT));
const EXIT_VALUE = NOI_Y5 / EXIT_CAP;
const SALE_COSTS = EXIT_VALUE * SALE_COSTS_PCT;
const POW5 = Math.pow(1 + RATE, 5);
const LOAN_BALANCE_EOY5 = LOAN * POW5 - ANNUAL_DS * (POW5 - 1) / RATE;
const NET_SALE_PROCEEDS = EXIT_VALUE - SALE_COSTS - LOAN_BALANCE_EOY5;
const EQUITY_IN = PURCHASE - LOAN;
const LEVERED_CF_Y1 = NOI_Y1 - ANNUAL_DS;
const LEVERED_CF_Y2 = NOI_Y2 - ANNUAL_DS;
const LEVERED_CF_Y3 = NOI_Y3 - ANNUAL_DS;
const LEVERED_CF_Y4 = NOI_Y4 - ANNUAL_DS;
const LEVERED_CF_Y5 = NOI_Y5 - ANNUAL_DS + NET_SALE_PROCEEDS;
const TOTAL_CASH_TO_EQUITY =
  LEVERED_CF_Y1 + LEVERED_CF_Y2 + LEVERED_CF_Y3 + LEVERED_CF_Y4 + LEVERED_CF_Y5;
const EQUITY_MULTIPLE = TOTAL_CASH_TO_EQUITY / EQUITY_IN;

function leveredIrr(): number {
  const cf = [-EQUITY_IN, LEVERED_CF_Y1, LEVERED_CF_Y2, LEVERED_CF_Y3, LEVERED_CF_Y4, LEVERED_CF_Y5];
  const f = (r: number): number => cf.reduce((a, c, t) => a + c / Math.pow(1 + r, t), 0);
  let lo = -0.5;
  let hi = 1;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const fm = f(mid);
    if (Math.abs(fm) < 1e-9) return mid;
    if (f(lo) * fm < 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}
const LEVERED_IRR = leveredIrr();

const cells: SheetCell[] = [
  { address: 'A1', role: 'header', text: 'Assumptions' },
  { address: 'A2', role: 'header', text: 'Purchase price' },
  { address: 'B2', role: 'assumption', value: PURCHASE, format: 'usd' },
  { address: 'A3', role: 'header', text: 'Year-1 NOI' },
  { address: 'B3', role: 'assumption', value: NOI_Y1, format: 'usd' },
  { address: 'A4', role: 'header', text: 'NOI growth' },
  { address: 'B4', role: 'assumption', value: GROWTH, format: 'pct' },
  { address: 'A5', role: 'header', text: 'Exit cap' },
  { address: 'B5', role: 'assumption', value: EXIT_CAP, format: 'pct' },
  { address: 'A6', role: 'header', text: 'Sale costs %' },
  { address: 'B6', role: 'assumption', value: SALE_COSTS_PCT, format: 'pct' },
  { address: 'A7', role: 'header', text: 'LTV' },
  { address: 'B7', role: 'assumption', value: LTV, format: 'pct' },
  { address: 'A8', role: 'header', text: 'Loan amount (LTV × price)' },
  { address: 'B8', role: 'computed', computed: LOAN, format: 'usd' },
  { address: 'A9', role: 'header', text: 'Loan rate' },
  { address: 'B9', role: 'assumption', value: RATE, format: 'pct' },
  { address: 'A10', role: 'header', text: 'Amortization (years)' },
  { address: 'B10', role: 'assumption', value: AMORT, format: 'number' },
  { address: 'A11', role: 'header', text: 'Hold (years)' },
  { address: 'B11', role: 'assumption', value: 5, format: 'number' },

  { address: 'A13', role: 'header', text: 'Operating roll' },
  { address: 'A14', role: 'header', text: 'Year' },
  { address: 'B14', role: 'header', text: '1' },
  { address: 'C14', role: 'header', text: '2' },
  { address: 'D14', role: 'header', text: '3' },
  { address: 'E14', role: 'header', text: '4' },
  { address: 'F14', role: 'header', text: '5' },

  { address: 'A15', role: 'header', text: 'NOI' },
  { address: 'B15', role: 'target', label: 'NOI Y1', format: 'usd' },
  { address: 'C15', role: 'target', label: 'NOI Y2', format: 'usd' },
  { address: 'D15', role: 'target', label: 'NOI Y3', format: 'usd' },
  { address: 'E15', role: 'target', label: 'NOI Y4', format: 'usd' },
  { address: 'F15', role: 'target', label: 'NOI Y5', format: 'usd' },

  { address: 'A16', role: 'header', text: 'Debt service' },
  { address: 'B16', role: 'target', label: 'DS Y1', format: 'usd' },
  { address: 'C16', role: 'target', label: 'DS Y2', format: 'usd' },
  { address: 'D16', role: 'target', label: 'DS Y3', format: 'usd' },
  { address: 'E16', role: 'target', label: 'DS Y4', format: 'usd' },
  { address: 'F16', role: 'target', label: 'DS Y5', format: 'usd' },

  { address: 'A18', role: 'header', text: 'Exit (year 5)' },
  { address: 'A19', role: 'header', text: 'Exit value' },
  { address: 'B19', role: 'target', label: 'Exit value', format: 'usd' },
  { address: 'A20', role: 'header', text: 'Sale costs $' },
  { address: 'B20', role: 'target', label: 'Sale costs $', format: 'usd' },
  { address: 'A21', role: 'header', text: 'Loan balance EoY5' },
  { address: 'B21', role: 'target', label: 'Loan balance EoY5', format: 'usd' },
  { address: 'A22', role: 'header', text: 'Net sale proceeds' },
  { address: 'B22', role: 'target', label: 'Net sale proceeds', format: 'usd' },

  { address: 'A24', role: 'header', text: 'Levered cash flow series (Y0 → Y5)' },
  { address: 'A25', role: 'header', text: 'Year' },
  { address: 'B25', role: 'header', text: '0' },
  { address: 'C25', role: 'header', text: '1' },
  { address: 'D25', role: 'header', text: '2' },
  { address: 'E25', role: 'header', text: '3' },
  { address: 'F25', role: 'header', text: '4' },
  { address: 'G25', role: 'header', text: '5' },
  { address: 'A26', role: 'header', text: 'Levered CF' },
  { address: 'B26', role: 'target', label: 'Y0 (equity outflow)', format: 'usd' },
  { address: 'C26', role: 'target', label: 'Y1 levered CF', format: 'usd' },
  { address: 'D26', role: 'target', label: 'Y2 levered CF', format: 'usd' },
  { address: 'E26', role: 'target', label: 'Y3 levered CF', format: 'usd' },
  { address: 'F26', role: 'target', label: 'Y4 levered CF', format: 'usd' },
  { address: 'G26', role: 'target', label: 'Y5 levered CF (incl. exit)', format: 'usd' },

  { address: 'A28', role: 'header', text: 'Returns' },
  { address: 'A29', role: 'header', text: 'Levered IRR' },
  { address: 'B29', role: 'target', label: 'Levered IRR', format: 'pct' },
  { address: 'A30', role: 'header', text: 'Equity multiple' },
  { address: 'B30', role: 'target', label: 'Equity multiple', format: 'multiple' },
];

export const dcfFiveYrSuburbanOffice: ModelingTestTemplate = {
  id: 'dcf-5yr-suburban-office',
  title: '5-Year DCF — Suburban Office',
  scenario:
    'A 250,000 SF Class-B suburban office, stabilized at acquisition. Underwrite a 5-year hold and report the levered IRR + equity multiple.',
  brief: {
    paragraphs: [
      'Subject is a stabilized Class-B office park in a stable secondary market — 95% leased, in-place rents at market, no major rollover in the hold.',
      "Sponsor's pro forma: 3% flat NOI growth years 2-5, exit at end of year 5 at a 50 bps wider cap than going-in. Permanent loan at 65% LTV, 6.0% fixed rate, 30-year amortization.",
    ],
    bullets: [
      'Build the year-by-year NOI and debt service rows.',
      'Compute exit value (use trailing Y5 NOI ÷ exit cap), sale costs, the loan balance at end-of-year-5, and net sale proceeds.',
      'Build the levered cash flow series Y0→Y5 (Y0 is the equity check; Y5 includes the exit), then compute the levered IRR and equity multiple.',
    ],
  },
  estimatedMinutes: 20,
  difficulty: 'intermediate',
  layout: { rows: 31, cols: 7, cells },
  outputs: [
    {
      ref: 'F15',
      label: 'Year-5 NOI',
      format: 'usd',
      expected: NOI_Y5,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Compound year-1 NOI (B3) by (1 + growth) four times — Y5 = B3 × (1 + B4)^4, or chain F15 = E15 × (1 + B4).',
    },
    {
      ref: 'B19',
      label: 'Exit value',
      format: 'usd',
      expected: EXIT_VALUE,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Trailing-NOI exit: =F15 / B5. If you used a forward (year-6) NOI you will be ~3% high.',
    },
    {
      ref: 'B22',
      label: 'Net sale proceeds',
      format: 'usd',
      expected: NET_SALE_PROCEEDS,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Exit value − sale costs $ − loan balance at end of Y5. A common slip is forgetting to back out the loan balance.',
    },
    {
      ref: 'B29',
      label: 'Levered IRR',
      format: 'pct',
      expected: LEVERED_IRR,
      tolerance: { abs: 0.001 },
      whenWrongTry:
        'IRR over the levered CF series (B26:G26). If your IRR is off by > 100 bps, the year-5 cash flow likely missed the net sale proceeds — Y5 levered CF = NOI − DS + net sale.',
    },
    {
      ref: 'B30',
      label: 'Equity multiple',
      format: 'multiple',
      expected: EQUITY_MULTIPLE,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'EM = (sum of Y1-Y5 levered cash flows including exit) ÷ equity invested. Equity invested = purchase − loan = 17.5M.',
    },
  ],
  checkpoints: [
    {
      ref: 'B16',
      label: 'Annual debt service (Y1)',
      format: 'usd',
      expected: ANNUAL_DS,
      tolerance: { rel: 0.005 },
      diagnostic:
        'Annual DS should be constant for a fully-amortizing loan. Canonical: =-PMT(B9, B10, B8). If this is off, every year of levered CF and your IRR will drift.',
      explains: ['B29', 'B30', 'B22'],
    },
    {
      ref: 'B21',
      label: 'Loan balance at EoY5',
      format: 'usd',
      expected: LOAN_BALANCE_EOY5,
      tolerance: { rel: 0.005 },
      diagnostic:
        'Use the amortization formula: =B8 * (1+B9)^5 + PMT(B9,B10,B8) * ((1+B9)^5 - 1) / B9 (PMT is negative, so this subtracts paid-down principal). A common error is loan − (PMT × 5), which double-counts interest.',
      explains: ['B22', 'B29'],
    },
  ],
  rubric:
    'A clean DCF chains NOI as a multiplicative compound from year-1 NOI. Debt service is constant for a fully-amortizing loan — use =-PMT. Exit value is trailing Y5 NOI ÷ exit cap; sale costs come off the gross sale price. Loan balance at exit is NOT loan − cumulative PMT (those payments are mostly interest in early years); use the amortization formula or =-PV(rate, remainingTerm, PMT). Levered cash flows are NOI − DS each year; year 5 adds net sale proceeds. IRR runs over the Y0-Y5 series with Y0 = negative equity check. Equity multiple is total cash returned divided by equity invested.',
};
