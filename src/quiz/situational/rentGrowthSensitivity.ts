import type { SituationalCase } from '../../types/situational';

export const rentGrowthSensitivity: SituationalCase = {
  id: 'rent-growth-sensitivity',
  title: 'How much does rent growth drive your IRR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'mixed',
  scenario:
    'You are presenting an acquisition model at investment committee. The deal underwrites a 14.5% levered IRR on a 5-year hold. Your model assumes 3.0% annual rent growth. A committee member asks: "What happens to your IRR if rent growth comes in at 0% for the first two years, then recovers to 3%?" The deal is 95% leased with a stabilized 6.0% going-in cap. Your leverage is 65% LTV at a 6.5% all-in rate, 30-year amortization.',
  data: [
    { label: 'Base IRR', value: '14.5% levered' },
    { label: 'Rent growth assumption', value: '3.0%/yr' },
    { label: 'Stress scenario', value: '0% rent growth yrs 1–2, then 3%/yr yrs 3–5' },
    { label: 'Going-in cap', value: '6.0%' },
    { label: 'Leverage', value: '65% LTV, 6.5% all-in rate, 30-yr am' },
    { label: 'Hold period', value: '5 years' },
  ],
  question: 'What is the likely IRR impact of the stress scenario, and which driver is most responsible?',
  options: [
    {
      label: 'The IRR drops by roughly 150–250 bps to ~12–13% — the primary driver is a lower exit NOI, which compresses the exit value at a fixed exit cap, amplified by leverage.',
      isBest: true,
      explanation:
        'In the stress scenario, years 1–2 grow at 0% instead of 3%. That\'s two years of missed compounding: the NOI base entering year 3 is ~6% below the base case (vs. 6.09% higher in the base). By year 5, the NOI gap is roughly 5.5–6%, which directly reduces the exit value at a fixed cap. On a 65% leveraged deal, the exit value miss flows almost entirely through equity — amplifying the IRR impact. The year-1 cash flow impact is small (~3% of base NOI); the exit multiple compression is where the IRR bleeds. The range 150–250 bps depends on the NOI dollar amount, but the directional answer is unambiguous and the mechanism is clear.',
    },
    {
      label: 'The IRR barely changes — two years of flat rent growth won\'t materially impact a 5-year return.',
      isBest: false,
      explanation:
        'Two missed compounding years hit the exit NOI by ~5–6% relative to the base, which on a stabilized cap translates to a ~5–6% lower exit value. On a 65% leveraged deal with ~35% equity, that exit value miss is a ~15–17% hit to equity proceeds. Over 5 years, that magnitude changes IRR by 150–250 bps — not immaterial. IRR is highly sensitive to exit value because it\'s a lump sum that hits in year 5.',
    },
    {
      label: 'The IRR impact is entirely from lower year-1 and year-2 cash flows — the exit value is unaffected.',
      isBest: false,
      explanation:
        'Incorrect mechanism. Year-1 and year-2 cash flows are a small fraction of total equity proceeds; missing 3% rent growth for two years costs roughly 3% of annual NOI, which is a small number. The real damage is to the exit NOI and therefore the exit value — because the compounding shortfall carries forward to year 5. The exit value impact dwarfs the interim cash flow impact on a 5-year IRR.',
    },
    {
      label: 'The IRR is fine — you can just adjust the exit cap assumption by 25 bps to offset the rent growth miss.',
      isBest: false,
      explanation:
        'Adjusting the exit cap assumption to "fix" an IRR that broke due to rent growth is an accounting trick, not a financial answer. The question is about sensitivity to a real-world scenario. Manipulating the exit cap to restore the IRR would mean the deal only pencils if the exit environment is better than the base case — a compounding of optimism, not a solution.',
    },
  ],
  takeaway:
    'Rent growth sensitivity is primarily an exit value problem on leveraged deals, not a current cash flow problem. Two years of flat rent growth compounds to a ~5–6% NOI miss at exit, which on a fixed exit cap translates to a ~5–6% exit value miss — amplified by leverage. Always frame rent growth sensitivity in terms of exit NOI impact, not year-1 cash flows.',
  tips: [
    'Missed rent growth compounds: 2 yrs of 0% vs 3% = ~6% lower NOI entering year 3.',
    'Exit value drives IRR more than interim cash flows on a 5-year hold.',
    'Leverage amplifies exit value misses: a 5% exit value drop on 65% LTV is a ~15% equity loss.',
  ],
};
