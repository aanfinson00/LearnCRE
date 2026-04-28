import type { SituationalCase } from '../../types/situational';

export const tiVsRentGiveBack: SituationalCase = {
  id: 'ti-vs-rent-giveback',
  title: 'Should you give the TI or the rent break?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  assetClass: 'office',
  scenario:
    'A prospective tenant wants to sign a 5-year lease at $20/SF face rent. Comparable space in the building has been signing at the same face rent with $20/SF in TIs. The new prospect is asking for $30/SF in TIs instead. They\'ve indicated they\'d also consider a rent reduction in lieu of the extra TI dollars.',
  data: [
    { label: 'Face rent', value: '$20/SF' },
    { label: 'Lease term', value: '5 years' },
    { label: 'Comp TI', value: '$20/SF' },
    { label: 'Requested TI', value: '$30/SF' },
    { label: 'Annual discount rate', value: '7%' },
  ],
  question: 'How should you analyze the tenant\'s ask?',
  options: [
    {
      label: 'Convert both to NER and compare. $30/SF TI on a 5-year deal is worth roughly $2/SF/yr of rent give-back — so the equivalent rent is ~$18/SF face, or NER ~$14/SF after the comp $20/SF TI baseline.',
      isBest: true,
      explanation:
        'Total TI delta: $30 − $20 = $10/SF extra. Amortized over 5 yrs at 7%: ~$2.44/SF/yr. So the deal economics match a $20 face / $30 TI structure with NER ≈ $20 − ($30/5) = $14/SF, vs the comp $20 face / $20 TI at NER ≈ $20 − ($20/5) = $16/SF. The tenant is asking for a 200 bps NER reduction; that\'s the negotiation, framed correctly.',
    },
    {
      label: 'Refuse the extra TI — face rent must stay at comp level for valuation purposes.',
      isBest: false,
      explanation:
        'Treating face rent as inviolate misses the economics. Buyers and appraisers underwrite NER; sophisticated counterparts will recognize $20/SF face on $30 TI as economically equivalent to a lower face rent. Holding the line on face while caving on TI gives you the worst of both — concession economics with the appearance of premium pricing.',
    },
    {
      label: 'Give the TI rather than reduce rent — TIs are capitalized, rent reductions hit NOI directly.',
      isBest: false,
      explanation:
        'Plausible-sounding but wrong as a general rule. Both flow through to value: TIs reduce equity (or proceeds) at signing; rent reductions reduce NOI permanently. The economic equivalence is what the NER analysis is for. Picking one over the other on accounting grounds without comparing economics is sloppy.',
    },
    {
      label: 'Give the rent reduction instead — the tenant\'s spending the TI on something they\'d build anyway, so a rent break is a real concession.',
      isBest: false,
      explanation:
        'Conflates whether the tenant *values* the TI with whether the *landlord* should pay for it. From the landlord\'s perspective, $X of TI and $X/N of rent reduction (where N = lease term) are economically equivalent. Whether the tenant happens to like one form or another is part of the negotiation, but doesn\'t change the cost.',
    },
  ],
  takeaway:
    'TI vs rent reduction is the single most common landlord-side negotiation. Always reduce both forms of concession to a single comparable: net effective rent. NER = face rent − (TI + free rent + LCs) / lease term, optionally discounted. Anything else is anchoring on the wrong number.',
  tips: [
    'NER ≈ face rent − total concessions / term (simple); discount for time value if precise.',
    '$1/SF of TI ≈ $0.20/SF/yr of rent on a 5-yr deal, $0.12/SF/yr on 8-yr, $0.10/SF/yr on 10-yr.',
    'Always quote NER in comp tables — face rent without concessions is misleading.',
  ],
};
