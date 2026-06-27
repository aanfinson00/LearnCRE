import type { SituationalCase } from '../../types/situational';

export const multifamilyValueAddCapex: SituationalCase = {
  id: 'multifamily-value-add-capex',
  title: 'Multifamily: is the $15k/unit renovation program earning its cost of capital?',
  category: 'investment-thesis',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're 18 months into a value-add multifamily acquisition. The business plan calls for a $15,000/unit interior renovation (kitchen, bath, LVP flooring) across 240 units, with a projected $250/month rent premium per renovated unit. So far, 80 units have been completed; average achieved rent lift is $195/month. Unrenovated units are turning at 55% annually (above the 40% assumed). Renovation cost has tracked budget at $15,000/unit. Your cost of capital is 8% (fund-level target return).",
  data: [
    { label: 'Total units', value: '240' },
    { label: 'Renovation cost', value: '$15,000/unit' },
    { label: 'Projected rent premium', value: '$250/mo per renovated unit' },
    { label: 'Achieved rent premium (80 units)', value: '$195/mo avg' },
    { label: 'Units completed', value: '80 of 240' },
    { label: 'Turnover rate (actual)', value: '55%/yr (assumed: 40%/yr)' },
    { label: 'Fund target return (cost of capital)', value: '8%' },
  ],
  question:
    "At the achieved $195/month premium, is the renovation program earning its cost of capital, and what do you do about the underperformance vs. the $250 projection?",
  options: [
    {
      label:
        "At $195/month, the renovation is generating $2,340/year of incremental NOI per unit. On a $15,000 cost basis, that's a 15.6% yield on renovation cost — nearly double the 8% cost of capital. The program is creating value even at the lower premium. However, the $55/month shortfall vs. underwriting ($250 projected) means the exit value per unit is $8,250 below plan (at a 5% exit cap: $55/mo × 12 / 5% = $13,200 per unit; at 5.5%: $12,000). Across 240 units, that's a $2.9-3.2M value gap. The right response: continue the program (it's still earning well above cost of capital), but re-underwrite the exit at $195/month and communicate the forecast revision to LPs — don't chase the $250 number with deferred maintenance shortcuts.",
      isBest: true,
      explanation:
        "Right framework. The yield-on-renovation-cost test ($2,340 NOI / $15,000 cost = 15.6%) is how you evaluate capex programs against cost of capital — and 15.6% vs. 8% target is a strong spread. The program is working, just not at the full projected premium. The exit value translation is the other half: the $55/month shortfall at a 5-5.5% exit cap equals $12,000-$13,200 per unit of lost value across 240 units — a material but manageable miss vs. original underwriting. The response is honest re-underwriting, not program abandonment or shortcuts to close the gap.",
    },
    {
      label:
        "The program is underperforming ($195 vs $250) — pause renovations and reassess the market before spending more capital on units that won't achieve underwritten rents.",
      isBest: false,
      explanation:
        "A 15.6% yield on renovation cost vs. 8% cost of capital is significantly above hurdle — pausing a program that's earning 2x cost of capital because it's below a pro-forma projection is a mistake. The question isn't 'did we hit the number' — it's 'is this the best use of capital at our cost of capital.' At $195/month and $15k cost, the answer is clearly yes. A pause also has a momentum cost: renovation programs lose efficiency and contractor relationships when interrupted mid-execution.",
    },
    {
      label:
        "Increase renovation spend to $18,000/unit to achieve higher-quality finishes and close the gap to the $250 projected premium.",
      isBest: false,
      explanation:
        "The problem isn't renovation quality — it's market rent depth. If the market is only paying $195/month premium for the current spec, spending $18,000 to produce a $200-210/month premium (marginal spend rarely has linear returns) doesn't close the gap. Before increasing spend, the question is: what is the limiting factor — property condition, competitive supply offering similar finishes, or simply that the market's rent ceiling is $195? Spending more without diagnosing the revenue constraint is common value-add mistake #1.",
    },
    {
      label:
        "Accept the $195/month and project it forward for all 240 units without communicating the shortfall to LPs — the program is still profitable.",
      isBest: false,
      explanation:
        "Fails on both LP communication and fiduciary standards. Even if the program is profitable above cost of capital, a $55/month shortfall vs. underwritten premium is a material negative variance that LPs are entitled to know about, since it affects the projected exit value by $2.9-3.2M. Burying a known underperformance because the program is 'still profitable' is an LP communication violation and erodes trust when the exit underperforms the original model without prior notice.",
    },
  ],
  takeaway:
    "Value-add renovation programs should be evaluated on yield on renovation cost vs. cost of capital — not solely on whether they hit the original rent projection. A program earning 15.6% on an 8% cost of capital is creating value even at a shortfall vs. underwriting. The exit value impact (shortfall × 12 / exit cap rate × units) is the number to communicate to LPs. Don't chase projected rents with more capex spend without first diagnosing whether the revenue gap is a quality/supply issue or a genuine market-depth constraint.",
  tips: [
    "Yield on renovation cost = annual incremental NOI / renovation cost per unit. Compare to fund cost of capital (hurdle rate) to evaluate program viability.",
    "Exit value impact of rent shortfall: (projected - achieved) × 12 / exit cap rate × units. At 5.5% exit cap, $50/mo shortfall on 200 units = $2.2M value gap.",
    "Turnover rate matters for renovation pace but not for yield on cost — higher turnover accelerates deployment of capex, reducing holding period, but doesn't change the unit economics.",
  ],
};
