import type { SituationalCase } from '../../types/situational';

export const hotelBrandConversionAnalysis: SituationalCase = {
  id: 'hotel-brand-conversion-analysis',
  title: "Brand conversion: $3.2M PIP — does the RevPAR lift justify the cost?",
  category: 'investment-thesis',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'hotel',
  scenario:
    "You're acquiring a 180-key independent limited-service hotel for $14.4M ($80k/key). Current trailing-12 performance: 60% occupancy, $92 ADR, $55.20 RevPAR, 30% GOP margin (NOI ~$965k, based on ~$3.22M gross room revenue × 30%). The value-add plan: flag it with a national select-service brand. Comparable flagged hotels in this submarket post a RevPAR Index of 108 vs independents, implying a $72–$76 stabilized RevPAR vs the current $55. Required property improvement plan (PIP): $3.2M. Ongoing franchise royalty: 5% of gross room revenue. Stabilized gross room revenue at $74 RevPAR: ~$4.87M/yr (180 keys × 365 days × $74).",
  data: [
    { label: 'Acquisition price', value: '$14.4M ($80k/key)' },
    { label: 'Current performance', value: '60% OCC · $92 ADR · $55.20 RevPAR · 30% GOP margin' },
    { label: 'Stabilized target (branded)', value: '$74 RevPAR · est. 32% GOP margin post-royalty' },
    { label: 'PIP cost', value: '$3.2M ($17.8k/key)' },
    { label: 'Franchise royalty', value: '5% of gross room revenue' },
    { label: 'All-in basis post-PIP', value: '$17.6M ($97.8k/key)' },
    { label: 'Market exit cap (branded)', value: '~8.0%' },
  ],
  question:
    "Does the brand conversion create value, and what is the critical assumption that makes or breaks the thesis?",
  options: [
    {
      label:
        "The conversion creates ~$2.5–3M of net value if the RevPAR target is achieved. Stabilized NOI: $4.87M GRR × 32% GOP margin = $1.56M vs current $0.97M. At an 8% exit cap: $1.56M / 8% = $19.5M stabilized value vs $17.6M all-in cost → ~$1.9M of value creation on a hold-to-stabilization basis; more if the exit cap compresses below 8% for branded product. The critical assumption is achieving the $74 RevPAR through the brand's distribution platform. If stabilized RevPAR comes in at $65 instead of $74, NOI drops to ~$1.35M → stabilized value of $16.9M, below all-in basis.",
      isBest: true,
      explanation:
        "The math: current NOI ≈ $3.22M × 30% = $965k. Stabilized (branded): GRR = 180 × 365 × $74 = $4.87M; royalty = $4.87M × 5% = $243k (embedded in the 32% margin assumption); NOI at 32% = $1.56M. Exit value = $1.56M / 8% = $19.5M vs all-in $17.6M → $1.9M value creation. The RevPAR assumption is critical: each $1 of RevPAR shortfall reduces annual GRR by ~$66k (180 × 365), which at 32% GOP and 8% exit cap = ~$264k of value. A $9/RevPAR miss (~12% below target) wipes out the entire $1.9M value creation. Underwrite the RevPAR lift conservatively and stress-test it thoroughly.",
    },
    {
      label:
        "The conversion doesn't create value — the franchise royalty (5% of GRR = ~$243k/yr) is a permanent drag that consumes the RevPAR uplift.",
      isBest: false,
      explanation:
        "The royalty is real but manageable — it's already reflected in the 32% GOP margin assumption. The question is whether the branded RevPAR premium (from $55 to $74 = +$19/RevPAR) more than offsets the royalty. Incremental GRR from RevPAR lift = 180 × 365 × $19 = $1.25M/yr. Royalty on stabilized GRR = $243k. Net incremental contribution = ~$1M/yr before margin effects — far more than the royalty cost. The royalty is not the thesis killer; RevPAR underperformance is.",
    },
    {
      label:
        "The $3.2M PIP always creates value because it makes the hotel more competitive, improves guest satisfaction scores, and enables a premium ADR.",
      isBest: false,
      explanation:
        "PIP spending creates value only if it drives enough incremental NOI to exceed its cost at the cap rate. The math must be run, not assumed. A $3.2M PIP on a $14.4M acquisition is a 22% incremental investment — it needs to produce at least $3.2M × 8% = $256k of incremental annual NOI just to break even on the cost of capital. Whether the RevPAR lift actually delivers that is the question.",
    },
    {
      label:
        "Brand conversions always succeed because branded hotels have reservation system advantages, loyalty programs, and lower OTA dependency than independents.",
      isBest: false,
      explanation:
        "Brand distribution advantages are real but not uniform. The RevPAR premium vs independents varies by market, brand tier, comp set, and the specific hotel's operational quality. Hotels that achieve brand standard in primary markets with strong demand typically see 8–15% RevPAR lift; secondary markets or weaker operators may see 3–5%. 'Always succeeds' is not an underwriting framework — quantify the expected lift and stress it.",
    },
  ],
  takeaway:
    "Hotel brand conversion is a capital-allocation question: does the PIP + franchise royalty cost less than the capitalized value of the incremental NOI the brand generates? The answer depends almost entirely on whether the RevPAR lift materializes. Model the stabilized NOI at target RevPAR, subtract the royalty, capitalize at the exit cap, subtract all-in cost — and then stress the RevPAR assumption by 10–15% to find where the thesis breaks. The royalty is not the risk; RevPAR underperformance is.",
  tips: [
    "RevPAR breakeven lift: each $1 of RevPAR = ~$66k/yr GRR on 180 keys (180 × 365 × $1). At 30% margin, = ~$20k NOI.",
    "Brand conversion value creation = (stabilized NOI − current NOI − royalty) / exit cap rate − PIP cost.",
    "PIP scope matters: cosmetic PIPs (soft goods) are 12–18 months; structural PIPs (plumbing, HVAC, infrastructure) are 24–36 months and carry more execution risk.",
  ],
};
