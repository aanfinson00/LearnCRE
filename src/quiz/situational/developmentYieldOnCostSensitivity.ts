import type { SituationalCase } from '../../types/situational';

export const developmentYieldOnCostSensitivity: SituationalCase = {
  id: 'development-yield-on-cost-sensitivity',
  title: 'Development: does the spread survive a stress?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['development', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "A garden-style development has a $50M all-in budget and a stabilized NOI of $3.5M on $5.38M of revenue. Operating expenses are mostly fixed. Your investment committee wants at least a 100 bps spread between yield on cost and the 5.5% exit cap. Your sponsor asks you to look at two downside cases: hard costs and soft costs rising 10%, and rents coming in 5% below plan.",
  data: [
    { label: 'Total cost', value: '$50M' },
    { label: 'Stabilized NOI', value: '$3.5M (7.0% yield on cost)' },
    { label: 'Stabilized revenue', value: '$5.38M' },
    { label: 'Exit cap', value: '5.5%' },
    { label: 'Required spread', value: '100 bps minimum' },
  ],
  question: 'What do the stress cases tell you?',
  options: [
    {
      label:
        "Cost +10% takes yield on cost to 6.36% (down 64 bps) and rent −5% takes it to 6.46% (down 54 bps). Together they give 5.88%, only about 38 bps over the exit cap, so the deal misses the 100 bps test in either case and badly if both happen.",
      isBest: true,
      explanation:
        "Costs: $3.5M ÷ $55M = 6.36%. Rents: 5% of $5.38M is about $269,000, and with fixed expenses it falls straight to NOI, giving $3.23M ÷ $50M = 6.46%. Both: $3.23M ÷ $55M = 5.88%. Against a 5.5% exit cap that is a spread of roughly 38 bps. Each case alone already misses the 100 bps test (86 bps and 96 bps of spread), so the margin is thin on either variable.",
    },
    {
      label:
        "Rent is the bigger risk because a 5% rent miss reduces NOI by 5%, while a 10% cost increase only affects the denominator.",
      isBest: false,
      explanation:
        "The rent miss reduces NOI by about 7.7% because expenses are fixed (the $269,000 loss is 7.7% of $3.5M), but cost overruns of 10% move the yield by a similar amount. In this deal they cost 54 and 64 bps, so cost overruns are slightly larger. The two risks are comparable, and the real danger is that they can occur together.",
    },
    {
      label:
        "The deal is fine as long as yield on cost stays above the 5.5% exit cap, since the project still creates value.",
      isBest: false,
      explanation:
        "A spread of about 38 bps does not compensate for development risk, lease-up risk and the possibility that exit caps expand. The committee's 100 bps threshold exists because yield on cost is only a projection until the building stabilizes. Clearing the cap rate by a hair means the deal is earning a normal return for abnormal risk.",
    },
    {
      label:
        "Run only the combined case, since single-variable sensitivities understate the downside.",
      isBest: false,
      explanation:
        "Single-variable cases are still useful because they show which assumption has the most leverage and which has cushion. The combined case answers how bad it can get, while the single-variable cases tell you what to monitor and where to negotiate (a GMP contract, pre-leasing). You want both views.",
    },
  ],
  takeaway:
    "Yield on cost falls from both sides: costs enlarge the denominator and rents shrink the numerator. Test each alone and together against the required spread to the exit cap.",
  tips: [
    "Yield on cost = stabilized NOI ÷ total cost; compare it to the exit cap, not to the going-in cap.",
    "With fixed expenses, a rent miss falls entirely to NOI.",
    "A GMP contract and pre-leasing cap the two risks that move the spread.",
  ],
};
