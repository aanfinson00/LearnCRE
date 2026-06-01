import type { SituationalCase } from '../../types/situational';

export const freeRentVsTiCost: SituationalCase = {
  id: 'free-rent-vs-ti-cost',
  title: 'Free rent vs. TI: which concession costs the landlord less?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You are the asset manager on a 150,000 SF Class-B office building. A 10,000 SF tenant is renewing their 5-year lease at $32/SF base rent. They are requesting either (A) 6 months free rent upfront or (B) a $40/SF TI allowance. You need to present the more cost-effective option to ownership, using an 8% discount rate. Assume all other lease economics are equal.',
  data: [
    { label: 'Lease size', value: '10,000 SF' },
    { label: 'Lease term', value: '5 years' },
    { label: 'Base rent', value: '$32/SF → $320,000/yr ($26,667/mo)' },
    { label: 'Option A: free rent', value: '6 months → $160,000 foregone' },
    { label: 'Option B: TI allowance', value: '$40/SF × 10,000 SF = $400,000 cash outlay' },
    { label: 'Discount rate', value: '8%' },
  ],
  question: 'Which concession is cheaper for the landlord in NPV terms?',
  options: [
    {
      label:
        'Free rent is cheaper by a wide margin. $160,000 foregone in months 1–6 has a PV of roughly $148,000 (discounted at 8%). The TI is a $400,000 cash payment on day 1 — PV of $400,000. Free rent costs the landlord less than half of what the TI costs in NPV terms. The right answer is Option A, unless specific strategic factors justify TI (tenant requires significant improvements, or TI drives a rent premium above $32/SF that offsets the cost).',
      isBest: true,
      explanation:
        'Free rent cost = PV of foregone rent during the free period. For 6 months of $26,667/mo, slightly discounted at 8% annual rate: PV ≈ $148,000–$155,000. TI cost = $400,000 paid on day 1, PV = $400,000. The ratio is roughly 2.6:1 in favor of free rent. Effective rent tells the full story: with free rent, effective rent ≈ $32/SF × 54 months ÷ 60 months = $28.80/SF effective. With TI, effective rent ≈ $32/SF − ($400,000 ÷ (10,000 × 5)) = $32/SF − $8/SF = $24/SF effective. TI produces far lower effective rent for the landlord.',
    },
    {
      label:
        'TI is cheaper because it generates higher tenant goodwill and reduces future rollover risk.',
      isBest: false,
      explanation:
        'That is a strategic argument, not a cost argument. The question asks about NPV cost. In pure economic terms, TI costs 2.5–3x more than equivalent free rent. TI may be strategically justified (longer term, reduced churn, space improvement that supports higher future rents), but those benefits must be explicitly quantified and compared to the $240,000+ additional cost before claiming TI is "cheaper."',
    },
    {
      label:
        'They are equivalent — both are one-time concessions that reduce effective rent.',
      isBest: false,
      explanation:
        'Not equivalent. $160,000 (free rent) vs. $400,000 (TI) are materially different absolute and NPV amounts. Both reduce effective rent, but by very different magnitudes: free rent reduces effective rent by ~$3.20/SF; TI at $40/SF reduces effective rent by $8/SF. The landlord\'s cost is also different in timing: free rent delays revenue, TI is an upfront cash outflow.',
    },
    {
      label:
        'TI is cheaper because it is amortized over the lease term on the landlord\'s books.',
      isBest: false,
      explanation:
        'Accounting amortization does not change the economic cash cost. The landlord writes the $400,000 check on day 1 regardless of how it is amortized. NPV analysis uses cash flows, not GAAP treatment. Amortization spreads the P&L impact — it does not reduce the economic outlay.',
    },
  ],
  takeaway:
    'TI is almost always 2–3x more expensive than free rent in NPV terms at equivalent base rent levels. Free rent foregoes revenue temporarily; TI requires an immediate cash outlay. The comparison that actually matters is effective rent: TI at $40/SF on a 5-year lease reduces effective rent by $8/SF, while 6 months free reduces it by only ~$3.20/SF. Landlords should default to free rent unless TI is specifically required to improve the space or justify a higher base rent.',
  tips: [
    'Free rent cost ≈ monthly rent × free months (discounted lightly for timing).',
    'TI cost = $/SF × SF (immediate cash outlay on day 1, PV = face value).',
    'Effective rent = (base rent × total months − concessions PV) ÷ total months. Compare deals on effective rent, not base rent.',
    'TI may justify a higher base rent — if the space needs improvement to attract/retain a tenant, TI may be economically necessary, not optional.',
  ],
};
