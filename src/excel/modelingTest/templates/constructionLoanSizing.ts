import type { ModelingTestTemplate } from '../../../types/modelingTest';
import type { SheetCell } from '../../types';

const LAND = 8_000_000;
const HARD = 42_000_000;
const SOFT_PCT = 0.10;
const CONTINGENCY_PCT = 0.05;
const STABILIZED_NOI = 4_000_000;
const MARKET_CAP = 0.0525;
const LTC_LIMIT = 0.65;
const LTV_LIMIT = 0.60;

const SOFT = HARD * SOFT_PCT;
const CONTINGENCY = (HARD + SOFT) * CONTINGENCY_PCT;
const TPC = LAND + HARD + SOFT + CONTINGENCY;
const STABILIZED_VALUE = STABILIZED_NOI / MARKET_CAP;
const YIELD_ON_COST = STABILIZED_NOI / TPC;
const LOAN_LTC = TPC * LTC_LIMIT;
const LOAN_LTV = STABILIZED_VALUE * LTV_LIMIT;
const FINAL_LOAN = Math.min(LOAN_LTC, LOAN_LTV);
const EQUITY_CHECK = TPC - FINAL_LOAN;
const PROFIT_ON_COST = (STABILIZED_VALUE - TPC) / TPC;

const cells: SheetCell[] = [
  { address: 'A1', role: 'header', text: 'Assumptions' },
  { address: 'A2', role: 'header', text: 'Land cost' },
  { address: 'B2', role: 'assumption', value: LAND, format: 'usd' },
  { address: 'A3', role: 'header', text: 'Hard costs' },
  { address: 'B3', role: 'assumption', value: HARD, format: 'usd' },
  { address: 'A4', role: 'header', text: 'Soft costs (% of hard)' },
  { address: 'B4', role: 'assumption', value: SOFT_PCT, format: 'pct' },
  { address: 'A5', role: 'header', text: 'Contingency (% of hard + soft)' },
  { address: 'B5', role: 'assumption', value: CONTINGENCY_PCT, format: 'pct' },
  { address: 'A6', role: 'header', text: 'Stabilized NOI (Y3+)' },
  { address: 'B6', role: 'assumption', value: STABILIZED_NOI, format: 'usd' },
  { address: 'A7', role: 'header', text: 'Market exit cap' },
  { address: 'B7', role: 'assumption', value: MARKET_CAP, format: 'pct' },
  { address: 'A8', role: 'header', text: 'Construction LTC limit' },
  { address: 'B8', role: 'assumption', value: LTC_LIMIT, format: 'pct' },
  { address: 'A9', role: 'header', text: 'Construction LTV limit' },
  { address: 'B9', role: 'assumption', value: LTV_LIMIT, format: 'pct' },

  { address: 'A11', role: 'header', text: 'Project budget' },
  { address: 'A12', role: 'header', text: 'Soft costs $' },
  { address: 'B12', role: 'target', label: 'Soft costs $', format: 'usd' },
  { address: 'A13', role: 'header', text: 'Contingency $' },
  { address: 'B13', role: 'target', label: 'Contingency $', format: 'usd' },
  { address: 'A14', role: 'header', text: 'Total Project Cost (TPC)' },
  { address: 'B14', role: 'target', label: 'Total Project Cost', format: 'usd' },

  { address: 'A16', role: 'header', text: 'Stabilized economics' },
  { address: 'A17', role: 'header', text: 'Stabilized value (NOI ÷ market cap)' },
  { address: 'B17', role: 'target', label: 'Stabilized value', format: 'usd' },
  { address: 'A18', role: 'header', text: 'Yield on cost (NOI ÷ TPC)' },
  { address: 'B18', role: 'target', label: 'Yield on cost', format: 'pct' },

  { address: 'A20', role: 'header', text: 'Construction loan sizing' },
  { address: 'A21', role: 'header', text: 'Loan from LTC (TPC × LTC %)' },
  { address: 'B21', role: 'target', label: 'Loan from LTC', format: 'usd' },
  { address: 'A22', role: 'header', text: 'Loan from LTV (Stab. value × LTV %)' },
  { address: 'B22', role: 'target', label: 'Loan from LTV', format: 'usd' },
  { address: 'A23', role: 'header', text: 'Final construction loan (binding = MIN)' },
  { address: 'B23', role: 'target', label: 'Final construction loan', format: 'usd' },

  { address: 'A25', role: 'header', text: 'Equity + profit' },
  { address: 'A26', role: 'header', text: 'Equity check (TPC − loan)' },
  { address: 'B26', role: 'target', label: 'Equity check', format: 'usd' },
  { address: 'A27', role: 'header', text: 'Profit on cost (($ profit) ÷ TPC)' },
  { address: 'B27', role: 'target', label: 'Profit on cost', format: 'pct' },
];

export const constructionLoanSizing: ModelingTestTemplate = {
  id: 'construction-loan-sizing-midrise',
  title: 'Construction Loan Sizing — Mid-Rise Development',
  scenario:
    'Ground-up mid-rise multifamily development. Build the project budget, size the construction loan under both LTC and LTV constraints, and report yield on cost, equity check, and profit on cost.',
  brief: {
    paragraphs: [
      'Suburban Sun Belt site, 200 units. Land $8M already controlled, hard costs $42M from a vetted GC bid. Soft costs run 10% of hard (architecture, permits, marketing). Contingency is sized at 5% of (hard + soft) — never just hard alone, since soft costs can blow out too.',
      'Stabilized NOI underwriting: $4M (Y3+). Market exit cap: 5.25%. Lender quotes 65% LTC and 60% LTV; the binding constraint is the lower of the two max-loans. Construction interest reserve and operating deficit reserve are out of scope for this template (assume already in soft costs).',
    ],
    bullets: [
      'Build the project budget: soft = hard × soft %; contingency = (hard + soft) × contingency %; TPC = land + hard + soft + contingency.',
      'Stabilized value = NOI ÷ market cap. Yield on cost = NOI ÷ TPC — measures unlevered return on dollars-in.',
      'Construction loan sizing: compute max loan under each constraint (LTC × TPC, LTV × stabilized value); take the MIN. In a typical tight-LTC environment, LTC binds.',
      'Equity check = TPC − loan. Profit on cost = (stabilized value − TPC) ÷ TPC — your unlevered margin.',
    ],
  },
  estimatedMinutes: 18,
  difficulty: 'intermediate',
  layout: { rows: 28, cols: 3, cells },
  outputs: [
    {
      ref: 'B14',
      label: 'Total Project Cost',
      format: 'usd',
      expected: TPC,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        'TPC = Land + Hard + Soft + Contingency. Soft = Hard × soft %. Contingency = (Hard + Soft) × contingency %. A common slip is computing contingency on hard costs alone — that under-budgets the project.',
    },
    {
      ref: 'B18',
      label: 'Yield on cost',
      format: 'pct',
      expected: YIELD_ON_COST,
      tolerance: { abs: 0.0005 },
      whenWrongTry:
        '=B6/B14 — stabilized NOI ÷ TPC. Tells you the unlevered yield you build the project to. Compare to market cap to gauge development spread (the margin for taking dev risk).',
    },
    {
      ref: 'B23',
      label: 'Final construction loan',
      format: 'usd',
      expected: FINAL_LOAN,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        '=MIN(B21:B22) — the lower of the two constraint-bound loans. With 65% LTC and 60% LTV in this rate / cost environment, LTC usually binds first.',
    },
    {
      ref: 'B26',
      label: 'Equity check',
      format: 'usd',
      expected: EQUITY_CHECK,
      tolerance: { rel: 0.005 },
      whenWrongTry: '=B14-B23 — TPC minus the binding construction loan.',
    },
    {
      ref: 'B27',
      label: 'Profit on cost',
      format: 'pct',
      expected: PROFIT_ON_COST,
      tolerance: { abs: 0.001 },
      whenWrongTry:
        '=(B17-B14)/B14 — unlevered profit divided by cost. ~30%+ is healthy for a mid-rise dev; below ~20% you start questioning whether the development premium compensates for the risk.',
    },
  ],
  checkpoints: [
    {
      ref: 'B13',
      label: 'Contingency $',
      format: 'usd',
      expected: CONTINGENCY,
      tolerance: { rel: 0.005 },
      diagnostic:
        'Contingency = (Hard + Soft) × contingency % = (42M + 4.2M) × 5% = 2.31M. If you computed it as hard × 5% = 2.1M, every downstream number shifts.',
      explains: ['B14', 'B18', 'B23', 'B26', 'B27'],
    },
    {
      ref: 'B17',
      label: 'Stabilized value',
      format: 'usd',
      expected: STABILIZED_VALUE,
      tolerance: { rel: 0.005 },
      diagnostic:
        'Stabilized value = =B6/B7 — NOI divided by market cap. Drives the LTV constraint, profit on cost, and the development-spread analysis.',
      explains: ['B22', 'B23', 'B27'],
    },
    {
      ref: 'B22',
      label: 'Loan from LTV',
      format: 'usd',
      expected: LOAN_LTV,
      tolerance: { rel: 0.005 },
      diagnostic:
        'Loan from LTV = stabilized value × LTV %. If you sized only off LTC and skipped this constraint, you would never know which actually binds — important when LTV is tighter (e.g., low-cap markets pushing LTV below LTC).',
      explains: ['B23'],
    },
  ],
  rubric:
    "A construction loan sits inside two constraints simultaneously: a percentage of cost (LTC) and a percentage of as-stabilized value (LTV). The binding constraint is the lower max-loan, and which one binds depends on the relationship between yield on cost and market cap — when YoC is tight against the cap rate (low development spread), LTV may bind because stabilized value isn't much above cost. In healthier dev markets (this template's scenario), LTC tends to bind. The TPC build-up itself trips up candidates who layer contingency on hard costs only — proper convention layers contingency on (hard + soft), since soft costs can run over too. Yield on cost vs market cap is the back-of-envelope test: a 150-200 bps spread is typical, anything below 100 bps starts to look thin once you add the carrying-cost risk of construction.",
};
