import type { SituationalCase } from '../../types/situational';

export const compSelectionRetailAnchorPremium: SituationalCase = {
  id: 'comp-selection-retail-anchor-premium',
  title: "Broker cites a grocery-anchored comp to price your unanchored strip",
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'retail',
  scenario:
    "You're underwriting a 35,000 SF unanchored neighborhood retail strip, 88% leased to six local and regional tenants averaging 3 years of remaining lease term. The broker is defending a 6.5% going-in cap using two comps: a 68,000 SF grocery-anchored center that traded at 6.3% and a 45,000 SF national-credit inline strip (CVS anchor, long-term NNN) that traded at 6.7%. Your NOI = $780k.",
  data: [
    { label: 'Subject', value: '35,000 SF · unanchored · 88% leased · local/regional tenants · avg 3-yr term' },
    { label: 'Comp 1', value: '6.3% cap · 68k SF grocery-anchored center · 95% leased' },
    { label: 'Comp 2', value: '6.7% cap · 45k SF national-credit inline strip · long-term NNN' },
    { label: 'Broker ask', value: '6.5% cap (blended avg of two comps) → $12.0M implied value' },
    { label: 'Submarket vacancy', value: '~12% for unanchored strips' },
  ],
  question:
    "Are the broker's comps applicable, and at what cap rate would you underwrite the subject?",
  options: [
    {
      label:
        "Neither comp is applicable without a material cap-widening adjustment. Grocery-anchored centers (6.3%) command tighter caps because anchor traffic drives inline demand, reduces vacancy risk, and attracts institutional buyers. National-credit NNN strips (6.7%) are underwritten primarily on tenant covenant strength, not local market fundamentals. The subject — unanchored, local tenants, 3-year average term, in a 12%-vacancy submarket — carries meaningfully higher rollover and re-leasing risk. The defensible underwriting cap is 7.25–7.75%, implying ~$10.1–10.8M vs the broker's $12.0M. Make the broker quantify the anchor and credit premium, not the other way around.",
      isBest: true,
      explanation:
        "The cap spread between unanchored local retail and anchored/credit retail is well-documented at 75–125 bps in current markets. Comp 1 (grocery-anchored) has three advantages the subject lacks: anchor traffic, institutional buyer pool, and lower vacancy risk — worth ~50–75 bps. Comp 2 (national credit NNN) is priced on covenant quality, which doesn't apply to local tenants on short leases. Together, an unanchored strip with 3-year average term and 12% submarket vacancy should trade 75–125 bps wider than either comp. At 7.5% cap: $780k / 7.5% = $10.4M — $1.6M below the broker's $12M ask.",
    },
    {
      label:
        "Average the two comps (6.5%) and apply it — that's the market clearing level for retail in this submarket.",
      isBest: false,
      explanation:
        "Averaging fundamentally different retail asset types produces a meaningless midpoint. Grocery-anchored and national-credit NNN are priced on different demand drivers than unanchored local retail. 'Same submarket' doesn't make the comps comparable when the tenant base, anchor status, and lease structure are materially different.",
    },
    {
      label:
        "Use Comp 1 (6.3%) because the subject's 88% occupancy and stable tenants justify pricing at the tighter end of retail caps.",
      isBest: false,
      explanation:
        "88% occupancy in a 12%-vacancy submarket is in-line, not strong. More importantly, the grocery anchor is what justified the 6.3% cap — it's not transferable to an unanchored asset. Applying the anchor premium to a non-anchored center is the exact error the broker is making.",
    },
    {
      label:
        "The two comps validate the 6.5% since both are in the same submarket and both are retail — that's sufficient comparability for a pricing anchor.",
      isBest: false,
      explanation:
        "'Same submarket, same asset class' is the beginning of comp selection, not the end. Within retail, anchor status, tenant credit quality, lease structure (NNN vs gross), average term, and occupancy level all drive cap-rate differentiation — sometimes by 100+ bps. The broker's argument is the analytical equivalent of using a luxury apartment comp to price a workforce housing building because both are in the same zip code.",
    },
  ],
  takeaway:
    "Within retail, anchored vs unanchored and credit-tenant vs local-tenant are cap-rate-driving distinctions, not minor adjustments. Grocery-anchored centers trade 50–75 bps tighter than unanchored strips; national-credit NNN trades tighter still. When a broker presents comps from a higher-quality tier to justify a tight cap on a lower-quality asset, the discipline is to quantify each premium and subtract it — not to accept the unadjusted blend. Always ask: 'What specifically does this comp have that my asset also has?'",
  tips: [
    "Retail cap-rate hierarchy (tight to wide): net-lease credit tenant → grocery-anchored → power center → neighborhood unanchored → single-tenant value-add.",
    "Unanchored local retail in a high-vacancy submarket typically trades 100–150 bps wider than anchored comp set.",
    "Short remaining lease terms (< 3 years) add rollover risk that widens the cap further — model the re-leasing scenario explicitly.",
  ],
};
