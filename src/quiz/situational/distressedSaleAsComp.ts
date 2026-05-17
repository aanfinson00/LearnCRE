import type { SituationalCase } from '../../types/situational';

export const distressedSaleAsComp: SituationalCase = {
  id: 'distressed-sale-as-comp',
  title: 'Does the foreclosure trade count as a comp?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You are pricing a 150,000 SF suburban office building and need to anchor a going-in cap rate. The broker provides four trades from the past 9 months. Comp 3 was a bank-owned REO foreclosure sale that cleared at a 9.2% cap — well above the other three arms-length trades at 6.5–7.0%. The broker recommends including it with a 50–75 bps "distress haircut."',
  data: [
    { label: 'Comp 1', value: 'Same submarket, arms-length, 7 mos ago — 6.5% cap' },
    { label: 'Comp 2', value: 'Adjacent submarket, arms-length, 5 mos ago — 6.75% cap' },
    { label: 'Comp 3', value: 'Same submarket, bank-owned REO, 3 mos ago — 9.2% cap' },
    { label: 'Comp 4', value: 'Same submarket, arms-length, 2 mos ago — 7.0% cap' },
    { label: 'Broker suggestion', value: 'Adjust Comp 3 down 50–75 bps for distress' },
  ],
  question: 'How do you handle the distressed REO comp?',
  options: [
    {
      label: 'Discard Comp 3 entirely. REO/foreclosure sales reflect seller coercion, not market clearing. The correct comp set is Comps 1, 2, and 4 — average ~6.75%, then make a submarket adjustment for Comp 2.',
      isBest: true,
      explanation:
        'Distressed sales fail the arms-length test. The seller (a bank disposing of REO) has no choice but to sell; their cost basis and carrying constraints make them willing to accept a below-market price. The resulting cap rate reflects the seller\'s distress, not the asset\'s market value. Applying a 50–75 bps haircut to 9.2% yields 8.45–8.7% — still 145–175 bps wide of the arms-length cluster. Averaging this into your set would bias pricing by 40+ bps, which on a $20M deal is ~$800k of artificial cushion that does not exist in the market.',
    },
    {
      label: 'Include Comp 3 with the 50–75 bps haircut — it is recent and in the same submarket.',
      isBest: false,
      explanation:
        'Recency and location do not fix a non-arms-length transaction. Even after a 75 bps adjustment, the comp sits at 8.45%, which is 145 bps above the arms-length cluster. Blending this into a four-comp average produces a result biased toward a wider cap — which understates price and overstates downside protection. A haircut does not convert a distressed sale into a market comp.',
    },
    {
      label: 'Use Comp 3 as-is to anchor the wide end of your pricing range.',
      isBest: false,
      explanation:
        'A distressed sale is not the wide end of a market range — it is outside the market range entirely. Presenting it as a "ceiling" implies a willing seller might accept 9.2%; that is not supported by the arms-length evidence. Senior reviewers will flag this immediately, and lenders will not use it as an appraisal comp.',
    },
    {
      label: 'Ask for more comps to dilute the outlier\'s influence on the average.',
      isBest: false,
      explanation:
        'Adding comps to dilute a known-bad comp is analytically backward. If you can identify that Comp 3 is non-arms-length, exclude it — do not bury it. Five good comps and one REO comp averaged together still produce a biased result, just less obviously biased.',
    },
  ],
  takeaway:
    'Comp vetting starts with the arms-length test: would a willing, informed seller on an open market accept this price? REO sales, bankruptcy liquidations, estate sales under time pressure, and related-party transactions all fail this test. Exclude them; do not adjust them.',
  tips: [
    'Arms-length test: willing seller, willing buyer, open market, no undue compulsion.',
    'Common non-arms-length situations: REO/bank-owned, bankruptcy liquidation, divorce decree sale, related-party transfer.',
    'If you have fewer than 3 valid arms-length comps, say so and widen the pricing range — do not fill gaps with distressed data.',
  ],
};
