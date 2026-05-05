import type { ExcelTemplate } from '../types';

// 3-bucket budget with incurred-to-date column.
//
// A1 "Bucket"      B1 "Budget"   C1 "Incurred"   D1 "Remaining"
// A2 "Hard cost"   B2 40,000,000 C2 24,000,000   D2 = ? (target)
// A3 "Soft cost"   B3  7,500,000 C3  4,500,000   D3 (computed)
// A4 "Contingency" B4  2,000,000 C4    800,000   D4 (computed)
// A5 "TOTAL"       B5 49,500,000 C5 29,300,000   D5 (computed)
//
// Target D2: =B2-C2

const hardBudget = 40_000_000;
const hardIncurred = 24_000_000;
const softBudget = 7_500_000;
const softIncurred = 4_500_000;
const contBudget = 2_000_000;
const contIncurred = 800_000;
const totalBudget = hardBudget + softBudget + contBudget;
const totalIncurred = hardIncurred + softIncurred + contIncurred;
const hardRemaining = hardBudget - hardIncurred;
const softRemaining = softBudget - softIncurred;
const contRemaining = contBudget - contIncurred;
const totalRemaining = totalBudget - totalIncurred;

export const costToCompleteExcel: ExcelTemplate = {
  id: 'cost-to-complete',
  title: 'Cost-to-complete by bucket',
  category: 'arithmetic',
  difficulty: 'beginner',
  roles: ['development', 'mortgageUw'],
  scenario:
    'Mid-project status: hard cost $40M / soft $7.5M / contingency $2M, with cumulative incurred dollars by bucket. Compute the cost-to-complete for the hard-cost bucket.',
  instruction:
    'In D2, compute hard-cost remaining as Budget − Incurred. Reference B2 and C2.',
  targetCell: 'D2',
  expected: hardRemaining,
  tolerancePct: 0.001,
  exampleFormula: '=B2-C2',
  layout: {
    rows: 5,
    cols: 4,
    cells: [
      { address: 'A1', role: 'header', text: 'Bucket' },
      { address: 'B1', role: 'header', text: 'Budget' },
      { address: 'C1', role: 'header', text: 'Incurred' },
      { address: 'D1', role: 'header', text: 'Remaining' },

      { address: 'A2', role: 'header', text: 'Hard cost' },
      { address: 'B2', role: 'assumption', value: hardBudget, format: 'usd' },
      { address: 'C2', role: 'assumption', value: hardIncurred, format: 'usd' },
      { address: 'D2', role: 'target', format: 'usd' },

      { address: 'A3', role: 'header', text: 'Soft cost' },
      { address: 'B3', role: 'assumption', value: softBudget, format: 'usd' },
      { address: 'C3', role: 'assumption', value: softIncurred, format: 'usd' },
      { address: 'D3', role: 'computed', computed: softRemaining, format: 'usd' },

      { address: 'A4', role: 'header', text: 'Contingency' },
      { address: 'B4', role: 'assumption', value: contBudget, format: 'usd' },
      { address: 'C4', role: 'assumption', value: contIncurred, format: 'usd' },
      { address: 'D4', role: 'computed', computed: contRemaining, format: 'usd' },

      { address: 'A5', role: 'header', text: 'TOTAL' },
      { address: 'B5', role: 'computed', computed: totalBudget, format: 'usd' },
      { address: 'C5', role: 'computed', computed: totalIncurred, format: 'usd' },
      { address: 'D5', role: 'computed', computed: totalRemaining, format: 'usd' },
    ],
  },
  takeaway:
    'Cost-to-complete is the simplest possible "draw worksheet" — Budget − Incurred for each bucket. Hard-cost is the bucket lenders watch most closely; contingency drawdown is the early-warning signal that the project will need additional capital. Track all three buckets in parallel — hard-cost overrun pulls from contingency until contingency is empty, then sponsor + LP fund per the LPA cost-overrun tier.',
  solution: `Hard-cost remaining = $${hardBudget.toLocaleString()} − $${hardIncurred.toLocaleString()} = $${hardRemaining.toLocaleString()}.`,
};
