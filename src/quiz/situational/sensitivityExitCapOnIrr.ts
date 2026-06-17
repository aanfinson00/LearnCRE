import type { SituationalCase } from '../../types/situational';

export const sensitivityExitCapOnIrr: SituationalCase = {
  id: 'sensitivity-exit-cap-on-irr',
  title: 'Exit cap sensitivity — which variable matters most to your IRR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  scenario:
    "You're presenting a 5-year hold underwriting on a multifamily acquisition at a 5.0% going-in cap. Your base case projects a 14.5% levered IRR. The deal committee asks you to run the sensitivity table and explain which variable matters most. You run: (A) exit cap ±50 bps, (B) rent growth ±1%/yr flat for all 5 years, (C) hold period +/− 1 year, and (D) LTV ±5% at acquisition.",
  data: [
    { label: 'Base case IRR', value: '14.5% (levered)' },
    { label: 'Going-in cap', value: '5.0%' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Sensitivity A — exit cap +50 bps', value: '11.8% IRR' },
    { label: 'Sensitivity A — exit cap −50 bps', value: '17.6% IRR' },
    { label: 'Sensitivity B — rent growth −1%/yr', value: '12.9% IRR' },
    { label: 'Sensitivity B — rent growth +1%/yr', value: '16.3% IRR' },
    { label: 'Sensitivity C — hold +1 yr', value: '13.8% IRR' },
    { label: 'Sensitivity D — LTV −5%', value: '13.7% IRR' },
  ],
  question:
    'How do you explain which sensitivity matters most and what this tells the deal committee about risk?',
  options: [
    {
      label:
        "Exit cap is the dominant variable — a 50 bps move in exit cap swings IRR by 2.7% downside / 3.1% upside, vs. rent growth which swings ±1.6%. This is normal for a 5-year hold on a stabilized asset because terminal value represents ~65–70% of total return. The deal committee should focus risk management on exit timing and cap rate environment, not just rent growth.",
      isBest: true,
      explanation:
        "On a 5-year stabilized hold, most of the equity return comes from the terminal value (residual sale proceeds) rather than cumulative cash flow. The rule of thumb: for every year of hold period, cash flow represents ~15–20% of total return on a stabilized asset. So at 5 years, terminal value is 65–75% of the IRR driver — meaning exit cap is structurally the most powerful variable. A 50 bps exit cap move changes exit price by 8–10% on the entire capital stack, while a 1% rent growth change compounds over 5 years but starts at a smaller base. The committee insight: exit timing and cap rate environment management are more important than year-to-year rent performance in a 5-year hold.",
    },
    {
      label:
        "Rent growth matters most — compounding 1% additional rent growth over 5 years produces significant NOI gains that drive both cash flow and the terminal value.",
      isBest: false,
      explanation:
        "The data shows otherwise. A ±1%/yr rent growth change swings IRR by ±1.6–1.7%, while the exit cap swings it by 2.7–3.1%. Rent growth does compound into NOI and affects the terminal value (higher NOI at a given exit cap = higher price), but both effects together are smaller than the cap rate move. The terminal value is a multiple of stabilized NOI (NOI/cap) — a 1% rent improvement improves the numerator modestly, but the cap rate controls the denominator directly.",
    },
    {
      label:
        "Hold period is the most forgiving variable because adding one year barely changes the IRR (13.8% vs 14.5%) — so the deal is robust to timing delays.",
      isBest: false,
      explanation:
        "True that hold period sensitivity is low in this case — but the conclusion is off. The reason the 1-year extension barely hurts IRR is that this deal has decent cash yield. But the question asked which variable matters MOST, not which is most forgiving. Exit cap clearly dominates. The 'robust to hold period' observation is a useful secondary point, not the primary risk message.",
    },
    {
      label:
        "LTV at acquisition matters most because it determines the equity basis and therefore the absolute magnitude of IRR.",
      isBest: false,
      explanation:
        "LTV affects the equity invested (more leverage = higher IRR for same absolute return), but the sensitivity data shows a 5% LTV reduction only moves IRR by ~80 bps (14.5% → 13.7%). That's the smallest sensitivity in the table. Leverage amplifies ALL the other sensitivities but doesn't dominate any of them. Exit cap still dominates — in fact, a highly leveraged deal would make exit cap sensitivity even larger, not smaller.",
    },
  ],
  takeaway:
    "On a 5-year stabilized hold, terminal value (exit price = NOI at exit / exit cap) typically represents 65–75% of total IRR. This structural fact means exit cap is almost always the dominant sensitivity variable. When building a sensitivity table for a deal committee, always lead with exit cap vs. going-in cap spread — that's the first thing experienced investors will look at. Secondary sensitivities (rent growth, hold period) matter but are structurally smaller because they compound from a smaller base than the entire exit value.",
  tips: [
    'Rule of thumb: for stabilized 5-yr holds, terminal value ≈ 65–70% of IRR; for value-add / shorter holds, cash flow weight is higher.',
    'Exit cap sensitivity grows with hold period: 3-yr hold is less cap-sensitive than 7-yr hold because cash flow represents a larger fraction at 3 yrs.',
    'Pair the exit cap sensitivity with a qualitative view on cap rate direction — where in the cycle are we?',
  ],
};
