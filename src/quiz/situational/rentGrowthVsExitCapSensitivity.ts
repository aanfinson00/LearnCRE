import type { SituationalCase } from '../../types/situational';

export const rentGrowthVsExitCapSensitivity: SituationalCase = {
  id: 'rent-growth-vs-exit-cap-sensitivity',
  title: "Which assumption dominates your IRR — rent growth or exit cap?",
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "Your 5-year multifamily hold underwrites to a 15.5% levered IRR. The model uses 3% annual rent growth and a 5.50% exit cap. In the IC meeting, the chairman asks: 'If you had to be wrong on one assumption, which would hurt you more — 50 bps wider exit cap or 1% less rent growth per year?' You need to answer without opening the model.",
  data: [
    { label: 'Hold period', value: '5 years' },
    { label: 'Modeled IRR', value: '15.5%' },
    { label: 'Rent growth assumption', value: '3.0%/yr' },
    { label: 'Exit cap rate', value: '5.50%' },
    { label: 'Going-in NOI', value: '$1,800,000' },
    { label: 'Leverage', value: '65% LTV' },
  ],
  question:
    "Which sensitivity is likely to move the IRR more — 50 bps wider exit cap or 1% less rent growth per year?",
  options: [
    {
      label:
        "50 bps wider exit cap typically moves the IRR more than 100 bps less annual rent growth on a 5-year hold. The exit cap directly discounts the terminal value, which represents ~60–70% of total returns; rent growth affects NOI but is compounding over a short hold.",
      isBest: true,
      explanation:
        "In a 5-year hold, the terminal value (sale proceeds) usually drives 60–70% of total equity return. A 50 bps exit cap widening from 5.50% to 6.00% reduces the exit value by ~8% (since value = NOI ÷ cap rate, and 5.5/6.0 − 1 ≈ −8.3%). On a $33M exit value (NOI ÷ 5.5%), that's ~$2.8M of lost equity — a large IRR hit. 1% less annual rent growth (2% vs 3%) compounded over 5 years produces ~5% less NOI, which also hurts exit value, but the magnitude is smaller. The exit cap is the more sensitive lever.",
    },
    {
      label:
        "1% less rent growth per year is more damaging — it compounds across all 5 years and permanently reduces exit NOI.",
      isBest: false,
      explanation:
        "Rent growth does compound, but over 5 years at 1% less per year, the NOI delta at year 5 is roughly 5% (not a 5× compounding effect — each year's delta is small). The exit cap sensitivity is multiplicative on the terminal value, not just additive. 50 bps of cap expansion at 5.5% is a bigger hit to exit proceeds than 1% rent growth over 5 years.",
    },
    {
      label:
        "They're roughly equal; you can't determine which matters more without running the model.",
      isBest: false,
      explanation:
        "You can reason through this without a model. In a stabilized 5-year hold, the rule of thumb is: each 25 bps of exit cap expansion ≈ 4–5% reduction in exit value at a 5.5% going-in cap. One percentage point of reduced annual rent growth compounding over 5 years produces maybe 5% less year-5 NOI. The exit cap wins on magnitude.",
    },
    {
      label:
        "Neither matters much at a 65% LTV — the debt cushion absorbs both shocks.",
      isBest: false,
      explanation:
        "Leverage amplifies both sensitivities, not dampens them. At 65% LTV, equity is only 35% of asset value. A $2.8M decline in exit value at 65% leverage means a $2.8M loss on a ~$12M equity check — a much larger percentage hit to the LP than to the unlevered asset value. Leverage makes return sensitivities more severe, not less.",
    },
  ],
  takeaway:
    "In stabilized 5–7 year holds, the exit cap rate is typically the single most sensitive assumption because it discounts the terminal value that drives the majority of equity returns. Each 25 bps of exit cap expansion at a 5.5% cap reduces asset value by ~4.5%. Rent growth matters, but its 5-year compounding effect is usually smaller.",
  tips: [
    "Value = NOI ÷ cap rate; a 10% cap rate increase (5.5% → 6.0%) = a 8.3% value decline.",
    "Terminal value represents ~60–70% of total returns in stabilized 5-yr holds.",
    "When pressed at IC: 'Exit cap rate is my most sensitive assumption at a 5-year hold; I stress it to X% in my downside case.'",
  ],
};
