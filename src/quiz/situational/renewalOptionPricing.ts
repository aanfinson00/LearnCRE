import type { SituationalCase } from '../../types/situational';

export const renewalOptionPricing: SituationalCase = {
  id: 'renewal-option-pricing',
  title: 'The tenant has a below-market renewal option — what does it do to your exit?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'You are underwriting an office acquisition. The building is single-tenant, 50,000 SF, with a 7-year remaining lease at $38/SF NNN. The tenant has one 5-year renewal option at $34/SF NNN (well below current market of $42/SF). You are planning a 5-year hold and will either sell during the lease term or allow the tenant to exercise their option before exit. Your exit cap rate assumption is 6.0%.',
  data: [
    { label: 'Remaining lease term', value: '7 years' },
    { label: 'In-place rent', value: '$38/SF NNN' },
    { label: 'Market rent', value: '$42/SF NNN' },
    { label: 'Renewal option rent', value: '$34/SF NNN (5-yr term)' },
    { label: 'Renewal option type', value: 'Tenant discretion (no landlord approval required)' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Exit cap assumption', value: '6.0%' },
    { label: 'SF', value: '50,000 SF' },
  ],
  question: 'How does the below-market renewal option affect your exit valuation and how should you underwrite it?',
  options: [
    {
      label:
        'If the tenant exercises the option, Year 7 rent drops from $38 to $34 (-11%), and exit NOI could be $34 × 50K = $1.7M vs $1.9M today. At a 6.0% cap, that\'s an exit value of ~$28.3M vs ~$31.7M — a ~$3.4M swing. You must decide which scenario to underwrite for exit, and price that optionality (the tenant WILL exercise if market is $42 and option is $34).',
      isBest: true,
      explanation:
        'A below-market renewal option will almost certainly be exercised: the tenant gets 5 more years at $34/SF when market is $42/SF — $400K/yr of savings ($8/SF × 50K SF). From the landlord\'s perspective, if the tenant exercises, exit NOI is $1.7M ($34 × 50K). At a 6.0% exit cap: value = $1.7M / 0.06 = $28.33M. If the tenant does NOT exercise (vacates), you face re-leasing risk plus downtime. The "best" scenario is a new lease at $42/SF: $2.1M NOI → $35M value — but you must absorb vacancy first. The underwriting question: what probability do you assign to exercise? Given $8/SF spread, exercise probability is very high. Your exit valuation should reflect the likely below-market renewal NOI, not the hoped-for mark-to-market scenario.',
    },
    {
      label: 'Renewal options are common — they don\'t materially affect exit since most buyers underwrite in-place rent.',
      isBest: false,
      explanation: 'This is precisely backwards. Below-market renewal options are a significant liability because they give the tenant the right to lock in below-market rent for another 5 years. Buyers price the expected in-place rent stream, not the nominal lease rate. If exercise is likely (and a $8/SF spread makes it very likely), the buyer underwrites $34/SF rent, not $38/SF.',
    },
    {
      label: 'Underwrite the upside: if the tenant doesn\'t renew, you can re-lease at $42/SF and get a value pop.',
      isBest: false,
      explanation: 'Underwriting a tenant departure as the base case is speculative. You\'re hoping the tenant walks away from $8/SF in savings. More importantly, tenant departure triggers vacancy, downtime, TI, and leasing commissions — costs that easily erode the $4/SF rent upside. Vacancy risk typically outweighs mark-to-market upside unless you have strong demand evidence.',
    },
    {
      label: 'The option rent is fixed; negotiate with the tenant to buy it out before closing.',
      isBest: false,
      explanation: 'A buyout is a viable strategy but not an underwriting answer. You need to value the deal as-is first, then evaluate whether a buyout is economically worth pursuing. The cost to buy out an option is roughly the PV of the rent discount over the option term — here, $8/SF × 50K SF × 5 yrs ≈ $2M PV at 7%. That\'s a real cost.',
    },
  ],
  takeaway:
    'Below-market renewal options are liabilities on the cap stack. When the spread between market rent and option rent is material, treat exercise as the base case and price the option tenant\'s NOI as your exit NOI. The value impact flows directly through the exit cap: lower NOI → lower exit price. Ask upfront: what is the tenant most likely to do, and have you priced it?',
  tips: [
    'Rule: if option rent is >10% below market, assume exercise is probable; underwrite it as base case.',
    'Option cost: PV of rent discount over option term = (market rent − option rent) × SF × term × discount factor.',
    'Buyers will negotiate a cap rate premium for below-market options — they won\'t pretend the option doesn\'t exist.',
  ],
};
