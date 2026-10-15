import type { SituationalCase } from '../../types/situational';

export const exitCapEquitySensitivity: SituationalCase = {
  id: 'exit-cap-equity-sensitivity',
  title: 'How much does 50 bps of exit cap really cost the equity?',
  category: 'sensitivity',
  difficulty: 'beginner',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    "You're buying a multifamily property for $40M with a $24M interest-only loan and $16M of equity. Your base case projects Year-5 NOI of $2.4M and a sale at a 5.0% cap rate. Your partner asks what happens to the equity if the exit cap comes in 50 bps wider at 5.5%. Ignore interim cash flow and sale costs for this exercise.",
  data: [
    { label: 'Purchase price', value: '$40M' },
    { label: 'Loan (interest-only)', value: '$24M (60% LTV)' },
    { label: 'Equity', value: '$16M' },
    { label: 'Year-5 NOI', value: '$2.4M' },
    { label: 'Base exit cap', value: '5.0% ($48.0M sale)' },
    { label: 'Stress exit cap', value: '5.5%' },
  ],
  question: 'What does the 50 bps move do to sale proceeds to equity?',
  options: [
    {
      label:
        "Value falls from $48.0M to about $43.6M (−9%), but because the $24M loan stays fixed, equity proceeds fall from $24.0M to about $19.6M (−18%). Leverage roughly doubles the percentage hit.",
      isBest: true,
      explanation:
        "$2.4M ÷ 5.5% = $43.64M versus $2.4M ÷ 5.0% = $48.0M, a drop of $4.36M or 9.1%. The loan is interest-only, so the full $24M is repaid at either exit. Equity proceeds go from $48.0M − $24.0M = $24.0M to $43.64M − $24.0M = $19.64M, a drop of 18.2%. The same dollar loss lands on a smaller equity base.",
    },
    {
      label:
        "Equity falls by the same 9% as value, since the cap rate change applies to the whole property.",
      isBest: false,
      explanation:
        "The 9% value drop is a dollar loss ($4.36M) that comes entirely out of the equity, because the lender is still owed $24M. As a percentage of equity proceeds the loss is about 18%. Ignoring leverage understates the sensitivity of the equity.",
    },
    {
      label:
        "Equity falls by about 10% because 50 bps is 10% of a 5.0% cap rate.",
      isBest: false,
      explanation:
        "The relative change in the cap rate (10%) is close to, but not the same as, the change in value, because value is 1 ÷ cap. A 10% rise in cap produces a 9.1% fall in value (1 ÷ 1.10 = 0.909). That still leaves the leverage effect unaccounted for.",
    },
    {
      label:
        "It doesn't matter much because NOI growth over five years will make up the difference.",
      isBest: false,
      explanation:
        "NOI growth is already in the $2.4M Year-5 NOI. A wider cap rate is a separate risk and it applies to whatever NOI you achieve. Showing the sensitivity is exactly what lets you decide how much NOI cushion you need to offset it.",
    },
  ],
  takeaway:
    "Value moves by 1 ÷ cap, and equity absorbs the whole dollar change because debt is fixed. At 60% LTV, a 9% value move becomes roughly an 18% move in sale equity.",
  tips: [
    "Value = NOI ÷ cap; recompute rather than scaling by the cap change.",
    "Debt is fixed at exit, so equity takes the full dollar loss.",
    "Leverage multiplies sensitivity by roughly value ÷ equity at exit.",
  ],
};
