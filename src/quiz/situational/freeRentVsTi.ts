import type { SituationalCase } from '../../types/situational';

export const freeRentVsTi: SituationalCase = {
  id: 'free-rent-vs-ti',
  title: 'Free rent or TI — which costs the landlord more?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "A new office tenant is signing a 7-year lease at $42/SF face rent. They're asking for either (A) 6 months of free rent at lease commencement, or (B) $25/SF in TI allowance in lieu of free rent. The landlord's discount rate is 7%. The space is 5,000 SF.",
  data: [
    { label: 'Face rent', value: '$42/SF/yr' },
    { label: 'Lease term', value: '7 years' },
    { label: 'Space size', value: '5,000 SF' },
    { label: 'Option A', value: '6 months free rent at commencement' },
    { label: 'Option B', value: '$25/SF TI allowance' },
    { label: "Landlord's discount rate", value: '7%' },
  ],
  question: 'Which concession costs the landlord more on a present-value basis?',
  options: [
    {
      label: "Option A (6 months free rent) costs less than Option B ($25/SF TI). Free rent = $42/SF × 0.5 yr = $21/SF of rent forgone, discounted to ~$20/SF PV at 7%. The TI = $25/SF paid upfront — no discounting needed. Option B costs more in PV terms.",
      isBest: true,
      explanation:
        "Free rent: 6 months × ($42/SF ÷ 12) = $21/SF of rent forgone, starting at commencement. PV of that $21/SF forgone over months 1–6 at 7% annual discount rate ≈ $20.3/SF. TI: $25/SF paid at or near commencement — essentially full PV cost. The TI is $4–5/SF more expensive in PV terms. Additionally, free rent is an income deferral (cash flows resume at month 7 and continue for 6.5 years), while TI is a capital outflow that reduces equity basis immediately. The landlord should prefer to give free rent over TI when facing this trade-off.",
    },
    {
      label: "Both concessions cost exactly the same — the free rent and TI were sized to be economically equivalent.",
      isBest: false,
      explanation:
        "They would be equivalent only if the free rent were calibrated to match the PV of the TI. Here they weren't: $21/SF face of free rent vs. $25/SF TI is not equivalent on face value, and the timing difference (free rent is deferred income vs. TI is immediate cash out) compounds the difference at a 7% discount rate. Always discount both to PV for a fair comparison.",
    },
    {
      label: "Option B (TI) costs more upfront but less in PV — the rent stream over 7 years offsets the TI payment.",
      isBest: false,
      explanation:
        "The rent stream is not an offset to the TI cost — rent is the baseline income the landlord expects regardless of which concession they choose. The comparison is: (a) lose 6 months of rent vs. (b) spend $25/SF today. Comparing both to PV is the correct frame; the rent stream flows to the landlord in both scenarios after the concession period.",
    },
    {
      label: "Free rent is worse for the landlord because it reduces occupancy metrics, which hurts the cap rate valuation.",
      isBest: false,
      explanation:
        "Free rent is typically counted as occupied for physical occupancy purposes even if economic occupancy shows the concession period. The cap rate valuation uses stabilized NOI — both concessions reduce NER by similar amounts. The valuation impact of free rent vs. TI is roughly equivalent for an appraiser or buyer looking at NER; the landlord's actual economics favor free rent (lower PV cost).",
    },
  ],
  takeaway:
    "Free rent and TI are not interchangeable without doing the PV math. Free rent is forgone income paid out over the concession period; TI is an immediate capital outlay. For equivalent face amounts, TI costs more because of timing — a dollar today is worth more than a dollar deferred. When tenants give you a choice, always reduce both to PV and pick the lower-cost form.",
  tips: [
    'Rule of thumb on a 7-year deal: $1/SF of free rent/month ≈ $3.50/SF face (6 months × $7/SF/month on a $42 rent) vs $25/SF TI — the math always favors free rent at similar face amounts.',
    'TI is a capital expenditure; free rent is an income adjustment. Both reduce NER, but TI requires cash out now.',
    'In a rising-rate environment, TI costs more relative to free rent because the discount rate applied to deferred forgone income is higher.',
  ],
};
