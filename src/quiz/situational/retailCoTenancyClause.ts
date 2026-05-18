import type { SituationalCase } from '../../types/situational';

export const retailCoTenancyClause: SituationalCase = {
  id: 'retail-co-tenancy-clause',
  title: 'Retail: a department store anchor closes — three inline tenants invoke co-tenancy rights',
  category: 'deal-process',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'retail',
  scenario:
    "You own a strip center adjacent to a regional mall. The mall's department store anchor (not your tenant) announced it's closing. Three of your inline tenants have co-tenancy clauses tied to 'anchor occupancy of the adjacent mall remaining above 75% of GLA.' The department store closure drops mall occupancy below 75%, triggering the clause. The three tenants represent $1.1M of annual base rent ($32/SF average, combined 34,400 SF) and can reduce rent to 6% of gross sales once formally invoked. Trailing-12 sales data: Tenant A at $210/SF, Tenant B at $185/SF, Tenant C at $220/SF. Your current DSCR is 1.30x.",
  data: [
    { label: 'Triggered tenants', value: '3 (combined 34,400 SF)' },
    { label: 'Combined base rent at risk', value: '$1.1M/yr ($32/SF avg)' },
    { label: 'Co-tenancy rent floor', value: '6% of gross sales' },
    { label: 'Tenant A sales/SF', value: '$210 (~11,400 SF)' },
    { label: 'Tenant B sales/SF', value: '$185 (~12,000 SF)' },
    { label: 'Tenant C sales/SF', value: '$220 (~11,000 SF)' },
    { label: 'Current DSCR', value: '1.30x' },
    { label: 'T-12 NOI', value: '$3.4M' },
  ],
  question: "What's the financial exposure, and what's your negotiation posture with each tenant?",
  options: [
    {
      label:
        "Model exposure tenant-by-tenant: A: $210 × 6% = $12.60/SF vs. $32 base → $19.40/SF gap × 11,400 SF = $221k. B: $185 × 6% = $11.10/SF gap → $20.90/SF × 12,000 SF = $251k. C: $220 × 6% = $13.20/SF → $18.80/SF × 11,000 SF = $207k. Total exposure: ~$679k/yr; at 7.0% cap = ~$9.7M value hit. Approach B first (largest gap, most likely to exercise), offer a 2-year extension at $27/SF in exchange for waiving co-tenancy rights. Confirm A and C's intent before pre-emptively conceding — at $220/SF sales, C's gap is the smallest and they may not exercise.",
      isBest: true,
      explanation:
        "Right approach: quantify exposure per tenant, then negotiate selectively in order of incentive to exercise. Tenant B has the largest per-SF gap ($20.90/SF) and is therefore most motivated — negotiate with B first. Tenants A and C have smaller gaps; some tenants use co-tenancy clauses as a negotiating chip rather than an income optimization they actually intend to take. Going to all three simultaneously tips your hand and creates collective bargaining leverage the tenants didn't have individually. The cap-rate impact ($9.7M) determines how far you'll move on rent concessions.",
    },
    {
      label:
        "Assume all three will exercise — take the full $679k NOI hit, notify the lender, and then decide whether to negotiate.",
      isBest: false,
      explanation:
        "Passive approach destroys optionality. Co-tenancy rights typically require formal written notice and then a cure period — you have a window to renegotiate lease terms before the reduction formally takes effect. Waiting hands tenants time to consult counsel and formalize their position, after which negotiating leverage shifts entirely to them. Pre-emptive engagement — especially with the highest-risk tenant — is the right approach.",
    },
    {
      label:
        "Offer all three tenants identical lease modifications — the same deal for everyone is both fair and administratively clean.",
      isBest: false,
      explanation:
        "Ignores the per-tenant risk differential. Tenant C ($220/SF) has the smallest gap and may not exercise — offering a pre-emptive concession when they weren't planning to invoke co-tenancy hands them value they weren't asking for. Uniform offers also signal equal urgency for all three, which strengthens B's bargaining position when B is clearly the most at-risk tenant.",
    },
    {
      label:
        "Sue the mall's departing department store for tortious interference — their closing triggered your co-tenancy clauses, making them liable for your rent loss.",
      isBest: false,
      explanation:
        "Not a viable strategy. Co-tenancy rights exist between you and your tenants; the mall anchor has no contractual obligation to your leases. Tortious interference requires proof that the third party intentionally interfered with your contracts — a retailer closing an underperforming store is ordinary business judgment, not intentional interference. This path wastes time that should be spent on lease negotiations.",
    },
  ],
  takeaway:
    "Co-tenancy exposure analysis requires per-tenant calculation, not a blended average — each tenant's pct-rent floor (their sales/SF × the pct rate) determines the gap and therefore how motivated they are to exercise. Negotiate selectively in order of exposure: highest-gap tenants first, lowest-gap last (or not at all). Proactive engagement during the cure period — before formal invocation — provides substantially more leverage than responding after a tenant's written exercise notice.",
  tips: [
    "Cure period timing: most retail leases give the landlord 90-180 days to cure the co-tenancy deficiency (re-lease the anchor or meet the occupancy threshold) before the rent reduction takes effect. Use this window proactively.",
    "Percentage-of-sales floors can have a 'greater of percent-of-sales OR $X/SF' structure — the exercised co-tenancy rent may be higher than the raw pct calculation suggests. Pull the exact lease language for each tenant.",
    "Buyer due diligence flag: if you're acquiring a center adjacent to a mall with vacancy above 75%, map every inline lease for co-tenancy triggers before LOI — this is a known but frequently undisclosed risk in mall-adjacent strip centers.",
  ],
};
