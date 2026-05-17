import type { SituationalCase } from '../../types/situational';

export const vacancyAssumptionBreakEven: SituationalCase = {
  id: 'vacancy-assumption-break-even',
  title: 'What vacancy rate breaks your hurdle?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    'You are underwriting a suburban office acquisition at a 15% equity IRR hurdle. The base case assumes 10% vacancy throughout the hold. A senior reviewer asks: "At what vacancy rate does this deal fall below a 12% IRR?" You have a 5-year hold with $8M of stabilized NOI at 10% vacancy, $40M of equity invested, and a 6.5% exit cap on year-5 NOI.',
  data: [
    { label: 'Equity invested', value: '$40M' },
    { label: 'Hold period', value: '5 years' },
    { label: 'IRR hurdle (base)', value: '15%' },
    { label: 'IRR threshold (question)', value: '12%' },
    { label: 'Stabilized NOI at 10% vacancy', value: '$8M/yr' },
    { label: 'Assumed exit cap', value: '6.5%' },
    { label: 'Base vacancy assumption', value: '10%' },
  ],
  question: 'How do you approach finding the break-even vacancy assumption?',
  options: [
    {
      label: 'Build a one-variable data table: hold vacancy assumption constant across the hold, re-compute NOI at each vacancy level, re-run exit value at 6.5% cap, and find the vacancy % where IRR = 12%. A rough estimate: each 1% increase in vacancy reduces NOI by ~$890k and exit value by ~$13.7M — so roughly 3–4% of additional vacancy breaks the 12% threshold.',
      isBest: true,
      explanation:
        'The systematic approach: (1) At 10% vacancy, NOI = $8M → exit value = $8M / 0.065 = $123.1M. (2) At 11% vacancy, NOI ≈ $8M × (90%/89%) × 89% = ... — easier to parameterize as NOI × (1 − Δvac / (1 − base_vac)). (3) Solve for vacancy where IRR = 12% using a data table or Goal Seek. The rough math: each 1% of additional vacancy costs ~$890k NOI/yr and ~$13.7M of exit proceeds. On $40M equity, the break-even is approximately 13–14% vacancy (3–4% worse than base). More precise — use Goal Seek in Excel. The key discipline is recognizing this as a one-variable sensitivity question and building the table, not guessing.',
    },
    {
      label: 'Run the model at 20% vacancy — that is a realistic stress case for suburban office.',
      isBest: false,
      explanation:
        '20% is a scenario, not a break-even analysis. The question asks where the deal breaks the 12% threshold — a specific number that requires parameterizing vacancy and solving for the IRR crossover. "Run at 20%" does not answer the question and does not give you the margin of safety between the base case and the break-even.',
    },
    {
      label: 'It depends on rent growth, which changes NOI alongside occupancy.',
      isBest: false,
      explanation:
        'Rent growth is a separate variable. For a one-variable sensitivity — holding rent growth constant at the base assumption and varying only vacancy — you can isolate the vacancy effect cleanly. The questioner is asking for that isolated analysis. Introducing rent growth as a qualifier deflects from the discipline of the question.',
    },
    {
      label: 'The 12% IRR hurdle is arbitrary; focus on the 15% base case and defend it.',
      isBest: false,
      explanation:
        'The 12% threshold is the IC\'s downside test, not an arbitrary number. Break-even analysis tells you: how far wrong does this assumption have to be before the deal fails? That is exactly what senior investors want to know when they challenge inputs. "Defend the base" is not a sensitivity analysis; it is a failure to stress-test.',
    },
  ],
  takeaway:
    'Break-even analysis answers "how wrong can this assumption be?" — a more useful IC framing than "what is the base case?" For vacancy: parameterize it as the single variable, hold everything else constant, and find the IRR crossover. The gap between base case and break-even is your margin of safety on that assumption.',
  tips: [
    'Goal Seek in Excel (or a data table) is the right tool for break-even analysis — not mental math.',
    'Present break-even analysis alongside the base case: "At 10% vacancy we model 15% IRR; the deal breaks 12% at 14% vacancy, which is 4% worse than base."',
    'Break-even vacancy for an office deal is a key lender sensitivity — they want to know it for DSCR too, not just IRR.',
  ],
};
