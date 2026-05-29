import type { SituationalCase } from '../../types/situational';

export const absorptionOfficeRecovery: SituationalCase = {
  id: 'absorption-office-recovery',
  title: 'When does the CBD office submarket stabilize?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    "You're evaluating a 120,000 SF Class-A CBD office building currently 72% leased. The submarket has 4,200,000 SF of total Class-A inventory at 78% occupancy, with no new construction deliveries in the pipeline. Net absorption has been choppy: +80,000 SF last quarter, −40,000 SF the quarter before, +60,000 SF two quarters ago. Several large tenants are known to be right-sizing into lease expirations over the next 24 months.",
  data: [
    { label: 'Submarket inventory', value: '4,200,000 SF Class-A' },
    { label: 'Current submarket occupancy', value: '78%' },
    { label: 'Trailing 3Q net absorption', value: '+80K, −40K, +60K SF' },
    { label: 'Subject occupancy', value: '72%' },
    { label: 'Known lease expirations (24 mo)', value: 'Multiple large tenants right-sizing' },
  ],
  question: "How should you frame stabilization timing in your underwriting?",
  options: [
    {
      label: "Use a wide stabilization band (3–5 years) and sensitize around it — choppy absorption plus known right-sizing expirations means the path to 90%+ occupancy is nonlinear, and the model should reflect that uncertainty rather than picking a single point estimate.",
      isBest: true,
      explanation:
        "Averaging the trailing 3 quarters gives ~33K SF/quarter net absorption — but that mean conceals quarter-to-quarter swings of 120K SF. Applying 33K/quarter to the gap (4,200,000 × 0.78 = 3,276,000 leased; to reach 90%: need 3,780,000 = 504,000 SF more) implies ~15 quarters / 3.75 years — but the known right-sizing will temporarily push occupancy down before it recovers. Honest underwriting runs a base case (4 years), a downside (6 years), and shows how IRR degrades. Picking month 30 as a single point embeds undefendable precision.",
    },
    {
      label: "Net absorption averages ~33K SF/quarter; the gap to 90% is ~500K SF, so stabilization is roughly 15 quarters — model 4 years and done.",
      isBest: false,
      explanation:
        "The math is right but the conclusion skips the hard part: the known lease expirations will add vacancy before recovery. If right-sizing tenants give back 200K SF over the next 24 months, the effective gap grows to ~700K SF before it shrinks. A model that uses trailing absorption forward without adjusting for known supply events is systematically optimistic.",
    },
    {
      label: "No new construction is a positive signal — supply-side pressure is zero, so demand will absorb available space quickly.",
      isBest: false,
      explanation:
        "Zero new construction removes one headwind but doesn't create demand. CBD office demand is driven by employment growth, tenant densification trends, and remote-work policy — all of which are independent of the supply pipeline. Empty buildings without new construction still take years to fill if tenant demand is weak or contracting.",
    },
    {
      label: "Skip the submarket absorption analysis — at 72% occupancy, the building-level lease-up is the key variable, and a good leasing broker can move it faster than the market average.",
      isBest: false,
      explanation:
        "Individual building performance can differ from the submarket, but in a 22%-vacant submarket, every tenant has abundant alternatives. Building-level lease-up is not independent of the submarket; it competes for the same shrinking tenant demand. Ignoring submarket absorption means you can't defend the lease-up timeline to a lender or IC.",
    },
  ],
  takeaway:
    "Choppy or negative net absorption signals a market in transition, not a market trending predictably. When trailing absorption has high variance, don't average it — widen the stabilization band and sensitize the model. Known future supply events (expirations, right-sizings) should be added to the demand gap before projecting recovery.",
  tips: [
    'Variance in quarterly absorption is itself a signal — high variance = harder to project.',
    'Known lease expirations that result in right-sizing add to the vacancy gap before absorption clears it.',
    'In recovering office markets, modeled stabilization should have a base case, downside, and the IRR sensitivity between them.',
  ],
};
