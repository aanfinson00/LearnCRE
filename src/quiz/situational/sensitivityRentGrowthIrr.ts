import type { SituationalCase } from '../../types/situational';

export const sensitivityRentGrowthIrr: SituationalCase = {
  id: 'sensitivity-rent-growth-irr',
  title: 'What happens to IRR when rent growth goes flat?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "A 5-year multifamily hold is underwritten to a 14% levered IRR assuming 3% annual rent growth. A partner challenges the growth assumption: current market rents have been flat for 12 months and new supply is still delivering. The deal was acquired at a 5.5% going-in cap, financed at 65% LTV on a fixed-rate IO loan at 6.0%, with a modeled 6.0% exit cap.",
  data: [
    { label: 'Going-in cap', value: '5.5%' },
    { label: 'Exit cap (modeled)', value: '6.0% (+50 bps expansion)' },
    { label: 'Leverage', value: '65% LTV · 6.0% fixed rate · IO' },
    { label: 'Base case rent growth', value: '3%/yr → 14% levered IRR' },
    { label: 'Sensitivity case', value: '0% rent growth (flat rents)' },
  ],
  question: "How much does IRR fall when rent growth goes from 3% to 0%?",
  options: [
    {
      label: "Roughly 300–400 bps — flat rents cut NOI growth, reducing both annual distributions and the exit valuation. At 0% rent growth on a levered deal, IRR likely falls to the 10–11% range.",
      isBest: true,
      explanation:
        "At 3% annual growth over 5 years, Year-5 NOI ≈ 1.16× Year-1 NOI. At 0% growth, Year-5 NOI = Year-1 NOI. Exit value (NOI ÷ exit cap) is 16% lower in the flat-rent case. On a levered deal, this value reduction flows entirely to equity because the debt balance is fixed. At 65% LTV, equity is 35% of the capital stack — so a 16% drop in asset value represents a ~46% swing in equity value at exit. The combined hit (lower annual cash flow + lower exit value) reduces IRR by roughly 300–400 bps. The magnitude depends on deal structure, but 10–11% IRR is a reasonable estimate for the flat-rent case.",
    },
    {
      label: "Minimal — rent growth only affects annual distributions, and the exit cap rate is fixed, so the IRR barely changes.",
      isBest: false,
      explanation:
        "Rent growth affects both annual distributions AND the exit value, since exit value = exit-year NOI ÷ exit cap rate. If exit-year NOI is lower, exit value is proportionally lower — and that value swing is amplified to equity by leverage. Underestimating the IRR sensitivity to rent growth is one of the most common levered underwriting errors.",
    },
    {
      label: "Zero — if you buy at the right cap rate, rent growth is just upside, not embedded in the base case.",
      isBest: false,
      explanation:
        "The 14% base-case IRR explicitly incorporates 3% rent growth. Calling growth 'just upside' means the true base case IRR was never 14%. If rent growth is 0%, the base case must be recomputed with the correct assumption. This answer confuses how assumptions are labeled in memos with how they actually flow through the cash flows.",
    },
    {
      label: "IRR falls to near zero — flat rents on IO debt at 6.0% with a 5.5% cap produces negative leverage and destroys returns.",
      isBest: false,
      explanation:
        "Negative leverage is real when the debt rate (6.0%) exceeds the cap rate (5.5%), meaning the loan earns less than it costs. But this creates thin or negative cash-on-cash yield — not zero IRR. The equity still benefits from any exit proceeds above the loan balance, which at 65% LTV is 35% of value. Zero IRR would require exit value ≤ original equity — a much more severe scenario than just flat rents.",
    },
  ],
  takeaway:
    "Rent growth sensitivity is one of the highest-leverage assumptions in a levered multifamily model because: (1) NOI at exit drives exit value; (2) the full value swing flows to equity, amplified by leverage. Rule of thumb: on a 5-year hold at 65% LTV, each 1% reduction in annual rent growth costs approximately 75–100 bps of levered IRR. Run the sensitivity explicitly — don't rely on approximations in an IC memo.",
  tips: [
    "Levered IRR is more sensitive to exit value than unlevered — leverage amplifies the NOI growth swing.",
    "5-year NOI compounding: at 3% → 1.16×; at 0% → 1.00×. The delta is 16% of year-1 NOI.",
    "Also test: does 0% rent growth cause a DSCR covenant breach? Cash flow and covenant stress are separate risks.",
  ],
};
