import type { SituationalCase } from '../../types/situational';

export const refiRateSensitivity: SituationalCase = {
  id: 'refi-rate-sensitivity',
  title: 'The refi rate is 200 bps higher — does the deal still work?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUnderwriting'],
  assetClass: 'mixed',
  scenario:
    'Your 5-year hold model assumes a refi at loan maturity at a 6.5% interest rate. The current 5-year treasury is 4.2% and forward rates suggest it could be 5.0%–6.0% in 5 years. A credit officer asks: what happens to levered IRR if the refi rate is 8.5% (200 bps higher than assumed) and you have to refi to stay in the deal? In the base case: NOI at year 5 is $2.1M, and the modeled refi loan at 6.5% is sized to 1.25x DSCR.',
  data: [
    { label: 'Year-5 NOI', value: '$2,100,000' },
    { label: 'Base refi rate', value: '6.5%' },
    { label: 'Stressed refi rate', value: '8.5% (+200 bps)' },
    { label: 'DSCR requirement', value: '1.25x' },
    { label: 'Loan constant (6.5%, 25-yr am)', value: '~8.5%' },
    { label: 'Loan constant (8.5%, 25-yr am)', value: '~10.3%' },
  ],
  question: 'What is the most important downstream effect of the 200 bps rate stress at refi?',
  options: [
    {
      label: 'The refi proceeds drop significantly — at 8.5% with 1.25x DSCR, the loan constant is ~10.3%, so the max debt service is $1.68M, supporting ~$16.3M of debt vs ~$20.0M at 6.5%. That\'s a $3.7M equity gap that requires either additional equity, a partial sale, or accepting a shorter hold.',
      isBest: true,
      explanation:
        'The mechanism: DSCR-constrained loan sizing = NOI ÷ (DSCR × loan constant). At 6.5%: $2.1M ÷ (1.25 × 0.085) = $19.8M. At 8.5%: $2.1M ÷ (1.25 × 0.103) = $16.3M. The gap is $3.5M of equity the sponsor must cover at refi. That either dilutes IRR, forces a sale instead of a refi, or requires a GP cash contribution — all of which are material IC considerations. In bridging the gap through a forced sale, you may be selling at an unfavorable time in the cycle.',
    },
    {
      label: 'IRR falls by roughly 2% because the higher rate costs ~$200k/yr in additional debt service.',
      isBest: false,
      explanation:
        'The IRR impact is real but this framing misses the bigger problem: it\'s not just a higher debt service cost, it\'s a smaller loan. The refi proceeds shortfall can be multiple times the annual debt service impact and may force a sale, equity recapture, or structure change. The rate sensitivity is primarily a loan sizing problem, not a cashflow problem.',
    },
    {
      label: 'The DSCR test is the binding constraint — run the deal with a smaller loan and model the residual equity.',
      isBest: false,
      explanation:
        'This describes the right analytical direction but stops short of the conclusion. The answer should quantify the gap ($3.5–4M), not just describe the test. Correct identification of the constraint is step 1; the stress test requires the number.',
    },
    {
      label: 'Stress tests at 200 bps are unrealistic — the Fed rarely moves that far between now and a 5-year hold exit.',
      isBest: false,
      explanation:
        'In 2022, the Fed moved 425 bps in 12 months. A 200 bps rate move over 5 years is not a tail event — it\'s within normal historical rate variability. Dismissing the stress test based on likelihood misses the point: the question is what happens *if* the scenario occurs, not how probable it is.',
    },
  ],
  takeaway:
    'Rate sensitivity at refi is primarily a loan sizing risk, not just an interest cost risk. Higher rates compress the DSCR-constrained loan amount, creating an equity gap that can alter the entire exit strategy. Model refi proceeds at stressed rates, not just debt service cost — the loan size change is usually the bigger number.',
  tips: [
    'Loan sizing at DSCR = NOI ÷ (DSCR × loan constant); know the loan constant at multiple rates.',
    'A 200 bps rate increase typically reduces DSCR-constrained loan proceeds by 15–25% on a 5-yr hold.',
    'If the refi equity gap exceeds 10% of initial equity, flag it in the IC memo as a structural risk.',
  ],
};
