import type { SituationalCase } from '../../types/situational';

export const leaseEscalationStructure: SituationalCase = {
  id: 'lease-escalation-structure',
  title: 'Fixed bumps vs CPI escalation — which structure benefits the landlord?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're negotiating a 10-year NNN industrial lease. The tenant offers two escalation structures: (A) 2.5% fixed annual rent bumps, or (B) CPI-linked escalation with a 1% floor and 3% cap. Trailing 10-year CPI averaged 3.8%, but was 2.1% in 2010–2019 and 6.2% in 2020–2023. Market consensus for the next 5 years is 2-3% annual inflation.",
  data: [
    { label: 'Lease term', value: '10 years NNN' },
    { label: 'Option A', value: '2.5% fixed annual bumps' },
    { label: 'Option B', value: 'CPI-linked, 1% floor, 3% cap' },
    { label: 'Trailing 10-yr CPI', value: '3.8% avg' },
    { label: 'Pre-2020 CPI', value: '2.1% avg' },
    { label: '2020–2023 CPI', value: '6.2% avg' },
    { label: 'Consensus inflation forecast', value: '2–3%/yr for next 5 yrs' },
  ],
  question: 'Which escalation structure is better for the landlord, and why?',
  options: [
    {
      label:
        "Option B (CPI with 1%/3% collar) is better for the landlord when CPI exceeds 2.5%, while Option A is better when CPI stays below 2.5%. Given recent CPI volatility and a consensus range of 2-3%, the collar in Option B captures upside above 2.5% while providing a 1% floor against deflation — making it the better hedge over a 10-year NNN term.",
      isBest: true,
      explanation:
        "At exactly 2.5% CPI, both structures are equivalent. At 2% CPI: Option A gives 2.5%, Option B gives 2% — landlord prefers A. At 3% CPI: Option A gives 2.5%, Option B gives 3% — landlord prefers B. At 6% CPI (as seen in 2020-2023): Option A gives 2.5%, Option B is capped at 3% — Option B still wins. The collar converts Option B into 'minimum 1%, maximum 3%, with upside over 2.5% if CPI reaches that level.' In a 10-year industrial NNN deal, the expected value of Option B is higher when the CPI distribution has meaningful probability above 2.5%, which recent history suggests is true. Option A is better only in a persistently low-inflation environment (sub-2.5%).",
    },
    {
      label:
        "Always take fixed bumps — they're predictable and that certainty has real value in underwriting.",
      isBest: false,
      explanation:
        "Predictability has value but so does inflation protection. Fixed 2.5% bumps locked landlords in at below-inflation rates during 2020-2023 (6.2% CPI). Over a 10-year lease, the compounding difference between 2.5% fixed vs. 3% CPI-capped is meaningful: starting at $20/SF, year-10 rent at 2.5% = $25.60/SF vs. at 3.0% = $26.88/SF — a 5% cumulative rent difference. The 'easier to model' argument is a preference, not an economic justification.",
    },
    {
      label:
        "Negotiate uncapped CPI — capture all inflationary upside without any ceiling.",
      isBest: false,
      explanation:
        "Uncapped CPI is unlikely to be agreed to by an industrial tenant budgeting occupancy costs over a 10-year commitment. The 3% cap is a practical negotiating reality: it falls within what the tenant can model into their distribution economics. Insisting on uncapped CPI risks losing the tenant to a landlord who structures the collar. The marginal value of uncapped CPI above 3% (which requires sustained high inflation) usually doesn't justify losing the deal.",
    },
    {
      label:
        "It doesn't matter much — both structures produce similar outcomes over 10 years.",
      isBest: false,
      explanation:
        "Not true. Starting at $20/SF: Option A (2.5% fixed) produces a year-10 rent of ~$25.60/SF; Option B at 3% cap produces ~$26.88/SF — a $1.28/SF difference that, on a 100,000 SF industrial lease, is $128k/yr of additional revenue in year 10, and meaningful NPV over the hold. For a portfolio of 20+ leases, the escalation structure choice is a significant value driver. The structures are not equivalent.",
    },
  ],
  takeaway:
    'Fixed escalations and CPI-collared escalations have different expected values depending on the CPI distribution over the hold. Fixed bumps win when CPI stays below 2.5%; CPI floor/cap wins when CPI exceeds 2.5%. Given post-2020 CPI volatility, the 1%/3% collar hedges both tails (floor protects against deflation; cap limits tenant burden) and produces higher expected rent than a 2.5% flat bump when the CPI consensus is 2-3%. Negotiate escalation structure as actively as base rent.',
  tips: [
    "CPI collar = minimum inflation participation (floor) + maximum tenant burden cap. It's a risk-sharing tool.",
    '2.5% fixed ≈ break-even vs. 2.5% CPI; the collar becomes valuable when CPI deviates from that level.',
    'Industrial tenants budget occupancy costs 10 years out — the 3% cap is typically the negotiating ceiling.',
  ],
};
