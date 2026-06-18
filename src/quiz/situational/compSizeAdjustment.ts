import type { SituationalCase } from '../../types/situational';

export const compSizeAdjustment: SituationalCase = {
  id: 'comp-size-adjustment',
  title: 'Your comps are twice the size of your subject — how do you adjust?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a 60-unit Class-B multifamily building in an urban submarket. The four most recent comparable trades in the submarket are all in the 150–250 unit range. They traded at cap rates of 5.0%, 5.25%, 5.10%, and 5.30%, averaging 5.16%. The broker is using this 5.16% average as the pricing anchor for the 60-unit subject.',
  data: [
    { label: 'Subject size', value: '60 units (Class B)' },
    { label: 'Comp A', value: '180 units — 5.00% cap' },
    { label: 'Comp B', value: '220 units — 5.25% cap' },
    { label: 'Comp C', value: '160 units — 5.10% cap' },
    { label: 'Comp D', value: '250 units — 5.30% cap' },
    { label: 'Comp average', value: '5.16%' },
  ],
  question: 'How should you adjust the comp set for the size difference?',
  options: [
    {
      label: 'Apply a +25–50 bps "small building" adjustment to the comp average — smaller multifamily assets trade at wider caps due to a shallower buyer pool (fewer institutional bidders, harder to finance) and higher per-unit operating cost. The subject cap should be anchored at ~5.40–5.65%, not 5.16%.',
      isBest: true,
      explanation:
        'Multifamily pricing is strongly size-segmented. Institutional buyers (REITs, large LP funds) typically require 100+ units for operational efficiency; below that, the buyer pool thins to family offices, private syndicators, and high-net-worth individuals. Shallower buyer pools at exit = wider cap = lower price today (buyers price in the exit). Additionally, per-unit OpEx (maintenance, management fees) is higher for smaller assets, compressing NOI margins. Market convention: each "tier" smaller (say, 200+ → 100–199 → 50–99) adds approximately 25 bps to the cap. The subject needs at minimum a 25 bps and likely 40–50 bps adjustment above the large-asset comp average.',
    },
    {
      label: 'Use the comp average directly — the submarket is the same and that\'s the primary determinant.',
      isBest: false,
      explanation:
        'Submarket is one determinant; size is another. Using unadjusted large-asset comps for a small asset systematically overvalues the smaller building by 25–50 bps of cap — which translates to 5–10% of price at typical cap levels. This is one of the most common pricing errors in smaller multifamily acquisitions.',
    },
    {
      label: 'Discard all four comps and find comps closer in size before proceeding.',
      isBest: false,
      explanation:
        'Discarding all available data is rarely the right move. If there are no same-submarket same-size comps, adjusted large-asset comps are more defensible than comps from a different submarket or a different rate environment. Document the size adjustment clearly and proceed with a wider pricing range.',
    },
    {
      label: 'The size difference is irrelevant — cap rate reflects the NOI yield, not the building size.',
      isBest: false,
      explanation:
        'Cap rates embed buyer pricing, which reflects the full buyer pool and exit assumptions. The statement "cap rate reflects NOI yield not size" is true in a vacuum but ignores that buyer pool composition, financing availability, and per-unit OpEx all vary by asset size — and all affect market-clearing cap rates.',
    },
  ],
  takeaway:
    'Size is a documented adjustment factor in multifamily comps. Smaller assets trade at wider caps because of buyer pool depth, OpEx per unit, and financing access. Industry convention: +25–50 bps per size tier below 100 units vs institutional-grade large-asset comps. Document the adjustment; don\'t average it away.',
  tips: [
    'Multifamily size tiers: 200+ (institutional), 100–199 (mid-market), 50–99 (small-cap) — each tier adds ~25 bps.',
    'The buyer pool for 60 units is meaningfully shallower than 200 units — price the exit accordingly.',
    'If you can\'t find same-size comps, adjust large-asset comps; if you can\'t adjust, say why.',
  ],
};
