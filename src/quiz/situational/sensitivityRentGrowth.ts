import type { SituationalCase } from '../../types/situational';

export const sensitivityRentGrowth: SituationalCase = {
  id: 'sensitivity-rent-growth',
  title: 'How much does rent growth assumption move the IRR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a 300-unit multifamily acquisition at a $60M purchase price. The base case uses 3% annual rent growth and produces a 15% levered IRR on a 5-year hold. The investment committee asks you to run the deal at 1.5% and 0% rent growth and explain the magnitude of the change. NOI in year 1 is $3.0M; the deal is modestly leveraged at 55% LTV.",
  data: [
    { label: 'Purchase price', value: '$60M' },
    { label: 'Year-1 NOI', value: '$3.0M (5.0% going-in cap)' },
    { label: 'LTV', value: '55%' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Base case rent growth / IRR', value: '3%/yr → 15% IRR' },
  ],
  question: 'How should you frame the sensitivity and its IRR impact?',
  options: [
    {
      label: "Rent growth flows through to both NOI and exit value. At 1.5% growth, NOI compounds to ~$3.23M vs $3.48M at 3% — a ~7% NOI gap at year 5. Since exit value = NOI ÷ exit cap, the valuation gap is the same percentage. On a levered basis, the equity amplifies the hit: expect IRR to drop roughly 200–300 bps (to ~12–13%) at 1.5%, and another 300–400 bps at 0% (to ~9–11%).",
      isBest: true,
      explanation:
        "Rent growth affects two levers simultaneously: (1) NOI growth through the hold (higher cash distributions) and (2) exit value (NOI at sale ÷ exit cap rate). A 1.5% vs. 3% difference compounds to roughly a 7–8% gap in year-5 NOI and thus a ~7–8% gap in exit value. On 55% LTV, equity is ~45% of capital — a $3–4M exit value reduction on a deal equity base of ~$27M is a 10–15% hit to equity proceeds, which translates to the ~200–300 bps IRR drop. The levered impact is meaningfully larger than the NOI gap alone.",
    },
    {
      label: "Rent growth has minimal IRR impact because the deal is primarily driven by cap rate at exit — just show cap rate sensitivity instead.",
      isBest: false,
      explanation:
        "Rent growth directly sets the NOI that gets capitalized at exit. You cannot separate rent growth sensitivity from exit value sensitivity — they are the same analysis performed at different input layers. Substituting cap rate sensitivity for rent growth sensitivity answers a different question and leaves a gap in the committee's risk assessment.",
    },
    {
      label: "Run the numbers and report the exact IRR without explaining the mechanism.",
      isBest: false,
      explanation:
        "Reporting numbers without mechanism is the analysis equivalent of showing the answer without the work. An investment committee needs to understand *why* the IRR changes to calibrate their confidence in the base case and to stress-test the rent growth assumption itself. Explanation is not optional for a quality IC presentation.",
    },
    {
      label: "At 0% rent growth the IRR barely changes because NOI is flat — there's no cash distribution drag.",
      isBest: false,
      explanation:
        "0% rent growth has two effects that both reduce IRR: (1) lower NOI in years 2–5 means less cash flow (reduces distributions) and (2) lower year-5 NOI means a lower sale price (reduces exit proceeds). Both are negative. The compounding effect over 5 years means the exit value impact alone is material even on a modest rent growth differential.",
    },
  ],
  takeaway:
    "Rent growth sensitivity matters because it flows through to both in-hold cash flows AND exit value (via the NOI that gets capitalized). On a levered deal, the equity amplifies the NOI gap at exit. A clean sensitivity table shows: rent growth assumption → year-5 NOI → exit value at assumed cap → equity proceeds → IRR. Never present just the IRR without explaining the mechanism.",
  tips: [
    'Year-5 NOI gap at 1.5% vs 3% growth: compound 5 years → ~7% smaller NOI → ~7% smaller exit value.',
    'Leverage amplifies rent growth sensitivity: higher LTV = more IRR swing per unit of NOI change.',
    'Run the table: 0%, 1.5%, 3%, 4% rent growth in four rows; IRR in the last column.',
  ],
};
