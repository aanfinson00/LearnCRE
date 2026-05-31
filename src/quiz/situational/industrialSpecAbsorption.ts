import type { SituationalCase } from '../../types/situational';

export const industrialSpecAbsorption: SituationalCase = {
  id: 'industrial-spec-absorption',
  title: 'Can the submarket absorb 2M SF of new spec supply?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'A major logistics submarket has 45M SF of inventory at 4% vacancy — effectively full. Local developers have 2M SF of speculative warehouse space under construction, all expected to deliver over the next 18 months. Historical annual net absorption has averaged 1.5M SF over the past 5 years. You are underwriting a spec industrial development that will deliver into this same environment.',
  data: [
    { label: 'Total inventory', value: '45M SF' },
    { label: 'Current vacancy', value: '4%' },
    { label: 'Spec supply under construction', value: '2M SF' },
    { label: 'Delivery window', value: '18 months' },
    { label: 'Avg annual absorption (5-yr)', value: '1.5M SF' },
  ],
  question: 'How do you assess whether the submarket can absorb the incoming supply?',
  options: [
    {
      label:
        'At 1.5M SF/yr, the submarket absorbs ~2.25M SF over 18 months — roughly matching the new delivery. This is the base case; stress-test at a 25–30% demand haircut to check how much vacancy leaks into the submarket if demand softens.',
      isBest: true,
      explanation:
        'Supply/demand math: 2M SF new supply ÷ 1.5M SF annual absorption = 1.3 years of absorption capacity. Over 18 months, that\'s ~2.25M SF of demand against 2M SF of supply — balanced in the base case. The risk is demand softening: if absorption drops to 1.0M SF/yr (a moderate slowdown), 18 months only clears 1.5M SF, leaving 500k SF of excess vacancy in the submarket. A well-underwritten spec deal stress-tests at a 20–30% demand haircut to determine the worst-case lease-up timeline and yield-on-cost sensitivity.',
    },
    {
      label:
        'The submarket is full at 4% vacancy — any new supply will absorb immediately with no modeling needed.',
      isBest: false,
      explanation:
        '4% vacancy is tight, but tightness doesn\'t make demand infinite. A spec building that delivers into a 4% vacancy market can still sit vacant if demand softens or if a competing spec building captures the same tenant. Tight vacancy supports a favorable lease-up assumption, but it doesn\'t replace the absorption math.',
    },
    {
      label:
        'You cannot underwrite spec industrial without pre-leasing — any positive absorption assumption is speculative by definition.',
      isBest: false,
      explanation:
        'Spec industrial development in a tight, high-demand submarket is a legitimate strategy. Underwriting absorption using historical pace, demand drivers, and stress tests is appropriate. The discipline is conservative assumptions on absorption timing — not refusing to underwrite speculative lease-up.',
    },
    {
      label:
        'Use only last year\'s absorption figure, not the 5-year average — recent data better reflects current demand.',
      isBest: false,
      explanation:
        'Recency bias in absorption underwriting is a common error. One or two exceptional years (e.g., a pandemic-driven e-commerce surge) can distort a single-year figure significantly. A 5-year average smooths cyclical swings and provides a more defensible base case, supplemented by directional commentary on the most recent quarters.',
    },
  ],
  takeaway:
    'Spec supply absorption analysis is a simple ratio: new supply ÷ historical demand pace = months to clear. Stress the demand assumption by 20–30% to test the vacancy outcome in a slowdown. Tight current vacancy sets a favorable starting point; the absorption pace math drives the lease-up timeline.',
  tips: [
    'Months-of-supply = new SF under construction ÷ (annual absorption ÷ 12).',
    'Industrial vacancy <5% is historically tight; still stress-test at 50–75% of avg absorption pace.',
    'If months-of-supply exceeds 24 months, your spec deal needs pre-leasing to reduce lease-up risk.',
  ],
};
