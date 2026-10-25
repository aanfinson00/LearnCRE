import type { SituationalCase } from '../../types/situational';

export const officeSubleaseShadowSupply: SituationalCase = {
  id: 'office-sublease-shadow-supply',
  title: 'Is the submarket really 14% vacant?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'office',
  scenario:
    'A 10M SF office submarket reports 14% direct vacancy. Another 400,000 SF of space is being marketed for sublease by tenants who are downsizing but still paying rent, so it doesn\'t show up in direct vacancy. Net absorption has been 200,000 SF per year. You\'re estimating how long before the market tightens.',
  data: [
    { label: 'Submarket inventory', value: '10M SF' },
    { label: 'Direct vacancy', value: '14% (1.4M SF)' },
    { label: 'Sublease space', value: '0.4M SF' },
    { label: 'Net absorption', value: '200,000 SF/yr' },
  ],
  question: 'How long does it really take to absorb the available space?',
  options: [
    {
      label: 'About 9 years — competitive availability is 1.8M SF (18%), because sublease space competes with your landlord\'s space for the same tenants.',
      isBest: true,
      explanation:
        'Direct plus sublease = 1.4M + 0.4M = 1.8M SF. At 200k SF/yr that is 9 years, not the 7 years the direct vacancy implies. Sublease space is often discounted and ready to occupy, so it wins deals first and caps rent growth on direct space.',
    },
    {
      label: 'About 7 years — 1.4M SF ÷ 200k SF/yr, since sublease space is still leased.',
      isBest: false,
      explanation:
        'Sublease space is leased to the original tenant, but it is still available to new occupiers. It competes for deals, so it belongs in the supply picture.',
    },
    {
      label: 'About 2 years — absorption of 200k SF/yr clears the 400k SF of sublease quickly.',
      isBest: false,
      explanation:
        'Misreads the question. Sublease space competes alongside direct vacancy; it doesn\'t have to be absorbed before everything else.',
    },
    {
      label: 'Can\'t be estimated without knowing the lease expiration schedule.',
      isBest: false,
      explanation:
        'Expirations refine the timeline, but a first-pass absorption estimate comes from the available space and the trailing pace.',
    },
  ],
  takeaway:
    'Availability, not direct vacancy, is the right supply measure for absorption timing. Sublease space is shadow supply that competes for the same tenants, often at a discount.',
  tips: [
    'Availability = direct vacancy + sublease.',
    'Sublease space is usually discounted and capped by the remaining term.',
    'Years of supply = availability ÷ annual net absorption.',
  ],
};
