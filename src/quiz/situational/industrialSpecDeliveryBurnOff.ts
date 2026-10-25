import type { SituationalCase } from '../../types/situational';

export const industrialSpecDeliveryBurnOff: SituationalCase = {
  id: 'industrial-spec-delivery-burn-off',
  title: 'How long to burn off the spec wave?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'An industrial submarket of 43M SF (after deliveries) is at its 6% equilibrium vacancy today on a 40M SF base. A 3.0M SF spec wave is delivering next quarter, of which 35% is already preleased. Trailing net absorption has been 1.5M SF per year. You\'re underwriting a lease-up of a nearby building and want to know when the market tightens back to 6%.',
  data: [
    { label: 'Existing base', value: '40M SF @ 6% vacant (2.4M SF)' },
    { label: 'Deliveries', value: '3.0M SF, 35% preleased' },
    { label: 'Speculative space', value: '1.95M SF' },
    { label: 'Post-delivery base', value: '43M SF' },
    { label: 'Trailing net absorption', value: '1.5M SF / year' },
    { label: 'Equilibrium vacancy', value: '6%' },
  ],
  question: 'Roughly how long until the submarket returns to 6% vacancy at the trailing pace?',
  options: [
    {
      label: 'About 14 months — vacant space jumps to 4.35M SF, 1.77M SF above the 2.58M SF equilibrium level, and that excess clears at 1.5M SF/yr.',
      isBest: true,
      explanation:
        'Preleased space (1.05M SF) is occupied on delivery, so only the 1.95M SF of spec adds to vacancy: 2.4 + 1.95 = 4.35M SF, or ~10.1% of the 43M SF base. Equilibrium vacant space is 6% × 43M = 2.58M SF. Excess = 1.77M SF ÷ 1.5M SF/yr ≈ 1.2 years ≈ 14 months. Note that absorption must also chase any further deliveries — check the pipeline beyond this wave.',
    },
    {
      label: 'About 35 months — total vacant space of 4.35M SF divided by 1.5M SF/yr of absorption.',
      isBest: false,
      explanation:
        'Divides all vacancy by absorption, as if the market needed to reach 0% vacancy. The goal is a return to 6% equilibrium, so only the excess over 2.58M SF has to be absorbed.',
    },
    {
      label: 'About 23 months — treat the full 3.0M SF as speculative.',
      isBest: false,
      explanation:
        'Ignores the 35% preleasing. Preleased space is already spoken for, so counting it as new vacancy overstates the burn-off by roughly nine months.',
    },
    {
      label: 'The market stays at 6% because over a third of the wave is preleased.',
      isBest: false,
      explanation:
        'Preleasing reduces the vacancy hit but doesn\'t eliminate it. 1.95M SF of spec is still ~4.5 pts of new supply against a 43M SF base.',
    },
  ],
  takeaway:
    'Burn-off math is (post-delivery vacant space − equilibrium vacant space) ÷ net absorption. Strip out preleased space first, then measure against equilibrium, not zero.',
  tips: [
    'Preleased space is absorbed at delivery; only spec adds to vacancy.',
    'Burn-off is measured to equilibrium vacancy, not to 0%.',
    'Check whether the pipeline has a second wave behind the first.',
  ],
};
