import type { SituationalCase } from '../../types/situational';

export const leaseFreeRentVsTi: SituationalCase = {
  id: 'lease-free-rent-vs-ti',
  title: 'Free rent or TI — which concession actually costs more?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A tenant agrees to sign a 10-year office lease at $36/SF full-service. They want one of two concession packages: Option A is 8 months of free rent at lease commencement. Option B is a $75/SF tenant improvement allowance paid at commencement. Your cost of capital is 8%. Ignore rent escalations for this comparison.',
  data: [
    { label: 'Lease term', value: '10 years' },
    { label: 'Base rent', value: '$36/SF, full-service' },
    { label: 'Option A', value: '8 months free rent at commencement' },
    { label: 'Option B', value: '$75/SF TI allowance at commencement' },
    { label: 'Landlord cost of capital', value: '8%' },
  ],
  question: 'Which concession is cheaper for the landlord on a net-present-value basis?',
  options: [
    {
      label: 'The TI allowance is more expensive. $75/SF is a lump-sum cash outflow at signing worth $75/SF in NPV. Eight months of free rent is deferred income worth approximately $24/SF ($36 × 8/12), occurring in months 1–8 and thus nearly full NPV — call it ~$23/SF. The TI costs roughly 3× more in present-value terms.',
      isBest: true,
      explanation:
        'Free rent: $36/SF × (8/12) = $24/SF of foregone income occurring in months 1–8. At an 8% annual discount rate, months 1–8 are discounted only 4–5% — the NPV is approximately $23/SF. TI allowance: $75/SF cash out at or before lease commencement = $75/SF NPV, no discounting. The TI is over 3× more expensive in present value. The practical implication: landlords should prefer free rent as a concession because it defers income rather than spending cash. Tenants typically prefer TI (they control the buildout). This tension is where most lease concession negotiations land — the landlord offers free rent; the tenant pushes for TI.',
    },
    {
      label: 'Free rent is more expensive — 8 months at $36/SF is $24/SF plus the landlord still pays OpEx during free months, raising the total cost above $30/SF.',
      isBest: false,
      explanation:
        'Correctly notes that OpEx continues during free rent (for a full-service lease, landlord bears operating costs whether or not rent is collected). Adding ~$10–12/SF of OpEx cost during free months brings the true free-rent cost to roughly $33–36/SF — still well below the $75/SF TI. The comparison still favors free rent as the cheaper concession, even accounting for the OpEx drag.',
    },
    {
      label: 'They are economically equivalent — both reduce effective rent to the same annualized level over the lease term.',
      isBest: false,
      explanation:
        'Effective rent equalizes the annualized cost, but not the NPV. Effective rent on Option A: $36 × (10 − 8/12) / 10 = $33.6/SF. Effective rent on Option B depends on how the TI is amortized in the face rent — but more importantly, a $75/SF cash outflow today has a fundamentally different present value than $24/SF of deferred income. Effective rent is a useful shorthand for comparing deals but does not capture cash timing.',
    },
    {
      label: 'It depends on what the TI funds — if it is base-building work, it stays when the tenant leaves and has residual value.',
      isBest: false,
      explanation:
        'True that base-building TI may have residual value (landlord retains improvements at lease expiry). But from a cash flow perspective, the TI is still a $75/SF outflow today against an uncertain future benefit. The question asks which concession costs more on a present-value basis, and the answer is the TI — regardless of whether some residual value remains at lease expiry. Residual value is a separate diligence question, not a counterargument to NPV analysis.',
    },
  ],
  takeaway:
    'Free rent and TI allowances both reduce a tenant\'s effective cost, but they have very different cash flow profiles for the landlord. Free rent is deferred income; TI is a lump-sum cash outflow. On an NPV basis, the TI is almost always more expensive for equivalent nominal values. The negotiation dynamic reflects this: tenants prefer TI (cash control), landlords prefer free rent (deferred, not permanent). Hybrid structures — partial TI plus free rent — are the common landing zone.',
  tips: [
    'Free rent NPV: monthly rent × months of free rent (occurs early in term, minimal discounting at typical discount rates).',
    'TI NPV: face value of the allowance (dollar-for-dollar cash out at commencement, no discounting).',
    'Effective rent = (contract rent × paying months) / total months; useful for deal comparison but does not capture cash timing differences.',
  ],
};
