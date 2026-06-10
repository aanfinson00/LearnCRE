import type { SituationalCase } from '../../types/situational';

export const holdPeriodIrrSensitivity: SituationalCase = {
  id: 'hold-period-irr-sensitivity',
  title: 'Exit in year 4 or year 7 — how sensitive is IRR to hold period?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'mixed',
  scenario:
    "You are modeling a stabilized core-plus acquisition with the following base case: $10M equity invested at close. Annual cash yield of 6.5% ($650k/yr). 5-year hold, exiting at a 6.0% cap on year-5 NOI. The base-case IRR is approximately 10.5%. You're preparing an IC presentation and the committee asks: what happens to IRR if you exit a year early (year 4) or hold two years longer (year 7)?",
  data: [
    { label: 'Equity invested', value: '$10M' },
    { label: 'Annual cash yield', value: '6.5% ($650k/yr)' },
    { label: 'Base case hold', value: '5 years' },
    { label: 'Exit cap assumption', value: '6.0% (years 4 and 5), 6.25% (year 7)' },
    { label: 'Base case IRR', value: '~10.5%' },
  ],
  question:
    'Without running a model, which direction does IRR move for an early exit (yr 4) vs. a longer hold (yr 7), and why?',
  options: [
    {
      label:
        "Early exit (year 4) slightly lowers IRR vs. base — fewer years of carry, and exit proceeds are similar. Longer hold (year 7) also lowers IRR — NOI growth helps but is overcome by cap rate expansion (6.25%) and the time-value drag from waiting two more years for the same dollar of appreciation.",
      isBest: true,
      explanation:
        "For a stable cash-flowing asset, IRR is shaped by: (1) the size of exit proceeds relative to basis, and (2) the years over which cash flows are discounted. Year-4 exit: you collect 4 × $650k = $2.6M carry vs. 5 × $650k = $3.25M. Exit value is similar (one fewer year of NOI growth). Fewer cash flows pulled forward at the same exit multiple → slightly lower IRR than 5 years. Year-7 exit: two more years of carry ($1.3M more), BUT the exit cap expands 25 bps → compression in exit value. The higher NOI by year 7 and extra carry partially offset, but the cap expansion and time discount typically result in a modestly lower IRR than the base case. Core-plus stabilized assets exhibit this 'sweet spot' around a 5–7 year hold where IRR peaks.",
    },
    {
      label:
        'Early exit always increases IRR — getting money back sooner is always better due to time value.',
      isBest: false,
      explanation:
        "Time value favors earlier cash flows, but you also need to consider what you *gave up* by exiting early: one year of carry ($650k) and any residual NOI growth. At 6.5% cash-on-cash, the carry is meaningful. If the exit multiple is the same, an early exit can produce a slightly LOWER IRR because you sacrificed a year of cash flow that was accreting at above-hurdle returns.",
    },
    {
      label:
        'Year-7 exit maximizes IRR — more NOI growth and more carry always add up to a better return.',
      isBest: false,
      explanation:
        'More carry helps, but the cap rate expansion on exit (6.25% vs 6.0%) compresses exit value. On a stabilized asset, exit proceeds often drive more of the IRR than interim cash flows. Two extra years of carry at 6.5% adds ~$1.3M, but even a 25-bps cap expansion on a $14M+ asset value can offset that. IRR is not monotonically increasing with hold period.',
    },
    {
      label:
        'Hold period does not materially affect IRR for a stabilized asset with consistent cash yields.',
      isBest: false,
      explanation:
        "Hold period has a meaningful effect on IRR even for stabilized assets. The exit year determines how much of your return comes from the terminal sale vs. interim cash flow, and the cap rate assumption at exit changes with hold period. A 1-year difference in a 5-year hold changes the IRR by 50–150 bps in typical cases — far from immaterial.",
    },
  ],
  takeaway:
    'For stabilized core-plus assets, IRR is most sensitive to exit cap rate, not hold period variation. Small changes in exit cap (25–50 bps) typically swamp 1–2 year hold period changes. The carry-vs.-appreciation tradeoff means there is an optimal hold window; beyond it, cap expansion erodes the incremental carry. Always present hold-period sensitivity alongside cap-rate sensitivity in IC materials.',
  tips: [
    'For stabilized deals, exit cap sensitivity > hold period sensitivity in driving IRR swings.',
    'A 25-bps cap expansion on a $15M asset ≈ ~$625k of lost exit value — often more than 1 year of carry.',
    'Present 4/5/6/7-year IRR side-by-side to show the committee where the return peaks.',
  ],
};
