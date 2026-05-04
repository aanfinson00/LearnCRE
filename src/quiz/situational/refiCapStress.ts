import type { SituationalCase } from '../../types/situational';

export const refiCapStress: SituationalCase = {
  id: 'refi-cap-stress',
  title: 'Stress-testing a permanent loan for refi at maturity',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['mortgageUw'],
  assetClass: 'office',
  scenario:
    'You\'re underwriting a 5-year permanent loan on a stabilized office asset. Going-in cap is 6.5%; the loan sizes to 65% LTV at a 1.30x DSCR + 9% debt yield. Today\'s market is steady, but you need to confirm the loan will refi cleanly at maturity — even if cap rates widen and rates rise.',
  data: [
    { label: 'Going-in cap', value: '6.5%' },
    { label: 'LTV at close', value: '65%' },
    { label: 'DSCR / debt yield', value: '1.30x / 9.0%' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Today\'s 5-yr Treasury', value: '~4.5%' },
  ],
  question: 'What\'s the tightest refi-stress test you should run?',
  options: [
    {
      label:
        'Cap-stress to +100 bps (exit 7.5%), rate-stress to +150 bps, and confirm the same loan amount still passes 1.20x DSCR + 8% debt yield against trended NOI. If it doesn\'t, size lower today.',
      isBest: true,
      explanation:
        'Refi-stress is a 5-years-from-now exercise. Three variables move: NOI (uncertain — trend or hold flat), cap rate (typically widens 75-150 bps for stabilized office in a stress scenario), and rate (varies, but +100-200 bps is the conservative band). Test the *same loan amount* against degraded numbers. If you size today at 65% LTV / 1.30x and it fails 1.20x at refi-stress, you\'re over-leveraged for a 5-year hold. Drop LTV at close until refi pencils.',
    },
    {
      label: 'Test only the rate move — cap rates have been stable for 8 years and shouldn\'t materially shift in 5.',
      isBest: false,
      explanation:
        'Cap rates are the dominant refi-stress variable for stabilized assets. Even if rates stay flat, a 100 bps cap widening drops the implied value 13-15% and pushes LTV well above 65%. Ignoring the cap-stress side of the test is the most common refi-modeling mistake.',
    },
    {
      label: 'Run the stress test with NOI growth at 0% (flat) and call that conservative enough — every other variable should be modeled at today\'s levels.',
      isBest: false,
      explanation:
        'Flat NOI is the WRONG conservative — flat-NOI scenarios actually flatter the deal because at the same cap rate, you\'re refi\'ing against the same value (no decline). The downside scenarios are NOI-flat-PLUS-cap-widening, which pushes LTV up. Always pair the assumptions: NOI movement + cap movement + rate movement.',
    },
    {
      label: 'Stress only the debt yield test — DSCR is already conservative because rates would have to triple to fail it.',
      isBest: false,
      explanation:
        'False on DSCR being safe. If rates move +200 bps, the loan constant rises and DSCR drops materially. And the debt-yield-only test misses the cap-stress side of the equation. Comprehensive refi-stress tests all three (NOI, cap, rate) simultaneously, not one in isolation.',
    },
  ],
  takeaway:
    'Refi-stress is the most under-rated test in lender underwriting. Run it against the *same loan amount* with a triple-degraded forward picture: flat or modestly down NOI, +75-150 bps cap widening, +100-200 bps rate move. If DSCR or debt yield fails the lender\'s refi threshold (typically 1.20x and 8%), size lower today. Banks that skip this test get burned in the second half of every cycle.',
  tips: [
    'Office cap-stress: +100-150 bps; industrial/MF: +50-100 bps; retail: +75-150 bps depending on tenant credit mix.',
    'Refi DSCR threshold is typically lower than origination (1.20x vs 1.30x) — the loan has been seasoned.',
    'If the deal only refis at zero stress, you\'re depending on every variable cooperating for 5 years. Lenders don\'t.',
  ],
};
