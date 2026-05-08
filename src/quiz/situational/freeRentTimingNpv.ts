import type { SituationalCase } from '../../types/situational';

export const freeRentTimingNpv: SituationalCase = {
  id: 'free-rent-timing-npv',
  title: "Does it matter when you give the free rent?",
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "A prospective tenant is negotiating a 7-year office lease at $40/SF/yr on 5,000 SF. They want 6 months of free rent. You have two options: (A) grant all 6 months up front at lease commencement, or (B) grant 3 months up front and defer 3 months to months 25–27. The tenant doesn't have a preference. Your discount rate is 7%. Annual rent = $200,000; monthly = ~$16,667.",
  data: [
    { label: 'Lease term', value: '7 years' },
    { label: 'Annual rent', value: '$200,000 ($40/SF × 5,000 SF)' },
    { label: 'Monthly rent', value: '~$16,667' },
    { label: 'Total free rent months', value: '6 months' },
    { label: 'Option A', value: 'All 6 months at commencement' },
    { label: 'Option B', value: '3 months up front + 3 months in months 25–27' },
    { label: 'Discount rate', value: '7%/yr' },
  ],
  question:
    "Which option is better for the landlord, and roughly how much does the timing difference matter?",
  options: [
    {
      label:
        "Option B is better for the landlord — deferring 3 months of free rent to months 25–27 means those months' rent is received 2 years later, reducing the PV of the concession. At 7%, 3 months of deferred free rent saves the landlord roughly $2,000–3,000 in NPV terms.",
      isBest: true,
      explanation:
        "PV of foregone rent at month 1–3: ~$16,667 × 3 months discounted at ~0 months out ≈ $50,000 PV cost. PV of foregone rent at months 25–27: ~$16,667 × 3 months discounted at ~2 years at 7% ≈ $50,000 ÷ (1.07²) ≈ $43,700 PV cost. Difference: ~$6,300 in the landlord's favor. Back-loading free rent saves present value. The magnitude seems small per deal, but across a multi-tenant building, it compounds into real NER improvements.",
    },
    {
      label:
        "The timing doesn't matter — 6 months of free rent is 6 months of free rent regardless of when it falls.",
      isBest: false,
      explanation:
        "Timing absolutely matters when you apply a discount rate. Forgoing rent in month 1 costs more in PV terms than forgoing rent in month 25. This is the fundamental principle behind net effective rent: all concessions should be discounted back to the lease start date to arrive at a single comparable NER figure. Treating all free rent as equal ignores time value.",
    },
    {
      label:
        "Option A is better — getting the concession out of the way early maximizes the tenant's remaining rent-paying period.",
      isBest: false,
      explanation:
        "A front-loaded concession costs more to the landlord in PV terms, not less. Regardless of when the free rent is given, the tenant is committing to the same total lease term. Front-loading costs the landlord more present value because the forgone rent is not discounted over time. Option B recovers more PV.",
    },
    {
      label:
        "Grant Option A — a simpler structure reduces renegotiation risk if the tenant exercises early termination rights.",
      isBest: false,
      explanation:
        "A real consideration, but not the primary financial answer to the question asked. If the lease has no early termination rights or has a strong EM penalty, this risk is low. The question is testing whether you understand NPV of concession timing — the answer is that back-loading free rent saves landlord present value.",
    },
  ],
  takeaway:
    "Free rent timing matters because of time value. Forgoing rent in year 1 is more costly in PV terms than forgoing rent in year 3. Landlords should prefer to back-load concessions (push them to later in the term) when tenants are indifferent. The magnitude is modest per deal but consistent — this is how NER analysis should inform every concession negotiation.",
  tips: [
    "Back-loaded concessions always cost the landlord less in PV terms than front-loaded ones.",
    "NER = face rent − PV(concessions) / lease term; use discounted concessions for precision.",
    "Always ask: 'Does the tenant care when they get the free rent?' If not, push it out.",
  ],
};
