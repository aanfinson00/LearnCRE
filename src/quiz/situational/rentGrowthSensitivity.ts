import type { SituationalCase } from '../../types/situational';

export const rentGrowthSensitivity: SituationalCase = {
  id: 'rent-growth-sensitivity',
  title: 'The deal only works with 4% rent growth — how do you frame the risk?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'A 5-year multifamily acquisition models a 16% IRR at 4% annual rent growth. Your IC asks for a sensitivity table. At 2% rent growth the IRR drops to 11%; at 0% (flat rents) it falls to 7%. The equity hurdle rate is 12%. The risk-free rate is 5.2%. You have 2 weeks to decide under LOI.',
  data: [
    { label: '4% rent growth → IRR', value: '16%' },
    { label: '2% rent growth → IRR', value: '11%' },
    { label: '0% rent growth → IRR', value: '7%' },
    { label: 'Equity hurdle rate', value: '12%' },
    { label: 'Risk-free rate', value: '5.2%' },
  ],
  question: 'How do you frame this sensitivity for the IC?',
  options: [
    {
      label: 'The 4% rent-growth assumption is load-bearing: the deal fails the 12% hurdle at 2% growth. Before presenting, verify whether 4% is supported by submarket supply/demand, trailing rent comps, and lease-expiry stack. If yes, present with the risk disclosed. If not, renegotiate the price until the deal clears at 2%.',
      isBest: true,
      explanation:
        'Sensitivity tables reveal where the hurdle breaks, not just upside. At 2% rent growth — a plausible scenario in almost any market — the 11% IRR misses the 12% hurdle. That means the deal has zero margin of safety on rent performance. The IC needs to see: (1) what justifies 4% (supply pipeline, employment, lease comp trends), and (2) what bid price clears 12% at 2% growth. Presenting a 16% headline without pre-empting the breakeven question will invite exactly that challenge unprepared.',
    },
    {
      label: 'The 16% IRR is well above the 12% hurdle — present the base case and show 2% as a downside.',
      isBest: false,
      explanation:
        'The 16% headline only holds at 4% rent growth. If the hurdle is 12% and the deal fails it at 2% growth, the deal has no cushion. Presenting the 16% figure without foregrounding the break point understates the risk — the IC will ask exactly this question.',
    },
    {
      label: 'Drop the deal — a 7% IRR at flat rents means you can\'t survive a downturn.',
      isBest: false,
      explanation:
        'The flat-rent scenario (7%) is an edge case, not a base or downside case in most markets. The decision variable is whether 4% rent growth is credibly supported. If it is, a 7% edge-case doesn\'t kill the deal — you present the range and defend the base. If 4% isn\'t supportable, you re-price before dropping it.',
    },
    {
      label: 'Widen the exit cap by 25 bps in the model to create conservatism on the valuation side.',
      isBest: false,
      explanation:
        'Rent-growth risk and exit-cap risk are separate variables. Adding cap expansion to offset rent uncertainty creates compounding conservatism without analytically addressing either factor. The rent-growth sensitivity should be tested directly — not offset with a different assumption.',
    },
  ],
  takeaway:
    'A sensitivity table is useful only if you identify which breakpoint is load-bearing and verify the base-case assumption independently. When a 2-percentage-point miss on rent growth causes the IRR to fall below the hurdle, the 4% assumption carries the deal — it needs market support, not just a model input. The IC question is always: "What does rent growth need to be, and what supports that number?" Pre-empt it.',
  tips: [
    'Identify the "hurdle-break rent growth" — the rate below which IRR falls under the required return.',
    'A deal with hurdle-break at 3% is safer than one with hurdle-break at 2% if base case is 4%.',
    'Support the load-bearing assumption: submarket supply pipeline, employment trend, trailing rent-comp growth.',
  ],
};
