import type { SituationalCase } from '../../types/situational';

export const freeRentNPVImpact: SituationalCase = {
  id: 'free-rent-npv-impact',
  title: 'Free rent concessions — what does the deal actually cost the landlord?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  scenario:
    "You're a landlord negotiating a 10-year office lease for 15,000 SF at a face rent of $42/SF/year (NNN). To close the deal, you've agreed to 8 months of free rent at the start of the lease, plus a $50/SF TI allowance. Your cost of capital is 7% (use this as the discount rate for NPV calculations). A competing deal on the table offers a 10-year lease at $38/SF with zero free rent and $30/SF in TI.",
  data: [
    { label: 'Space', value: '15,000 SF' },
    { label: 'Deal A: face rent', value: '$42/SF/yr NNN' },
    { label: 'Deal A: free rent', value: '8 months' },
    { label: 'Deal A: TI allowance', value: '$50/SF' },
    { label: 'Deal B: face rent', value: '$38/SF/yr NNN' },
    { label: 'Deal B: free rent', value: '0 months' },
    { label: 'Deal B: TI allowance', value: '$30/SF' },
    { label: 'Lease term', value: '10 years' },
    { label: 'Discount rate', value: '7%' },
  ],
  question:
    'Which deal has the higher net effective rent to the landlord, and how should you think about the free-rent concession when presenting NOI to a buyer?',
  options: [
    {
      label:
        'Deal A has a higher net effective rent despite the concessions: NER ≈ $37.90/SF vs Deal B\'s NER ≈ $35.20/SF. Calculate NER as: (PV of rent payments over 10 years − TI cost) ÷ PV of $1/SF/yr for 10 years. The free rent and TI reduce NER but don\'t eliminate the spread. When presenting to a buyer, show both face rent and NER — a buyer at a 6% cap rate will price the asset on stabilized in-place NOI (face rent), but a sophisticated buyer will also underwrite the net effective economics to understand the true landlord economics.',
      isBest: true,
      explanation:
        'Correct framework. Net effective rent = PV of all net cash flows to landlord ÷ PV of $1/yr annuity over the lease term. For Deal A: PV of 8 months zero rent + 112 months at $42/SF (monthly discount), minus $50/SF TI upfront. The NER will be meaningfully above Deal B\'s $38/SF face but below $42/SF face. Most buyers underwrite stabilized income on in-place rent; the free rent period shows up as a NOI dip in year 1–2, which a cap-rate buyer buying at stabilization won\'t see. Show both metrics — face rent for comparability, NER for true economics.',
    },
    {
      label:
        'Deal B is clearly better: $38/SF with no free rent and lower TIs means the landlord starts collecting full rent immediately and spends less capital. A lower face rent that starts day one beats a higher face rent that starts 8 months late.',
      isBest: false,
      explanation:
        'This ignores the time-value calculation. 8 months of free rent on a 10-year lease means you forgo 8/120 = 6.7% of lease income at the front end, discounted. The $4/SF/year premium on Deal A ($42 vs $38) generates an additional $60,000/year in rent. Over 9.33 years of actual payments (at 7% discount), the PV of the rent premium easily outweighs the free-rent cost and the incremental $20/SF TI. The gut answer "lower face rent starts immediately" is wrong when the premium is large enough relative to the concession.',
    },
    {
      label:
        'You cannot compare the two deals without knowing the tenant credit rating — free rent is a function of tenant quality, and a strong-credit tenant justifies higher concessions.',
      isBest: false,
      explanation:
        'Tenant credit informs TI underwriting but is not the right answer here. The question asks you to compare the NPV economics of the two deals as structured. You can do that comparison regardless of credit. Credit quality affects the probability you receive the contracted cash flows, not the calculation methodology for net effective rent.',
    },
    {
      label:
        'The TI allowance is sunk cost and shouldn\'t affect the comparison — only recurring rent cash flows matter for NOI analysis.',
      isBest: false,
      explanation:
        'TIs are absolutely part of the true landlord economics. They reduce net proceeds from the lease (landlord writes a check at commencement). NER calculations always deduct TI (and often leasing commissions) from the PV of rent receipts. Treating TIs as sunk cost misrepresents the return on the leasing investment — it\'s why a $50/SF TI and 8 months free rent on $42/SF may or may not be more attractive than a $30/SF TI and no free rent at $38/SF.',
    },
  ],
  takeaway:
    'Net effective rent (NER) is the correct metric for comparing leases with different concession structures. NER = PV of cash rents over the lease term minus PV of TIs and other landlord costs, divided by the PV of $1/yr for the lease term. Free rent is expensive because it front-loads the cash flow loss; the longer the free rent period and the shorter the lease, the more it bites. When presenting to buyers, show face rent and NER separately — a cap-rate buyer prices on face; a sophisticated buyer checks NER to understand true lease economics.',
  tips: [
    'Quick NER approximation: reduce face rent by (free rent months ÷ lease months) + (TI ÷ (face rent × lease years)).',
    'An 8-month free-rent concession on a 10-year lease ≈ 6.7% reduction in gross rent. On $42/SF, that\'s ~$2.82/SF of NER erosion before discounting.',
    'Leasing commissions (typically 4–6% of total rent) also belong in the NER calculation — easy to overlook when only comparing TI and free rent.',
    'Buyers at a cap rate underwrite stabilized NOI. If free rent burns off in year 2, the asset\'s cap-rate value at stabilization isn\'t affected — but the interim carry is.',
  ],
};
