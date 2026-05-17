import type { SituationalCase } from '../../types/situational';

export const freeRentVsLowerBase: SituationalCase = {
  id: 'free-rent-vs-lower-base',
  title: 'Free rent or lower face rent — which costs more?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A prospective office tenant is negotiating a 7-year lease at a $30/SF face rent. Comparable leases in the building have been signed at $30/SF with 3 months of free rent. The new prospect is asking for either (A) 6 months of free rent at $30/SF face, or (B) a flat $28/SF face rent with zero free rent. Both options cover the same 7-year term. You need to determine which costs the landlord more over the lease term, and which is preferable on a valuation basis.',
  data: [
    { label: 'Face rent', value: '$30/SF face (or $28/SF alternative)' },
    { label: 'Lease term', value: '7 years' },
    { label: 'Comp concession', value: '3 months free rent at $30/SF' },
    { label: 'Option A', value: '6 months free rent, $30/SF face rent' },
    { label: 'Option B', value: 'Zero free rent, $28/SF face rent' },
    { label: 'Discount rate', value: '7%' },
  ],
  question: 'Which option costs the landlord more, and which is better on a valuation basis?',
  options: [
    {
      label: 'Option A (6 months free rent) costs more in total dollars but less on NER. Option B ($28/SF flat) costs less in total dollars but more in perpetual NOI drag. For valuation, Option A is better: higher face rent = higher cap-rate value; the free rent is a one-time cost absorbed upfront.',
      isBest: true,
      explanation:
        'NER calculation: Option A: $30 × 6.5 effective years / 7 = $27.86/SF/yr NER. Option B: $28 × 7 / 7 = $28.00/SF/yr NER. Option A actually has slightly *lower* NER by $0.14/SF/yr, but the face rent matters for valuation: most buyers cap value based on in-place or market face rents, not NER. At 6.5% cap, Option A ($30 face) values the space at $461/SF; Option B ($28 face) values it at $431/SF — a $30/SF difference even though NER is nearly identical. Free rent is a one-time cost; face rent reduction is permanent. For a value-add or near-term sale, Option A wins on valuation even though the economics are nearly equal.',
    },
    {
      label: 'Option B ($28/SF flat) is better — no free rent means rent starts immediately and the NPV of the lease is higher.',
      isBest: false,
      explanation:
        'Option B starts cash flowing immediately, which improves NPV modestly versus 6 months of free rent. But the $2/SF rent reduction is permanent across 7 years × 12 months = $2 × 84 months = $168/SF in total rent forgone vs. $30 × 6 months = $180/SF forgone in Option A. Option A costs slightly more in total dollars (≈$12/SF), but delivers higher face rent, which is what buyers capitalize. The "rent starts immediately" advantage in Option B is real but smaller than the valuation gap from face rent.',
    },
    {
      label: 'They are economically equivalent — free rent and rent reductions both reduce NER by the same amount.',
      isBest: false,
      explanation:
        'NER is nearly the same (Option A: ~$27.86, Option B: $28.00), but "economically equivalent" obscures two important differences: (1) timing — free rent is a front-loaded concession vs. a permanent NOI reduction; (2) valuation — buyers capitalize face rent, not NER. These structural differences mean the same NER can produce different valuations depending on the concession form.',
    },
    {
      label: 'Option A is riskier because the tenant could default during the free rent period and you have no cash flow.',
      isBest: false,
      explanation:
        'Default risk during free rent is real but symmetric — a tenant paying $28 can also default. The free rent period adds credit exposure for 6 months, which is a valid concern for low-credit tenants. However, the question asks which option costs more and is better for valuation — that analysis is NER and face-rent-based, not credit-risk based. Address default risk separately via guaranty or letter of credit, not by choosing Option B on that basis alone.',
    },
  ],
  takeaway:
    'Free rent and face rent reductions have nearly the same NER but different valuation implications. Free rent preserves the face rent that buyers capitalize; rent reductions lower the permanent NOI base. When a sale is planned within or near the lease term, preserving face rent (via front-loaded concessions like free rent or TIs) is usually preferable to reducing face rent permanently.',
  tips: [
    'NER ≈ face rent × (effective months / total months). Free rent reduces effective months; rent reduction reduces face rent.',
    'Valuation impact: buyers capitalize face rent (or in-place rent), not NER. Higher face rent = higher cap-rate value.',
    'When tenant credit is questionable, front-loaded concessions (TIs, free rent) reduce total exposure vs. a permanent rent cut.',
  ],
};
