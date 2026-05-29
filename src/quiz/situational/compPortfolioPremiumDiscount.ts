import type { SituationalCase } from '../../types/situational';

export const compPortfolioPremiumDiscount: SituationalCase = {
  id: 'comp-portfolio-premium-discount',
  title: "Portfolio sale — premium or discount vs. single-asset comps?",
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're bidding on a 6-property multifamily portfolio totaling 1,800 units across three markets. All available cap rate comps are single-asset trades. The seller's broker is arguing for a portfolio premium — \"institutional buyers pay up for scale\" — suggesting a 25–50 bps cap-rate tightening vs. single-asset comps. The individual assets range from 200 to 400 units each.",
  data: [
    { label: 'Portfolio', value: '6 properties, 1,800 units, 3 markets' },
    { label: 'Individual asset size', value: '200–400 units each' },
    { label: 'Available comps', value: 'Single-asset trades only' },
    { label: 'Broker claim', value: 'Portfolio premium of 25–50 bps cap tightening' },
  ],
  question: 'How do you evaluate the portfolio premium argument?',
  options: [
    {
      label: "Portfolio premium exists for true large-scale, single-market, operationally unified portfolios — but a 6-asset cross-market portfolio of 200–400-unit properties is more likely to trade at parity or a discount to single-asset comps because it forces buyers to underwrite three separate markets and limits the buyer pool to institutions that can manage complexity.",
      isBest: true,
      explanation:
        "Portfolio pricing is context-dependent. Premium conditions: assets are in one market (reduce diligence complexity), large enough to matter operationally, homogeneous quality. Discount conditions: cross-market (3 separate demand profiles, 3 separate property management footprints), varied asset quality, or so large only 2–3 buyers exist (reduces competition). This portfolio — 6 assets, 3 markets, 200–400 units each — falls in the discount category. Realistic adjustment: 0 to +25 bps wider than single-asset comps, not tighter. The seller's broker is arguing for the wrong direction.",
    },
    {
      label: "The portfolio premium argument is correct — institutional buyers always pay up for scale, so model 25–50 bps cap tightening.",
      isBest: false,
      explanation:
        "\"Institutional buyers pay for scale\" is a heuristic that holds in certain conditions (same-market, homogeneous, operationally synergistic). It breaks down for cross-market portfolios where each asset must be underwritten on its own merits and the buyer takes on management complexity in three separate markets. Accepting the seller's narrative without testing the conditions is a common acquisition mistake.",
    },
    {
      label: "Use single-asset comps directly — portfolio effects are too hard to quantify, so treat each asset as if sold individually.",
      isBest: false,
      explanation:
        "Single-asset comps are the right baseline, but portfolio effects (positive or negative) are real and quantifiable. Ignoring them entirely understates the analytical task. For a cross-market portfolio, the adjustment is likely small (0–25 bps wider), but it should be explicitly documented and defended, not assumed away.",
    },
    {
      label: "Ask for portfolio-level comps before pricing — if none exist, the portfolio cannot be priced.",
      isBest: false,
      explanation:
        "Portfolio comps are rarely available with enough specificity to be directly comparable. Waiting for them is not practical. The right approach is to start with single-asset comps, document the portfolio adjustment rationale (premium or discount), and proceed to a defensible bid range.",
    },
  ],
  takeaway:
    "Portfolio premium vs. discount depends on two variables: does scale create operational synergies (single market, unified management) or operational complexity (cross-market, varied assets)? Cross-market portfolios typically trade at parity or a slight discount to single-asset comps because the buyer pool is smaller and diligence is proportionally harder. Challenge broker premium claims by testing the conditions, not accepting the narrative.",
  tips: [
    'Same-market, large-scale, homogeneous portfolios command premiums; cross-market, mixed-quality portfolios often don\'t.',
    'Buyer pool contraction is the key variable — fewer bidders = wider caps, not tighter.',
    'If the portfolio breaks up cleanly into sellable single assets, the sum-of-parts is the ceiling on portfolio value.',
  ],
};
