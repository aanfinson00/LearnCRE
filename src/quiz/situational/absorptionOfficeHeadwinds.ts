import type { SituationalCase } from '../../types/situational';

export const absorptionOfficeHeadwinds: SituationalCase = {
  id: 'absorption-office-headwinds',
  title: 'Negative absorption — what does it mean for your lease-up thesis?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    "A CBD office submarket has posted negative net absorption for three consecutive quarters: −45k SF, −62k SF, and −78k SF, with the trend worsening. You're underwriting a 350,000 SF Class-B office acquisition that is currently 72% occupied. The largest tenant (65k SF) rolls in 18 months. The sponsor's thesis is to lease the building to 90% occupancy within 24 months at current asking rents.",
  data: [
    { label: 'Asset size', value: '350,000 SF' },
    { label: 'Current occupancy', value: '72%' },
    {
      label: 'Submarket net absorption',
      value: '−45k, −62k, −78k SF (3 consecutive quarters)',
    },
    { label: 'Largest tenant', value: '65k SF rolling in 18 months' },
    { label: 'Target occupancy', value: '90% in 24 months' },
  ],
  question: 'What does the absorption trend tell you about the lease-up thesis?',
  options: [
    {
      label:
        "The worsening negative absorption seriously undermines the thesis: the submarket is losing more space per quarter than it gains, meaning new leasing requires capturing tenants from competing buildings rather than new-to-market demand. 90% occupancy in 24 months is likely too aggressive — the more pressing risk is whether current occupancy holds when the 65k SF tenant rolls.",
      isBest: true,
      explanation:
        "Negative absorption means departures > arrivals — total occupied SF is shrinking. Three worsening quarters (−45k, −62k, −78k SF) suggests structural demand loss, not a temporary vacancy pocket, consistent with hybrid work shifts or sector-specific headwinds. In this environment, lease-up means taking tenants from competing buildings, not absorbing new demand. Class-B CBD is typically the first to lose tenants in an oversupply environment and the last to recover. The 65k rollover is the hidden landmine: if that tenant doesn't renew, occupancy falls to ~53% at the moment the deal should be approaching stabilization. A more defensible underwrite: treat the 65k rollover as a 12-18 month vacancy, cap the lease-up ceiling at 80-85%, and stress rents 10-15%.",
    },
    {
      label:
        "Three quarters of negative absorption is a near-term blip. If the submarket is historically healthy, the lease-up thesis pencils.",
      isBest: false,
      explanation:
        "A deteriorating trend (−45k, −62k, −78k — each worse than the last) is not a blip; it's a direction. The right question is 'is this cyclical or structural?' Before relying on 'historically healthy,' determine whether hybrid work and remote policies have permanently reduced demand in this submarket. If they have, historical absorption data is misleading, not reassuring.",
    },
    {
      label:
        "Negative absorption only matters if you're a seller. As a buyer, you're acquiring at the trough — the value-add opportunity is there.",
      isBest: false,
      explanation:
        "A trough thesis requires a specific catalyst: a signed LOI, a repositioning plan, a macro case for demand recovery, or identified tenants in backfill. Without that, you're buying a deteriorating cash-flow stream, not a discounted recovery. 'Buying at the trough' is a thesis conclusion, not an analysis — you need the supporting evidence first.",
    },
    {
      label:
        "The submarket data doesn't apply to this building — individual assets can and do diverge from submarket trends.",
      isBest: false,
      explanation:
        "True in theory, but the divergence mechanism needs to be specific: lower rents, superior amenities, small-suite repositioning, etc. An unexamined claim that 'our building will beat the market' is an aspiration, not an underwriting assumption. Submarket absorption defines the pool of tenants available to lease — when that pool is shrinking, individual buildings are competing for fewer potential tenants, and the outperformance case requires explicit support.",
    },
  ],
  takeaway:
    "Negative absorption means total occupied SF is shrinking — new leasing requires tenants to vacate competing buildings rather than representing new demand. Three quarters of worsening trend signals structural change, not a cycle trough. In office, a large rolling tenant in a negative-absorption market is a major underwriting risk: model the rollover conservatively and stress occupancy, rent, and TI costs before underwriting a 24-month recovery.",
  tips: [
    'Net absorption = new leasing − move-outs. Negative = more space vacating than being leased.',
    'Three quarters of worsening negative absorption suggests structural demand loss, not a temporary pocket.',
    'A large tenant rollover can flip occupancy 15-20% overnight — stress it separately from the absorption analysis.',
  ],
};
