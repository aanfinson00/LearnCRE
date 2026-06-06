import type { SituationalCase } from '../../types/situational';

export const rentGrowthBreakevenSensitivity: SituationalCase = {
  id: 'rent-growth-breakeven-sensitivity',
  title: "What's the minimum rent growth this deal can withstand?",
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a stabilized multifamily acquisition. At 3.0% annual rent growth, the deal models to an 11.5% levered IRR over a 5-year hold. Entry NOI is $2.0M, purchase price $35M (5.7% going-in cap), 60% LTV debt at 6.5% on a 30-year amortization schedule, exit at the going-in cap rate applied to year-6 NOI. Your fund's minimum required IRR is 9%. A partner asks you to find the rent growth floor.",
  data: [
    { label: 'Purchase price', value: '$35M' },
    { label: 'Going-in NOI / cap', value: '$2.0M / 5.7%' },
    { label: 'Modeled rent growth', value: '3.0%/yr' },
    { label: 'Modeled IRR', value: '11.5%' },
    { label: 'LTV / rate', value: '60% / 6.5%' },
    { label: 'Exit cap', value: 'Going-in cap (5.7%) on year-6 NOI' },
    { label: 'Minimum required IRR', value: '9%' },
  ],
  question: 'How do you find the rent-growth floor, and what does the answer tell you about the deal?',
  options: [
    {
      label: "Dial rent growth down until IRR hits 9% — somewhere around 1.0–1.5%/yr is typically the breakeven on this structure. That number tells you how much cushion your 3.0% assumption provides against below-average growth cycles.",
      isBest: true,
      explanation:
        "Sensitivity analysis means finding the breakeven, not just describing the direction of impact. The mechanics: at 3.0% rent growth, year-6 NOI = $2.0M × 1.03^5 ≈ $2.32M, exit value at 5.7% cap ≈ $40.7M. At 1.0% growth, year-6 NOI ≈ $2.10M, exit ≈ $36.8M — equity proceeds (after debt paydown on 60% LTV amortizing loan) shrink materially, pulling levered IRR toward 9%. The critical output: the deal breaks below roughly 1.0–1.5% rent growth. Long-run multifamily rent growth has averaged 2.5–3.5% in normal US markets. A breakeven of 1.0–1.5% means the deal has a reasonable cushion — it would require a sustained sub-inflationary rent environment to fail. Report that gap explicitly: '3.0% assumed vs. 1.2% breakeven = 180 bps of cushion.'",
    },
    {
      label: "Run three labeled scenarios — bull 4%, base 3%, bear 2% — and report the IRR range. That's what sensitivity analysis is.",
      isBest: false,
      explanation:
        "Three scenarios are a starting point, not the answer to 'what's the floor.' The partner asked for the break-even. Three labeled scenarios doesn't tell you whether the deal fails at 2.5% or 0.5%. Find the actual break-even; then the three scenarios frame it with context.",
    },
    {
      label: "Sensitivity to rent growth is low on stabilized assets — exit cap is the dominant lever, so focus the analysis there.",
      isBest: false,
      explanation:
        "Partially true (exit cap is typically the largest single IRR lever on a 5-year hold) but it doesn't answer the question asked. Rent growth compounds into both annual cash flow and exit value (since exit NOI is the terminal denominator). On a 5-year hold, rent growth still moves IRR meaningfully — the partner asked you to quantify it. Run the number.",
    },
    {
      label: "You can't estimate the floor without a full monthly DCF model — rough math won't work here.",
      isBest: false,
      explanation:
        "Mental-math estimation is a core analyst skill. For a stabilized asset: exit value ≈ (NOI₁ × (1+g)^5) / cap rate; equity at exit ≈ exit value minus remaining loan balance. IRR on a 5-year hold is approximately solvable with compound growth and a simple equity split. The precision of a monthly model helps at the margin, but the order-of-magnitude breakeven is accessible in 2 minutes of back-of-envelope math.",
    },
  ],
  takeaway:
    "Sensitivity analysis means finding the breakeven, not describing the direction of risk. For rent growth, dial the assumption down until you hit your minimum required IRR — then report the gap between that breakeven and your base case. On a stabilized multifamily deal with 60% LTV, the break-even is often 1–2% rent growth, well below long-run historical norms. That cushion is the real output: how far outside historical experience does the deal have to go before it fails?",
  tips: [
    "Report the breakeven first: 'deal breaks at 1.2% rent growth' is more useful than '3% = ±X% IRR sensitivity.'",
    'Stack sensitivities: rent growth × exit cap together is the real combined downside scenario.',
    'Historical US multifamily rent growth: ~2.5–3.5% in normal markets; 2020–2022 spike was anomalous.',
  ],
};
