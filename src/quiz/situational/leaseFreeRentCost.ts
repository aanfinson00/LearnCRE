import type { SituationalCase } from '../../types/situational';

export const leaseFreeRentCost: SituationalCase = {
  id: 'lease-free-rent-cost',
  title: 'What does 4 months of free rent actually cost you?',
  category: 'lease-econ',
  difficulty: 'beginner',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A tenant is signing a 5-year lease for 5,000 SF of office space at $30/SF/yr face rent. To win the deal, the landlord is offering 4 months of free rent at lease commencement. The TI allowance is $20/SF. The property owner is asking what the deal actually delivers vs the headline rent.',
  data: [
    { label: 'Lease term', value: '5 years (60 months)' },
    { label: 'Leased area', value: '5,000 SF' },
    { label: 'Face rent', value: '$30/SF/yr ($150,000/yr)' },
    { label: 'Free rent concession', value: '4 months' },
    { label: 'TI allowance', value: '$20/SF ($100,000 total)' },
  ],
  question:
    'What is the net effective rent on this deal, and how do you explain the economics to the owner?',
  options: [
    {
      label:
        'NER ≈ $24/SF (simple) or ~$22/SF (discounted). Free rent reduces total collections by 4/60ths (~$50K); TI is $100K out of pocket. Total concessions $150K over 5 years = $6/SF/yr, leaving NER of $24/SF. At 7% discount rate, true NER is closer to $22/SF. The owner should understand the face is $30 but the real economics deliver $22–24.',
      isBest: true,
      explanation:
        'Simple NER: Total face value = 5,000 × $30 × 5 = $750,000. Less free rent: 4/12 × $150,000 = $50,000. Less TI: $100,000. Net collected = $600,000. Per SF per year: $600,000 ÷ 5,000 ÷ 5 = $24/SF. Discounting the cash flows at 7% pulls NER to roughly $22/SF. The TI is a real day-one cash cost; the free rent period generates zero income. Both must be in the denominator when reporting deal economics to an owner.',
    },
    {
      label:
        'Face rent is $30/SF — that\'s what the lease says, so that\'s the number to report.',
      isBest: false,
      explanation:
        'Face rent is the contracted rate, not the realized return. Buyers cap NOI; they see the free rent abatement and TI outlay on day one. A $30/SF face deal with $6/SF/yr of concessions is a $24/SF deal dressed in $30/SF language. Reporting face rent without concessions to an owner is misleading and sets false expectations.',
    },
    {
      label:
        'TI is a capital expense, not a lease economics item — exclude it from NER.',
      isBest: false,
      explanation:
        'TI is absolutely a leasing cost — it is the cash paid to secure the tenant\'s income stream. Whether it\'s capitalized on the balance sheet is an accounting question; from an investment perspective, dollars out of pocket at signing reduce net returns. NER without TI is an incomplete, overstated metric.',
    },
    {
      label:
        'Ignore the free rent — it\'s a timing issue that doesn\'t affect the total value of the lease.',
      isBest: false,
      explanation:
        'Free rent is a permanent value reduction, not a timing shift. The landlord never collects those months. On a 5-year lease, 4 months of free rent reduces total collections by 4/60 = 6.7% — meaningful in its own right, and it compounds when discounted at any positive rate.',
    },
  ],
  takeaway:
    'Every leasing deal should be quoted in NER (net effective rent), not face rent. NER converts free rent, TIs, and leasing commissions into a per-SF-per-year equivalent so deals can be compared on a level basis. Quick formula: NER ≈ face rent − (total concessions ÷ lease term in years). Report both numbers to owners: face rent (what the lease says) and NER (what the deal actually delivers).',
  tips: [
    'Quick NER: subtract (total concessions ÷ lease term in years) from face rent.',
    '1 month free on a 5-yr deal reduces collections by 1.7%; 4 months = 6.7%.',
    'TI amortization: $1/SF TI ≈ $0.20/SF/yr on a 5-yr deal, $0.10/SF/yr on a 10-yr deal.',
  ],
};
