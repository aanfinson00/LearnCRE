import type { SituationalCase } from '../../types/situational';

export const freeRentNerImpact: SituationalCase = {
  id: 'free-rent-ner-impact',
  title: 'What does 6 months of free rent actually cost you?',
  category: 'lease-econ',
  difficulty: 'beginner',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "You're negotiating a 10,000 SF office lease at $36/SF gross for a 5-year term. The tenant wants 6 months of free rent to offset their moving costs and build-out disruption. You need to quantify the true annual economic cost so you can compare it against other concession options.",
  data: [
    { label: 'Space', value: '10,000 SF' },
    { label: 'Face rent', value: '$36/SF/yr gross' },
    { label: 'Lease term', value: '5 years' },
    { label: 'Free rent requested', value: '6 months' },
    { label: 'TI offered separately', value: '$30/SF (already agreed)' },
    { label: 'Discount rate (for NER)', value: '7%' },
  ],
  question: 'What is the true annual cost of the 6-month free-rent concession, and what is the resulting NER?',
  options: [
    {
      label:
        'Free rent totals $180,000 (6 months × $36 × 10,000 SF), which amortizes to $36,000/yr or $3.60/SF/yr over the 5-year term. Combined with the $30/SF TI ($6/SF/yr amortized), NER = $36 − $3.60 − $6 = $26.40/SF. The landlord is yielding ~$9.60/SF/yr from the headline rate.',
      isBest: true,
      explanation:
        'Free rent is deferred income, not forgiven income — but economically it reduces the average rent collected per year over the term. Total gross rent at 100% collection: $36 × 10,000 × 5 = $1,800,000. Free rent cost: $36 × 10,000 × 0.5 = $180,000. Net collected: $1,620,000 over 5 years = $324,000/yr = $32.40/SF/yr. Subtract TI amortization ($30 ÷ 5 = $6/SF/yr): NER = $32.40 − $6 = $26.40/SF. Rule of thumb: each month of free rent on a 5-year deal ≈ $0.60/SF/yr in NER cost — so 6 months ≈ $3.60/SF/yr reduction.',
    },
    {
      label:
        'The true cost is $180,000 total — that\'s the revenue lost. Annualizing it is unnecessary since it\'s a lump-sum timing difference.',
      isBest: false,
      explanation:
        "The $180,000 total is the gross revenue gap, not the economic cost per year. Landlords underwrite NER on an annualized basis because that's what affects NOI, valuation (NOI ÷ cap rate), and debt coverage. Treating free rent as a one-time event obscures its impact on the annual income stream that drives property value. Always convert to $/SF/yr to compare against other concession formats.",
    },
    {
      label:
        'The cost is effectively zero — free rent is a timing concession and the tenant makes up for it by paying full rent in years 2–5.',
      isBest: false,
      explanation:
        "Free rent reduces total collected rent over the term. The tenant does not 'make it up' — they pay face rent in years 2–5, which was already the baseline. There is no catch-up mechanism unless the lease explicitly includes a rent bump in later years to offset the free period. If the landlord has debt service in Year 1, $180,000 of free rent must come from reserves or refinancing — it has a real cash cost.",
    },
    {
      label:
        'Free rent only matters to leveraged owners — an all-cash landlord can absorb it with no economic impact.',
      isBest: false,
      explanation:
        "Free rent reduces total income for every owner, regardless of leverage. An all-cash owner simply doesn't face a debt service shortfall — but their total return on the asset still reflects the revenue not collected. NER is an economic measure of real income received over the lease term; it is independent of the capital structure. All-cash ownership doesn't make the rent more real; it just changes who absorbs the shortfall.",
    },
  ],
  takeaway:
    'Free rent is the most misunderstood concession in leasing because it feels like a timing issue rather than an economic one. It is economic: every month of free rent permanently reduces average annual income and NER over the lease term. Rule of thumb — 1 month of free rent on a 5-year deal ≈ 1/60th of annual gross rent as a permanent NER reduction ($0.60/SF at $36/SF face). Quantify it the same way you quantify TI: amortize over the term.',
  tips: [
    'Free rent cost per year = (months free × monthly rent) / lease term in months.',
    'For a 5-year deal: 1 month free ≈ 1.67% of face rent reduction in NER (1/60).',
    'In NOI-based valuation, free rent in Year 1 reduces NOI and therefore value (at cap rate). $180K of free rent at a 5.5% cap = ~$3.3M of implied value impact.',
  ],
};
