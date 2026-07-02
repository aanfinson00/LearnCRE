import type { SituationalCase } from '../../types/situational';

export const leaseEconFreeRentEffectiveRent: SituationalCase = {
  id: 'lease-econ-free-rent-effective-rent',
  title: 'What\'s the real rent after the free-rent period?',
  category: 'lease-econ',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A prospective office tenant signs a 5-year (60-month) lease at a face rent of $30/SF/year, with 4 months of free rent up front and a $10/SF tenant improvement allowance the landlord funds at lease commencement. You need to convert this to a net effective rent to compare it against a competing space quoting a flat $27/SF with no concessions.',
  data: [
    { label: 'Lease term', value: '60 months' },
    { label: 'Face rent', value: '$30/SF/year' },
    { label: 'Free rent', value: '4 months' },
    { label: 'TI allowance (landlord-funded)', value: '$10/SF' },
    { label: 'Competing space', value: '$27/SF flat, no concessions' },
  ],
  question: 'What\'s the net effective rent on the concession-heavy lease, for comparison against the $27/SF flat quote?',
  options: [
    {
      label:
        'About $26.00/SF/year — average annual rent collected over the term (56 paying months × $30 ÷ 60 total months = $28/SF) minus the TI allowance amortized straight-line over the term ($10 ÷ 5 years = $2/SF/year), landing at $28 − $2 = $26/SF.',
      isBest: true,
      explanation:
        'Two concessions stack: (1) free rent reduces paying months from 60 to 56, so average annual rent collected is 56/60 × $30 = $28/SF/year; (2) the TI allowance is landlord cash spent up front that reduces the deal\'s net economics — amortized straight-line over the 5-year term, $10/SF ÷ 5 years = $2/SF/year. Net effective rent = $28 − $2 = $26/SF/year, below the competing $27/SF flat quote. Whether that makes the concession deal better or worse depends on the tenant\'s TI needs, but the $30/SF face rent materially overstates what the landlord is actually netting.',
    },
    {
      label: 'The lease is priced at $30/SF — the free rent and TI are separate negotiating items that don\'t change the "rent" figure used for comparison.',
      isBest: false,
      explanation:
        'This is exactly the mistake net-effective-rent analysis exists to prevent: comparing a $30/SF face rent against a $27/SF flat quote makes the concession-heavy deal look worse than it is, when in reality its true economics land below $27/SF. Free rent and TI are cash costs to the landlord (or cash benefits to the tenant) that belong in any apples-to-apples rent comparison.',
    },
    {
      label: 'Subtract only the free rent from face rent (56/60 × $30 = $28/SF) and ignore the TI allowance, since TI is a capital cost, not a rent concession.',
      isBest: false,
      explanation:
        'TI allowances function economically like a concession even though they\'re capitalized differently on the landlord\'s books — the landlord is spending cash to win the deal, and that cash reduces the deal\'s net yield exactly the same way free rent does. Leaving it out of the effective-rent comparison understates the true cost of the concession package by $2/SF/year in this example.',
    },
    {
      label: 'Subtract the full TI allowance ($10/SF) from one year of face rent only ($30 − $10 = $20/SF), and ignore free rent since it only applies once at the start.',
      isBest: false,
      explanation:
        'Misapplies the TI allowance as a one-time, one-year deduction rather than amortizing it over the full lease term — a $10/SF concession that supports a 5-year, 60-month commitment should be spread over that commitment, not dumped entirely into year one. It also drops the free-rent adjustment entirely, which materially matters (4 of 60 months, ~6.7% of the term).',
    },
  ],
  takeaway:
    'Net effective rent = (face rent × paying months ÷ total months) − (amortized TI allowance and any other landlord cash concessions). Face rent alone overstates what the landlord actually nets and can make a "cheaper-looking" flat quote misleading by comparison.',
  tips: [
    'Free rent reduces paying months, not the per-month rate — recompute average annual rent over the full term.',
    'Amortize TI allowances straight-line over the lease term before comparing to a flat quote.',
    'Always ask "face or effective?" before comparing two rent quotes.',
  ],
};
