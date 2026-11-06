import type { SituationalCase } from '../../types/situational';

export const entitlementRiskLandPrice: SituationalCase = {
  id: 'entitlement-risk-land-price',
  title: 'Pay $4M for unentitled land?',
  category: 'risk',
  scenario: 'A parcel is offered two ways: entitled at $7M, or unentitled at $4M. You estimate a 60% chance of approval, 18 months to get entitlements, a cost of capital of 8%, and about $150K of entitlement costs.',
  data: [
    {
      label: 'Entitled price',
      value: '$7.0M'
    },
    {
      label: 'Unentitled price',
      value: '$4.0M'
    },
    {
      label: 'Probability of approval',
      value: '60%'
    },
    {
      label: 'Time to entitle',
      value: '18 months'
    },
    {
      label: 'Cost of capital',
      value: '8%'
    },
    {
      label: 'Entitlement costs',
      value: '~$150K'
    }
  ],
  question: 'What is the best way to approach the unentitled parcel?',
  options: [
    {
      label: 'Structure an option or entitlement-contingent PSA; at $4M outright the expected value does not clear.',
      isBest: true,
      explanation: 'Expected entitled value: 0.6 × $7M = $4.2M. Carry on $4M for 18 months at 8% ≈ $0.48M, plus $0.15M costs, so expected cost ≈ $4.63M versus $4.2M of expected value. Outright, the bet is negative. A contingent PSA moves the denial risk to the seller.'
    },
    {
      label: 'Buy at $4M because the discount is 43%.',
      isBest: false,
      explanation: 'The discount is the market\'s price for risk, not free value. The probability and the time both reduce it.'
    },
    {
      label: 'Buy the entitled parcel at $7M with no further analysis.',
      isBest: false,
      explanation: 'Entitled land removes the approval risk but may be fully priced; still check the remaining margin.'
    },
    {
      label: 'Pass because entitlement risk cannot be priced.',
      isBest: false,
      explanation: 'It can be priced with probabilities and carry — that is how entitlement options are valued.'
    }
  ],
  takeaway: 'Unentitled land is a probability-weighted option. Price it as expected value minus carry and costs, or shift the risk with contingencies.',
  tips: [
    'Expected value = probability × entitled value.',
    'Add carry and soft costs for the entitlement period.',
    'Prefer option/contingent structures over outright risk.'
  ],
  difficulty: 'advanced',
  assetClass: 'mixed',
  roles: [
    'development',
    'acquisitions'
  ]
};
