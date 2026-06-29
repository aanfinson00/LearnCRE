import type { SituationalCase } from '../../types/situational';

export const debtServiceBreakevenOccupancy: SituationalCase = {
  id: 'debt-service-breakeven-occupancy',
  title: 'At what occupancy does the building stop covering debt service?',
  category: 'sensitivity',
  difficulty: 'beginner',
  roles: ['acquisitions', 'debtUnderwriting'],
  assetClass: 'multifamily',
  scenario:
    'You\'re analyzing a 100-unit multifamily asset. At stabilized 95% occupancy, NOI is $1,200,000. Annual debt service is $800,000. The property manager estimates that each 5-percentage-point drop in occupancy reduces annual NOI by approximately $63,000 (lost rent net of variable expense savings).',
  data: [
    { label: 'Total units', value: '100 units' },
    { label: 'Stabilized occupancy', value: '95%' },
    { label: 'Stabilized NOI', value: '$1,200,000' },
    { label: 'Annual debt service', value: '$800,000' },
    { label: 'NOI impact per 5% occupancy drop', value: '−$63,000' },
  ],
  question: 'At approximately what occupancy level does this asset fail to cover debt service (DSCR < 1.0x)?',
  options: [
    {
      label: 'Approximately 63–68% occupancy. The NOI cushion above debt service is $400K. Each 5% occupancy drop costs $63K, so exhausting $400K requires about 6.3 intervals × 5% = ~32 points of occupancy loss from 95%, landing near 63%. Accounting for fixed costs that don\'t flex proportionally, the realistic breakeven is closer to 68%.',
      isBest: true,
      explanation:
        'NOI buffer: $1,200K − $800K = $400K. Intervals needed to exhaust buffer: $400K ÷ $63K = 6.35 intervals of 5% each. Total occupancy loss: 6.35 × 5% ≈ 31.7 points. Breakeven: 95% − 31.7% ≈ 63%. Because some costs are fixed and don\'t flex down linearly with occupancy (property management fees, insurance, debt service itself), the practical breakeven is modestly higher — approximately 68%. This is meaningful cushion from the 95% stabilized level; the asset can lose roughly a third of its occupancy before debt service is impaired.',
    },
    {
      label: 'About 85% occupancy — a 10% vacancy increase is the standard stress test.',
      isBest: false,
      explanation:
        'Not derived from the cash flow math — it\'s a generic assumption. At 85% (10 points below 95%), NOI falls by 2 intervals × $63K = $126K. NOI at 85% ≈ $1,074K, still above $800K debt service by $274K. DSCR ≈ 1.34×. The asset has far more cushion than the 85% figure implies; applying this as a breakeven would misstate the actual risk level.',
    },
    {
      label: 'About 88% — because that\'s approximately 2/3 of the NOI margin below stabilized.',
      isBest: false,
      explanation:
        'Arbitrary reasoning. "2/3 of the NOI margin" doesn\'t correspond to the breakeven calculation. The breakeven is the occupancy at which NOI equals debt service — you must track the actual NOI reduction per occupancy interval, not apply an arbitrary fraction to the margin.',
    },
    {
      label: 'The DSCR never drops below 1.0x — a 100-unit building has sufficient scale to absorb vacancy.',
      isBest: false,
      explanation:
        'Scale doesn\'t create resilience by itself. A 100-unit building can absolutely hit 68% occupancy — that\'s 32 vacant units, which happens in distressed markets, during forced lease-up, or after a major demand shock. The DSCR breakeven is determined by the NOI-to-debt-service math, not by unit count.',
    },
  ],
  takeaway:
    'Break-even occupancy (DSCR = 1.0x) is a critical underwriting metric. Formula: find the occupancy at which NOI equals debt service. The larger the NOI buffer and the smaller the per-interval NOI impact, the more occupancy cushion the asset has. Lenders set 1.25× DSCR minimums partly to ensure 20%+ headroom above the true break-even.',
  tips: [
    'Quick formula: occupancy points of cushion = NOI buffer ÷ (NOI per occupancy point). Occupancy breakeven = stabilized occupancy − that result.',
    'Standard lender stress: model 90% occupancy and confirm DSCR ≥ 1.20×.',
    'Variable expenses flex down with occupancy (utilities, maintenance), giving slightly more cushion than a pure linear model suggests.',
  ],
};
