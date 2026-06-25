import type { SituationalCase } from '../../types/situational';

export const specIndustrialLeaseUp: SituationalCase = {
  id: 'spec-industrial-lease-up',
  title: 'How long before this spec industrial park stabilizes?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'A developer just delivered 500,000 SF of spec industrial in a major distribution submarket. The submarket has 5,000,000 SF of existing inventory at 90% occupancy. Net absorption ran at 250,000 SF per year over the trailing 4 quarters. No additional spec deliveries are expected within the next 12 months.',
  data: [
    { label: 'Existing submarket inventory', value: '5,000,000 SF' },
    { label: 'Current occupancy', value: '90%' },
    { label: 'New spec delivery', value: '+500,000 SF (just completed)' },
    { label: 'Pipeline (next 12 mo)', value: 'None' },
    { label: 'Trailing annual net absorption', value: '250,000 SF/yr' },
    { label: 'Stabilization target', value: '95% occupancy' },
  ],
  question: 'How long until the submarket reaches 95% occupancy?',
  options: [
    {
      label:
        'About 3 years — new total is 5.5M SF; 95% target is 5.225M leased; currently 4.5M leased, so you need 725,000 SF of net absorption at 250,000 SF/yr.',
      isBest: true,
      explanation:
        'Step through the math: existing leased SF = 5,000,000 × 0.90 = 4,500,000. New total inventory = 5,500,000. Target at 95% = 5,225,000 SF leased. Net to absorb = 725,000 SF. At 250,000 SF/yr trailing pace: 725,000 / 250,000 = 2.9 years ≈ 3 years. The trap is ignoring the existing vacancy and anchoring only on the 500k new delivery. Both the new supply and the existing vacant SF must be absorbed to hit the 95% target.',
    },
    {
      label:
        'About 2 years — the 500,000 SF new delivery is the only supply to absorb at 250,000 SF/yr.',
      isBest: false,
      explanation:
        "This only absorbs the new delivery (500,000 / 250,000 = 2 years) and ignores the existing vacancy. At 90% occupancy on 5M SF, 500,000 SF is already vacant. That existing gap must also be closed before the combined base hits 95%. Forgetting the starting vacancy is the most common mistake in stabilization-timing math.",
    },
    {
      label:
        'About 6 months — industrial demand is exceptionally strong and a 250,000 SF/yr pace will accelerate to clear the new supply quickly.',
      isBest: false,
      explanation:
        "Wishful hand-waving. Trailing absorption is the best evidence of forward pace absent a specific demand catalyst. Even if you assume acceleration, you still need a quantitative argument. 250,000 SF/yr is the anchor; optimize from there with named demand signals, don't substitute optimism for math.",
    },
    {
      label:
        'Impossible to say without knowing the specific tenants currently in the market for space.',
      isBest: false,
      explanation:
        "Demand intelligence is useful for refinement but the question asks for the best estimate from available data. Submarket absorption pace is the correct anchor for stabilization timing. 'I need more data before I can estimate' is a deflection, not an answer — give the estimate and flag the uncertainty explicitly.",
    },
  ],
  takeaway:
    'Stabilization timing = (target leased SF − current leased SF) ÷ absorption pace. Always recompute the inventory denominator to include all deliveries before applying the target occupancy %. Anchoring only on new supply ignores the existing vacancy gap and will produce a systematically optimistic timeline.',
  tips: [
    'Existing leased SF = current inventory × current occupancy rate (not the new base).',
    'If absorption has been declining quarter-over-quarter, haircut the trailing pace before projecting.',
    'For development underwriting, sensitivity-test stabilization timing at 75% and 50% of the trailing absorption pace.',
  ],
};
