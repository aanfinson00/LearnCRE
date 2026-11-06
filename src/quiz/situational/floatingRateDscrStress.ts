import type { SituationalCase } from '../../types/situational';

export const floatingRateDscrStress: SituationalCase = {
  id: 'floating-rate-dscr-stress',
  title: 'Does the loan survive +100 bps?',
  category: 'sensitivity',
  scenario: 'A $30M interest-only floating-rate loan is quoted at 5.5% with NOI of about $2.23M, a 1.35x DSCR. The lender\'s covenant is 1.25x. Rates have been volatile and the borrower has not bought a cap.',
  data: [
    {
      label: 'Loan',
      value: '$30M, interest-only'
    },
    {
      label: 'Rate',
      value: '5.5% floating'
    },
    {
      label: 'NOI',
      value: '~$2.23M'
    },
    {
      label: 'Current DSCR',
      value: '1.35x'
    },
    {
      label: 'Covenant',
      value: '1.25x'
    },
    {
      label: 'Rate cap',
      value: 'None'
    }
  ],
  question: 'What should the underwriter flag?',
  options: [
    {
      label: 'At +100 bps DSCR falls to ~1.14x, breaching the covenant — require a rate cap or lower leverage.',
      isBest: true,
      explanation: 'Interest rises from $1.65M to $1.95M, so DSCR = $2.23M ÷ $1.95M ≈ 1.14x. Breach happens at roughly +45 bps (NOI ÷ 1.25 ÷ $30M ≈ 5.95%). A cap, a smaller loan, or a cash-sweep cushion fixes it.'
    },
    {
      label: '1.35x is comfortably above 1.25x; no action needed.',
      isBest: false,
      explanation: 'DSCR must be tested at the stressed rate, not today\'s. The cushion is only about 45 bps of rate.'
    },
    {
      label: 'Add amortization to improve DSCR.',
      isBest: false,
      explanation: 'Amortization increases debt service and lowers DSCR.'
    },
    {
      label: 'Rate risk is the borrower\'s problem, not the lender\'s.',
      isBest: false,
      explanation: 'A covenant breach is the lender\'s problem too — it forces a workout or cash trap.'
    }
  ],
  takeaway: 'Floating-rate loans must be underwritten at stressed rates. Compute the rate at which the covenant breaks and compare it to the cap strike.',
  tips: [
    'Breakeven rate = NOI ÷ covenant ÷ loan balance (IO loans).',
    'Require a rate cap sized to the covenant.',
    'Stress +100–200 bps.'
  ],
  difficulty: 'intermediate',
  assetClass: 'mixed',
  roles: [
    'mortgageUw',
    'acquisitions'
  ]
};
