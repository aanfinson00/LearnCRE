import type { SituationalCase } from '../../types/situational';

export const rentGrowthFlatSensitivity: SituationalCase = {
  id: 'rent-growth-flat-sensitivity',
  title: 'Two flat years — how much does your IRR move?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'Your base case multifamily model assumes 3% annual rent growth for all 5 years of the hold, producing a 14% levered IRR on a $50M acquisition. Actual market conditions in the first two years are tracking flat — 0% rent growth — due to new deliveries in the submarket. Years 3–5 are expected to revert to the 3% base case.',
  data: [
    { label: 'Acquisition price', value: '$50M' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Base case rent growth', value: '3%/yr, all 5 years' },
    { label: 'Base case levered IRR', value: '14%' },
    { label: 'Stress scenario', value: 'Y1–Y2: 0% rent growth; Y3–Y5: 3%/yr' },
  ],
  question:
    'Without running a model, how do you estimate the IRR impact of two flat rent years followed by a reversion to 3%?',
  options: [
    {
      label:
        'Roughly 100–150 bps of IRR erosion: two missed years of 3% compounding creates a ~6% shortfall in the rent base that persists through exit, reducing NOI and reversion value.',
      isBest: true,
      explanation:
        'Two years of flat rent vs. 3%/yr means the Year 3 rent base is approximately 6% lower than modeled (1.03² = 1.0609 — you missed that compound). That shortfall flows through all subsequent years and sets a lower exit NOI. At a constant exit cap, a 6% lower exit NOI reduces equity value proportionally. On a $50M deal with moderate leverage, that translates to roughly 100–150 bps of IRR erosion — enough to move a 14% deal to 12.5–13%. This is the standard mental model for "what does a rent growth miss cost?"',
    },
    {
      label:
        'Two flat years are immaterial — rent growth doesn\'t compound meaningfully until Year 3.',
      isBest: false,
      explanation:
        'Early-year misses are the most damaging because they reset the base from which all subsequent compounding occurs. A lower Year 3 rent base compounds forward through Years 4 and 5 and directly sets the exit NOI. Missing early years hurts more than missing late years.',
    },
    {
      label:
        'The IRR drops by exactly 6% — two years of 3% rent growth that didn\'t happen.',
      isBest: false,
      explanation:
        'Confuses the cumulative rent shortfall percentage with the IRR swing. A 6% lower rent base does not produce a 6% lower IRR — IRR is a time-weighted, cash-flow-weighted metric, and the rent miss only affects the portion of deal economics driven by rent growth. The IRR impact is typically 100–200 bps, not 600 bps.',
    },
    {
      label:
        'You cannot estimate this without running the model — too many variables interact.',
      isBest: false,
      explanation:
        'Senior analysts are expected to estimate the directional magnitude of sensitivities without a model. Saying "I need to run it" in an IC or deal review is unhelpful. The correct posture: "Two flat rent years probably move the IRR 100–150 bps negative from base — I\'ll confirm the precise figure in the model."',
    },
  ],
  takeaway:
    'Rent growth sensitivity mental model: N flat years = (1+g)^N − 1 cumulative shortfall in the rent base, flowing through to exit NOI. On a leveraged deal, every 1% of NOI miss at exit ≈ 1–2% of equity value lost. Two flat years at 3% ≈ 100–150 bps of IRR erosion.',
  tips: [
    'Two flat years at 3% growth = ~6% cumulative shortfall in rents at Year 3 and beyond.',
    'Early-year misses compound longer and hurt more than late-year misses on the same hold.',
    'Rule of thumb: 1% lower exit NOI ≈ 1–2% equity value loss at the same cap rate.',
  ],
};
