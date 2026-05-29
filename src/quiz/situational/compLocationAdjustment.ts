import type { SituationalCase } from '../../types/situational';

export const compLocationAdjustment: SituationalCase = {
  id: 'comp-location-adjustment',
  title: 'Your only comps are in a secondary submarket',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You're pricing a 45,000 SF Class-B office building in a primary CBD submarket. Comparable trades in the CBD over the past 12 months are sparse — only one usable sale (6.5% cap, similar quality). Your broker supplements with three recent trades from a secondary suburban submarket 8 miles away at 7.25–7.50% caps. The suburban trades are similar in size, vintage, and quality.",
  data: [
    { label: 'Subject', value: 'CBD Class-B, 45K SF' },
    { label: 'CBD comp (only 1)', value: '6.5% cap — 10 months ago' },
    { label: 'Suburban comps (3)', value: '7.25–7.50% cap — 3–9 months ago' },
    { label: 'Location delta', value: 'CBD vs. secondary suburban (8 miles)' },
  ],
  question: 'How do you handle the location mismatch in the comp set?',
  options: [
    {
      label: 'Anchor to the CBD comp (6.5%) as the primary data point, use the suburban comps directionally to bracket the range, and document a 50–75 bps location premium for CBD over secondary suburban. Land at 6.25–6.50% for the subject.',
      isBest: true,
      explanation:
        "Location is the most defensible adjustment in comp analysis because it reflects a fundamentally different buyer pool and risk profile. CBD assets trade tighter than secondary suburban because of liquidity (more buyers), demand depth, and often lower vacancy risk. The single CBD comp is the closest analog even though the sample is thin. The suburban comps confirm the directional spread (CBD trades 50–75 bps tighter than secondary suburban historically in most markets). Using suburban comps to validate the location spread — not to set the cap — is the right methodology.",
    },
    {
      label: "Average all four comps, then apply a 25 bps tightening for CBD vs. suburban.",
      isBest: false,
      explanation:
        "Averaging across materially different locations dilutes the primary signal. With three suburban comps and one CBD comp, the average is pulled significantly toward suburban pricing (~7.0%), and a 25 bps adjustment only brings it to 6.75% — 25 bps wide of the only directly comparable trade. The location premium is typically 50–100 bps, not 25 bps. Averaging across submarkets requires larger documented adjustments.",
    },
    {
      label: "Discard the suburban comps entirely — they're in a different submarket, so they're unusable.",
      isBest: false,
      explanation:
        "Off-submarket comps are less reliable but not useless. They bracket the pricing range, confirm quality-to-cap-rate relationships, and provide a base if you document the location adjustment. A sample of 1 CBD trade with no secondary data is thin. The right answer is to use the suburban comps for context while clearly disclosing the adjustment rationale.",
    },
    {
      label: "Use only the suburban comps — more recent trades are more reliable than a single 10-month-old CBD comp.",
      isBest: false,
      explanation:
        "Recency matters but location matters more. A 10-month-old CBD comp in a stable rate environment is more relevant than a suburban comp at any age. If rates have moved in the past 10 months, apply a time adjustment to the CBD comp — but don't substitute a different location just because you have a larger sample.",
    },
  ],
  takeaway:
    "When the comp set has location mismatch, the primary submarket anchor (even if a single trade) carries more weight than a larger sample from a secondary submarket. Document the location premium explicitly — typically 50–100 bps CBD vs. secondary suburban — and use the off-location comps to validate the spread, not to reset the cap.",
  tips: [
    'Location premium: CBD vs. secondary suburban is typically 50–100 bps for office; document which end of the range and why.',
    'A thin primary-market sample beats a thick secondary-market sample; adjust, don\'t substitute.',
    'Always disclose comp set limitations explicitly — thin samples narrow your defensible pricing range.',
  ],
};
