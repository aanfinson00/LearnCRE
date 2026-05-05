import type { ModelingTestTemplate } from '../../../types/modelingTest';
import type { SheetCell } from '../../types';

const PURCHASE = 40_000_000;
const UNITS = 100;
const RENT_PER_UNIT_Y1 = 35_000;
const RENT_GROWTH = 0.04;
const VACANCY = 0.05;
const OTHER_PER_UNIT_Y1 = 700;
const OTHER_GROWTH = 0.02;
const OPEX_PER_UNIT_Y1 = 12_000;
const OPEX_GROWTH = 0.03;
const CAPEX_PER_UNIT_Y1 = 300;
const CAPEX_GROWTH = 0.03;
const REQ_DSCR = 1.25;
const RATE = 0.06;
const AMORT = 30;
const EXIT_CAP = 0.0575;
const SALE_COSTS_PCT = 0.02;

// Compound a per-unit dollar amount over t years at growth rate g.
const grow = (base: number, g: number, t: number) => base * Math.pow(1 + g, t - 1);

const gpr = (t: number) => UNITS * grow(RENT_PER_UNIT_Y1, RENT_GROWTH, t);
const vacancyDollars = (t: number) => VACANCY * gpr(t);
const otherIncome = (t: number) => UNITS * grow(OTHER_PER_UNIT_Y1, OTHER_GROWTH, t);
const egi = (t: number) => gpr(t) - vacancyDollars(t) + otherIncome(t);
const opex = (t: number) => UNITS * grow(OPEX_PER_UNIT_Y1, OPEX_GROWTH, t);
const noi = (t: number) => egi(t) - opex(t);
const capex = (t: number) => UNITS * grow(CAPEX_PER_UNIT_Y1, CAPEX_GROWTH, t);

const NOI_Y1 = noi(1);
const NOI_Y5 = noi(5);
const EGI_Y1 = egi(1);

const LOAN_CONSTANT = RATE / (1 - Math.pow(1 + RATE, -AMORT));
const MAX_DS = NOI_Y1 / REQ_DSCR;
const LOAN_AMOUNT = MAX_DS / LOAN_CONSTANT;
const ANNUAL_DS = LOAN_AMOUNT * LOAN_CONSTANT;
const EQUITY_IN = PURCHASE - LOAN_AMOUNT;
const EXIT_VALUE = NOI_Y5 / EXIT_CAP;
const SALE_COSTS = EXIT_VALUE * SALE_COSTS_PCT;

const POW5 = Math.pow(1 + RATE, 5);
const PMT = -ANNUAL_DS;
const LOAN_BALANCE_EOY5 = LOAN_AMOUNT * POW5 + PMT * (POW5 - 1) / RATE;
const NET_SALE_PROCEEDS = EXIT_VALUE - SALE_COSTS - LOAN_BALANCE_EOY5;

const leveredCf = (t: number) =>
  noi(t) - ANNUAL_DS - capex(t) + (t === 5 ? NET_SALE_PROCEEDS : 0);
const Y0 = -EQUITY_IN;
const Y1 = leveredCf(1);
const Y2 = leveredCf(2);
const Y3 = leveredCf(3);
const Y4 = leveredCf(4);
const Y5 = leveredCf(5);

function leveredIrr(): number {
  const cf = [Y0, Y1, Y2, Y3, Y4, Y5];
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
const EQUITY_MULTIPLE = (Y1 + Y2 + Y3 + Y4 + Y5) / EQUITY_IN;

const cells: SheetCell[] = [
  { address: 'A1', role: 'header', text: 'Assumptions' },
  { address: 'A2', role: 'header', text: 'Purchase price' },
  { address: 'B2', role: 'assumption', value: PURCHASE, format: 'usd' },
  { address: 'A3', role: 'header', text: 'Number of units' },
  { address: 'B3', role: 'assumption', value: UNITS, format: 'number' },
  { address: 'A4', role: 'header', text: 'Year-1 rent / unit / yr' },
  { address: 'B4', role: 'assumption', value: RENT_PER_UNIT_Y1, format: 'usd' },
  { address: 'A5', role: 'header', text: 'Annual rent growth' },
  { address: 'B5', role: 'assumption', value: RENT_GROWTH, format: 'pct' },
  { address: 'A6', role: 'header', text: 'Vacancy %' },
  { address: 'B6', role: 'assumption', value: VACANCY, format: 'pct' },
  { address: 'A7', role: 'header', text: 'Other income / unit / yr' },
  { address: 'B7', role: 'assumption', value: OTHER_PER_UNIT_Y1, format: 'usd' },
  { address: 'A8', role: 'header', text: 'Other-income growth' },
  { address: 'B8', role: 'assumption', value: OTHER_GROWTH, format: 'pct' },
  { address: 'A9', role: 'header', text: 'OpEx / unit / yr' },
  { address: 'B9', role: 'assumption', value: OPEX_PER_UNIT_Y1, format: 'usd' },
  { address: 'A10', role: 'header', text: 'OpEx growth' },
  { address: 'B10', role: 'assumption', value: OPEX_GROWTH, format: 'pct' },
  { address: 'A11', role: 'header', text: 'Capex reserve / unit / yr' },
  { address: 'B11', role: 'assumption', value: CAPEX_PER_UNIT_Y1, format: 'usd' },
  { address: 'A12', role: 'header', text: 'Capex growth' },
  { address: 'B12', role: 'assumption', value: CAPEX_GROWTH, format: 'pct' },
  { address: 'A13', role: 'header', text: 'Required DSCR' },
  { address: 'B13', role: 'assumption', value: REQ_DSCR, format: 'multiple' },
  { address: 'A14', role: 'header', text: 'Loan rate' },
  { address: 'B14', role: 'assumption', value: RATE, format: 'pct' },
  { address: 'A15', role: 'header', text: 'Amortization (years)' },
  { address: 'B15', role: 'assumption', value: AMORT, format: 'number' },
  { address: 'A16', role: 'header', text: 'Exit cap' },
  { address: 'B16', role: 'assumption', value: EXIT_CAP, format: 'pct' },
  { address: 'A17', role: 'header', text: 'Sale costs %' },
  { address: 'B17', role: 'assumption', value: SALE_COSTS_PCT, format: 'pct' },

  { address: 'A19', role: 'header', text: 'Operating roll' },
  { address: 'A20', role: 'header', text: 'Year' },
  { address: 'B20', role: 'header', text: '1' },
  { address: 'C20', role: 'header', text: '2' },
  { address: 'D20', role: 'header', text: '3' },
  { address: 'E20', role: 'header', text: '4' },
  { address: 'F20', role: 'header', text: '5' },

  { address: 'A21', role: 'header', text: 'Gross potential rent' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}21`,
    role: 'target',
    label: `GPR Y${i + 1}`,
    format: 'usd',
  })),

  { address: 'A22', role: 'header', text: 'Vacancy ($)' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}22`,
    role: 'target',
    label: `Vacancy Y${i + 1}`,
    format: 'usd',
  })),

  { address: 'A23', role: 'header', text: 'Other income' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}23`,
    role: 'target',
    label: `Other income Y${i + 1}`,
    format: 'usd',
  })),

  { address: 'A24', role: 'header', text: 'EGI' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}24`,
    role: 'target',
    label: `EGI Y${i + 1}`,
    format: 'usd',
  })),

  { address: 'A25', role: 'header', text: 'OpEx' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}25`,
    role: 'target',
    label: `OpEx Y${i + 1}`,
    format: 'usd',
  })),

  { address: 'A26', role: 'header', text: 'NOI' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}26`,
    role: 'target',
    label: `NOI Y${i + 1}`,
    format: 'usd',
  })),

  { address: 'A27', role: 'header', text: 'Capex reserve' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}27`,
    role: 'target',
    label: `Capex Y${i + 1}`,
    format: 'usd',
  })),

  { address: 'A29', role: 'header', text: 'Debt sizing (DSCR-constrained on Y1 NOI)' },
  { address: 'A30', role: 'header', text: 'Loan constant' },
  { address: 'B30', role: 'target', label: 'Loan constant', format: 'pct' },
  { address: 'A31', role: 'header', text: 'Max annual DS (NOI ÷ DSCR)' },
  { address: 'B31', role: 'target', label: 'Max annual DS', format: 'usd' },
  { address: 'A32', role: 'header', text: 'Loan amount' },
  { address: 'B32', role: 'target', label: 'Loan amount', format: 'usd' },
  { address: 'A33', role: 'header', text: 'Annual debt service' },
  { address: 'B33', role: 'target', label: 'Annual debt service', format: 'usd' },

  { address: 'A35', role: 'header', text: 'Exit (year 5)' },
  { address: 'A36', role: 'header', text: 'Exit value' },
  { address: 'B36', role: 'target', label: 'Exit value', format: 'usd' },
  { address: 'A37', role: 'header', text: 'Sale costs $' },
  { address: 'B37', role: 'target', label: 'Sale costs $', format: 'usd' },
  { address: 'A38', role: 'header', text: 'Loan balance EoY5' },
  { address: 'B38', role: 'target', label: 'Loan balance EoY5', format: 'usd' },
  { address: 'A39', role: 'header', text: 'Net sale proceeds' },
  { address: 'B39', role: 'target', label: 'Net sale proceeds', format: 'usd' },

  { address: 'A41', role: 'header', text: 'Levered cash flow series (Y0 → Y5)' },
  { address: 'A42', role: 'header', text: 'Year' },
  { address: 'B42', role: 'header', text: '0' },
  { address: 'C42', role: 'header', text: '1' },
  { address: 'D42', role: 'header', text: '2' },
  { address: 'E42', role: 'header', text: '3' },
  { address: 'F42', role: 'header', text: '4' },
  { address: 'G42', role: 'header', text: '5' },
  { address: 'A43', role: 'header', text: 'Levered CF (incl. capex)' },
  { address: 'B43', role: 'target', label: 'Y0 (equity outflow)', format: 'usd' },
  { address: 'C43', role: 'target', label: 'Y1 levered CF', format: 'usd' },
  { address: 'D43', role: 'target', label: 'Y2 levered CF', format: 'usd' },
  { address: 'E43', role: 'target', label: 'Y3 levered CF', format: 'usd' },
  { address: 'F43', role: 'target', label: 'Y4 levered CF', format: 'usd' },
  { address: 'G43', role: 'target', label: 'Y5 levered CF (incl. exit)', format: 'usd' },

  { address: 'A45', role: 'header', text: 'Returns' },
  { address: 'A46', role: 'header', text: 'Levered IRR' },
  { address: 'B46', role: 'target', label: 'Levered IRR', format: 'pct' },
  { address: 'A47', role: 'header', text: 'Equity multiple' },
  { address: 'B47', role: 'target', label: 'Equity multiple', format: 'multiple' },
];

export const acqProformaMultifamily: ModelingTestTemplate = {
  id: 'acq-proforma-multifamily',
  title: 'Acquisition Pro-Forma — Multifamily',
  scenario:
    '$40M, 100-unit Class-B garden multifamily acquisition. Build the operating roll with rent / opex / capex growth, size DSCR-constrained debt, compute exit, and report levered IRR + equity multiple.',
  brief: {
    paragraphs: [
      'Subject is a 100-unit Class-B garden community in a stable Sun Belt submarket — value-add complete, in-place rents at market, no major rollover concentration.',
      "Sponsor's pro forma: 4% rent growth, 2% other-income growth, 3% opex + capex growth, 5% vacancy throughout. Permanent loan sized at 1.25× DSCR on Y1 NOI, 6.0% / 30-year. Exit Y5 at a 5.75% cap, 2% sale costs.",
    ],
    bullets: [
      'Build the year-by-year operating roll: GPR → Vacancy → Other income → EGI → OpEx → NOI → Capex reserve.',
      'Size the loan: compute the loan constant, max DS allowed under 1.25× DSCR on Y1 NOI, then back into the loan amount.',
      'Compute the exit: trailing Y5 NOI ÷ exit cap, then sale costs and EoY5 loan balance, then net sale proceeds.',
      'Build the Y0→Y5 levered cash flow series — each year is NOI − DS − capex; Y5 also includes net sale. Y0 is the negative equity check.',
      'Report levered IRR (=IRR over the series) and equity multiple (sum Y1-Y5 ÷ equity in).',
    ],
  },
  estimatedMinutes: 25,
  difficulty: 'advanced',
  layout: { rows: 48, cols: 7, cells },
  outputs: [
    {
      ref: 'B26',
      label: 'Year-1 NOI',
      format: 'usd',
      expected: NOI_Y1,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Y1 NOI = EGI − OpEx. EGI = GPR − Vacancy + Other income. A common slip is forgetting Other income, or treating Vacancy as a percentage rather than a dollar deduction.',
    },
    {
      ref: 'F26',
      label: 'Year-5 NOI',
      format: 'usd',
      expected: NOI_Y5,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Each line trends at its own rate — rent at 4%, other income at 2%, opex at 3%. Apply growth from the prior year, not from year 1, so each cell chains from the column to its left.',
    },
    {
      ref: 'B32',
      label: 'Loan amount (DSCR-sized)',
      format: 'usd',
      expected: LOAN_AMOUNT,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Loan amount = (Y1 NOI ÷ DSCR) ÷ loan constant. The loan constant converts a loan to its annual debt service.',
    },
    {
      ref: 'B46',
      label: 'Levered IRR',
      format: 'pct',
      expected: LEVERED_IRR,
      tolerance: { abs: 0.001 },
      whenWrongTry:
        '=IRR(B43:G43) — over the Y0 (negative equity) through Y5 (op CF + net sale) series. If the IRR is off by > 100 bps, your Y5 likely missed the net sale proceeds, or your Y0 sign is wrong.',
    },
    {
      ref: 'B47',
      label: 'Equity multiple',
      format: 'multiple',
      expected: EQUITY_MULTIPLE,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'EM = sum of Y1-Y5 levered CFs (including exit) ÷ equity invested. Equity invested = purchase − loan, NOT the absolute Y0 cash flow if you want a positive denominator.',
    },
  ],
  checkpoints: [
    {
      ref: 'B24',
      label: 'Year-1 EGI',
      format: 'usd',
      expected: EGI_Y1,
      tolerance: { rel: 0.005 },
      diagnostic:
        'Y1 EGI = GPR − Vacancy + Other income = $3,500,000 − $175,000 + $70,000 = $3,395,000. If this is wrong, every NOI in the roll is wrong, and every downstream return number is wrong.',
      explains: ['B26', 'F26', 'B46', 'B47'],
    },
    {
      ref: 'B33',
      label: 'Annual debt service',
      format: 'usd',
      expected: ANNUAL_DS,
      tolerance: { rel: 0.005 },
      diagnostic:
        'DS should equal the Max DS computed in B31 (it is the constraint that bound the loan size). If DS differs, you may have computed it independently (=loan × constant) and accumulated rounding — but pedagogically it should reconcile to NOI ÷ DSCR within tolerance.',
      explains: ['B46', 'B47'],
    },
    {
      ref: 'B39',
      label: 'Net sale proceeds',
      format: 'usd',
      expected: NET_SALE_PROCEEDS,
      tolerance: { rel: 0.005 },
      diagnostic:
        'Net sale = Exit value − Sale costs − Loan balance at EoY5. Loan balance is NOT loan − cumulative DS — those payments are mostly interest. Use the amortization formula: =B32*(1+B14)^5 + PMT(B14,B15,B32)*((1+B14)^5-1)/B14.',
      explains: ['B46', 'B47'],
    },
  ],
  rubric:
    "A multifamily pro-forma chains line-item growth (rent / opex / capex / other income each grow at their own rate) up the EGI → NOI ladder. DSCR-constrained debt sizing reverses the loan-constant identity: max loan = (NOI ÷ DSCR) ÷ loan constant. Capex reserve sits below the NOI line — it doesn't reduce NOI itself but does reduce levered cash flow to equity. Year-5 levered CF combines op CF and net sale proceeds; Y0 is a negative equity contribution. IRR and equity multiple are reported off this Y0-Y5 series. The frequent error is computing loan balance at exit as loan − (DS × 5), which double-counts the interest portion of every payment — use the amortization formula instead.",
};
