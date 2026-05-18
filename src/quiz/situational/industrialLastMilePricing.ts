import type { SituationalCase } from '../../types/situational';

export const industrialLastMilePricing: SituationalCase = {
  id: 'industrial-last-mile-pricing',
  title: 'Industrial: last-mile vs. big-box — how do you bid differently in the same market?',
  category: 'pricing',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "Two industrial deals are in front of you in the same metro market. (A) 75,000 SF infill last-mile facility: 18' clear, 15 dock doors, land-constrained urban infill site — $28/SF NNN rent, $320/SF acquisition price, 4.7% going-in cap. (B) 600,000 SF big-box logistics center: 36' clear, 60 dock doors, exurban location 35 miles from the urban core — $7.25/SF NNN, $130/SF acquisition price, 5.6% going-in cap. Both are 100% leased, and submarket vacancy in both nodes runs 3-4%. You have capital to pursue one.",
  data: [
    { label: 'Asset A (last-mile)', value: '75,000 SF, 18\' clear, urban infill' },
    { label: 'A — Rent', value: '$28/SF NNN ($2.1M NOI)' },
    { label: 'A — Price', value: '$44.6M ($320/SF, 4.7% cap)' },
    { label: 'Asset B (big-box)', value: '600,000 SF, 36\' clear, exurban' },
    { label: 'B — Rent', value: '$7.25/SF NNN ($4.35M NOI)' },
    { label: 'B — Price', value: '$77.7M ($130/SF, 5.6% cap)' },
    { label: 'Submarket vacancy (both nodes)', value: '3-4%' },
  ],
  question: "How do you evaluate last-mile vs. big-box on risk-adjusted terms, and which wins for this deployment?",
  options: [
    {
      label:
        "Compare them on three axes — tenant pool depth, supply risk, and exit liquidity — not cap rate alone. Last-mile: tenant pool is e-commerce, parcel, food delivery (growing demand, structurally constrained supply on infill land); but exit is harder — sub-100k SF urban industrial is a niche institutional buy. Big-box: tenant pool is Fortune 500 3PL, large e-commerce (deep demand); supply is more build-able but not unlimited; exit is more liquid (deep institutional bid pool for 36' clear, 500k+ SF). At this spread (90bps), big-box wins on exit liquidity and tenant diversity. Last-mile wins on structural rent growth if you can hold 10+ years without a forced exit.",
      isBest: true,
      explanation:
        "Right multi-axis framework. Cap rate spread alone (4.7% vs. 5.6%) doesn't capture the asset-class difference. Last-mile's 90bps cap discount reflects supply constraints and high rent/SF, but the exit pool is thin — sub-100k SF urban infill with 18' clear is a niche buy for local private buyers or specialized REITs. Big-box at 5.6% on 36' clear, 600k SF is a core-plus institutional product with a deep bid pool at exit. For most LP mandates, big-box's exit liquidity is the decisive edge. Last-mile wins only on a long-hold, inflation-hedge thesis where forced-sale risk is absent.",
    },
    {
      label:
        "Last-mile always wins — higher rents per SF, greater supply constraints, and e-commerce tailwinds make it the superior industrial subtype.",
      isBest: false,
      explanation:
        "Overly categorical. 18' clear height restricts last-mile tenants to parcel, food, and light distribution — it cannot accommodate the e-commerce giants (Amazon, Walmart) that require 32'+ clear for robotics and high-stacking. Supply constraints on infill land are real but not universal; 36' clear big-box also faces supply constraints in power-constrained or zoning-limited submarkets. 'E-commerce tailwind' benefits both asset types equally.",
    },
    {
      label:
        "Big-box always wins — larger asset, more institutional, better exit liquidity at any spread.",
      isBest: false,
      explanation:
        "Also too categorical. Big-box supply risk is higher (land + permits are easier to assemble than urban infill), which can erode rent growth faster in over-built submarkets. Last-mile in genuinely supply-constrained markets can deliver superior rent compounding over time. Liquidity is a real big-box advantage, but hold period and LP mandate determine whether it's the decisive variable.",
    },
    {
      label:
        "Compare them purely on projected IRR using a 5-year hold model and take the higher number.",
      isBest: false,
      explanation:
        "IRR comparison requires the same risk-adjusted assumptions — which is exactly what's in question. Using the same exit cap for both assets misstates the comparison because last-mile commands a tighter institutional exit cap (deeper demand, supply-constrained) but faces a thinner buyer pool (fewer institutions write checks for sub-100k SF). Without adjusting exit cap and buyer pool assumptions by asset type, the IRR comparison produces spurious precision.",
    },
  ],
  takeaway:
    "Last-mile and big-box serve different tenant pools, carry different supply risks, and trade to different institutional buyer universes at exit. The correct evaluation framework is tenant pool depth (who can sign?), supply risk (how easily can the market build competition?), and exit liquidity (who buys this building in year 5-7?). Big-box wins on exit liquidity and tenant diversity for medium-term holds. Last-mile wins on structural rent protection in genuinely supply-constrained infill markets for long-horizon investors. Cap rate comparison is a starting point, not the answer.",
  tips: [
    "Clear height as a tenant-pool boundary: 18' clear = parcel/food/light retail distribution; 28-30' = regional distribution; 32'+ = big-box e-commerce, 3PL, robotics-enabled fulfillment. Each tier has a meaningfully different demand depth.",
    "Last-mile exit buyers: sub-100k SF urban infill industrial is typically bought by local private buyers or specialized REITs (STAG Industrial, Prologis) — significantly thinner bid pool than 500k+ SF institutional big-box.",
    "Supply risk proxy: acres of industrial-zoned land available within 15-20 miles. More available land = more supply risk = weaker rent growth ceiling over a 5-7 year hold.",
  ],
};
