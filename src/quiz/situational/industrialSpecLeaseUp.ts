import type { SituationalCase } from '../../types/situational';

export const industrialSpecLeaseUp: SituationalCase = {
  id: 'industrial-spec-lease-up',
  title: 'Can you stabilize before the next wave of supply hits?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You are developing a 400,000 SF speculative Class-A warehouse in a high-demand logistics corridor. The submarket has 45M SF at 96% occupancy — historically tight. Three competing spec buildings totaling 2.4M SF are also under construction, with deliveries staggered 6 to 18 months after yours. Your equity commitment expires at month 24 post-delivery; you need to be 90% leased by then. Historical absorption in this submarket averaged 1.2M SF/yr, but the trailing two quarters have slowed to a 700k SF/yr run rate as e-commerce velocity decelerated.',
  data: [
    { label: 'Your building', value: '400k SF spec Class-A, delivers at month 0' },
    { label: 'Submarket inventory', value: '45M SF at 96% occupancy' },
    { label: 'Competing spec deliveries', value: '2.4M SF, months 6–18' },
    { label: 'Historical absorption', value: '1.2M SF/yr' },
    { label: 'Recent absorption run rate', value: '700k SF/yr (trailing 2 qtrs)' },
    { label: 'Stabilization deadline', value: '90% leased by month 24' },
  ],
  question: 'How should you assess stabilization risk?',
  options: [
    {
      label: 'High risk. By month 18, the submarket will have ~2.8M SF of new supply arriving into a market absorbing only 700k SF/yr. At that pace, clearing 2.8M SF takes ~4 years — far beyond your 24-month window. Get leases signed in months 1–12 before competing supply hits.',
      isBest: true,
      explanation:
        'Total new supply: 0.4M (yours) + 2.4M (competing) = 2.8M SF. At 700k/yr, absorbing 2.8M SF takes 4 years. Your building is 1 of 4 competing for demand in a window when supply growth is outpacing demand growth. First-mover advantage is real: leases signed before competing buildings deliver lock in rents and reduce your direct competition. If you are the last building to lease up, you face the most competition and the most pricing pressure.',
    },
    {
      label: 'Low risk. At 96% occupancy the submarket has almost no existing vacancy; demand is strong and your building should absorb quickly.',
      isBest: false,
      explanation:
        'The 96% figure reflects the existing 45M SF inventory before the wave of new supply arrives. Once 2.8M SF delivers, occupancy on the combined base drops to roughly (45M × 0.96) / (45M + 2.8M) ≈ 90.5% — still healthy, but no longer a landlord\'s market. Tight existing occupancy is the starting point, not the forecast.',
    },
    {
      label: 'Underwrite at 1.2M SF/yr — two soft quarters don\'t change the long-term absorption trend.',
      isBest: false,
      explanation:
        'Two consecutive quarters of deceleration are a trend signal, not statistical noise. Industrial absorption is linked to e-commerce velocity and supply-chain investment, which can shift faster than a 3-year average suggests. Underwrite at the current run rate (700k), stress at 500k, and use 1.2M only as the upside scenario.',
    },
    {
      label: 'Extend the equity commitment — 24 months is simply not enough time for this market.',
      isBest: false,
      explanation:
        'Extension may not be possible depending on fund documents and LP consent rights. More critically, this deflects from the real question: does the deal underwrite at entry price? If stabilization requires 36+ months and the equity commitment is 24, the entry basis or the timeline must change. Identify which, rather than defaulting to extension.',
    },
  ],
  takeaway:
    'Spec lease-up is a race: your absorption velocity vs. the competing supply curve. When supply growth exceeds the demand run rate, lease-up risk compounds with every new delivery. Underwrite at the current pace, not the historical peak — and stress for the scenario where you are last to lease.',
  tips: [
    'First-mover advantage: leases signed pre-competing-delivery protect rent and reduce direct competition.',
    'Model monthly absorption, not annual, when competing deliveries are arriving every 6 months.',
    'Ask: what happens to your lease-up timeline if you are the last building standing?',
  ],
};
