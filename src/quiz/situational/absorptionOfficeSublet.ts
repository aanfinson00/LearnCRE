import type { SituationalCase } from '../../types/situational';

export const absorptionOfficeSublet: SituationalCase = {
  id: 'absorption-office-sublet',
  title: 'How much does shadow supply slow the lease-up?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    'A 150,000 SF Class-B office building is currently 70% occupied. You are underwriting a 5-year hold and modeling a stabilization path to 90%. The submarket has posted 30,000 SF of net positive absorption per year over the trailing 3 years, but a large tenant in a nearby tower recently vacated and put 80,000 SF of sublet space on the market at a 15% discount to direct asking rents. Sublet supply typically competes directly with Class-B direct space.',
  data: [
    { label: 'Subject building size', value: '150,000 SF' },
    { label: 'Current occupancy', value: '70% (105,000 SF occupied)' },
    { label: 'Stabilization target', value: '90%' },
    { label: 'Submarket net absorption', value: '30,000 SF/yr (trailing 3 yrs)' },
    { label: 'New sublet competition', value: '80,000 SF at -15% rent discount' },
  ],
  question: 'How should the shadow supply change your stabilization timeline?',
  options: [
    {
      label: 'Extend the stabilization period meaningfully — shadow supply at a rent discount competes directly for the same tenants, effectively suppressing the submarket absorption rate available to your building until the sublet is cleared.',
      isBest: true,
      explanation:
        'Net absorption of 30,000 SF/yr reflects supply and demand in balance before the sublet hit. The 80,000 SF of new discounted sublet represents ~2.7 years of equivalent absorption at the trailing pace, competing with your 45,000 SF of vacant space for the same tenants. Expect either a longer stabilization runway (3–5 years vs. 1.5), a rent concession, or both. A stress case of 4–5 years to 90% with flat rents is more defensible than the base 1.5-year timeline.',
    },
    {
      label: 'Ignore the sublet — it\'s not direct competition since it\'s in a different building.',
      isBest: false,
      explanation:
        'Sublet space in the same submarket is shadow supply that directly competes for the same tenant demand. Tenants don\'t care whether they occupy direct or sublet space — they compare economics. A 15% rent discount on sublet space pulls tenants away from direct vacancies like yours until the sublet clears.',
    },
    {
      label: 'Underwrite the sublet burn-down in 6 months — sublet deals close faster because landlords don\'t need to negotiate.',
      isBest: false,
      explanation:
        'Sublet deals can close faster for small spaces, but 80,000 SF of sublet typically requires large-block tenants who negotiate slowly. Speed of execution on sublet doesn\'t offset the volume of shadow supply — the question is how long the sublet competes with your direct space, not just how fast individual deals close.',
    },
    {
      label: 'Accelerate the pro forma — tenants will prefer your direct space because sublet leases carry sublessee risk.',
      isBest: false,
      explanation:
        'Some tenants prefer direct leases, but a 15% rent discount materially narrows that preference. For a cost-sensitive tenant, the sublessee risk is a negotiating chip, not a deal-killer. Anchoring to "direct lease preference" without a rent concession of your own is wishful underwriting in a shadow-supply environment.',
    },
  ],
  takeaway:
    'Shadow supply (sublet space at a discount) directly competes with Class-B direct vacancies and can materially extend stabilization timelines. When sizing shadow supply, convert it to "years of absorption" at the trailing pace — that tells you how long the headwind lasts. Stress your lease-up timeline by that duration.',
  tips: [
    'Shadow supply years = sublet SF ÷ trailing submarket net absorption (SF/yr).',
    'Sublet at >10% discount to direct rents effectively suppresses direct asking rents.',
    'If shadow supply is large relative to absorption, model a rent concession rather than just a longer timeline.',
  ],
};
