import type { SituationalCase } from '../../types/situational';

export const freeRentNer: SituationalCase = {
  id: 'free-rent-ner',
  title: '6 months free rent or a $3/SF rent cut — which costs the landlord more?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re negotiating a lease renewal for a 10,000 SF office tenant at $30/SF face rent on a 5-year term. The tenant asks for either (A) 6 months free rent or (B) a $3/SF permanent rent reduction to $27/SF. No other concessions. Discount rate is 7%.',
  data: [
    { label: 'Space', value: '10,000 SF' },
    { label: 'Face rent', value: '$30/SF/yr' },
    { label: 'Term', value: '5 years' },
    { label: 'Option A', value: '6 months free rent (months 1–6)' },
    { label: 'Option B', value: '$3/SF permanent reduction to $27/SF' },
    { label: 'Discount rate', value: '7%/yr' },
  ],
  question: 'Which option costs the landlord more in NPV terms, and which should the landlord prefer?',
  options: [
    {
      label: 'Option A (free rent) has a slightly higher NPV cost (~$147K) than Option B (~$123K), but the landlord should still prefer Option A because it preserves the $30/SF face rent on the lease.',
      isBest: true,
      explanation:
        'Option A: 6 months of $30/SF on 10,000 SF = $150,000 of foregone rent in months 1–6. Discounted to PV at 7%, the early timing means the cost is close to face value: ~$147K NPV. Option B: $3/SF × 10,000 = $30,000/year × 5 years = $150,000 total gross. Discounted at 7% over 5 years: $30,000 × PVA(7%, 5yr) = $30,000 × 4.100 = $123,000 NPV. Option B is ~$24K cheaper in NPV terms. However, Option A preserves the $30/SF face rent on the lease document — which matters for rent roll comparables, cap-rate-based valuations, and leasing comps. Landlords almost universally prefer free rent over rent reductions for this reason: you deliver a similar economic concession while protecting the headline rent that drives building valuation.',
    },
    {
      label: 'Option B is far more expensive — the $3/SF reduction permanently damages NOI for 5 full years.',
      isBest: false,
      explanation:
        '"Permanent" only means for the 5-year term, not forever. The NPV comparison accounts for the full term. In NPV terms, Option B is actually CHEAPER ($123K vs. $147K) because the cash flows are further out in time. The perceived damage of a permanent reduction is captured in the NPV; in dollars-over-time, Option B totals the same $150K gross but is worth less today.',
    },
    {
      label: 'They\'re economically identical — both cost the landlord $150,000 over the lease term.',
      isBest: false,
      explanation:
        'They\'re equal in undiscounted total dollars but not in NPV. Time value of money matters: $150K paid upfront vs. $30K/year over 5 years have meaningfully different present values. At 7%, Option B\'s $123K NPV is $24K less than Option A\'s $147K NPV. Equal gross dollars ≠ equal economics.',
    },
    {
      label: 'Option A is strictly better — free rent ends after 6 months whereas a rent cut is permanent.',
      isBest: false,
      explanation:
        'True directionally, but incomplete. Option A IS less damaging to the ongoing rent roll (face rent is preserved), but calling it "strictly better" ignores the NPV cost comparison. Option A costs ~$24K more in NPV. The correct framing: Option A costs slightly more but preserves face rent — a strategic preference that is worth the modest NPV premium in most landlord contexts.',
    },
  ],
  takeaway:
    'Free rent and rent cuts are concession equivalents measured by NPV. Front-loaded free rent typically carries a slightly higher NPV cost than a same-dollar rent reduction spread over the term — because early cash flows cost more in present value. Despite that, landlords almost always prefer free rent: it preserves the face rent, which is what rent comps, appraisals, and cap-rate buyers use to value the building. Always reduce concessions to NER and NPV before comparing; face rent alone is misleading.',
  tips: [
    'NER quick formula: face rent − (total concessions ÷ lease term). Compare deals on NER, not face rent.',
    'Free rent NPV ≈ face value (it\'s early). Rent cuts NPV < gross (delayed payments discount).',
    'Landlords prefer free rent strategically: face rent protects the rent roll and cap-rate valuation.',
  ],
};
