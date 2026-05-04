import type { SituationalCase } from '../../types/situational';

export const devLtcVsLtv: SituationalCase = {
  id: 'dev-ltc-vs-ltv',
  title: 'Construction loan: when does LTC bind vs LTV?',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['development', 'mortgageUw'],
  assetClass: 'mixed',
  scenario:
    'You\'re sizing a construction loan on a $50M total project cost (TPC). The lender quotes 65% LTC and 60% LTV-on-stabilized-value. Stabilized NOI is projected at $4M; market cap is 5.5%. The construction loan converts to permanent at certificate of occupancy.',
  data: [
    { label: 'TPC', value: '$50M' },
    { label: 'Stabilized NOI', value: '$4M' },
    { label: 'Market cap (stabilized)', value: '5.5%' },
    { label: 'LTC limit', value: '65%' },
    { label: 'LTV-on-stabilized limit', value: '60%' },
  ],
  question: 'Which test binds the loan size, and what does the lender lend?',
  options: [
    {
      label:
        'LTV binds at $43.6M (60% × $72.7M stabilized value), but LTC binds tighter at $32.5M (65% × $50M TPC). Lender lends $32.5M because both tests must pass and LTC is more restrictive.',
      isBest: true,
      explanation:
        'Two-constraint sizing — calculate both, the more restrictive wins. LTC = 65% × $50M = $32.5M. Stabilized value = $4M / 5.5% = $72.7M; LTV = 60% × $72.7M = $43.6M. LTC is tighter, so it binds. The lender will lend $32.5M, not $43.6M. This is the typical pattern for *value-creating* developments: the asset is worth more once stabilized than the cost to build it (that\'s the whole point), so LTC binds. If TPC > stabilized value (a deal that destroys value), LTV would bind instead — which is also a signal not to build.',
    },
    {
      label: 'LTV binds because $43.6M > $32.5M — the lender lends the larger amount, $43.6M.',
      isBest: false,
      explanation:
        'Inverts the rule. Two-constraint loan sizing always picks the *smaller* of the two — both tests must pass for the loan to underwrite. The borrower wants the larger amount; the lender, the smaller. Lender protection wins.',
    },
    {
      label: 'LTV binds at $43.6M; the LTC limit is just a guideline and lenders will exceed it for strong sponsors.',
      isBest: false,
      explanation:
        'LTC is a hard constraint on most construction loans, not a guideline. Lenders use it as a "skin in the game" test — the borrower must put real equity into the deal proportional to total cost. Sponsor strength can shift terms (rate, recourse) but rarely the LTC floor.',
    },
    {
      label: 'Lender lends the average of the two limits ($38M) to balance LTC and LTV concerns.',
      isBest: false,
      explanation:
        'Not how dual-constraint sizing works. The two limits aren\'t averaged; the deal must satisfy BOTH simultaneously. Treating them as independent and averaging would routinely produce loans that fail one or both constraints at refi.',
    },
  ],
  takeaway:
    'Construction debt sizes to MIN(LTC, LTV-on-stabilized). LTC almost always binds for value-creating developments because TPC < stabilized value (that\'s the dev spread). When LTV binds instead, your stabilized value isn\'t materially above your cost — re-examine the deal. The borrower brings (1 − binding%) × TPC of equity to fund the gap.',
  tips: [
    'LTC limits: 60-65% institutional core dev; 55-60% value-add / repositioning; 50-55% spec / less-stabilized markets.',
    'LTV-on-stabilized: 55-65% range; tighter the riskier the lease-up.',
    'When LTV binds in your model, the deal\'s economics are weak — investigate before pushing for more leverage.',
  ],
};
