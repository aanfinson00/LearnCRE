import type { SituationalCase } from '../../types/situational';

export const retailOccupancyCostRatio: SituationalCase = {
  id: 'retail-occupancy-cost-ratio',
  title: 'Retail: occupancy cost ratio as a tenant health diagnostic',
  category: 'diagnostic',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'retail',
  scenario:
    "You manage a 120,000 SF community center. A soft-goods retailer occupying 3,500 SF is up for lease renewal. Their current all-in occupancy cost (base rent + NNN CAM/tax/insurance reimbursement) is $42/SF. They've reported gross sales of $280/SF in their most recent percentage-rent filing. You're asking $45/SF base + NNN (all-in: ~$52/SF) to bring them to market; they're counter-offering at their current $42/SF. Industry benchmarks for soft-goods retailers suggest a healthy OCR is 10–13%; above 15% signals stress.",
  data: [
    { label: 'Tenant', value: 'Soft-goods retailer, 3,500 SF' },
    { label: 'Current all-in occupancy cost', value: '$42/SF (base + NNN)' },
    { label: 'Gross sales (reported)', value: '$280/SF' },
    { label: 'Current OCR', value: '$42 ÷ $280 = 15.0%' },
    { label: 'Landlord market ask', value: '$52/SF all-in' },
    { label: 'OCR at market ask', value: '$52 ÷ $280 = 18.6%' },
    { label: 'Healthy OCR benchmark (soft goods)', value: '10–13%' },
    { label: 'Stressed OCR threshold', value: '>15%' },
  ],
  question:
    "How should the tenant's OCR inform your renewal negotiation strategy?",
  options: [
    {
      label:
        "The tenant is already stressed at 15% OCR — pushing to market ($52/SF all-in = 18.6% OCR) meaningfully increases default or dark-store risk. A better strategy: negotiate a step-up to $44–46/SF all-in (OCR ~15.7–16.4%), pair it with a kick-out clause triggered if annual sales fall below $275/SF for two consecutive years, and prioritize retaining the tenant over maximizing near-term rent. An empty 3,500 SF in a soft-goods category with soft demand is harder to re-lease than a below-market occupied space.",
      isBest: true,
      explanation:
        "Right framework. OCR is the diagnostic: current OCR of 15% is already above the 13% healthy ceiling for soft goods — the tenant is paying more relative to sales than their peers. Pushing to 18.6% OCR risks triggering a rent-default spiral or an early exit negotiation that costs you months of vacancy and TI to re-lease. The disciplined approach is to find a rent that (a) stays below the stress threshold, (b) closes some of the gap to market, and (c) includes performance protections like a kick-out clause that gives you optionality if sales decline further. Retaining an occupied, paying tenant beats vacancy in most soft-goods categories.",
    },
    {
      label:
        "Push to market ($52/SF all-in). Sales of $280/SF are adequate — the tenant is profitable and can afford market rent. OCR benchmarks are guidelines, not hard limits.",
      isBest: false,
      explanation:
        "At 18.6% OCR, the tenant's total occupancy costs would consume nearly one-fifth of their gross revenue — before cost of goods, labor, or G&A. For a soft-goods retailer, typical COGS is 50–60%, labor 15–20%, and G&A 5–8%. A 18.6% OCR leaves virtually no margin, making default or negotiated early exit highly likely within 12–18 months. OCR benchmarks are not arbitrary; they reflect the structural economics of the retail category. Exceeding them materially increases credit risk.",
    },
    {
      label:
        "OCR analysis only applies to food & beverage tenants. For soft-goods, the right metric is sales per SF relative to market — $280/SF is below the $350/SF average for national soft-goods retailers, which is the real problem.",
      isBest: false,
      explanation:
        "OCR applies to all retail tenants; it is the universal metric for tenant lease affordability. Food & beverage has different benchmark thresholds (8–10% for QSR, 10–12% for casual dining) but OCR is just as relevant for soft goods, sporting goods, electronics, and every other retail category. The $280/SF vs. $350/SF comparison is a useful supplemental data point (this tenant underperforms national peers in sales productivity), which actually strengthens the argument against pushing to market — the tenant is both above the stress OCR threshold AND below the sales productivity benchmark for the category.",
    },
    {
      label:
        "If the tenant can't pay market rent, replace them. Soft-goods retailers at $280/SF in sales are below market productivity — the space would be better served by a new tenant at market rent.",
      isBest: false,
      explanation:
        "Potentially valid as a long-term strategy but not as an immediate negotiation posture. The question is whether you can re-lease at market rent quickly enough to offset vacancy costs and TI. Soft-goods vacancy in a community center format carries meaningful re-leasing risk: the category pool is contracting, downtime between tenants in soft goods is typically 9–18 months, and the new tenant will likely require a TI package at market ($30–50/SF). Run the NPV: occupying at $44/SF vs. 12 months of vacancy + $40/SF TI on a 5-year new lease. In many cases, retaining the existing tenant at a stepped-up rate wins.",
    },
  ],
  takeaway:
    "Occupancy cost ratio (OCR = total occupancy cost ÷ gross sales) is the single most actionable tenant health diagnostic in retail. It tells you whether your tenant's rent is affordable relative to their revenue. An OCR above the category ceiling is an early warning sign of default risk; pushing rent higher when OCR is already elevated accelerates the problem. The landlord's job is to balance in-place income certainty against the risk of vacancy — OCR gives you the data to have that conversation quantitatively.",
  tips: [
    "OCR benchmarks by category: grocery anchor 1–2%; QSR / fast casual 8–10%; casual dining 10–12%; soft goods / apparel 10–13%; electronics 5–8%; fitness 10–15%. Benchmarks shift by market tier.",
    "When OCR exceeds the category ceiling by >3%, model a vacancy-and-re-lease scenario vs. renewal to find the NPV break-even rent.",
    "Kick-out clauses keyed to sales thresholds are a landlord-friendly tool for stressed-OCR renewals — they preserve optionality without triggering an immediate default.",
  ],
};
