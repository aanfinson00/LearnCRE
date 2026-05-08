import type { SituationalCase } from '../../types/situational';

export const valueAddOccupancySensitivity: SituationalCase = {
  id: 'value-add-occupancy-sensitivity',
  title: "Does 1% more occupancy or 6 fewer months matter more?",
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a 200-unit value-add multifamily deal at 82% occupied. Your model stabilizes at 95% occupancy in 24 months, generating a 16% levered IRR. The IC asks you to stress two scenarios independently: (A) stabilization takes 30 months instead of 24, and (B) you only reach 93% occupancy instead of 95%. Average rent is $1,500/mo per occupied unit.",
  data: [
    { label: 'Units', value: '200' },
    { label: 'Going-in occupancy', value: '82%' },
    { label: 'Modeled stabilized occupancy', value: '95%' },
    { label: 'Stabilization timeline', value: '24 months' },
    { label: 'Average rent', value: '$1,500/mo/unit' },
    { label: 'Modeled levered IRR', value: '16%' },
  ],
  question:
    "Which stress scenario — 6 extra months to stabilize, or 2 fewer points of occupancy — is likely to hit the IRR harder?",
  options: [
    {
      label:
        "The 2% occupancy miss (93% vs 95%) is likely a larger IRR hit because it permanently reduces stabilized NOI and therefore the exit valuation, while the 6-month delay is a one-time timing drag that doesn't change the terminal asset value.",
      isBest: true,
      explanation:
        "2% occupancy on 200 units = 4 units × $1,500/mo × 12 = $72,000/yr of permanently lower NOI. At a 5.5% exit cap, that NOI miss reduces exit value by $72K ÷ 5.5% ≈ $1.3M. On a 5-year hold, that terminal value reduction likely moves the IRR 100–150 bps. A 6-month delay in stabilization costs roughly 6 months of carry — higher interest expense and slower cash flows — but the stabilized asset still exits at the same value. The occupancy miss is a permanent impairment; the delay is a temporary drag.",
    },
    {
      label:
        "The 6-month delay is worse — carry costs mount while you're in lease-up and the hold period extension compresses the IRR.",
      isBest: false,
      explanation:
        "The 6-month delay does hurt IRR via carry costs and hold-period extension, but it's a timing drag on a fixed outcome. Once stabilized, the asset exits at the same value. The 2% occupancy miss, on the other hand, reduces the stabilized NOI permanently, which directly lowers the exit value via the cap rate applied to a smaller income stream.",
    },
    {
      label:
        "Both scenarios reduce IRR by roughly the same amount — they affect different parts of the model but in equal magnitude.",
      isBest: false,
      explanation:
        "They're not equal. The occupancy miss compounds into the exit valuation (permanent NOI reduction × 1/cap rate = terminal value hit), while the delay is absorbed as a carry cost with no permanent impairment. On most 5-year value-add deals, a 100–200 bps occupancy miss on stabilized occupancy is a larger IRR mover than a 6-month lease-up extension.",
    },
    {
      label:
        "Run both scenarios in the model before drawing any conclusions — it depends entirely on the specific deal economics.",
      isBest: false,
      explanation:
        "You should be able to reason through the relative magnitude without a model. This question tests whether you understand which lever is more powerful conceptually: permanent value impairment (occupancy miss) vs. temporary timing drag (delay). Knowing the framework is the point — running a sensitivity is a follow-through step, not the primary answer.",
    },
  ],
  takeaway:
    "Stabilized occupancy misses are more damaging than lease-up timing delays because they produce permanent NOI shortfalls that compress exit valuation. A 2-point occupancy miss on a 200-unit deal at a 5.5% exit cap equates to ~$1.3M of lost value — bigger than the carry cost of a 6-month delay on most deals.",
  tips: [
    "Occupancy miss impact: ΔUnits × rent/mo × 12 ÷ exit cap rate = ΔExit value.",
    "Stabilization delay impact: monthly carry cost × extra months.",
    "In value-add deals, stabilized NOI accuracy matters more than timeline precision.",
  ],
};
