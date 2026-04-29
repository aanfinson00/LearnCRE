import type { ExcelTemplate } from '../types';

// A1: "Exit NOI"           B1: 950,000
// A2: "Exit cap"           B2: 0.06
// A3: "Sale costs %"       B3: 0.015
// A4: "Net reversion"      B4: ?
//
// Gross reversion = NOI / cap = 950,000 / 0.06 = 15,833,333
// Net = gross * (1 - sale costs) = 15,833,333 * 0.985 ≈ 15,595,833

const exitNoi = 950_000;
const exitCap = 0.06;
const saleCosts = 0.015;
const expected = (exitNoi / exitCap) * (1 - saleCosts);

export const reversionValueTemplate: ExcelTemplate = {
  id: 'reversion-value',
  title: 'Reversion value net of sale costs',
  category: 'arithmetic',
  difficulty: 'beginner',
  roles: ['acquisitions'],
  scenario:
    'You\'re modeling exit value at year 5. Stabilized NOI is $950k, you\'re using a 6.0% exit cap, and you assume 1.5% sale costs (broker commission + closing).',
  instruction:
    'In B4, compute the net reversion proceeds: NOI / cap, then reduced by the sale-cost percentage.',
  targetCell: 'B4',
  expected,
  tolerancePct: 0.005,
  exampleFormula: '=B1/B2*(1-B3)',
  layout: {
    rows: 4,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'Exit NOI' },
      { address: 'B1', role: 'assumption', value: exitNoi, format: 'usd' },
      { address: 'A2', role: 'header', text: 'Exit cap' },
      { address: 'B2', role: 'assumption', value: exitCap, format: 'pct' },
      { address: 'A3', role: 'header', text: 'Sale costs %' },
      { address: 'B3', role: 'assumption', value: saleCosts, format: 'pct' },
      { address: 'A4', role: 'header', text: 'Net reversion' },
      { address: 'B4', role: 'target', format: 'usd' },
    ],
  },
  takeaway:
    'Reversion = exit NOI / exit cap, less sale costs. Sale costs (1–2.5%) are the most-frequently-omitted line in junior models. They reduce equity proceeds dollar-for-dollar at exit and meaningfully impact levered IRR — never skip them.',
  solution: `=B1/B2*(1-B3) = $950,000 / 0.06 × (1 − 0.015) = $15,833,333 × 0.985 ≈ $${Math.round(expected).toLocaleString()}.`,
};
