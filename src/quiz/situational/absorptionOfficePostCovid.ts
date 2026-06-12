import type { SituationalCase } from '../../types/situational';

export const absorptionOfficePostCovid: SituationalCase = {
  id: 'absorption-office-post-covid',
  title: 'How long before this office market clears the shadow inventory?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A downtown office submarket has 8 million SF of total inventory. Direct vacancy sits at 18%, and there is an additional 4% sublease availability — much of it from tenants with 2–3 years remaining on their leases who are marketing excess space. Trailing 12-month net absorption has been −150,000 SF (negative). No new deliveries are expected in the next 24 months. You are evaluating an acquisition that needs the submarket to reach 12% direct vacancy before you can underwrite rent growth.',
  data: [
    { label: 'Total inventory', value: '8,000,000 SF' },
    { label: 'Direct vacancy', value: '18%' },
    { label: 'Sublease availability', value: '4% (320,000 SF)' },
    { label: 'Trailing 12-mo net absorption', value: '−150,000 SF' },
    { label: 'New deliveries (24-mo pipeline)', value: 'None' },
    { label: 'Target direct vacancy', value: '12%' },
  ],
  question:
    'What is the most important thing to understand before estimating the time to 12% vacancy?',
  options: [
    {
      label:
        'The market has two sources of supply — direct vacant space and shadow sublease space. Both must be absorbed before direct vacancy meaningfully improves. With negative trailing absorption, the market is moving in the wrong direction; the earliest plausible recovery is likely 3–5+ years out, not months.',
      isBest: true,
      explanation:
        'Shadow sublease space is critical: even as direct leases expire, sublease space re-enters the market as vacant SF, resetting the counter. With 4% (320K SF) of sublease availability burning down over 2–3 years, and net absorption negative, the pipeline of available space will keep rising before it falls. At −150K SF/yr absorption, the market needs absorption to turn positive and average +200K SF/yr just to close 480K SF of progress toward 12% direct vacancy (8M × 6% = 480K SF). That requires a demand thesis, not a timeline calculation.',
    },
    {
      label:
        'No new deliveries over 24 months is the key input — with no new supply, absorption will clear the existing vacancy quickly.',
      isBest: false,
      explanation:
        'No supply pipeline removes one headwind, but absorption is currently negative. The market is losing demand, not just failing to gain it. Submarket recovery requires positive net absorption; removing new supply doesn\'t create it. The shadow sublease inventory continues to add supply even without new construction.',
    },
    {
      label: 'Calculate 480,000 SF to absorb at 150K SF/yr = 3.2 years.',
      isBest: false,
      explanation:
        'The direction is wrong: trailing absorption is negative (−150K SF/yr). Using a negative rate as a positive run-rate projects the market getting worse, not better. Estimating recovery requires a view on when and at what pace absorption turns positive — which depends on demand drivers, not a mechanical extrapolation of trailing data.',
    },
    {
      label:
        'Ignore the sublease availability — it\'s leased space, not vacant space, and won\'t show up in the vacancy rate.',
      isBest: false,
      explanation:
        'Sublease space is occupied on paper but available for immediate occupancy and competes directly with direct vacant space. Any tenant signing into sublease space does not absorb direct vacancy. When sublease leases expire — typically in 2–3 years — the space converts to direct vacant. Shadow supply is deferred, not gone.',
    },
  ],
  takeaway:
    'In a market with negative net absorption, any recovery timeline is speculative — you need a demand thesis, not just a supply-side calculation. Shadow sublease inventory adds to total available supply even when direct vacancy appears flat. Office underwriting in a post-shock market requires you to model when absorption inflects positive, not just how much needs to be absorbed.',
  tips: [
    'Total availability (direct + sublease) is the right tightness metric, not just direct vacancy.',
    'Negative trailing absorption means the market is deteriorating — don\'t use it as a positive run-rate.',
    'Sublease space converts to direct vacant when sub-leases expire; it is deferred supply, not eliminated supply.',
  ],
};
