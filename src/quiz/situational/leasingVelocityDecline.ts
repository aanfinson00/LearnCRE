import type { SituationalCase } from '../../types/situational';

export const leasingVelocityDecline: SituationalCase = {
  id: 'leasing-velocity-decline',
  title: 'Lease-up slowing mid-build — when to re-forecast',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    'A 220-unit newly delivered Class-A apartment community started leasing 6 months ago. The development proforma assumed 25 units/month throughout lease-up, targeting stabilization in month 9. Actual pace: Months 1–2: 32 units/month (above plan). Months 3–4: 20 units/month. Months 5–6: 12 units/month. As of today, 136 units are occupied. The sponsor calls the slowdown "normal seasonality." You\'re the asset manager evaluating whether to re-forecast.',
  data: [
    { label: 'Total units', value: '220' },
    { label: 'Proforma pace', value: '25 units/month → stabilization month 9' },
    { label: 'Month 1–2 actual', value: '32 units/month (above plan)' },
    { label: 'Month 3–4 actual', value: '20 units/month (below plan)' },
    { label: 'Month 5–6 actual', value: '12 units/month (well below plan)' },
    { label: 'Units occupied at month 6', value: '136 (62%)' },
    { label: 'Remaining units', value: '84' },
  ],
  question: 'How should you evaluate the sponsor\'s "seasonal slowdown" explanation?',
  options: [
    {
      label: 'Challenge it — this is a consistent 6-month deceleration, not a seasonal dip. At 12 units/month, stabilization extends to month 13. Probe concessions, pricing, and competitive supply before accepting the seasonality framing.',
      isBest: true,
      explanation:
        'Seasonality produces a V-shape: pace falls then recovers. A linear deceleration over 3 consecutive measurement periods (32 → 20 → 12) is a structural trend. At 12 units/month: 84 remaining ÷ 12 = 7 more months, stabilization in month 13 — 4 months later than plan. The first diagnostic questions: Are concessions rising? Have new competing deliveries come online nearby? Is pricing above where prospects are converting? Waiting without a re-forecast burns the interest reserve.',
    },
    {
      label: 'Accept the explanation and re-evaluate in 60 days — one slow period doesn\'t make a trend.',
      isBest: false,
      explanation:
        'This would be appropriate after one slow month. After three consecutive declining periods over 6 months, you\'re past the single-data-point threshold. "Re-evaluate in 60 days" is effectively choosing to delay the re-forecast by another two months while the interest reserve drains. The time to act is when the trend is clear, not after waiting for a fourth declining period.',
    },
    {
      label: '136 units in month 6 is 62% occupancy — that\'s reasonable for mid-lease-up. The plan is on track.',
      isBest: false,
      explanation:
        'Point-in-time occupancy is a lagging outcome; absorption pace is the forward driver. At month 6, the plan called for 25/mo × 6 = 150 units, so you\'re actually 14 units behind plan. More critically, a trailing pace of 12/mo vs. a plan pace of 25/mo means you\'re heading for a 13-month stabilization vs. a 9-month plan. Checking where you are without checking where you\'re going is the occupancy-vs-pace confusion.',
    },
    {
      label: 'The sponsor knows the asset better — trust their seasonal framing and don\'t interfere.',
      isBest: false,
      explanation:
        'The sponsor\'s incentives (avoid signaling distress, protect management fee) don\'t align perfectly with LP interests. Asset managers provide oversight on exactly this type of performance question. "Trust the sponsor" is appropriate when data is ambiguous; here, the deceleration is clear and quantified. Oversight means asking hard questions supported by data, not deferring.',
    },
  ],
  takeaway:
    'A consistent multi-period deceleration in leasing pace is a forward signal — the number that matters is the velocity trend, not the current occupancy level. Any linear decline over 3+ periods should trigger a re-forecast, a competitive landscape check, and a review of concession levels. Seasonal patterns are V-shaped; structural supply/demand headwinds are linear.',
  tips: [
    'Plot trailing 2-month pace vs. proforma pace — the slope of the gap tells the story faster than point-in-time occupancy.',
    'Compare your concessions to competing new deliveries: rising concessions signal pricing pressure, not seasonality.',
    'Interest reserve burn rate × revised stabilization timeline is the first go/no-go on a capital call.',
  ],
};
