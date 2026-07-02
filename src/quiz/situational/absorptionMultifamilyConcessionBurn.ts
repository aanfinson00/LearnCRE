import type { SituationalCase } from '../../types/situational';

export const absorptionMultifamilyConcessionBurn: SituationalCase = {
  id: 'absorption-multifamily-concession-burn',
  title: 'Is that lease-up pace as fast as it looks?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'A newly delivered 300-unit multifamily community is leasing up quickly — 40 units/month, on pace to stabilize (90%) in about 7 months. Advertised (face) rent is $1,800/month. To hit that pace, the leasing team is offering 6 weeks free on a 12-month lease plus a $500 gift card for signing within 48 hours of tour. You\'re underwriting an adjacent competing development and want to know the real absorption pace to expect if you match the market.',
  data: [
    { label: 'Units', value: '300' },
    { label: 'Leasing pace', value: '40 units/month' },
    { label: 'Months to 90% stabilization (at current pace)', value: '~7 months' },
    { label: 'Advertised (face) rent', value: '$1,800/month' },
    { label: 'Concession', value: '6 weeks free on a 12-month lease + $500 gift card' },
    { label: 'Comp pace without heavy concessions', value: '25 units/month' },
  ],
  question: 'How should you interpret the 40 units/month pace?',
  options: [
    {
      label:
        'The 40 units/month pace is real leasing velocity, but it\'s being bought with heavy concessions (6 weeks free ≈ 11.5% off face rent over the 12-month term, plus a cash incentive) — effective rent is closer to $1,592/month, and a pace that fast without matching concessions is unlikely to repeat.',
      isBest: true,
      explanation:
        '6 weeks free on a 12-month (52-week) term means 6/52 ≈ 11.5% of the term is rent-free; the tenant pays for the remaining 46 weeks, so effective rent ≈ $1,800 × 46/52 ≈ $1,592/month — before even counting the gift card. The leasing pace and the concession level are linked: comps without heavy concessions in this submarket lease up closer to 25 units/month. If you\'re underwriting a competing project, you should expect to match a similar concession package to hit a similar pace — meaning your effective rent, not the $1,800 face rent, is the number that drives your pro forma.',
    },
    {
      label:
        'Ignore concessions — asking rent is what matters for market rent comps, and the leasing pace of 40/month is the relevant absorption benchmark.',
      isBest: false,
      explanation:
        'Face rent without adjusting for concessions overstates achievable revenue; a comp set built on face rents alone will consistently overprice new deals. The pace and the price are two sides of the same transaction — a landlord can always lease faster by discounting more. Reporting one without the other misrepresents both.',
    },
    {
      label:
        'The gift card and free rent are marketing gimmicks that don\'t meaningfully affect economics — model face rent and the 40-unit pace as-is.',
      isBest: false,
      explanation:
        '6 weeks free is not a gimmick; it\'s an ~11.5% discount off face rent spread over the lease term, and it directly explains why this property is leasing faster than the 25-unit/month comp set without similar concessions. Treating it as immaterial would materially overstate effective rent in the pro forma.',
    },
    {
      label:
        'Since the comp set has slower absorption (25/month) without concessions, this property must have superior location or amenities driving the faster pace — concessions are incidental.',
      isBest: false,
      explanation:
        'Possible, but not supportable from the facts given — the scenario states concessions are being actively offered as part of the leasing strategy, which is the more parsimonious explanation for the pace gap. Attributing the difference to unstated qualitative factors when a quantifiable concession package is right in front of you skips the analysis you\'re equipped to do.',
    },
  ],
  takeaway:
    'Absorption pace and rent concessions move together — a fast lease-up bought with heavy free rent isn\'t the same signal as a fast lease-up at full face rent. Convert face rent to net effective rent before using a comp\'s "pace" as a benchmark for your own underwriting.',
  tips: [
    'Net effective rent = face rent minus the amortized value of free rent and cash concessions over the lease term.',
    'A lease-up pace that beats the comp set is a flag to check concessions, not just amenities/location.',
    'When underwriting your own lease-up, budget concessions consistent with what drove the comp\'s pace — not the comp\'s face rent.',
  ],
};
