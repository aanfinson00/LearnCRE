import type { SituationalCase } from '../../types/situational';

export const compClassAdjustment: SituationalCase = {
  id: 'comp-class-adjustment',
  title: 'Only Class-A comps are available — how do you adjust for a Class-B subject?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re pricing a 180,000 SF Class-B office asset in a CBD submarket. There are no recent Class-B trades — the only relevant comps are 3 Class-A transactions in the same submarket from the past 9 months, trading at cap rates of 5.25%, 5.5%, and 5.75%. Class-B vacancy runs 4–5 points higher than Class-A in this market; Class-B rents are $10–12/SF below Class-A.',
  data: [
    { label: 'Subject', value: '180k SF, Class-B CBD office' },
    { label: 'Class-A comps', value: '3 trades: 5.25% / 5.50% / 5.75%' },
    { label: 'Comp timing', value: 'Within 9 months' },
    { label: 'Class-B vs Class-A vacancy gap', value: '+4–5 pts higher' },
    { label: 'Class-B vs Class-A rents', value: '$10–12/SF discount' },
  ],
  question: 'How do you use Class-A comps to price a Class-B asset?',
  options: [
    {
      label:
        'Use the Class-A comps as the anchor, then widen cap rate by 75–125 bps for the quality gap — reflecting higher vacancy risk, lower rent growth, and a thinner buyer pool. The adjusted Class-B cap range lands at roughly 6.25–6.75%.',
      isBest: true,
      explanation:
        'Class-to-class adjustments are standard when same-class comps are unavailable. The adjustment reflects three factors: (1) Income risk: Class-B rents are $10–12/SF lower and vacancy 4–5 pts higher, meaning the NOI stream is less durable. (2) Growth risk: Class-A typically has better mark-to-market upside and attracts credit tenants. (3) Liquidity risk: Class-B buyer pool (local/regional investors) is smaller and more rate-sensitive than Class-A institutional buyers, requiring a yield premium. A 75–125 bps widening from the Class-A mid-point (~5.50%) gives a Class-B range of 6.25–6.75%. Document the adjustment explicitly — investors need to bridge from Class-A comps to the Class-B ask.',
    },
    {
      label:
        'Average the 3 Class-A cap rates and use the result (5.50%) — they\'re in the same submarket and same time period.',
      isBest: false,
      explanation:
        'Same submarket, same time period is necessary but not sufficient. Class is a separate dimension of quality and risk. Applying a Class-A cap to a Class-B asset overstates its value — a buyer would be underwriting Class-A income stability onto a Class-B risk profile. This is how mispriced acquisitions happen. The resulting NOI shortfalls (higher vacancy, slower rent growth) erode returns within 12–24 months.',
    },
    {
      label:
        'Discard the Class-A comps entirely and wait for Class-B trades — you can\'t make a defensible adjustment across classes.',
      isBest: false,
      explanation:
        'Impractical. In markets where Class-B rarely trades, waiting for same-class comps could mean no comps at all. Cross-class adjustment is a documented, accepted practice in appraisal and brokerage. The key is to explicitly document the spread applied and the factors driving it. Brokers, appraisers, and underwriters do this routinely; the discipline is in defending the adjustment width, not avoiding the exercise.',
    },
    {
      label:
        'Use Class-A cap rates but reduce the going-in NOI to reflect Class-B rents — the cap rate itself doesn\'t need adjusting.',
      isBest: false,
      explanation:
        'Partially right (adjust NOI for lower rents) but incomplete. The cap rate must also widen because the risk profile of the income stream is different — not just its level. A cap rate applied to a stable, growing NOI should be tighter than a cap applied to a cyclically volatile, tenant-credit-sensitive NOI. Using the same cap on adjusted NOI gives you the right income level but the wrong risk discount.',
    },
  ],
  takeaway:
    'Cross-class comp adjustments are acceptable when same-class trades aren\'t available, but the adjustment must be documented, directionally defensible, and separated from the NOI adjustment. Wider cap for lower class = compensation for higher vacancy risk, thinner buyer pool, and slower rent growth. Typical Class-B to Class-A spread in a CBD office market: 75–150 bps, wider in markets with strong flight-to-quality trends.',
  tips: [
    'Class-B/Class-A cap spread tends to widen during downturns (Class-B buyers exit first) and compress in hot markets.',
    'Document each factor driving the adjustment: income risk, liquidity risk, growth risk — one number doesn\'t tell the story.',
    'If you can\'t defend the adjustment width to a senior partner, you need more comps or a wider pricing range.',
  ],
};
