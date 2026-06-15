import type { SituationalCase } from '../../types/situational';

export const classQualityCompAdjustment: SituationalCase = {
  id: 'class-quality-comp-adjustment',
  title: 'Your comps are Class A — your subject is Class B. How do you adjust?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're bidding on a 1998-vintage, 200-unit Class-B multifamily asset in a growing Sun Belt submarket. The only available recent comps are three Class-A trades (2017–2021 vintage) in adjacent neighborhoods at 4.75–5.00% caps. No direct Class-B comps have traded in 14 months. The seller is pitching a 4.90% going-in cap, arguing the submarket has converged and Class B is \"getting Class-A demand.\"",
  data: [
    { label: 'Subject', value: '200 units, 1998 vintage, Class B' },
    { label: 'Comp A', value: '2021 vintage, Class A — 4.75% cap' },
    { label: 'Comp B', value: '2019 vintage, Class A — 4.85% cap' },
    { label: 'Comp C', value: '2017 vintage, Class A — 5.00% cap' },
    { label: 'Seller ask', value: '4.90% going-in cap' },
    { label: 'Last Class-B trade', value: '14 months ago' },
  ],
  question: 'How do you use the Class-A comp set to price the Class-B subject?',
  options: [
    {
      label:
        "Apply a 50–75 bps quality adjustment to the Class-A midpoint (~4.87%) — Class B carries higher capex burden, shorter remaining economic life, and a slightly thinner buyer pool. The defensible subject range is 5.37–5.62%. Bidding at the seller's 4.90% would require believing Class B has fully converged with Class A, which the capex delta alone disproves.",
      isBest: true,
      explanation:
        "The Class A-to-B cap spread has been documented by CBRE, JLL, and NCREIF at 40–80 bps in most major markets, with tighter spreads in supply-constrained markets and wider spreads in markets with active new construction. The spread exists for fundamental reasons: Class A has lower capex reserves, newer systems, and a broader institutional buyer pool. A 1998 vintage subject vs. 2017–2021 comps represents a generation gap in building systems, HVAC, roofing, and amenities — each of which a buyer must reserve for. 50–75 bps quality adjustment to the A comps produces a defensible 5.37–5.62% range. The seller's claim of 'demand convergence' may be real in rent growth terms but does not erase capex reserve differentials.",
    },
    {
      label:
        "Use the Class-A comps at face value — in today's market Class B and A are essentially the same buyer pool.",
      isBest: false,
      explanation:
        "Buyer pool convergence is a demand-side story that does not eliminate the cost-side differential. Institutional buyers who pay Class-A prices for Class-B assets still underwrite capex reserves for aging systems — they just factor it differently. The gap may have compressed from 80 bps to 50 bps in a hot market, but zero-gap pricing overpays.",
    },
    {
      label:
        "Discard all three comps since they're not comparable asset class — wait for a Class-B trade to emerge.",
      isBest: false,
      explanation:
        "Waiting for a direct comp is not an option in a live deal process — the market doesn't pause for perfect data. When Class-B trades are absent, analysts bridge from Class-A comps with documented adjustments. This is standard appraisal methodology and is fully defensible in IC. Discarding comps without substitution leaves you with no pricing anchor at all.",
    },
    {
      label:
        "Apply a 150 bps adjustment — Class B always trades at a full point or more wide in any market.",
      isBest: false,
      explanation:
        "150 bps is a severe-distress or major-city-Class-C spread, not a standard A-to-B gap. Applying a 150 bps haircut to a 4.87% midpoint implies a 6.37% subject cap — recession-grade pricing on a stabilized Class-B asset. That floor may be appropriate as a downside case but is not the central bid. Your IC will ask you to defend the spread with data; 150 bps without a specific capex- or liquidity-based justification looks like a walk-away rationalization rather than disciplined pricing.",
    },
  ],
  takeaway:
    "Cross-class comp adjustments require documented rationale, not gut-feel. The three drivers of Class-A-to-B spread: (1) capex reserve differential — older buildings require more capital; (2) remaining economic life — shorter life compresses terminal value; (3) buyer pool depth — Class A trades to a broader universe of institutional buyers. Quantify each driver separately where possible. In practice, a 50–75 bps quality adjustment to the A comp midpoint is well within IC-defensible range for a 25-year-old subject vs. vintage-2017–2021 comps.",
  tips: [
    "Rule of thumb: Class-A to -B spread is 40–80 bps in major markets; wider in supply-heavy or secondary markets.",
    "Always show the adjustment separately in comp tables so reviewers can evaluate it independently.",
    "The 'demand convergence' pitch is real but affects rent growth, not capex reserves — keep them separate.",
  ],
};
