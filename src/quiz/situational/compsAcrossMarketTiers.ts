import type { SituationalCase } from '../../types/situational';

export const compsAcrossMarketTiers: SituationalCase = {
  id: 'comps-across-market-tiers',
  title: 'Gateway comps in a secondary-market deal',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re bidding on a 200-unit Class-B multifamily asset in a growing Sun Belt secondary market. The broker\'s OM includes 4 rent comps: 2 from the same city (Class B, $1.65–1.80/SF effective rent) and 2 from gateway markets (NYC and LA, Class A, $3.40–3.60/SF). The broker blends all four and recommends underwriting at $2.20/SF — which would support the broker\'s ask price.',
  data: [
    { label: 'Subject', value: '200-unit Class B, Sun Belt secondary market' },
    { label: 'Local Comps 1–2', value: 'Same city, Class B, $1.65–1.80/SF eff. rent' },
    { label: 'Gateway Comps 3–4', value: 'NYC/LA, Class A, $3.40–3.60/SF eff. rent' },
    { label: 'Broker blended recommendation', value: '$2.20/SF (all 4 comps averaged)' },
  ],
  question: 'How should you handle the comp set?',
  options: [
    {
      label: 'Discard the gateway comps entirely — they reflect different income demographics, supply dynamics, and market structures. The correct anchor is the local comps at $1.65–1.80/SF.',
      isBest: true,
      explanation:
        'Gateway market rents (NYC, LA) reflect income demographics, cost of living, employer concentration, and supply constraints that have no relation to a Sun Belt secondary market. Using them to support a $2.20/SF rent estimate implies Sun Belt residents can pay NYC/LA rents — a fundamental economic error. The broker included them precisely because they pull the average upward. The local comps ($1.65–1.80/SF) are the correct anchor; if the local comp set is thin, the solution is to source more local comps, not import cross-market data that contaminates the analysis. A $2.20/SF underwrite on a market where locals are paying $1.65–1.80/SF means the deal requires 20–30% above-market rents to pencil — a lease-up that won\'t happen at that pace.',
    },
    {
      label: 'Weight all 4 comps equally — the broker sourced them and they represent the full range of the market.',
      isBest: false,
      explanation:
        'The "full range of the market" in the broker\'s framing is NYC to Sun Belt — which is not a market, it\'s two different countries of economics. The broker\'s job is to support the highest defensible price; including gateway comps is a standard technique to pull the blended average above what local data supports. Equal weighting produces a $2.20/SF recommendation that overstates local market rents by 20–30%.',
    },
    {
      label: 'Apply a 40% haircut to the gateway comps for market tier differences, then blend all four.',
      isBest: false,
      explanation:
        'There is no defensible basis for a 40% "market tier adjustment" that isn\'t just reverse-engineering the local comp answer. The local comps already answer the question of what tenants in this market pay. Fabricating an adjustment ratio from gateway comps and then blending introduces noise with no analytical foundation. Use the local comps directly.',
    },
    {
      label: 'Use the gateway comps only — they represent Class-A quality and signal where the market is headed.',
      isBest: false,
      explanation:
        '"Where the market is headed" requires a specific catalyst — rent growth rate, supply constraint, income growth — not a comparison to entirely different cities with entirely different economics. Using only the gateway comps (at $3.40–3.60/SF) while ignoring local actuals ($1.65–1.80/SF) would produce a rent underwrite 100%+ above market, guaranteeing lease-up failure.',
    },
  ],
  takeaway:
    'Cross-market comps contaminate rent underwriting unless the markets are structurally similar — same income demographics, same employer base, same supply pipeline. Gateway-to-secondary market comparisons are almost never valid without large, arbitrary adjustments that can\'t be defended. When you see a broker blend local and gateway comps, it\'s almost always designed to inflate the rent estimate. The local comp set is thin but clean; the broker\'s blended set is large but misleading.',
  tips: [
    'Comp filter hierarchy: (1) same market, (2) same asset class, (3) similar size, (4) recent. Cross-market = fail at step 1.',
    'Gateway-to-secondary rent ratio is often 2–3×; using NYC/LA comps would overstate rents by 50–100%.',
    'Thin local comp set: document the gap and widen the rent range — don\'t fill it with irrelevant data.',
  ],
};
