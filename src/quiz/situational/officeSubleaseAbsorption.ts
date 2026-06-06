import type { SituationalCase } from '../../types/situational';

export const officeSubleaseAbsorption: SituationalCase = {
  id: 'office-sublease-absorption',
  title: 'How fast does sublease space clear?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    "You're underwriting an office acquisition in a 12M SF CBD submarket. Overall vacancy is 18%, but the sublease component is 6% (720K SF) — well above the historical average of 2%. Recent quarterly net absorption has been flat at roughly 0 SF; the prior two years averaged +100K SF/quarter positive absorption. Sublease rents are running at 15–20% discounts to direct ask rents.",
  data: [
    { label: 'Total submarket', value: '12M SF' },
    { label: 'Direct vacancy', value: '12% (1,440K SF)' },
    { label: 'Sublease vacancy', value: '6% (720K SF)' },
    { label: 'Recent net absorption', value: '~0 SF/quarter' },
    { label: 'Prior cycle absorption', value: '+100K SF/quarter avg' },
    { label: 'Sublease discount to direct', value: '15–20%' },
  ],
  question: 'How should the elevated sublease share affect your absorption assumption?',
  options: [
    {
      label: "Model slower absorption and a longer recovery: sublease space competes directly with your asset at a discount and suppresses net absorption until it clears — typically taking 2–4× longer than direct vacancy to work through in a flat demand environment.",
      isBest: true,
      explanation:
        "Sublease space is a structural competitor to direct leasing. Tenants shopping the market can take sublease space at 15–20% less than direct ask, forcing direct landlords to concede or lose deals. This suppresses direct absorption and can hold flat or negative net absorption even when headline demand is stable. The historical 100K SF/quarter absorption was pre-sublease-surge; with 720K SF of discounted competition in the market, model flat-to-negative absorption until the sublease inventory is meaningfully reduced. Rule of thumb: sublease exceeding 4% of inventory signals a demand problem, not just a supply one — it often takes 2–4 years to clear under subdued demand conditions.",
    },
    {
      label: "Ignore sublease — it's not real vacancy because the sublessor still pays rent to the landlord.",
      isBest: false,
      explanation:
        "Economically incorrect. The sublessor paying base rent to the building owner does NOT mean the space is leased from the market's perspective — the space is empty and competing with direct space for actual occupants. Investors price elevated sublease as a demand risk indicator, not a neutralized factor. The building owner receives rent regardless, but the *market* sees 720K SF of competing space at a discount.",
    },
    {
      label: 'Use prior-cycle absorption (+100K SF/quarter) — sublease usually clears faster than direct because of the pricing discount.',
      isBest: false,
      explanation:
        "Reverses the causality. Yes, individual sublease deals can close faster than direct (simpler lease terms), but the quantity of sublease space to be cleared is the problem, not individual deal velocity. 720K SF at 100K SF/quarter would take 7+ quarters just to work through the excess — and that's assuming zero new sublease additions as more tenants rightsize their footprints.",
    },
    {
      label: 'Use +50K SF/quarter — a conservative midpoint between prior absorption and the current flat trend.',
      isBest: false,
      explanation:
        "Splitting the difference between two data points without examining the mechanism is not analysis. The sublease overhang is a specific, quantifiable headwind. Anchor to: how long does it take for 720K SF of below-market space to clear at current demand velocity? That math — not an arbitrary midpoint — is the basis for your absorption assumption.",
    },
  ],
  takeaway:
    "Sublease vacancy is demand-side evidence, not just supply. When sublease exceeds ~3–4% of inventory, it actively suppresses direct absorption by undercutting market rents. Model the sublease clearance period explicitly: (sublease SF) ÷ (quarterly demand pace) gives the minimum recovery runway. In your underwriting, hold flat-to-negative absorption until the sublease component drops below historical norms.",
  tips: [
    'Sublease > 4% of submarket inventory = structural demand signal; adjust absorption materially.',
    "Sublease discount to direct creates a floor on concessions — landlords can't out-price free rent against sublease.",
    'Track whether sublease inventory is growing or shrinking quarter-over-quarter; trend matters more than level.',
  ],
};
