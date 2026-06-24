import type { SituationalCase } from '../../types/situational';

export const leverageFlipNegative: SituationalCase = {
  id: 'leverage-flip-negative',
  title: 'At what rate does your positive leverage flip negative?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'mixed',
  scenario:
    'You\'re acquiring a stabilized office building at a 6.0% going-in cap rate. The deal is being financed with a 60% LTV loan at a floating rate currently at SOFR + 225 bps (SOFR = 3.5%, effective rate 5.75%). The loan is IO for 3 years then amortizes on a 30-year schedule. Positive leverage currently exists: the 6.0% cap exceeds the 5.75% loan rate. Your IC asks: "What happens if SOFR moves 100 bps?"',
  data: [
    { label: 'Going-in cap rate', value: '6.0%' },
    { label: 'LTV', value: '60%' },
    { label: 'Loan rate (floating)', value: 'SOFR + 225 bps (currently 5.75%)' },
    { label: 'IO period', value: '3 years, then 30-yr amortization' },
    { label: 'Current positive leverage spread', value: '+25 bps (6.0% cap − 5.75% rate)' },
  ],
  question: 'Where does leverage flip negative, and why does it matter for equity returns?',
  options: [
    {
      label:
        'Leverage flips negative when the loan rate exceeds the cap rate — at SOFR + 100 bps (6.75% rate), the loan costs more than the property earns, so the lender is effectively subsidizing itself from equity. The +25 bps spread today is razor-thin; a 100 bps SOFR move crosses the threshold easily.',
      isBest: true,
      explanation:
        'Positive leverage: property earns 6.0% on total value; borrowed money costs 5.75%; the 25 bps spread accrues to equity. At SOFR + 100 bps, the effective rate becomes 6.75%. Now borrowed capital costs 75 bps MORE than what the property earns → every dollar of debt destroys equity value. This is negative leverage — common in 2022–2023 when cap rates lagged the Fed hiking cycle. The math: in a simple IO scenario, unlevered return = 6.0% cap; with 60% LTV at 6.75%: levered return = 6.0% + 0.6 × (6.0% − 6.75%) = 6.0% − 0.45% = 5.55% — *below* the unlevered return. Leverage has become value-destructive. And when amortization kicks in after year 3, the effective loan constant is even higher (~6.2% at 6.75% on a 30-yr schedule), pushing the break-even SOFR even lower than +100 bps.',
    },
    {
      label:
        'Leverage flips negative only when the LTV exceeds 75% — the current 60% structure provides ample protection.',
      isBest: false,
      explanation:
        'LTV and leverage direction are separate concepts. Positive vs. negative leverage is determined by the spread between the cap rate and the loan rate (or loan constant), not the LTV. Even at 40% LTV, if the loan rate exceeds the cap rate, leverage is negative — you\'re borrowing at a cost above the asset\'s yield. LTV determines how much leverage you\'re applying; the cap-rate-minus-loan-rate spread determines whether that leverage is additive or destructive to equity.',
    },
    {
      label:
        'Leverage is always positive as long as NOI covers debt service — a positive DSCR means positive leverage.',
      isBest: false,
      explanation:
        'DSCR and leverage direction are different measurements. DSCR > 1.0 means the property generates enough NOI to pay debt service — an operational solvency test. Positive leverage means the return ON the borrowed capital exceeds its cost — a return attribution test. A property can have DSCR = 1.1 (barely solvent) while also having negative leverage (the borrowed capital drags equity returns below unlevered returns). Both metrics matter, but they answer different questions.',
    },
    {
      label:
        'Leverage direction doesn\'t matter for IRR — what matters is absolute cash flow to equity, not the cap-rate spread.',
      isBest: false,
      explanation:
        'This dismisses the diagnostic value of the leverage direction concept. When leverage is negative and the debt-to-cap-rate spread is widening (as happened 2022–2023 when SOFR rose while cap rates were sticky), equity returns compress below unlevered returns — meaning you would have been better off not using leverage at all. Tracking the leverage direction signals when to reduce LTV, avoid floating-rate debt, or negotiate rate caps. "Absolute cash flow" framing hides whether the capital structure is helping or hurting.',
    },
  ],
  takeaway:
    'The flip point from positive to negative leverage occurs when the loan rate (or loan constant after IO ends) exceeds the cap rate. On a 6.0% cap with a +225 spread over SOFR, leverage goes negative at SOFR above ~3.75% — a threshold crossed during recent rate cycles. Always compute the leverage flip point before IC and present it explicitly as a floating-rate risk disclosure: "leverage flips negative if SOFR exceeds X."',
  tips: [
    'Leverage flip formula: SOFR threshold = cap rate − spread. At 6.0% cap − 2.25% spread = 3.75% SOFR.',
    'IO-to-amortizing switch raises the effective loan constant, bringing the flip point closer even without a SOFR move.',
    'Positive leverage at close can become negative within 12 months if SOFR rises — always buy a rate cap.',
  ],
};
