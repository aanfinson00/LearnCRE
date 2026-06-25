import type { SituationalCase } from '../../types/situational';

export const retailLeaseStructureCompAdj: SituationalCase = {
  id: 'retail-lease-structure-comp-adj',
  title: 'Your retail comps mix NNN and gross leases — how do you normalize them?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You're pricing a 40,000 SF neighborhood strip center with NNN leases in place. The broker provides three sale comps, but they're structured differently: one NNN, one gross, and one modified gross.",
  data: [
    {
      label: 'Comp 1',
      value: 'NNN leases · tenant pays taxes, insurance, and CAM · 6.8% cap on in-place NOI',
    },
    {
      label: 'Comp 2',
      value:
        'Gross leases · landlord pays all operating expenses ($8/SF) · 7.5% cap on in-place NOI',
    },
    {
      label: 'Comp 3',
      value:
        'Modified gross · landlord pays taxes + insurance, tenant pays CAM · 7.1% cap on in-place NOI',
    },
    { label: 'Typical strip center NNN OpEx', value: '$6–9/SF (taxes + insurance + CAM)' },
  ],
  question: 'How should you normalize the comp set to produce a valid pricing anchor?',
  options: [
    {
      label:
        'Convert all comps to a NNN-equivalent NOI: reduce Comp 2\'s NOI by the landlord expense burden (~$8/SF), reduce Comp 3\'s NOI by the taxes + insurance portion (~$4/SF), then recalculate the implied cap rates. The normalized caps will converge to a tighter range, and the NNN-equivalent anchor for your subject is likely in the 6.8–7.2% zone.',
      isBest: true,
      explanation:
        'Lease structure determines what\'s included in NOI. An NNN lease reports NOI as rent only (tenant pays all expenses). A gross lease reports NOI as rent minus all landlord-paid expenses. Comparing reported caps across structures is an apples-to-oranges exercise. Normalize by adjusting each comp\'s NOI to a common NNN basis: remove the landlord-paid expense from gross-lease NOI, and recalculate the implied cap. For Comp 2: if gross rent is $X and landlord pays $8/SF, NNN-equivalent NOI ≈ gross NOI + $8/SF × leased SF. After normalization, the three comps will tell a consistent story instead of showing a misleading 70 bps spread.',
    },
    {
      label:
        'Use only Comp 1 (NNN) — the cleanest match to the subject. The gross and modified-gross comps are not comparable to a NNN-leased center.',
      isBest: false,
      explanation:
        'Sample size of 1 is too thin to support pricing. Comps 2 and 3 are usable with documented adjustments for lease structure. Discarding them reduces your evidence base unnecessarily. The discipline is normalization, not elimination — three adjusted comps beat one unadjusted comp.',
    },
    {
      label:
        'Average all three reported caps — lease structure differences wash out when you average enough comps.',
      isBest: false,
      explanation:
        "They don't wash out — they systematically bias the result. Gross-lease caps look wider than NNN caps for the same asset because the expense burden comes out of reported NOI. Averaging the unadjusted figures will produce a cap rate between the NNN price and the gross-lease price, biased toward a result that reflects a blend of two different gross income levels rather than a clean market indicator.",
    },
    {
      label:
        'Discard all comps and request NNN-only comps from the broker — mixing structures introduces too much noise.',
      isBest: false,
      explanation:
        'In most markets, you will not find a comp set of exclusively matching lease structures. Requiring that eliminates valid evidence. The right approach is to do the normalization work yourself — it takes one additional step per comp (adjusting NOI for the landlord expense burden) and produces a defensible, cross-structure pricing grid.',
    },
  ],
  takeaway:
    'Cap rates are only comparable when the NOI they reference is defined the same way. NNN NOI excludes all expenses; gross NOI includes some or all of them. Always normalize to NNN-equivalent NOI before comparing cap rates across lease structures. A 70 bps spread across mixed-structure comps can collapse to 20–30 bps once correctly normalized — that\'s the market signal you\'re actually looking for.',
  tips: [
    'NNN-equivalent NOI = gross-lease NOI + landlord-paid expenses (taxes + insurance + CAM).',
    'Strip center operating expenses typically run $6–9/SF for taxes + insurance + CAM combined.',
    'When structuring your own deal, NNN vs. gross is a gross-rent equivalence: $30 NNN ≈ $38 gross if OpEx is $8/SF.',
  ],
};
