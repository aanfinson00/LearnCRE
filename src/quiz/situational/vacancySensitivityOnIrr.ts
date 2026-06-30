import type { SituationalCase } from '../../types/situational';

export const vacancySensitivityOnIrr: SituationalCase = {
  id: 'vacancy-sensitivity-on-irr',
  title: 'Vacancy runs 5% above plan — what does that do to levered IRR?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "Your base-case underwrites a stabilized 150,000 SF office asset at 92% occupancy, $32/SF net rent, yielding $4.43M NOI (gross rent less vacancy and 30% opex). The asset was purchased at a 6.0% going-in cap ($73.8M). You're 18 months into a 5-year hold. Actual occupancy has run at 87% — 5 percentage points below plan — due to one tenant's downsizing. Both the going-in and exit cap are modeled at 6.0% / 6.5% respectively. Debt: $48M at 6.75% I/O.",
  data: [
    { label: 'GLA', value: '150,000 SF' },
    { label: 'Underwritten occupancy', value: '92%' },
    { label: 'Actual occupancy (18 mos)', value: '87%' },
    { label: 'Net rent', value: '$32/SF' },
    { label: 'Going-in cap', value: '6.0% ($73.8M)' },
    { label: 'Exit cap (modeled)', value: '6.5%' },
    { label: 'Debt', value: '$48M · 6.75% I/O' },
    { label: 'Loan constant (I/O)', value: '$3.24M/yr' },
  ],
  question:
    'Quantify the NOI impact of running 5% below occupancy plan and estimate the direction of the IRR impact vs. base case.',
  options: [
    {
      label:
        "5 ppts below plan on 150,000 SF = 7,500 SF of extra vacant space. At $32/SF net rent, that's $240k/yr of lost NOI. On a $4.43M base-case NOI, actual NOI ≈ $4.19M. At a 6.5% exit cap, the 5-year exit value drops from $4.43M / 0.065 = $68.2M (base) to $4.19M / 0.065 = $64.5M — a $3.7M reduction in exit value. After $48M of debt repayment, equity proceeds drop ~$3.7M. On a ~$25.8M equity investment (LTV-implied), that's roughly a 14–15% IRR base case compressing to 10–11% — a meaningful impact from a seemingly small occupancy miss.",
      isBest: true,
      explanation:
        "The NOI math: 5 ppts × 150,000 SF = 7,500 SF vacant × $32/SF = $240k/yr revenue shortfall. After opex (30% ratio — but note opex is largely fixed, so the NOI hit is closer to the full $240k on net rent). Actual NOI ≈ $4.19M. Exit value at 6.5% cap: $4.19M / 0.065 = $64.5M vs. $68.2M in base case = $3.7M of value erosion at exit. In addition, the annual cash flow shortfall is $240k/yr × 3.5 remaining years = $840k of cumulative NOI shortfall through hold. Total equity impact: ~$4.5M reduction in combined cash flow + proceeds. On ~$25.8M of equity, this compresses IRR materially. The lesson: vacancy sensitivity compounds through both the annual cash flow stream AND the exit value (which is the dominant driver at reasonable cap rates).",
    },
    {
      label:
        "5 ppts occupancy is a small miss — at 150,000 SF, that's about 7,500 SF of vacancies, worth maybe $240k in rent. On an asset this size, that's sub-6% NOI impact and essentially a rounding error.",
      isBest: false,
      explanation:
        "$240k of NOI miss is not a rounding error — at a 6.5% exit cap, it translates to $3.7M of value at exit. On a 65% LTV deal, every dollar of exit value lost flows directly to equity. The capitalization effect is what makes vacancy sensitivity dramatically larger than the annual NOI miss suggests: $240k/yr becomes $3.7M of exit value at typical office cap rates.",
    },
    {
      label:
        "The impact depends entirely on whether the vacant space is re-leased before exit — model two scenarios (re-leased in Year 3 vs. Year 5) rather than assuming the miss is permanent.",
      isBest: false,
      explanation:
        "Scenario modeling is a good secondary step but this answer avoids quantifying the current state. The question asks you to estimate the impact of running 5% below plan for 18 months and through the hold period. The best response quantifies the downside case (vacancy persists) as the baseline stress test, then uses re-leasing scenarios as upside. Starting with 'it depends' instead of a number is a common analyst deflection.",
    },
    {
      label:
        "The levered IRR effect is minimal because debt is I/O — you're not losing equity from principal paydown, so the hold-period cash shortfall is the only real impact.",
      isBest: false,
      explanation:
        "I/O debt means the principal balance doesn't amortize, but the exit value is still impaired because NOI at exit is $240k lower. The sale proceeds at exit (from which you repay the $48M balance) are reduced by $3.7M — that's the dominant IRR driver on a 5-year exit, not the annual cash flow shortfall. I/O debt amplifies equity exposure to exit value changes because the entire principal is due at exit on a lower-value asset.",
    },
  ],
  takeaway:
    "Vacancy sensitivity analysis should run two pass-throughs: (1) the annual cash flow impact (ppts miss × SF × net rent) and (2) the exit value impact (capitalized NOI miss at exit cap rate). On typical commercial assets, the exit value effect is 4–6x the annual cash flow effect at 6–7% cap rates. This is why a 5 ppt occupancy miss that looks small on a per-year basis can translate to a 3–4% IRR compression on a 5-year hold.",
  tips: [
    'Exit value sensitivity = annual NOI miss / exit cap rate. At 6.5% cap: $240k miss ÷ 0.065 = $3.7M value loss.',
    'Levered IRR sensitivity is amplified by LTV — at 65% LTV, a $3.7M value loss hits $3.7M of equity (not $3.7M ÷ 35%).',
    'Run a 3-scenario occupancy table: base (92%), bear (87%), severe (82%). The IRR table is the most credible sensitivity your IC can act on.',
  ],
};
