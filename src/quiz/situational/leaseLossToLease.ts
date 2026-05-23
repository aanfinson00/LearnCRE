import type { SituationalCase } from '../../types/situational';

export const leaseLossToLease: SituationalCase = {
  id: 'lease-loss-to-lease',
  title: 'The OM shows $1,400/unit — the rent roll says $1,250. Which NOI do you underwrite?',
  category: 'lease-econ',
  difficulty: 'beginner',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'A seller\'s OM for a 150-unit multifamily asset advertises NOI of $2.1M based on "scheduled rents" of $1,400 per unit per month. You pull the rent roll and find actual signed leases average $1,250 per unit per month. Expenses are $900,000 per year. The seller is marketing at a 5.5% cap rate on the scheduled-rent NOI. The $150/unit gap is commonly called loss-to-lease.',
  data: [
    { label: 'Units', value: '150 units, fully occupied' },
    { label: 'Scheduled rent (OM)', value: '$1,400/unit/mo → $2.52M GRI' },
    { label: 'In-place signed rent', value: '$1,250/unit/mo → $2.25M GRI' },
    { label: 'Annual expenses', value: '$900,000' },
    { label: 'Seller advertised cap', value: '5.5% on scheduled NOI of $2.1M' },
  ],
  question: 'What is the actual in-place NOI and what going-in cap are you really paying at the seller\'s ask price?',
  options: [
    {
      label: 'In-place NOI is $1.35M ($2.25M actual GRI minus $0.9M expenses). The seller\'s implied ask price is $38.2M ($2.1M / 5.5%). Your true going-in cap is 3.5% ($1.35M / $38.2M) — you are paying for future income today.',
      isBest: true,
      explanation:
        'The seller is pricing on scheduled rents (market rents), not the actual leases in place. In-place NOI = $1,250 × 150 × 12 = $2.25M GRI − $0.9M expenses = $1.35M. Seller\'s implied price: $2.1M / 5.5% = $38.2M. Going-in cap: $1.35M / $38.2M = 3.5%. You are paying a 3.5% going-in cap for an asset that earns $1.35M today and requires a specific leasing trajectory to reach $2.1M NOI. This is only justified if: (a) market rents genuinely support $1,400/unit, (b) you model the time and cost to capture the mark-to-market (downtime, concessions, turnover), and (c) you discount the recovery timeline appropriately. The loss-to-lease is upside, not current income.',
    },
    {
      label: 'Use the seller\'s $2.1M NOI — that is the stabilized figure once rents are marked to market at rollover.',
      isBest: false,
      explanation:
        'The $2.1M has not been verified. You have not confirmed that $1,400/unit is achievable, how long it takes to get there, or what the turnover cost and concession profile looks like. Underwriting to scheduled rents requires modeling the recovery trajectory — time, downtime, concessions — before treating $2.1M as the baseline NOI. Using it without that work means buying future income at today\'s price.',
    },
    {
      label: 'The $150/unit gap signals weak demand — market rents probably do not support $1,400 and the asset is overpriced.',
      isBest: false,
      explanation:
        'Loss-to-lease means in-place rents are BELOW market rent — not that the market is weak. The gap can reflect long-tenured residents on below-market legacy leases, a period of rapid rent growth where the portfolio has not yet renewed to market, or an intentionally conservative renewal strategy. Loss-to-lease is often a value-add upside signal. The question is whether you are paying a price that already assumes that upside.',
    },
    {
      label: 'Average the in-place NOI ($1.35M) and scheduled NOI ($1.62M) to get a blended estimate of $1.49M.',
      isBest: false,
      explanation:
        'Averaging is arbitrary. There is no analytical basis for a 50/50 blend of in-place and market NOI. The correct approach is to underwrite in-place NOI at close (what you are buying today) and separately model the mark-to-market recovery trajectory with explicit timing and cost assumptions. The "average" approach simultaneously misrepresents what you own today and what you stand to earn tomorrow.',
    },
  ],
  takeaway:
    'Loss-to-lease (market rent minus in-place rent) is an upside metric, not a current-income metric. Always underwrite to in-place NOI at close and separately model the mark-to-market recovery with realistic timing and cost assumptions. A seller pricing to scheduled rents is asking you to pay for future income today — which is only justified when you have verified market rents, quantified the recovery cost, and discounted the trajectory appropriately.',
  tips: [
    'Loss-to-lease % = (market rent − in-place rent) / market rent; a quick upside sizing tool.',
    'Always verify "market rent" with signed lease comps — OM market rent figures are frequently optimistic.',
    'In-place NOI = actual collected rents (not scheduled) minus actual operating expenses; use this as your going-in anchor.',
  ],
};
