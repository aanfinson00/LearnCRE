import type { SituationalCase } from '../../types/situational';

export const portfolioTradeCompAdjust: SituationalCase = {
  id: 'portfolio-trade-comp-adjust',
  title: "How do you price off a portfolio trade when you're buying one building?",
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're bidding on a single 150,000 SF industrial asset in a top-tier logistics submarket. The best recent comparable is a 6-property industrial portfolio in the same submarket that traded three months ago at a blended 5.10% cap. However, one of those portfolio properties subsequently sold as a single asset for 5.85% cap, and you've identified two other individual single-asset trades in adjacent submarkets at 5.75% and 5.90% caps. The seller's broker is citing the 5.10% portfolio trade as support for pricing.",
  data: [
    { label: 'Portfolio trade (6 assets)', value: '5.10% blended cap (3 mos ago)' },
    { label: 'Single asset from that portfolio (resale)', value: '5.85% cap' },
    { label: 'Adjacent submarket comp 1', value: '5.75% cap (single asset)' },
    { label: 'Adjacent submarket comp 2', value: '5.90% cap (single asset)' },
    { label: 'Subject asset size', value: '150,000 SF' },
  ],
  question:
    "How should you construct your pricing argument, and what cap range is defensible?",
  options: [
    {
      label:
        "Apply a portfolio premium discount to the 5.10% trade — portfolios typically clear 25–75 bps tighter than individual assets because buyers pay for scale, diversification, and reduced transaction costs per unit. Adjust the portfolio comp to 5.60–5.85% for single-asset equivalence, consistent with the three single-asset data points (5.75–5.90%). Defensible pricing range: 5.70–5.90%.",
      isBest: true,
      explanation:
        "Portfolio trades carry a portfolio premium (tighter cap) because buyers pay for: (1) single execution cost vs. 6 separate transactions, (2) geographic concentration/diversification value, (3) the difficulty of assembling the portfolio organically. The single-asset resale from the same portfolio at 5.85% is particularly telling — the same buyer universe for this 150K SF asset is looking at the single-asset comps, not the portfolio trade. The 5.10% comp is real but not apples-to-apples. After adjustment, 5.70–5.90% is the defensible range.",
    },
    {
      label:
        "Use the 5.10% portfolio trade directly — it's the most recent and is in the same submarket.",
      isBest: false,
      explanation:
        "Recency and submarket match are important, but transaction structure matters too. Portfolio buyers value scale and pay accordingly. A single-asset buyer for a 150K SF building is a different buyer with different return requirements. Using the portfolio trade unadjusted would price the asset ~60–70 bps tighter than what single-asset buyers are actually clearing, leading to a likely losing bid that overpays.",
    },
    {
      label:
        "Ignore the portfolio trade entirely and use only the three single-asset comps.",
      isBest: false,
      explanation:
        "The portfolio trade shouldn't be discarded — it's relevant evidence. The right approach is to adjust it for the portfolio premium and use it alongside the single-asset comps. Discarding it leaves you with only adjacent-submarket comps, which have their own adjustment issues. A blend of adjusted portfolio comp + single-asset comps gives a more defensible range.",
    },
    {
      label:
        "Trust the broker's cite — the seller has done the market work and 5.10% reflects current demand.",
      isBest: false,
      explanation:
        "The broker represents the seller. Their incentive is to maximize the stated cap (i.e., the price). Citing a portfolio trade without adjusting for transaction structure is a standard seller-side negotiating move. The buyer's job is to identify and document the portfolio premium and present the adjusted range to their IC.",
    },
  ],
  takeaway:
    "Portfolio trades clear at tighter caps than individual assets because buyers pay a premium for scale and reduced transaction friction. The portfolio premium is typically 25–75 bps. When the best comp is a portfolio trade, adjust it to single-asset equivalence before using it as a pricing anchor. Single-asset resales from the same portfolio are the most reliable adjustment benchmarks.",
  tips: [
    "Portfolio premium: 25–75 bps tighter than individual assets in the same market.",
    "A post-portfolio single-asset resale is the cleanest adjustment benchmark available.",
    "Seller-side brokers often cite portfolio comps intentionally — always ask if there are single-asset equivalents.",
  ],
};
