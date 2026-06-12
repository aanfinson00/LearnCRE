import type { SituationalCase } from '../../types/situational';

export const absorptionIndustrialOversupply: SituationalCase = {
  id: 'absorption-industrial-oversupply',
  title: 'Industrial submarket: how bad is the spec pipeline?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'An industrial submarket has 45 million SF of existing inventory at 5.5% vacancy. The development pipeline over the next 18 months totals 6 million SF of spec (unleased) buildings. Trailing 12-month net absorption was 2.5 million SF. Concession packages on new leases have been widening — free rent has grown from 1 month to 3 months over the past year, and asking rents have softened 8% from peak.',
  data: [
    { label: 'Existing inventory', value: '45,000,000 SF' },
    { label: 'Current vacancy', value: '5.5%' },
    { label: 'Pipeline (18-mo spec)', value: '6,000,000 SF' },
    { label: 'Trailing 12-mo net absorption', value: '2,500,000 SF' },
    { label: 'Free rent on new deals', value: '1 month → 3 months (current)' },
    { label: 'Asking rent vs peak', value: '−8%' },
  ],
  question:
    'What does the data say about where this market is headed over the next 18 months?',
  options: [
    {
      label:
        'Supply is outrunning demand: 6M SF spec pipeline at 2.5M SF/yr absorption means 2+ years of supply at current demand. Vacancy will likely rise to 10–12% before the market rebalances. Widening concessions and softening rents confirm the turn is already in motion.',
      isBest: true,
      explanation:
        'At 2.5M SF/yr absorption, 6M SF of spec supply takes 2.4 years to absorb at current demand — and that assumes demand holds flat, which the concession widening suggests it won\'t. New base after pipeline: 45M + 6M = 51M SF. If the 6M SF delivers unleased, vacancy spikes from 5.5% toward 18% before absorption clears it. The concession signal (free rent tripling) and rent softening are leading indicators — they arrive before vacancy statistics catch up because leasing velocity slows before signed leases burn off. This market has already turned.',
    },
    {
      label:
        'The submarket is healthy — 5.5% vacancy is below a 7% equilibrium, so there\'s room for supply before it tips.',
      isBest: false,
      explanation:
        'Current vacancy isn\'t the right frame — forward vacancy is. The 6M SF pipeline will deliver regardless of today\'s 5.5%. The question is whether the market will still be healthy in 18 months. The concession and rent data say the softening has already started; equilibrium vacancy is a backward-looking benchmark, not a forward-looking protection.',
    },
    {
      label:
        '2.5M SF/yr absorption means the 6M SF pipeline clears in under 3 years — near-term pain, medium-term recovery.',
      isBest: false,
      explanation:
        'This assumes absorption stays constant at 2.5M SF/yr throughout. In practice, rising vacancy slows absorption because tenants have more choices and less urgency. Concession widening is an early signal that absorption velocity is already decelerating. Three years is a floor, not a ceiling — and a floor that assumes the best-case demand trajectory.',
    },
    {
      label:
        'The concession widening is temporary — free rent is a market incentive tool that clears inventory without requiring permanent rent reduction.',
      isBest: false,
      explanation:
        'When both concessions and face rents are moving adversely simultaneously, the signals are additive, not independent. Effective rent = face rent minus concession value; both are declining here. Treating each as separate and temporary misses the cumulative message: landlords are competing on multiple dimensions because tenants have leverage.',
    },
  ],
  takeaway:
    'Leading indicators (concession widening, rent softening) arrive before vacancy statistics reflect a market turn — because signed leases take months to show up in data. When both signal simultaneously, the market has already turned. Always model forward vacancy by adding the full pipeline to today\'s inventory before applying an absorption scenario, and stress-test by assuming absorption decelerates as vacancy rises.',
  tips: [
    'Forward vacancy formula: (today\'s vacant SF + spec pipeline SF) ÷ (today\'s inventory + pipeline SF).',
    'Concession widening is real-time signal; rent data and vacancy data are lagged by reporting cycles.',
    'If absorption is decelerating and the supply pipeline is accelerating, recovery takes longer than the straight-line math suggests.',
  ],
};
