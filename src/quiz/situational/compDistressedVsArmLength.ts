import type { SituationalCase } from '../../types/situational';

export const compDistressedVsArmLength: SituationalCase = {
  id: 'comp-distressed-vs-arm-length',
  title: 'Should a foreclosure sale anchor your cap rate?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a stabilized, 200-unit Class-B multifamily asset. The broker provides four recent comps. Three are conventional arm\'s-length trades that printed at 5.75–6.25% going-in caps. The fourth is a lender-owned (REO) foreclosure sale of a comparable property that traded at a 9.25% cap — the lender took the asset back and needed to dispose of it quickly at a discount.',
  data: [
    { label: 'Comp 1 (arm\'s length)', value: '5.75% cap — stabilized, same submarket' },
    { label: 'Comp 2 (arm\'s length)', value: '6.00% cap — stabilized, same submarket' },
    { label: 'Comp 3 (arm\'s length)', value: '6.25% cap — slight vintage premium' },
    { label: 'Comp 4 (REO/foreclosure)', value: '9.25% cap — lender-motivated seller' },
  ],
  question: 'How should you treat the distressed comp in your pricing?',
  options: [
    {
      label: 'Discard the distressed comp entirely for pricing purposes — foreclosure sales reflect seller distress, not market equilibrium, and averaging it in would artificially widen the cap anchor.',
      isBest: true,
      explanation:
        'A distressed sale does not reflect market value as defined in most appraisal standards (neither buyer nor seller under compulsion). The 9.25% cap reflects the lender\'s need for quick liquidity, not what a willing buyer would pay for an identical asset from a willing seller with adequate market exposure. Including it in an average pulls the cap 75–100 bps wide vs. the 6.0% arm\'s-length center, producing a meaningfully lower bid that could lose discipline. Mention it in the IC memo as a data point on distressed market activity, but price off the three arm\'s-length comps.',
    },
    {
      label: 'Average all four comps — they\'re all recent trades in the same submarket.',
      isBest: false,
      explanation:
        'Averaging unfiltered comps treats every data point as equally representative of market pricing. It isn\'t. A distressed sale is a floor (what a motivated lender accepted), not a market anchor. Averaging the four produces a ~6.8% cap — 80 bps wide vs. the arm\'s-length consensus. That 80 bps is roughly a 12–14% discount to the deal\'s market value, which either loses the bid or mis-anchors the debt sizing.',
    },
    {
      label: 'Weight the distressed comp at 25% and the three arm\'s-length comps at 75% combined — partial credit for a real trade.',
      isBest: false,
      explanation:
        'Weighting a non-market transaction still distorts the analysis. The 25/75 blend produces a ~6.5% cap — still ~50 bps wide vs. fair value. There is no principled weighting between a market comp and a distressed sale; either it\'s market or it isn\'t. Discard it and document why.',
    },
    {
      label: 'Use the distressed comp as the downside scenario to stress the valuation.',
      isBest: false,
      explanation:
        'Stress-testing at a distressed-sale cap is rarely useful — that scenario implies the borrower has already defaulted and the lender is taking the asset back. A more appropriate downside is widening the exit cap 50–100 bps vs. market pricing to reflect a cyclical softening, not a foreclosure scenario. Use the distressed comp as context for what liquidation looks like, not as an underwriting scenario for a performing asset.',
    },
  ],
  takeaway:
    'Distressed comps (REO, foreclosure, bankruptcy) are not market-value indicators — they reflect seller duress, not equilibrium. Discard them for pricing purposes and document the decision. They can inform liquidation recovery analysis or serve as a floor reference, but should never anchor a going-in cap for a stabilized acquisition.',
  tips: [
    'Distressed sale rule: discard for pricing; retain for recovery and stress context.',
    'Market value requires willing buyer AND willing seller — forced dispositions meet neither condition.',
    'Flag distressed comps in the IC memo with a clear explanation of why they were excluded.',
  ],
};
