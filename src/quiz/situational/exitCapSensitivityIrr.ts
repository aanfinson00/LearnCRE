import type { SituationalCase } from '../../types/situational';

export const exitCapSensitivityIrr: SituationalCase = {
  id: 'exit-cap-sensitivity-irr',
  title: 'A 50 bps cap widening at exit — how much does it hurt your IRR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a 5-year hold on a multifamily acquisition at $50M (5.0% going-in cap, $2.5M Year-1 NOI). Year-5 stabilized NOI is projected at $2.9M. Base case exit cap is 5.50%. The deal is financed at 60% LTV ($30M loan). Equity invested: $20M. Approximate Year-5 cash-on-cash distributions: $800K cumulative above debt service over the hold.",
  data: [
    { label: 'Acquisition price', value: '$50.0M' },
    { label: 'Going-in cap', value: '5.0% (Year-1 NOI: $2.5M)' },
    { label: 'Year-5 NOI', value: '$2.9M' },
    { label: 'Base exit cap', value: '5.50%' },
    { label: 'LTV / Loan amount', value: '60% / $30M' },
    { label: 'Equity invested', value: '$20M' },
    { label: 'Hold-period distributions (total, 5 yr)', value: '~$4M above debt service' },
  ],
  question: 'If the exit cap widens 50 bps to 6.0%, what is the approximate impact on your levered IRR?',
  options: [
    {
      label:
        'Exit at 5.50%: $2.9M / 0.055 = $52.7M → equity at exit = $22.7M + $4M distributions ≈ $26.7M on $20M invested ≈ 14% levered IRR. Exit at 6.0%: $2.9M / 0.060 = $48.3M → equity at exit = $18.3M → deal barely returns equity before distributions. Levered IRR drops to approximately 8–9%. A 50 bps cap widening costs roughly 500–600 bps of levered IRR.',
      isBest: true,
      explanation:
        "Cap rate sensitivity is amplified by leverage. At 5.50% exit: equity proceeds = $52.7M − $30M loan = $22.7M. Add $4M of hold-period distributions → total equity return ≈ $26.7M on $20M invested over 5 years → roughly 5.9% CAGR, or ~14% IRR (rough). At 6.0% exit: $48.3M − $30M = $18.3M of equity at exit → $22.3M with distributions → slightly above return of capital, roughly 2.2% CAGR → ~8-9% IRR. The levered loss is amplified because the loan is fixed; every dollar of value decline comes fully out of equity. 50 bps cap widening on a 60% LTV deal costs ~500+ bps of levered IRR.",
    },
    {
      label:
        '50 bps is minor on a 5-year hold — exit value drops a few percent and IRR is barely affected.',
      isBest: false,
      explanation:
        "This misses the leverage amplification. On an unlevered basis, $52.7M to $48.3M is a ~8.4% value decline. On a 60% LTV structure, the equity value drops from $22.7M to $18.3M — a ~19% decline in equity proceeds. Leverage turns a moderate cap rate move into a large equity impact. 50 bps of cap widening on a levered deal is never 'minor'.",
    },
    {
      label:
        'The impact is exactly proportional: 50 bps cap widening equals approximately 50 bps of IRR compression.',
      isBest: false,
      explanation:
        "There is no direct proportionality between cap rate moves and IRR impact. The relationship depends on leverage, hold period, and NOI growth. At typical CRE leverage (60–70% LTV), the IRR sensitivity to cap rate is approximately 10:1 — a 50 bps cap move costs ~400–600 bps of levered IRR, not 50 bps. The leverage multiplier is the key factor most analysts underestimate.",
    },
    {
      label:
        'Cap widening only matters at exit — hold-period cash flows are strong enough to compensate for the exit loss.',
      isBest: false,
      explanation:
        "On a 5-year hold, the majority of total return comes from exit proceeds, not hold-period distributions. At typical cap rates and leverage, the exit value represents 70–80% of total equity return. Hold-period cash flows of ~$4M do not offset an equity-at-exit shortfall of ~$4.4M ($22.7M vs. $18.3M). Strong operating performance cushions but does not eliminate exit cap risk.",
    },
  ],
  takeaway:
    'Exit cap sensitivity is the highest-risk variable in most equity underwriting and it is magnified by leverage. On a 60% LTV deal, a 50 bps widening in the exit cap can erase 500+ bps of levered IRR. Always run an explicit exit cap sensitivity table (base, +25, +50, +100 bps) and confirm that the deal still clears its hurdle under a +50 bps stress. If it doesn\'t, either resize the loan or reprice the entry.',
  tips: [
    "Rule of thumb: 25 bps of cap widening ≈ 200–300 bps of levered IRR compression at 60–65% LTV on a 5-year hold.",
    'The going-in vs. exit cap spread (expansion or compression) is one of the three biggest levers in real estate IRR — along with NOI growth and leverage.',
    'Build a two-way sensitivity table: NOI growth × exit cap. The worst quadrant is where your deal should still work.',
  ],
};
