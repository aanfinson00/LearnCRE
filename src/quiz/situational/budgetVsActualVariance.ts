import type { SituationalCase } from '../../types/situational';

export const budgetVsActualVariance: SituationalCase = {
  id: 'budget-vs-actual-variance',
  title: 'Q3 expenses ran 12% over budget — how do you investigate?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'portfolioMgmt'],
  scenario:
    'You\'re presenting Q3 results to the LPs. Total OpEx came in 12% above plan ($1.34M actual vs $1.20M budget on a $4M revenue base). Revenue and occupancy were on plan. The LP IC asks "where did the variance come from?" Your initial PnL summary just shows "OpEx $1.34M (Budget $1.20M)" with no further breakdown.',
  data: [
    { label: 'Revenue', value: '$4M (on plan)' },
    { label: 'Occupancy', value: '95% (on plan)' },
    { label: 'OpEx budget', value: '$1.20M' },
    { label: 'OpEx actual', value: '$1.34M' },
    { label: 'Variance', value: '+$140k (+12%)' },
  ],
  question: 'How do you structure the variance investigation for the LP IC?',
  options: [
    {
      label:
        'Pull the OpEx ledger by line item; classify each variance into one of four buckets: (1) controllable vs uncontrollable, (2) recurring vs one-time, (3) volume-driven (occupancy-related) vs fixed, (4) timing (Q3 paid early/late). Identify the top 3 variance drivers by dollar magnitude and explain each. Aggregate variance commentary, not "OpEx was 12% over."',
      isBest: true,
      explanation:
        'Variance analysis discipline: never report at the aggregate level when LPs ask "where did it come from?" The four-bucket framework drives the right narrative: (1) **controllable** vs uncontrollable (Insurance premium reset = uncontrollable; landscaping over-spend = controllable); (2) **recurring** vs one-time (HVAC service contract increase = recurring; one-time legal fee for a tenant dispute = one-time); (3) **volume** vs fixed (utilities scale with vacancy; property management is fixed); (4) **timing** (an annual maintenance bill paid in Q3 instead of Q4). Top 3 drivers by dollar amount usually explain 80% of variance. The narrative is what the LP needs, not the line-item dump.',
    },
    {
      label: 'Compare to prior year same quarter — if last year\'s Q3 ran 10% over budget too, the variance is "normal seasonality" and not concerning.',
      isBest: false,
      explanation:
        'Prior-year comparison is useful as one input but not as the explanation. Two consecutive years of Q3 overrun could mean either (a) the budget systematically under-budgets Q3 (fixable in next year\'s budget) or (b) a recurring real cost bucket the LPs should know about. Either way, attributing variance to "seasonality" without naming the specific drivers is hand-waving.',
    },
    {
      label: 'Show the variance as a % of revenue — 12% of OpEx vs $4M revenue = 3.5% revenue impact. That\'s within typical operating tolerance.',
      isBest: false,
      explanation:
        'Quantifies but doesn\'t explain. The LP\'s question is "what happened?" not "is it big?" The 3.5% revenue framing is useful as context once you\'ve identified the drivers; it\'s not a substitute for the variance investigation.',
    },
    {
      label: 'Add a "$140k OpEx variance — under investigation" line to the report and follow up next quarter when more data is available.',
      isBest: false,
      explanation:
        'Punting variance to the next quarter erodes LP trust. The variance is identifiable from the GL today; the work is line-item analysis + categorization, not waiting. "Under investigation" is acceptable on Day 1 of the variance hitting the books, not in the LP report 3 weeks after quarter-close.',
    },
  ],
  takeaway:
    'Variance analysis is about narrative, not just numbers. Classify each variance into controllable/uncontrollable, recurring/one-time, volume/fixed, timing — then surface the top 3 dollar drivers with explanations. LPs don\'t want the GL; they want the answer to "what happened, what does it mean, and what are you doing about it?"',
  tips: [
    'Top 3 dollar drivers usually explain 70-90% of total variance — focus there.',
    'Insurance + property tax = the two biggest line items at most assets and the most common variance sources.',
    'Recurring + uncontrollable variances should update the next year\'s budget; one-time should not.',
  ],
};
