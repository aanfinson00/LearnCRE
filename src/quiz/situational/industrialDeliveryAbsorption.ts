import type { SituationalCase } from '../../types/situational';

export const industrialDeliveryAbsorption: SituationalCase = {
  id: 'industrial-delivery-absorption',
  title: 'Spec industrial: 900k SF just delivered — when does your building pencil?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'A major distribution submarket had 6 million SF of industrial inventory at the start of the year. Three speculative buildings (total 900,000 SF) delivered in Q1, pushing vacancy from 4% to 11%. Net absorption had been running at 200,000 SF per quarter but the most recent quarter registered only 120,000 SF as the new supply hit. You are evaluating a 300,000 SF spec building of your own that will deliver in 9 months. Your LP underwriting shows 95% occupancy within 18 months of delivery.',
  data: [
    { label: 'Existing inventory', value: '6,000,000 SF (start of year)' },
    { label: 'New deliveries (Q1)', value: '+900,000 SF → new base: 6,900,000 SF' },
    { label: 'Current vacancy', value: '11% → ~6,141,000 SF leased' },
    { label: 'Trailing quarterly absorption', value: '120,000 SF (down from 200k/qtr)' },
    { label: 'Your building', value: '+300,000 SF delivering in 9 months' },
    { label: 'Target occupancy', value: '95%' },
  ],
  question: 'Is an 18-month post-delivery lease-up a defensible underwriting assumption?',
  options: [
    {
      label:
        '18 months is aggressive and hard to defend: the submarket needs ~759k SF of absorption just to reach 95% on the existing 6.9M SF base, and your building adds another 300k SF. At today\'s 120k SF/quarter pace that\'s over 8 quarters — roughly 26 months. Even if absorption rebounds to its prior 200k/quarter run rate, you still need 5+ quarters after delivery. Stress to 24–30 months in the base case unless you have a specific demand catalyst.',
      isBest: true,
      explanation:
        'Target leased at 95% on 6,900,000 SF = 6,555,000 SF. Currently leased: ~6,141,000 SF. Gap = 414,000 SF just to stabilize the market — before adding your 300k building. Combined absorption needed: ~714,000 SF. At 120k/quarter ≈ 6 quarters (18 months) just for the existing gap, plus additional time for your building. Even granting full recovery to 200k/quarter, that\'s 3.5+ quarters. 18 months post-delivery requires near-perfect absorption recovery; a defensible base case is 24–30 months.',
    },
    {
      label:
        '18 months works — 120k SF/quarter × 6 quarters = 720k SF absorbed, which covers the existing vacancy and your building.',
      isBest: false,
      explanation:
        'The math ignores that your 300k SF building increases the denominator and the absorptive target simultaneously. You must clear the existing gap AND lease your building to reach 95% on the new 7,200,000 SF combined base. 720k SF absorbed at 120k/quarter would land you at roughly 6,861,000 SF leased on a 7,200,000 SF base — that\'s only 95.3%, but that assumes zero additional supply and perfectly linear absorption, neither of which holds.',
    },
    {
      label:
        'Absorption will self-correct quickly because rents will fall and attract demand.',
      isBest: false,
      explanation:
        'Rate pressure may help at the margin but is not a substitute for absorption math. A 5–10% rent concession might accelerate deals already in the pipeline, but if the fundamental demand driver (e-commerce growth, 3PL expansions) has slowed, lower rents primarily compress your yield rather than accelerating lease-up speed. Always model timing on observable absorption pace, then stress for slower recovery.',
    },
    {
      label:
        'Only focus on your building\'s absorption, not the submarket. Asset quality will outperform.',
      isBest: false,
      explanation:
        'Individual asset quality affects market share within submarket absorption, not the total absorptive capacity of the market. If submarket absorption is 120k SF/quarter and you expect your single building to absorb 300k SF in 18 months, you\'re implicitly claiming your building captures more than the entire submarket\'s quarterly activity. Even the best-quality building can\'t create demand that isn\'t there.',
    },
  ],
  takeaway:
    'Spec development lease-up timing hinges on submarket absorption math, not just asset quality. Always compute: (a) gap to target occupancy on the full inventory base, including your own delivery; (b) quarters needed at trailing absorption pace; (c) quarters needed at a stressed lower pace. Present a range — never a single point estimate — and identify the specific demand drivers that support the base case.',
  tips: [
    'Absorption pace: use the most recent quarter if it has decelerated, not the trailing-four-quarter average.',
    'Your building adds to the denominator and the supply to absorb — model both effects.',
    'If absorption has been negative, you need a named catalyst (e.g., port expansion, new 3PL entrant) to defend any stabilization timeline.',
  ],
};
