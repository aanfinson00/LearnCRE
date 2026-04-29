import type { SituationalCase } from '../../types/situational';

export const dscrRefiFailing: SituationalCase = {
  id: 'dscr-refi-failing',
  title: 'The refi DSCR test is failing — what now?',
  category: 'risk',
  difficulty: 'intermediate',
  roles: ['mortgageUw', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'Your asset is approaching loan maturity. The current loan is $50M at 4.0% on a 30-year amort, IO. NOI is flat at $3.0M. Today\'s market rate is 7.0%. The refinance lender requires a 1.25x DSCR. At 7.0% on the same $50M loan amount, the DSCR test fails. The borrower wants to know what levers exist to make the refi pencil.',
  data: [
    { label: 'Current loan', value: '$50M' },
    { label: 'Current rate', value: '4.0% (IO)' },
    { label: 'NOI', value: '$3.0M' },
    { label: 'Market rate', value: '7.0%' },
    { label: 'Lender DSCR threshold', value: '1.25x' },
    { label: 'New DS @ $50M / 7.0% / 30yr amort', value: '~$3.99M' },
    { label: 'New DSCR', value: '~0.75x — fails' },
  ],
  question: 'Which lever is most likely to make this loan re-pencil with the same lender?',
  options: [
    {
      label:
        'Lower the loan amount (paydown at refi) to ~$30M — at that loan size the DS at 7% / 30yr drops to ~$2.4M and DSCR clears 1.25x.',
      isBest: true,
      explanation:
        'Paydown is the most reliable lever. Max DS at 1.25x = NOI / 1.25 = $2.4M. At 7% / 30yr loan constant ≈ 7.99%, max loan = $2.4M / 0.0799 ≈ $30M. The borrower brings $20M of equity at refi to pay down. Painful but mathematically clean and what every lender models first.',
    },
    {
      label:
        'Push for a longer amortization (40 or 50 years) to lower the loan constant and make the same loan pencil.',
      isBest: false,
      explanation:
        'Marginally helpful but not enough. 40-yr amort at 7% has a constant of ~7.46% vs 7.99% at 30-yr — DS only drops ~7%. DSCR moves from 0.75 to 0.81; still a fail. Amort extension alone almost never closes a 50%+ DSCR gap.',
    },
    {
      label: 'Argue for a DSCR exception based on the sponsor\'s strong balance sheet and recourse pledge.',
      isBest: false,
      explanation:
        'Possible in some markets but unreliable at this size of shortfall. Recourse can soften an underwriting view but doesn\'t change the cash-flow math the lender models. Most institutional lenders won\'t waive a 50% DSCR shortfall regardless of the sponsor\'s name.',
    },
    {
      label: 'Refinance with a bridge / debt fund at a higher rate and a 1.05x DSCR to get past the trough.',
      isBest: false,
      explanation:
        'Trades one problem for another. Bridge debt at 1.05x is a thin cushion that doesn\'t survive *any* NOI miss. The exit problem (a permanent take-out at higher DSCR) returns in 12–24 months, often worse if rates haven\'t come down. Bridge can buy time but it\'s not the *first* lever to pull.',
    },
  ],
  takeaway:
    'When the DSCR test fails on refi, the math is mostly about the loan amount, not the rate or the sponsor. Paydown is the highest-leverage move. Always recompute "max loan = NOI / DSCR / loan constant" first — it tells you exactly how much equity needs to come into the deal at refi to clear.',
  tips: [
    'Refi math: max loan at threshold = NOI / DSCR / loanConstant(rate, amort).',
    'Loan constant at 7%/30yr ≈ 7.99%; at 8%/30yr ≈ 8.81%; at 6%/30yr ≈ 7.20%.',
    'A 25 bps move in market rate at refi can change the required paydown by 5–10%.',
    'Recourse + sponsor strength soften terms but don\'t replace the cash-flow test.',
  ],
};
