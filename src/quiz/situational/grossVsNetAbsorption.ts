import type { SituationalCase } from '../../types/situational';

export const grossVsNetAbsorption: SituationalCase = {
  id: 'gross-vs-net-absorption',
  title: 'Gross absorption is strong — why is net absorption negative?',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['acquisitions', 'development'],
  assetClass: 'office',
  scenario:
    'A broker pitches a suburban office investment citing "record gross absorption of 1.2M SF this year." The CoStar data you pull shows net absorption of −400k SF for the same period. The submarket vacancy rate has climbed from 14% to 17% year-over-year despite the leasing activity. Asking rents are flat.',
  data: [
    { label: 'Gross absorption (YTD)', value: '1.2M SF' },
    { label: 'Net absorption (YTD)', value: '−400k SF' },
    { label: 'Vacancy rate YoY', value: '14% → 17%' },
    { label: 'Asking rents', value: 'Flat' },
  ],
  question: 'How do you reconcile the strong gross absorption with negative net absorption?',
  options: [
    {
      label:
        'Gross absorption counts all new leases signed; net absorption subtracts space vacated. The 1.6M SF of move-outs that offset the 1.2M in new leases is what turned net negative — tenants are consolidating or leaving.',
      isBest: true,
      explanation:
        'Gross absorption = total new leasing activity (every lease signed, regardless of what moved out). Net absorption = new occupancy minus space vacated in the same period. If 1.2M SF was leased but 1.6M SF was vacated (expirations, downsizing, move-outs), net is −400k. The broker is measuring market activity (transactions), not market health (occupancy growth). A 17% vacancy rate rising on "record" leasing is a classic sign of a market with structural demand loss: tenants are moving around within the market, not growing. This is also consistent with flat rents despite high transaction volume.',
    },
    {
      label:
        'The data must be wrong — strong gross absorption always translates to positive net absorption.',
      isBest: false,
      explanation:
        'Not true. Gross and net can diverge significantly when there are large move-outs running concurrently with new leasing. Real-world example: a large employer leases 400k SF in a new build while vacating 600k SF of older space — gross up 400k, net down 200k. The divergence is especially common in markets with a flight-to-quality dynamic where tenants upgrade buildings without expanding.',
    },
    {
      label:
        'Net absorption is the better indicator, but it will turn positive next quarter as the new leases get occupied.',
      isBest: false,
      explanation:
        'Assumes the leasing pipeline will fill the gap, but ignores the structural question: WHY is 1.6M SF being vacated? In a market with flight-to-quality or tenant footprint reduction, the vacated space is the signal. Unless you can identify the source of the new demand that won\'t be offset by further move-outs, extrapolating a recovery from gross activity data is unjustified.',
    },
    {
      label:
        'Gross absorption is what drives rents; net absorption is a secondary metric useful only for forecasting vacancy.',
      isBest: false,
      explanation:
        'Backwards. Rent growth is driven by net absorption (supply/demand balance), not gross (transaction activity). Flat rents in this case are consistent with negative net absorption tightening the actual supply of tenants competing for space. If gross absorption drove rents, record gross should have pushed rents up — the flat rents are evidence that net is the right variable.',
    },
  ],
  takeaway:
    'Gross absorption measures market activity; net absorption measures market health. Strong gross with negative net means tenants are churning, not growing — a danger sign for owners betting on occupancy-driven NOI growth. Always check both metrics and ask what\'s driving the vacated side when gross and net diverge.',
  tips: [
    'Net absorption = new leases occupied − space vacated. Negative net = more move-outs than move-ins.',
    'Gross absorption records activity at signing; occupancy shifts flow through net absorption at occupancy.',
    'Flat or declining rents + rising vacancy + strong gross = churning tenants, not demand growth.',
  ],
};
