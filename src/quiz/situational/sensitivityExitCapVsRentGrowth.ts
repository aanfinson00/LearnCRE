import type { SituationalCase } from '../../types/situational';

export const sensitivityExitCapVsRentGrowth: SituationalCase = {
  id: 'sensitivity-exit-cap-vs-rent-growth',
  title: 'What moves value more: exit cap or rent growth?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'mixed',
  scenario:
    'In a 5-year hold model, base case is a 5.5% exit cap rate and 3% annual NOI growth. You are considering two downside flexes: exit cap +50 bps (to 6.0%), or NOI growth −100 bps (to 2.0%). NOI at exit is modeled as Year-5 NOI.',
  data: [
    { label: 'Base exit cap', value: '5.5%' },
    { label: 'Base NOI growth', value: '3.0%/yr' },
    { label: 'Flex A', value: 'Exit cap +50 bps' },
    { label: 'Flex B', value: 'NOI growth −100 bps' },
  ],
  question: 'Which flex hurts the exit value more?',
  options: [
    {
      label: 'Exit cap +50 bps — exit value falls ~8.3%, versus ~4.8% for the growth flex.',
      isBest: true,
      explanation:
        'Value ∝ 1 ÷ cap. 5.5/6.0 = 0.917, a drop of 8.3%. For growth: (1.02/1.03)^5 ≈ 0.952, a drop of about 4.8%. A small move in cap rate acts on the entire value, while growth compounds slowly.',
    },
    {
      label: 'NOI growth −100 bps — it compounds each year.',
      isBest: false,
      explanation:
        'Over five years it compounds to only about 4.8% of value; cap rate acts one-for-one in the denominator.',
    },
    {
      label: 'They are about equal.',
      isBest: false,
      explanation:
        '8.3% vs 4.8% is not equal; ranking sensitivities correctly matters when allocating diligence effort.',
    },
    {
      label: 'Neither matters if you hold to the end of the loan.',
      isBest: false,
      explanation:
        'Exit value drives the largest share of a typical levered return.',
    },
  ],
  takeaway:
    'Exit cap rate is usually the most powerful single assumption in a short-hold model. Rank sensitivities by magnitude and spend diligence accordingly.',
  tips: [
    'Percent change in value ≈ old cap ÷ new cap − 1.',
    'Build exit-cap × rent-growth grids, not single flexes.',
    'Always set exit cap at or above going-in cap unless you can justify otherwise.',
  ],
};
