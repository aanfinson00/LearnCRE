import type { ExcelTemplate } from '../types';

// Cells (col B is values, col A is labels):
// A1: "Gross potential rent"   B1: 1,200,000
// A2: "Vacancy %"              B2: 0.05
// A3: "Other income"           B3: 50,000
// A4: "OpEx"                   B4: 380,000
// A5: --
// A6: "NOI"                    B6: ?  (target)
//
// NOI = GPR*(1 - vacancy) + other income - opex
// = 1,200,000 * 0.95 + 50,000 - 380,000
// = 1,140,000 + 50,000 - 380,000 = 810,000

export const noiRollForward: ExcelTemplate = {
  id: 'noi-roll-forward',
  title: 'NOI roll-forward',
  category: 'arithmetic',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  scenario:
    'A 200-unit multifamily asset has gross potential rent of $1.2M, vacancy at 5%, $50k of other income (parking + laundry), and $380k of operating expenses.',
  instruction:
    'Compute NOI in cell B6 from the assumptions above. Use the standard NOI definition: gross potential rent net of vacancy, plus other income, less operating expenses.',
  targetCell: 'B6',
  expected: 810_000,
  tolerancePct: 0.005,
  exampleFormula: '=B1*(1-B2)+B3-B4',
  layout: {
    rows: 6,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'Gross potential rent' },
      { address: 'B1', role: 'assumption', value: 1_200_000, format: 'usd' },
      { address: 'A2', role: 'header', text: 'Vacancy %' },
      { address: 'B2', role: 'assumption', value: 0.05, format: 'pct' },
      { address: 'A3', role: 'header', text: 'Other income' },
      { address: 'B3', role: 'assumption', value: 50_000, format: 'usd' },
      { address: 'A4', role: 'header', text: 'OpEx' },
      { address: 'B4', role: 'assumption', value: 380_000, format: 'usd' },
      { address: 'A5', role: 'spacer' },
      { address: 'B5', role: 'spacer' },
      { address: 'A6', role: 'header', text: 'NOI' },
      { address: 'B6', role: 'target', format: 'usd' },
    ],
  },
  takeaway:
    'NOI is the cleanest "income" metric in CRE — it strips out financing and capital costs and gets you to the cash the building generates before debt service. Gross rent → vacancy adjustment → other income → operating expenses, in that order.',
  solution:
    'NOI = GPR × (1 − vacancy) + other income − OpEx = 1,200,000 × 0.95 + 50,000 − 380,000 = 1,140,000 + 50,000 − 380,000 = $810,000.',
};
