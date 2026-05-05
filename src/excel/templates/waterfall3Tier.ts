import type { ExcelTemplate } from '../types';

// 3-tier American waterfall, single-bullet distribution at exit.
// Layout:
//   A1 LP capital              B1 20,000,000   (assumption)
//   A2 GP capital              B2  2,200,000   (assumption)
//   A3 Total cap               B3 22,200,000   (computed)
//   A4 Pref rate               B4 0.08         (assumption)
//   A5 Hold years              B5 5            (assumption)
//   A6 Total distribution      B6 40,000,000   (assumption)
//   A7 Catch-up GP target      B7 0.20         (assumption)
//   A8 LP/GP above split (LP)  B8 0.80         (assumption)
//
//   A10 Pref due (LP)          B10 9,386,560   (computed)  =B1*((1+B4)^B5-1)
//   A11 After pref             B11 30,613,440  (computed)  =B6-B10
//   A12 ROC pool               B12 22,200,000  (computed)  =B3
//   A13 After ROC              B13 8,413,440   (computed)  =B11-B12
//   A14 GP catch-up            B14 2,346,640   (computed)  =B10*B7/(1-B7)
//   A15 Above-split residual   B15 6,066,800   (computed)  =B13-B14
//   A16 LP from above split    B16 4,853,440   (computed)  =B15*B8
//   A17 GP from above split    B17 1,213,360   (computed)  =B15*(1-B8)
//   A18 LP TOTAL               B18 ?           (target)
//
// LP TOTAL = pref + LP capital + LP from above split
//          = B10 + B1 + B16

const lpCapital = 20_000_000;
const gpCapital = 2_200_000;
const totalCap = lpCapital + gpCapital;
const prefRate = 0.08;
const holdYears = 5;
const totalDist = 40_000_000;
const catchUpTarget = 0.20;
const lpAboveSplit = 0.80;

const prefDue = lpCapital * (Math.pow(1 + prefRate, holdYears) - 1);
const afterPref = totalDist - prefDue;
const afterRoc = afterPref - totalCap;
const catchUp = (prefDue * catchUpTarget) / (1 - catchUpTarget);
const aboveResidual = afterRoc - catchUp;
const lpAbove = aboveResidual * lpAboveSplit;
const gpAbove = aboveResidual * (1 - lpAboveSplit);
const lpTotal = prefDue + lpCapital + lpAbove;

export const waterfall3Tier: ExcelTemplate = {
  id: 'waterfall-3-tier',
  title: '3-tier waterfall — LP total proceeds',
  category: 'finance',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'JV waterfall: 8% compound pref to LP, return of capital pro-rata, 100% catch-up to a 20% GP promote, then 80/20 above. Hold 5 years; total cash to distribute is $40M. The intermediate cells are pre-computed; you compose the LP total in B18.',
  instruction:
    'In B18, compute the LP total proceeds as the sum of (pref to LP) + (LP capital returned) + (LP take from above-split). Reference the computed cells.',
  targetCell: 'B18',
  expected: lpTotal,
  tolerancePct: 0.005,
  exampleFormula: '=B10+B1+B16',
  layout: {
    rows: 18,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'LP capital' },
      { address: 'B1', role: 'assumption', value: lpCapital, format: 'usd' },
      { address: 'A2', role: 'header', text: 'GP capital' },
      { address: 'B2', role: 'assumption', value: gpCapital, format: 'usd' },
      { address: 'A3', role: 'header', text: 'Total cap' },
      { address: 'B3', role: 'computed', computed: totalCap, format: 'usd' },
      { address: 'A4', role: 'header', text: 'Pref rate' },
      { address: 'B4', role: 'assumption', value: prefRate, format: 'pct' },
      { address: 'A5', role: 'header', text: 'Hold years' },
      { address: 'B5', role: 'assumption', value: holdYears, format: 'years' },
      { address: 'A6', role: 'header', text: 'Total distribution' },
      { address: 'B6', role: 'assumption', value: totalDist, format: 'usd' },
      { address: 'A7', role: 'header', text: 'GP catch-up target' },
      { address: 'B7', role: 'assumption', value: catchUpTarget, format: 'pct' },
      { address: 'A8', role: 'header', text: 'LP above-split %' },
      { address: 'B8', role: 'assumption', value: lpAboveSplit, format: 'pct' },

      { address: 'A9', role: 'spacer' },
      { address: 'B9', role: 'spacer' },

      { address: 'A10', role: 'header', text: 'Pref due (LP)' },
      { address: 'B10', role: 'computed', computed: prefDue, format: 'usd' },
      { address: 'A11', role: 'header', text: 'After pref' },
      { address: 'B11', role: 'computed', computed: afterPref, format: 'usd' },
      { address: 'A12', role: 'header', text: 'ROC pool' },
      { address: 'B12', role: 'computed', computed: totalCap, format: 'usd' },
      { address: 'A13', role: 'header', text: 'After ROC' },
      { address: 'B13', role: 'computed', computed: afterRoc, format: 'usd' },
      { address: 'A14', role: 'header', text: 'GP catch-up' },
      { address: 'B14', role: 'computed', computed: catchUp, format: 'usd' },
      { address: 'A15', role: 'header', text: 'Above-split residual' },
      { address: 'B15', role: 'computed', computed: aboveResidual, format: 'usd' },
      { address: 'A16', role: 'header', text: 'LP above-split' },
      { address: 'B16', role: 'computed', computed: lpAbove, format: 'usd' },
      { address: 'A17', role: 'header', text: 'GP above-split' },
      { address: 'B17', role: 'computed', computed: gpAbove, format: 'usd' },
      { address: 'A18', role: 'header', text: 'LP TOTAL' },
      { address: 'B18', role: 'target', format: 'usd' },
    ],
  },
  takeaway:
    'A waterfall is just three sequential subtractions and a split. Pref → ROC → catch-up → above-split. LP total = pref + their capital back + their share of the residual. The pre-computed intermediate cells let you check each tier; the LP total is the headline number an LP report would lead with.',
  solution: `LP total = pref + LP capital + LP above-split = $${prefDue.toLocaleString('en-US', { maximumFractionDigits: 0 })} + $${lpCapital.toLocaleString()} + $${lpAbove.toLocaleString('en-US', { maximumFractionDigits: 0 })} ≈ $${lpTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}.`,
};
