import type { SituationalCase } from '../../types/situational';

export const retailCoTenancyDarkAnchor: SituationalCase = {
  id: 'retail-co-tenancy-dark-anchor',
  title: 'The anchor went dark',
  category: 'risk',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'portfolioMgmt'],
  assetClass: 'retail',
  scenario:
    'A 120,000 SF neighborhood center just lost its 50,000 SF grocery anchor to bankruptcy. The lease is not yet rejected, but the store is closed. Of the 70,000 SF of in-line space, 60% of the area has co-tenancy clauses that cut rent to 50% of base once the anchor is dark for more than 90 days.',
  data: [
    { label: 'Center GLA', value: '120,000 SF' },
    { label: 'Dark anchor', value: '50,000 SF' },
    { label: 'In-line GLA', value: '70,000 SF' },
    { label: 'In-line rent', value: '$28/SF NNN' },
    { label: 'Co-tenancy tenants', value: '60% of in-line GLA' },
    { label: 'Rent reduction', value: '50% after 90 days' },
  ],
  question: 'What is the annual rent at risk from co-tenancy alone?',
  options: [
    {
      label: 'About $588K — 42,000 SF × $28 × 50%.',
      isBest: true,
      explanation:
        '60% × 70,000 = 42,000 SF with co-tenancy rights. 42,000 × $28 = $1.176M of base rent. A 50% reduction removes $588K annually, before anyone actually leaves. Backfilling the anchor space is what restores it.',
    },
    {
      label: 'About $1.18M — co-tenancy tenants stop paying rent.',
      isBest: false,
      explanation:
        'Co-tenancy reduces rent to a percentage of base; it does not eliminate it. $1.18M is the total rent of those tenants, not the reduction.',
    },
    {
      label: 'About $980K — the full in-line rent roll less 50%.',
      isBest: false,
      explanation:
        'This applies the reduction to all 70,000 SF, but only 60% of the area has the right. It overstates the exposure by about two-thirds.',
    },
    {
      label: 'Nothing yet — the clauses only matter if tenants exercise them and leave.',
      isBest: false,
      explanation:
        'Co-tenancy rent reductions are generally automatic once the trigger occurs. The risk is cash flow now, with tenant departure as an added risk.',
    },
  ],
  takeaway:
    'A dark anchor hits twice: lost anchor rent and automatic co-tenancy reductions on part of the in-line space. Size the automatic piece first, then model backfill time.',
  tips: [
    'Read each co-tenancy clause for the trigger, cure period, and the reduced-rent floor.',
    'Reduced rent often ends the moment a replacement anchor opens.',
    'Track tenants who can also terminate after a longer dark period.',
  ],
};
