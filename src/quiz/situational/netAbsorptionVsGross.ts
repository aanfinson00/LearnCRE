import type { SituationalCase } from '../../types/situational';

export const netAbsorptionVsGross: SituationalCase = {
  id: 'net-absorption-vs-gross',
  title: 'Gross absorption is strong — why is occupancy still falling?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A broker presents leasing activity data for an office submarket to support a re-entry thesis. Gross absorption has averaged 400,000 SF/quarter for the past 4 quarters — a strong showing. But the submarket\'s occupancy rate has dropped from 88% to 84% over the same period. Total inventory is 20M SF. The broker attributes the occupancy drop to "transitional move-outs that are already resolved."',
  data: [
    { label: 'Submarket inventory', value: '20,000,000 SF' },
    { label: 'Gross absorption (4-qtr avg)', value: '400,000 SF/quarter' },
    { label: 'Occupancy 1 year ago', value: '88%' },
    { label: 'Current occupancy', value: '84%' },
    { label: 'Implied vacant SF lost', value: '800,000 SF over 4 quarters' },
  ],
  question: 'What does the data actually tell you about market health?',
  options: [
    {
      label: 'Net absorption is negative — the market is shrinking faster than it\'s leasing. 1.6M SF of gross leasing was offset by more than 2.4M SF of space returned, producing a net loss of 800k SF occupied. The gross absorption figure is misleading without the net.',
      isBest: true,
      explanation:
        'Gross absorption counts every new lease signed; net absorption is (new leases − space vacated). If 400k/quarter gross × 4 = 1.6M SF leased, and occupancy fell from 88% to 84% on a 20M SF base, that\'s 800k SF of net loss: 0.04 × 20M = 800k. Implied space vacated = 1.6M + 0.8M = 2.4M SF. The market is experiencing a wave of returns that dwarfs the leasing activity. Strong gross absorption in a net-negative market often signals "musical chairs" — tenants moving, not growing.',
    },
    {
      label: 'Gross absorption at 400k/quarter is healthy — the occupancy drop is likely a timing lag between lease signing and move-in.',
      isBest: false,
      explanation:
        'Timing lag would explain a 1–2 quarter lag, not a sustained 4-quarter decline. If gross leasing were the right headline, net absorption would be near flat or positive. A 4-point occupancy decline on a 20M SF base is 800k SF of net loss — not a rounding error or timing issue.',
    },
    {
      label: 'Focus on the leasing velocity: 400k/quarter is strong and the broker\'s move-out explanation is plausible.',
      isBest: false,
      explanation:
        '"Transitional move-outs that are already resolved" is the classic broker framing. It may be true. But the test is net absorption, not gross — if the resolved move-outs show up as positive net absorption in the next quarter, the thesis works. Underwriting it before that data exists means buying on hope.',
    },
    {
      label: 'The market data is too noisy to draw conclusions — wait for more quarters.',
      isBest: false,
      explanation:
        'Four consecutive quarters of declining occupancy is not noise. The signal is clear: supply is returning to market faster than demand is absorbing it. Deciding to wait does not change the math — it just delays the conclusion.',
    },
  ],
  takeaway:
    'Gross absorption is a marketing metric; net absorption is an underwriting metric. Always compute both. If a broker leads with gross, immediately ask for the net — if they can\'t provide it, compute it from the occupancy change. Four straight quarters of negative net absorption in an office submarket is a thesis-killing datapoint, not a footnote.',
  tips: [
    'Net absorption = change in occupied SF; gross absorption = new leases signed (backfills included).',
    'Quick calc: net absorption = (occupancy change %) × inventory.',
    'Strong gross absorption in a net-negative market usually signals high tenant churn, not demand growth.',
  ],
};
