import type { SituationalCase } from '../../types/situational';

export const refiVsSell = {
  id: 'refi-vs-sell',
  title: 'Refinance or sell?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  assetClass: 'mixed',
  scenario:
    'You\'re three years into a five-year hold on a stabilized industrial asset. You\'ve modeled two paths to year-5 close-out: (a) hold + refi at year 3 to a 60% LTV loan, distribute proceeds, and sell at year 5; (b) sell now and redeploy into a similar deal at current pricing. The IRR on both paths is materially identical (~14.5%) on the model.',
  data: [
    { label: 'Hold remaining', value: '2 years' },
    { label: 'Refi LTV', value: '60%' },
    { label: 'Both-path IRR', value: '~14.5%' },
    { label: 'Asset stability', value: 'Stable, no value-add left' },
  ],
  question: 'How should you decide between the two paths?',
  options: [
    {
      label: '"It depends" — IRR equality leaves the decision to taxes, reinvestment risk on the proceeds, and LP preferences. Run the after-tax distributions and compare against your fund\'s required return on redeployed capital.',
      isBest: true,
      explanation:
        'When two paths have identical IRR, the IRR isn\'t the deciding factor. Sell-now triggers depreciation recapture and (depending on structure) capital gains; refi defers tax. The proceeds in path (b) need a place to land — if your reinvestment opportunity set requires a 14%+ deal at current pricing, redeployment risk is real. Refi extracts capital while keeping the underlying asset working. Path (a) tends to win for tax-sensitive LPs and uncertain redeployment markets.',
    },
    {
      label: 'Sell — same IRR, but liquidity is preferable to lock-in.',
      isBest: false,
      explanation:
        'Treats liquidity as free. Selling generates a tax event you don\'t need to trigger and creates a redeployment problem. Liquidity is valuable when there\'s a use for it; without one, accelerated taxes + reinvestment risk + transaction costs make selling the worse choice.',
    },
    {
      label: 'Refinance — extracting capital while keeping the upside is always preferable when IRR matches.',
      isBest: false,
      explanation:
        'Half-right but stated too strongly. Refi can be the right choice for the reasons given, but "always" ignores the cases where the asset is past its peak (cap rate expansion expected) or the loan-sizing markets are punishing (rates spiked, refi hurts cash-on-cash). Decision is conditional, not categorical.',
    },
    {
      label: 'Run the analysis longer — 14.5% on both paths means you\'re missing something in the model.',
      isBest: false,
      explanation:
        'IRR equality across well-built models is normal, not a flag. Time the cash flows carefully and you frequently get within 50 bps. The right question is what *non-IRR* factors should drive the decision, which is the "it depends" framing.',
    },
  ],
  takeaway:
    'When IRR is a tie, the decision moves to tax treatment and reinvestment economics. Refis are typically more tax-efficient and remove redeployment risk; sales lock in returns and free up capital. Neither is universally right — the answer depends on the LP\'s tax position, the fund\'s remaining deployment capacity, and the market for re-up deals.',
  tips: [
    'Always run after-tax IRR for refi-vs-sell decisions — pre-tax can mask big differences.',
    'Refi proceeds keep the depreciation schedule running; sales reset it.',
    'If you can\'t name 2+ deals you\'d redeploy into, "sell" is harder to justify.',
  ],
} satisfies SituationalCase;
