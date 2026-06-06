import type { SituationalCase } from '../../types/situational';

export const refinanceSensitivityTest: SituationalCase = {
  id: 'refinance-sensitivity-test',
  title: 'Does this deal still refinance if rates move +200 bps?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    "You're evaluating an office acquisition whose business plan relies on a year-3 recapitalization: refinance acquisition debt and return equity to investors while retaining the asset for a 7-year total hold. Acquisition terms: $50M purchase price, $30M (60% LTV) debt at 6.0% interest-only for 3 years. Year-3 projected NOI: $3.2M. The underwritten refi assumes a 6.5% rate and 65% LTV on year-3 value. Lender requires minimum 1.25× DSCR. A senior partner asks: what happens to the recap if rates are +200 bps at year 3?",
  data: [
    { label: 'Purchase price', value: '$50M' },
    { label: 'Acquisition debt', value: '$30M at 6.0% I/O' },
    { label: 'Year-3 projected NOI', value: '$3.2M' },
    { label: 'Refi assumption', value: '6.5% rate, 65% LTV on Y3 value' },
    { label: 'Lender minimum DSCR', value: '1.25×' },
    { label: 'Stress scenario', value: 'Rates +200 bps at year 3' },
  ],
  question: 'Walk through the refinance stress test — can the deal recap at +200 bps?',
  options: [
    {
      label: "At 8.5% rates, the DSCR-constrained max loan shrinks to roughly $27–28M — below the $30M outstanding acquisition debt. The recap fails. You'd receive zero equity back and would need to either hold without recapping or sell. Model this as a binary outcome, not a mild sensitivity.",
      isBest: true,
      explanation:
        "Step through the math. Base-case refi: Year-3 value at 6.5% exit cap on $3.2M NOI = $49.2M; 65% LTV = $32M. At 6.5% rate, 30-yr amortization, loan constant ≈ 7.56%; max debt service at 1.25× DSCR = $3.2M / 1.25 = $2.56M; max loan = $2.56M / 7.56% ≈ $33.9M. Passes — $32M loan clears both LTV and DSCR. Stress: +200 bps = 8.5% rate; loan constant ≈ 9.20%; max DS unchanged at $2.56M; max DSCR-constrained loan = $2.56M / 9.20% ≈ $27.8M. That is $2.2M below the $30M outstanding acquisition debt. The recap doesn't just shrink — it disappears. No equity returned; the deal is trapped until rates normalize or you sell. Report this as a binary failure scenario: the recap either works or it doesn't, and at +200 bps, it doesn't.",
    },
    {
      label: "It's fine — a $28M refi vs. $30M original debt is only a $2M shortfall; investors can contribute a cash-in refi to plug the gap.",
      isBest: false,
      explanation:
        "A cash-in refi is a real option but it's a negative return event — investors put MORE money in rather than getting money back. The entire thesis of a year-3 recap is return of equity. Cash-in is the opposite. Underwrite the cash-in scenario explicitly and tell investors: 'In a +200 bps scenario, the year-3 recap becomes a cash-in event of ~$2M, and no interim distributions occur before year 7.' That's a materially different deal than the base case.",
    },
    {
      label: "+200 bps only matters if cap rates also expand — if cap rates stay at 6.5%, the asset value holds and LTV drives the refi.",
      isBest: false,
      explanation:
        "This misses the binding constraint. Even at flat cap rates ($49M value), 65% LTV = $31.8M loan — which passes LTV. But DSCR is the binding constraint here: at 8.5% rate, the loan constant makes the DSCR-allowed loan (~$27.8M) the actual ceiling, not LTV. Higher rates directly shrink the DSCR-allowed loan amount regardless of what cap rates do.",
    },
    {
      label: "Model a 1-year delay on the recap — if rates normalize by year 4, the stress resolves itself.",
      isBest: false,
      explanation:
        "Rate normalization is a hope, not an assumption. If you're stressing a rate spike scenario, you must also model the possibility it persists. A 1-year delay to year 4 doesn't solve the problem if the rate environment is unchanged. Moreover, 3 more years of I/O on the acquisition loan before any recap has carry-cost and investor-return implications. Build the delay scenario with explicit assumptions — don't assume away the problem.",
    },
  ],
  takeaway:
    "When a business plan depends on an interim refinancing, the stress test is not 'does the refi get smaller?' — it's 'does the refi cover the existing debt?' Below the outstanding acquisition debt, the recap disappears and investor equity is trapped. The key math: max stressed loan = (NOI / minimum DSCR) / stressed loan constant. Compare that to acquisition debt outstanding. Below that line, the recap fails — model it as a binary scenario, not a continuous sensitivity.",
  tips: [
    'Loan constant at 8.5% / 30-yr am ≈ 9.2%; max DSCR-allowed loan = max DS / loan constant.',
    'Max DS = NOI / minimum DSCR (lender floor typically 1.20–1.25×).',
    'When recap fails: equity is trapped; model extended hold and terminal sale as the alternative exit.',
  ],
};
