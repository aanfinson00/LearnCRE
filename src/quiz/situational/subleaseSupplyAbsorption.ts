import type { SituationalCase } from '../../types/situational';

export const subleaseSupplyAbsorption: SituationalCase = {
  id: 'sublease-supply-absorption',
  title: 'Sublease flood — how does it reset net absorption?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A 10M SF downtown office market is running at 88% occupancy with net absorption of +150k SF/quarter. Suddenly, two major tech tenants announce right-sizing and put 600k SF of sublease space on the market at 15–20% below direct asking rents. You own a 300k SF Class-B building with two large lease expirations in 18 months.',
  data: [
    { label: 'Market inventory', value: '10M SF' },
    { label: 'Current occupancy', value: '88%' },
    { label: 'Prior net absorption', value: '+150k SF/quarter' },
    { label: 'New sublease supply', value: '600k SF at 15–20% discount' },
    { label: 'Subject expirations', value: '2 tenants, 18-month horizon' },
  ],
  question: 'What is the most accurate read of how the sublease flood affects your leasing prospects?',
  options: [
    {
      label:
        'Sublease supply competes directly with direct space and will likely flip net absorption negative — your renewals now face a 600k SF shadow market pricing 15–20% below your ask.',
      isBest: true,
      explanation:
        'Sublease space is immediate competition. Tenants shop subleases first because they price at a discount and offer shorter terms (sublessee flexibility). The 600k SF addition to available supply equals 4 quarters of prior positive absorption — enough to flip a tight market to one with meaningful excess inventory. Your Class-B building faces compounded pressure: it already competes on quality with Class-A sublease, and now price. Expect net effective rent concessions (free rent, TI) to spike as direct landlords try to close the gap with sublease pricing.',
    },
    {
      label:
        'Sublease space is leased-to-leased; it doesn\'t change the occupied base so net absorption stays positive.',
      isBest: false,
      explanation:
        'Incorrect definition. Net absorption tracks change in occupied SF in the DIRECT market, not total transfers. When sublease space is put on the market, the existing tenant is still paying rent — but when a new tenant takes the sublease, the direct market loses that user as a demand source for direct space. Sublease supply pulls demand away from the direct market, making it functionally equivalent to additional vacancy for pricing purposes.',
    },
    {
      label:
        'Only Class-A subleases matter; Class-B space competes in a different demand pool.',
      isBest: false,
      explanation:
        'Demand pools overlap more than class segmentation suggests, especially when sublease pricing is 15–20% below market. Cost-sensitive tenants already looking at Class-B will cross-shop Class-A sublease at a discount. The flight-to-quality trend in post-pandemic office markets has narrowed the class segmentation further — tenants use the sublease market to upgrade class at Class-B prices.',
    },
    {
      label:
        'Sublease supply typically gets absorbed within 6 months and is a temporary headwind.',
      isBest: false,
      explanation:
        '600k SF in a 10M SF market is 6% of inventory — not a temporary blip. Office sublease cycles have historically been multi-year clearance events, especially in markets with structural demand loss (tech downsizing, hybrid work). The 6-month assumption applies to supply shocks in tight industrial markets; in office markets with structural demand questions, model a 24–36 month clearance cycle and underwrite accordingly.',
    },
  ],
  takeaway:
    'Sublease supply is shadow vacancy — it competes directly with your direct space while not showing up in the official vacancy rate. When underwriting office with upcoming lease rolls, always separate direct vacancy from total available (direct + sublease) and re-price your rent assumptions against the sublease comp, not just the direct comp.',
  tips: [
    'Total available = direct vacant + sublease available; this is the real competitive set for a tenant.',
    'Sublease pricing at 15–20% below direct usually signals 12–18 months of leasing drag on direct rents.',
    'Class-B buildings face the worst sublease competition — they already trade on price, and subleases add discount to that value prop.',
  ],
};
