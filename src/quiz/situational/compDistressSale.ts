import type { SituationalCase } from '../../types/situational';

export const compDistressSale: SituationalCase = {
  id: 'comp-distress-sale',
  title: "Should a forced sale count as a comp?",
  category: 'comp-selection',
  difficulty: 'beginner',
  roles: ['acquisitions'],
  scenario:
    "You're pricing a stabilized 150,000 SF suburban office building being sold through a normal brokered process. A broker provides four comps, one of which is a nearby 120,000 SF office that traded at a 7.50% cap six months ago — the widest by over 100 bps. Due diligence reveals the seller was a lender-owned (REO) property auctioned with a compressed 30-day close requirement and no inspection period. The other three arm's-length comps average 6.40%.",
  data: [
    { label: 'Subject', value: '150,000 SF · stabilized · brokered sale' },
    { label: 'Comp A', value: '120,000 SF · 7.50% cap · REO auction, 30-day close' },
    { label: 'Comps B–D', value: 'Arm\'s-length trades · average 6.40% cap' },
    { label: 'Average with Comp A', value: '6.63%' },
    { label: 'Average without Comp A', value: '6.40%' },
  ],
  question: "How should you treat the distress comp?",
  options: [
    {
      label: "Discard it — a forced REO auction with a compressed timeline and limited buyer pool doesn't reflect willing-buyer/willing-seller market value. The correct anchor is the 6.40% average from the arm's-length comps.",
      isBest: true,
      explanation:
        "Distress sales produce systematically wider cap rates for three reasons: (1) limited buyer pool — only buyers who can perform in 30 days, typically cash-heavy opportunistic funds; (2) seller motivation — lenders clear the balance sheet, not maximize price; (3) no negotiation — auction processes yield single-round bids without discovery. For a stabilized asset selling through a normal 45–90 day brokered process, the distress comp is not comparable. Including it pulls the anchor 23 bps too wide, translating to $1–2M of undervaluation on a typical asset.",
    },
    {
      label: "Include it — all market trades reflect clearing prices, regardless of seller motivation.",
      isBest: false,
      explanation:
        "Market clearing price in a forced sale reflects the clearing price in THAT distressed market (limited capital, compressed timeline, risk premium) — not the arm's-length stabilized market. Appraisal standards define 'market value' as a hypothetical transaction between a willing, informed buyer and seller — a forced sale violates this definition by construction.",
    },
    {
      label: "Include it at 50% weight — it's real data but clearly skewed, so partial inclusion is more balanced.",
      isBest: false,
      explanation:
        "Arbitrary weighting produces a number that looks analytically thoughtful but isn't. If the comp fails the threshold for comparability (forced sale vs. arm's-length), partial inclusion doesn't correct the bias — it just reduces it. The question is whether the comp belongs in the set at all, not how much to weight it.",
    },
    {
      label: "Use it as a stress-case floor and show sensitivity — bid at 6.40% but note that 7.50% represents downside.",
      isBest: false,
      explanation:
        "Referencing the distress trade in a sensitivity analysis is reasonable for risk disclosure, but labeling it a 'market comp floor' gives it analytical standing it doesn't deserve. If included, it should be clearly labeled as a distress-scenario reference, not a market comparable. Otherwise it anchors the buyer pool to a depressed number.",
    },
  ],
  takeaway:
    "Distress sales — REO auctions, receivership dispositions, forced timelines — systematically produce cap rates 50–150 bps wider than arm's-length market trades. Always vet provenance before including a comp: Was the seller motivated by balance sheet pressure? Was the buyer pool artificially restricted? If yes to either, exclude the comp from the primary set and optionally reference it as a stress scenario with a clear label.",
  tips: [
    "Distress red flags: REO, receivership, auction, <30-day close, no inspection period, 'as-is' with no reps.",
    "If you have ONLY distress comps, you don't have sufficient data — widen the geography or vintage window.",
    "Motivated-seller disclosure: ask the broker directly whether any comp had an unusual seller situation.",
  ],
};
