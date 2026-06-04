import type { SituationalCase } from '../../types/situational';

export const shadowSpaceOffice: SituationalCase = {
  id: 'shadow-space-office',
  title: 'Reported vs. effective vacancy — sublease shadow',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'An office building shows 88% physical occupancy. The largest tenant — a financial firm occupying 35,000 SF at $42/SF — has had their entire floor listed for sublease at $28/SF for the past 22 months with no takers. The remaining tenants have leases rolling in 3–7 years. You\'re evaluating the asset for acquisition.',
  data: [
    { label: 'Total building size', value: '250,000 SF' },
    { label: 'Reported occupancy', value: '88% (220,000 SF leased)' },
    { label: 'Sublease listing', value: '35,000 SF @ $28/SF (22 months on market)' },
    { label: 'In-place rent on sublease floor', value: '$42/SF' },
    { label: 'Other leases rolling', value: '3–7 years out' },
  ],
  question: 'How should you think about effective vacancy and NOI risk when underwriting this asset?',
  options: [
    {
      label: 'Treat the 35,000 SF as functionally vacant in your NOI stress model — 22 months of failed sublease marketing at a 33% rent discount is strong evidence the tenant will not renew.',
      isBest: true,
      explanation:
        'Shadow space is a leading indicator of real vacancy. A tenant listing space at $28 vs. in-place $42 for nearly 2 years has signaled (a) they don\'t need it, and (b) the market won\'t clear it near in-place rent. On rollover, expect vacate-or-downsize. Model a downside scenario that removes 35K SF of NOI — roughly $1.47M — and then check re-leasing economics. If market rent is closer to $28 than $42, your stabilized NOI is materially lower than in-place NOI.',
    },
    {
      label: 'Keep the NOI flat — they\'re still paying $42/SF under the lease, so reported income is accurate today.',
      isBest: false,
      explanation:
        'Current cash flow is technically accurate, but the sublease activity tells you the income doesn\'t survive rollover. Reported NOI reflects today; it does not represent stabilized cash flow 3–5 years out. Underwriting purely on in-place NOI without stress-testing the sublisted space is the classic "false stability" error in office acquisition analysis.',
    },
    {
      label: 'It\'s plausible they\'re testing the market without firm intent to vacate — monitor rather than haircut.',
      isBest: false,
      explanation:
        '"Testing the market" is credible at 6–12 months. At 22 months with zero sublease activity at a significant discount, the probability of intent to vacate or downsize is high. The burden of proof has shifted: you need specific evidence of re-commitment (lease extension signed, headcount growing) to justify the full in-place assumption.',
    },
    {
      label: 'Discount price by 35,000 SF × ($42 − $28) = $490K/year — the lease rent spread.',
      isBest: false,
      explanation:
        'Adjusting only for the rent spread ($490K/yr) misses the primary risk: the tenant may vacate entirely. Full vacancy would cost $1.47M of NOI plus $2.1M+ of re-leasing costs (TI + LC + downtime). Discounting only the rent spread dramatically understates the downside. Model the full vacancy scenario, not just the mark-to-market spread.',
    },
  ],
  takeaway:
    'Shadow space (active sublease listings at below in-place rent) is effective vacancy. Reported occupancy and contract NOI overstate durability when sublease activity is present. For office assets, scan for active sublease listings; time-on-market >12 months at a rent discount is the clearest flag to stress the renewal assumption.',
  tips: [
    'Check CoStar sublease availability for each major tenant floor — shadow space can double reported vacancy in soft office markets.',
    'In-place vs. sublease rate spread is a proxy for how far above-market the tenant is.',
    'Weighted average lease term and rollover schedule are lagging indicators; active sublease is a leading one.',
  ],
};
