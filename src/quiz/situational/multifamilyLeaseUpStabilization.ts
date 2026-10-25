import type { SituationalCase } from '../../types/situational';

export const multifamilyLeaseUpStabilization: SituationalCase = {
  id: 'multifamily-leaseup-stabilization',
  title: 'When does the new building stabilize?',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['development', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re underwriting a new 300-unit multifamily development that just opened. Leasing has averaged 20 net units per month since the first move-in. Your lender\'s stabilization test and your pro forma both define stabilization as 93% occupancy.',
  data: [
    { label: 'Total units', value: '300' },
    { label: 'Net leasing pace', value: '20 units/month' },
    { label: 'Stabilization definition', value: '93% occupancy' },
    { label: 'Units at opening', value: '0 leased' },
  ],
  question: 'Roughly how many months to stabilization at the current pace?',
  options: [
    {
      label: 'About 14 months — 93% of 300 is 279 units, and 279 ÷ 20 ≈ 14.',
      isBest: true,
      explanation:
        'Stabilization is measured against the occupancy target, not full occupancy. 300 × 0.93 = 279 units ÷ 20/month = 13.95 months. Carry interest and operating deficit through that period, and test sensitivity at 15 units/month (~19 months).',
    },
    {
      label: 'About 15 months — 300 units ÷ 20 per month.',
      isBest: false,
      explanation:
        'Treats stabilization as 100% leased. Buildings never run fully occupied; the 93% test is what the lender and pro forma use.',
    },
    {
      label: 'About 10 months — pace will accelerate once the building is known in the market.',
      isBest: false,
      explanation:
        'Speculating on acceleration is a pro forma assumption, not a base case. Underwrite to the observed pace and treat acceleration as upside.',
    },
    {
      label: 'It can\'t be estimated until the first year of leasing is complete.',
      isBest: false,
      explanation:
        'You always estimate from the observed pace and sensitize it. Waiting a year defeats the purpose of underwriting lease-up carry.',
    },
  ],
  takeaway:
    'Lease-up time = (units × stabilization %) ÷ net monthly absorption. Use the target occupancy, not 100%, and sensitize the pace because carry costs scale with every extra month.',
  tips: [
    'Stabilization is a % target, not 100% leased.',
    'Use net leasing pace (move-ins less move-outs).',
    'Run a slower-pace case; interest carry compounds with delay.',
  ],
};
