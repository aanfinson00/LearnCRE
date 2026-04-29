import type { SituationalCase } from '../../types/situational';

export const noiGrowthMissing: SituationalCase = {
  id: 'noi-growth-missing',
  title: 'Year-3 NOI is 8% below pro forma — where do you look first?',
  category: 'diagnostic',
  difficulty: 'intermediate',
  roles: ['assetManagement'],
  assetClass: 'multifamily',
  scenario:
    'You\'re three years into a five-year hold on a 200-unit multifamily asset. Year-3 actual NOI came in at $2.30M vs the underwritten $2.50M — an 8% miss. Rents look in line with market; the property has run at 94% occupancy (vs UW 95%). You\'re asked to diagnose the miss in your year-end memo to the LP.',
  data: [
    { label: 'UW Year-3 NOI', value: '$2.50M' },
    { label: 'Actual Year-3 NOI', value: '$2.30M ' },
    { label: 'Miss', value: '8%' },
    { label: 'Rent vs market', value: 'In line' },
    { label: 'Occupancy', value: '94% (UW 95%)' },
  ],
  question: 'Where should you look first to explain the miss?',
  options: [
    {
      label:
        'OpEx growth — rent in line + occupancy roughly on plan means revenue is close to UW; an 8% NOI miss with revenue near plan implies expenses ran 6–8% above UW, which is the most common single driver of NOI shortfalls in stabilized multifamily.',
      isBest: true,
      explanation:
        'Revenue ≈ rent × leased units. Both came in near UW, so revenue can\'t explain a meaningful miss. NOI = revenue − OpEx; if revenue is on plan and NOI is light, OpEx is the variable. Common culprits: insurance (frequently +20–40% YoY post-2020), property taxes (post-sale reassessment, mill rate increases), repairs/maintenance (deferred-maintenance catch-up), payroll (wage inflation). Pull the OpEx variance report by line item before doing anything else.',
    },
    {
      label:
        'Vacancy — 1 point below UW (94% vs 95%) is meaningful and explains most of the gap.',
      isBest: false,
      explanation:
        'A 1-point vacancy miss on a 200-unit property is roughly 2 units. At market rent, that\'s ~$30k of revenue. An $200k NOI miss isn\'t explained by 2 vacant units — the math doesn\'t work. Vacancy is rarely the single explanation when the gap is in the high single-digit %.',
    },
    {
      label: 'Rent growth — even though rents are "in line", maybe you\'re mis-measuring the comp set.',
      isBest: false,
      explanation:
        'Possible but secondary. The prompt says rents are at market, which is observable. Even if there\'s a small mis-measurement, it can\'t explain the full 8% gap. OpEx variance is far more likely to be the single biggest line.',
    },
    {
      label: 'It\'s probably noise — single-year NOI variance is normal; report the variance and move on.',
      isBest: false,
      explanation:
        'Abdicates the asset-management responsibility. 8% is well outside normal variance for a stabilized asset. The LP wants to know *why*, not just *that*. Diagnose first, decide whether to act second.',
    },
  ],
  takeaway:
    'NOI = Revenue − OpEx. When NOI misses with revenue on plan, OpEx is the variable by definition. The asset-management diagnostic discipline is: (1) verify revenue is on plan; (2) pull the OpEx variance report by line; (3) attribute the miss to specific lines (insurance, taxes, repairs); (4) decide which are recoverable vs structural.',
  tips: [
    'Rules of thumb: insurance variance is the most common 2020+ outlier; reassessment is the second.',
    '1 point of vacancy ≈ 1% revenue impact. Easy to size before going further.',
    'When NOI misses, always run the variance report before forming a hypothesis.',
  ],
};
