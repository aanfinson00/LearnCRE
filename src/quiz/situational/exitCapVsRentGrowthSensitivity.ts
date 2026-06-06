import type { SituationalCase } from '../../types/situational';

export const exitCapVsRentGrowthSensitivity: SituationalCase = {
  id: 'exit-cap-vs-rent-growth-sensitivity',
  title: 'Which lever moves the needle most?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'mixed',
  scenario:
    "You've modeled a 5-year hold with base-case levered IRR of 10.2%. You run two sensitivity tests, each ±100 bps or ±1.0% while holding everything else constant. The results are in the table below. A senior partner asks you to explain what the sensitivity table tells you and how it should shape your underwriting focus going forward.",
  data: [
    { label: 'Base case IRR', value: '10.2%' },
    { label: 'Exit cap +100 bps', value: 'IRR → 7.8% (−240 bps impact)' },
    { label: 'Exit cap −100 bps', value: 'IRR → 13.1% (+290 bps impact)' },
    { label: 'Rent growth +1.0%', value: 'IRR → 11.4% (+120 bps impact)' },
    { label: 'Rent growth −1.0%', value: 'IRR → 9.1% (−110 bps impact)' },
  ],
  question: 'What does the sensitivity table tell you, and where should your analytical effort go?',
  options: [
    {
      label: "Exit cap dominates — a ±100 bps move creates 2× the IRR impact of a ±1% rent growth shift. Spend most of your analytical rigor defending the exit cap assumption, not optimizing rent growth.",
      isBest: true,
      explanation:
        "On a 5-year hold, exit value (a direct function of the exit cap rate) typically represents 60–75% of total levered return. The data shows this clearly: exit cap moves IRR by 240–290 bps per 100 bps; rent growth moves it 110–120 bps per 1%. The ratio is roughly 2:1. This asymmetry means the highest-leverage use of your analytical time is defending the exit cap assumption: What is the current market cap? What macro rate path am I assuming at exit? What is my spread to the 10-year treasury on exit day? Disproportionate attention to rent growth projections while accepting a flat or optimistic exit cap is the most common underwriting mistake on shorter holds.",
    },
    {
      label: "Rent growth matters most — it drives NOI, which everything else depends on.",
      isBest: false,
      explanation:
        "Rent growth drives NOI, which feeds into exit value — but the multiple applied at exit (the exit cap rate) amplifies or dampens that NOI. The data directly shows exit cap has 2× the IRR sensitivity of rent growth for this hold period. Rent growth is important, but it's a secondary lever on a 5-year hold. Allocate analytical attention proportionally to impact.",
    },
    {
      label: "Both are equally important — present them as balanced risks in your sensitivity table.",
      isBest: false,
      explanation:
        "The data says otherwise. Equal weighting ignores the explicit output. 'Both are important' is always technically true but analytically useless. The point of running sensitivities is to find the differential importance — and the differential here is unambiguous. Presenting them as equal risks misrepresents the deal's risk profile to the investment committee.",
    },
    {
      label: "Neither is the primary risk — vacancy assumptions dominate office underwriting and should lead the sensitivity analysis.",
      isBest: false,
      explanation:
        "Vacancy matters and would show up in a separate sensitivity row. But the question asks you to interpret the two variables you actually tested. Within those two, the data is clear: exit cap dominates. Adding 'but what about vacancy?' is valid for a complete IC presentation, not for answering the question asked.",
    },
  ],
  takeaway:
    "On 3–7 year holds, exit cap rate is almost always the dominant IRR lever — it determines the multiple applied to terminal NOI, which is the largest single cash flow event in the life of the deal. Use sensitivity analysis to confirm this (it holds in most cases, but the exact magnitude varies by hold period and leverage), and direct most analytical rigor toward defending the exit cap assumption: current market cap, macro rate path, and cap-to-treasury spread at exit.",
  tips: [
    'Rule of thumb: exit cap ±100 bps moves IRR 200–300+ bps on a 5-year levered hold.',
    'On longer holds (7–10 yr), rent growth becomes relatively more important as terminal NOI grows larger.',
    "Present sensitivities as a ranked list by impact magnitude — it communicates what the deal actually depends on.",
  ],
};
