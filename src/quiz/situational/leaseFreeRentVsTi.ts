import type { SituationalCase } from '../../types/situational';

export const leaseFreeRentVsTi: SituationalCase = {
  id: 'lease-free-rent-vs-ti',
  title: 'Which deal is better for the landlord?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A tenant is choosing between two 5-year proposals for 10,000 SF. Option A has $36/SF annual rent, 6 months of free rent, and a $40/SF TI allowance. Option B has $38/SF annual rent, 3 months of free rent, and a $60/SF TI allowance. Ignore discounting and commissions for a quick comparison.',
  data: [
    { label: 'Option A', value: '$36/SF, 6 mo. free, $40/SF TI' },
    { label: 'Option B', value: '$38/SF, 3 mo. free, $60/SF TI' },
    { label: 'Term', value: '5 years' },
    { label: 'Size', value: '10,000 SF' },
  ],
  question: 'Which option gives the landlord the higher net effective rent, and why?',
  options: [
    {
      label: 'Option A: NER ≈ $24.40/SF versus ≈ $24.10/SF, with less cash out upfront.',
      isBest: true,
      explanation:
        'A: rent collected = $36 × 4.5 years = $162, less $40 TI = $122 ÷ 5 = $24.40/SF/yr. B: $38 × 4.75 years = $180.50, less $60 TI = $120.50 ÷ 5 = $24.10/SF/yr. A\'s higher NER is small, but A also puts $20/SF less capital at risk upfront, which favors it further once you discount.',
    },
    {
      label: 'Option B, because its headline rent is $2/SF higher.',
      isBest: false,
      explanation:
        'Headline rent ignores concessions. B\'s extra $2/SF is more than offset by the extra $20/SF of TI.',
    },
    {
      label: 'They are identical since both are 5-year leases.',
      isBest: false,
      explanation:
        'Same term does not mean same economics; the concession packages are different.',
    },
    {
      label: 'Option B, because free rent costs more than TI.',
      isBest: false,
      explanation:
        'A dollar of free rent and a dollar of TI cost the same on a straight-line basis, but TI is paid out in cash before the tenant pays anything, which is worse for the landlord in time-value terms.',
    },
  ],
  takeaway:
    'Compare deals on net effective rent, not headline rent. NER = (total rent − concessions) ÷ term; then consider timing, since upfront cash is more expensive than back-end concessions.',
  tips: [
    'Free rent months reduce total rent collected; TI is a cost.',
    'Each $1/SF of extra TI needs about $1/SF ÷ term of added annual rent to break even.',
    'Remember commissions and downtime on a full comparison.',
  ],
};
