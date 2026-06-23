import type { SituationalCase } from '../../types/situational';

export const compGeographyTier: SituationalCase = {
  id: 'comp-geography-tier',
  title: "Can you bridge across market tiers?",
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're pricing a 250,000 SF last-mile industrial asset in a secondary Midwest market. No arms-length trades of comparable size exist in the submarket in the past 18 months. The broker offers three comps: a same-submarket trade (22 months old, 6.2% cap), a primary coastal-market trade (8 months old, 4.8% cap), and a peer secondary Midwest market trade (10 months old, 6.5% cap).",
  data: [
    { label: 'Comp 1 — same submarket', value: '22 months old, 6.2% cap' },
    { label: 'Comp 2 — primary coastal market', value: '8 months old, 4.8% cap' },
    { label: 'Comp 3 — peer secondary Midwest', value: '10 months old, 6.5% cap' },
    { label: 'Subject', value: 'Secondary Midwest, last-mile, 250k SF' },
    { label: 'Recent local comps', value: 'None in past 18 months' },
  ],
  question: 'Which comp or combination best anchors pricing?',
  options: [
    {
      label: "Comp 3 (peer secondary, recent) is the strongest anchor. Comp 1 (same submarket, stale) is usable with a time adjustment — likely adding 25–50 bps in a moving rate environment. Comp 2 (primary coastal) requires a 100–200 bps geographic spread adjustment and should bound the tight end only.",
      isBest: true,
      explanation:
        "Comp hierarchy for a thin market: (1) same submarket + recent, (2) peer geography + recent, (3) same submarket + stale with time adjustment, (4) different-tier market with documented spread. No recent local comps forces reliance on the peer secondary. Comp 3 at 6.5% in a comparable Midwest market is the cleanest anchor. Comp 1 at 6.2% is the same local market but needs a time bridge — 22 months in a rising-rate environment likely warrants +25–50 bps adjustment. Comp 2 at 4.8% is a primary coastal premium; the typical secondary Midwest spread to coastal is 100–200 bps, so using it flat understates the subject's cap by 150+ bps.",
    },
    {
      label: "Use Comp 2 — it's the most recent and large comps are hard to find anywhere.",
      isBest: false,
      explanation:
        "Recency alone doesn't qualify a comp when the geography is materially different. Primary coastal vs. secondary Midwest industrial reflects different cap-rate regimes, buyer pools, and rent levels. Using the coastal comp flat would price the subject 150+ bps tighter than peer evidence supports — a bid that ignores the geographic risk premium.",
    },
    {
      label: "With no recent local comps, the pricing is too uncertain — pass on the deal.",
      isBest: false,
      explanation:
        "Thin comp sets are routine in secondary markets. 'No perfect comp' means wider bid ranges and more explicit bridging — not a pass. Peer-market comps and time-adjusted local comps can anchor a defensible range. The discipline is in documenting the bridge from observed evidence to subject pricing, not in requiring a perfect match before engaging.",
    },
    {
      label: "Average all three — more data points improve confidence in the estimate.",
      isBest: false,
      explanation:
        "Averaging geographically dissimilar data adds noise, not precision. A simple average of 4.8%, 6.2%, and 6.5% yields 5.83% — a number that understates the peer secondary market (6.5%) and misrepresents the stale local comp (6.2% + time adjustment). The primary coastal premium is real; averaging it away produces a fictitious mid-point.",
    },
  ],
  takeaway:
    "When the ideal comp doesn't exist, build a documented bridge: peer market cap ± geographic spread, or same-market cap + time adjustment. Geographic tier is a real pricing variable — primary coastal and secondary Midwest trade at systematically different caps. Averaging across tiers produces a number that exists nowhere in the market.",
  tips: [
    "Comp hierarchy: same submarket + recent > peer geography + recent > same submarket + stale.",
    "Primary coastal vs. secondary Midwest: typical industrial spread is 100–200 bps.",
    "Time adjustment in a rising-rate environment: stale comps generally need upward cap adjustment.",
  ],
};
