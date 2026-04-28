import type { SituationalCase } from '../../types/situational';

export const capRateDivergence: SituationalCase = {
  id: 'cap-rate-divergence',
  title: 'Why is this trading off-market?',
  category: 'pricing',
  difficulty: 'intermediate',
  assetClass: 'office',
  scenario:
    'A suburban office asset is being marketed at an 8.0% going-in cap rate. Recent trades in the submarket for similar vintage and quality have printed at 5.75–6.25%. Tenancy is single-tenant, investment-grade credit, but the lease has 14 months of remaining term. In-place rent is $24/SF; market rent for the submarket is $32–34/SF.',
  data: [
    { label: 'Subject going-in cap', value: '8.0%' },
    { label: 'Comp set range', value: '5.75–6.25%' },
    { label: 'Remaining lease term', value: '14 months' },
    { label: 'In-place / market rent', value: '$24 / $32–34/SF' },
  ],
  question: 'What most likely explains the cap-rate gap?',
  options: [
    {
      label: 'Buyers are pricing in re-leasing risk and below-market rents — the going-in cap is on a soon-to-roll income stream that markets re-set higher.',
      isBest: true,
      explanation:
        'Going-in cap rate is on in-place NOI. With <2 years of remaining term and rents 25–40% below market, the in-place income is effectively temporary. Sophisticated buyers underwrite to a trended NOI assuming downtime, TIs, and a market re-set, so the cap on Year 1 NOI looks "wide" but the levered IRR pencils to the comp set.',
    },
    {
      label: 'The submarket has structurally weakened and comps are stale; 8% is the new market for this vintage.',
      isBest: false,
      explanation:
        'Possible but unlikely if comps are recent and broad. A 175–225 bps gap on otherwise comparable product almost always reflects asset-specific risk (lease term, tenant, condition) rather than a sudden submarket re-rate that hasn\'t yet shown up in comps.',
    },
    {
      label: 'Investment-grade credit on a short remaining term means buyers are demanding extra yield for credit risk.',
      isBest: false,
      explanation:
        'Backwards — IG credit *compresses* cap rates, not expands them, and short remaining term reduces the relevance of credit quality (the income stops mattering at expiry). The cap gap is driven by the lease being effectively expired, not by credit deterioration.',
    },
    {
      label: 'Cap rate methodology differs — the broker is quoting trailing while comps are forward.',
      isBest: false,
      explanation:
        'Methodology differences rarely produce 200+ bps gaps in normalized markets. They can produce 25–50 bps. The far more economic explanation here is the in-place vs market rent gap and the lease rolling within the underwriting window.',
    },
  ],
  takeaway:
    'A wide going-in cap on an asset with comparable comps is almost always a signal about the income stream, not the building. Short-dated leases at below-market rents create the appearance of a "high cap" because Year 1 NOI is the wrong denominator. Underwrite to trended NOI and a market re-set, not to in-place.',
  tips: [
    'Going-in cap = NOI₁ / Price. If NOI₁ is temporary, the cap is misleading.',
    'Mark-to-market upside is priced into going-in cap as a discount.',
    'Always check WALT (weighted average lease term) before treating in-place income as durable.',
  ],
};
