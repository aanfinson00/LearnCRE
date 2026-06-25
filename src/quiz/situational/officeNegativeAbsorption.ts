import type { SituationalCase } from '../../types/situational';

export const officeNegativeAbsorption: SituationalCase = {
  id: 'office-negative-absorption',
  title: 'The submarket posted negative absorption — how does that change your underwriting?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    'You\'re underwriting an office acquisition in a CBD submarket that reported −150,000 SF of net absorption last quarter. The target building is 88% leased with two tenants (combined 45,000 SF, 32% of the building) rolling within 18 months. Current asking rents in the building are $42/SF gross; a competing landlord just slashed asking rent to $38/SF to attract tenants.',
  data: [
    { label: 'Submarket net absorption (last quarter)', value: '−150,000 SF' },
    { label: 'Subject building occupancy', value: '88%' },
    { label: 'Near-term rollover (18 mo)', value: '45,000 SF (32% of building)' },
    { label: 'Subject asking rent', value: '$42/SF gross' },
    { label: 'Competing landlord new ask', value: '$38/SF gross' },
  ],
  question: 'How should the negative-absorption signal change your underwriting assumptions?',
  options: [
    {
      label:
        'Extend downtime to 12–18 months per rollover, mark market rent down to $38–40/SF, and run a sensitivity scenario at 75–80% occupancy through the rollover window. Negative absorption means tenants are contracting, not expanding — backfill cannot be assumed.',
      isBest: true,
      explanation:
        "Negative net absorption is a signal that tenants are giving back more space than they\'re taking. In that environment: (1) market rent must move down — competition for tenants is intensifying, so your $42 ask is above what your competitor is offering; (2) downtime is longer because fewer tenants are actively seeking space; (3) retention is weaker because even existing tenants may be downsizing. Model the rollover conservatively: 12–18 months dark per space, $38–40 in-place rent on renewal or backfill, and stress the occupancy through the whole window.",
    },
    {
      label:
        'Treat it as noise — single-quarter absorption figures are volatile and will mean-revert in a healthy market.',
      isBest: false,
      explanation:
        "Single-quarter data is noisy, but the context here includes two concurrent warning signs: a competitor actively cutting rents, and a building already operating below full occupancy with near-term rollover. When the data point is corroborated by observed market behavior, it is not noise. Dismissing it without investigation is a failure of diligence, not analytical discipline.",
    },
    {
      label:
        'Stress only the exit cap by 50 bps to compensate — the operating income side is already contracted for 18 months so no operating adjustments are needed.',
      isBest: false,
      explanation:
        "The contracted leases only protect income through the roll; they do not protect against the risk that the 32% rolling space goes dark or re-leases at below-underwriting rents. Stressing only the exit cap addresses the value-at-exit but not the operating cash flow through the hold, which can impair debt service coverage and distributions. Both sides require adjustment.",
    },
    {
      label:
        'Widen the going-in cap by 50 bps in the acquisition bid to reflect market risk and leave all forward operating assumptions unchanged.',
      isBest: false,
      explanation:
        "Pricing the risk into the going-in cap adjusts your entry price but does not reflect the true forward cash-flow risk in the proforma. A lender, LP IC, or co-investor will want to see that the operating assumptions are stress-tested, not just the entry price. A discounted entry on optimistic forward assumptions is still an optimistic underwrite.",
    },
  ],
  takeaway:
    'Negative submarket absorption is not just a backward-looking stat — it signals supply-demand dynamics that will affect backfill velocity, market rent, and tenant negotiating leverage. When absorption turns negative, rebuild your rollover assumptions conservatively: longer downtime, market rent below current asking, and an occupancy stress scenario through the roll. Corroborating signals (competitor rent cuts, rising availability) make the case stronger.',
  tips: [
    'Trailing four quarters of absorption is more reliable than a single quarter — check whether Q1 is part of a trend.',
    'Negative absorption in office often precedes rising concessions (TIs, free rent) by 6–12 months.',
    'Ask: is the competition undercutting on rent, TIs, or both? Each implies different re-leasing cost.',
  ],
};
