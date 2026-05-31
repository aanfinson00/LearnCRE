import type { SituationalCase } from '../../types/situational';

export const officeNegativeAbsorption: SituationalCase = {
  id: 'office-negative-absorption',
  title: 'Is negative absorption cyclical or structural?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A CBD office submarket has posted four consecutive quarters of negative net absorption averaging -80,000 SF per quarter. Total inventory is 18M SF and current vacancy is 22%. Asking rents have declined 8% over the same period. Remote work adoption is cited as a structural driver by local brokers. You\'re evaluating whether to acquire a 200,000 SF Class-B asset in the submarket at a stressed price.',
  data: [
    { label: 'Total inventory', value: '18M SF' },
    { label: 'Current vacancy', value: '22%' },
    { label: 'Avg quarterly absorption', value: '-80,000 SF' },
    { label: 'Asking rent decline (12 mos)', value: '-8%' },
    { label: 'Subject asset', value: '200,000 SF Class-B, CBD' },
  ],
  question:
    'How do you distinguish cyclical from structural negative absorption — and does it change the underwriting?',
  options: [
    {
      label:
        'Structural signals include multi-year negative absorption with no visible demand catalyst, falling net effective rents, and rising sublease supply — all of which require widening the exit cap, extending lease-up assumptions, and increasing TI/LC reserves.',
      isBest: true,
      explanation:
        'Cyclical negative absorption has an identifiable reversal driver: an economic recovery, new industry inflow, or a temporary dislocation. Structural negative absorption is self-reinforcing — rising vacancy erodes landlord pricing power, which attracts more move-outs, which pushes vacancy higher still. Four consecutive quarters of decline with rent drops and remote-work headwind fits the structural pattern. In structural markets, every underwriting input that depends on recovery must be stressed: exit cap should assume higher-than-historical vacancy persists, lease-up should extend by 12–24 months, and TI/LC assumptions should reflect a tenant-favorable negotiating environment.',
    },
    {
      label:
        'Four quarters of negative absorption is too short a trend to call structural — underwrite to the historical average and model recovery.',
      isBest: false,
      explanation:
        'Anchoring on historical averages during a secular shift is the classic office underwriting error post-2020. Trend duration matters less than whether a demand catalyst exists to reverse it. Remote work is a structural driver, not a cyclical blip — and four quarters of declining rents alongside rising vacancy confirms the direction.',
    },
    {
      label:
        'Negative absorption always signals distress — avoid all CBD office regardless of price.',
      isBest: false,
      explanation:
        'Overly blunt. A stressed entry price can offset structural risk if the underwriting reflects realistic lease-up, higher vacancy at exit, and compressed values. The correct response is to stress-test the acquisition economics, not to categorically avoid the asset class.',
    },
    {
      label:
        'Cyclical vs. structural is unknowable in real time — focus only on current tenant credit and in-place NOI.',
      isBest: false,
      explanation:
        'In-place NOI can be stable while the market deteriorates around it. When leases mature into a structural downturn, you face below-market renewal rates and extended downtime. Ignoring absorption dynamics in office underwriting is how sponsors get caught holding vacancy at exit.',
    },
  ],
  takeaway:
    'Structural absorption decline requires different underwriting inputs than cyclical: wider exit cap, longer lease-up, higher TI/LC reserves, and a documented demand-catalyst narrative (or its absence). If no reversal catalyst exists, stress cases should anchor the bid.',
  tips: [
    'Structural = multi-year negative trend + no identifiable recovery catalyst + declining net effective rents.',
    'Rising sublease-available SF is the earliest structural warning sign — it precedes direct vacancy.',
    'For office, a 22%+ vacancy submarket typically requires a 100–150 bps wider exit cap vs the 5-yr historical norm.',
  ],
};
