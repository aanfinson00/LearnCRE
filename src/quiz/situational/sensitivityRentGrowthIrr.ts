import type { SituationalCase } from '../../types/situational';

export const sensitivityRentGrowthIrr: SituationalCase = {
  id: 'sensitivity-rent-growth-irr',
  title: 'How sensitive is your IRR to the rent growth assumption?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'Your base-case model underwrites a 200-unit multifamily acquisition at a 7-year hold, 5.25% going-in cap, and projects 3.5%/yr rent growth — producing a 14.2% levered IRR. A senior reviewer challenges the 3.5% growth assumption. Historical rent growth in the submarket has been 2.8%/yr over the trailing 10 years, with high volatility. She asks you to run a sensitivity showing IRR at 2.0%, 2.5%, 3.0%, and 3.5% rent growth assumptions.',
  data: [
    { label: 'Units', value: '200' },
    { label: 'Hold period', value: '7 years' },
    { label: 'Going-in cap', value: '5.25%' },
    { label: 'Base-case rent growth', value: '3.5%/yr' },
    { label: 'Base-case levered IRR', value: '14.2%' },
    { label: 'Trailing submarket growth', value: '2.8%/yr (10-yr avg)' },
    { label: 'Hurdle', value: '12% levered IRR' },
  ],
  question:
    'How do you frame and present the rent growth sensitivity, and what conclusion do you draw?',
  options: [
    {
      label:
        'Run the 4-scenario table. At 3.5% the deal clears the hurdle (14.2%); every step down cuts IRR by roughly 80-100 bps per 50 bps of rent growth reduction. At 2.0%, the deal likely falls below 12%. The 2.8% trailing average falls in the middle of the table — if the hurdle is only cleared at above-historical growth rates, the deal\'s risk profile is front-loaded on an aggressive assumption that requires a demand catalyst to justify.',
      isBest: true,
      explanation:
        'The sensitivity table mechanics: each 50 bps reduction in annual rent growth reduces compounded NOI at year 7 by roughly 3-4%, which also reduces the exit value (via NOI × terminal cap). Over a 7-year hold, the combined impact on IRR is typically 80-100 bps per 50 bps of rent growth haircut, depending on leverage and hold-period length. If the 12% hurdle is breached at the trailing-average growth rate (2.8%), the deal is underwritten above its historical baseline. This is a red flag the IC needs to see — not hidden by only presenting the base case. Framing: "The deal clears at 3.5% growth but is at-hurdle or below at historical growth rates. The investment thesis depends on above-average rent growth."',
    },
    {
      label:
        'The base-case growth is 25% above the trailing average — revise to 2.8% before presenting.',
      isBest: false,
      explanation:
        'Unilaterally changing the base case before presenting may be appropriate if you have strong evidence that 3.5% is wrong, but the question asks how to frame and present the sensitivity. Presenting the sensitivity table transparently — showing that 3.5% is above-historical and showing the IRR at different growth rates — is the right move. Let the IC see the spectrum and decide if the above-historical assumption is justified by the investment thesis.',
    },
    {
      label:
        'Don\'t show the sensitivity — it will spook the IC into focusing on downside rather than the opportunity.',
      isBest: false,
      explanation:
        'Withholding material sensitivity analysis from an IC is a compliance and credibility failure. IC members are sophisticated investors who expect to see downside stress testing. Presenting only the base case is worse than presenting an unfavorable sensitivity — it signals that the analyst hasn\'t stress-tested the deal or is hiding a weakness.',
    },
    {
      label:
        'Run only the 3.5% and 2.0% scenarios — two bookends are enough for IC.',
      isBest: false,
      explanation:
        'Two scenarios (best and worst) don\'t show the shape of the risk curve. A 4-point table (2.0%, 2.5%, 3.0%, 3.5%) gives the IC a clearer picture of where the deal transitions from acceptable to below-hurdle. The reviewer specifically asked for 4 scenarios — skipping intermediate points would be viewed as a shortcut.',
    },
  ],
  takeaway:
    'Rent growth sensitivity is one of the highest-leverage inputs in a multifamily model — it compounds over the hold period and also drives the exit value through NOI. When the base-case assumption exceeds the trailing historical average, the sensitivity table must show what IRR looks like at the historical pace. If the deal only clears the hurdle above historical growth, the IC must understand that the thesis depends on an explicit demand catalyst — not just a model input.',
  tips: [
    'Rule of thumb: each 50 bps of rent growth haircut ≈ 80-100 bps of IRR reduction on a 7-yr multifamily hold.',
    'The trailing average is the "what history says" — if you underwrite above it, explain the catalyst.',
    'Sensitivity tables should bracket the historical average, not just model from base to worse.',
    'IRR sensitivity to rent growth is amplified by leverage — the same rent haircut hurts more at 70% LTV than 50%.',
  ],
};
