import type { SituationalCase } from '../../types/situational';

export const leaseEscalationFlatVsCpi: SituationalCase = {
  id: 'lease-escalation-flat-vs-cpi',
  title: 'Fixed bumps vs. CPI-linked — which is better for the landlord?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    "A 50,000 SF industrial tenant wants to sign a 10-year NNN lease at $14/SF base rent. They've proposed two escalation structures: (A) 3% fixed annual bumps, or (B) CPI-linked bumps, capped at 5% and floored at 1.5% annually. The current CPI environment is elevated (5–6%) but uncertain over a 10-year horizon. The landlord is evaluating which to accept.",
  data: [
    { label: 'Starting rent', value: '$14/SF NNN' },
    { label: 'Lease term', value: '10 years' },
    { label: 'Space', value: '50,000 SF industrial' },
    { label: 'Option A', value: '3% fixed annual bumps' },
    { label: 'Option B', value: 'CPI-linked, floor 1.5%, cap 5%' },
    { label: 'Current CPI', value: '5–6% (elevated, uncertain path)' },
  ],
  question: 'Which escalation structure is better for the landlord, and why?',
  options: [
    {
      label: "In an elevated CPI environment, Option B (CPI-linked with a 5% cap and 1.5% floor) likely outperforms Option A (3% fixed) for several years — but Option A provides predictable compounding and protects against CPI falling below 3%. The landlord's choice should depend on their view of long-term inflation: if CPI normalizes below 3%, Option A is better; if it stays elevated, Option B is better. Neither dominates unconditionally.",
      isBest: true,
      explanation:
        "At current CPI of 5–6%, Option B delivers 5% bumps (capped) vs. Option A's 3% — an advantage for the landlord early in the lease. However, if CPI reverts toward 2% (as many forward-looking forecasts assume), Option B delivers 1.5% (floored) vs. Option A's 3% — a disadvantage. Over a 10-year horizon, the crossover point depends on the CPI path. The floor and cap limit both the upside and downside of CPI exposure. Landlords who believe in sustained inflation prefer Option B; those who value certainty or expect CPI normalization prefer Option A. The key analytic is to compute both year-by-year rent streams under different CPI scenarios and compare the NPV of each.",
    },
    {
      label: "Option B (CPI-linked) is always better for the landlord because CPI protects against inflation.",
      isBest: false,
      explanation:
        "CPI-linked leases protect against inflation but underperform fixed bumps when inflation is low. With a 1.5% floor, Option B only delivers 1.5% in low-inflation years vs. Option A's 3%. If CPI averages 2% over the 10-year term (plausible normalization), Option B's 1.5% floor significantly underperforms Option A's 3% fixed. 'CPI protects against inflation' is true for the upside; it ignores the floor-limited downside.",
    },
    {
      label: "Option A (3% fixed) is always better for the landlord because it provides certainty and higher compounding.",
      isBest: false,
      explanation:
        "Fixed bumps are better when CPI is low, but at current 5–6% CPI, Option B's cap delivers the same 5% — outperforming Option A by 200 bps annually. The certainty argument for Option A is a timing call, not a structural advantage. Certainty has value, but it comes at a cost in high-inflation environments.",
    },
    {
      label: "Accept Option B — the 5% cap means the landlord keeps most of the inflation protection while limiting upside given to the tenant.",
      isBest: false,
      explanation:
        "The 5% cap benefits the tenant (limits their exposure), not the landlord. The cap prevents the landlord from capturing rent increases above 5% if CPI spikes higher. The floor (1.5%) also limits the landlord's downside, but framing the cap as a landlord benefit inverts the economics. The correct framing: Option B is a range bet on CPI between 1.5% and 5%; above or below that range, the fixed 3% bump may be better.",
    },
  ],
  takeaway:
    "Fixed vs. CPI-linked escalation is a view on long-run inflation. Fixed bumps outperform CPI-linked floors in low-inflation environments; CPI-linked (up to the cap) outperforms in high-inflation environments. With a cap and floor, Option B is a bounded inflation bet. To choose, compute NPV of both rent streams under your base case and downside CPI scenarios — don't pick on intuition alone.",
  tips: [
    'Build a simple table: CPI assumption across columns (0%, 1.5%, 2%, 3%, 5%) × escalation structure across rows → year-10 rent and NPV.',
    'Caps benefit tenants; floors benefit landlords. Both are tradeoffs, not free protection.',
    'Industrial and multifamily typically prefer fixed bumps for appraisal simplicity; retail tenants often prefer CPI-linked to manage cost uncertainty.',
  ],
};
