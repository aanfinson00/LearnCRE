import type { SituationalCase } from '../../types/situational';

export const blendedRentRollUnderwrite: SituationalCase = {
  id: 'blended-rent-roll-underwrite',
  title: 'Below-market leases are masking the real story',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    'You\'re underwriting a 40,000 SF strip retail center. The rent roll shows a weighted-average in-place rent of $22/SF/yr. However, two tenants (totaling 18,000 SF, 45% of GLA) are on leases signed in 2017 at $14/SF — well below current market of $26/SF. Both leases expire within 18 months. The other tenants are at market. The seller is pricing the asset on in-place NOI at a 6.5% cap.',
  data: [
    { label: 'Total GLA', value: '40,000 SF' },
    { label: 'Weighted avg in-place rent', value: '$22/SF/yr' },
    { label: 'Below-market tenants', value: '18,000 SF (45% of GLA) at $14/SF' },
    { label: 'Market rent (current)', value: '$26/SF/yr' },
    { label: 'Lease expiration', value: 'Both below-market leases expire within 18 months' },
    { label: 'Seller cap rate', value: '6.5% on in-place NOI' },
  ],
  question: 'What is the correct underwriting approach for this rent roll?',
  options: [
    {
      label: 'Price on mark-to-market NOI minus downtime and TI costs — not in-place NOI. The below-market leases are near expiration; model 6–12 months of downtime per tenant at rollover, plus TI cost to re-tenant, and discount the mark-to-market upside by that friction. The "true" economics sit between in-place and full-market.',
      isBest: true,
      explanation:
        'The below-market tenants create apparent upside — from $14/SF to $26/SF is +86% rent growth on 45% of the building. But 6.5% on in-place NOI is essentially pricing that upside as free. The correct approach: (1) model rollover friction: assume 6–12 months downtime + $10–15/SF TI per re-tenanting; (2) compute NPV of incremental rent after friction; (3) price the deal so your total return target is met INCLUDING friction. If the 6.5% cap implies a $7–8M price, back-solve: does the deal pencil to 14% levered IRR assuming realistic lease-up costs and timing? If yes, proceed. If it only works assuming zero downtime and zero TI, it\'s overpriced.',
    },
    {
      label: 'Price on fully stabilized NOI at market rent — the mark-to-market opportunity is real and proximate.',
      isBest: false,
      explanation:
        'Fully stabilized NOI assumes both leases renew or re-tenant at $26/SF with no downtime and no TI — that\'s an aggressive scenario, not a base case. Even proximate lease expirations carry execution risk: tenants may not renew, may negotiate below market, or may leave entirely. Pricing on max-upside is aggressive underwriting.',
    },
    {
      label: 'The in-place rent roll is the only defensible anchor — mark-to-market is speculative.',
      isBest: false,
      explanation:
        'The opposite error from the previous option. In-place NOI as the sole anchor ignores the fact that 45% of the rent roll reprices within 18 months. Pro forma that ignores proximate rollovers systematically underweights rollover risk and upside alike. The correct method explicitly models both.',
    },
    {
      label: 'Ask the tenants directly if they\'ll renew — if they say yes, price on stabilized NOI; if no, price on in-place.',
      isBest: false,
      explanation:
        'Tenant intentions are not lease commitments. Even if tenants express intent to renew, they may negotiate lower, exercise renewal rights below market, or not renew at all. Build the model on the lease terms, not on verbal intentions — then treat a signed renewal as a scenario update, not an assumption.',
    },
  ],
  takeaway:
    'Near-term rollover of below-market leases is simultaneously the deal\'s biggest risk and biggest upside. The correct underwriting thread is neither "price on in-place" nor "price on full mark-to-market" — it\'s building an explicit friction model: downtime, TI, and re-leasing spread assumption, then solving for whether the deal clears return hurdles at that friction level.',
  tips: [
    'Mark-to-market upside is not free — TI + downtime at rollover is the cost of collecting it.',
    'Rule of thumb: 1 month of downtime per $1/SF/yr of below-market gap at rollover (very rough).',
    'Map lease expiration dates precisely — "within 18 months" is more useful than "soon."',
  ],
};
