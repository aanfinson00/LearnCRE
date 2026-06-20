import type { SituationalCase } from '../../types/situational';

export const freeRentNerImpact: SituationalCase = {
  id: 'free-rent-ner-impact',
  title: 'Nine months free rent — what\'s the real lease value?',
  category: 'lease-econ',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A new 10-year office lease just signed at $42/SF face rent with 9 months of free rent upfront. The tenant improvement allowance is $50/SF. Leasing commissions total $8/SF. No free rent period after the initial abatement. The discount rate for NER purposes is 7% annually.',
  data: [
    { label: 'Face rent', value: '$42/SF/yr' },
    { label: 'Lease term', value: '10 years' },
    { label: 'Free rent', value: '9 months (upfront)' },
    { label: 'TI allowance', value: '$50/SF' },
    { label: 'Leasing commissions', value: '$8/SF' },
    { label: 'Discount rate', value: '7%/yr' },
  ],
  question: 'What is the net effective rent (NER) for this lease?',
  options: [
    {
      label:
        'NER ≈ $31.90/SF. Free rent converts to $3.15/SF/yr; TI + LC of $58/SF amortizes to $8.27/SF/yr on a simple basis. Face $42 − $3.15 − $5.80 ≈ $33/SF; discounted NER slightly lower around $31–32/SF.',
      isBest: true,
      explanation:
        'Simple NER: concessions per year = (9/12 × $42 free rent + $58 TI+LC) / 10 yrs = ($31.50 + $58) / 10 = $89.50 / 10 = $8.95/SF/yr. NER = $42 − $8.95 = $33.05/SF (simple). Discounted NER is modestly lower — the free rent at the front and upfront TI/LC are received/paid earlier, so the PV of concessions slightly exceeds the simple amortization. Discounted NER ≈ $31.50–$32/SF depending on exact timing. Key point: the 9 months of free rent is worth $31.50/SF of total concession value ($42 × 0.75 years), not an annual number.',
    },
    {
      label: 'NER = $42/SF — free rent is a timing benefit, not a real concession; face rent defines the lease value.',
      isBest: false,
      explanation: 'Free rent is a direct economic concession: the landlord receives zero rent for 9 months. It reduces the total lease economics and must be reflected in NER. Treating face rent as the measure of value is the error pattern that inflates reported rents on new leases.',
    },
    {
      label: 'NER = face rent minus just the TI and LC amortization — free rent is already baked into the face rent negotiation.',
      isBest: false,
      explanation: 'Free rent is a separate concession from TI/LC. Both reduce the landlord\'s economics. The NER formula sums all concessions. Excluding free rent from the NER calc because "it\'s in the face rent" conflates negotiating dynamics with economic outcomes.',
    },
    {
      label: 'NER is only relevant for comparison purposes; for valuation use face rent on occupied SF.',
      isBest: false,
      explanation: 'Valuation models (DCF and cap-rate) should use the cash rent actually received. During free-rent months, the landlord receives $0 — that matters for NOI and therefore for cap-rate value. Appraisers and buyers look through face rent to NER (or modeled cash flows) when valuing an asset with concessions in place.',
    },
  ],
  takeaway:
    'NER converts all lease concessions (free rent, TI, LCs) to an annual per-SF cost, then subtracts them from face rent. The formula: NER = face rent − (free months × monthly rent + TI + LC) / lease term. Free rent is not a minor timing adjustment — 9 months of free rent on a $42/SF lease is $31.50/SF of forgone income, or $3.15/SF/yr amortized over 10 years. Always quote NER when comparing leases.',
  tips: [
    'Quick calc: free rent concession = (free months / 12) × annual face rent.',
    'NER rule of thumb: 9 months free on a 10-yr deal ≈ $3.15/SF/yr on a $42 face — about 7.5% of face.',
    'For comps: always ask whether the quoted rent is gross face or NER. They\'re often 15–25% apart on new deals.',
  ],
};
