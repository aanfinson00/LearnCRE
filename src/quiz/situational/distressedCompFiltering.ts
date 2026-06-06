import type { SituationalCase } from '../../types/situational';

export const distressedCompFiltering: SituationalCase = {
  id: 'distressed-comp-filtering',
  title: 'Do these foreclosure comps belong in the set?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    "You're valuing a suburban office building for acquisition. The broker's comp set has 5 trades: 3 are conventional arms-length sales, and 2 are lender-owned (REO/foreclosure) dispositions. The REO comps show cap rates 120–150 bps wider than the arms-length trades. The broker argues the REO comps 'validate' your acquisition target price, which also sits at a wide cap. You need to decide how to treat the full comp set.",
  data: [
    { label: 'Arms-length comps (3)', value: '6.0–6.5% cap, same submarket' },
    { label: 'REO/foreclosure comps (2)', value: '7.5–8.0% cap, same submarket' },
    { label: 'REO premium to arms-length', value: '120–150 bps' },
    { label: 'Broker argument', value: 'REO comps support the subject target price' },
  ],
  question: 'How should the REO comps factor into your pricing analysis?',
  options: [
    {
      label: "Segregate the sets: use the arms-length comps to establish market value (~6.0–6.5%), and use the REO comps separately to understand distressed pricing and your downside in a forced-sale scenario. Never blend them into a single cap rate.",
      isBest: true,
      explanation:
        "REO/foreclosure sales are not arms-length transactions in the economic sense. The seller (a lender) is motivated by balance sheet clearance under regulatory pressure, not by maximizing proceeds. Buyers know this and price in the distressed discount. The result is typically 100–200 bps cap rate premium over arms-length trades in the same submarket for the same product type. These comps are useful for two specific purposes: (1) as a floor — the clearing price if the asset had to be sold quickly under duress, and (2) as a downside scenario — 'if this goes wrong and we become a forced seller, this is market clearing.' For a conventional acquisition where you're buying a going concern, the arms-length comps establish market value. Blending them would systematically understate what the asset is worth to an unconstrained buyer.",
    },
    {
      label: "Average all five comps — the market can't distinguish between arms-length and REO if they're in the same submarket.",
      isBest: false,
      explanation:
        "Buyers and appraisers absolutely distinguish between arms-length and distressed sales — it's one of the first filters in any professional comp analysis. REO trades reflect a constrained seller, not market equilibrium. A blended average of all five (~7.0% cap) would systematically underprice a stabilized asset relative to where unconstrained buyers are actually transacting at 6.0–6.5%.",
    },
    {
      label: "Use only the REO comps — they're the most recent evidence of where office is actually clearing right now.",
      isBest: false,
      explanation:
        "REO pricing reflects constrained-seller transactions, not market equilibrium. Using them exclusively to benchmark a non-distressed acquisition builds in a false risk premium. You'd be pricing as if your target asset were distressed — which either means underwriting excessively cheap (if you then price tighter) or overstating your return (if the REO discount doesn't apply).",
    },
    {
      label: "Apply a 100 bps 'distress premium' haircut to the REO comps and include them in the adjusted comp set.",
      isBest: false,
      explanation:
        "Adjusting comps is valid methodology, but 100 bps needs empirical justification, not intuition. More importantly: if you can defensibly adjust the REO comps to market, the adjusted figure should roughly converge with the arms-length comps — confirming they were your market anchor all along. The adjustment exercise doesn't produce new information; it just re-confirms the arms-length comps. Skip the step and use the arms-length set directly.",
    },
  ],
  takeaway:
    "Comp selection requires like-for-like transactions: same seller motivation (arms-length), similar product quality and lease profile, and recent vintage relative to the rate environment. REO/foreclosure sales reflect distress-motivated sellers and belong in a separate analysis as downside floor comps — not blended into market-value pricing. Always segregate the sets and explain the distinction clearly in your IC presentation.",
  tips: [
    'REO premium: typically 100–200 bps over arms-length in the same submarket; widens in dislocated markets.',
    "Note the broker's incentive: REO comps widen the cap and support a higher acquisition price for the buyer — which is what the broker wants.",
    "USPAP (appraisal standards) and regulated lenders require the 'arms-length' filter; apply the same discipline to your own pricing work.",
  ],
};
