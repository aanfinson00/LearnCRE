import type { SituationalCase } from '../../types/situational';

export const distressedSaleCompInclusion: SituationalCase = {
  id: 'distressed-sale-comp-inclusion',
  title: 'Should the REO sale be in the comp set?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You are pricing a 120,000 SF Class-A suburban office at 92% occupancy with a 6-year WALT. The broker's comp set includes six trades. One of them is an REO (bank-owned) sale that closed 3 months ago — same submarket, similar vintage — but it was 48% occupied when sold, and the price reflects a 9.5% cap rate on in-place NOI. The other five comps trade at 6.0%–6.75% caps on stabilized NOI.",
  data: [
    { label: 'Subject', value: 'Class-A, 92% occ., 6-yr WALT' },
    { label: 'Comps 1–5', value: '6.0%–6.75% cap, stabilized occupancy' },
    { label: 'REO comp', value: '48% occ., 9.5% cap on in-place NOI, 3 mos ago' },
    { label: 'REO location', value: 'Same submarket, similar vintage' },
  ],
  question: 'How should you treat the REO comp when anchoring your cap rate?',
  options: [
    {
      label:
        "Exclude the REO from the stabilized-asset comp set. Price the subject on a 6.25%–6.75% cap from the clean comps. Note the REO separately to understand the floor for a distressed scenario — it's a different product (vacant, lender-controlled, fire-sale pricing) being compared to a stabilized, long-WALT asset.",
      isBest: true,
      explanation:
        'Distressed sales reflect lender urgency and the discount for lease-up risk, not the market equilibrium for stabilized assets. The 9.5% cap on a 48% occupied building embeds a massive lease-up discount that has nothing to do with your 92% occupied, 6-year WALT deal. Averaging it in would compress your comparable cap by 30–50 bps. The right use of the REO comp is as a downside anchor: "what would a motivated seller get in a distressed scenario?" — not as a pricing input for a stabilized hold.',
    },
    {
      label:
        'Include it — it traded in the same submarket 3 months ago; it is the most recent data point.',
      isBest: false,
      explanation:
        "Recency is one criterion; comparability is the more important one. A distressed 48%-occupied sale is a fundamentally different product than a stabilized 92%-occupied asset with 6-year WALT. Including it to get the most recent data point mixes apples and oranges. If you averaged it with the clean comps, your blended cap would be artificially wide, making your subject look cheaper and your underwriting look wrong.",
    },
    {
      label:
        "Weight it at 50% — it's the most recent comp and deserves significant weight, but shouldn't dominate.",
      isBest: false,
      explanation:
        "The problem isn't the weighting — it's that the REO comp is fundamentally incomparable to your stabilized deal. A 50% weight on a comp that prices in 44 percentage points of vacancy upside still pulls your cap rate materially wider. Weighting implies the data points are in the same distribution; these are not.",
    },
    {
      label:
        "Adjust the REO cap rate down to 7.5% to account for the occupancy difference, then include it with the other comps.",
      isBest: false,
      explanation:
        "The math doesn't work cleanly: adjusting a distressed sale cap for occupancy requires estimating stabilized NOI and the lease-up discount, which is exactly what you're trying to establish via comps. The circularity collapses the analysis. More importantly, REO sale pricing reflects not just occupancy but lender urgency, limited marketing time, and as-is condition. These factors don't translate to a simple occupancy adjustment.",
    },
  ],
  takeaway:
    "Comp selection requires separating product type — not just asset class. A distressed lender-controlled sale is a different product than a stabilized institutional sale, even in the same submarket with similar physical attributes. Use distressed comps to understand the downside floor (what a liquidating lender would accept), not to anchor your stabilized pricing. Spell out the exclusion in your IC memo with a one-line rationale.",
  tips: [
    'REO / lender-controlled sales: flag separately, never blend into a stabilized cap rate average.',
    'Distressed comp is useful as: "our downside scenario implies a 9.5% cap, consistent with the REO comp."',
    'Occupancy, WALT, and ownership motivation are all comp-filtration criteria — not just geography and vintage.',
  ],
};
