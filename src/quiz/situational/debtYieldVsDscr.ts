import type { SituationalCase } from '../../types/situational';

export const debtYieldVsDscr: SituationalCase = {
  id: 'debt-yield-vs-dscr',
  title: 'Same loan passes DSCR but fails debt yield — which wins?',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['mortgageUw'],
  assetClass: 'office',
  scenario:
    'You\'re sizing a permanent loan. NOI is $5.0M; the requested loan is $65M; 30-year amortization at 5.0%. The DSCR test (1.25x threshold) passes at 1.19x — wait, that fails. Let me re-state: the DSCR comes in at 1.31x (passes); the debt yield (NOI / loan = 7.7%) fails the 8.0% threshold. The sponsor argues "DSCR is what matters." How do you respond?',
  data: [
    { label: 'NOI', value: '$5.0M' },
    { label: 'Requested loan', value: '$65M' },
    { label: 'Rate / amort', value: '5.0% / 30 yr' },
    { label: 'DSCR threshold', value: '1.25x — actual 1.31x ✓' },
    { label: 'Debt yield threshold', value: '8.0% — actual 7.7% ✗' },
  ],
  question: 'Which test should govern, and why?',
  options: [
    {
      label:
        'Debt yield governs — DSCR is rate-sensitive and cap-rate-sensitive; debt yield is neither. In a rising-rate environment or a cap-expansion scenario, the loan you\'re sizing today via DSCR may not refinance because the debt yield was actually too aggressive.',
      isBest: true,
      explanation:
        'Debt yield (NOI / loan) is rate- and cap-agnostic — it\'s the lender\'s direct return on the dollar without any leverage assumption. DSCR depends on the loan constant, which depends on the rate; cap rates depend on the market. When rates rise, the same loan amount fails DSCR even with the same NOI. When cap rates widen, the LTV implicit in your DSCR-sized loan exceeds what a refi lender will accept. Debt yield is the "stress-resistant" test and is increasingly the binding constraint at most institutional lenders, especially for 5-year balloons.',
    },
    {
      label: 'DSCR governs — it directly measures whether the borrower can service the debt today.',
      isBest: false,
      explanation:
        'True for the *current* loan but misses the refinance risk. DSCR is a Year-1 measure that flatters loans sized in low-rate environments. The sponsor\'s argument is "we can pay today" — fine, but the lender also needs to believe the deal can refi at maturity, and debt yield is the better proxy for that.',
    },
    {
      label: 'Both govern — the loan is sized to the more-restrictive of the two.',
      isBest: false,
      explanation:
        'Operationally true but doesn\'t answer "why does debt yield bind here?". The deeper answer is that debt yield is the rate-resistant test. Saying "we use both" without explaining the dominance of debt yield in stress scenarios misses the lesson.',
    },
    {
      label: 'DSCR is what banks care about; debt yield is mostly a CMBS/agency thing.',
      isBest: false,
      explanation:
        'Outdated framing. Debt yield has become the binding constraint at most institutional lenders (life cos, banks, debt funds) for stabilized senior debt, especially since the 2022 rate cycle. Saying "banks don\'t care" ignores how lender protection has evolved over the past decade.',
    },
  ],
  takeaway:
    'DSCR tells you "can the borrower pay today?" — debt yield tells you "would another lender finance this deal at maturity?". The second question is the harder protection because rates and cap rates move; debt yield doesn\'t. When DSCR passes but debt yield fails, the loan is rate-sensitive and likely won\'t refi cleanly. Size to the more-restrictive — almost always the debt yield in 2024+ markets.',
  tips: [
    'Debt yield = NOI / loan. Rate-agnostic. Cap-rate-agnostic.',
    'DSCR = NOI / DS. Both rate- and amort-sensitive. Flatters low-rate loans.',
    'Permanent debt: 8.0% debt yield + 1.25x DSCR is a common dual-constraint pair; debt yield usually binds.',
  ],
};
