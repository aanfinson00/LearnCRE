import type { SituationalCase } from '../../types/situational';

export const officeLeaseUpAbsorption: SituationalCase = {
  id: 'office-lease-up-absorption',
  title: 'Office: submarket absorption is negative — should you still buy?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You're underwriting a Class-B downtown office acquisition. The subject building is 82% occupied with two full-floor tenants (30% of the rent roll) expiring in 18 months. Submarket net absorption has been negative for six consecutive quarters — the market is giving back space faster than it's leasing. The seller is underwriting to a 95% stabilized occupancy at market rent in Year 3.",
  data: [
    { label: 'Current occupancy', value: '82%' },
    { label: 'Roll risk (18 mos)', value: '30% of rent roll expiring' },
    { label: 'Submarket net absorption', value: 'Negative — 6 consecutive quarters' },
    { label: "Seller's stabilized occ assumption", value: '95% by Year 3' },
    { label: 'Submarket vacancy', value: '22%' },
  ],
  question:
    "How do you stress-test the seller's 95% stabilized occupancy assumption in a negative-absorption submarket?",
  options: [
    {
      label:
        "Anchor to current submarket vacancy (22%) and trend it toward 25–28% in your base case — negative absorption compounding over 6Q rarely reverses in 18 months. Model the two rolling tenants at 50% retention probability with 12 months of downtime on the vacating space, and stress the restabilization timeline to Year 5 instead of Year 3. That's the disciplined counter to the broker's pitch.",
      isBest: true,
      explanation:
        "Negative absorption means the submarket is actively shrinking net occupied space — tenants are giving back more SF than new tenants are signing. Six consecutive negative quarters is structural, not cyclical. Against that backdrop, a 95% stabilized target in Year 3 is heroic: it requires the subject to outperform a worsening market while simultaneously re-leasing two full floors. Stress steps: (1) apply submarket vacancy trajectory to subject occupancy ceiling, (2) assume downtime on roll (12–18 months is typical for Class-B downtown office), (3) assume re-leasing TIs and free rent that erode Year-3 NOI even if the tenants are found. The conservative model is not 95% in Year 3 — it's 82–88% in Year 3 with a Year-5 stabilization target at 88–92%, which changes the IRR dramatically.",
    },
    {
      label:
        "Accept the seller's assumption — negative absorption is a lagging indicator and a 3-year underwriting window should account for mean reversion.",
      isBest: false,
      explanation:
        "Negative absorption that's been running for 6 quarters is not a lagging indicator of anything — it's a real-time signal of demand destruction. 'Mean reversion' is not a model; it's a hope. In office submarkets with 20%+ structural vacancy (e.g., post-2020 downtown CBD markets), mean reversion may not happen within a 5-year underwriting horizon at all. Accepting the seller's 95% assumption without a stress case is how buyers get wrong-footed at exit.",
    },
    {
      label:
        "Focus only on the subject's own leasing pipeline and ignore submarket absorption — submarket data is too broad to matter at the asset level.",
      isBest: false,
      explanation:
        "Submarket absorption is the best external signal you have for the subject's re-leasing probability. If the submarket is shedding space, your two rolling tenants are more likely to downsize, consolidate elsewhere, or go remote — and replacement tenants face the same competitive options you're fighting against. The subject's pipeline matters, but submarket context sets the prior probability of filling the vacancy.",
    },
    {
      label:
        "Run the deal at the seller's 95% but apply a 100 bps cap widening on exit to compensate for the risk.",
      isBest: false,
      explanation:
        "Mixing optimistic NOI with a punitive exit cap creates internal inconsistency: if you believe occupancy reaches 95% in a recovering market, that market likely compresses cap rates, not widens them. If you believe cap rates widen due to structural weakness, that same weakness should depress the achievable stabilized occupancy. Stress one variable at a time with consistent internal logic.",
    },
  ],
  takeaway:
    "Negative absorption is one of the strongest signals in market analysis — it tells you that at current pricing, tenants prefer to give space back rather than keep it. In an office submarket compounding negative absorption, every stabilization assumption deserves explicit downside modeling: longer downtime, higher TIs, lower stabilized occupancy, and a later stabilization date. Stress your timeline to Year 5, not Year 3, and let the IRR speak for itself.",
  tips: [
    'Negative net absorption = occupied SF at end of period < occupied SF at start. Six quarters of this is structural.',
    'Class-B CBD office downtime on vacant floors is typically 12–24 months in a soft market. Budget it.',
    'If 95% stabilized in a 22%-vacancy submarket sounds too good, test what submarket vacancy would need to be for 95% to be achievable. If that number is implausible, so is the assumption.',
  ],
};
