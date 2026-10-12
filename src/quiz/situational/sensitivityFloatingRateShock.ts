import type { SituationalCase } from '../../types/situational';

export const sensitivityFloatingRateShock: SituationalCase = {
  id: 'sensitivity-floating-rate-shock',
  title: 'What does +100 bps do to cash flow?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['mortgageUw', 'portfolioMgmt', 'assetManagement'],
  assetClass: 'mixed',
  scenario:
    'You are buying a $50M asset with a $32.5M interest-only floating-rate loan (65% LTV) at a 6.5% all-in rate and $2.9M of year-1 NOI. There is no rate cap. Equity is $17.5M.',
  data: [
    { label: 'Purchase price', value: '$50.0M' },
    { label: 'Loan', value: '$32.5M, interest-only' },
    { label: 'All-in rate', value: '6.5%' },
    { label: 'Year-1 NOI', value: '$2.9M' },
  ],
  question: 'If rates rise 100 bps, what happens to cash-on-cash return and DSCR?',
  options: [
    {
      label: 'Cash-on-cash falls from ~4.5% to ~2.6% (about −41% of cash flow) and DSCR drops from ~1.37x to ~1.19x.',
      isBest: true,
      explanation:
        'Base interest: 32.5 × 6.5% = $2.11M; cash flow = 2.9 − 2.11 ≈ $0.79M → 4.5% on $17.5M; DSCR 1.37x. At 7.5%: interest $2.44M; cash flow ≈ $0.46M → 2.6%; DSCR 1.19x. Leverage turns a 100 bps move into a ~41% hit to cash flow.',
    },
    {
      label: 'Cash-on-cash falls about 1 point and DSCR is basically unchanged.',
      isBest: false,
      explanation:
        'Understates it: 100 bps on 65% leverage is $325k, about 41% of cash flow.',
    },
    {
      label: 'Nothing changes — NOI is the driver, not debt cost.',
      isBest: false,
      explanation:
        'NOI is unchanged, but cash flow after debt service is not.',
    },
    {
      label: 'Cash flow goes negative.',
      isBest: false,
      explanation:
        'Still positive at ~$0.46M, though the cushion is thin; a further 200 bps would approach breakeven.',
    },
  ],
  takeaway:
    'Floating-rate debt magnifies sensitivity: interest cost change ÷ cash flow after debt gives the real hit. Quantify it against cash flow and DSCR, not against rate alone.',
  tips: [
    'Rate cap cost is cheap insurance relative to a 40% cash-flow hit.',
    'Test breakeven rate: where does DSCR hit 1.0x or the covenant?',
    'Compare the shock to debt yield, not just to cap rate.',
  ],
};
