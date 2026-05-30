import type { SituationalCase } from '../../types/situational';

export const absorptionIndustrialDelivery: SituationalCase = {
  id: 'absorption-industrial-delivery',
  title: 'Can the submarket absorb this much new supply?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'A logistics submarket has 18 million SF of total inventory and is currently 96% leased. Six new spec buildings are scheduled to deliver 2.4 million SF over the next 18 months. Trailing 12-month net absorption was 900,000 SF; the prior year was 1.1 million SF. You are evaluating an acquisition of a stabilized 400,000 SF distribution center in this submarket.',
  data: [
    { label: 'Total submarket inventory', value: '18M SF' },
    { label: 'Current occupancy', value: '96%' },
    { label: 'Upcoming spec deliveries', value: '2.4M SF over 18 months' },
    { label: 'Trailing 12-mo net absorption', value: '900,000 SF' },
    { label: 'Prior year net absorption', value: '1.1M SF' },
  ],
  question: 'What does the supply/demand math tell you about exit risk for this acquisition?',
  options: [
    {
      label: 'The pipeline represents 2.7x trailing annual absorption — at current pace, the market needs 2.5–3 years to clear the new supply, which creates real concession and vacancy risk at your hold period exit.',
      isBest: true,
      explanation:
        '2.4M SF pipeline ÷ 900K SF/yr absorption ≈ 2.7 years to clear — and absorption is already decelerating (1.1M → 900K). The submarket is tight today at 96%, but by the time the new supply delivers the vacancy rate could swing to 8–12%. That translates to concession pressure on renewals, tighter exit caps, and a slower lease-up if a tenant rolls during the supply wave. Conservative underwriting: model 100–150 bps cap widening at exit and at least one free-rent concession on any near-term rollover.',
    },
    {
      label: 'The 96% occupancy means the market can easily absorb 2.4M SF — it\'s already undersupplied.',
      isBest: false,
      explanation:
        'Current tightness tells you where the market is, not where it\'s going. 2.4M SF of spec delivery into a 900K SF/yr absorption market is a structural oversupply event regardless of the starting vacancy. The mistake is anchoring to current conditions rather than the forward supply/demand balance.',
    },
    {
      label: 'Absorption will accelerate to meet supply — spec developers wouldn\'t build without demand signals.',
      isBest: false,
      explanation:
        'Spec construction decisions are made 12–18 months before delivery; demand conditions can change materially. Absorption doesn\'t automatically rise to clear supply — if it did, no market would ever have a vacancy problem. The trailing deceleration (1.1M → 900K) is a warning sign, not confirmation that demand is elastic.',
    },
    {
      label: 'The new supply is irrelevant — your asset is already stabilized and won\'t be affected.',
      isBest: false,
      explanation:
        'Stabilized today doesn\'t mean insulated at exit. If the submarket softens during your hold, lease renewal negotiations will be weaker, rent bumps will face pushback, and cap rates at exit will widen. The supply pipeline directly affects the exit environment even for a fully leased asset.',
    },
  ],
  takeaway:
    'Converting pipeline supply to "years of absorption" is the fastest way to quantify supply risk. When pipeline > 2x trailing annual absorption and absorption is decelerating, the market will soften during a typical 3-5 year hold. Price that into exit cap assumptions and renewal economics.',
  tips: [
    'Supply risk years = spec pipeline SF ÷ trailing annual net absorption.',
    'Decelerating absorption (falling Y/Y) amplifies supply risk — use the lower number.',
    'Spec vs. build-to-suit: spec adds to vacancy risk; BTS is pre-leased and doesn\'t.',
  ],
};
