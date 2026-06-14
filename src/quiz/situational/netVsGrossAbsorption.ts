import type { SituationalCase } from '../../types/situational';

export const netVsGrossAbsorption: SituationalCase = {
  id: 'net-vs-gross-absorption',
  title: 'Gross absorption is at a record — why is the market softening?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A submarket broker report touts "record gross absorption" of 500,000 SF last quarter. But the same report notes that 600,000 SF was returned to market via move-outs and new sublease additions. Asking rents have ticked down 2% quarter-over-quarter. You\'re evaluating an office asset in this submarket for a 5-year hold.',
  data: [
    { label: 'Gross absorption', value: '500,000 SF' },
    { label: 'Space returned to market', value: '600,000 SF' },
    { label: 'Implied net absorption', value: '-100,000 SF' },
    { label: 'Asking rent change', value: '-2% QoQ' },
  ],
  question: 'What does this data tell you, and which metric drives your underwriting?',
  options: [
    {
      label: 'Net absorption is what matters — it\'s negative (-100k SF), meaning available supply is growing. "Record gross" measures leasing activity, not supply/demand balance. Widen your exit cap and temper rent growth assumptions.',
      isBest: true,
      explanation:
        'Gross absorption counts every new lease signed regardless of what was simultaneously given back. Net absorption = gross − space returned. Negative net absorption means new vacancies outpace new leasing — exactly the condition that drives rents down and widens caps. The -100k SF reading is confirmed by the -2% rent move. For a 5-year hold you need to underwrite a trough-and-recovery scenario, not flat rent.',
    },
    {
      label: 'Record gross absorption means the market is active — use the high end of your rent growth range.',
      isBest: false,
      explanation:
        'Gross absorption is a leasing-activity indicator that ignores supply additions. A market can log 500k SF of new leasing while simultaneously producing 600k SF of new vacancies — the net result is softness, not strength. Using gross alone to support rent growth would systematically over-underwrite office in an oversupplied market.',
    },
    {
      label: 'Average gross and net and use the midpoint as your absorption assumption.',
      isBest: false,
      explanation:
        'Net absorption is the correct supply-demand metric; gross is a leasing-velocity metric. They answer different questions. You don\'t average them — net drives occupancy underwriting, gross tracks demand momentum.',
    },
    {
      label: 'Ignore both — asking rents are the only real-time market signal.',
      isBest: false,
      explanation:
        'Asking rents confirm direction (-2% QoQ) but don\'t reveal the magnitude of the imbalance or when recovery happens. Net absorption data tells you the supply overhang, which is what you need to size the recovery timeline.',
    },
  ],
  takeaway:
    'Net absorption is the primary supply-demand health metric. Gross absorption measures leasing activity and can be high even when the market is weakening. When "record leasing" accompanies widening vacancy, always verify whether move-outs and sublease adds are outpacing new leases. Negative net absorption is an explicit underwriting flag: temper rent growth, widen exit cap, and plan for a longer stabilization period.',
  tips: [
    'Net absorption = gross absorption − space returned to market (move-outs + sublease adds).',
    'Gross can mislead in high-churn markets where tenants downsize and re-lease smaller spaces.',
    'Track net absorption over 2–4 consecutive quarters; single-quarter swings can be noise.',
  ],
};
