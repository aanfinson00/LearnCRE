import type { SituationalCase } from '../../types/situational';

export const absorptionNegativeOffice: SituationalCase = {
  id: 'absorption-negative-office',
  title: 'Your tenant expanded but the market shows negative absorption — how?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You manage an office building where your anchor tenant just expanded by 22,000 SF — filling a previously vacant floor. Yet the quarterly market report for your submarket shows negative net absorption of 180,000 SF. You\'re preparing your Q2 asset management report.',
  data: [
    { label: 'Your tenant expansion', value: '+22,000 SF occupied (new lease)' },
    { label: 'Submarket net absorption', value: '−180,000 SF (Q2)' },
    { label: 'Submarket vacancy', value: '+90 bps to 16.4%' },
    { label: 'New supply delivered', value: '0 SF (no new buildings)' },
    { label: 'Large tenant move-outs noted', value: '3 tenants returned space >50k SF each' },
  ],
  question: 'How do you reconcile your tenant\'s expansion with the negative submarket absorption?',
  options: [
    {
      label:
        'No contradiction: your 22k SF gain is at building level; the submarket report nets all move-ins against move-outs across all buildings. Three tenants returning >50k SF each (150k+ SF) dwarfs your gain. The submarket is contracting even though your asset added occupancy.',
      isBest: true,
      explanation:
        'Net absorption is submarket-wide: all new occupancy gains minus all occupancy losses. Your 22k SF expansion adds to the numerator; the three large move-outs subtract ~150k+ SF from the denominator — and the net is negative. This is entirely consistent. The asset-level and submarket-level metrics operate independently. An asset manager\'s job is to understand both and not confuse one for the other when reporting to investors.',
    },
    {
      label:
        'The market report must be wrong — if tenants are expanding, absorption should be positive.',
      isBest: false,
      explanation:
        'Absorption is net, not gross. New leases or expansions at one building don\'t prevent other buildings from losing tenants. Both can happen simultaneously. The report isn\'t wrong — the two metrics are measuring different things at different scales.',
    },
    {
      label:
        'Your submarket is in a different product tier than the tenants who moved out — report the data separately and don\'t draw comparisons.',
      isBest: false,
      explanation:
        'Segmenting by tier is good practice when reporting, but it doesn\'t resolve the question of how both can be true simultaneously. The answer is arithmetic: negative net absorption simply means more space was vacated than was leased across the whole submarket — regardless of tier.',
    },
    {
      label:
        'Push back on the broker providing the market report — they have incentive to show weak demand to justify lower lease comps.',
      isBest: false,
      explanation:
        'Broker data can be biased, but negative net absorption with three announced large move-outs is factual market activity, not spin. Suspecting data without evidence undermines your credibility as an asset manager. Model the known move-outs, verify the math, and accept the result.',
    },
  ],
  takeaway:
    'Net absorption is a submarket aggregate — it can be negative even when individual buildings gain occupancy. Asset managers must track both scales: asset-level occupancy tells you your performance; submarket absorption tells you the demand environment your next lease negotiation will occur in. Rising submarket vacancy means your next rollover will face more tenant leverage.',
  tips: [
    'Net absorption = total move-ins minus total move-outs across ALL buildings in the submarket.',
    'Negative absorption with zero new supply means tenants are giving back space faster than others are taking it.',
    'Asset-level occupancy gain amid submarket contraction is a win — and a data point your IC will want to see explained.',
    'Track "shadow supply" (sublease space returned to market) — it absorbs demand without showing as new deliveries.',
  ],
};
