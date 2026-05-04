import type { SituationalCase } from '../../types/situational';

export const groundLeaseVsFee: SituationalCase = {
  id: 'ground-lease-vs-fee',
  title: 'Ground lease vs fee simple — what changes in your underwriting?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  assetClass: 'mixed',
  scenario:
    'You\'re evaluating two land deals for a 200-unit MF development. Site A: $10M fee-simple purchase. Site B: 99-year ground lease at $400k/yr (fixed for 10 years, then 10% bumps every 10 years thereafter). Construction cost is identical at $40M for both sites.',
  data: [
    { label: 'Site A — fee simple', value: '$10M land cost' },
    { label: 'Site B — ground lease', value: '$0 upfront, $400k/yr' },
    { label: 'Bumps', value: '10%/decade after year 10' },
    { label: 'Term', value: '99 years' },
    { label: 'Construction cost (both)', value: '$40M' },
  ],
  question: 'What\'s the most important underwriting shift for the ground-lease deal?',
  options: [
    {
      label:
        'Treat the ground rent as a senior obligation that subordinates everything else — including your debt and equity — so your effective NOI is `building NOI − ground rent`. Your exit cap on the leasehold should be 75-150 bps wider than fee-simple to compensate the next buyer for the same subordination risk plus the eroding remaining term.',
      isBest: true,
      explanation:
        'A ground lease is a permanent payment that sits ahead of your debt and equity. Your "NOI" is building NOI minus ground rent; that\'s what your DSCR test and cap rate apply to. Beyond that, leasehold value erodes as the remaining term shortens — a 99-year lease today is great; a 49-year leasehold to a future buyer is worse, and a 19-year leasehold is essentially worthless. Sophisticated leasehold underwriting widens the exit cap by 75-150 bps to price in (a) the subordination, (b) the term-erosion effect, and (c) the harder financing market for leaseholds (most permanent lenders haircut LTV on leasehold collateral). The reduced upfront cost is offset by all of the above.',
    },
    {
      label: 'Treat ground rent as an OpEx line — it\'s an annual cost like property tax, just folded into your expense ratio.',
      isBest: false,
      explanation:
        'Materially under-prices the structural difference. OpEx is variable and partially controllable; ground rent is fixed (or pre-set escalating) and senior. Lumping them together produces a wrong DSCR and a wrong exit cap on the leasehold. Lenders treat ground rent as senior debt-like for analysis; you should too.',
    },
    {
      label: 'The $10M upfront savings is the dominant factor — use it as Day-1 IRR juice and treat the rest of the deal as similar to fee-simple.',
      isBest: false,
      explanation:
        'Reads only the upfront-cost line. The recurring rent + the leasehold-vs-fee exit cap haircut typically eat all of the upfront savings over the hold period. Sophisticated underwriting models the full lifecycle and usually finds fee-simple wins for development deals because of the leasehold exit-cap penalty.',
    },
    {
      label: 'Use a discount-rate comparison: the present value of ground rents at 7% discount vs the $10M upfront cost — pick whichever is lower.',
      isBest: false,
      explanation:
        'Misses the exit-cap effect entirely. PV-of-rents vs upfront-cost is one piece of the comparison, but the leasehold haircut at exit is often the dominant difference and isn\'t captured by simple PV math. Full underwriting compares leasehold IRR to fee IRR with all the structural differences priced in.',
    },
  ],
  takeaway:
    'Ground leases trade upfront cost for a permanent senior obligation plus a structural exit penalty. The leasehold-fee gap shows up at three points: (1) ongoing NOI (subtract ground rent), (2) exit cap (75-150 bps wider for leaseholds), (3) financing terms (lower LTV from most lenders). Sometimes ground leases pencil — institutional ground-leased product in tier-1 markets — but for typical MF development, fee simple usually beats leasehold once all three effects are priced.',
  tips: [
    'Effective NOI on leasehold = building NOI − ground rent. Apply your cap rate to that, not to building NOI.',
    'Leasehold financing: most lenders haircut LTV by 5-15% vs the same fee-simple deal.',
    'Remaining lease term at exit: at least 30-40 years remaining is the typical financeability floor for institutional product.',
  ],
};
