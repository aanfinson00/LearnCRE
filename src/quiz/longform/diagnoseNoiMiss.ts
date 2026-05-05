import type { LongformCase } from '../../types/longform';

export const diagnoseNoiMiss: LongformCase = {
  id: 'diagnose-noi-miss',
  title: 'Diagnose the NOI miss for the LP IC memo',
  difficulty: 'intermediate',
  roles: ['assetManagement'],
  assetClass: 'multifamily',
  scenario:
    'You\'re the asset manager on a 250-unit MF asset purchased 18 months ago. Year-1 NOI underwriting was $3.0M; trailing-12 NOI just came in at $2.65M — an 11.7% miss. Revenue is $4.85M (vs UW $4.95M, 2% under). Rents are at market, occupancy is 93% (vs UW 94%). OpEx came in at $2.20M vs UW $1.95M — a $250k or 12.8% overage. Insurance jumped 28% YoY at renewal; property tax was reassessed and rose 18%; payroll inflation ran 6%; everything else was within 3% of plan. The LP IC asks for a 2-page memo explaining the variance and proposing actions. You need to draft the variance analysis section.',
  data: [
    { label: 'UW NOI', value: '$3.0M' },
    { label: 'Actual TTM NOI', value: '$2.65M' },
    { label: 'NOI miss', value: '-$350k (-11.7%)' },
    { label: 'Revenue variance', value: '-$100k (-2%)' },
    { label: 'OpEx variance', value: '+$250k (+12.8%)' },
    { label: 'Insurance', value: '+28% YoY at renewal' },
    { label: 'Property tax', value: '+18% (reassessment)' },
    { label: 'Payroll', value: '+6% inflation' },
  ],
  question:
    'Draft the variance analysis section: what caused the miss, what\'s structural vs one-time, and what\'s your action plan? Aim for 5-7 sentences in the LP\'s tone (factual, prioritized, specific).',
  modelAnswer: `The $350k NOI miss is dominated by OpEx growth, not revenue weakness. Revenue ran 2% under plan due to slightly softer occupancy (93% vs 94%); rents are at market and there\'s no demand-side concern. The OpEx overage of $250k breaks down as: insurance renewal +$80k (28% increase, market-driven, expected to compound), property tax reassessment +$110k (18% increase, locked in for 3 years until next reassessment), payroll +$35k (general wage inflation, recurring), all other lines roughly on plan. None of this is one-time: the insurance and tax increases are the new run-rate, and payroll growth will continue at ~5% annually. Action plan: (1) refile the property tax appeal — typical recovery is 5-10% of the increase; (2) re-bid the insurance at renewal next year, exploring a higher deductible to claw back ~$15-25k; (3) update the underwriting forward-look to reflect the new OpEx baseline, which compresses the year-5 exit value by ~$1.5M at the same cap rate. Net: this is a structural cost-base reset, not a leasing or operations failure.`,
  rubric: [
    {
      id: 'attributes-to-opex',
      dimension: 'Correctly attributes the miss to OpEx (not revenue) with the math to support it',
      weight: 2,
    },
    {
      id: 'breaks-down-opex',
      dimension: 'Breaks down the OpEx variance by line (insurance, tax, payroll) with specific dollars',
      weight: 1.5,
    },
    {
      id: 'structural-vs-onetime',
      dimension: 'Correctly classifies items as structural (recurring) vs one-time',
      weight: 1.5,
    },
    {
      id: 'action-plan',
      dimension: 'Specific, named actions (tax appeal, insurance re-bid) — not "we will investigate"',
      weight: 1.5,
    },
    {
      id: 'forward-impact',
      dimension: 'Quantifies the forward-look impact on exit value or NOI run-rate',
    },
    {
      id: 'tone',
      dimension: 'LP-appropriate tone: factual, prioritized, no hedging or excuses',
    },
  ],
  takeaway:
    'A good variance memo distinguishes structural shifts (new run-rate) from one-time events; quantifies dollars by line item rather than reporting at the aggregate; and proposes named actions rather than vague follow-ups. LPs read for "did the asset manager understand what happened, and what are they doing about it" — not for fault.',
  tips: [
    'Revenue near-plan + NOI miss = OpEx variance by definition. Don\'t bury that.',
    'Property tax reassessments are structural for 3-5 years until the next cycle. Build it into the run-rate, then appeal.',
    'Insurance increases since 2020 have been 15-30% YoY for many MF assets — market-driven, not asset-specific.',
  ],
};
