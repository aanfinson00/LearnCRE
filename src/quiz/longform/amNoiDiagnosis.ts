import type { LongformCase } from '../../types/longform';

export const amNoiDiagnosis: LongformCase = {
  id: 'am-noi-diagnosis',
  title: 'Year 2 NOI miss: diagnose, prove it, fix it',
  difficulty: 'intermediate',
  roles: ['assetManagement'],
  assetClass: 'multifamily',
  scenario:
    "You're the asset manager on a 300-unit Class B multifamily acquisition. You're 14 months into a 5-year hold. Year 2 NOI is tracking 4% below underwriting ($3.84M actual vs $4M projected) — not catastrophic, but the trend has been deteriorating quarter-over-quarter for the past three quarters. Underwriting assumed 95% economic occupancy, 3% rent growth, and OpEx in line with comps. T-12 financials show: physical occupancy 94%, economic occupancy 91%, rent growth +2.1%, OpEx +5.3% YoY. The investment committee asks for a diagnostic memo before next quarter's review.",
  data: [
    { label: 'NOI underwriting', value: '$4.00M' },
    { label: 'NOI actual (T-12)', value: '$3.84M (-4%)' },
    { label: 'Trend', value: 'Deteriorating Q-over-Q for 3 quarters' },
    { label: 'Physical occ', value: '94% (UW: 95%)' },
    { label: 'Economic occ', value: '91% (UW: 95%)' },
    { label: 'Rent growth', value: '+2.1% (UW: +3%)' },
    { label: 'OpEx growth', value: '+5.3% YoY' },
    { label: 'Hold remaining', value: '~3.7 years' },
  ],
  question:
    "Write a 3-paragraph diagnostic for the AM committee. Paragraph 1: rank the three most-likely root causes by NOI impact. Paragraph 2: how do you prove which one is binding (what data, from where). Paragraph 3: what you do about it.",
  modelAnswer: `Three root causes ranked by likely NOI impact: (1) The 400 bps gap between physical (94%) and economic occupancy (91%) is the largest single drag — that's concession overhang or bad debt, and at $1,800/unit/month average rent it's roughly $215k/year of NOI. (2) OpEx running at +5.3% vs underwriting of ~3% is the second-largest driver; on a $1.8M opex base that's ~$45k of NOI compression annually. (3) Rent growth shortfall (+2.1% vs +3%) is real but smallest — on a $6.5M GPR base that's ~$60k/year compounding. Combined they explain ~$320k of the $160k miss with overlap (physical-occ shortfall is *also* dragging GPR), which is consistent with the deteriorating trend.

To prove which is binding, I'd pull three things: (a) the rent roll's concession + bad-debt detail by unit and month — if concessions are spiking and bad debt is steady, leasing is over-promising to hit physical occupancy; if bad debt is rising, the resident-quality screen has loosened. (b) The OpEx variance report by line item — split insurance and property tax (likely market-driven, not controllable) from R&M, payroll, and utilities (controllable). (c) Comp set rent + concession data from CoStar / RealPage — if the comp set is also at +2% with concessions, our shortfall is market-wide and we can't fix it via leasing strategy.

Action depends on which dominates, but the most likely play is: tighten the rental application credit floor to reduce bad debt (first-order effect on economic occupancy), reduce the concession program for renewals (concessions are bleeding the renewal book, not just new leases), and benchmark insurance + property-tax line items against the comp set to see if we have negotiable expense items vs structural ones. We don't reset underwriting yet — we run two more quarters with the tightened controls and then re-forecast at the year-3 mark, when we'll know whether this is a one-asset operations issue or a broader market reset that needs a hold-vs-sell conversation.`,
  rubric: [
    {
      id: 'ranks-causes',
      dimension: 'Ranks 3 likely causes and quantifies the NOI impact of each (not just lists them)',
      weight: 2,
    },
    {
      id: 'identifies-key-gap',
      dimension: 'Names the physical-vs-economic occupancy gap as the largest signal (concession / bad debt)',
      weight: 1.5,
    },
    {
      id: 'diagnostic-method',
      dimension: 'Specifies *what data from where* to prove which cause is binding',
      weight: 2,
    },
    {
      id: 'controllable-vs-market',
      dimension: 'Splits controllable issues (concessions, R&M) from market issues (rent growth, insurance, taxes)',
      weight: 1.5,
    },
    {
      id: 'action-tied-to-diagnosis',
      dimension: 'Action is tied to the diagnosis — not generic "tighten operations"',
      weight: 1.5,
    },
    {
      id: 'reset-discipline',
      dimension: 'Defines when the AM team would reset underwriting vs. continue tightening (typically at a future re-forecast point)',
    },
  ],
  takeaway:
    "An NOI miss diagnostic is half-arithmetic and half-data-pulling. The asset-management discipline is (1) decompose the variance into ranked drivers with dollars attached, (2) name the specific data and source that would prove which is binding, (3) separate controllable from structural drivers, and (4) avoid resetting underwriting prematurely — most year-2 misses self-correct or stabilize after operational tightening before they need a hold-vs-sell conversation.",
  tips: [
    'Physical occupancy can be 94% while economic occupancy is 91% — the gap is concessions + bad debt + non-revenue units. Always look at both.',
    'OpEx variance is mostly insurance + taxes (uncontrollable) and R&M + payroll (controllable). Split before deciding what to do.',
    "Don't reset underwriting on Year-2 data. You don't have enough of a sample yet — tighten operations and re-forecast at Year 3.",
  ],
};
