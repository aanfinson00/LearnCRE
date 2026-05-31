import type { SituationalCase } from '../../types/situational';

export const specPreLeasingThreshold: SituationalCase = {
  id: 'spec-pre-leasing-threshold',
  title: 'When do you pull the trigger on a spec industrial development?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You are evaluating a 500,000 SF spec industrial development in a tight submarket (3% vacancy). Total development cost is $60M. Your construction lender requires at least 30% pre-leasing to fund at 60% LTC. Your equity partner targets a 20% unlevered yield-on-cost at stabilization. Market rents are $7.50/SF NNN. You have a term sheet from a credit tenant for 200,000 SF at $7.25/SF on a 10-year lease.',
  data: [
    { label: 'Development size', value: '500,000 SF' },
    { label: 'Total development cost', value: '$60M' },
    { label: 'Lender pre-leasing requirement', value: '30% (150,000 SF minimum)' },
    { label: 'Market rent', value: '$7.50/SF NNN' },
    { label: 'Tenant term sheet', value: '200,000 SF at $7.25/SF NNN, 10-yr' },
    { label: 'Submarket vacancy', value: '3%' },
    { label: 'Equity yield-on-cost target', value: '20% unlevered' },
  ],
  question:
    'Does the tenant term sheet justify proceeding with the development?',
  options: [
    {
      label:
        'The 200,000 SF term sheet clears the lender\'s 30% pre-leasing gate and rents are within 3% of market — acceptable. The go/no-go decision turns on whether the remaining 300,000 SF spec lease-up, at a realistic pace, produces the 20% yield-on-cost target.',
      isBest: true,
      explanation:
        'Three gates to evaluate: (1) Lender: 200,000 SF = 40% pre-leased, clearing the 30% minimum. (2) Rent: $7.25 vs. $7.50 market is a 3.3% discount — within normal pre-lease negotiation range; the certainty of pre-leasing has risk-reduction value. (3) Returns: stabilized NOI at blended $7.40 × 90% occupancy factor × 500,000 SF ≈ $3.33M. At a 5.5% stabilized cap, implied value ≈ $60.6M vs. $60M cost — the math is tight. The critical sensitivity is spec lease-up timing: if the remaining 300,000 SF takes 18–24 months, interest carry during the lease-up significantly erodes the unlevered yield. Model the lease-up stress case at 24 months to confirm the equity return gate still clears.',
    },
    {
      label:
        'The 3.3% rent discount makes the deal non-viable — Day 1 tenants must sign at full market rent.',
      isBest: false,
      explanation:
        'A below-market pre-lease discount is common and often justified — the certainty of pre-leasing reduces project risk and provides lender confidence that partially offsets the rent concession. The real test is whether blended stabilized rents meet the yield-on-cost target, not whether the pre-lease tenant signed at spot market.',
    },
    {
      label:
        'Proceed immediately — 40% pre-leased in a 3% vacancy market means the remaining space will lease without difficulty.',
      isBest: false,
      explanation:
        '"Will lease without difficulty" is not an underwriting standard. Even in a tight market, you must model the spec lease-up timeline and interest carry cost during the unleasedperiod. 3% submarket vacancy is favorable context, not a guarantee.',
    },
    {
      label:
        'Decline — spec industrial requires 100% pre-leasing before breaking ground to eliminate demand risk.',
      isBest: false,
      explanation:
        'Spec industrial development in tight markets is a standard strategy; most construction lenders set pre-leasing thresholds at 30–50%, not 100%. A 40% pre-leased position with a credit tenant in a 3% vacancy submarket is a well-above-threshold starting point for proceeding.',
    },
  ],
  takeaway:
    'The spec development decision has three gates: (1) lender pre-leasing threshold, (2) acceptable rent versus market, and (3) returns under realistic lease-up assumptions. All three must clear. The pre-leasing gate is the easiest to verify; the return stress test on the remaining spec lease-up is the harder and more critical analysis.',
  tips: [
    'Typical construction lender pre-leasing requirement: 30–50% of total SF.',
    'Spec lease-up timing: model 12–24 months for remaining space even in a tight market.',
    'Unlevered yield-on-cost target for industrial development: typically 15–20%+.',
  ],
};
