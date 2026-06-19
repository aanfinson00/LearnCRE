import type { SituationalCase } from '../../types/situational';

export const saleLeasebackComp: SituationalCase = {
  id: 'sale-leaseback-comp',
  title: 'Should you use the sale-leaseback transaction as a cap-rate comp?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  scenario:
    "You're underwriting a 95,000 SF freestanding Class A industrial facility occupied by a national distributor on a triple-net lease with 6 years remaining. You're building your cap-rate support and find three trades in the submarket. Comp A: A 110,000 SF sale-leaseback of a medical device manufacturer's own facility — the seller signed a 15-year NNN lease at lease commencement at a cap rate of 5.0%. Comp B: An 88,000 SF multi-tenant industrial building that sold at a 6.2% cap rate with 3.5 years of weighted average lease term. Comp C: A 102,000 SF single-tenant NNN industrial building (third-party tenant) with 8 years remaining, sold at 5.8%. Your subject has 6 years of term remaining.",
  data: [
    { label: 'Subject', value: '95,000 SF, NNN, national tenant, 6 years remaining' },
    { label: 'Comp A', value: '110,000 SF, sale-leaseback, 15-yr NNN, 5.0% cap' },
    { label: 'Comp B', value: '88,000 SF, multi-tenant, 3.5-yr WALT, 6.2% cap' },
    { label: 'Comp C', value: '102,000 SF, single-tenant NNN, 8-yr remaining, 5.8% cap' },
  ],
  question:
    "Which comps are most valid for your subject, and how should you treat the sale-leaseback cap rate?",
  options: [
    {
      label:
        "Comp C is your primary comp; Comp A (the sale-leaseback) should be applied with a haircut or excluded. Sale-leasebacks typically price at 25–75 bps tighter than arm's-length NNN transactions because: (1) the seller/tenant negotiated a long lease at commencement to achieve favorable sale pricing, (2) the lease length (15 years) is longer than your subject's 6-year remaining term, and (3) pricing is partly determined by financing arbitrage, not pure real estate market. Comp B is a poor comp due to multi-tenant structure and shorter WALT.",
      isBest: true,
      explanation:
        "Correct. Sale-leaseback cap rates embed a pricing component for the seller's financing benefit — the seller is converting illiquid real estate to cash at a premium cost of capital. The buyer accepts a tighter cap (higher price) because the lease term is long (15 years), the tenant is creditworthy, and the deal is certainty-of-close. Your subject has 6 years remaining (not 15), and the lease was negotiated arm's length (not a sale-leaseback). Comp C (8 years, single-tenant, arm's length) is the closest analog — split the difference between Comp C (5.8%) and Comp A (5.0%) only if your subject's credit and asset quality support it.",
    },
    {
      label:
        "Use all three comps equally — they all represent industrial NNN transactions in the same submarket and the comp set is thin.",
      isBest: false,
      explanation:
        "Equal weighting ignores material structural differences. Comp A has 15-year term vs your 6-year; sale-leasebacks trade differently from arm's-length transactions; Comp B is multi-tenant. In a thin comp set, you need to adjust for these differences, not average them away. Using Comp A at face would understate the appropriate cap rate by potentially 25–75 bps, which on a $15M asset at a 5.0% cap would overvalue the asset by $2–4M.",
    },
    {
      label:
        "Comp A is the most useful because it's the newest trade and single-tenant NNN. Sale-leasebacks reflect real-money pricing for industrial NNN — they represent exactly what your buyers will bid.",
      isBest: false,
      explanation:
        "Partially right (sale-leasebacks are real trades) but wrong conclusion. Buyers of your subject — a 6-year term arm's-length NNN deal — will not pay a 15-year sale-leaseback price. They're underwriting rollover risk in year 6 that a 15-year leaseback buyer doesn't have. The shorter remaining term means a tighter exit window and more rollover execution risk, which commands a wider cap (lower price) vs Comp A. Using Comp A uncritically leads to the seller's ask price, not market value.",
    },
    {
      label:
        "Comp B is the most conservative and therefore the safest comp to use — if your subject can support a 6.2% cap, the upside from tenant and structure improvement is pure alpha.",
      isBest: false,
      explanation:
        "Comp B is a multi-tenant building with 3.5-year WALT — a completely different risk profile from a single-tenant NNN with 6 years remaining. Multi-tenant buildings price at wider caps than single-tenant due to diversified rollover risk and higher management intensity. Using Comp B's 6.2% as a baseline would misprice the asset in the other direction — undervaluing single-tenant NNN credit relative to multi-tenant.",
    },
  ],
  takeaway:
    'Sale-leasebacks are a distinct transaction type that price differently from arm\'s-length NNN investments. The key adjustments: (1) add 25–75 bps to sale-leaseback cap rates when using them as comps for shorter-term third-party leases; (2) adjust for lease term (longer term = tighter cap, all else equal, roughly 10–15 bps per year of additional term); (3) exclude multi-tenant comps when pricing single-tenant assets, or adjust explicitly for structural differences. In thin markets, the discipline is adjusting comps — not averaging away differences.',
  tips: [
    'Sale-leaseback premium: buyers pay for deal certainty + lease length. Arm\'s-length buyers underwrite lease rollover — that risk gap = 25–75 bps wider cap.',
    'Lease term adjusts cap rate: rule of thumb is 10–15 bps per additional year of term on industrial/retail NNN.',
    'Multi-tenant vs single-tenant: multi-tenant is typically 50–100 bps wider cap than same-market single-tenant NNN due to management intensity and rollover frequency.',
    'When comparable sets are thin (<5 trades), document each comp\'s structural differences explicitly in your IC memo. Comps tell a story — explain every adjustment.',
  ],
};
