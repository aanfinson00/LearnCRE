import type { ExcelTemplate, SheetCell } from '../types';

// Simplified 6-month draw schedule. Computes cumulative lender-funded
// dollars at month-6 on equity-first basis.
//
// Equity committed: $20M. Lender committed: $30M. Equity-first.
//
// Layout (rows of months):
//   A2 "Month"  B2 "Total Draw"  C2 "Cumulative Draw"  D2 "From Equity (cum)"  E2 "From Lender (cum)"
//   Months 1-6 with a target on E7 (cumulative lender draw at month-6).
//
// Goal: target E7 = max(0, cumulative draw at month 6 − equity committed)

const equityCommitted = 20_000_000;
const monthDraws = [4_000_000, 5_000_000, 5_000_000, 5_000_000, 6_000_000, 5_000_000];
const cumulative = monthDraws.reduce<number[]>((acc, d) => {
  acc.push((acc[acc.length - 1] ?? 0) + d);
  return acc;
}, []);
// Equity-first: equity = min(cumulative, equityCommitted); lender = max(0, cumulative − equityCommitted)
const equityCum = cumulative.map((c) => Math.min(c, equityCommitted));
const lenderCum = cumulative.map((c) => Math.max(0, c - equityCommitted));

const targetCell = 'E7';
const targetValue = lenderCum[5];

const rowOffset = 1; // headers in row 1

export const drawScheduleExcel: ExcelTemplate = {
  id: 'draw-schedule-12mo',
  title: 'Draw schedule — cumulative lender funding',
  category: 'aggregation',
  difficulty: 'intermediate',
  roles: ['development', 'mortgageUw'],
  scenario:
    'Project: $20M equity / $30M lender, equity-first basis. Draws over 6 months are listed below. Compute the cumulative lender-funded amount at the end of month 6.',
  instruction:
    'In E7, compute cumulative lender draw at month 6: max(0, cumulative draw − equity committed). Reference C7 (cumulative draw) and the equity-committed cell B9.',
  targetCell,
  expected: targetValue,
  tolerancePct: 0.005,
  exampleFormula: '=MAX(0,C7-B9)',
  layout: {
    rows: 9,
    cols: 5,
    cells: [
      { address: 'A1', role: 'header', text: 'Month' },
      { address: 'B1', role: 'header', text: 'Draw' },
      { address: 'C1', role: 'header', text: 'Cumulative Draw' },
      { address: 'D1', role: 'header', text: 'From Equity (cum)' },
      { address: 'E1', role: 'header', text: 'From Lender (cum)' },

      ...monthDraws.flatMap((d, i): SheetCell[] => {
        const row = i + 2;
        const isTarget = row === 7;
        return [
          { address: `A${row}`, role: 'header', text: `Month ${i + 1}` },
          { address: `B${row}`, role: 'assumption', value: d, format: 'usd' },
          {
            address: `C${row}`,
            role: 'computed',
            computed: cumulative[i],
            format: 'usd',
          },
          {
            address: `D${row}`,
            role: 'computed',
            computed: equityCum[i],
            format: 'usd',
          },
          isTarget
            ? { address: `E${row}`, role: 'target', format: 'usd' }
            : {
                address: `E${row}`,
                role: 'computed',
                computed: lenderCum[i],
                format: 'usd',
              },
        ];
      }),

      { address: 'A8', role: 'spacer' },
      { address: 'A9', role: 'header', text: 'Equity committed' },
      { address: 'B9', role: 'assumption', value: equityCommitted, format: 'usd' },
    ] satisfies SheetCell[],
  },
  takeaway:
    'On equity-first basis, the lender funds nothing until cumulative draws exceed sponsor\'s equity commitment. Once equity is exhausted, every additional dollar of cumulative draw flows from the lender. Tracking when equity is exhausted vs the project schedule tells you when sponsor cash flow shifts from contributor to recipient.',
  solution: `At month 6, cumulative draw = $${cumulative[5].toLocaleString()}. Equity exhausted at month-${equityCum.findIndex((c) => c >= equityCommitted) + 1 + rowOffset - 1}. Lender funded = $${cumulative[5].toLocaleString()} − $${equityCommitted.toLocaleString()} = $${targetValue.toLocaleString()}.`,
};
