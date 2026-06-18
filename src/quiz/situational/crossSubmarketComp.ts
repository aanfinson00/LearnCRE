import type { SituationalCase } from '../../types/situational';

export const crossSubmarketComp: SituationalCase = {
  id: 'cross-submarket-comp',
  title: 'The only recent comp is 30 miles away — can you use it?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You\'re underwriting a 300,000 SF Class-A last-mile industrial asset in Submarket A. Only one comparable trade has occurred in Submarket A in the past 18 months — a 200,000 SF asset at a 5.0% cap, 14 months ago. In Submarket B (30 miles away, different MSA), three assets of similar size and quality traded in the past 6 months at 4.75%, 4.90%, and 5.05% (average 4.90%). Both submarkets are last-mile, similar demographics.',
  data: [
    { label: 'Subject', value: '300,000 SF Class-A last-mile, Submarket A' },
    { label: 'Submarket A comp', value: '200k SF, 5.0% cap, 14 months ago' },
    { label: 'Submarket B comp 1', value: '280k SF, 4.75% cap, 3 months ago' },
    { label: 'Submarket B comp 2', value: '310k SF, 4.90% cap, 5 months ago' },
    { label: 'Submarket B comp 3', value: '290k SF, 5.05% cap, 6 months ago' },
  ],
  question: 'How should you use the cross-submarket comps?',
  options: [
    {
      label: 'Use Submarket B comps as secondary support, but document the basis for cross-submarket comparison — similar last-mile profile, similar demographics, recent vintage. The primary anchor is the Submarket A comp, adjusted for time (+15–25 bps for 14-month staleness if rates moved). Don\'t just average all four.',
      isBest: true,
      explanation:
        'Cross-submarket comps are acceptable when: (a) the comparable\'s supply/demand drivers are genuinely similar; (b) you can document the bridge; (c) you use them as supporting evidence, not the primary anchor. Here: Submarket A comp is more relevant geographically but is 14 months stale. Submarket B is recent but different market. The right answer is: anchor on Submarket A + time adjustment, test with Submarket B as a current market signal. A 25-50 bps range is defensible. Averaging all 4 without documentation is not.',
    },
    {
      label: 'Use only the Submarket A comp — cross-submarket data is never appropriate for pricing.',
      isBest: false,
      explanation:
        '"Never appropriate" is too absolute. If Submarket A data is thin (one stale comp), cross-submarket evidence from a genuinely comparable submarket is standard appraisal and acquisition practice — with explicit documentation of the comparison rationale. Refusing the additional data leaves you anchored on a 14-month-old single comp, which is its own form of mispricing.',
    },
    {
      label: 'Average all four comps (4.93% average) — the recent Submarket B data dominates the sample.',
      isBest: false,
      explanation:
        'Letting a cross-submarket comp cluster dominate pricing for a different submarket is exactly the error the cross-submarket filter is designed to prevent. The 4.93% average weights three comps from a different market at 75%. If Submarket B trades systematically tighter for market-specific reasons (higher barrier to entry, different tenant base), you\'ve used the wrong anchor without knowing it.',
    },
    {
      label: 'Use only the Submarket B comps since they\'re recent — recent data always outweighs stale same-submarket comps.',
      isBest: false,
      explanation:
        '"Recent always beats stale same-market" is a useful heuristic but not a hard rule. A 14-month-old same-submarket comp is more relevant than a 6-month cross-submarket comp IF the two submarkets trade at structurally different spreads. Use recency to prioritize, but geography still matters — the right framework is: primary anchor (same submarket, adjusted for time) + secondary check (cross-submarket).',
    },
  ],
  takeaway:
    'Cross-submarket comps are acceptable — not forbidden — when same-submarket data is thin or stale. The correct protocol is: (1) document why the cross-submarket is genuinely comparable; (2) use it as secondary support, not the primary anchor; (3) adjust the same-submarket comp for time rather than discarding it. The goal is a defensible comp set, not a perfect one.',
  tips: [
    'Same submarket + stale > different submarket + recent, as a default hierarchy.',
    'Document the cross-submarket bridge: same asset type, similar tenant profile, comparable supply/demand dynamics.',
    'Adjusting for time: ~10–15 bps per 6 months in a moving rate environment is a rough calibration.',
  ],
};
