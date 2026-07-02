import type { SituationalCase } from '../../types/situational';

export const leaseEconExpenseStopBreakeven: SituationalCase = {
  id: 'lease-econ-expense-stop-breakeven',
  title: 'Where\'s your breakeven on this expense stop?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'You\'re negotiating a gross lease with an expense stop set at $9.00/SF (the tenant\'s base-year operating expense level). Above the stop, the tenant reimburses the landlord dollar-for-dollar for their pro-rata share of operating expenses. Current-year building operating expenses are running $9.50/SF, and you\'re forecasting 4% annual OpEx growth. The tenant is negotiating hard to set the stop at $10.50/SF instead, arguing it simplifies their budgeting.',
  data: [
    { label: 'Proposed expense stop (landlord ask)', value: '$9.00/SF' },
    { label: 'Tenant counter', value: '$10.50/SF' },
    { label: 'Current OpEx', value: '$9.50/SF' },
    { label: 'Forecast OpEx growth', value: '4%/year' },
    { label: 'Lease term', value: '7 years' },
  ],
  question: 'What\'s the economic impact of accepting the tenant\'s $10.50/SF counter?',
  options: [
    {
      label:
        'Every dollar the stop sits above current OpEx is landlord-absorbed expense with no reimbursement, and it also delays when reimbursements start — at $9.00/SF the landlord is already collecting on the $0.50/SF gap to current OpEx in year 1, while at $10.50/SF, OpEx (starting at $9.50/SF and growing 4%/year) doesn\'t cross the stop until roughly year 3.',
      isBest: true,
      explanation:
        'An expense stop only triggers reimbursement once actual OpEx exceeds it. At a $9.00/SF stop, OpEx starting at $9.50/SF already exceeds the stop in year 1, so the tenant reimburses ~$0.50/SF immediately, growing each year as OpEx rises 4%. At a $10.50/SF stop, OpEx has to grow from $9.50 to $10.50/SF before any reimbursement kicks in — at 4%/year that takes roughly (10.50/9.50 − 1) ÷ 0.04 ≈ 2.6 years, so the landlord essentially fully absorbs OpEx for the first 2-3 years of a 7-year term. That\'s a materially different economic deal than the $1.50/SF gap makes it look like on paper.',
    },
    {
      label: 'The stop level is basically a rounding difference ($1.50/SF) and doesn\'t meaningfully change the deal economics over a 7-year term.',
      isBest: false,
      explanation:
        'Understates the impact by ignoring the timing effect. It isn\'t just $1.50/SF less collected each year — a higher stop delays the reimbursement start date by years, compounding the lost recovery over the front half of the term when the gap between OpEx and the stop is largest in relative terms.',
    },
    {
      label:
        'Push back on the counter by offering annual stop escalations of 4% instead of a fixed stop, which achieves the same tenant goal of budget predictability without the landlord absorbing years of OpEx growth.',
      isBest: false,
      explanation:
        'Mixes up two different lease structures. Escalating a fixed stop by a set percentage each year is unusual and not what "expense stop" conventionally means (the stop is normally fixed at the base-year level for the life of the lease); it also isn\'t responsive to the actual ask, which is about the initial dollar level, not the escalation mechanism. It\'s a plausible-sounding but structurally confused alternative.',
    },
    {
      label: 'Accept the $10.50/SF stop since it\'s still above current OpEx of $9.50/SF, meaning the landlord isn\'t underwater on day one.',
      isBest: false,
      explanation:
        'Being "above current OpEx" doesn\'t mean the landlord is being made whole — it means the tenant is fully covered and the landlord is absorbing 100% of OpEx (including growth) until the stop is crossed. "Not underwater on day one" is a low bar; the real test is when reimbursement starts and how much cumulative expense the landlord absorbs before then.',
    },
  ],
  takeaway:
    'An expense stop\'s economic impact isn\'t just the dollar gap versus current OpEx — it\'s also a timing question: how many years pass, at your OpEx growth assumption, before reimbursement starts. A stop set above current OpEx can mean years of zero recovery, not just a slightly worse number.',
  tips: [
    'Solve for the year the stop is "crossed" using OpEx growth ÷ percent gap — that\'s when reimbursement actually starts.',
    'A stop set at or below current OpEx starts reimbursing immediately; above it delays recovery, sometimes for years.',
    'Model cumulative unreimbursed OpEx over the full term, not just the year-one gap, before agreeing to a stop level.',
  ],
};
