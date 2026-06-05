import type { SituationalCase } from '../../types/situational';

export const sensitivityCapExpansion: SituationalCase = {
  id: 'sensitivity-cap-expansion',
  title: 'Exit cap expands 100 bps — how much does it cost the equity?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  scenario:
    "You're reviewing a deal: $50M purchase price, 5.0% going-in cap, 5.5% modeled exit cap, 60% LTV at 5.5% interest-only debt, 5-year hold, 3% annual NOI growth. The base case models a 14% levered IRR. A reviewer asks: 'What does the IRR look like if the exit cap is 6.5% instead of 5.5%?'",
  data: [
    { label: 'Purchase price', value: '$50M' },
    { label: 'Going-in cap / NOI', value: '5.0% / $2.5M' },
    { label: 'Modeled exit cap', value: '5.5%' },
    { label: 'Stress exit cap', value: '6.5%' },
    { label: 'NOI growth', value: '3%/yr' },
    { label: 'Leverage', value: '60% LTV, 5.5% IO' },
    { label: 'Hold', value: '5 years' },
    { label: 'Modeled IRR', value: '~14% at 5.5% exit cap' },
  ],
  question: 'What is the approximate IRR impact of a 6.5% vs. 5.5% exit cap?',
  options: [
    {
      label:
        "At 6.5% exit cap, IRR drops to roughly 8-10% — a 4-6 point decline from the 14% base case. The $8M drop in exit value falls entirely on equity, which is amplified by the 60% leverage.",
      isBest: true,
      explanation:
        "Year-5 NOI = $2.5M × (1.03)^5 ≈ $2.9M. Base case exit value at 5.5%: $2.9M / 0.055 ≈ $52.7M. Stress exit at 6.5%: $2.9M / 0.065 ≈ $44.6M — an $8.1M decline. Debt = $50M × 60% = $30M (IO, no paydown). Equity at purchase: $20M. Equity proceeds at base: $52.7M − $30M = $22.7M. Equity proceeds at stress: $44.6M − $30M = $14.6M. Annual cash flow (NOI less IO): $2.5M − $1.65M = $0.85M growing at 3% — identical in both scenarios. The entire IRR difference comes from the terminal equity. MOIC in base: $22.7M / $20M = 1.14× (plus distributions). MOIC in stress: $14.6M / $20M = 0.73× (distributions alone save the deal). IRR falls from ~14% to ~8-10%. Rule of thumb: 100 bps cap expansion at exit ≈ 4-6 IRR points at 60% LTV.",
    },
    {
      label:
        "The IRR would drop by about 1-2 points — cap rate changes have a modest impact over a 5-year hold.",
      isBest: false,
      explanation:
        "Severely underestimates cap rate sensitivity in a leveraged deal. The $8.1M drop in exit value on $20M of equity is a 40% hit to terminal equity proceeds. Leverage amplifies cap rate sensitivity: the full $8.1M value loss sits on $20M of equity, not on $50M. This magnitude of terminal value change is a 4-6 IRR point event, not 1-2.",
    },
    {
      label:
        "The deal would go underwater — at 6.5% exit cap you couldn't repay the loan.",
      isBest: false,
      explanation:
        "Overstates. Stress exit value = $44.6M; loan = $30M IO. Equity recovers $14.6M at exit plus 5 years of distributions. The deal doesn't 'go underwater' — that requires exit value < loan balance, which would require a cap rate of ~$2.9M / $30M ≈ 9.7%. At 6.5%, equity is below plan but not wiped out. The deal generates a below-hurdle IRR (~8-10%), not a default.",
    },
    {
      label:
        "You need year-by-year distribution detail to estimate the IRR difference — the in-hold cash flows dominate the outcome.",
      isBest: false,
      explanation:
        "The in-hold distributions are identical between the two scenarios (same NOI growth, same IO payment). The only difference between base and stress is the exit proceeds. The question is specifically isolating the cap rate impact on terminal value — the correct analytical move is to focus on the year-5 exit value change, translate it to equity, and triangulate to an IRR delta. In-hold cash flows are a constant between scenarios.",
    },
  ],
  takeaway:
    "100 bps of exit cap expansion translates to roughly 4-6 IRR points in a 60% LTV, 5-year deal. The mechanism: cap expansion compresses terminal value; leverage amplifies the equity impact because the full terminal value loss sits on the equity, not shared with debt. Rule of thumb: the higher the leverage, the more sensitive the IRR to exit cap movement.",
  tips: [
    '100 bps cap expansion at exit ≈ 4-6 IRR points at 60% LTV on a 5-year hold — know this number cold.',
    'Leverage amplifies cap rate sensitivity: at 70% LTV, the same 100 bps expansion would cost 7-10 IRR points.',
    'Stress-test cap expansion and rent growth decline together for the combined downside scenario.',
  ],
};
