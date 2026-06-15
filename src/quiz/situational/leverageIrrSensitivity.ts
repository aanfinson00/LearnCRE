import type { SituationalCase } from '../../types/situational';

export const leverageIrrSensitivity: SituationalCase = {
  id: 'leverage-irr-sensitivity',
  title: 'Does adding leverage always improve IRR in today\'s rate environment?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'mixed',
  scenario:
    "You're comparing two capital structures for an industrial acquisition at a 5.5% going-in cap. The senior partner wants to lever up from 55% LTV to 70% LTV, arguing it will boost the levered IRR. Interest rates have moved significantly — 5-year fixed debt is now pricing at 6.25%. Unlevered IRR on the deal (all-equity) is projected at 9.5% over a 5-year hold.",
  data: [
    { label: 'Going-in cap', value: '5.5%' },
    { label: 'Unlevered IRR', value: '9.5%' },
    { label: 'Option A — moderate leverage', value: '55% LTV, 6.25% rate, 1.40x DSCR' },
    { label: 'Option B — high leverage', value: '70% LTV, 6.25% rate, ~1.05x DSCR' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Loan structure', value: '5-yr fixed, interest-only' },
  ],
  question: 'Does increasing from 55% LTV to 70% LTV improve the levered IRR, and what is the key risk at 70%?',
  options: [
    {
      label:
        "No — when debt costs (6.25%) exceed the cap rate (5.5%), leverage is NEGATIVE carry and adding more leverage DESTROYS IRR. Going from 55% to 70% LTV amplifies the negative spread, worsens cash flow, and increases equity risk without a return benefit. The 70% structure also creates an extremely thin DSCR (~1.05x) that leaves no cushion for vacancy or OpEx surprises.",
      isBest: true,
      explanation:
        "The fundamental rule: leverage enhances IRR only when the cap rate exceeds the cost of debt (positive carry). Here, cap rate (5.5%) < debt cost (6.25%) = negative carry of 75 bps. Each incremental dollar of debt at 6.25% on an asset yielding 5.5% generates negative spread to equity — the higher the LTV, the more negative. At 70% LTV, the cash-on-cash return on equity in year 1 is likely below the unlevered yield. The DSCR at ~1.05x is dangerously thin: any NOI shortfall (one tenant departure, 5% expense overrun) triggers a DSCR covenant violation. In a negative-carry environment, lower leverage or floating-rate structures with interest rate hedges are more appropriate strategies.",
    },
    {
      label:
        "Yes — leverage always boosts IRR because you're controlling a larger asset with less equity.",
      isBest: false,
      explanation:
        "The 'leverage always boosts IRR' rule only holds in POSITIVE carry environments (cap rate > debt cost). When debt cost exceeds the cap rate, every dollar of debt dilutes returns rather than enhancing them. In today's rate environment with 6.25% debt on a 5.5% cap asset, leverage is value-destructive. The 'control more asset per dollar of equity' argument is correct in isolation but ignores the negative carry cost.",
    },
    {
      label:
        "The DSCR is the only concern — fix the DSCR with an interest reserve and then 70% LTV is fine.",
      isBest: false,
      explanation:
        "An interest reserve papers over the symptom but doesn't fix the underlying problem: negative carry. If the cap rate is below the debt cost, the reserve is depleting capital to service debt that generates negative spread. You'd be paying to hold the leverage rather than earning a benefit from it. The 70% LTV structure is structurally incorrect for a negative-carry environment regardless of the reserve.",
    },
    {
      label:
        "Both structures produce the same unlevered IRR — leverage is neutral to returns and the choice is a risk preference.",
      isBest: false,
      explanation:
        "Leverage is never neutral — it shifts risk and return simultaneously. In positive-carry environments, it boosts both expected return and risk. In negative-carry environments (like this one), it reduces expected return AND increases risk (tighter DSCR, refinance risk, equity squeeze on exit). The choice is not neutral; it has a directional impact on IRR that must be quantified.",
    },
  ],
  takeaway:
    "The fundamental leverage decision hinges on the sign of the carry spread (cap rate minus debt cost). In positive-carry environments (cap rate > cost of debt), leverage enhances IRR. In negative-carry environments (debt cost > cap rate), leverage destroys IRR. Today's rate environment has created widespread negative-carry conditions in institutional real estate — a regime change from the 2010s when 3–4% debt on 5–7% cap assets made high-LTV structuring easy. The 70% LTV trap: high leverage in negative carry amplifies losses on the downside while capping upside, creating asymmetric risk-return — the worst of both worlds.",
  tips: [
    "Carry spread = going-in cap − debt interest rate. Negative spread means leverage hurts, not helps.",
    "DSCR headroom: minimum 1.25x at closing to absorb NOI volatility. 1.05x means any miss triggers a covenant breach.",
    "In negative-carry deals, consider lower LTV or floating rate with a cap to retain the upside option if rates fall.",
  ],
};
