import type { SituationalCase } from '../../types/situational';

export const distressedSaleComp: SituationalCase = {
  id: 'distressed-sale-comp',
  title: 'Can you use the distressed sale as a comp?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You're pricing a stabilized 150,000 SF Class-B office asset. A broker provides 4 comps from the past 8 months in the same submarket. One trade stands out: a 120,000 SF comparable building sold at an 8.5% cap rate — 150 bps wider than the other three comps (6.8–7.2%). Upon investigation, you discover the outlier was a lender REO sale after the borrower defaulted; the lender liquidated it in 45 days without running a formal marketing process.",
  data: [
    { label: 'Comp 1', value: '150k SF, sold 3 mos ago — 7.0% cap, arm\'s length' },
    { label: 'Comp 2', value: '130k SF, sold 5 mos ago — 6.8% cap, arm\'s length' },
    { label: 'Comp 3', value: '160k SF, sold 7 mos ago — 7.2% cap, arm\'s length' },
    { label: 'Comp 4 (outlier)', value: '120k SF, sold 4 mos ago — 8.5% cap, lender REO / 45-day liquidation' },
    { label: 'Subject', value: '150k SF Class-B office' },
  ],
  question: 'How should you treat the distressed sale in your comp set?',
  options: [
    {
      label:
        "Discard Comp 4 from the anchor calculation and price off the arm's-length comps (6.8–7.2%). Document the distressed trade separately as a downside stress reference — it shows where the market can clear under forced conditions, which is useful for lender stress tests, but not as a fair-market pricing anchor.",
      isBest: true,
      explanation:
        "Distressed / REO sales fail two criteria for arm's-length comps: (1) the seller (lender) was liquidating under time pressure, not maximizing value; (2) buyer pool was limited — REO timelines exclude buyers who need standard due-diligence periods. A 45-day close in office likely means the buyer was pre-qualified and had reduced diligence, implying a price concession for that speed. The 150 bps gap vs. arm's-length trades is not a market signal — it's a liquidity premium on a forced sale. Anchor pricing on the arm's-length comps (6.8–7.2% → ~7.0% midpoint), and note the REO comp separately as a stress-scenario reference.",
    },
    {
      label:
        "Average all four comps — distressed or not, the price clears and reflects a market participant's willingness to pay.",
      isBest: false,
      explanation:
        "Averaging a forced sale with arm's-length trades suppresses the market cap rate. The distressed comp drags the average from ~7.0% to ~7.4%, which implies a value 5% lower than the true market anchor. The result: a lower bid than defensible on market comps. The forced-sale price reflects urgency premium, not market value.",
    },
    {
      label:
        "Use Comp 4 as the floor for your underwriting — if the market can clear at 8.5% under duress, your bid should be no tighter than 7.5%.",
      isBest: false,
      explanation:
        "Treats a liquidation floor as an underwriting floor. Arm's-length buyers don't need to build in forced-liquidation discounts — that discount is compensation for absorbing the lender's urgency and limited diligence window. Bidding at 7.5% when arm's-length trades support 7.0% leaves 50 bps of unnecessary yield on the table.",
    },
    {
      label:
        "Discard all comps older than 6 months, leaving only Comps 1, 2, and 4 (Comp 3 is 7 months old).",
      isBest: false,
      explanation:
        "The 6-month cutoff isn't a hard rule — it's a guideline for rate environments that are moving quickly. In a stable rate environment, 7-month-old comps are usually defensible with minimal adjustment. More importantly, cutting Comp 3 (arm's length, 7 mos) to keep Comp 4 (forced sale, 4 mos) substitutes recency for quality — the wrong trade-off.",
    },
  ],
  takeaway:
    'Distressed / REO / foreclosure sales are not arm\'s-length market transactions — the seller had no bargaining power, time constraints suppressed the buyer pool, and diligence periods were compressed. Excluding them from the pricing anchor is standard practice; appraisers apply the same principle. The right use for a distressed comp is as a stress reference: "here\'s where forced liquidation clears" is valuable for lender stress testing, downside underwriting, and sensitivity cases, but not for fair-market going-in cap analysis.',
  tips: [
    "Red flags for distressed comps: <60-day close, lender seller (REO/deed-in-lieu), no formal marketing process, significant price gap vs. arm's-length trades.",
    "Distressed comps are useful stress references, not pricing anchors.",
    "If >50% of available comps are distressed, the market itself may be in stress — document and widen the pricing range.",
  ],
};
