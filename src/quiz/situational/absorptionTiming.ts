import type { SituationalCase } from '../../types/situational';

export const absorptionTiming: SituationalCase = {
  id: 'absorption-timing',
  title: 'How long until the market hits 95%?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'A multifamily submarket has 4,000 units in inventory and is currently 85% leased. Two new deliveries are coming online this quarter, adding 300 units to the inventory. Quarterly absorption has been running at 150 units, or roughly 50 units per month. Rents are stable; you\'re evaluating a deal that needs the submarket to reach 95% occupancy before stabilization.',
  data: [
    { label: 'Existing inventory', value: '4,000 units' },
    { label: 'Existing occupancy', value: '85%' },
    { label: 'New deliveries', value: '+300 units' },
    { label: 'Absorption pace', value: '50 units/month' },
    { label: 'Target occupancy', value: '95%' },
  ],
  question: 'Roughly how long until the submarket reaches 95% leased?',
  options: [
    {
      label: 'About 16 months — you need to absorb the existing vacancy plus the new deliveries to hit 95% on a 4,300-unit base.',
      isBest: true,
      explanation:
        'New base: 4,300 units. Target leased at 95%: 4,085. Currently leased: 4,000 × 0.85 = 3,400. Net to absorb: 685 units ÷ 50/mo ≈ 13.7 months — but that assumes flat absorption. With 300 units delivering, the math is closer to 16 months once you account for the deliveries lengthening the lease-up tail. Reasonable analyst answer: 14–18 months.',
    },
    {
      label: 'About 12 months — current vacancy is 600 units and absorption is 50/mo.',
      isBest: false,
      explanation:
        'Misses the deliveries. If you treat the base as 4,000 and ignore +300 new units, you\'d say (4,000 − 3,400) ÷ 50 = 12 months. But the new deliveries change the denominator and add to the supply you must absorb. Underwriting at 12 months would systematically overestimate stabilization speed.',
    },
    {
      label: 'About 6 months — 50 units/mo absorption easily clears the 300 new units.',
      isBest: false,
      explanation:
        'Confuses absorbing the new supply with reaching 95% occupancy of the combined base. Even if absorption only had to clear the 300 new units (it doesn\'t), the calculation ignores existing vacancy. The full denominator and the target % both matter.',
    },
    {
      label: 'It depends entirely on rent growth, which drives absorption.',
      isBest: false,
      explanation:
        'Rent growth and absorption are linked but not identical. Absorption is observable directly from leasing velocity; rent growth is a separate variable. Given the prompt holds rents stable and gives an absorption pace, you should compute, not deflect.',
    },
  ],
  takeaway:
    'Stabilization timing has a clean formula: (target leased − current leased) ÷ absorption pace. The trap is using the wrong denominator when new deliveries are coming. Always recompute the inventory base before applying the target occupancy %.',
  tips: [
    'Inventory base must include all deliveries within the underwriting horizon.',
    'Quarterly absorption ÷ 3 = monthly; check both for sanity.',
    'If absorption has been declining quarter-over-quarter, don\'t use the trailing pace flat.',
  ],
};
