import type { SituationalCase } from '../../types/situational';

export const sensitivityOccupancyValue: SituationalCase = {
  id: 'sensitivity-occupancy-value',
  title: 'How much does 5 points of occupancy move the value?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'You\'re underwriting a 200,000 SF office building at a 6.0% going-in cap. In-place NOI is $6.8M based on 92% occupancy (184,000 SF leased at $40/SF average, minus $680K of operating expenses passed through). You want to understand the value sensitivity if occupancy drops from 92% to 87% in the near term as one tenant\'s lease rolls.',
  data: [
    { label: 'Building size', value: '200,000 SF' },
    { label: 'In-place occupancy', value: '92% (184,000 SF leased)' },
    { label: 'Average rent (leased SF)', value: '$40/SF' },
    { label: 'In-place NOI', value: '$6.8M' },
    { label: 'Going-in cap', value: '6.0%' },
    { label: 'Lease rollover scenario', value: '92% → 87% occupancy' },
  ],
  question:
    'What is the approximate change in value if occupancy drops to 87%, holding all else equal?',
  options: [
    {
      label:
        'A 5-point occupancy drop (10,000 SF going dark) reduces revenue by $400K/yr ($40/SF × 10,000 SF). Assuming operating expenses are partially fixed (common area costs continue), the NOI impact is roughly $400K. At a 6.0% cap, every $100K of NOI = $1.67M of value. The $400K NOI reduction implies roughly −$6.7M of value, or about −6% of the in-place value of ~$113M.',
      isBest: true,
      explanation:
        'This is the cap rate sensitivity formula: ΔValue = ΔNOI ÷ cap rate. Step-by-step: (1) revenue lost = 10,000 SF × $40/SF = $400K. (2) In a multi-tenant office building, some operating expenses are fixed — assume the full $400K flows to NOI reduction (conservative; actual impact slightly less if some variable expenses are offset). (3) ΔValue = −$400K ÷ 6.0% = −$6.67M. As a percent of in-place value ($6.8M ÷ 6.0% = $113.3M): −$6.67M ÷ $113.3M ≈ −5.9%. This shows the leverage of occupancy on value at modest cap rates — each 1% of occupancy loss at a 6% cap represents roughly 1.2% of total building value.',
    },
    {
      label:
        'Value drops 5% because occupancy dropped 5 percentage points.',
      isBest: false,
      explanation:
        'The relationship between occupancy and value is not 1:1. Value depends on NOI, which depends on the rent the vacant space was generating divided by the cap rate. A 5-percentage-point occupancy drop on a $40/SF rent roll produces a specific dollar reduction in NOI ($400K here), which then gets divided by the cap rate. Saying "5% occupancy loss = 5% value loss" ignores the cap rate multiplier.',
    },
    {
      label:
        'Value doesn\'t change significantly — one tenant\'s rollover is a short-term fluctuation, not a permanent impairment.',
      isBest: false,
      explanation:
        'Lease rollover creates real, near-term NOI impairment — not a theoretical future risk. If the tenant vacates tomorrow, the NOI drops immediately, and a buyer pricing the asset today at a 6.0% cap on stabilized NOI would reduce their offer by the present value of the projected lease-up period. "Short-term fluctuation" is the seller\'s framing; the buyer must quantify it.',
    },
    {
      label:
        'Need to know whether it\'s a full-floor tenant or scattered space to assess the impact.',
      isBest: false,
      explanation:
        'Tenant configuration (full-floor vs. multi-tenant) matters for re-leasing strategy and timing, but the NOI impact of 10,000 SF going dark is the same regardless of configuration: $40/SF × 10,000 SF = $400K/yr. The sensitivity question is answerable from the data given; configuration is a secondary underwriting input for timing, not for quantifying the value impact.',
    },
  ],
  takeaway:
    'Occupancy sensitivity flows through a clean formula: ΔNOI = vacant SF × rent/SF (minus any variable expense savings), then ΔValue = ΔNOI ÷ cap rate. At low cap rates, the multiplier is powerful — a $400K NOI reduction at a 6% cap = $6.7M of value, nearly 6% of total building value from a 5-point occupancy move. This is why lenders and buyers care deeply about lease rollover timing and why occupancy is one of the highest-leverage sensitivity inputs in any underwriting.',
  tips: [
    'ΔValue = ΔNOI ÷ going-in cap rate (hold cap rate constant for sensitivity tests).',
    'NOI sensitivity to occupancy: lost rent per SF × SF vacated (partially offset by variable expense savings).',
    'At a 5% cap, the multiplier is 20× NOI — each $1 of NOI lost = $20 of value.',
    'Always stress-test the vacancy that arises from your single largest tenant rolling — if it breaks the deal, flag it.',
  ],
};
