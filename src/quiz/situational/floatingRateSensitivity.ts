import type { SituationalCase } from '../../types/situational';

export const floatingRateSensitivity: SituationalCase = {
  id: 'floating-rate-sensitivity',
  title: 'SOFR jumps 200 bps — does the deal still cash-flow?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You are acquiring a 200-unit multifamily asset at $40M. You are financing with a $28M floating rate bridge loan at SOFR + 250 bps, interest-only for 3 years. At close, SOFR is 3.50%, making the all-in rate 6.00%. Your stabilized NOI is $2.4M, with 5% of NOI reserved for capex. The loan has an interest rate cap at SOFR 5.00% (i.e., all-in cap of 7.50%), which you purchased at close. A rising-rate scenario surfaces in underwriting: what if SOFR rises 200 bps to 5.50%?',
  data: [
    { label: 'Purchase price', value: '$40,000,000' },
    { label: 'Loan amount', value: '$28,000,000 (70% LTV)' },
    { label: 'Loan structure', value: 'Floating, SOFR + 250 bps, I/O 3 yrs' },
    { label: 'SOFR at close', value: '3.50% → all-in 6.00%' },
    { label: 'Stabilized NOI', value: '$2,400,000' },
    { label: 'Capex reserve', value: '5% of NOI ($120,000)' },
    { label: 'Interest rate cap', value: 'SOFR 5.00% (all-in cap: 7.50%)' },
  ],
  question: 'If SOFR rises to 5.50%, what happens to cash flow and how does the cap affect it?',
  options: [
    {
      label:
        'SOFR at 5.50% hits the cap: your all-in rate is capped at 7.50% (not 8.00%). Debt service: $28M × 7.50% = $2.1M/yr. Available for equity after capex: $2.4M − $0.12M − $2.1M = $0.18M. The deal barely cash-flows — you have essentially zero distributable cash. Without the cap, at 8.00% you\'d be cash-flow negative by ~$0.12M/yr.',
      isBest: true,
      explanation:
        'Rate cap mechanics: the cap pays the lender (or the borrower receives the benefit) when SOFR exceeds the strike. At SOFR 5.50%, the cap kicks in at 5.00%, so your effective SOFR is capped at 5.00% → all-in 7.50%. Debt service: $28M × 0.075 = $2.1M. After capex reserve ($120K), available cash: $2.4M − $0.12M − $2.1M = $0.18M. Thin, but positive. The cap is doing its job — without it, you\'d owe $2.24M ($28M × 8.00%) and the equity would be cash-flow negative. This is why cap purchase is typically a lender requirement AND a smart structural protection.',
    },
    {
      label:
        'The deal cash-flows fine — the cap limits your exposure, and you budgeted for rate increases at underwriting.',
      isBest: false,
      explanation:
        'Overstates comfort. The cap protects you from catastrophic rate moves but doesn\'t eliminate cash-flow compression. At 7.50%, you have $180K of distributable cash on a $12M equity check — a 1.5% cash yield. That\'s barely above zero. "Cash-flows fine" glosses over how thin the margin is.',
    },
    {
      label:
        'SOFR at 5.50% means your all-in rate is 8.00% (5.50% + 250 bps). Debt service: $2.24M. The deal is cash-flow negative; the cap is irrelevant because 5.50% > your 5.00% strike.',
      isBest: false,
      explanation:
        'Gets the cap mechanics backwards. When SOFR exceeds the strike (5.00%), the cap pays the borrower the excess — your effective SOFR is limited to 5.00%, making your all-in 7.50%, not 8.00%. The cap is most relevant exactly when SOFR exceeds the strike.',
    },
    {
      label:
        'The equity return is unaffected because floating rate risk was hedged. The deal performs as underwritten.',
      isBest: false,
      explanation:
        'Hedging manages rate risk, not eliminates it. The cap has a strike, not a guaranteed rate. From base case (6.00% → $1.68M debt service) to stress case (7.50% capped → $2.1M debt service), debt service rises $420K — a real cash-flow hit. "Unaffected" is incorrect; the hedge limits the damage, not prevents it.',
    },
  ],
  takeaway:
    'Interest rate caps protect against catastrophic rate moves but do not eliminate cash-flow compression from rate rises below the strike. Always model (1) base SOFR, (2) SOFR at the cap strike, and (3) SOFR above the cap strike to see the full range. The cap simply creates a floor under cash flow — at the capped rate, your deal may still be barely positive or cash-flow negative depending on NOI cushion.',
  tips: [
    'Cap math: effective all-in rate = min(SOFR, cap strike) + spread. Model all three SOFR scenarios.',
    'At 70% LTV I/O, debt service = loan × all-in rate. No principal paydown means full rate exposure on the whole balance.',
    'A thin cash-flow cushion at the cap strike means you\'re relying on NOI growth or a sale to deliver returns — not distributions.',
  ],
};
