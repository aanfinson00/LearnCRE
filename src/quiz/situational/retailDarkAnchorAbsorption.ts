import type { SituationalCase } from '../../types/situational';

export const retailDarkAnchorAbsorption: SituationalCase = {
  id: 'retail-dark-anchor-absorption',
  title: 'Your anchor just went dark — what happens to the rest?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'retail',
  scenario:
    'You manage a 280,000 SF community retail center anchored by a 60,000 SF grocery. The grocer has announced it will not renew when its lease expires in 8 months. The remaining 220,000 SF of inline and junior anchor space is currently 92% leased. Your senior lender is watching the situation — DSCR is 1.35x today with the anchor paying $12/SF NNN.',
  data: [
    { label: 'Total GLA', value: '280,000 SF' },
    { label: 'Anchor SF', value: '60,000 SF grocery (going dark in 8 mos)' },
    { label: 'Inline/junior anchor occupancy', value: '92%' },
    { label: 'Current DSCR', value: '1.35x' },
    { label: 'Anchor rent', value: '$12/SF NNN' },
  ],
  question:
    'Beyond the direct rent loss, what absorption risk does the anchor departure create?',
  options: [
    {
      label:
        'Co-tenancy clause triggers are the primary risk — inline tenants may have rent abatement or early termination rights if the anchor goes dark, cascading the vacancy well beyond the 60,000 SF anchor space.',
      isBest: true,
      explanation:
        'Grocery-anchored retail leases frequently include co-tenancy provisions: if the anchor vacates, inline tenants may be entitled to rent abatements or early termination rights, because their sales depend on the anchor\'s traffic draw. A center that is 92% leased can drop to 65–70% leased quickly if several inline tenants exercise rights simultaneously. The DSCR impact of dark-anchor-plus-co-tenancy cascades can be severe — the lender\'s first question will be about co-tenancy exposure. Review every inline lease before modeling the re-absorption timeline.',
    },
    {
      label:
        'Model a 12-month downtime for the anchor space and hold inline occupancy flat — groceries are well-understood replacement categories.',
      isBest: false,
      explanation:
        'Grocery replacement cycles typically run 18–36 months, not 12 — the 60,000 SF footprint is oversized for most food & beverage tenants, and a grocer-grade credit tenant takes time to source and negotiate. More critically, this answer ignores co-tenancy risk, which is the first issue a lender or buyer will flag.',
    },
    {
      label:
        'The inline tenants are unaffected — they have their own leases and the anchor departure is a separate issue.',
      isBest: false,
      explanation:
        'Ignores co-tenancy provisions that are standard in grocery-anchored retail leases specifically because inline tenants\' sales volumes correlate with anchor traffic. Failure to identify co-tenancy exposure before the anchor vacates is a material asset management gap.',
    },
    {
      label:
        'Sell the center before the anchor non-renewal is public — any disclosure will reprice the deal.',
      isBest: false,
      explanation:
        'The anchor has already announced non-renewal, making this a disclosure event for any sale. A buyer capable of pricing retail distress will adjust accordingly. The better path is a documented replacement plan and a clear co-tenancy analysis that supports the going-concern value in any sale or refinancing process.',
    },
  ],
  takeaway:
    'Dark anchor events trigger two distinct risks: (1) direct rent and NOI loss from the vacant anchor space, and (2) co-tenancy clause cascades that can destabilize inline occupancy. Always review every lease for co-tenancy provisions before projecting the absorption timeline — the legal exposure is the first input to the re-leasing model.',
  tips: [
    'Co-tenancy clauses are most common in grocery-anchored and power center retail.',
    'Anchor re-lease downtime: 18–36 months for grocery replacement, 12–24 months for junior anchors.',
    'Stress DSCR at: anchor dark + co-tenancy-exercised inline tenants simultaneously.',
  ],
};
