import type { SituationalCase } from '../../types/situational';

export const floatVsFixedDebt: SituationalCase = {
  id: 'float-vs-fixed-debt',
  title: 'Bridge floating vs. permanent fixed: which do you choose for a stabilized hold?',
  category: 'risk',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  scenario:
    'You are financing a $28M stabilized industrial acquisition: 95% occupied, 4.2-year WALT, no value-add business plan. Two term sheets are on the table: (A) 3-year bridge at SOFR + 200bps, all-in 7.3%, interest-only, with two 1-year extension options at lender discretion; (B) 7-year fixed permanent at 6.40%, 30-year amortizing. Sponsor goal: hold 5–7 years, potential refi or sale at Year 5.',
  data: [
    { label: 'Purchase price', value: '$28M' },
    { label: 'Option A', value: '3+1+1 yr bridge, SOFR + 200bps (7.3% all-in), IO' },
    { label: 'Option B', value: '7yr fixed permanent, 6.40%, 30-yr amortizing' },
    { label: 'Asset', value: '95% occupied, 4.2-yr WALT, stabilized industrial' },
    { label: 'Hold target', value: '5–7 years, potential exit or refi at Year 5' },
  ],
  question: 'For a stabilized 5–7-year hold with no value-add business plan, which financing is more appropriate?',
  options: [
    {
      label:
        'Fixed permanent (Option B) — a stabilized asset with no value-add plan and a defined hold period is exactly what permanent financing is designed for. It locks rate risk, eliminates extension uncertainty, and the 30-year amortization steadily reduces the exit refi burden.',
      isBest: true,
      explanation:
        'The logic of bridge financing is: "I need time or flexibility because I am adding value, stabilizing, or waiting for better permanent-market conditions." None of those conditions apply here. The asset is already stabilized, the plan is passive hold-and-sell, and — critically — the fixed rate (6.40%) is 90bps inside the current floating all-in (7.3%). You are not saving money with the bridge; you are paying more for optionality and accepting rate risk. Extension options at lender discretion are not guaranteed — in a stressed market, lenders can decline extensions, potentially forcing a sale at the worst moment. The 30-year amortization on the permanent loan also builds equity: 5 years of paydown reduces the loan balance by approximately 4–5%, lowering refi risk at exit.',
    },
    {
      label:
        'Bridge floating (Option A) — lower initial costs and more flexibility for an early sale.',
      isBest: false,
      explanation:
        'The cost argument reverses on inspection: Option B at 6.40% is 90bps below the current bridge all-in of 7.3%. Bridge is more expensive today, not less. The flexibility argument also overstates optionality — extension options are at lender discretion, the asset is already stabilized so there is no value-add catalyst, and a 7-year permanent loan can be pre-paid or assumed by the buyer if the sponsor sells early.',
    },
    {
      label:
        'Wait for rates to drop before choosing — both options are too expensive at today\'s rates.',
      isBest: false,
      explanation:
        'Not a viable option for an acquisition that closes on a fixed date. "Wait for rates" applies to refinancing a held asset, not to acquisition financing where the alternative is losing the deal. If you choose the bridge betting on rate cuts that do not materialize, you are trapped in high-floating IO debt with lender-controlled extensions.',
    },
    {
      label:
        'Use bridge financing — a 4.2-year WALT means you need the flexibility to re-lease and refi into permanent once leases roll.',
      isBest: false,
      explanation:
        'A 4.2-year WALT is not so short that it justifies a bridge on a stabilized asset. Industrial leases frequently renew in place. If leases roll during the 5–7-year hold, the asset is still income-producing and refinanceable under either debt structure. The bridge adds rate risk and extension uncertainty without a corresponding business-plan justification.',
    },
  ],
  takeaway:
    'Bridge debt is for value-add and stabilization. Permanent fixed debt is for stabilized holds with defined exit timelines. When the asset is stabilized, the plan is passive hold, and the fixed rate is cheaper than the floating all-in, the permanent loan is usually the correct call. The only exception is a strong conviction that rates fall materially within 2 years — that is a macro forecast, not an underwriting assumption, and should be named explicitly.',
  tips: [
    'Compare all-in rates first: bridge SOFR + spread vs. fixed. When fixed < floating all-in, you are paying more for bridge "flexibility," not less.',
    'Bridge extension options are at lender discretion in most term sheets — not borrower right. In a market freeze, this becomes a forced-sale trigger.',
    '30-yr amortization means 5 years of paydown reduces loan balance ~4–5%. Factor that into exit LTV and refi stress.',
  ],
};
