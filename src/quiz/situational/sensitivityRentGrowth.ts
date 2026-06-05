import type { SituationalCase } from '../../types/situational';

export const sensitivityRentGrowth: SituationalCase = {
  id: 'sensitivity-rent-growth',
  title: 'Rent growth misses by 1% per year — how far does IRR fall?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a 200-unit multifamily acquisition at a $40M purchase price, 5.0% going-in cap, 5-year hold, 7.0% exit cap, with 3.5%/yr rent growth. The base case models to a 13% levered IRR. A senior reviewer asks you to sensitize to ±1% rent growth — both 2.5%/yr (downside) and 4.5%/yr (upside). Assume 55% LTV, 6.0% interest-only debt.",
  data: [
    { label: 'Purchase price', value: '$40M' },
    { label: 'Going-in cap', value: '5.0% ($2.0M NOI)' },
    { label: 'Base rent growth', value: '3.5%/yr' },
    { label: 'Exit cap', value: '7.0%' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Leverage', value: '55% LTV, 6.0% IO' },
    { label: 'Base IRR', value: '~13%' },
  ],
  question:
    'Without a model, what range of IRRs would you expect at 2.5% and 4.5% rent growth?',
  options: [
    {
      label:
        "At 2.5% rent growth: roughly 10-11% IRR; at 4.5%: roughly 15-16%. Each 1% change in annual rent growth shifts IRR by ~2-3 points over a 5-year hold at 55% leverage.",
      isBest: true,
      explanation:
        "Rent growth flows through to NOI growth, which drives both annual distributions and exit value. Mechanics: base NOI = $40M × 5.0% = $2.0M. At 3.5% growth for 5 years: year-5 NOI ≈ $2.0M × (1.035)^5 = $2.38M. Exit value at 7.0% cap = $34.0M. Equity at exit (55% LTV → debt = $22M): $34.0M − $22M = $12M on $18M equity invested. At 2.5% growth: year-5 NOI ≈ $2.27M, exit value = $32.4M, equity proceeds = $10.4M. At 4.5% growth: year-5 NOI ≈ $2.49M, exit value = $35.6M, equity proceeds = $13.6M. The spread in equity proceeds between the three scenarios (~$3M each direction) on $18M invested equity, combined with the annual cash flow difference, translates to roughly 2-3 IRR points per 1% annual rent growth change. Rule of thumb: moderately leveraged multifamily, 5-year hold = 2-3 IRR points per 1% rent growth.",
    },
    {
      label:
        "Rent growth has minimal impact — exit cap is the dominant variable. A 1% rent growth change moves IRR by only 0.5-1%.",
      isBest: false,
      explanation:
        "Underestimates rent growth sensitivity. Rent growth both lifts year-5 NOI (improving exit value) and compounds annual distributions over the hold — both hit IRR simultaneously. In a multifamily deal at 55% LTV, the combined effect of 1% annual rent growth miss over 5 years is roughly 2-3 IRR points, not 0.5. The exit cap is important, but rent growth is not 'minimal.'",
    },
    {
      label:
        "At 2.5% rent growth: ~5% IRR; at 4.5%: ~20%+. Rent growth is the single most sensitive variable.",
      isBest: false,
      explanation:
        "Over-states sensitivity. A 1% rent growth miss doesn't crater the deal from 13% to 5% — that would require something like negative rent growth plus significant cap expansion simultaneously. At 2.5% rent growth with a 7% exit cap, the deal still generates positive levered returns in the 10-11% range. The base case has meaningful cushion from the going-in 5.0% cap and IO carry.",
    },
    {
      label:
        "You can't estimate without building a full model — sensitivity requires precise cash flow projections.",
      isBest: false,
      explanation:
        "Practitioners are expected to have a working back-of-envelope sense of IRR sensitivity without a live model. The approach: compute terminal NOI at each rent growth rate → apply exit cap → subtract debt → compute equity MOIC → triangulate to IRR. The specific decimal will vary, but a rough answer in the 10-11% / 15-16% range demonstrates the analytical competence interviewers are looking for. Deflecting to 'I need a model' signals an inability to reason about sensitivity under pressure.",
    },
  ],
  takeaway:
    "Rule of thumb: each 1% annual rent growth change moves levered IRR by roughly 2-3 points over a 5-year hold at moderate leverage (55-60% LTV). The mechanism is dual: rent growth both lifts the year-5 exit NOI (terminal value) and compounds annual distributions. At higher leverage, sensitivity amplifies; at lower leverage, it dampens. Interviewers expect a ballpark range without a model.",
  tips: [
    '1% annual rent growth over 5 years ≈ 2-3 IRR points in a moderately leveraged multifamily deal.',
    'Rent growth sensitivity amplifies with leverage: at 70% LTV, the same miss might cost 4-5 IRR points.',
    'Sensitize rent growth and exit cap simultaneously to identify the joint downside scenario.',
  ],
};
