import type { SituationalCase } from '../../types/situational';

export const distressedLoanWorkout: SituationalCase = {
  id: 'distressed-loan-workout',
  title: 'Buying a distressed CRE loan — when does it pencil?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'office',
  scenario:
    'A regional bank is offering a non-performing $40M senior loan on a Class-B office building. Original loan: $40M at 4.5%, 4 years remaining. Borrower hasn\'t paid in 2 quarters. The asset\'s estimated current value is $30M (loan is 33% under-water). The bank wants to clear it. They\'re asking $24M (a 40% discount to face).',
  data: [
    { label: 'Loan face', value: '$40M (senior)' },
    { label: 'Asset current value', value: '~$30M' },
    { label: 'Asking price', value: '$24M (60¢ on the dollar)' },
    { label: 'Borrower status', value: 'Non-performing (2 missed quarters)' },
    { label: 'Lien position', value: '1st mortgage' },
  ],
  question: 'How do you frame whether $24M is a buy?',
  options: [
    {
      label:
        'The buy thesis is "loan-to-own" or "loan-to-collect": at $24M your basis is 80% of asset value ($24M / $30M), so even in a foreclosure scenario you\'re likely whole. Price the deal off two paths — workout (collect interest at improved terms) or foreclosure (own the asset at $24M / $30M = 80% basis). If the foreclosure path produces an acceptable IRR, the loan workout is upside.',
      isBest: true,
      explanation:
        'Distressed loan buying is dual-path math: (1) the *collect* path — borrower works through, pays modified interest, you earn yield; (2) the *own* path — you foreclose and own the asset at your basis. The buy thesis works when the *own* path alone produces an acceptable return. At $24M basis on a $30M asset, you\'re acquiring at 80% of value with optionality on a workout. If you can\'t accept the foreclosure outcome, don\'t buy the loan. Sophisticated debt-fund underwriting always shows both paths in the IC memo.',
    },
    {
      label: 'Pass — the asset is worth $30M and the loan is $40M. There\'s no recovery on the $10M shortfall.',
      isBest: false,
      explanation:
        'Misreads the buy. You\'re not paying $40M; you\'re paying $24M. Your basis is $24M against a $30M asset, which is the relevant comparison. The $40M face is what the original lender lost; the buyer\'s basis is what determines the buyer\'s outcome.',
    },
    {
      label: 'Buy at $24M — the bank wouldn\'t sell at a 40% discount unless they had to. Asymmetric upside.',
      isBest: false,
      explanation:
        'Right answer for the wrong reason. "Bank wouldn\'t sell unless they had to" is a heuristic, not a financial test. The buy needs to pencil on the foreclosure path *as the conservative case*, not as a worst-case. Distressed funds get burned when they buy on the seller\'s motivation rather than on basis math.',
    },
    {
      label: 'Negotiate down to $20M; at $30M asset value, $20M basis is the right entry for foreclosure protection.',
      isBest: false,
      explanation:
        'A negotiation tactic, not a buy/no-buy decision framework. Whether $24M or $20M is the right basis depends on the foreclosure timeline, legal costs, and your IRR hurdle. Going in with "lower is always better" without sizing the workout / own paths is generic; the actual analysis is path-by-path return at varying basis.',
    },
  ],
  takeaway:
    'Distressed CRE loan investing = own-path-or-collect-path math. Compute the IRR at your basis assuming foreclosure (asset becomes yours at the basis price); compute the IRR assuming a workout (modified terms, asset stays with the borrower). Buy when the *worse* of the two paths still hits your hurdle. Basis discipline matters more than face-discount headlines.',
  tips: [
    'Senior loan + asset value > basis = "loan to own" upside. Junior position changes the math entirely.',
    'Foreclosure timeline + legal costs eat 5-15% of asset value depending on jurisdiction.',
    'Always model the workout path with explicit interest-rate concessions and a longer maturity.',
  ],
};
