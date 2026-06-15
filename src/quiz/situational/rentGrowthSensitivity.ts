import type { SituationalCase } from '../../types/situational';

export const rentGrowthSensitivity: SituationalCase = {
  id: 'rent-growth-sensitivity',
  title: 'What happens to IRR if rent growth misses by 1%?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You've underwritten a 5-year multifamily hold with 3% annual rent growth, producing a 14% levered IRR. A senior reviewer asks for a 1% rent growth sensitivity — what if rent grows at 2% instead of 3%? The model is a 200-unit asset purchased at a 5.0% going-in cap, financed at 60% LTV with a 5.5% fixed-rate loan. Exit cap is modeled at 5.5% (50 bps spread over entry).",
  data: [
    { label: 'Units', value: '200' },
    { label: 'Going-in cap', value: '5.0%' },
    { label: 'Underwritten rent growth', value: '3%/yr' },
    { label: 'Levered IRR (base)', value: '14%' },
    { label: 'Leverage', value: '60% LTV, 5.5% fixed rate' },
    { label: 'Exit cap', value: '5.5% (50 bps expansion)' },
  ],
  question: 'What is the approximate IRR impact of dropping rent growth from 3% to 2%, and how should you present this sensitivity?',
  options: [
    {
      label:
        "Expect a 150–200 bps IRR drag. The compounding effect of 1% less rent growth over 5 years reduces terminal NOI ~5% (vs base), which depresses exit value by the same proportion at the same cap rate. On a 60% LTV deal, the equity value sensitivity is amplified — a 5% decline in asset value on 40% equity base is a ~12% equity value decline. The IRR impact is roughly 150–200 bps. Present this as the break-even rent growth rate (the rate at which IRR hits your hurdle).",
      isBest: true,
      explanation:
        "The mechanics: Year-5 NOI under 3% growth = base NOI × 1.03^5 ≈ base × 1.159. Under 2% growth = base × 1.02^5 ≈ base × 1.104. The delta is ~5% in terminal NOI. At a 5.5% exit cap, that 5% NOI shortfall translates to a ~5% lower exit value. On a deal with 40% equity, a 5% lower total value is a ~12–13% lower equity value. Given that equity compounds over 5 years, the IRR impact is ~150–200 bps. Correct framing for IC: present the sensitivity as a break-even table showing what rent growth rate produces your target hurdle IRR, so the committee can assess likelihood rather than just seeing a single delta.",
    },
    {
      label:
        "The IRR impact is minimal — 1% rent growth difference only affects NOI by ~1% per year, which is noise on a 5-year model.",
      isBest: false,
      explanation:
        "The compounding effect makes this significantly more than noise. 1% less growth per year for 5 years reduces terminal NOI by ~5% (not 1%), and that shortfall is then capitalized into the exit value. Additionally, leverage amplifies the equity value impact — a 5% asset-level value reduction translates to a ~12% equity value decline at 60% LTV. Small IRR differences (150–200 bps) on an already thin-margin deal can push returns below hurdle.",
    },
    {
      label:
        "Model the sensitivity by reducing every year's cash flow by 1% — the IRR impact is exactly 1%.",
      isBest: false,
      explanation:
        "The 1% annual rent growth difference doesn't produce a 1% cash flow reduction each year — it compounds. Year-1 cash flow is ~1% lower; year-2 is ~2% lower (1% gap compounds); by year 5, the NOI gap is ~5%. The exit value gap is also ~5% (applied at exit cap rate). The resulting IRR drag is not 1% — it's closer to 150–200 bps depending on leverage and hold period.",
    },
    {
      label:
        "The exit cap assumption matters more than rent growth — re-run the sensitivity on exit cap, not rent growth.",
      isBest: false,
      explanation:
        "Both variables matter and both should be sensitized. Exit cap sensitivity and rent growth sensitivity are complementary analyses, not substitutes. In the IC presentation, show a 2×2 (rent growth vs. exit cap) sensitivity table — this gives the committee the full picture of downside from two independent variables that both drive exit value.",
    },
  ],
  takeaway:
    "Rent growth sensitivity is one of the highest-leverage assumptions in multifamily underwriting — it drives both the annual NOI trajectory AND the terminal value (because year-5 NOI × (1/exit cap) = exit price). The compounding effect means a 1% annual shortfall produces a 5% terminal value gap on a 5-year hold. Leverage amplifies this further: on a 60% LTV deal, a 5% asset-level value decline is a ~12–13% equity value decline. Always present rent growth sensitivity as a break-even table (what rate produces the hurdle IRR?) rather than a single-point delta — it gives reviewers a probability-weighted way to assess the risk.",
  tips: [
    "Rule of thumb: 1% lower rent growth over 5 years → ~5% lower terminal NOI → ~5% lower exit value → ~150–200 bps IRR drag at 60% LTV.",
    "Present a break-even rent growth rate: what's the minimum annual growth that still clears the hurdle?",
    "Pair rent growth sensitivity with exit cap sensitivity in a 2×2 table for complete IC coverage.",
  ],
};
