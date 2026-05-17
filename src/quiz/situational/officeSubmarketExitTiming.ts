import type { SituationalCase } from '../../types/situational';

export const officeSubmarketExitTiming: SituationalCase = {
  id: 'office-submarket-exit-timing',
  title: 'Can the submarket absorb the pipeline before your exit?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You are underwriting a 5-year hold on a CBD office asset. The submarket has 12M SF of inventory at 80% occupancy. Two trophy towers totaling 1.8M SF are scheduled to deliver over the next 24 months. Annual net absorption has averaged 600,000 SF over the trailing 3 years, but has been declining — last year came in at only 400,000 SF. Your exit underwriting requires 88% submarket occupancy by year 5.',
  data: [
    { label: 'Submarket inventory (current)', value: '12M SF' },
    { label: 'Current occupancy', value: '80%' },
    { label: 'Pipeline deliveries', value: '1.8M SF over next 24 mos' },
    { label: 'Avg net absorption (3-yr)', value: '600k SF/yr' },
    { label: 'Most recent year absorption', value: '400k SF/yr' },
    { label: 'Target occupancy at exit', value: '88%' },
    { label: 'Hold period', value: '5 years' },
  ],
  question: 'Is 88% submarket occupancy at year 5 a realistic exit assumption?',
  options: [
    {
      label: 'Unlikely — even the trailing average of 600k SF/yr is insufficient. New base: 13.8M SF. Target occupied at 88%: 12.14M SF. Currently occupied: 9.6M SF. Net to absorb: 2.54M SF over 5 years = 508k/yr — but absorption is decelerating, not growing.',
      isBest: true,
      explanation:
        'Math: 12M + 1.8M pipeline = 13.8M new base. 13.8M × 88% = 12.14M SF needed leased. 12M × 80% = 9.6M SF currently leased. Net to absorb: 2.54M SF. At 600k/yr avg that is 4.2 years — technically fits within 5 years, but only at the historical peak pace. With absorption decelerating to 400k/yr, you need the trend to reverse. Model at 400–450k/yr and flag the deceleration as the single biggest underwriting risk.',
    },
    {
      label: 'Yes — 600k/yr × 5 years = 3M SF, well above the 2.54M needed.',
      isBest: false,
      explanation:
        'Uses the 3-year average without accounting for the trend break. The most recent year was 400k SF, not 600k. Flat-lining at 600k ignores observable evidence of demand softening. A defensible underwrite uses current pace (400k) or a modest recovery scenario, not the trailing peak.',
    },
    {
      label: 'It depends entirely on whether the trophy towers are pre-leased.',
      isBest: false,
      explanation:
        'Pre-leasing matters for individual building lease-up but does not change the submarket occupancy math. Tenants in pre-leased towers typically relocate from existing submarket space, which frees up vacancy elsewhere. Pre-leasing does not create net new demand; it allocates existing demand to a specific building.',
    },
    {
      label: 'Model 85% and add a 12-month extension option — the market will stabilize.',
      isBest: false,
      explanation:
        'Hoping for stabilization is not underwriting. If 85% is the revised target, compute the math: does it work? Extensions have real cost — debt extension fees, deferred promote, LP holding-period drag. Model the extension scenario explicitly rather than treating it as a free option.',
    },
  ],
  takeaway:
    'The absorption test for an exit case: (target occupied SF) − (current occupied SF) ÷ hold years = required annual absorption. Compare that number to the trend in net absorption, not just the average. When absorption is decelerating, the current run rate is a more honest underwriting input than the historical mean.',
  tips: [
    'Always recompute the inventory base to include the full delivery pipeline before applying the target occupancy %.',
    'Use trailing 4-quarter absorption when a trend break is visible; multi-year averages obscure direction.',
    'Pre-leased pipeline is not free absorption — it moves demand from existing space to new, keeping the net math the same.',
  ],
};
