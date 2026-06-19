import type { SituationalCase } from '../../types/situational';

export const exitCapIrrSensitivity: SituationalCase = {
  id: 'exit-cap-irr-sensitivity',
  title: 'Exit cap rate moves 50 bps — how much IRR do you lose?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  scenario:
    "You're underwriting a 5-year hold of a multifamily asset. Purchase price: $25M at a 5.0% going-in cap rate. Year-1 NOI: $1.25M growing at 3%/year. You're underwriting an exit in Year 5 at a 5.25% cap rate on Year-6 NOI. Levered returns with 65% LTV at 5.5% interest-only debt produce a modeled 14% levered IRR. You want to understand how sensitive that IRR is to 25 bps and 50 bps of exit cap rate expansion.",
  data: [
    { label: 'Purchase price', value: '$25,000,000 (5.0% cap)' },
    { label: 'Year-1 NOI', value: '$1,250,000' },
    { label: 'NOI growth', value: '3%/year' },
    { label: 'Modeled exit cap rate', value: '5.25% on Year-6 NOI' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Debt', value: '65% LTV, 5.5% I/O' },
    { label: 'Modeled levered IRR', value: '14%' },
  ],
  question:
    'What is the approximate impact on levered IRR if the exit cap rate expands by 25 bps and by 50 bps, and what does this tell you about the underwriting risk?',
  options: [
    {
      label:
        "25 bps of exit cap expansion reduces levered IRR by approximately 150–200 bps (to ~12–12.5%); 50 bps of expansion reduces IRR by approximately 300–350 bps (to ~10.5–11%). The high sensitivity is driven by leverage: equity is roughly 35% of capital, so a given change in exit proceeds amplifies ~2.9x at the equity level. This is a highly exit-cap-sensitive deal — the IC should stress-test at 5.75% exit (50 bps wide) and confirm the IRR still clears the fund hurdle.",
      isBest: true,
      explanation:
        "Correct order of magnitude. Rough math: Year-6 NOI = $1.25M × 1.03^5 = ~$1.449M. At a 5.25% exit cap: $1.449M ÷ 0.0525 = $27.6M exit value. At 5.50% exit cap: $1.449M ÷ 0.055 = $26.3M (-$1.3M). At 5.75%: $1.449M ÷ 0.0575 = $25.2M (-$2.4M). Equity position: $25M × 35% = $8.75M invested. A $1.3M reduction in exit proceeds = ~15% of equity base, which meaningfully drags IRR over 5 years. The ~150–200 bps per 25 bps cap expansion is the right magnitude for this capital structure.",
    },
    {
      label:
        "Exit cap sensitivity is minimal — NOI grows 3%/year so the asset appreciates regardless of cap rate movement. A 25–50 bps cap expansion is within the margin of error for a 5-year hold.",
      isBest: false,
      explanation:
        "Wrong. NOI growth and cap rate expansion work in opposite directions on exit value. At 3%/year NOI growth over 5 years, NOI at exit is ~16% higher — but a 50-bps cap rate expansion compresses the multiple by 50/575 ≈ 8.7% on exit value, partially or fully offsetting growth. On a leveraged basis, the cap-rate sensitivity is amplified by the leverage ratio. 50 bps of exit cap expansion is not within a margin of error — it can meaningfully impair returns on a mid-teen IRR target.",
    },
    {
      label:
        "25 bps of exit cap expansion wipes out the entire IRR — at 5.0% entry and 5.5% exit, you're buying and selling at the same price with no appreciation, so all return comes from cash flow.",
      isBest: false,
      explanation:
        "Understates the return from NOI growth. Even at 5.5% exit (50 bps wider than 5.25% model), Year-6 NOI of $1.45M ÷ 5.5% = $26.4M exit vs $25M entry — still an exit premium due to NOI growth. The 14% levered IRR is not wiped out by 50 bps; it's reduced to the ~10.5–11% range. Saying 'entire IRR is wiped' is far too pessimistic and suggests the model is wrong or the arithmetic is off.",
    },
    {
      label:
        "IRR sensitivity to exit cap rate should be measured in basis points of IRR per dollar of exit value change, not by basis-point-to-basis-point comparison. The right framework is to run a sensitivity table.",
      isBest: false,
      explanation:
        "Running a sensitivity table is correct methodology, but this answer deflects from providing the actual estimate. In an interview or IC context, you need to give an order-of-magnitude answer, then offer to run the table. '150–200 bps IRR reduction per 25 bps of cap expansion' is the right estimate for this structure and should be communicable without Excel.",
    },
  ],
  takeaway:
    'Exit cap rate sensitivity is the single most important sensitivity for stabilized acquisitions on a 3–7 year hold. The rule of thumb for leveraged deals: every 25 bps of exit cap expansion reduces levered IRR by 100–200 bps depending on the leverage ratio and hold period (more leverage = more sensitivity; shorter hold = more sensitivity). Always present a 2×2 sensitivity table (NOI growth vs exit cap) to the IC — the "stress scenario" quadrant (low growth + wide cap) is the one the IC most wants to see.',
  tips: [
    'Exit value = Exit-year NOI ÷ Exit cap rate. A 25 bps cap expansion on $1.45M NOI: $1.45M ÷ 5.25% = $27.6M vs ÷ 5.50% = $26.4M = $1.2M difference.',
    'Leverage amplifies exit cap sensitivity: at 65% LTV, a $1.2M exit value drop lands almost entirely on the 35% equity layer.',
    'Hold period matters: on a 3-year hold, the NOI growth offsets less cap expansion than on a 7-year hold. Shorter hold = higher cap sensitivity.',
    'Fund hurdle is the go/no-go: if 50 bps of cap expansion keeps you above hurdle, the risk profile is acceptable. If 25 bps puts you below hurdle, it\'s a deal-breaker sensitivity.',
  ],
};
