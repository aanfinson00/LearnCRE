import type { SituationalCase } from '../../types/situational';

export const occupancyBreakEvenDscr: SituationalCase = {
  id: 'occupancy-break-even-dscr',
  title: 'What occupancy level breaks your loan covenant?',
  category: 'sensitivity',
  difficulty: 'beginner',
  roles: ['mortgageUw', 'acquisitions'],
  scenario:
    'A stabilized multifamily asset generates $2,000,000 of NOI at 95% occupancy. Annual debt service on the senior loan is $1,400,000. The loan covenant requires a DSCR of at least 1.20x. You want to know how far occupancy can fall before the DSCR covenant is breached.',
  data: [
    { label: 'NOI at 95% occupancy', value: '$2,000,000' },
    { label: 'Annual debt service', value: '$1,400,000' },
    { label: 'Current DSCR', value: '$2,000,000 ÷ $1,400,000 = 1.43x' },
    { label: 'Loan DSCR covenant', value: '1.20x minimum' },
    { label: 'Revenue at 95% occupancy', value: '$2,500,000 (assume 20% expense ratio)' },
    { label: 'Operating expenses', value: '$500,000 (fixed, does not scale with occupancy)' },
  ],
  question: 'At what occupancy rate does the DSCR fall to exactly 1.20x (the covenant floor)?',
  options: [
    {
      label: 'About 84% — at 1.20x DSCR you need $1,680,000 of NOI; revenue must equal $2,180,000; with $2,500,000 of revenue at 95%, revenue per 1% occupancy is ~$26,300, so you can lose ~11 points of occupancy.',
      isBest: true,
      explanation:
        'Required NOI for 1.20x DSCR: $1,400,000 × 1.20 = $1,680,000. Operating expenses are fixed at $500,000. Required revenue: $1,680,000 + $500,000 = $2,180,000. Revenue at 95% occupancy: $2,500,000. Revenue per 1% occupancy: $2,500,000 ÷ 95 = $26,316/%. Occupancy cushion: ($2,500,000 − $2,180,000) ÷ $26,316 = 12.2 occupancy points. Break-even occupancy: 95% − 12.2% ≈ 82.8%, approximately 83–84%. The asset has ~11–12 points of occupancy cushion before breaching covenant.',
    },
    {
      label: 'About 90% — a 5% drop in occupancy usually triggers a covenant breach at this leverage level.',
      isBest: false,
      explanation:
        'This is a rule-of-thumb guess, not a calculation. The actual break-even depends on the revenue run rate, expense structure, and covenant threshold. At 90% occupancy, NOI ≈ $2,500,000 × (90/95) − $500,000 = $1,868k, giving DSCR of 1.33x — well above the 1.20x floor. The asset can absorb significantly more occupancy loss than 5 points.',
    },
    {
      label: 'About 70% — the DSCR covenant gives you a lot of room because expenses also fall as occupancy drops.',
      isBest: false,
      explanation:
        'Operating expenses are specified as fixed (they do not scale proportionally with occupancy). At 70% occupancy, revenue ≈ $2,500,000 × (70/95) = $1,842k; NOI = $1,842k − $500k = $1,342k; DSCR = $1,342k ÷ $1,400k = 0.96x — below 1.0x and well below the 1.20x covenant. This answer overestimates the cushion.',
    },
    {
      label: 'You cannot calculate this without knowing the exact rent roll and lease expiration schedule.',
      isBest: false,
      explanation:
        'The scenario provides enough data to estimate the break-even: revenue at 95% occupancy, fixed expenses, and the DSCR covenant. The calculation does not require a full rent roll. Rough break-even analysis is a core underwriting skill — doing it from macro assumptions is expected at the associate level.',
    },
  ],
  takeaway:
    'DSCR break-even occupancy = the occupancy at which (revenue × occupancy factor) − fixed expenses = required NOI (debt service × covenant multiple). The key inputs are the revenue run rate per occupancy point and the expense structure. Most stabilized multifamily assets have 10–15 points of occupancy cushion at standard leverage.',
  tips: [
    'Required NOI = debt service × DSCR covenant. Work backwards from there to find the revenue floor.',
    'Fixed vs. variable expenses matter: if expenses are fixed, each point of occupancy loss hurts NOI dollar-for-dollar in revenue reduction.',
    'Run this calculation before any lender call — knowing your covenant cushion in occupancy terms is more intuitive than DSCR decimals.',
  ],
};
