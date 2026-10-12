import type { SituationalCase } from '../../types/situational';

export const leaseEffectiveRentComparison: SituationalCase = {
  id: 'lease-effective-rent-comparison',
  title: 'Two offers, same face rent?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A 10,000 SF suite has two competing 10-year offers. Offer A: $40/SF NNN, 6 months free rent, $60/SF TI. Offer B: $36/SF NNN, 3 months free rent, $30/SF TI. Both tenants have similar credit and no early termination rights.',
  data: [
    { label: 'Offer A', value: '$40 face · 6 mo free · $60 TI' },
    { label: 'Offer B', value: '$36 face · 3 mo free · $30 TI' },
    { label: 'Term', value: '10 years each' },
    { label: 'Credit', value: 'Comparable' },
  ],
  question: 'Which offer is better for the landlord, and why?',
  options: [
    {
      label: 'Offer B — undiscounted net effective rents are nearly identical (~$32.0 vs ~$32.1), but B puts far less capital at risk up front.',
      isBest: true,
      explanation:
        'A: 40 × 9.5 yrs = 380, less 60 TI = 320 → $32.0/SF/yr. B: 36 × 9.75 = 351, less 30 TI = 321 → $32.1/SF/yr. With a tie on nominal effective rent, the discounted view favors B: A\'s extra $30/SF of TI and extra 3 months of free rent are front-loaded costs while the higher rent arrives later.',
    },
    {
      label: 'Offer A — the $40 face rent is higher.',
      isBest: false,
      explanation:
        'Face rent ignores concessions. Net of free rent and TI, A isn\'t higher.',
    },
    {
      label: 'Offer A — more free rent shows the tenant values the space more.',
      isBest: false,
      explanation:
        'Free rent is a cost to the landlord, not a signal of tenant value.',
    },
    {
      label: 'Offer B — lower face rent means lower risk.',
      isBest: false,
      explanation:
        'The reasoning is wrong even though the conclusion matches. Risk comes from capital at risk and timing of cash flows, not face rent.',
    },
  ],
  takeaway:
    'Compare leases on net effective rent, then on a discounted basis. Equal nominal effective rents are not equal: front-loaded concessions cost more in present value and carry more credit risk.',
  tips: [
    'Net effective = (face × paid months − TI − commissions) ÷ term.',
    'Discount at the deal\'s required return when concessions differ in timing.',
    'Unamortized TI is the first dollar lost if the tenant defaults.',
  ],
};
