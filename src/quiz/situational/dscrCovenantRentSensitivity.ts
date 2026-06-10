import type { SituationalCase } from '../../types/situational';

export const dscrCovenantRentSensitivity: SituationalCase = {
  id: 'dscr-covenant-rent-sensitivity',
  title: 'How much can rents fall before the DSCR covenant is breached?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    "You underwrite a 200-unit multifamily at $1,600/month average rent, 95% occupancy. Stabilized NOI is $1.68M. Annual debt service on a $14M loan at 6.5% (30-yr amortization) is $1.06M. DSCR is 1.58x on stabilized NOI. The loan covenants include a 1.20x DSCR test measured on trailing-12-month cash flow. You want to know how much rent can decline before you trip the covenant.",
  data: [
    { label: 'Units', value: '200' },
    { label: 'Average rent', value: '$1,600/month' },
    { label: 'Occupancy', value: '95%' },
    { label: 'Stabilized NOI', value: '$1.68M' },
    { label: 'Annual debt service', value: '$1.06M' },
    { label: 'Current DSCR', value: '1.58x' },
    { label: 'DSCR covenant', value: '1.20x' },
  ],
  question:
    'Approximately how much can rents fall (holding occupancy and OpEx constant) before breaching the 1.20x DSCR covenant?',
  options: [
    {
      label:
        'About $200/month per unit (~12.5%) — at that point NOI falls to ~$1.27M and DSCR drops to 1.20x. Below this rent level the covenant is breached.',
      isBest: true,
      explanation:
        'Minimum NOI to clear covenant = DSCR trigger × debt service = 1.20 × $1.06M = $1.272M. Current NOI = $1.68M. Maximum NOI cushion = $1.68M − $1.272M = $408k. EGI = NOI + OpEx. Assuming NOI margin is stable (OpEx is a fixed cost), the $408k drop in NOI comes directly from a rent decline. Current EGI ≈ 200 units × $1,600/mo × 95% × 12 = $3.648M. A $408k EGI decline = $408k ÷ $3.648M ≈ 11.2% rent drop. At $1,600 × (1 − 11.2%) ≈ $1,421/mo. Rounding to $200/mo ($1,400/mo) is the ballpark. The exact answer depends on the assumed OpEx ratio, but ~$200/month or ~12–13% is the right magnitude.',
    },
    {
      label:
        'About $100/month per unit — DSCR is very tight and any rent decline would breach the covenant.',
      isBest: false,
      explanation:
        '1.58x DSCR is a 32% cushion above the 1.20x trigger. $100/month represents about a 6% rent decline, which reduces NOI by roughly $200k — still leaves DSCR at ~1.39x, well above 1.20x. The cushion is larger than this answer implies.',
    },
    {
      label:
        'Any rent decline below 95% occupancy would breach the covenant before rents even fall.',
      isBest: false,
      explanation:
        "Confuses the occupancy sensitivity with the rent sensitivity. The question holds occupancy constant at 95% and asks only about rent movement. Occupancy and rent are separate drivers of DSCR; you need to sensitize them independently to isolate each impact.",
    },
    {
      label:
        'You cannot calculate it without knowing the exact OpEx breakdown.',
      isBest: false,
      explanation:
        'You can get to the right ballpark without the full OpEx breakdown. The key insight is: minimum NOI = 1.20 × DS = $1.272M. Current NOI = $1.68M. Cushion = $408k. If NOI margin is roughly stable (OpEx is variable with revenue), translate the $408k NOI cushion to EGI, then to rent per unit. Perfect precision requires the OpEx schedule, but a directional answer is entirely achievable.',
    },
  ],
  takeaway:
    'DSCR rent sensitivity = (current NOI − minimum NOI) translated into rent per unit. Minimum NOI = covenant trigger × annual debt service. This is a core asset management calculation: knowing your rent cushion before a cash trap or default trigger fires tells you how much market softness you can absorb before needing to act.',
  tips: [
    'DSCR floor NOI = trigger × DS. Everything above that is your cushion.',
    'Run rent AND occupancy sensitivity separately, then together — combined stress is what kills deals.',
    'Cash-trap triggers are often set 10–20 bps above the default trigger; know both.',
  ],
};
