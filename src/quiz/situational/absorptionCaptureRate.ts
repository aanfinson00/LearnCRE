import type { SituationalCase } from '../../types/situational';

export const absorptionCaptureRate: SituationalCase = {
  id: 'absorption-capture-rate',
  title: 'What capture rate should you underwrite?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['development', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'A developer is planning a 250-unit luxury multifamily project. The broader submarket absorbs roughly 400 units per month across all product types. Of those, luxury Class-A units account for about 120 units/month — the rest are workforce and Class-B. There are currently 500 luxury units in lease-up from two competing projects. The developer\'s lender is asking them to justify their 40-unit/month absorption assumption.',
  data: [
    { label: 'Project size', value: '250 units (Class A, luxury)' },
    { label: 'Total submarket absorption', value: '400 units/mo (all types)' },
    { label: 'Class A absorption', value: '120 units/mo' },
    { label: 'Competing Class A in lease-up', value: '500 units (2 projects)' },
    { label: 'Developer absorption assumption', value: '40 units/mo' },
  ],
  question: 'How should you evaluate the developer\'s 40-unit/month capture assumption?',
  options: [
    {
      label: 'It\'s defensible but at the high end. The implied capture rate is 40 of 120 Class-A units per month — 33% share among 3 competing projects. A 25–30% capture rate (~30–36 units/month) is more conservative and appropriate for a lender\'s base case.',
      isBest: true,
      explanation:
        'The developer is implicitly claiming a 33% capture rate of Class-A demand while competing with two other projects of similar scale. If the three projects split demand equally, the fair share is ~40 units/month. So 40/month is plausible but assumes no competitive disadvantage. A lender or investor should stress to 25–30% capture (30–36 units/month) which produces an 8–10 month stabilization vs. the developer\'s ~6 months. Equal share is a reasonable base; stress to below equal share to account for the risk that competitors undercut on concessions.',
    },
    {
      label: 'Reject the assumption outright — 40 units/month is 10% of the 400-unit total submarket, which is aggressive.',
      isBest: false,
      explanation:
        'Comparing the project to total submarket absorption (including Class B and workforce) is the wrong benchmark. The subject is luxury, so the relevant comp pool is Class-A absorption: 120 units/month. Within that segment, 40 units is a 33% capture rate among 3 competing projects — defensible, not obviously aggressive.',
    },
    {
      label: 'It\'s conservative — 250 units at 40/month is a 6-month lease-up, which is faster than market.',
      isBest: false,
      explanation:
        'The capture rate is the relevant test, not the absolute pace. 40 units/month is fine only if 40 is a realistic share of segment demand. Whether the 6-month lease-up is "fast" depends on competitive positioning, concession environment, and the developer\'s ability to capture share from the two existing competitors.',
    },
    {
      label: 'The capture rate doesn\'t matter — just look at the total submarket health.',
      isBest: false,
      explanation:
        'Total submarket absorption tells you about overall demand but not about this project\'s competitive position. A healthy submarket can still produce a failed lease-up if the project is over-priced relative to competing supply. Capture rate links project-level assumptions to submarket realities.',
    },
  ],
  takeaway:
    'Capture rate = project absorption assumption ÷ segment-specific submarket absorption. Always segment the demand pool by product type (Class A vs. B vs. C) before computing. An equal-share capture rate is a defensible base; stress-test to below-equal-share for construction loan sizing and equity return sensitivity.',
  tips: [
    'Capture rate benchmark: equal share among competing projects is your sanity check.',
    'Stress capture rate 20–30% below base for lender/IC presentations.',
    'Segment demand by product tier — total submarket absorption overstates the relevant pool for luxury.',
  ],
};
