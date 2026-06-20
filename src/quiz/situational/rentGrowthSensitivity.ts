import type { SituationalCase } from '../../types/situational';

export const rentGrowthSensitivity: SituationalCase = {
  id: 'rent-growth-sensitivity',
  title: 'Which lever moves IRR more — rent growth or exit cap?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'mixed',
  scenario:
    'You are reviewing a 5-year multifamily model underwriting a 13% levered IRR. The two most debated assumptions are: (1) rent growth of 3%/yr, which a senior reviewer thinks is optimistic in the current environment and should be 1.5%; and (2) exit cap rate of 5.5%, which another reviewer thinks should be 5.75%. You need to identify which sensitivity has the larger IRR impact and why.',
  data: [
    { label: 'Base-case levered IRR', value: '13%' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Rent growth (base)', value: '3.0%/yr' },
    { label: 'Rent growth (stressed)', value: '1.5%/yr' },
    { label: 'Exit cap (base)', value: '5.5%' },
    { label: 'Exit cap (stressed)', value: '5.75%' },
    { label: 'Going-in cap', value: '4.75%' },
  ],
  question: 'Which sensitivity produces the larger IRR move, and how do you frame the risk?',
  options: [
    {
      label:
        'The exit cap sensitivity almost always dominates at a 5-year hold. A 25 bps wider cap on a 5-yr NOI stream compresses sale proceeds by ~3–4% of total value, while cutting rent growth from 3% to 1.5% reduces Year 5 NOI by ~7% — roughly equivalent effects. Run both and present the combined downside scenario.',
      isBest: true,
      explanation:
        'At a 5-year hold, exit proceeds dominate the IRR equation (typically 60–70% of total returns come from the reversion). Exit cap sensitivity is magnified because it applies to the total asset value, not just one year\'s NOI. A 25 bps cap expansion on a $50M exit value reduces proceeds by ~$2.3M. Cutting rent growth from 3% to 1.5% reduces Year 5 NOI by ~7% — but that also flows through the exit cap, compounding the NOI sensitivity into the exit price. The combined downside (lower NOI + wider cap) is the stress that matters most. As a standalone test: exit cap moves IRR by ~100–150 bps; rent growth typically moves IRR by ~75–100 bps. Present both, but stress them together in a downside case.',
    },
    {
      label:
        'Rent growth sensitivity matters more because it compounds over all 5 years, not just the exit.',
      isBest: false,
      explanation:
        'Partially right — rent growth does compound. But at a 5-year hold, interim cash flows are typically 30–40% of total return; the reversion is 60–70%. Exit cap sensitivity applies to the full asset value at exit, while rent growth applies to a smaller NOI stream. For short holds (<7 yrs), exit cap is typically the dominant sensitivity. Rent growth dominates on longer holds (10+ yrs).',
    },
    {
      label:
        'Both are equally important — run a grid and present all four combinations.',
      isBest: false,
      explanation:
        'A two-variable sensitivity grid is good practice, but "equally important" is imprecise when the question is which drives IRR more. Presenting a grid without a hierarchy leaves the IC without a clear risk narrative. Identify the dominant driver first, then show the grid.',
    },
    {
      label:
        'Neither matters independently — only the going-in cap and LTV drive the IRR.',
      isBest: false,
      explanation:
        'Going-in cap and LTV set the starting conditions but they are not the only drivers of IRR. Rent growth and exit cap govern how the investment performs over the hold — they are direct IRR inputs, not secondary factors.',
    },
  ],
  takeaway:
    'On a 5-year hold, exit cap rate sensitivity typically dominates IRR because reversion proceeds represent 60–70% of total returns. Rent growth compounds into exit NOI (and therefore exit price), so the two variables interact — a combined downside case (lower NOI AND wider cap) is the most important stress to run. Always present a two-variable grid for IC.',
  tips: [
    'For holds <7 yrs: exit cap > rent growth as IRR driver. For holds >10 yrs: rent growth dominates.',
    'A 25 bps exit cap move on a stabilized deal typically swings IRR by 100–150 bps.',
    'Always stress exit cap and rent growth together — they compound through the exit price.',
  ],
};
