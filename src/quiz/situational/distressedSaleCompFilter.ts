import type { SituationalCase } from '../../types/situational';

export const distressedSaleCompFilter: SituationalCase = {
  id: 'distressed-sale-comp-filter',
  title: "Should the REO sale go in your comp set?",
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're pricing a stabilized 120-unit Class-B multifamily acquisition. You identify four recent comps in the submarket. Three are conventional arm's-length trades: Comp 1 at 5.25% cap, Comp 2 at 5.40% cap, Comp 3 at 5.30% cap. Comp 4 is a lender-owned (REO) sale that closed last month at 6.00% cap after the previous owner defaulted. It's the same vintage and submarket as your subject asset.",
  data: [
    { label: 'Comp 1', value: 'Arm\'s length — 5.25% cap' },
    { label: 'Comp 2', value: 'Arm\'s length — 5.40% cap' },
    { label: 'Comp 3', value: 'Arm\'s length — 5.30% cap' },
    { label: 'Comp 4', value: 'REO / lender-owned — 6.00% cap' },
    { label: 'Subject vintage', value: 'Same as Comp 4' },
    { label: 'Submarket', value: 'All 4 comps in same submarket' },
  ],
  question:
    "How should you treat Comp 4 in your pricing analysis?",
  options: [
    {
      label:
        "Discard Comp 4 as a direct pricing comp, but document it as evidence of distressed market clearing. REO sales reflect a motivated seller, unknown deferred maintenance, and a lender's desire for quick execution — none of which reflects the arm's-length market. Use Comps 1–3 (5.25–5.40%) as your anchor, then stress-test your underwriting against Comp 4's 6.00% as a downside exit scenario.",
      isBest: true,
      explanation:
        "REO sales are not arm's-length transactions. The seller (lender) is motivated to dispose quickly, often accepting a discount to avoid carrying costs and regulatory capital charges. The asset may have deferred maintenance that drove the cap wider. Using 6.00% as an equivalent comp to arm's-length 5.25–5.40% trades would add ~40–75 bps to your going-in cap and potentially cause you to under-bid or misprice the asset. However, dismissing it entirely is also wrong — it tells you something about where distressed capital can clear, which is relevant for your downside exit cap.",
    },
    {
      label:
        "Include Comp 4 equally in the average — recency trumps transaction type, and it's the same submarket.",
      isBest: false,
      explanation:
        "Including an REO at equal weight pulls the comp average to ~5.49%, adding ~15–20 bps to the cap anchor vs. the arm's-length comps alone. The problem is that REO pricing reflects motivated-seller dynamics, not equilibrium market pricing. Lenders underwrite on arm's-length transactions, and your IC will ask why you included a distressed comp at face value.",
    },
    {
      label:
        "Weight Comp 4 at 50% — it's recent and in the right submarket, but partially offset for the distress discount.",
      isBest: false,
      explanation:
        "Partial weighting is better than equal weighting but still lacks discipline. 'Partial weight' is arbitrary without a documented basis for the discount. The right approach is to discard it as a pricing anchor and use it separately as a downside stress test — that's a defensible methodology.",
    },
    {
      label:
        "Use Comp 4 as the primary comp — it's the most recent trade and lenders don't care whether it was REO.",
      isBest: false,
      explanation:
        "Lenders absolutely distinguish between arm's-length and REO sales when appraising. Appraisers exclude or adjust for non-arm's-length transactions per USPAP guidelines. Presenting an REO as your primary pricing comp will create problems in loan underwriting and with your own IC.",
    },
  ],
  takeaway:
    "REO and other non-arm's-length transactions (estate sales, related-party trades, foreclosures) are not equivalent to market pricing. Discard them as primary comps but document them as useful data points — they reveal where distressed capital can clear, which informs your downside exit cap scenario.",
  tips: [
    "Non-arm's-length flags: REO, related-party, estate, deed-in-lieu, lender-directed disposition.",
    "Always check FOIA/property records for deed type when vetting comps.",
    "Distressed comps belong in your stress test, not your primary pricing range.",
  ],
};
