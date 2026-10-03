import type { SituationalCase } from '../../types/situational';

export const compSaleLeaseback: SituationalCase = {
  id: 'comp-sale-leaseback',
  title: 'Is a sale-leaseback a clean comp?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'retail',
  scenario:
    'You are pricing a stabilized grocery-anchored center. One of the three nearest comps was a sale-leaseback: a regional grocer sold its own store to an investor and signed a new 20-year NNN lease at a rent set as part of the deal. It printed a 5.25% cap. The other two comps, with in-place third-party leases, traded at 6.0% and 6.25%.',
  data: [
    { label: 'Sale-leaseback comp', value: '5.25% cap, 20-yr NNN, rent set at closing' },
    { label: 'Arm\'s-length comp 1', value: '6.00% cap' },
    { label: 'Arm\'s-length comp 2', value: '6.25% cap' },
  ],
  question: 'What is the right way to use the sale-leaseback comp?',
  options: [
    {
      label: 'Treat it with caution: the seller negotiated rent and price together, so the cap rate reflects deal terms more than the market\'s view of the real estate.',
      isBest: true,
      explanation:
        'In a sale-leaseback, price and rent are set together, often with the seller trading a higher rent for a higher price. The resulting cap rate can understate or overstate what an unrelated buyer would pay for the same income stream. Anchor on the arm\'s-length comps and flag the SLB as a data point with a footnote.',
    },
    {
      label: 'Use it as the primary comp because it has the longest lease term.',
      isBest: false,
      explanation:
        'Long term is a legitimate input, but it doesn\'t offset the fact that rent and price were negotiated jointly with the seller.',
    },
    {
      label: 'Exclude it entirely and never mention it.',
      isBest: false,
      explanation:
        'Hiding data points undermines credibility. If a buyer or lender will see it, address it directly.',
    },
    {
      label: 'Average the three comps.',
      isBest: false,
      explanation:
        'Averaging blends one non-arm\'s-length data point with two clean ones, which pulls the answer toward a number the market may not support.',
    },
  ],
  takeaway:
    'Check whether each comp was an arm\'s-length transaction with market rent. Sale-leasebacks, related-party sales, and portfolio trades often embed non-market terms.',
  tips: [
    'Ask: who set the rent, and when?',
    'Footnote unusual comps rather than omitting them.',
    'A lease signed at closing is not a market rent signal.',
  ],
};
