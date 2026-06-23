import type { SituationalCase } from '../../types/situational';

export const sensitivityAssumptionRanking: SituationalCase = {
  id: 'sensitivity-assumption-ranking',
  title: 'Which assumption kills the IRR?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'mixed',
  scenario:
    "You've built a 5-year hold model for a stabilized industrial asset penciling to a 15% levered IRR at 60% LTV (IO loan). A partner asks: 'Run a tornado — which single variable, moved 10% adversely, hurts the IRR most?' The four key assumptions are: (A) going-in cap rate (entry price), (B) exit cap rate, (C) NOI CAGR, and (D) hold period.",
  data: [
    { label: 'Base IRR', value: '15% levered' },
    { label: 'Leverage', value: '60% LTV, IO loan' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Going-in cap stress', value: '+10% adverse (pay higher price)' },
    { label: 'Exit cap stress', value: '+10% adverse (wider exit cap)' },
    { label: 'NOI CAGR stress', value: '−10% adverse (lower income growth)' },
    { label: 'Hold period stress', value: '+10% adverse (hold longer)' },
  ],
  question: 'Which single adverse 10% move typically has the largest IRR impact in this structure?',
  options: [
    {
      label: "Exit cap rate — a 10% adverse exit cap move (e.g., 5.0% → 5.5%) compresses the sale price and, after repaying the fixed 60% LTV loan, disproportionately shrinks the levered equity residual. Leverage amplifies cap-rate sensitivity on exit proceeds.",
      isBest: true,
      explanation:
        "In a levered hold, the equity residual = sale price − loan payoff. The loan is fixed (60% of purchase price on IO); the equity captures 100% of the price change on exit. A 10% exit cap widening reduces asset value by ~9% (NOI / (cap × 1.1) vs NOI / cap). On a 60% LTV structure, that 9% asset value decline falls almost entirely on the 40% equity — a ~22% equity value decline. By contrast, a 10% NOI CAGR miss reduces cumulative income AND the NOI base at exit, but both effects are smaller than the exit-proceeds amplification from leverage. Going-in cap is sunk at acquisition. Hold period extension from 5→5.5 years adds minor income but barely moves the annualized IRR.",
    },
    {
      label: "Going-in cap rate — paying a higher entry price is the worst outcome because you can't undo it.",
      isBest: false,
      explanation:
        "Going-in cap stress in the adverse direction means paying a lower cap (higher price) at entry. That's real — but it's already baked into the base IRR, which is the starting point. The question is which variable you haven't locked in yet. The exit cap is still unknown at underwriting; the going-in cap is fixed at closing. Prospective sensitivity matters most for live risk management.",
    },
    {
      label: "NOI CAGR — income compounds over 5 years and also drives the exit valuation, so getting it wrong by 10% has a double impact.",
      isBest: false,
      explanation:
        "NOI CAGR does affect both cumulative income and the exit NOI base (which determines value at the exit cap). The double-impact is real but typically smaller than the leverage amplification on exit-cap moves. On a 5-year hold with 60% LTV, a 10% NOI CAGR miss reduces exit value by ~9% AND cumulative income by 10% — but both are smaller effects than a 10% exit cap widening's ~22% equity value compression.",
    },
    {
      label: "Hold period — longer holds reduce the annualized IRR mechanically by spreading returns over more time.",
      isBest: false,
      explanation:
        "Hold period extension from 5→5.5 years (10% longer) adds some income but dilutes the annualized IRR modestly. Unless market conditions deteriorate during the extension (e.g., exit cap widens), the hold period is typically the least sensitive input in a stabilized hold. A 10% hold-period miss has far less IRR impact than a 10% exit-cap miss in a levered structure.",
    },
  ],
  takeaway:
    "In a levered stabilized hold, exit cap rate is routinely the top IRR sensitivity because leverage amplifies its impact on the equity residual. The intuition: the loan is fixed; a cap rate move changes 100% of asset value but affects only the 40% equity slice — so the equity sees the change at 2.5× the asset-level magnitude. Tornado the exit cap first; stress the NOI second; hold period and going-in cap are secondary.",
  tips: [
    "Leverage amplification: a 9% asset value change hits 40% equity as a ~22% equity value change at 60% LTV.",
    "Exit cap is the dominant lever because it's unknown at underwriting; going-in cap is sunk.",
    "Run tornado: stress each variable ±10% independently, rank by IRR delta, report top 3.",
  ],
};
