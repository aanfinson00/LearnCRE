import type { SituationalCase } from '../../types/situational';

export const compSubmrktBoundary: SituationalCase = {
  id: 'comp-submarket-boundary',
  title: 'The asset sits at a submarket boundary — whose comps apply?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You are bidding on a 200-unit multifamily asset located at the edge of two submarkets, separated by a major highway. Submarket A (where the building is legally located) has traded at 5.50–5.75% caps over the trailing 12 months. Submarket B (0.8 miles away) has traded at 5.00–5.25% caps. The seller\'s broker argues the asset "functions as a Submarket B property" based on highway access, school district, and tenant profile, and is pricing it accordingly.',
  data: [
    { label: 'Asset location', value: 'Legally in Submarket A' },
    { label: 'Submarket A cap range', value: '5.50–5.75% (trailing 12 months)' },
    { label: 'Submarket B cap range', value: '5.00–5.25% (trailing 12 months)' },
    { label: 'Distance to Submarket B', value: '0.8 miles, separated by highway' },
    { label: 'Broker argument', value: 'Asset "functions as" Submarket B — price accordingly' },
  ],
  question: 'How do you build the right comp set for this asset?',
  options: [
    {
      label: 'Anchor to Submarket A as your primary comp set. If you can verify — through signed rent comparisons, tenant profile, and school district data — that the asset genuinely performs like Submarket B, apply a documented partial adjustment of 15–25 bps tighter. Do not adopt Submarket B caps wholesale without evidence.',
      isBest: true,
      explanation:
        'Submarket labels are data-aggregation boundaries, not physical laws. A major highway can create genuine psychological and functional separation — tenants may self-identify with the other side based on school districts, retail access, or commute patterns. However, the broker\'s incentive is to pull you toward the tighter cap set (Submarket B = higher implied value). Your job is to verify: (a) Do actual signed rents in the building track Submarket A or B averages? (b) Does the tenant profile (income, employer base) match Submarket B? (c) Is access and daily orientation genuinely toward Submarket B? If the evidence supports a partial adjustment, document it with specifics. If it does not, anchor to Submarket A. The Submarket A anchor is your defensive floor; a documented adjustment is the ceiling.',
    },
    {
      label: 'Use Submarket A only — the asset is legally located there and that is the correct apples-to-apples benchmark.',
      isBest: false,
      explanation:
        'Too rigid. Submarket boundaries are drawn for data aggregation and do not always reflect functional market reality. If the building demonstrably draws tenants from Submarket B and achieves rents consistent with that submarket, a pure Submarket A anchor undervalues the asset or leaves the buyer exposed to a more aggressive competing bidder. Defensible underwriting acknowledges the boundary issue and documents the reasoning — it does not automatically default to legal address.',
    },
    {
      label: 'Use Submarket B caps at 5.00–5.25% — the broker\'s access and school district argument is credible and reflects real tenant behavior.',
      isBest: false,
      explanation:
        'The broker\'s argument may be credible, but it has not been verified. Adopting Submarket B pricing without documented evidence means paying Submarket B prices for an asset with unconfirmed Submarket B fundamentals. If the functional argument is wrong, you overpay by 50 bps on the cap rate — significant at this price level. Verify before adopting: check signed rents, tenant income profiles, and comparable leases in both submarkets.',
    },
    {
      label: 'Average Submarket A and Submarket B caps to get a 5.25–5.50% midpoint — that captures the geographic ambiguity.',
      isBest: false,
      explanation:
        'Midpoint averaging is convenient but not analytical. The right cap depends on which submarket\'s fundamentals the asset actually reflects, which requires evidence — not a geographic average. An unverified midpoint could result in overpaying by 25 bps if the asset functions as Submarket A, or underpaying by 25 bps if it genuinely functions as Submarket B. Evidence-based adjustment beats arbitrary midpoint averaging.',
    },
  ],
  takeaway:
    'Submarket boundaries are tools for data aggregation, not physical laws. Assets near boundaries require a dual-set analysis: anchor to the legal submarket, then evaluate whether verifiable evidence (signed rents, tenant profile, access patterns) supports a documented cross-submarket adjustment. Broker arguments for tighter caps should always be verified — the incentive is to support the seller\'s price, not to give you a defensible comp set.',
  tips: [
    'Check actual signed rents versus each submarket\'s average — that is the fastest proxy for functional submarket membership.',
    'Boundary assets may face an institutional discount from buyers who model strictly by submarket designation — factor that into exit assumptions.',
    'Document every cross-submarket adjustment with specific evidence; IC will ask why you deviated from the legal-address comp set.',
  ],
};
