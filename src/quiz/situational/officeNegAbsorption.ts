import type { SituationalCase } from '../../types/situational';

export const officeNegAbsorption: SituationalCase = {
  id: 'office-neg-absorption',
  title: 'Negative net absorption — should you still bid?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'A CBD office submarket posted negative net absorption of 180,000 SF last quarter — more space was given back than was leased. The subject is a 200,000 SF multi-tenant building currently 82% occupied. Submarket vacancy is 18%; the 10-year historical average is 10%. The broker\'s OM projects NOI stabilization at 90% occupancy within 24 months.',
  data: [
    { label: 'Submarket net absorption (last qtr)', value: '−180,000 SF' },
    { label: 'Submarket vacancy', value: '18% (vs. 10% 10-yr avg)' },
    { label: 'Subject occupancy', value: '82%' },
    { label: 'Broker stabilization target', value: '90% in 24 months' },
    { label: 'Subject size', value: '200,000 SF' },
  ],
  question: 'How should you treat the broker\'s 24-month stabilization timeline?',
  options: [
    {
      label: 'Reject it as unsupported — the submarket is contracting, not recovering. Stabilization requires the subject to outperform the market or the trend to reverse, neither of which is given by the data.',
      isBest: true,
      explanation:
        'Negative net absorption means demand is shrinking: tenants are downsizing, leaving, or not renewing faster than new ones sign. Modeling 90% in 24 months while the submarket is shedding space requires an explicit catalyst (signed LOIs, identified near-term renewals, known tenant migration). Without that, the conservative base case extends the stabilization timeline to 36–48 months and lowers the stabilized occupancy assumption. A market at 18% vacancy — nearly double its 10-year average — is signaling structural oversupply, not a correctable short-term dip.',
    },
    {
      label: 'Accept the timeline — 24 months is long enough for any market cycle to turn.',
      isBest: false,
      explanation:
        'Office cycles typically run 4–7 years through a full recovery in oversupplied markets. "24 months is long enough" is hope, not analysis. Negative net absorption paired with vacancy at 1.8× historical average indicates the market is still deteriorating; assuming a 24-month recovery without supporting data would systematically understate lease-up risk.',
    },
    {
      label: 'The submarket rate doesn\'t apply if the subject can sign leases faster than the market average.',
      isBest: false,
      explanation:
        'Circular reasoning: outperforming the market is the assumption, not a given. If you have specific evidence — signed LOIs, a large tenant tour pipeline, a building amenity advantage — put it in the model explicitly with a documented underwriting premium. The market absorption rate is the null hypothesis; outperformance has to be earned with data, not asserted.',
    },
    {
      label: 'Negative absorption is a single-quarter fluctuation; wait for two more quarters before adjusting underwriting.',
      isBest: false,
      explanation:
        'Possibly reasonable if vacancy were near historical average, but at 18% vacancy (vs. 10% long-run average), the market has been oversupplied for an extended period. One negative quarter in isolation is noise; negative absorption at persistent above-average vacancy is a structural signal. Waiting to adjust the underwriting delays a conclusion already supported by the data.',
    },
  ],
  takeaway:
    'Negative net absorption paired with above-average vacancy is a structural warning that broker stabilization timelines will overestimate recovery speed. The conservative underwriting response: extend the timeline by at least 12–24 months, reduce stabilized occupancy to 85–88%, and model the acquisition economics on that revised base before running an upside case with recovery. Never underwrite the broker\'s timeline as the base.',
  tips: [
    'Net absorption = new leases signed − space returned. Negative = net demand is shrinking.',
    'Vacancy at 1.5–2× historical average signals structural oversupply, not a normal cycle trough.',
    'Stabilization floor: model a realistic range (85–90%) rather than anchoring on the broker\'s target.',
  ],
};
