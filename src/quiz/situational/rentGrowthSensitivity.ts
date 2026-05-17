import type { SituationalCase } from '../../types/situational';

export const rentGrowthSensitivity: SituationalCase = {
  id: 'rent-growth-sensitivity',
  title: 'Which input breaks the deal first?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You are presenting a multifamily acquisition to your IC. The base case underwrites a 12% levered IRR at 3% annual rent growth, a 5.5% going-in cap, and a 6.5% exit cap over a 5-year hold. A senior partner asks you to run a sensitivity table. You have three inputs you can stress: (A) rent growth flat at 0%, (B) exit cap expands to 7.5% instead of 6.5%, or (C) occupancy drops 5% from underwritten levels throughout the hold.',
  data: [
    { label: 'Base IRR', value: '12% levered' },
    { label: 'Base rent growth', value: '3%/yr' },
    { label: 'Going-in cap', value: '5.5%' },
    { label: 'Base exit cap', value: '6.5%' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Scenario A', value: 'Rent growth 0% (flat for 5 years)' },
    { label: 'Scenario B', value: 'Exit cap expands to 7.5% (+100 bps vs base)' },
    { label: 'Scenario C', value: 'Occupancy 5% below underwritten throughout hold' },
  ],
  question: 'Which scenario most dramatically reduces the IRR, and why?',
  options: [
    {
      label: 'Scenario B (exit cap to 7.5%) hits IRR hardest. The exit cap drives terminal value, which on a 5-year levered deal represents the majority of total return. A 100 bps cap expansion typically reduces exit proceeds by 12–18%, compressing IRR by 300–500 bps.',
      isBest: true,
      explanation:
        'On a stabilized 5-year hold, the majority of return comes from the exit (sale proceeds + residual equity), not from annual cash flow. The exit cap has a multiplier effect: it compresses the terminal NOI multiple, reducing not just the sale price but also the equity returned after debt payoff. A 100 bps expansion (6.5% → 7.5%) on $10M of NOI reduces the asset value by ~$20M (from $154M to $133M). On levered equity, this translates to a proportionally larger hit to IRR. Rent growth at 0% reduces NOI by ~15% over 5 years but also compresses terminal value — however, the exit cap change is a direct price multiplier. Scenario C (−5% occupancy) reduces NOI by ~5% annually, which is meaningful but less severe than a 100 bps cap move.',
    },
    {
      label: 'Scenario A (rent growth flat) — five years of zero rent growth completely eliminates the NOI appreciation that drives the return.',
      isBest: false,
      explanation:
        'Zero rent growth meaningfully reduces NOI (and thus the exit value), but not as severely as a 100 bps cap expansion. At 0% rent growth, NOI 5 years from now equals NOI today. At 6.5% exit cap that still generates a reasonable terminal value. At 7.5% exit cap with even modest rent growth, the terminal value compression is larger because the cap move is applied to a larger NOI base.',
    },
    {
      label: 'Scenario C (−5% occupancy) — revenue falls every year and the compounding effect erodes both cash flow and the terminal value.',
      isBest: false,
      explanation:
        'A 5% occupancy reduction reduces effective gross income by roughly 5% throughout the hold, which is real but not catastrophic. On a deal underwriting to 93% occupancy, dropping to 88% reduces NOI by ~5–6% annually. The exit cap move in Scenario B reduces the terminal value multiplier by ~15% — a larger one-time impact that the compounding of Scenario C does not offset over 5 years.',
    },
    {
      label: 'All three are roughly equivalent — the deal is diversified across multiple risk factors.',
      isBest: false,
      explanation:
        'Sensitivity analysis exists precisely to show that risk factors are NOT equivalent. The exit cap is typically the highest-leverage input on short-to-medium holds because it applies a multiplier to the terminal NOI. Understanding which input has the most leverage tells you where to focus diligence, where to push for pricing discipline, and where to hedge.',
    },
  ],
  takeaway:
    'On a 5-year levered hold, the exit cap is almost always the highest-leverage variable because it is a direct price multiple applied to terminal NOI. Stress it first. Rent growth and occupancy matter for annual cash flow and the terminal NOI base, but the cap rate is the multiplier that amplifies all of them.',
  tips: [
    'Rule of thumb: 100 bps of cap expansion reduces asset value by roughly NOI ÷ (exit cap²) — a nonlinear penalty.',
    'Short holds (3–5 yrs): exit cap dominates. Long holds (10+ yrs): rent growth compounds and matters more.',
    'Always present a 2×2 sensitivity table: rent growth vs. exit cap. That grid captures the two highest-leverage inputs in one view.',
  ],
};
