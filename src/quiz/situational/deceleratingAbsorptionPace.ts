import type { SituationalCase } from '../../types/situational';

export const deceleratingAbsorptionPace: SituationalCase = {
  id: 'decelerating-absorption-pace',
  title: 'Absorption is decelerating — which pace do you use?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a multifamily lease-up project. The submarket absorption data shows a clear deceleration: 200 units/month two years ago, 150 units/month one year ago, and 100 units/month over the last two quarters. Your project delivers 350 units. You need to select an absorption assumption for your lease-up proforma.",
  data: [
    { label: 'Absorption (2 yrs ago)', value: '200 units/month' },
    { label: 'Absorption (1 yr ago)', value: '150 units/month' },
    { label: 'Absorption (last 2 qtrs)', value: '100 units/month' },
    { label: 'Project size', value: '350 units' },
    { label: 'Target occupancy', value: '95% stabilized' },
  ],
  question: 'Which absorption pace should anchor your lease-up underwriting?',
  options: [
    {
      label: "Use the current 100 units/month as your base case and stress-test at 70–80 — a decelerating trend is directional evidence, and using the trailing average embeds a reversal you haven't earned yet.",
      isBest: true,
      explanation:
        "The trend in absorption is as important as the level. When absorption has decelerated from 200 → 150 → 100, the next data point is unlikely to spike back without a named demand catalyst. Using the 3-year average (150/month) would embed a mid-cycle recovery that isn't in the data. The correct anchor is the most recent pace (100/month), with a stress case at 70–80/month modeling continued deceleration. At 100/month and 350 units targeting 95% leased (≈333 units): base-case lease-up takes roughly 3–4 months, but in a decelerating market, concurrent new supply deliveries and rising concessions often stretch that to 6–8 months. Model it, then stress it. Also check whether face rents are holding or concessions are rising — concession inflation typically precedes face-rent cuts.",
    },
    {
      label: 'Use the 3-year average of 150 units/month — averages smooth volatility and are more defensible to lenders.',
      isBest: false,
      explanation:
        "Averaging a decelerating trend produces a number that overestimates current demand. 150 units/month is only achievable today if the trend has bottomed and reversed — and the data doesn't support that. Lenders do ask for representative periods, but a 3-year average during a clearly decelerating cycle embeds a bullish reversal not in evidence. A development lender will likely stress your assumption; give them your own downside analysis proactively.",
    },
    {
      label: "Use 200 units/month — that's what the submarket has proven it can absorb at peak.",
      isBest: false,
      explanation:
        "200 units/month is the cycle peak, not the baseline. Using peak absorption to underwrite a deal delivering into a decelerating environment is exactly the optimism bias that creates bad outcomes. The submarket 'proved' 200/month during conditions that have since reversed. Model what's happening now, not what happened at the top.",
    },
    {
      label: "Absorption pace doesn't drive your outcome — focus on relative product competitiveness, which determines your market share regardless of overall conditions.",
      isBest: false,
      explanation:
        "Product quality matters at the margin but not independently of market conditions. Even the best product leases up more slowly when submarket absorption is declining — there are fewer tenants shopping. The market absorbs all new deliveries collectively; your project takes a share of that total flow. Higher quality = higher share of a shrinking pool, but the total demand is constrained by the market.",
    },
  ],
  takeaway:
    "When absorption is decelerating, anchor to the most recent pace — not the multi-year average. The trend is the signal. Base case = current velocity; downside = trend continuation at 20–30% lower. Separately evaluate whether rent levels can hold or whether concessions will be required to hit even the current absorption pace. Never use peak-cycle absorption to underwrite a delivery into a softening market.",
  tips: [
    'Decelerating market: base case = current pace; downside = continuation at 20–30% lower.',
    'Track concessions separately from face rent — concession increases typically precede face-rent cuts.',
    'Development lenders will stress your absorption; pre-empt with your own downside scenario.',
  ],
};
