import type { SituationalCase } from '../../types/situational';

export const leaseRenewalVsReplace: SituationalCase = {
  id: 'lease-renewal-vs-replace',
  title: 'Renew below market or roll the dice on a replacement tenant?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You own a 50,000 SF office building. Your anchor tenant (30,000 SF, 60% of the building) wants to renew early at $28/SF for 5 more years — below the current market rent of $33/SF. If you reject the renewal, they\'ll vacate in 12 months. Replacing them at market: TI budget = $50/SF ($1.5M), 6–9 months of free rent, and estimated downtime of 12–18 months to find and sign a replacement. Current in-place rent from the tenant is $25/SF.',
  data: [
    { label: 'Tenant space', value: '30,000 SF (60% of building)' },
    { label: 'Renewal offer', value: '$28/SF · 5-year term' },
    { label: 'Market rent', value: '$33/SF' },
    { label: 'Replacement TI', value: '$50/SF ($1.5M)' },
    { label: 'Free rent (replacement)', value: '6–9 months' },
    { label: 'Downtime estimate', value: '12–18 months' },
    { label: 'In-place rent', value: '$25/SF' },
  ],
  question: 'How do you analyze the renewal vs. replacement decision?',
  options: [
    {
      label: 'Renew at $28/SF is almost certainly the better NPV decision. The replacement path (TI + downtime + free rent) likely costs $2.0–2.5M+ to capture a $5/SF annual rent uplift worth $150k/yr ($750k over 5 years). The math doesn\'t work — retention wins.',
      isBest: true,
      explanation:
        'This is an NPV problem, not a rent-rate problem. The rent upside of replacing is $5/SF × 30,000 SF × 5 years = $750k (before leasing commissions). The cost of replacing: $1.5M TI + ~$750k of forgone rent during 12 months of downtime + $200k+ in leasing commissions = $2.4M+ in costs. The replacement path costs roughly 3x the rent upside in NPV terms. Renew at $28 — still $3/SF above in-place — and preserve occupancy. The only scenario where replacement wins: rent gap is much larger (20%+), the downtime is much shorter, or TI is much lower. None of those apply here.',
    },
    {
      label: 'Reject the renewal — always push anchor tenants to market rent or replace them.',
      isBest: false,
      explanation:
        '"Always push to market" is a rent-maximization principle, not a value-maximization principle. For anchor tenants (60% of building), the downtime cost of a vacancy is catastrophic to NOI and asset value. The relevant question is whether the NPV of the rent uplift exceeds the re-leasing cost. In this scenario it doesn\'t.',
    },
    {
      label: 'Counter-propose $31/SF — split the difference and the tenant stays.',
      isBest: false,
      explanation:
        'A split-the-difference counter has no analytical basis until you\'ve run the NPV math. If $28 is already the right economic decision, counter-proposing at $31 risks losing the tenant for a $90k/yr improvement — less than 4% of the renewal value. Determine whether you can afford to push before naming a counter.',
    },
    {
      label: 'Replace the tenant — $33/SF market rent will improve the building\'s cap-rate valuation.',
      isBest: false,
      explanation:
        'Cap-rate valuation applies to stabilized NOI. During the 12–18 months of downtime, the building runs at 40% occupancy — which tanks current NOI and cash flow. The cap-rate benefit of higher in-place rent only materializes at re-stabilization, and the cost to get there likely exceeds the NPV gain. Model the full hold-period cash flows, including the downtime, TI, and free-rent burn.',
    },
  ],
  takeaway:
    'Anchor-tenant renewal decisions require NPV analysis, not rent-rate comparisons. The framework: (a) renewal cash flows over the term vs. (b) replacement cash flows including vacancy, TI, free rent, and leasing commissions. Anchor tenants (>30–40% of GLA) almost always have a retention bias because the downtime cost is prohibitive relative to the rent gap. Smaller tenants at larger below-market spreads can have a different NPV outcome — run the numbers each time.',
  tips: [
    'Net uplift: (market rent − renewal rent) × SF × years. Replacement cost: TI + downtime × in-place rent + leasing commissions.',
    'When replacement cost > 3× rent uplift NPV, retention is almost always correct.',
    'An anchor below-market by <20% is usually not worth replacing — a 40%+ gap changes the math.',
  ],
};
