import type { SituationalCase } from '../../types/situational';

export const breakEvenOccupancy: SituationalCase = {
  id: 'break-even-occupancy',
  title: 'What\'s the minimum occupancy to cover debt service?',
  category: 'sensitivity',
  difficulty: 'beginner',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    'You are underwriting a 100,000 SF office building at $50/SF gross rent with a 5% base-case vacancy assumption. Annual operating expenses are $1.5M. Annual debt service is $1.8M. A senior reviewer asks you to quickly calculate the break-even occupancy — the minimum occupancy at which the property still covers its debt service.',
  data: [
    { label: 'Total SF', value: '100,000 SF' },
    { label: 'Gross rent', value: '$50/SF' },
    { label: 'Base case vacancy', value: '5%' },
    { label: 'Annual operating expenses', value: '$1.5M' },
    { label: 'Annual debt service', value: '$1.8M' },
  ],
  question:
    'What is the break-even occupancy, and what does it tell you about this deal\'s downside protection?',
  options: [
    {
      label:
        'Break-even occupancy = (OpEx + Debt Service) ÷ Gross Potential Revenue = $3.3M ÷ $5.0M = 66%. The deal has 29 percentage points of cushion vs. the 95% base case before debt service cannot be covered.',
      isBest: true,
      explanation:
        'Gross potential revenue = 100,000 SF × $50 = $5.0M. Break-even = ($1.5M OpEx + $1.8M DS) ÷ $5.0M GPR = 66.0%. At 66% occupancy, NOI exactly equals debt service. The 29-point cushion (95% base − 66% break-even) means the building can absorb significant vacancy before triggering a cash shortfall. If break-even were 88%, you\'d have only 7 points of cushion — very thin. Lenders often require break-even occupancy below 70–75% for stabilized office.',
    },
    {
      label:
        'Break-even is approximately 70%: (OpEx + DS) ÷ (occupied SF × rent) at the base case occupancy.',
      isBest: false,
      explanation:
        'This divides by occupied SF at the base case rather than total gross potential revenue. Break-even occupancy should be expressed as a percentage of total building capacity — not as a percentage of the in-place leased SF. Using occupied SF conflates the base case assumption with the break-even metric.',
    },
    {
      label:
        'The break-even is 5% vacancy — any more vacant than the base case and the deal is at risk.',
      isBest: false,
      explanation:
        'Confuses the base-case vacancy with the break-even threshold. The base case (95% occupied) is comfortably above break-even. Break-even is the minimum occupancy at which revenue covers all costs — it is the floor below which cash flow turns negative, not the operating assumption.',
    },
    {
      label:
        'Break-even analysis doesn\'t apply to office — income is lease-by-lease and isn\'t linear with occupancy.',
      isBest: false,
      explanation:
        'Office income is approximately linear with occupancy at the gross rent level for underwriting purposes. Break-even occupancy is a standard metric across all asset classes and is routinely used in IC presentations and lender packages to communicate downside protection.',
    },
  ],
  takeaway:
    'Break-even occupancy = (Operating Expenses + Debt Service) ÷ Gross Potential Revenue. The larger the gap between the base-case occupancy and break-even, the more downside protection the deal carries. It is the fastest single metric to communicate vacancy risk tolerance to an IC or lender.',
  tips: [
    'Formula: (OpEx + DS) ÷ GPR. Always use total SF capacity in the denominator, not occupied SF.',
    'Cushion = base occupancy − break-even occupancy; >20 pts is strong, <10 pts is thin.',
    'Lenders commonly require break-even occupancy <70–75% for stabilized office underwriting.',
  ],
};
