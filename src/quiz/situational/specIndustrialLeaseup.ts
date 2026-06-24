import type { SituationalCase } from '../../types/situational';

export const specIndustrialLeaseup: SituationalCase = {
  id: 'spec-industrial-leaseup',
  title: 'How long to stabilize a spec industrial box?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['development', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You\'re underwriting a 500,000 SF spec industrial development delivering in Q3. The submarket has 8M SF of inventory at 96% occupancy. Current quarterly net absorption is 200k SF. However, two competing spec buildings (totaling 650k SF) are also expected to deliver in Q3–Q4. Your construction lender requires a 90% lease-up within 18 months for the permanent refi to clear DSCR covenants.',
  data: [
    { label: 'Subject size', value: '500k SF (spec)' },
    { label: 'Market inventory', value: '8M SF at 96% occupancy' },
    { label: 'Net absorption (quarterly)', value: '200k SF' },
    { label: 'Competing deliveries (Q3–Q4)', value: '650k SF additional spec' },
    { label: 'Refi requirement', value: '90% leased within 18 months' },
  ],
  question: 'Is the 18-month stabilization timeline achievable?',
  options: [
    {
      label:
        'Uncertain — the combined spec deliveries (1.15M SF total) equal about 5–6 quarters of current absorption. Achieving 90% on your 500k SF within 18 months is possible but requires capturing a disproportionate share of demand vs. competing buildings.',
      isBest: true,
      explanation:
        'The math: 90% of 500k SF = 450k SF to lease. Quarterly absorption of 200k SF serves the entire market, including your competitors. With 1.15M SF of spec delivering simultaneously, you\'re competing for roughly 4–6 quarters of demand. Your 18-month window covers 6 quarters of absorption (~1.2M SF) which matches total supply — but that\'s market-level, not building-level. Whether you capture 450k SF depends on your building specs (clear height, truck courts, dock count), pricing, and timing relative to competitors. Flag this as a significant execution risk in underwriting and stress the lease-up timeline in your base case.',
    },
    {
      label:
        'Easily achievable — the market is 96% occupied, indicating a supply shortage that will absorb all new deliveries quickly.',
      isBest: false,
      explanation:
        '96% occupancy reflects the current state before deliveries, not the post-delivery equilibrium. Adding 1.15M SF to an 8M SF market (14.4% supply addition) will reset occupancy to ~90% even if demand holds flat. Spec industrial deals are underwritten on projected supply/demand balance at delivery, not on current conditions. A 96%-occupied market with 1.15M SF of spec coming is materially different from a 96%-occupied market with no new supply.',
    },
    {
      label:
        'Not achievable — at 200k SF/quarter, it takes 9+ quarters just to absorb your building, exceeding the 18-month window.',
      isBest: false,
      explanation:
        'This over-simplifies. Quarterly absorption is a market-level metric; it doesn\'t mean any single building absorbs at that pace. A large user (3PL, e-commerce tenant) could take 400k SF in a single transaction. Industrial lease-ups often happen in 1–2 anchor leases rather than through gradual quarter-by-quarter accumulation. The constraint is competitive demand capture, not arithmetic absorption.',
    },
    {
      label:
        'Achievable — build-to-suit interest from prospective tenants always converts before spec deliveries create risk.',
      isBest: false,
      explanation:
        'Conflates build-to-suit activity (pre-committed, low risk) with spec interest (no commitment until a lease is signed). Spec buildings may generate tours and letters of intent from BTS prospects shopping alternatives, but counting that as a committed offset to spec risk understates occupancy uncertainty. The question specifies this is a spec delivery, so no pre-commitment is in hand.',
    },
  ],
  takeaway:
    'Spec industrial lease-up timelines are a market-share-of-absorption problem, not a gross-absorption problem. When multiple spec buildings deliver simultaneously, underwrite your share of demand, not total market demand. The critical variables are competing supply volume, your building\'s specs vs. alternatives, and timing (first to deliver often wins the first anchor lease).',
  tips: [
    'Rule of thumb: each spec building captures roughly its pro-rata share of absorption unless specs/location differentiate it.',
    'Industrial lease-ups often front-load: one large anchor (50–60% of building) signs early; small tenants fill the rest.',
    'Construction lender DSCR covenants at 90% occupancy effectively set the floor on lease-up speed you need to underwrite.',
  ],
};
