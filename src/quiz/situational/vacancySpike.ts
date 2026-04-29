import type { SituationalCase } from '../../types/situational';

export const vacancySpike: SituationalCase = {
  id: 'vacancy-spike',
  title: 'A 15-point vacancy spike — what now?',
  category: 'diagnostic',
  difficulty: 'intermediate',
  roles: ['assetManagement'],
  assetClass: 'office',
  scenario:
    'A 200,000 SF Class-A office building has run at 95%+ occupancy for the past four years. In the most recent quarter, occupancy dropped from 95% to 80% — a 15-point swing. The seller\'s broker is marketing this as a "temporary leasing opportunity" at the same pricing as a year ago. You\'re being asked to bid this week.',
  data: [
    { label: 'Building size', value: '200,000 SF' },
    { label: 'Prior occupancy', value: '95%+ (4 yrs)' },
    { label: 'Current occupancy', value: '80%' },
    { label: 'Time elapsed', value: '1 quarter' },
    { label: 'Pricing pressure', value: 'Same as 12 mos ago' },
  ],
  question: 'Before bidding, what\'s the single most important diagnostic question?',
  options: [
    {
      label: 'Was this a single-tenant move-out or a market-wide deterioration? The price implications are completely different — single-tenant is a re-leasing problem; market-wide is a cap-rate problem.',
      isBest: true,
      explanation:
        '15 points = 30,000 SF. If that\'s one large tenant rolling, you have a real but bounded re-leasing event: known TI cost, known downtime, similar future tenants likely available. If it\'s 4-5 smaller tenants leaving simultaneously, the diagnosis is fundamentally different — the building or submarket is losing demand and the cap rate environment for this asset has shifted. Same observed vacancy; entirely different underwriting.',
    },
    {
      label: 'How much of the vacancy is leased to LOI tenants? If 30%+, the spike is "paper" not real.',
      isBest: false,
      explanation:
        'Useful but not the most important diagnostic. LOI conversion is the *next* question after you\'ve established whether the underlying demand environment is healthy. An 80% leased / 10% LOI building is meaningfully different in a healthy market vs. a deteriorating one.',
    },
    {
      label: 'Are concessions running ahead of historical levels in the submarket?',
      isBest: false,
      explanation:
        'Important context but secondary. Concession trends tell you about pricing discipline; the move-out vs market-wide question tells you about demand structure. You can re-lease at lower NER even in a healthy market; you can\'t re-lease at any price in a deteriorating one.',
    },
    {
      label: 'What\'s the WALT on the remaining 80% of the rent roll?',
      isBest: false,
      explanation:
        'Always relevant but doesn\'t address the cause of the spike. WALT tells you about future risk; the diagnostic question is about the *current* spike — its cause determines whether the price should hold or move.',
    },
  ],
  takeaway:
    'Same observed vacancy can mean very different things depending on cause. Always trace a spike to the *who* — single tenant vs many — before underwriting. A single-tenant rollover is a TI / downtime / re-leasing problem with a known cost; a multi-tenant departure is a structural demand signal that should reset your cap rate, your trended NOI, and your hold thesis.',
  tips: [
    'Pull the rent roll and trace each vacated suite to a tenant name.',
    '15-point swing in one quarter without a known driver is a "stop the line" signal — push the bid date.',
    'Submarket vacancy / absorption data tells you market-wide vs asset-specific.',
  ],
};
