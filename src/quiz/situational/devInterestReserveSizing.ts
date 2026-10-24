import type { SituationalCase } from '../../types/situational';

export const devInterestReserveSizing: SituationalCase = {
  id: 'dev-interest-reserve-sizing',
  title: 'How big should the interest reserve be?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['development', 'mortgageUw'],
  scenario:
    'A $30M construction loan carries a 7.5% rate. Construction is 18 months with the loan averaging 50% outstanding. Lease-up then takes another 12 months with the loan fully drawn, and the property is projected to cover about 40% of the interest from operations during lease-up. The budget currently carries only $1.7M of interest.',
  data: [
    { label: 'Loan amount', value: '$30M' },
    { label: 'Rate', value: '7.5%' },
    { label: 'Construction period', value: '18 months at 50% avg balance' },
    { label: 'Lease-up period', value: '12 months at 100% balance' },
    { label: 'Interest covered by NOI in lease-up', value: '40%' },
    { label: 'Current reserve', value: '$1.7M' },
  ],
  question: 'What is a sensible interest reserve?',
  options: [
    {
      label: 'About $3.3M to $3.5M — construction interest, plus lease-up carry net of projected NOI, with about a 10% cushion.',
      isBest: true,
      explanation:
        'Construction: $15M × 7.5% × 1.5 years ≈ $1.69M. Lease-up: $30M × 7.5% = $2.25M, less 40% covered by NOI → $1.35M. Total ≈ $3.04M; a 10% cushion gives about $3.35M. The $1.7M budget funds construction only.',
    },
    {
      label: '$1.7M — the loan is only drawn as construction progresses.',
      isBest: false,
      explanation:
        'This ignores the 12 months of lease-up on a fully drawn loan, which is the larger exposure per month.',
    },
    {
      label: 'About $3.9M — carry the full lease-up interest and assume no NOI.',
      isBest: false,
      explanation:
        'This is conservative but reasonable only if lease-up income is really uncertain. It overfunds and dilutes returns if NOI is credible.',
    },
    {
      label: '$2.25M — only the stabilized-year interest matters.',
      isBest: false,
      explanation:
        'This drops construction interest and the NOI offset; neither is correct.',
    },
  ],
  takeaway:
    'Size an interest reserve to stabilization, not to completion. Net the NOI you can actually defend and add a cushion for delay.',
  tips: [
    'Average balance during construction is rarely 50%; check the draw schedule.',
    'A one-month delay costs a full month of interest at the highest balance.',
    'Lenders often require the reserve to be funded up front.',
  ],
};
