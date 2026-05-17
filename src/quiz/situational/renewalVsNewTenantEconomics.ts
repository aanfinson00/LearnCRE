import type { SituationalCase } from '../../types/situational';

export const renewalVsNewTenantEconomics: SituationalCase = {
  id: 'renewal-vs-new-tenant-economics',
  title: 'Renew the tenant or re-tenant the space?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'Your existing office tenant\'s 7-year lease expires in 6 months. They occupy 10,000 SF at a $28/SF in-place rent. Market rent has moved to $32/SF. The tenant wants to renew at $30/SF for another 5 years, asking for $15/SF in TIs and 2 months of free rent. Alternatively, you could let them leave, re-tenant at full market rent ($32/SF), but would need to offer $40/SF in TIs, 4 months of free rent, and expect a 6-month downtime before a new tenant signs.',
  data: [
    { label: 'Space', value: '10,000 SF' },
    { label: 'In-place rent (expiring)', value: '$28/SF' },
    { label: 'Market rent', value: '$32/SF' },
    { label: 'Renewal terms', value: '$30/SF face, $15/SF TI, 2 mos free rent, 5-yr term' },
    { label: 'Re-tenant terms', value: '$32/SF face, $40/SF TI, 4 mos free rent, 6-mo downtime, 5-yr term' },
    { label: 'Discount rate', value: '7%' },
  ],
  question: 'Which option produces better economics over the 5-year lease term?',
  options: [
    {
      label: 'The renewal is better. The $2/SF rent gap ($30 vs $32) is outweighed by the cost savings: $25/SF lower TIs, 2 fewer months of free rent, and zero downtime. The downtime alone (6 months × $32/SF × 10,000 SF = $1.6M of lost rent) exceeds the 5-year rent differential of ~$1.0M.',
      isBest: true,
      explanation:
        'Full economic comparison: Renewal — upfront cost: $15/SF TI + (2/12 × $30) × 10k SF = $150k TI + $50k free rent = $200k total upfront cost. Annual NOI: $300k/yr. Re-tenant — downtime cost: 6 mos × $32/SF × 10k = $1.6M lost rent + $400k TI + (4/12 × $32) × 10k SF = $107k free rent = $2.1M total upfront cost. Annual NOI: $320k/yr. The $20k/yr extra NOI from re-tenanting takes 95 years to recover the $1.9M cost difference. Renewal wins decisively. This is the renewal economics math: downtime + higher TI usually outweigh the rent gap, especially when the tenant is happy and creditworthy.',
    },
    {
      label: 'Re-tenant at $32/SF — market rent is $2/SF higher and you should capture the mark-to-market.',
      isBest: false,
      explanation:
        'The rent gap is $2/SF/yr = $20k/yr on 10,000 SF. But reaching that $20k/yr premium requires absorbing $2.1M of upfront costs (downtime + TI + free rent) vs. $200k for renewal. The payback period for re-tenanting is over 90 years — you will never recover the cost differential within any realistic hold period. Mark-to-market only makes sense when the rent gap is large, downtime is short, or TI requirements are similar.',
    },
    {
      label: 'Neither is clearly better — run the NPV at 7% and pick whichever is higher.',
      isBest: false,
      explanation:
        'Running an NPV is exactly the right analytical discipline — but the answer is clear: renewal wins at any reasonable discount rate. The $2.1M cost difference dwarfs the $20k/yr rent advantage. At 7% discount rate, the PV of the $20k/yr rent differential over 5 years is ~$82k, vs. a ~$1.9M upfront cost difference. The NPV math decisively favors renewal.',
    },
    {
      label: 'Depends on whether you plan to sell the asset — a new 5-year lease at market rent is more valuable on exit.',
      isBest: false,
      explanation:
        'A new lease at $32/SF does produce marginally higher exit NOI than a renewal at $30/SF, and that flows into exit valuation. But the $20k/yr NOI difference at a 6.5% cap is worth ~$308k of additional exit value. That does not come close to offsetting the $1.9M cost differential of re-tenanting. The valuation argument requires an unrealistically wide delta to flip the conclusion.',
    },
  ],
  takeaway:
    'Renewal economics almost always favor the incumbent tenant when TIs and downtime are factored in. The math: (downtime cost + TI differential + free rent differential) ÷ annual rent differential = payback period. If the payback period exceeds the hold period, renew. Chasing market rent at the cost of a creditworthy incumbent is one of the most common and expensive asset management mistakes.',
  tips: [
    'Downtime is the largest cost in re-tenanting — 6 months on 10,000 SF at $30/SF = $150k of lost NOI.',
    'Renewal TIs are typically 30–50% of new-tenant TIs because the existing fit-out does not need full replacement.',
    'Mark-to-market makes sense when the rent gap is large (>10%), downtime is short, and TI requirements are similar.',
  ],
};
