import type { SituationalCase } from '../../types/situational';

export const compQualityAdjustment: SituationalCase = {
  id: 'comp-quality-adjustment',
  title: "Your best comp is Class-A but you're buying Class-B — how do you adjust?",
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You're bidding on a 120,000 SF Class-B suburban office, built in 1998 and renovated in 2015. The two most recent comparable sales in the submarket are: Comp 1 — a 95,000 SF Class-A trophy built in 2018, traded at a 5.1% cap; and Comp 2 — an 80,000 SF Class-B built in 2002 and renovated in 2019, traded at a 6.2% cap.",
  data: [
    { label: 'Subject', value: 'Class-B, 120k SF, built 1998, reno 2015' },
    { label: 'Comp 1', value: 'Class-A trophy, 95k SF, built 2018 — 5.1% cap' },
    { label: 'Comp 2', value: 'Class-B, 80k SF, built 2002, reno 2019 — 6.2% cap' },
  ],
  question: 'Which comp should anchor your underwriting and how do you handle the other?',
  options: [
    {
      label:
        "Anchor on Comp 2 (Class-B, 6.2% cap) as the quality-matched proxy; apply a modest widening adjustment (10-20 bps) for the subject's older renovation (2015 vs. 2019). This places the subject at 6.3-6.4%. Use Comp 1 as directional context only — the Class-A quality premium is too large to bridge without a documented, substantial basis.",
      isBest: true,
      explanation:
        "Comp selection prioritizes quality class over recency because quality class reflects buyer pool and risk profile. Comp 1 is a Class-A trophy — different buyer universe (institutional core capital), tighter cap rates due to covenant strength and LEED certification premiums, and lower vacancy risk. Applying its 5.1% cap to a Class-B would overstate value by roughly 15-20%. Comp 2 is the correct anchor: same product class, similar age bracket, nearby renovation vintage. The only adjustment: the subject's 2015 renovation is 4 years older than Comp 2's 2019 renovation. A 10-20 bps widening for renovation age is defensible, placing the subject at 6.3-6.4%. Note explicitly in the IC memo that Comp 1 is not usable as a pricing anchor.",
    },
    {
      label:
        "Average both comps — 5.65% is the best central estimate of market cap rates.",
      isBest: false,
      explanation:
        "Averaging a Class-A and Class-B trade conflates two distinct quality buckets with different buyer pools, risk profiles, and cap rate drivers. The 110 bps spread between them (5.1-6.2%) is real — it represents the quality premium, not noise. An average of 5.65% for a Class-B asset would overstate value by roughly 8-10% versus the most directly comparable transaction. Underbidding is a risk; overbidding at a distorted cap rate is worse.",
    },
    {
      label:
        "Use Comp 1 as the primary anchor — it's newer, larger, and more representative of the quality of the buyer pool in this submarket.",
      isBest: false,
      explanation:
        "Recency and size do not override quality class in comp selection. Comp 1 is the wrong quality bucket. Core-grade Class-A office attracts institutional core buyers at sub-6% cap rates; Class-B attracts value-add and merchant-developer buyers at wider cap rates. Pricing a Class-B at a Class-A cap is a systematic overvaluation. A buyer using 5.1% for this asset and an IC applying 6.2% would be 15% apart — that's not a marginal error.",
    },
    {
      label:
        "Neither comp is usable — expand the geographic search until you find a Class-B, 1998-vintage asset with a 2015 renovation.",
      isBest: false,
      explanation:
        "Waiting for a perfect comp is a recipe for analysis paralysis. Comp 2 is directly usable with a single, defensible, well-documented adjustment (renovation vintage). The geographic expansion introduces submarket-level differences (supply/demand dynamics, tenant mix) that may be harder to bridge than the 4-year renovation age gap within the same submarket. Exhaust adjustable local comps before widening geography.",
    },
  ],
  takeaway:
    'Quality class is the primary comp filter — it determines buyer pool and cap rate environment. Class-A and Class-B office trade at materially different cap rates (80-150 bps spread is typical). Average the two only if you can document a specific quality adjustment; otherwise use the quality-matched comp as the anchor and the Class-A as directional context only.',
  tips: [
    'Class-A vs Class-B cap spread: typically 80-150 bps in most markets — never average across quality classes without a documented adjustment.',
    'Renovation recency is a secondary adjustment: older reno = wider cap by 10-20 bps per 3-5 year gap.',
    'Document all comp adjustments explicitly in the IC memo — undocumented adjustments are red flags in IC review.',
  ],
};
