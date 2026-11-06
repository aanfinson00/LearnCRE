import type { SituationalCase } from '../../types/situational';

export const devLeaseUpPaceCarry: SituationalCase = {
  id: 'dev-leaseup-pace-carry',
  title: 'Whose lease-up pace do you underwrite?',
  category: 'absorption',
  scenario: 'A 300-unit multifamily project delivers next quarter. The sponsor underwrites 35 leases per month to reach 93% occupancy. The three most recent competing lease-ups in the submarket averaged 20 net leases per month. The $60M construction loan floats at 7.5%, and the interest reserve is sized for 9 months of lease-up.',
  data: [
    {
      label: 'Units',
      value: '300'
    },
    {
      label: 'Stabilization target',
      value: '93% (279 units)'
    },
    {
      label: 'Sponsor pace',
      value: '35 units/month'
    },
    {
      label: 'Comp lease-up pace',
      value: '20 units/month'
    },
    {
      label: 'Loan balance / rate',
      value: '$60M / 7.5%'
    },
    {
      label: 'Interest reserve',
      value: '9 months'
    }
  ],
  question: 'What is the most defensible conclusion?',
  options: [
    {
      label: 'Underwrite ~20/month: roughly 14 months to stabilize, so the 9-month reserve is about 5 months short.',
      isBest: true,
      explanation: '279 ÷ 20 ≈ 14 months. Interest carry is about $60M × 7.5% ÷ 12 ≈ $375K per month, so five uncovered months is roughly $1.9M of extra equity or a covenant problem. Comp lease-ups are observed evidence; the sponsor\'s pace is a hope.'
    },
    {
      label: 'Use the sponsor\'s 35/month: ~8 months fits comfortably inside the reserve.',
      isBest: false,
      explanation: '279 ÷ 35 ≈ 8 months, which only works if the project outperforms every recent comp by 75%. A lender or LP should not size the reserve on best-case absorption.'
    },
    {
      label: 'Average the two paces to ~27/month and call it 10 months.',
      isBest: false,
      explanation: 'Averaging an observed number with an aspirational one just dilutes the evidence. Anchor on the comps and adjust for specific advantages (location, product, pricing) with proof.'
    },
    {
      label: 'Pace does not matter because the loan has an extension option.',
      isBest: false,
      explanation: 'An extension is a cost, not a cure: it usually requires a DSCR or debt-yield test that a slow lease-up will fail, plus fees and a rate step-up.'
    }
  ],
  takeaway: 'Size the interest reserve to the observed lease-up pace of comparable projects, not the sponsor\'s pace. Every extra month of lease-up costs a month of full interest carry.',
  tips: [
    'Months to stabilize = units to lease ÷ net monthly absorption.',
    'Monthly carry = balance × rate ÷ 12.',
    'Reserve for the slow case; treat the fast case as upside.'
  ],
  difficulty: 'intermediate',
  assetClass: 'multifamily',
  roles: [
    'development',
    'mortgageUw'
  ]
};
