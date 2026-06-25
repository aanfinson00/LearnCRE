import type { SituationalCase } from '../../types/situational';

export const distressedCompAdjustment: SituationalCase = {
  id: 'distressed-comp-adjustment',
  title: 'One comp was a foreclosure — how do you treat it?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a stabilized 180-unit Class-B multifamily acquisition. The broker\'s 4-comp set includes one transaction that was a court-ordered REO disposition (lender-owned sale under distress). The other three are arms-length trades in the same submarket.',
  data: [
    { label: 'Comp 1', value: 'Arms-length · same submarket · 90 days ago · 5.50% cap' },
    { label: 'Comp 2', value: 'Arms-length · same submarket · 5 mos ago · 5.65% cap' },
    { label: 'Comp 3', value: 'Arms-length · adjacent submarket · 4 mos ago · 5.75% cap' },
    { label: 'Comp 4', value: 'REO/foreclosure disposition · same submarket · 2 mos ago · 6.80% cap' },
  ],
  question: 'How should you treat the distressed comp when anchoring your pricing?',
  options: [
    {
      label:
        'Discard the REO from the pricing grid but document it. REO dispositions reflect lender urgency and forced liquidity, not market-clearing prices. Anchor at 5.60–5.75% on the three arms-length trades, noting the distressed sale as a downside data point.',
      isBest: true,
      explanation:
        "REO prices reflect the lender's need to exit a non-performing position quickly — often under court timeline constraints, with limited marketing, no seller concessions, and a distressed physical condition discount. The 130 bps spread over arms-length trades is the 'distress premium' buyers demanded for that liquidity and condition risk. That premium is not transferable to a stabilized, well-managed asset in an arms-length transaction. Document the comp (it reveals what buyers demanded to absorb distressed product) but exclude it from your market-cap-rate anchor.",
    },
    {
      label:
        'Average all four caps — actual closed transactions are actual market evidence, regardless of the seller\'s situation.',
      isBest: false,
      explanation:
        'Averaging gives 5.93%, ~30–35 bps wider than the arms-length anchor. The REO sale is real evidence, but of a different phenomenon: forced-sale pricing. Including it in an unweighted average tells you nothing useful about where a stabilized, willing seller would trade. In appraisal practice, distressed sales are systematically excluded from cap-rate derivation for exactly this reason.',
    },
    {
      label:
        'Weight the REO at 25% — it gets a partial vote since it\'s a real trade in the same submarket.',
      isBest: false,
      explanation:
        "Partial weighting is a compromise that satisfies neither approach. If the comp is representatively comparable, it gets a full vote. If it reflects forced-sale dynamics, it gets zero weight on pricing — though it is retained as a downside data point. A 25% weight produces a number between two anchors that is defensible to neither a buyer nor a seller. The disciplined move is a binary choice with a documented rationale.",
    },
    {
      label:
        'Use the REO as the ceiling for your bid — if a distressed seller had to accept 6.8%, the market has moved toward 6% territory for all assets.',
      isBest: false,
      explanation:
        "This extrapolates from a non-representative transaction to a market-wide conclusion. REO dispositions do not set market cap rates — they reveal distress premiums. Bidding at 6.8% or near it on a stabilized asset where arms-length comps cleared 5.5–5.75% would systematically underpay by 100–130 bps and lose to every competing bidder underwriting off the correct comp set.",
    },
  ],
  takeaway:
    'Distressed comps are informative but not comparable. An REO or foreclosure disposition reflects forced-sale liquidity, condition discounts, and lender urgency — none of which apply to a stabilized arms-length trade. Discard it from the cap-rate grid, retain it as a downside scenario floor, and anchor pricing on the three arms-length trades with any applicable adjustments for time and submarket.',
  tips: [
    'Always ask the broker: was this an arms-length sale, REO, bankruptcy court disposition, or estate sale?',
    'Distressed-sale comps belong in the sensitivity table (downside), not the pricing anchor.',
    "In appraisal, distressed sales are excluded from the 'arms-length' standard — apply the same filter.",
  ],
};
