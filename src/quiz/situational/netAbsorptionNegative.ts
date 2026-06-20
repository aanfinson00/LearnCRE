import type { SituationalCase } from '../../types/situational';

export const netAbsorptionNegative: SituationalCase = {
  id: 'net-absorption-negative',
  title: 'The market is shrinking — what do you do with your lease-up assumption?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'office',
  scenario:
    'You are underwriting a value-add office acquisition in a CBD submarket. The property is 72% leased; your business plan assumes lease-up to 90% over 24 months at a pace of 5,000 SF/month. CoStar data shows the submarket posted negative net absorption of −120,000 SF over the past four quarters, despite no meaningful new supply. Total inventory is 8M SF; current submarket vacancy is 18%.',
  data: [
    { label: 'Subject occupancy', value: '72%' },
    { label: 'Target occupancy', value: '90%' },
    { label: 'Assumed absorption pace', value: '5,000 SF/month' },
    { label: 'Submarket net absorption (trailing 4Q)', value: '−120,000 SF (−30,000/Q)' },
    { label: 'Submarket vacancy', value: '18%' },
    { label: 'Total inventory', value: '8,000,000 SF' },
  ],
  question: 'How should the negative net absorption data change your underwriting?',
  options: [
    {
      label:
        'Negative submarket absorption means the market is shrinking, not growing. Your 5,000 SF/month lease-up pace has no demand tailwind — you must either cut the pace materially, extend the lease-up period, or accept that 90% is an optimistic target. Rerun the model at 1,500–2,500 SF/month and stress-test stabilization at 82–85%.',
      isBest: true,
      explanation:
        'Net absorption is the net change in occupied space across the entire submarket. Negative absorption means tenants are giving back more space than new tenants are taking. Your deal competes for a shrinking demand pool. A 5,000 SF/month pace represents ~60,000 SF/year — but if the submarket is net-losing 120,000 SF/year in aggregate, capturing the subject\'s 144,000 SF lease-up gap (8% × 1.8M SF subject) in 24 months assumes you take market share in a contracting market. Defensible underwriting: slow the pace and accept a longer or lower stabilization.',
    },
    {
      label:
        'Negative absorption is a submarket problem, not a building problem. A well-located, repositioned asset can outperform the market; hold the 5,000 SF/month assumption.',
      isBest: false,
      explanation:
        'Outperforming a negative-absorption market is possible but requires specific evidence (superior amenities, below-market rents, anchor tenant in tow). Using "the building is good" to explain away submarket data without support is optimistic underwriting. The burden of proof falls on the buyer: which tenants are coming, from where, and why now?',
    },
    {
      label:
        'Discard the 24-month timeline and use 48 months, but keep the 90% stabilized target.',
      isBest: false,
      explanation:
        'Extending the timeline helps but doesn\'t address the more fundamental problem: if the market is contracting, the 90% target may not be achievable at all within the hold period. The right first question is whether the stabilization level is realistic, then time it.',
    },
    {
      label:
        'Negative absorption only reflects big-block moves; small-tenant demand may still support your lease-up.',
      isBest: false,
      explanation:
        'Plausible but unverified — you would need CoStar or broker data segmented by suite size to support this. As a blanket assumption, segmenting absorption data without evidence is wishful underwriting. Verify with leasing team data before using this as a justification to hold the original pace.',
    },
  ],
  takeaway:
    'Negative net absorption is not noise — it is a direct measure of demand shrinkage in the submarket. Lease-up assumptions must be grounded in positive or flat absorption; underwriting against a contracting market requires either a specific demand thesis (a tenant in the pipeline, a relocation from a competing submarket) or materially more conservative pace and stabilization targets.',
  tips: [
    'Net absorption = change in occupied SF, not new leases signed; watch the distinction.',
    'If trailing-four-quarter absorption is negative, your lease-up timeline is a thesis, not a data-supported assumption.',
    'Request CoStar\'s submarket absorption trend (not just trailing 4Q) — is this acceleration or reversal?',
  ],
};
