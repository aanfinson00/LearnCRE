import type { SituationalCase } from '../../types/situational';

export const sensitivityExitCapIrr: SituationalCase = {
  id: 'sensitivity-exit-cap-irr',
  title: 'How much does a 50 bps cap move hurt the IRR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You are underwriting a 3-year value-add multifamily deal. Year-3 NOI is projected at $2.4M. The base case exits at a 5.5% cap rate, producing a $43.6M exit value. Total cost basis is $41M ($38M purchase plus $3M capex). Levered IRR in the base case is approximately 18%. You need to stress-test the exit cap assumption.',
  data: [
    { label: 'Total cost basis', value: '$41M ($38M + $3M capex)' },
    { label: 'Year-3 NOI', value: '$2.4M' },
    { label: 'Base exit cap', value: '5.5% → $43.6M exit value' },
    { label: 'Base levered IRR', value: '~18%' },
    { label: 'Hold period', value: '3 years' },
  ],
  question: 'What is the approximate IRR impact if the exit cap comes in 50 bps wider at 6.0%?',
  options: [
    {
      label: 'Exit value drops to $40.0M ($2.4M / 6.0%), a $3.6M shortfall versus base case. On a 3-year hold that delta compresses levered IRR by roughly 4–5 points, landing around 13–14%.',
      isBest: true,
      explanation:
        '$2.4M / 0.06 = $40.0M exit value. The $3.6M shortfall vs base ($43.6M) flows through to equity on a leveraged basis. On a 3-year hold, the equity check is roughly $10–11M (after senior debt on $41M basis). A $3.6M terminal value decline on $10M of equity is a ~35% reduction in terminal equity proceeds — which compresses IRR from ~18% to roughly 13–14% depending on the leverage structure and interim cash flows. This is why the exit cap is the single highest-leverage assumption in a short-hold value-add deal.',
    },
    {
      label: '50 bps on the exit cap barely moves the IRR — going-in yield and interim cash flow matter more over a 3-year hold.',
      isBest: false,
      explanation:
        'Incorrect. On a short hold, exit value dominates returns because interim cash flows are limited. A 50 bps cap widening on $2.4M NOI produces a $3.6M value decline, roughly 8% of total cost. Exit cap sensitivity is actually MORE pronounced on short holds than long ones, because fewer interim cash flow years dilute the terminal value impact.',
    },
    {
      label: 'The IRR stays around 18% — the NOI growth that justified paying a tighter going-in cap also offsets any cap expansion.',
      isBest: false,
      explanation:
        'Confuses going-in cap with exit cap. NOI growth improves the numerator (exit value = NOI / cap), but if the exit cap simultaneously widens, the denominator works against you. The base case already captured the NOI growth in the $43.6M exit value. A 50 bps wider exit cap reduces value by $3.6M regardless of how much NOI grew during the hold.',
    },
    {
      label: 'Extend the hold to 5 years — more time lets NOI growth offset the cap widening.',
      isBest: false,
      explanation:
        'Extending the hold does buy more NOI compounding, but it also delays your equity return and introduces additional uncertainty. At 6.0% exit cap, holding 2 more years requires NOI to grow enough to offset the $3.6M cap-expansion shortfall and compensate for the delayed return. This may or may not pencil — it is a separate underwriting exercise, not a blanket fix. The question asks specifically about the 3-year sensitivity.',
    },
  ],
  takeaway:
    'On a 3-year value-add hold, the exit cap is the highest-leverage single assumption in the model. A 50 bps cap widening typically compresses levered IRR by 4–5 points — often the difference between clearing the fund hurdle and missing it. Always stress-test exit cap at +50 and +100 bps before presenting a deal to IC.',
  tips: [
    'Exit value sensitivity: every 50 bps of cap widening on $2.4M NOI loses ~$3.2–4.0M of exit value depending on the base cap level.',
    'Short holds (3 years or less) are more exit-cap-sensitive than long holds because fewer interim cash flow years dilute the terminal value swing.',
    'Levered IRR sensitivity to exit cap is amplified by leverage — equity absorbs the full value swing on a fixed-debt-service basis.',
  ],
};
