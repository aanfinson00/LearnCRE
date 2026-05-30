import type { SituationalCase } from '../../types/situational';

export const industrialRentBumpsVsFlat: SituationalCase = {
  id: 'industrial-rent-bumps-vs-flat',
  title: 'Fixed bumps vs. CPI — which structure wins?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'A 3PL tenant is renewing a 7-year lease on 200,000 SF of industrial space at $7.00/SF base rent. They propose two structures: (A) 3% annual fixed bumps, or (B) CPI escalations capped at 5% per year with no floor. Current CPI is running at 4.2%; the Fed long-run target is 2%. You are the asset manager recommending a structure to ownership.',
  data: [
    { label: 'Base rent', value: '$7.00/SF' },
    { label: 'Lease term', value: '7 years' },
    { label: 'Option A', value: '3% fixed annual bumps' },
    { label: 'Option B', value: 'CPI escalation, 5% cap, no floor' },
    { label: 'Current CPI', value: '4.2%' },
    { label: 'Fed long-run CPI target', value: '2.0%' },
  ],
  question: 'Which structure should ownership prefer, and why?',
  options: [
    {
      label: 'Option A (3% fixed) is the safer choice for ownership — it provides predictable, compounding rent growth regardless of CPI trajectory, and avoids the downside of a no-floor CPI structure reverting to sub-2% in a low-inflation environment.',
      isBest: true,
      explanation:
        '3% fixed compounds to a year-7 rent of $8.61/SF (7.00 × 1.03^7). If CPI reverts to the Fed target of 2%, Option B produces a year-7 rent of $8.03/SF — 7% less income over the term. The "no floor" in Option B is the key risk: a tenant proposing CPI with no floor is betting that inflation will stay low. In a 2% CPI world, fixed 3% bumps outperform by ~1 ppt/yr compounded. The 5% cap provides minimal landlord upside protection since industrial NNN rents rarely grow >5%/yr anyway. The asymmetry favors Option A unless ownership is explicitly positioning for sustained high inflation.',
    },
    {
      label: 'Option B (CPI) is better — current CPI at 4.2% will generate higher rent bumps than the 3% fixed option.',
      isBest: false,
      explanation:
        'Anchoring to the current 4.2% CPI ignores the mean-reversion risk over a 7-year term. With a no-floor structure, if CPI drops to 1.5–2% (the Fed\'s target and the likely medium-term outcome), Option B underperforms Option A by 1 ppt+ per year compounded. Using current elevated CPI to project future escalation is a classic underwriting mistake.',
    },
    {
      label: 'Neither — negotiate a 3.5% fixed bump to split the difference.',
      isBest: false,
      explanation:
        'Not wrong as a negotiation tactic, but misses the analysis. The question is whether to anchor to fixed or CPI, which requires understanding the inflation trajectory, not just splitting the spread. If CPI reverts to 2%, a 3.5% fixed bump outperforms Option B even more than the original 3%. The framing should be "fixed vs. floating" before landing on a number.',
    },
    {
      label: 'Add a floor of 2% to Option B and accept it — that makes CPI safer for ownership.',
      isBest: false,
      explanation:
        'A 2% floor on CPI (capped at 5%) turns Option B into a reasonably symmetrical structure, but the question is whether it outperforms Option A\'s 3% fixed. With a 2% floor and 5% cap, Option B only exceeds Option A when CPI is above 3% for most of the term — possible but not the base case. If the tenant accepts a 2% floor, ownership should counter with a 3.5% floor, not a 2% floor.',
    },
  ],
  takeaway:
    'Fixed bumps outperform CPI escalations over long lease terms in mean-reverting inflation environments. The trap is anchoring to elevated current CPI to project future escalations. A "no floor" CPI structure shifts risk to the landlord if inflation normalizes. Evaluate by compounding both structures to the end of the lease term under a base (Fed target) and stress (current CPI) scenario.',
  tips: [
    'Fixed 3% compounds to ~1.23x over 7 yrs; CPI at 2% compounds to ~1.15x — a 7% gap.',
    '"No floor" CPI means rent grows by 0% if CPI goes negative — always negotiate a minimum.',
    'Rule of thumb: prefer fixed if CPI target < bump rate; prefer CPI if you expect structural inflation.',
  ],
};
