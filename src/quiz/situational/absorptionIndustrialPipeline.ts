import type { SituationalCase } from '../../types/situational';

export const absorptionIndustrialPipeline: SituationalCase = {
  id: 'absorption-industrial-pipeline',
  title: "2M SF is coming — when does the industrial market clear?",
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'industrial',
  scenario:
    "A major logistics submarket has 15M SF of total inventory currently 95% leased (750k SF vacant). A development pipeline of 2M SF is under construction, delivering in four tranches of 500k SF each — one tranche every two quarters for the next eight quarters. Net absorption has averaged 400k SF per quarter over the trailing eight quarters, but the two most recent quarters each came in at 300k SF. You're underwriting a 500k SF in-place asset in this submarket.",
  data: [
    { label: 'Current inventory', value: '15.0M SF' },
    { label: 'Current occupancy', value: '95% (750k SF vacant)' },
    { label: 'Pipeline', value: '2.0M SF (4 × 500k SF tranches, 1 per 2 quarters)' },
    { label: 'Historical absorption', value: '400k SF/quarter (trailing 8Q avg)' },
    { label: 'Recent absorption', value: '300k SF/quarter (last 2 quarters)' },
    { label: 'Stabilization target', value: 'Return to ≤5% vacancy' },
  ],
  question:
    "What is the realistic timeline for the submarket to return to ≤5% vacancy after all deliveries complete, and how should you reflect it in your underwriting?",
  options: [
    {
      label:
        "After all four tranches deliver over eight quarters, total inventory reaches 17M SF. At ≤5% vacancy, 16.15M SF must be leased — a net absorption requirement of 1.9M SF above the current 14.25M leased. At the declining pace of 300k SF/quarter, that takes roughly six more quarters after the final delivery — about 4.5 years from today. At the historical 400k SF/quarter, it's about 3.5 years. The responsible underwriting assumption is the declining trend (4–4.5 years), not the historical peak.",
      isBest: true,
      explanation:
        "The key move is to use the correct base. After all deliveries: 17M SF inventory × 95% = 16.15M needed leased; currently 14.25M leased; gap = 1.9M SF. At 300k SF/quarter: 1.9M / 300k ≈ 6.3 quarters after final delivery. Final delivery is at quarter 8; add 6.3 quarters → roughly 14–15 quarters total ≈ 3.5–4 years. The declining absorption trend is the warning signal — underwrite 4–4.5 years and stress to 5 years. Using the historical 400k peak on a declining trend is an upward-biased assumption.",
    },
    {
      label:
        "Eight quarters for delivery plus absorption at 400k SF/quarter means 2M SF absorbed in five quarters, so the market re-stabilizes around quarter 13.",
      isBest: false,
      explanation:
        "Misuses the absorption math. You can't simply absorb the pipeline in isolation; you also need to fill the new vacancy created by each tranche as it delivers. At delivery, each 500k SF tranche is empty — it adds to vacancy before it gets absorbed. The problem is that supply and absorption are happening simultaneously across eight quarters, and absorption is decelerating. The market re-stabilizes only when cumulative net absorption exceeds cumulative new supply plus existing vacancy.",
    },
    {
      label:
        "The market will self-correct quickly because the 2M SF pipeline was underwritten against current demand signals — the developers wouldn't have started construction if the math didn't work.",
      isBest: false,
      explanation:
        "Development decisions are made 18–24 months before delivery based on conditions at groundbreaking. The absorption deceleration in the last two quarters is a current signal that may not have been visible when construction started. Assuming the pipeline was correctly sized is exactly the mistake that leads to oversupplied markets.",
    },
    {
      label:
        "Model the submarket returning to 95% occupancy within two years — absorption has been strong historically and the pipeline is modest relative to total inventory.",
      isBest: false,
      explanation:
        "The pipeline at 2M SF is 13% of current inventory — that's not modest. More importantly, the recent absorption deceleration to 300k SF/quarter is the forward-looking signal that matters most. Two years (8 quarters × 300k = 2.4M SF absorbed) would barely cover the pipeline supply, let alone refill existing vacancy. That's an optimistic case, not the base case.",
    },
  ],
  takeaway:
    "Industrial absorption analysis requires modeling the combined effect of pipeline deliveries and declining absorption rates, not just one in isolation. Start with the post-pipeline inventory base, calculate how many SF must be leased to hit the target vacancy rate, then divide by the prevailing absorption pace — and use the current trend, not the historical peak. When absorption is decelerating, the responsible move is to underwrite at trend and stress to the downside.",
  tips: [
    "Formula: quarters to re-stabilize = (target leased − current leased) ÷ absorption pace per quarter. Recalculate after each delivery tranche.",
    "Absorption deceleration in back-to-back quarters is an early warning signal — weight it more than the trailing 8-quarter average.",
    "Industrial pipeline-to-inventory ratios >10% typically correspond to 18–36 months of supply pressure; >15% is a meaningful oversupply risk.",
  ],
};
