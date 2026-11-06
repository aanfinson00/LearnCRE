import type { SituationalCase } from '../../types/situational';

export const cotenancyAnchorRollover: SituationalCase = {
  id: 'cotenancy-anchor-rollover',
  title: 'The anchor lease expires in 18 months',
  category: 'lease-econ',
  scenario: 'You are acquiring a shopping center. The anchor\'s lease expires in 18 months with no renewal option exercised. Inline tenants representing 35% of rent have co-tenancy clauses: if the anchor goes dark, they pay 50% of base rent until a replacement opens, and may terminate after 12 months.',
  data: [
    {
      label: 'Anchor lease expiry',
      value: '18 months'
    },
    {
      label: 'Inline with co-tenancy',
      value: '35% of rent'
    },
    {
      label: 'Co-tenancy remedy',
      value: '50% rent; termination after 12 months'
    },
    {
      label: 'Anchor renewal status',
      value: 'Not yet negotiated'
    }
  ],
  question: 'How should this change your deal?',
  options: [
    {
      label: 'Make an executed anchor extension a closing condition, or price/escrow for the dark-anchor downside.',
      isBest: true,
      explanation: 'One event cascades: anchor goes dark, 35% of rent drops 50% (about 17.5% of base rent), and those tenants can leave. The cap rate cannot absorb that. Resolve the anchor first, or hold back/escrow and discount for a downside case.'
    },
    {
      label: 'Ignore it; anchors almost always renew.',
      isBest: false,
      explanation: '"Almost always" is not underwriting, and the downside is a chain of rent reductions and terminations.'
    },
    {
      label: 'Underwrite the 50% rent reduction as the base case.',
      isBest: false,
      explanation: 'That treats a contingent risk as certain and will lose you the deal if the anchor is likely to renew.'
    },
    {
      label: 'Request lower inline rents instead.',
      isBest: false,
      explanation: 'The problem is anchor continuity, not current inline rent levels.'
    }
  ],
  takeaway: 'Co-tenancy clauses link tenants\' fates. Anchor rollover is a deal-level risk to be resolved or priced, not a rent-roll detail.',
  tips: [
    'Read every co-tenancy clause in the rent roll.',
    'Quantify rent at risk if the anchor leaves.',
    'Use closing conditions, escrows, or price to allocate the risk.'
  ],
  difficulty: 'advanced',
  assetClass: 'retail',
  roles: [
    'acquisitions',
    'assetManagement',
    'mortgageUw'
  ]
};
