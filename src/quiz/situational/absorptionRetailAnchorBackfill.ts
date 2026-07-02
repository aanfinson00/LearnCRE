import type { SituationalCase } from '../../types/situational';

export const absorptionRetailAnchorBackfill: SituationalCase = {
  id: 'absorption-retail-anchor-backfill',
  title: 'How long to backfill a dark anchor box?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    'A 150,000 SF power center just lost its anchor tenant (60,000 SF big-box) to a bankruptcy-driven lease rejection. The anchor was paying below-market rent ($8/SF NNN) on a lease with 4 years remaining. Comparable anchor boxes in the trade area have historically taken 18-30 months to backfill, and the replacement tenant typically requires a TI package plus 6-12 months of free rent before rent commences. You\'re advising on whether to underwrite the box as re-tenanted and cash-flowing by year 2 of a 5-year hold.',
  data: [
    { label: 'Dark anchor box', value: '60,000 SF (40% of center GLA)' },
    { label: 'In-place anchor rent (lost)', value: '$8/SF NNN' },
    { label: 'Market anchor rent (re-leased)', value: '$11/SF NNN' },
    { label: 'Trade-area anchor backfill history', value: '18-30 months' },
    { label: 'Typical free rent / TI ramp after signing', value: '6-12 months' },
    { label: 'Hold period', value: '5 years' },
  ],
  question: 'What\'s the most defensible way to underwrite the backfill?',
  options: [
    {
      label:
        'Model the box vacant for 24-30 months from dark date to lease signing, then add another 6-12 months of free rent before rent starts — meaning no anchor rent until roughly month 30-42 of the hold.',
      isBest: true,
      explanation:
        'Backfill timing has two distinct legs: (1) marketing-to-signed-lease, which the trade area\'s own history says runs 18-30 months for anchor boxes, and (2) signed-lease-to-rent-commencement, which adds the free-rent/TI ramp on top. Stacking both legs conservatively (using the high end, ~30 months + 12 months) pushes rent commencement to month 42 — meaning the anchor may contribute cash flow for only the last ~1-2 years of a 5-year hold. Underwriting rent starting any earlier assumes better-than-trade-area-average leasing, which needs specific justification (e.g., a signed LOI).',
    },
    {
      label: 'Assume the box re-leases immediately at the start of year 2 since that\'s when you plan to market it.',
      isBest: false,
      explanation:
        'Ignores the trade area\'s own 18-30 month backfill history and the post-signing free-rent ramp entirely. "When you plan to market it" and "when a tenant signs and starts paying rent" are different dates separated by the leasing cycle — treating them as the same date is the single most common overstatement in retail re-tenanting underwriting.',
    },
    {
      label:
        'Use the average of the historical range (24 months) for backfill and skip modeling free rent, since TI/free rent nets out against the higher market rent.',
      isBest: false,
      explanation:
        'The rent bump ($8 to $11/SF) compensates the landlord for the box being empty and for concessions — but it does so over the life of the lease, not instantly. Skipping the free-rent ramp overstates near-term cash flow; the higher market rent shows up in year 3+ cash flow, not in the months the tenant occupies rent-free.',
    },
    {
      label:
        'Since the lost tenant was below market, backfilling actually accelerates the deal\'s value — underwrite the vacancy as a net positive and don\'t discount for downtime.',
      isBest: false,
      explanation:
        'Confuses the eventual mark-to-market gain (real, and worth capturing in exit value) with the near-term cash flow hit (also real — you lose $8/SF NNN in-place income for the entire vacancy-plus-ramp period). Both effects belong in the model; treating a mark-to-market opportunity as erasing the downtime cost overstates near-term NOI.',
    },
  ],
  takeaway:
    'Anchor backfill has two stacked timelines — marketing-to-lease-signing and signing-to-rent-commencement — and both should be sized off trade-area history, not sponsor optimism. Combined, an anchor box can sit non-cash-flowing for 2-3+ years even in an active trade area.',
  tips: [
    'Split backfill into "time to sign" and "time to rent commencement" — don\'t collapse them into one guess.',
    'Use trade-area comps for backfill timing, not your target hold period.',
    'A mark-to-market rent gain on re-lease is real, but it doesn\'t offset the vacancy-period cash flow loss — model both.',
  ],
};
