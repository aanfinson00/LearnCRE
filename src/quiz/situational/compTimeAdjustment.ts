import type { SituationalCase } from '../../types/situational';

export const compTimeAdjustment: SituationalCase = {
  id: 'comp-time-adjustment',
  title: 'How do you bridge a 15-month-old comp to today?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a 200-unit multifamily acquisition and have three sales comps from the same submarket: Comp A (10 months old, $210k/unit, 5.2% cap), Comp B (15 months old, $225k/unit, 4.9% cap), and Comp C (3 months old, $195k/unit, 5.6% cap). Cap rates in the submarket have expanded approximately 50 bps over the past 15 months.",
  data: [
    { label: 'Comp A', value: '10 months old — $210k/unit, 5.2% cap' },
    { label: 'Comp B', value: '15 months old — $225k/unit, 4.9% cap' },
    { label: 'Comp C', value: '3 months old — $195k/unit, 5.6% cap' },
    { label: 'Submarket cap rate movement', value: '+50 bps over past 15 months' },
  ],
  question: "How should you use these comps to arrive at today's defensible pricing?",
  options: [
    {
      label:
        "Weight Comp C most heavily as the cleanest recent data point; time-adjust Comps A and B for the cap expansion and use them as corroborating checks. Best estimate: $195-$205k/unit, anchored by Comp C at $195k and the adjusted Comp B at ~$204k.",
      isBest: true,
      explanation:
        "Time adjustments are required, not optional, when cap rates are moving. Comp B's 4.9% cap traded 15 months ago — before the 50 bps expansion. Adjustment: Comp B implied NOI = $225k × 4.9% = ~$11k/unit. At today's cap (4.9% + 50 bps = 5.4%), same NOI implies $11k / 5.4% = $204k/unit. Comp A adjustment: 10 months × (50 bps / 15 months) ≈ 33 bps; adjusted cap = 5.2% + 0.33% = 5.53%; adjusted value = $210k × 5.2% / 5.53% = ~$198k. All three adjusted values converge at $195-$205k/unit. Comp C at $195k is the cleanest; adjusted A (~$198k) and B (~$204k) bracket the range. Anchoring at the midpoint ($195-$205k) is defensible.",
    },
    {
      label:
        "Average all three comps as-is — $210k average gives the best central tendency.",
      isBest: false,
      explanation:
        "Averaging unadjusted comps in a rising-rate environment embeds stale pricing. The unweighted average of $210k is ~$10k above the adjusted range of $195-$205k. A bid underwritten at $210k with a 5.6% market exit cap requires $11.76k/unit NOI to break even — roughly 7% above what recent transactions imply. That's a meaningful error that compounds over a 5-year hold.",
    },
    {
      label:
        "Only use Comp C — it's the only truly current, clean data point worth anchoring.",
      isBest: false,
      explanation:
        "A sample size of 1 is insufficient to support a pricing conclusion. Comps A and B contain useful information — they just need time adjustments. After adjustment, A and B converge at $198k and $204k, which corroborates Comp C at $195k. Three adjusted data points that converge provide more confidence than one unadjusted single trade. The principle isn't 'use only perfect comps' — it's 'use comps you can bridge from observed price to subject value.'",
    },
    {
      label:
        "Discard all comps older than 6 months in a rising-rate environment.",
      isBest: false,
      explanation:
        "Discarding usable data rather than adjusting it wastes information. Stale comps aren't irrelevant — they're data with a known adjustment required. A documented time adjustment (delta cap rate × implied NOI) is more reliable than no data at all. If you discard Comps A and B, you have only Comp C — a single trade that doesn't allow triangulation. Three adjusted comps that converge is always more defensible than one.",
    },
  ],
  takeaway:
    'Stale comps require time adjustments, not discards. In a moving-rate environment, apply the documented cap rate change as: adjusted value = (comp cap rate × comp price) / current cap rate. Three adjusted comps that converge around a tight range give more pricing confidence than one unadjusted current comp.',
  tips: [
    'Time adjustment formula: (comp implied NOI) ÷ (comp cap + cap delta for the period) = adjusted value.',
    'Pro-rate cap movement by months: if submarket moved 50 bps over 15 months, apply 50 × (months elapsed / 15) per comp.',
    'Convergence of 2-3 adjusted comps to a tight range is the signal to anchor pricing with confidence.',
  ],
};
