import type { SituationalCase } from '../../types/situational';

export const sensitivityFloatingRateDscr: SituationalCase = {
  id: 'sensitivity-floating-rate-dscr',
  title: 'How much rate cushion is in this floating loan?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['mortgageUw', 'assetManagement'],
  assetClass: 'mixed',
  scenario:
    'A $30M interest-only floating-rate loan is priced at SOFR + 300 bps with SOFR at 4.3%, so the all-in rate is 7.3%. In-place NOI is $2.4M. The loan agreement has a 1.05x minimum DSCR test on actual interest.',
  data: [
    { label: 'Loan', value: '$30M, interest-only' },
    { label: 'Rate', value: 'SOFR (4.3%) + 3.00% = 7.3%' },
    { label: 'NOI', value: '$2.4M' },
    { label: 'Covenant', value: '1.05x DSCR' },
  ],
  question: 'About how far can the all-in rate rise before the covenant is breached?',
  options: [
    {
      label: 'About 30 bps — the max rate at 1.05x is ≈ 7.62%.',
      isBest: true,
      explanation:
        'Max annual interest at 1.05x = $2.4M ÷ 1.05 = $2.286M. ÷ $30M = 7.62%. Current 7.30%, so cushion is about 32 bps. Today\'s DSCR is $2.4M ÷ $2.19M ≈ 1.10x, which feels comfortable but is very thin against a floating-rate move.',
    },
    {
      label: 'About 70 bps — the rate at which DSCR hits 1.00x.',
      isBest: false,
      explanation:
        '1.00x break-even is at 8.0%, but the covenant trips at 1.05x, well before that.',
    },
    {
      label: 'About 100 bps — rate shocks are usually 100 bps.',
      isBest: false,
      explanation:
        'A standard shock is a good stress test, but the cushion should be computed from the covenant. Here a 100 bps shock would take DSCR to ~0.96x.',
    },
    {
      label: 'There is no cushion issue because the loan is interest-only.',
      isBest: false,
      explanation:
        'Interest-only helps the amortization portion but floating interest is the exposure here, and a small move would breach.',
    },
  ],
  takeaway:
    'Cushion = max covenant rate − current rate, where max rate = NOI ÷ (covenant DSCR × loan). With floating debt, 1.10x looks safe but may be under 50 bps from the trigger. Check whether a rate cap is in place.',
  tips: [
    'Break-even rate = NOI ÷ loan.',
    'Compare cushion in bps with the rate cap strike.',
    'Ask whether NOI growth could offset rate increases (and when).',
  ],
};
