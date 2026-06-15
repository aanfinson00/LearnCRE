import type { SituationalCase } from '../../types/situational';

export const concessionAbsorptionTradeoff: SituationalCase = {
  id: 'concession-absorption-tradeoff',
  title: 'Does offering free rent actually accelerate lease-up?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You manage a 300-unit multifamily asset that delivered 5 months ago and is currently 72% leased (216 units). Monthly net absorption (new leases minus move-outs) has been running at 12 units. A leasing consultant is recommending you offer 1.5 months of free rent to accelerate absorption, claiming it will double your monthly leasing velocity to 24 units. Comparable properties in the submarket are currently offering 1 month of free rent. Your target is 95% occupancy (285 units).",
  data: [
    { label: 'Total units', value: '300' },
    { label: 'Current occupancy', value: '72% (216 units)' },
    { label: 'Monthly absorption', value: '12 units/month' },
    { label: 'Consultant\'s projected absorption', value: '24 units/month (with 1.5 months free)' },
    { label: 'Comp concessions', value: '1 month free rent' },
    { label: 'Target occupancy', value: '95% (285 units)' },
  ],
  question:
    'How do you evaluate the concession strategy, and is the projected velocity increase defensible?',
  options: [
    {
      label:
        "Run the NER math on both scenarios first. At current pace you reach 95% in ~6 months with no extra concession cost. At 1.5 months free, you get there in ~3 months but give up 1.5 months × 69 remaining units × rent/unit in concessions. If the carry cost savings exceed the concession cost, accelerate — otherwise don't.",
      isBest: true,
      explanation:
        "The right framework is always economics, not velocity for its own sake. Carry cost savings: 3 months of faster stabilization × (285 units × average rent) × operating-cost-drag fraction. Concession cost: 1.5 months free × 69 remaining leases needed × average rent. Compare the two. In most markets, 1 month of free rent is already at comp parity — so 1.5 months is 0.5 months ABOVE the market, which may attract renters but also trains the market to expect premium concessions at your asset. The 2× velocity projection is also optimistic; doubling velocity from adding 0.5 months above comp concessions is rarely supported by data. A 30–50% velocity increase is a more defensible projection.",
    },
    {
      label:
        "Offer the 1.5 months of free rent — occupancy is the priority, and the concession cost is recoverable once stabilized.",
      isBest: false,
      explanation:
        "Prioritizing occupancy over economics is an asset management error. Concessions are non-recoverable — free rent given to 69 leases is gone. The question is whether the carry cost savings from faster stabilization exceed the concession cost. Going above-market on concessions also sets a precedent at renewal time and can signal product weakness to the market.",
    },
    {
      label:
        "Don't offer more concessions — wait out the market. At 12 units/month you'll reach 95% in 6 months without giving up NER.",
      isBest: false,
      explanation:
        "Correct on the economics but incomplete analysis. There may be a real cost to waiting: construction loan carry at a higher rate, lender occupancy covenants, or investor distributions that depend on stabilization. The \"wait it out\" approach is right IF carry costs are minimal and concession economics are unfavorable. But you should quantify the carry before concluding it's the right call.",
    },
    {
      label:
        "Match the market exactly at 1 month free rent — staying at comp parity is always the right move.",
      isBest: false,
      explanation:
        "Comp parity is a starting point, not a rule. If you can reach 95% at current velocity before carry costs become material, you might offer nothing. If carry costs are heavy, exceeding comps to accelerate is justifiable. The right answer is derived from the NER/carry math, not from reflexively matching the market.",
    },
  ],
  takeaway:
    'Concession acceleration is a capital allocation decision, not a marketing decision. The framework: (1) compute carry cost of slower lease-up at current pace, (2) compute total concession cost of the incremental concession offer on remaining unleased units, (3) compare. If concession cost < carry savings, accelerate. Critically, question optimistic velocity projections — moving 0.5 months above comp concessions rarely doubles leasing pace; 30–50% upside is more defensible. And always check whether above-market concessions set a damaging comp for competing lease renewals.',
  tips: [
    'Concession cost = incremental free rent months × remaining unleased units × monthly rent.',
    'Carry cost savings = months saved × stabilized-income shortfall × operating drag rate.',
    'Going above-market on concessions to accelerate is defensible once; doing it repeatedly signals product weakness.',
  ],
};
