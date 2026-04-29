import type { SituationalCase } from '../../types/situational';

export const rentRollUndervalued: SituationalCase = {
  id: 'rent-roll-undervalued',
  title: 'Why does this rent roll look like a bargain?',
  category: 'pricing',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    'A multifamily portfolio has a weighted average remaining lease term of 7 years on its anchor leases (commercial ground-floor) with annual bumps of 1.0%. The submarket has been growing rents at ~4% per year for the past 5 years. Residential units (95% of NRSF) are on standard 12-month leases at market. The deal is being marketed at a 5.75% cap, in line with comps.',
  data: [
    { label: 'Anchor lease remaining', value: '7 years' },
    { label: 'Anchor annual bumps', value: '1.0%' },
    { label: 'Submarket rent growth', value: '~4%/yr' },
    { label: 'Residential leases', value: '12-month, at market' },
    { label: 'Going-in cap', value: '5.75% (comp-line)' },
  ],
  question: 'What\'s the most defensible read on the upside?',
  options: [
    {
      label: 'Real upside is the anchor leases — 1% vs 4% market growth compounds into a ~20%+ rent gap by year 7. Residential is at market and won\'t drive outsized growth.',
      isBest: true,
      explanation:
        'Compounding: (1.04/1.01)^7 − 1 ≈ 22%. The anchor leases are systematically falling behind market by ~3% per year. By rollover, you can reset to a market that\'s 20%+ above the lease bump trajectory. Residential is mark-to-market on every renewal so the gap doesn\'t accumulate there.',
    },
    {
      label: 'Real upside is residential — a 12-month lease term means you can push rents quickly.',
      isBest: false,
      explanation:
        'Residential is *already* at market. Pushing rents faster than market growth is fighting the comp set, not capturing latent value. The 12-month structure means you participate in market growth, which is roughly the cap rate spread to risk-free already priced into the deal.',
    },
    {
      label: 'There\'s no obvious upside — comps are at 5.75% and the deal is at 5.75%. Pricing is efficient.',
      isBest: false,
      explanation:
        'Pricing parity at the cap level doesn\'t mean upside parity. The going-in cap reflects in-place income; the upside is in the *trajectory* of that income. Compare two assets at the same 5.75%: one has anchor leases below market, one doesn\'t — the first one has materially better trended NOI growth.',
    },
    {
      label: 'The 1% anchor bumps are a red flag — those tenants negotiated a below-market deal that signals weak demand.',
      isBest: false,
      explanation:
        'Inverts the cause and effect. 1% bumps were negotiated when market rent growth was much lower; they reflect the original landlord accepting structural underwriting, not weak tenant credit or demand. The "below market" is now an artifact of growth running ahead of the bump schedule, which is the upside.',
    },
  ],
  takeaway:
    'A bumps-vs-growth gap is one of the cleanest upside structures in CRE. (1 + market) / (1 + bumps) compounds — the longer the remaining term, the bigger the gap at rollover. The trick is to model trended NOI to lease expiry, not just to apply a flat 4% to all rent.',
  tips: [
    'Cumulative gap ≈ (1 + market) / (1 + bumps) − 1, compounded over remaining term.',
    'Watch for "below-market" markers in OMs that mean opposite things in different markets.',
    'The longer the remaining term + the wider the bumps-vs-market gap, the larger the latent uplift.',
  ],
};
