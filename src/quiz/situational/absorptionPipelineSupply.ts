import type { SituationalCase } from '../../types/situational';

export const absorptionPipelineSupply: SituationalCase = {
  id: 'absorption-pipeline-supply',
  title: 'Will the pipeline push vacancy back to normal?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'A submarket has 6,000 multifamily units and is 92% occupied. 900 more units are under construction and scheduled to deliver over the next year. Net absorption has averaged 40 units per month. Your team treats 5% vacancy as frictional (the level at which the market is considered balanced).',
  data: [
    { label: 'Inventory', value: '6,000 units' },
    { label: 'Occupancy', value: '92% (480 vacant)' },
    { label: 'Pipeline', value: '+900 units' },
    { label: 'Net absorption', value: '40 units/month' },
    { label: 'Frictional vacancy', value: '5%' },
  ],
  question: 'Roughly how long until the submarket is back to balanced, assuming absorption holds at 40 units/month?',
  options: [
    {
      label: 'About 26 months — vacancy plus pipeline, less the frictional vacancy the larger base will always carry.',
      isBest: true,
      explanation:
        'New base 6,900 units; frictional vacancy at 5% = 345. Vacant after deliveries = 480 + 900 = 1,380. Excess vacancy = 1,380 − 345 = 1,035 ÷ 40/mo ≈ 26 months.',
    },
    {
      label: 'About 12 months — 480 vacant units ÷ 40 per month.',
      isBest: false,
      explanation:
        'Ignores the 900 delivering units. Pipeline adds to vacant stock on day one of lease-up, so the existing-vacancy math understates the wait by more than a year.',
    },
    {
      label: 'About 35 months — 1,380 vacant units ÷ 40 per month.',
      isBest: false,
      explanation:
        'Closer, but it tries to absorb every vacant unit. No market runs at 0% vacancy; the target is the frictional level, which on a 6,900-unit base is about 345 units.',
    },
    {
      label: 'The pipeline can be ignored because some projects will be delayed or cancelled.',
      isBest: false,
      explanation:
        'Some slippage is real, but under-construction projects with funded loans mostly deliver. Haircut the pipeline in a sensitivity; do not zero it out in the base case.',
    },
  ],
  takeaway:
    'Months of supply = (existing vacancy + pipeline − frictional vacancy on the new base) ÷ monthly absorption. Deliveries lengthen the recovery, and the target is balance, not 100% occupancy.',
  tips: [
    'Always grow the inventory base for the pipeline before applying a target occupancy.',
    'Frictional vacancy is a % of the new, larger base.',
    'Stress the answer: if absorption slows 25%, the timeline stretches by a third.',
  ],
};
