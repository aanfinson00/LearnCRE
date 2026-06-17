import type { SituationalCase } from '../../types/situational';

export const absorptionSpecDeliveryRisk: SituationalCase = {
  id: 'absorption-spec-delivery-risk',
  title: 'Two spec buildings delivering — which pipeline units count?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'An industrial submarket has 8M SF of inventory at 96% occupancy. Two new buildings are under construction: Building A is a 500K SF build-to-suit (BTS) for a single e-commerce tenant — the lease is executed and the tenant is committed. Building B is a 400K SF speculative warehouse with no pre-leasing. Both will deliver in 6 months. Historical net absorption in this submarket is 600K SF/year.',
  data: [
    { label: 'Existing inventory', value: '8.0M SF' },
    { label: 'Current occupancy', value: '96%' },
    { label: 'Existing vacancy', value: '320K SF' },
    { label: 'BTS delivery (Building A)', value: '500K SF — pre-leased' },
    { label: 'Spec delivery (Building B)', value: '400K SF — no pre-leasing' },
    { label: 'Historical absorption', value: '600K SF/year' },
  ],
  question:
    'After both buildings deliver, how should you frame the new vacancy math and absorption timeline?',
  options: [
    {
      label:
        "Building A is absorbed the moment it delivers (tenant is committed). Building B's 400K SF adds directly to the vacant supply pool. New vacancy post-delivery: 320K + 400K = 720K SF on a 8.9M SF base (8.1% vacancy) — up from 4%. At 600K/yr absorption, clearing the spec overhang takes about 8 months assuming stable demand.",
      isBest: true,
      explanation:
        "BTS space is occupied on day one — it never hits the vacancy pool, so it doesn't burden absorption at all. The spec building (Building B) adds 400K SF of genuine vacancy. New total vacant: 320K (existing) + 400K (Building B) = 720K SF, on a new base of 8.9M SF = 8.1% vacancy. At 600K SF/year of historical absorption (50K/month), clearing 720K SF takes roughly 14–15 months — a significant change from today's undersupplied 4% vacancy, and enough to warrant an exit-cap haircut if your hold period overlaps delivery.",
    },
    {
      label:
        'Add both buildings to vacancy — all under-construction space adds to the denominator when delivering, whether BTS or spec.',
      isBest: false,
      explanation:
        "BTS space is occupied at delivery, not vacant. Adding Building A to the vacancy pool is wrong and overstates the supply overhang by 500K SF. The distinction between BTS and spec is precisely why analysts track pre-leasing as a fraction of under-construction supply — it tells you how much of the pipeline will actually hit the vacancy pool vs. be absorbed on arrival.",
    },
    {
      label:
        'Only the spec building matters; the BTS is irrelevant to submarket dynamics because the tenant is already locked in.',
      isBest: false,
      explanation:
        "Partially right on the vacancy math, but 'irrelevant to submarket dynamics' goes too far. The BTS adds 500K SF of occupied inventory, which changes the denominator for occupancy calculations and expands the submarket's size — affecting how the overall occupancy rate looks (96% on 8M SF becomes lower if you include both buildings in the base). The *vacancy* analysis focuses on Building B, but the BTS still appears in market statistics.",
    },
    {
      label:
        'Wait until both buildings deliver and then see what the actual absorption trend is — historical absorption may not be predictive in a rate-sensitive environment.',
      isBest: false,
      explanation:
        "Sound skepticism but the wrong answer to the question. You can't underwrite by deferring — you need a best estimate now. Historical absorption benchmarked against pipeline supply, with a stated assumption about demand continuity, is the standard framework. Flag macro risk in the sensitivity table (what if absorption slows to 400K/yr?), but don't substitute caution for the math.",
    },
  ],
  takeaway:
    "In absorption analysis, pre-leased (BTS) deliveries never enter the vacancy pool — only spec deliveries add to supply. Always separate the under-construction pipeline into pre-leased vs. spec, and run the vacancy math only off the spec portion. The pre-leased fraction is a demand signal (market was tight enough to attract BTS demand), while the spec fraction is the supply risk. A market at 96% occupancy with 45% BTS pre-leasing in the pipeline looks very different from one where 100% of the pipeline is spec.",
  tips: [
    'Rule of thumb: spec deliveries add to vacancy; BTS deliveries add to inventory but not vacancy.',
    'Track pre-leasing % of pipeline as the single most useful leading indicator of near-term supply pressure.',
    'If absorption < spec deliveries, vacancy rises and rents soften — model both scenarios.',
  ],
};
