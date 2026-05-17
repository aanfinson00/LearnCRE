import type { SituationalCase } from '../../types/situational';

export const multifamilyPipelineAbsorption: SituationalCase = {
  id: 'multifamily-pipeline-absorption',
  title: 'How many units does the market actually need to absorb?',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'You are evaluating a new 300-unit development in a suburban multifamily submarket. The submarket has 8,000 total units at 92% occupancy. The city permitting pipeline shows 600 more units will deliver from other developers over the next 12 months. You plan to start construction now and deliver in 18 months, targeting 95% occupancy within 12 months of delivery. Trailing net absorption is running at 80 units per month.',
  data: [
    { label: 'Submarket units', value: '8,000' },
    { label: 'Current occupancy', value: '92%' },
    { label: 'Competing pipeline (other developers)', value: '600 units, next 12 mos' },
    { label: 'Your development', value: '300 units, delivers in 18 mos' },
    { label: 'Net absorption', value: '80 units/month' },
    { label: 'Stabilization target', value: '95% occupancy within 12 mos of delivery' },
  ],
  question:
    'How many net units must the submarket absorb for you to hit 95% occupancy across the new inventory base?',
  options: [
    {
      label: 'About 1,095 units. New base: 8,900 units (8,000 + 600 + 300). Target occupied at 95%: 8,455. Currently occupied: 8,000 × 0.92 = 7,360. Net to absorb: 8,455 − 7,360 = 1,095 units across all buildings. At 80/month, that takes ~14 months — tight against a 12-month stabilization window.',
      isBest: true,
      explanation:
        'The correct formula: (total new inventory × target occ%) − (current inventory × current occ%) = net units to absorb. All three groups — existing vacancy, competing pipeline, and your units — draw from the same renter pool. At 80 units/month, 1,095 units take ~14 months, which is slightly outside your 12-month window. Either underwrite a 15-month stabilization (with buffer) or model an opening concession to accelerate lease-up.',
    },
    {
      label: '300 units — you only need to lease your building, not the whole submarket.',
      isBest: false,
      explanation:
        'Treats your building as if it operates in isolation. When 600 competing units also need tenants, they draw from the same renter pool. If those units struggle to lease, it puts pricing pressure on your building regardless of your individual quality. Submarket absorption math measures how much demand is available for all buildings, including yours.',
    },
    {
      label: 'Zero — at 92% occupancy the market is healthy and your 300 units will fill naturally.',
      isBest: false,
      explanation:
        '92% is the starting occupancy for the existing 8,000 units. It says nothing about how quickly 900 new units (600 + 300) get absorbed into a market running at 80 units/month. The submarket health is the baseline; the pipeline timing and your lease-up window are the constraints.',
    },
    {
      label: '900 units — just the 600 pipeline units plus your 300.',
      isBest: false,
      explanation:
        'Ignores existing vacancy. The submarket at 92% already has 640 vacant units (8,000 × 0.08) competing for tenants alongside your 900 new units. All of them — existing vacancy and new supply — are competing for the same renters. The correct base is the gap between current leased units and the target leased units on the enlarged inventory.',
    },
  ],
  takeaway:
    'Net-to-absorb = (total units × target occ%) − (existing units × current occ%). Always set the inventory base to include all competing deliveries expected before your stabilization date. This number tells you how much demand the market must generate — compare it to the absorption pace to get your timeline.',
  tips: [
    'Formula: net-to-absorb = (enlarged base × target %) − (existing base × current %).',
    'Check pipeline timing: units delivering 6 months before yours compete directly; units delivering after are less of a factor.',
    'Sanity check: required absorption rate vs. trailing pace. If required > trailing, underwrite a concession to accelerate.',
  ],
};
