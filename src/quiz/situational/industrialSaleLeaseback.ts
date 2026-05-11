import type { SituationalCase } from '../../types/situational';

export const industrialSaleLeaseback: SituationalCase = {
  id: 'industrial-sale-leaseback',
  title: 'Industrial sale-leaseback: buyer pricing discipline vs. seller equity story',
  category: 'pricing',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "An investment-grade (BBB) national distributor approaches your fund with a sale-leaseback on its 300,000 SF distribution center. The company has owned the building for 14 years (basis: ~$10M). They want to sell at $45M and simultaneously sign a 20-year absolute NNN lease at $5.25/SF. Their stated rationale: monetize the balance sheet and redeploy capital into the core business. Market cap rates for comparable IG-credit, long-term NNN industrial assets in the submarket trade at 4.8–5.2%. Your fund's target unlevered IRR is 7.5% and target levered IRR is 13%.",
  data: [
    { label: 'Building', value: '300,000 SF distribution center' },
    { label: 'Lease term offered', value: '20 years, absolute NNN' },
    { label: 'Annual rent', value: '$5.25/SF × 300,000 = $1.575M' },
    { label: "Seller's asking price", value: '$45M (~3.5% implied cap)' },
    { label: 'Market cap rate range', value: '4.8–5.2% (IG-credit, long-term NNN)' },
    { label: "Value at 5.0% cap (market mid)", value: '$1.575M ÷ 5.0% = $31.5M' },
    { label: "Value at 4.5% cap (aggressive)", value: '$1.575M ÷ 4.5% = $35.0M' },
    { label: 'Tenant credit', value: 'Investment grade (BBB)' },
  ],
  question:
    "The seller argues their $45M ask reflects the building's replacement cost and long lease certainty. How should you respond, and what's the right bid range?",
  options: [
    {
      label:
        "Anchor off NOI ÷ market cap rate. At 5.0% (market mid), the building is worth $31.5M; at 4.5% (aggressive for IG + 20-year NNN), it's $35M. The seller's $45M implies a 3.5% cap rate — below anything that trades in this submarket. Replacement cost and lease certainty are relevant inputs but they don't override the cap rate; an IG-credit NNN lease is already baked into the 4.8–5.2% market range. Bid $31–34M and explain that the seller's low basis ($10M) is their motivation, not a pricing input for the buyer.",
      isBest: true,
      explanation:
        "Right framework. Cap rate discipline is non-negotiable in sale-leaseback pricing. The seller's high valuation is driven by their low basis and desire to crystallize equity — classic owner-user psychology. But from the buyer's perspective, the investment is a 20-year IG-credit NNN bond substitute, and it prices like one. The 3.5% implied cap the seller is seeking is materially below the market floor for this tenant credit tier and lease term. Replacement cost ($45M if true) only becomes a pricing floor if the land is constrained and the tenant's rent closely tracks market — neither of which changes the NOI-based valuation. A disciplined bid of $31–34M ($5.25/SF rent ÷ 4.5–5.0% cap) is the defensible range.",
    },
    {
      label:
        "Pay $45M — the 20-year absolute NNN lease removes all execution risk. No vacancy, no capex, no management — this is a bond and bonds with IG credit trade at sub-4% yields.",
      isBest: false,
      explanation:
        "Overreaching analogy. An NNN real estate lease is not a corporate bond: it carries residual value risk (building obsolescence after year 20), re-leasing risk if the tenant exercises a termination right, and illiquidity. Corporate IG bonds for this credit profile trade in the 5–6% YTM range — not sub-4%. At $45M / 3.5% cap, you're paying a premium below investment-grade bond yields for an asset with real estate risk premium. The lease certainty is already reflected in the 4.8–5.2% market cap range — not in a sub-4% pricing floor.",
    },
    {
      label:
        "The seller's tax basis is the key negotiating lever — they have a $35M gain at $45M, so they need to 1031 to make the deal work. Use their tax situation to push the price down.",
      isBest: false,
      explanation:
        "The seller's tax situation is their problem, not a buyer's pricing input. Even if a 1031 exchange motivation is real, the buyer cannot price off the seller's tax basis — the buyer's IRR benchmark is the governing constraint. More practically, a 1031 exchange only means the seller needs to close and identify a replacement within statutory deadlines; it doesn't give you leverage to underbid significantly, because the seller can simply cancel the sale-leaseback if the price doesn't work. Focus on cap rate discipline, not tax leverage.",
    },
    {
      label:
        "Negotiate for a 25-year lease term and bump rents every 5 years to justify paying $40–42M — extended term and rent growth support a premium above market.",
      isBest: false,
      explanation:
        "Structurally moving in the right direction (longer term and rent bumps improve value), but the math still doesn't support $40–42M. Even with 10% rent bumps every 5 years and a 25-year term, the going-in cap at $40M is only $1.575M / $40M = 3.94% — still 90+ bps inside the tightest end of the market cap range. You're solving the wrong problem by negotiating lease structure when the fundamental issue is a 35–40% price gap from market.",
    },
  ],
  takeaway:
    "Sale-leaseback pricing is anchored to NOI ÷ market cap rate — not replacement cost, seller basis, or lease term alone. Owner-users tend to self-value based on their equity appreciation and the certainty of the leaseback; buyers must impose discipline around comparable NNN cap rates for the relevant credit tier and lease duration. The seller's tax situation is their business; the buyer's IRR target is the binding constraint.",
  tips: [
    'IG-credit NNN industrial cap rates (2025–26): 4.5–5.5% depending on market tier, lease term, and rent-to-market ratio.',
    "Check whether the leaseback rent is at, above, or below market. Above-market rent compresses cap rates at purchase; below-market rent means rollover risk at lease expiry and should widen your cap.",
    'Absolute NNN means tenant pays ALL costs (taxes, insurance, maintenance, capex) — verify the lease language; many "NNN" leases still have landlord carve-outs for roof and structure.',
  ],
};
