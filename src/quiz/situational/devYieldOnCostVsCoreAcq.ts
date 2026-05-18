import type { SituationalCase } from '../../types/situational';

export const devYieldOnCostVsCoreAcq: SituationalCase = {
  id: 'dev-yield-on-cost-vs-core-acq',
  title: 'Development vs. core acquisition: same market, same NOI target — how do you choose?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    "Same submarket, two paths to similar stabilized NOI: (A) Core multifamily acquisition — 300-unit building at 95% occupancy, $80M asking price (4.5% going-in cap, $3.6M NOI, immediate cash yield). (B) Ground-up development — 300-unit site under option, $55M total cost (land + hard + soft + carry), targeting $3.6M stabilized NOI = 6.5% yield on cost. Both assume a 5.0% exit cap on year-5 NOI from stabilization. Core closes in 60 days; development requires 30 months of construction plus 6 months of lease-up before stabilization.",
  data: [
    { label: 'Path A (core acq)', value: '$80M, 4.5% cap, $3.6M NOI day-1' },
    { label: 'Path B (development)', value: '$55M all-in cost, 6.5% yield on cost' },
    { label: 'Shared stabilized NOI', value: '$3.6M' },
    { label: 'Shared exit cap assumption', value: '5.0% on year-5 (from stabilization) NOI' },
    { label: 'Development timeline', value: '30mo construction + 6mo lease-up = 36mo to stabilized' },
    { label: 'Development spread', value: '6.5% yield on cost − 5.0% exit cap = 150bps' },
    { label: 'Core acquisition spread', value: '4.5% going-in cap − ~3.5% blended CoC ≈ 100bps' },
  ],
  question: "How do you frame the choice, and which deal wins on risk-adjusted returns?",
  options: [
    {
      label:
        "The right frame is development spread vs. acquisition spread, not yield on cost vs. going-in cap. Development spread = yield on cost minus market exit cap = 6.5% - 5.0% = 150bps. Core acquisition spread = going-in cap minus blended cost of capital ≈ 4.5% - 3.5% = 100bps. Development earns a 50bps structural premium. Rule of thumb: ground-up development is economically justified when yield on cost is 100-150bps above market exit cap — below that, core acquisition is better risk-adjusted. At 150bps, development earns its premium but must compensate for 36 months of execution risk (construction, entitlement, lease-up) plus a j-curve before cash yield. For a development mandate, development wins. For a core mandate requiring immediate yield, core wins.",
      isBest: true,
      explanation:
        "Right framework. Yield on cost vs. going-in cap is an apples-to-oranges comparison — yield on cost is measured against total development cost; going-in cap is measured against purchase price of a stabilized asset. The correct comparison is development spread (yield on cost - market exit cap) vs. acquisition spread (going-in cap - cost of capital). At 150bps development spread vs. 100bps acquisition spread, development earns a 50bps premium — the right level to compensate for execution risk and a 36-month j-curve without cash distributions. The answer depends on LP mandate, hold-period flexibility, and the sponsor's development execution track record.",
    },
    {
      label:
        "Development always wins — 6.5% yield on cost vs. 4.5% going-in cap is a 200bps structural advantage.",
      isBest: false,
      explanation:
        "This comparison is apples-to-oranges. Yield on cost (6.5%) is measured relative to total development cost; going-in cap (4.5%) is measured relative to a stabilized property's purchase price. The correct comparison is yield on cost vs. market exit cap (6.5% vs. 5.0% = 150bps development spread) — not yield on cost vs. the acquisition's going-in cap. The 200bps figure is a common but incorrect shorthand.",
    },
    {
      label:
        "Core acquisition always wins — development risk (construction, entitlement, lease-up) makes ground-up inadvisable at any yield on cost level.",
      isBest: false,
      explanation:
        "Overstated. Development risk is real and gets compensated by the development spread — that's why institutional platforms build alongside acquisitions. At 150bps over market exit cap, development is exactly where the theoretical risk premium should make it economically sensible. Blanket avoidance ignores the structural premium available when land basis, construction costs, and market rents align.",
    },
    {
      label:
        "Run both on levered IRR and take whichever projects higher — that's the objective return comparison.",
      isBest: false,
      explanation:
        "IRR alone doesn't risk-adjust for the j-curve (development draws equity over 30 months with no distributions; core delivers cash from month 1), execution uncertainty, or hold-period differences (development year-5 starts 36 months later than core year-5). Development's higher modeled IRR partly reflects the time value of a delayed cash yield, not purely a higher-return investment. The metrics need to be risk-adjusted before the comparison is meaningful.",
    },
  ],
  takeaway:
    "The development vs. core acquisition decision centers on development spread: yield on cost minus market exit cap rate. At 100-150bps, development earns its risk premium — below 100bps, core acquisition is better risk-adjusted. The comparison is not yield on cost vs. going-in cap (apples to oranges). Factor in execution risk (construction, entitlement, lease-up), timeline (36 months of negative carry before stabilized distributions), and LP mandate (current yield vs. total return) when making the final call. Development spread, not raw yield on cost, is the correct metric.",
  tips: [
    "Development spread rule of thumb: 100-150bps over market exit cap is the standard institutional minimum. Below 100bps, buy core. Above 150bps, development is structurally compelling — stress-test the construction cost assumptions.",
    "J-curve discipline: development draws equity over 30 months with no distributions until lease-up complete. Core delivers cash yield from month 1. LP mandates requiring current income distributions can't tolerate the development j-curve.",
    "Market timing risk: development locks in cost at signing but faces an unknown exit cap at delivery 36 months later. If conditions deteriorate during construction, you deliver into a wider exit cap and longer lease-up. Core's risk is day-1; development's risk compounds across a 3-year window.",
  ],
};
