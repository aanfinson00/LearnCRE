import type { ModelingTestTemplate } from '../../../types/modelingTest';
import type { SheetCell } from '../../types';

const PURCHASE = 40_000_000;
const EQUITY_Y0 = 14_000_000;
const ORIG_LOAN = 26_000_000;
const ORIG_RATE = 0.06;
const ORIG_AMORT = 30;
const NOI_Y1 = 2_500_000;
const NOI_GROWTH_Y15 = 0.04;
const NOI_GROWTH_Y610 = 0.03;
const Y5_CAP = 0.055;
const Y5_SALE_COSTS_PCT = 0.02;
const REFI_LTV = 0.65;
const REFI_RATE = 0.065;
const REFI_AMORT = 30;
const REFI_CLOSING_PCT = 0.01;
const Y10_CAP = 0.06;
const Y10_SALE_COSTS_PCT = 0.02;

// --- canonical answer key ---
const noi = (t: number) => NOI_Y1 * Math.pow(1 + NOI_GROWTH_Y15, t - 1);
const NOI_Y5 = noi(5);
const ORIG_CONSTANT = ORIG_RATE / (1 - Math.pow(1 + ORIG_RATE, -ORIG_AMORT));
const ORIG_DS = ORIG_LOAN * ORIG_CONSTANT;

const Y5_VALUE = NOI_Y5 / Y5_CAP;
const Y5_SALE_COSTS = Y5_VALUE * Y5_SALE_COSTS_PCT;
const POW5_ORIG = Math.pow(1 + ORIG_RATE, 5);
const ORIG_LOAN_BALANCE_Y5 =
  ORIG_LOAN * POW5_ORIG - ORIG_DS * (POW5_ORIG - 1) / ORIG_RATE;
const PATH_A_NET_SALE = Y5_VALUE - Y5_SALE_COSTS - ORIG_LOAN_BALANCE_Y5;

const NEW_LOAN = Y5_VALUE * REFI_LTV;
const REFI_CLOSING = NEW_LOAN * REFI_CLOSING_PCT;
const REFI_CASH_OUT = NEW_LOAN - ORIG_LOAN_BALANCE_Y5 - REFI_CLOSING;
const NEW_CONSTANT = REFI_RATE / (1 - Math.pow(1 + REFI_RATE, -REFI_AMORT));
const NEW_DS = NEW_LOAN * NEW_CONSTANT;

const NOI_Y6 = NOI_Y5 * (1 + NOI_GROWTH_Y610);
const NOI_Y7 = NOI_Y6 * (1 + NOI_GROWTH_Y610);
const NOI_Y8 = NOI_Y7 * (1 + NOI_GROWTH_Y610);
const NOI_Y9 = NOI_Y8 * (1 + NOI_GROWTH_Y610);
const NOI_Y10 = NOI_Y9 * (1 + NOI_GROWTH_Y610);

const Y10_VALUE = NOI_Y10 / Y10_CAP;
const Y10_SALE_COSTS = Y10_VALUE * Y10_SALE_COSTS_PCT;
const POW5_NEW = Math.pow(1 + REFI_RATE, 5);
const NEW_LOAN_BALANCE_Y10 =
  NEW_LOAN * POW5_NEW - NEW_DS * (POW5_NEW - 1) / REFI_RATE;
const PATH_B_Y10_NET_SALE = Y10_VALUE - Y10_SALE_COSTS - NEW_LOAN_BALANCE_Y10;

const incrementalCF = [
  REFI_CASH_OUT - PATH_A_NET_SALE,
  NOI_Y6 - NEW_DS,
  NOI_Y7 - NEW_DS,
  NOI_Y8 - NEW_DS,
  NOI_Y9 - NEW_DS,
  NOI_Y10 - NEW_DS + PATH_B_Y10_NET_SALE,
];

function bisectionIrr(cf: number[]): number {
  const f = (r: number): number =>
    cf.reduce((a, c, t) => a + c / Math.pow(1 + r, t), 0);
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
const MARGINAL_IRR = bisectionIrr(incrementalCF);

const Y15_LEVERED_SUM = [1, 2, 3, 4, 5].reduce(
  (a, t) => a + (noi(t) - ORIG_DS),
  0,
);
const Y610_LEVERED_SUM =
  (NOI_Y6 - NEW_DS) +
  (NOI_Y7 - NEW_DS) +
  (NOI_Y8 - NEW_DS) +
  (NOI_Y9 - NEW_DS) +
  (NOI_Y10 - NEW_DS);
const PATH_B_EM =
  (Y15_LEVERED_SUM + REFI_CASH_OUT + Y610_LEVERED_SUM + PATH_B_Y10_NET_SALE) /
  EQUITY_Y0;

const cells: SheetCell[] = [
  { address: 'A1', role: 'header', text: 'Assumptions' },
  { address: 'A2', role: 'header', text: 'Purchase price (Y0)' },
  { address: 'B2', role: 'assumption', value: PURCHASE, format: 'usd' },
  { address: 'A3', role: 'header', text: 'Equity (Y0)' },
  { address: 'B3', role: 'assumption', value: EQUITY_Y0, format: 'usd' },
  { address: 'A4', role: 'header', text: 'Original loan (Y0)' },
  { address: 'B4', role: 'assumption', value: ORIG_LOAN, format: 'usd' },
  { address: 'A5', role: 'header', text: 'Original loan rate' },
  { address: 'B5', role: 'assumption', value: ORIG_RATE, format: 'pct' },
  { address: 'A6', role: 'header', text: 'Original loan amort' },
  { address: 'B6', role: 'assumption', value: ORIG_AMORT, format: 'number' },
  { address: 'A7', role: 'header', text: 'Year-1 NOI' },
  { address: 'B7', role: 'assumption', value: NOI_Y1, format: 'usd' },
  { address: 'A8', role: 'header', text: 'NOI growth Y1-Y5' },
  { address: 'B8', role: 'assumption', value: NOI_GROWTH_Y15, format: 'pct' },
  { address: 'A9', role: 'header', text: 'NOI growth Y6-Y10' },
  { address: 'B9', role: 'assumption', value: NOI_GROWTH_Y610, format: 'pct' },
  { address: 'A10', role: 'header', text: 'Y5 market cap' },
  { address: 'B10', role: 'assumption', value: Y5_CAP, format: 'pct' },
  { address: 'A11', role: 'header', text: 'Y5 sale costs %' },
  { address: 'B11', role: 'assumption', value: Y5_SALE_COSTS_PCT, format: 'pct' },
  { address: 'A12', role: 'header', text: 'Refi LTV' },
  { address: 'B12', role: 'assumption', value: REFI_LTV, format: 'pct' },
  { address: 'A13', role: 'header', text: 'Refi rate' },
  { address: 'B13', role: 'assumption', value: REFI_RATE, format: 'pct' },
  { address: 'A14', role: 'header', text: 'Refi amort' },
  { address: 'B14', role: 'assumption', value: REFI_AMORT, format: 'number' },
  { address: 'A15', role: 'header', text: 'Refi closing costs %' },
  { address: 'B15', role: 'assumption', value: REFI_CLOSING_PCT, format: 'pct' },
  { address: 'A16', role: 'header', text: 'Y10 exit cap' },
  { address: 'B16', role: 'assumption', value: Y10_CAP, format: 'pct' },
  { address: 'A17', role: 'header', text: 'Y10 sale costs %' },
  { address: 'B17', role: 'assumption', value: Y10_SALE_COSTS_PCT, format: 'pct' },

  { address: 'A19', role: 'header', text: 'Y1-Y5 operations (both paths)' },
  { address: 'A20', role: 'header', text: 'Year' },
  { address: 'B20', role: 'header', text: '1' },
  { address: 'C20', role: 'header', text: '2' },
  { address: 'D20', role: 'header', text: '3' },
  { address: 'E20', role: 'header', text: '4' },
  { address: 'F20', role: 'header', text: '5' },

  { address: 'A21', role: 'header', text: 'NOI' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}21`,
    role: 'target',
    label: `NOI Y${i + 1}`,
    format: 'usd',
  })),
  { address: 'A22', role: 'header', text: 'Original DS' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}22`,
    role: 'target',
    label: `DS Y${i + 1}`,
    format: 'usd',
  })),
  { address: 'A23', role: 'header', text: 'Levered CF' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}23`,
    role: 'target',
    label: `Levered CF Y${i + 1}`,
    format: 'usd',
  })),

  { address: 'A25', role: 'header', text: 'At Y5 — market value + old loan' },
  { address: 'A26', role: 'header', text: 'Y5 market value' },
  { address: 'B26', role: 'target', label: 'Y5 market value', format: 'usd' },
  { address: 'A27', role: 'header', text: 'Y5 sale costs $' },
  { address: 'B27', role: 'target', label: 'Y5 sale costs $', format: 'usd' },
  { address: 'A28', role: 'header', text: 'Old loan balance EoY5' },
  { address: 'B28', role: 'target', label: 'Old loan balance EoY5', format: 'usd' },

  { address: 'A30', role: 'header', text: 'Path A — Sell at Y5' },
  { address: 'A31', role: 'header', text: 'Path A net sale proceeds' },
  { address: 'B31', role: 'target', label: 'Path A net sale proceeds', format: 'usd' },

  { address: 'A33', role: 'header', text: 'Path B — Refi at Y5' },
  { address: 'A34', role: 'header', text: 'New loan amount (LTV)' },
  { address: 'B34', role: 'target', label: 'New loan amount', format: 'usd' },
  { address: 'A35', role: 'header', text: 'Refi closing costs $' },
  { address: 'B35', role: 'target', label: 'Refi closing costs $', format: 'usd' },
  { address: 'A36', role: 'header', text: 'Refi cash-out at Y5' },
  { address: 'B36', role: 'target', label: 'Refi cash-out at Y5', format: 'usd' },

  { address: 'A38', role: 'header', text: 'Y6-Y10 operations (Path B only)' },
  { address: 'A39', role: 'header', text: 'Year' },
  { address: 'B39', role: 'header', text: '6' },
  { address: 'C39', role: 'header', text: '7' },
  { address: 'D39', role: 'header', text: '8' },
  { address: 'E39', role: 'header', text: '9' },
  { address: 'F39', role: 'header', text: '10' },

  { address: 'A40', role: 'header', text: 'NOI' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}40`,
    role: 'target',
    label: `NOI Y${i + 6}`,
    format: 'usd',
  })),
  { address: 'A41', role: 'header', text: 'New DS (constant)' },
  { address: 'B41', role: 'target', label: 'New annual DS', format: 'usd' },
  { address: 'A42', role: 'header', text: 'Levered CF' },
  ...['B', 'C', 'D', 'E', 'F'].map<SheetCell>((c, i) => ({
    address: `${c}42`,
    role: 'target',
    label: `Levered CF Y${i + 6}`,
    format: 'usd',
  })),

  { address: 'A44', role: 'header', text: 'At Y10 — exit (Path B)' },
  { address: 'A45', role: 'header', text: 'Y10 market value' },
  { address: 'B45', role: 'target', label: 'Y10 market value', format: 'usd' },
  { address: 'A46', role: 'header', text: 'Y10 sale costs $' },
  { address: 'B46', role: 'target', label: 'Y10 sale costs $', format: 'usd' },
  { address: 'A47', role: 'header', text: 'New loan balance EoY10' },
  { address: 'B47', role: 'target', label: 'New loan balance EoY10', format: 'usd' },
  { address: 'A48', role: 'header', text: 'Y10 net sale proceeds' },
  { address: 'B48', role: 'target', label: 'Y10 net sale proceeds', format: 'usd' },

  { address: 'A50', role: 'header', text: 'Incremental CF (continue-to-hold from Y5)' },
  { address: 'A51', role: 'header', text: 'Years from Y5' },
  { address: 'B51', role: 'header', text: '0' },
  { address: 'C51', role: 'header', text: '1' },
  { address: 'D51', role: 'header', text: '2' },
  { address: 'E51', role: 'header', text: '3' },
  { address: 'F51', role: 'header', text: '4' },
  { address: 'G51', role: 'header', text: '5' },
  { address: 'A52', role: 'header', text: 'Path B − Path A' },
  { address: 'B52', role: 'target', label: 'Y5 incremental (B − A)', format: 'usd' },
  { address: 'C52', role: 'target', label: 'Y6 incremental', format: 'usd' },
  { address: 'D52', role: 'target', label: 'Y7 incremental', format: 'usd' },
  { address: 'E52', role: 'target', label: 'Y8 incremental', format: 'usd' },
  { address: 'F52', role: 'target', label: 'Y9 incremental', format: 'usd' },
  { address: 'G52', role: 'target', label: 'Y10 incremental', format: 'usd' },

  { address: 'A54', role: 'header', text: 'Returns' },
  { address: 'A55', role: 'header', text: 'Path B equity multiple (Y0-Y10)' },
  { address: 'B55', role: 'target', label: 'Path B equity multiple', format: 'multiple' },
  { address: 'A56', role: 'header', text: 'Marginal IRR (incremental)' },
  { address: 'B56', role: 'target', label: 'Marginal IRR', format: 'pct' },
];

export const refiVsSellY5: ModelingTestTemplate = {
  id: 'refi-vs-sell-y5',
  title: 'Refi vs Sell — Year 5 Decision',
  scenario:
    'A $40M acquisition at Y5: cap rates have compressed to 5.5%. Sponsor faces the classic refi-vs-sell choice. Build both paths, compute the marginal IRR on the incremental investment, and decide.',
  brief: {
    paragraphs: [
      'Subject is a stabilized asset bought 5 years ago at $40M with $14M equity / $26M senior debt (65% LTV, 6.0% / 30-year fixed). NOI grew 4% per year through hold.',
      "Year 5: market cap is 5.5%. Sponsor can sell now and exit, or refinance at 65% LTV / 6.5% / 30-year (50 bps higher than original) and hold for 5 more years. Refi closing costs run 1% of the new loan. Y6-Y10 NOI growth slows to 3% per year. Y10 exit at a 6.0% cap (50 bps wider than current market for conservatism), 2% sale costs in both periods.",
    ],
    bullets: [
      'Build the Y1-Y5 operating roll (NOI / DS / levered CF) — common to both paths.',
      'Compute Y5 market value, sale costs, and old loan balance — feeds both paths.',
      'Path A: net sale proceeds = Y5 value − sale costs − old loan balance.',
      'Path B refi: new loan = Y5 value × refi LTV; cash-out = new loan − old loan payoff − refi closing costs.',
      'Path B Y6-Y10: build NOI roll, new DS (constant), levered CF, then exit at Y10.',
      'Marginal IRR runs over the incremental cash flow series from Y5: at t=0 you give up (Sell − Refi cash-out); at t=1-5 you receive Path B Y6-Y10 levered CF (Path A is already exited so its CF is zero); t=5 also includes Path B Y10 net sale.',
      'Decision rule: marginal IRR > opportunity cost of capital → refi; below → sell.',
    ],
  },
  estimatedMinutes: 30,
  difficulty: 'advanced',
  layout: { rows: 57, cols: 7, cells },
  outputs: [
    {
      ref: 'B31',
      label: 'Path A net sale proceeds (Y5)',
      format: 'usd',
      expected: PATH_A_NET_SALE,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Y5 value − Y5 sale costs − old loan balance EoY5. The old loan balance is NOT loan − cumulative DS — use the amortization formula on the original $26M loan over 5 years.',
    },
    {
      ref: 'B36',
      label: 'Refi cash-out at Y5',
      format: 'usd',
      expected: REFI_CASH_OUT,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Refi cash-out = New loan − Old loan payoff − Refi closing costs. New loan = Y5 value × refi LTV; old loan payoff = the EoY5 balance from the original loan.',
    },
    {
      ref: 'B48',
      label: 'Path B Y10 net sale proceeds',
      format: 'usd',
      expected: PATH_B_Y10_NET_SALE,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'Y10 value − Y10 sale costs − new loan balance EoY10. The new loan balance amortizes for 5 years from refi, not 10. Use =B34*(1+B13)^5+PMT(B13,B14,B34)*((1+B13)^5-1)/B13.',
    },
    {
      ref: 'B55',
      label: 'Path B equity multiple (Y0-Y10)',
      format: 'multiple',
      expected: PATH_B_EM,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        "EM = (sum Y1-Y5 op CF + refi cash-out + sum Y6-Y10 op CF + Y10 net sale) ÷ Y0 equity. Don't forget the refi cash-out is a Y5 distribution to equity in addition to the Y5 op CF.",
    },
    {
      ref: 'B56',
      label: 'Marginal IRR (continue-to-hold)',
      format: 'pct',
      expected: MARGINAL_IRR,
      tolerance: { abs: 0.001 },
      whenWrongTry:
        '=IRR(B52:G52). The Y5 incremental (B52) is Refi cash-out − Path A net sale (negative — you give up money to keep holding). Y6-Y9 are just Path B levered CF (Path A is exited). Y10 is Path B Y10 levered CF + Y10 net sale.',
    },
  ],
  checkpoints: [
    {
      ref: 'B28',
      label: 'Old loan balance EoY5',
      format: 'usd',
      expected: ORIG_LOAN_BALANCE_Y5,
      tolerance: { rel: 0.005 },
      diagnostic:
        'Old loan balance at Y5 = =B4*(1+B5)^5+PMT(B5,B6,B4)*((1+B5)^5-1)/B5. This number feeds BOTH Path A (subtracted from Y5 value) and Path B (paid off at refi). If wrong, every downstream proceeds + IRR number is wrong.',
      explains: ['B31', 'B36', 'B55', 'B56'],
    },
    {
      ref: 'B41',
      label: 'New annual DS',
      format: 'usd',
      expected: NEW_DS,
      tolerance: { rel: 0.005 },
      diagnostic:
        '=-PMT(B13,B14,B34) — new DS uses the refi rate, refi amort, and new loan amount. It stays constant Y6-Y10. Wrong DS distorts every Y6-Y10 levered CF and the marginal IRR.',
      explains: ['B55', 'B56'],
    },
    {
      ref: 'F40',
      label: 'Year-10 NOI',
      format: 'usd',
      expected: NOI_Y10,
      tolerance: { rel: 0.005 },
      diagnostic:
        'Y10 NOI = Y5 NOI compounded 5 years at the Y6-Y10 growth rate (3%, NOT 4%). A common slip is continuing the Y1-Y5 growth rate into Y6-Y10.',
      explains: ['B48', 'B55', 'B56'],
    },
  ],
  rubric:
    "Refi-vs-sell hinges on the marginal IRR of the incremental investment. At Y5 you can take Path A's net proceeds and walk, OR you can take Path B's smaller refi cash-out (smaller because old loan must be paid off and refi closing costs eat margin) AND keep the asset for Y6-Y10 levered CF + Y10 exit. The forgone amount today is (Sell proceeds − Refi cash-out); the future flows you get for it have an IRR — that's the marginal IRR. If it beats your cost of capital (typically 8-10% for stabilized real estate), refi; if not, sell. The classic pitfall is comparing the two paths' total IRRs directly — they're over different horizons and not apples-to-apples. Marginal IRR is the apples-to-apples comparison.",
};
