import type { SituationalCase } from '../../types/situational';

export const industrialSupplyShockAbsorption: SituationalCase = {
  id: 'industrial-supply-shock-absorption',
  title: 'Giant distribution center delivers — how long until the market rebalances?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    "A mid-size industrial submarket (45M SF total inventory) is at 4.5% vacancy. Trailing annual net absorption has been 900,000 SF. A single e-commerce tenant is delivering a 2.1M SF distribution center next quarter — the largest single building ever built in the submarket. There is no other construction in the pipeline. You are underwriting a 350,000 SF Class-A bulk warehouse in the same submarket.",
  data: [
    { label: 'Total inventory', value: '45M SF' },
    { label: 'Current vacancy', value: '4.5%' },
    { label: 'Annual net absorption', value: '900,000 SF' },
    { label: 'Upcoming delivery', value: '2.1M SF (single tenant, e-commerce)' },
    { label: 'Other pipeline', value: 'None' },
  ],
  question:
    'How does the 2.1M SF delivery change your submarket underwriting — and how long until vacancy returns to ~4.5%?',
  options: [
    {
      label:
        'The 2.1M SF building is owner-occupied (pre-leased to a single tenant), so it delivers as occupied — vacancy barely moves. The real risk is whether demand to fill your 350k SF deal slows because the e-commerce tenant stops leasing additional buildings in the submarket.',
      isBest: true,
      explanation:
        "Large single-tenant deliveries are almost always pre-leased; otherwise the developer would never break ground on a 2.1M SF building. A pre-leased delivery adds to both inventory and occupied SF simultaneously, so net absorption equals the building's SF and vacancy impact is minimal. The real underwriting risk is secondary: the e-commerce tenant now has a large footprint locked up, which may reduce their leasing activity in the submarket for 3–5 years — slowing absorption demand for your subject property's competition and peers.",
    },
    {
      label:
        '2.1M SF vacant would spike vacancy to ~9% overnight; at 900k SF/yr absorption it would take ~2.7 years to reabsorb. That kills the deal.',
      isBest: false,
      explanation:
        "This assumes the 2.1M SF delivers vacant — almost never true at that scale. A 2.1M SF building without a pre-signed tenant would represent a catastrophic spec risk that lenders would never finance. Always determine whether a large single-tenant delivery is pre-leased before projecting its vacancy impact. If somehow it IS spec (unusual), then yes, the math: (2.1M ÷ 45M) adds ~4.7% to vacancy, and 2.1M ÷ 900k ≈ 2.3 years to reabsorb.",
    },
    {
      label:
        'Ignore it — one building does not move a 45M SF submarket meaningfully.',
      isBest: false,
      explanation:
        "2.1M SF / 45M SF = 4.7% of total inventory. That is not negligible. Even if pre-leased, a delivery of this size will affect comparable rental rates, the competitive set for large-bay leasing, and future e-commerce demand in the market. 'One building doesn't matter' is a lazy framing when the building is 4.7% of inventory.",
    },
    {
      label:
        'The delivery is bullish — it signals strong e-commerce demand and validates leasing velocity in the submarket.',
      isBest: false,
      explanation:
        'Pre-leased deliveries reflect past demand, not future demand. A large single-tenant deal signed 18–24 months ago (typical construction timeline) reflects e-commerce sentiment from that period. More importantly, the same tenant is now OFF the market as a demand source for years. Bullish stories from large deliveries often mask near-term demand slowdowns.',
    },
  ],
  takeaway:
    'Always determine whether a large delivery is pre-leased or spec before projecting vacancy impact. Pre-leased deliveries are net-neutral on vacancy but can absorb a major demand source from the submarket. Spec deliveries of this scale are rare and represent severe market stress. Your absorption model should separate demand drivers (tenants actively seeking space) from supply outcomes (buildings delivering occupied vs. vacant).',
  tips: [
    'Quick check: is the building in the delivery pipeline marked "pre-leased" or "spec" in CoStar/CBRE?',
    "Large single-tenant build-to-suits add to occupied inventory the day they deliver — don't count them as empty.",
    'After a mega-tenant move-in, watch 12–18 month absorption: does their secondary demand disappear from the market?',
  ],
};
