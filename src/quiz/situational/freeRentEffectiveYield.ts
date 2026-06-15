import type { SituationalCase } from '../../types/situational';

export const freeRentEffectiveYield: SituationalCase = {
  id: 'free-rent-effective-yield',
  title: 'How do 6 months of free rent change the effective yield on this lease?',
  category: 'lease-econ',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    "You're negotiating a 7-year office lease at $35/SF face rent with a prospective tenant. To win the deal, you're considering offering 6 months of free rent upfront, in addition to $25/SF in TIs. A colleague says the deal is still attractive because the face rent is $5 above your asking rent. You need to quantify the actual NER and determine whether the concession package changes the economics materially.",
  data: [
    { label: 'Face rent', value: '$35/SF' },
    { label: 'Lease term', value: '7 years (84 months)' },
    { label: 'Free rent offered', value: '6 months upfront' },
    { label: 'TI package', value: '$25/SF' },
    { label: 'Leasing commission', value: '$4/SF' },
    { label: 'Discount rate', value: '7%' },
  ],
  question: 'What is the NER on this deal, and is your colleague right that the economics are attractive?',
  options: [
    {
      label:
        "NER ≈ $35 − ($25 + $4 + $17.50) ÷ 7 = $35 − $6.64 = $28.36/SF. The 6 months of free rent costs ~$17.50/SF (0.5 yr × $35). When you add TIs ($25) and commissions ($4), total concessions are $46.50/SF — amortized over 7 years that's $6.64/SF/yr off face rent. The face-rent premium is real but the NER is $28.36, nearly 19% below face.",
      isBest: true,
      explanation:
        "NER = face rent − total concessions ÷ lease term. Total concessions: TI $25 + LC $4 + free rent $17.50 (6 mos × $35/12 × 6) = $46.50/SF. Simple NER: $35 − ($46.50 ÷ 7) = $35 − $6.64 = $28.36/SF. For a more precise calculation, discount free rent at 7%: PV of 6 months lost rent ($17.50) and TIs/LCs ($29) discounted to today is slightly lower, so the time-value-adjusted NER is closer to $29–30/SF. Either way, the colleague's claim that the deal is 'attractive' because face rent is $5 above asking ignores the 19% concession haircut. The right comparison is NER-to-NER across competing deals.",
    },
    {
      label:
        "The colleague is right — face rent above asking means the deal is economic, and free rent is just a short-term timing concession.",
      isBest: false,
      explanation:
        "Free rent is not a timing concession — it's a permanent reduction in revenue. Six months of zero income followed by 78 months of $35/SF pays you less total rent than 84 months of $35/SF. The distinction matters for NOI (which is calculated on revenue actually received, not face rent) and for valuation (which is based on NOI, not face rent). Comping the face rent without the concession package is a common but serious error.",
    },
    {
      label:
        "Calculate NER by dividing total lease revenue by term: (78 months × $35/SF ÷ 12) ÷ 7 years = $32.08/SF NER.",
      isBest: false,
      explanation:
        "The approach of removing free rent months from the total revenue is correct for the rent-only NER, but it omits TIs ($25/SF) and leasing commissions ($4/SF) — which are also concessions from the landlord's perspective. Full NER accounts for all concession dollars, not just lost rent. The rent-only calculation gives $32.08/SF; the full-cost NER including TIs and LCs is ~$28.36/SF.",
    },
    {
      label:
        "NER doesn't matter for this analysis — cap rates are applied to face rent, so the relevant number is $35/SF.",
      isBest: false,
      explanation:
        "False. Cap rates are applied to NOI, and NOI reflects income actually received — including the impact of free rent periods. If an asset has a 6-month free rent period built into an active lease, the stabilized NOI is the weighted average rent received over the lease term, not the face rent. An appraisal or acquisition underwrite that applies a cap rate to face rent will overvalue the asset in proportion to the concession package.",
    },
  ],
  takeaway:
    "Net effective rent is the single most important lease economics metric for landlords — it's the apples-to-apples comparison across deals with different concession structures. NER = face rent − (TI + LC + free rent value) ÷ lease term. Free rent is particularly easy to underweight because it's a time-based concession (no cash outlay) rather than a capital outlay — but from a present-value standpoint, it's identical to a rent reduction. Always quote NER when comparing competing lease proposals, and flag the total concession package as a separate line item so reviewers can assess both dimensions.",
  tips: [
    "Simple NER: face rent − (total concessions ÷ term in years).",
    "$1/SF of free rent per year ≈ $1/SF/yr off NER for that year's proportion of the term.",
    "Always include TIs, LCs, and free rent in the total concession pool — all three reduce your effective economics.",
  ],
};
