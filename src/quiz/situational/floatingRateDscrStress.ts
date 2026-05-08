import type { SituationalCase } from '../../types/situational';

export const floatingRateDscrStress: SituationalCase = {
  id: 'floating-rate-dscr-stress',
  title: "What happens to DSCR if rates rise 200 bps?",
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'debt'],
  assetClass: 'mixed',
  scenario:
    "A sponsor underwrote a $20M bridge loan at SOFR + 250 bps. At closing, the all-in rate was 5.75% (SOFR at 3.25%). The loan has a 3-year IO period. NOI at closing was $1,250,000, producing a 1.25× DSCR — barely inside the lender's 1.20× covenant. Since closing, SOFR has risen 200 bps to 5.25%. NOI has been flat.",
  data: [
    { label: 'Loan amount', value: '$20,000,000' },
    { label: 'Spread', value: 'SOFR + 250 bps' },
    { label: 'SOFR at closing', value: '3.25% → 5.25% today' },
    { label: 'All-in rate at closing', value: '5.75%' },
    { label: 'All-in rate today', value: '7.75%' },
    { label: 'NOI', value: '$1,250,000 (flat)' },
    { label: 'IO period', value: '3 years' },
    { label: 'Lender DSCR covenant', value: '1.20×' },
  ],
  question: "Has the DSCR covenant been breached, and what is today's DSCR?",
  options: [
    {
      label:
        "Today's debt service is $20M × 7.75% = $1,550,000. DSCR = $1,250,000 ÷ $1,550,000 = 0.81×. The covenant is breached by a wide margin — the sponsor is in potential default unless NOI improves or an interest rate cap triggers.",
      isBest: true,
      explanation:
        "IO loan annual debt service = principal × all-in rate = $20M × 7.75% = $1.55M. DSCR = $1.25M ÷ $1.55M ≈ 0.81×. That's nearly 40 bps below the 1.20× covenant. This is a common floating-rate trap: a deal that barely cleared at closing can slip into default without any operational change. Rate cap protection would have paid out here if the cap strike was below 5.25% SOFR.",
    },
    {
      label:
        "DSCR is still 1.25× — IO loans don't have changing debt service, they just pay interest.",
      isBest: false,
      explanation:
        "Incorrect. IO loans pay interest only (no principal), but the interest payment floats with the index. As SOFR rises 200 bps, the annual interest payment on the $20M loan increases by $20M × 2.00% = $400,000/yr. Debt service went from $1.15M to $1.55M — a 35% increase — while NOI was flat.",
    },
    {
      label:
        "The loan will convert to amortizing at year 3, so today's DSCR doesn't matter for the covenant test.",
      isBest: false,
      explanation:
        "Most floating-rate bridge loans test DSCR throughout the IO period, not just at amortization commencement. The covenant is active now. If it's breached, the lender can declare a cash trap, trigger a cure period, or in a full default scenario, accelerate the loan.",
    },
    {
      label:
        "A 200 bps SOFR move is abnormal — use the stress test only for diligence, not as a live covenant concern.",
      isBest: false,
      explanation:
        "The rate rise isn't hypothetical — it's already happened in the scenario. The DSCR covenant is tested on actual, current debt service. Framing a live breach as a 'stress test scenario' avoids the question. Sponsors who did not buy rate caps on loans originated in 2021–2022 experienced exactly this situation in 2023.",
    },
  ],
  takeaway:
    "Floating-rate IO loans have two sources of DSCR risk: NOI shortfalls and rate increases. A 200 bps rate rise on a $20M loan adds $400K/yr to debt service — enough to turn a passing 1.25× DSCR into a 0.81× breach with zero operational change. Rate cap analysis belongs in every floating-rate acquisition memo.",
  tips: [
    "IO debt service = loan balance × all-in rate; it moves dollar-for-dollar with SOFR changes.",
    "A 100 bps rate rise on a $20M loan = $200K/yr more annual debt service.",
    "Rate caps with a strike below the current index are in-the-money; always check cap payouts first in a stress scenario.",
  ],
};
