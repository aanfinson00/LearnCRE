import type { SituationalCase } from '../../types/situational';

export const compSelectionRenovationAdjustment: SituationalCase = {
  id: 'comp-selection-renovation-adjustment',
  title: 'How do you comp a renovated asset against unrenovated trades?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a 180-unit multifamily asset that was fully renovated 2 years ago (new kitchens, flooring, amenities — a $2.5M program, or roughly $14,000/unit). The available comp set is 3 recent trades in the same submarket, none renovated to the same standard. The comps average a 5.5% cap rate on in-place NOI.',
  data: [
    { label: 'Subject', value: '180 units, renovated 2 yrs ago, ~$14,000/unit in capex' },
    { label: 'Comp 1', value: 'Unrenovated, built same era — 5.6% cap' },
    { label: 'Comp 2', value: 'Light renovation only (paint/carpet) — 5.5% cap' },
    { label: 'Comp 3', value: 'Unrenovated — 5.4% cap' },
    { label: 'Comp average', value: '5.5% cap' },
    { label: 'Subject rent premium vs. comps (separate rent-comp analysis)', value: '+$150/unit/month' },
  ],
  question: 'How should the renovation status affect your cap rate application?',
  options: [
    {
      label:
        'Apply a cap rate modestly tighter than the 5.5% comp average (e.g., 5.25-5.35%) to reflect the subject\'s renovated condition and lower near-term capex risk — but don\'t rely on cap rate compression alone; the rent premium should already be captured directly in the subject\'s higher in-place NOI.',
      isBest: true,
      explanation:
        'Two separate effects need to be modeled, not conflated: (1) the renovated units command higher rent, which flows through NOI directly — that\'s not a cap rate adjustment, it\'s already in the numerator; (2) a renovated asset carries less near-term capex risk and a longer runway before the next reinvestment cycle, which is a legitimate reason for a buyer to accept a modestly lower cap rate (higher price per dollar of NOI) than an unrenovated comp. The adjustment should be modest — comps are already same-submarket, same-era product; a large swing (50+ bps) isn\'t supported by a $14,000/unit program.',
    },
    {
      label: 'Use the exact 5.5% comp average — cap rate is a market convention and shouldn\'t be adjusted for property-specific condition.',
      isBest: false,
      explanation:
        'Cap rate comps are a starting point, not a rule that overrides property-specific facts. Appraisers and acquisition analysts routinely adjust comp-derived cap rates for condition, capex needs, and remaining useful life — ignoring a clearly renovated asset\'s lower risk profile understates what a buyer should be willing to pay per dollar of NOI.',
    },
    {
      label: 'Since the subject has a rent premium, apply a much lower cap rate (4.75-5.0%) to reflect both the income premium and the capital improvements.',
      isBest: false,
      explanation:
        'Double-counts the renovation benefit. The rent premium already flows through the NOI (the numerator) — applying it again as a large cap rate adjustment (the denominator) counts the same improvement twice and would overvalue the asset. The cap rate adjustment should reflect only the risk/capex-timing difference, not the income difference, which is already captured elsewhere.',
    },
    {
      label: 'Discard all 3 comps since none match the subject\'s renovation status, and use a cap rate from a different submarket with more renovated trades instead.',
      isBest: false,
      explanation:
        'Trades an imperfect same-submarket comp set for a "cleaner" but geographically irrelevant one. Submarket location usually matters more to cap rate than renovation status; the better approach is to adjust the local comps for the known condition difference rather than import comps from a different location that don\'t share the subject\'s supply/demand fundamentals.',
    },
  ],
  takeaway:
    'Renovation affects value through two channels — higher NOI (captured directly in the income) and lower risk/capex timing (a modest, separate cap rate adjustment). Don\'t let one effect bleed into the other, and don\'t let a legitimate condition adjustment turn into a large, unsupported cap rate swing.',
  tips: [
    'Rent premium from renovation belongs in NOI, not in the cap rate — keep the two channels separate.',
    'A condition-based cap rate adjustment should be modest (10-25 bps) unless comps are otherwise poor matches.',
    'Same-submarket comps with a documented condition difference usually beat "cleaner" comps from a different location.',
  ],
};
