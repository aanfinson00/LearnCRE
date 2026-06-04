import type { SituationalCase } from '../../types/situational';

export const industrialSubmarketOverbuilt: SituationalCase = {
  id: 'industrial-submarket-overbuilt',
  title: 'Spec supply flood — how long to clear?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'An industrial submarket currently has 18M SF of inventory at 94% occupancy (1.08M SF vacant). Three spec buildings totaling 2.4M SF are scheduled to deliver over the next 6 months. Net absorption has been running 500K SF per quarter, or roughly 167K SF per month. You\'re underwriting an acquisition that requires the submarket to reach 97% occupancy before your stabilization assumption.',
  data: [
    { label: 'Existing inventory', value: '18,000,000 SF' },
    { label: 'Current occupancy', value: '94%' },
    { label: 'Currently vacant', value: '1,080,000 SF' },
    { label: 'New spec deliveries (6 mo)', value: '2,400,000 SF' },
    { label: 'Net absorption pace', value: '167,000 SF/month' },
    { label: 'Target occupancy', value: '97%' },
  ],
  question: 'How long does it take the submarket to reach 97% occupancy after the deliveries land?',
  options: [
    {
      label: 'Roughly 17–24 months — deliveries push the base to 20.4M SF, requiring absorption of ~2.87M SF net to hit 97%, and pace often slows as vacancy spikes.',
      isBest: true,
      explanation:
        'New base: 18M + 2.4M = 20.4M SF. Target leased at 97%: 19.79M SF. Currently leased: 18M × 0.94 = 16.92M SF. Net to absorb: 19.79M − 16.92M = 2.87M SF. At 167K SF/month flat: 2.87M ÷ 167K ≈ 17 months. But absorption often slows when vacancy spikes sharply — 17% vacancy post-delivery vs. 6% pre-delivery. Stress to 20–24 months is appropriate and defensible to IC.',
    },
    {
      label: 'About 6 months — existing vacancy is 1.08M SF and absorption is 167K/mo.',
      isBest: false,
      explanation:
        'Ignores the 2.4M SF of incoming supply entirely. Clearing the existing 1.08M SF at 167K/mo ≈ 6 months — but only if no new supply arrived. Once deliveries hit, the vacant SF jumps from 1.08M to ~3.48M SF on a 20.4M SF base (17% vacancy), and the stabilization clock resets.',
    },
    {
      label: 'About 14 months — divide the new 2.4M SF by the 167K/mo absorption pace.',
      isBest: false,
      explanation:
        'Divides only the new supply by absorption, ignoring the pre-existing 1.08M SF of vacancy. The correct numerator is the full leased-SF gap from current to target on the post-delivery base — not just the new deliveries. This approach undercounts the absorption burden by nearly 500K SF.',
    },
    {
      label: 'You can\'t estimate timing without understanding tenant demand drivers.',
      isBest: false,
      explanation:
        'Demand drivers explain why absorption is 167K SF/month — but the question asks you to apply the observable pace, not re-derive it. Refusing to compute when you have an absorption rate, a starting point, and a target is a deflection. Calculate first; then flag demand-driver uncertainty as a sensitivity.',
    },
  ],
  takeaway:
    'Spec supply resets the stabilization clock. Always rebuild the inventory base first (existing + deliveries), compute the full leased-SF gap to your target, then divide by absorption. The trap is dividing only the new supply by the pace — that ignores pre-existing vacancy and the higher target on the expanded base.',
  tips: [
    'Absorption math: (target leased SF − current leased SF) ÷ monthly absorption pace.',
    'Vacancy spikes after bulk delivery often compress absorption pace — stress the pace assumption.',
    'Watch for spec buildings under LOI but unsigned: they create "shadow vacancy" that delays clearing.',
  ],
};
