import type { SituationalCase } from '../../types/situational';

export const multifamilyNewSupplyAbsorption: SituationalCase = {
  id: 'multifamily-new-supply-absorption',
  title: 'Competing complex is 75% leased in month 8 — what does that tell you?',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'You are underwriting a 200-unit ground-up multifamily development that will deliver in 18 months. A directly competing new complex opened 8 months ago with 300 units; it is currently 75% leased. Market rents have held flat since delivery. Your pro forma assumes your project stabilizes (93% occupied) within 12 months of opening.',
  data: [
    { label: 'Your project size', value: '200 units' },
    { label: 'Your expected delivery', value: '18 months from now' },
    { label: 'Competing complex units', value: '300 units' },
    { label: 'Competing complex occupancy at month 8', value: '75% (225 units leased)' },
    { label: 'Implied monthly absorption (competing)', value: '~28 units/month' },
    { label: 'Your stabilization target', value: '93% in 12 months post-delivery' },
  ],
  question:
    'Based on the competing complex\'s lease-up pace, how reasonable is your 12-month stabilization assumption?',
  options: [
    {
      label: 'It is optimistic — the competing complex absorbed ~28 units/month on 300 units; applying a similar pace to 200 units implies stabilization in 6–7 months, but that assumes you are not competing against its remaining 25% vacancy at the same time.',
      isBest: true,
      explanation:
        '225 leased units ÷ 8 months = ~28 units/month absorption. At 28 units/month, 200 units would stabilize in about 7 months — but this ignores that when your project opens in 18 months, the competing complex will likely have filled (fully absorbed) or its remaining vacancy will cap the market\'s appetite. If it has not fully leased by then, you will be competing directly. The 12-month assumption is defensible if the competing complex is fully absorbed before your delivery — but you should confirm that timing explicitly.',
    },
    {
      label: 'It is conservative — 28 units/month would stabilize 200 units in about 7 months, so 12 months is too long.',
      isBest: false,
      explanation:
        'Applying the competitor\'s pace directly to your project ignores the market context: you will be delivering into a submarket where a 300-unit lease-up is still recent. The submarket\'s remaining demand absorbs both projects. A 7-month extrapolation assumes no competition, no concession pressure, and no market softening — all of which are real risks in a heavy-delivery environment.',
    },
    {
      label: '12 months is a standard assumption for multifamily; the competitor\'s pace is irrelevant because you are a different product.',
      isBest: false,
      explanation:
        '"Standard" assumptions should always be calibrated against observed market data. If you have a direct comparable absorbing in the same submarket, that is the most relevant data point available. Dismissing it because products differ misses the insight: market demand is what sets absorption pace, not your product in isolation.',
    },
    {
      label: 'You cannot draw conclusions from one comparable — you need at least five.',
      isBest: false,
      explanation:
        'One directly competing asset in the same submarket is exactly the kind of primary data point that matters most for stabilization assumptions. A portfolio of five comps across different submarkets would be weaker evidence. Use what is most relevant; note the sample-size limitation in your memo, but do not ignore the data.',
    },
  ],
  takeaway:
    'When a direct comparable exists, use it. Divide units leased by months elapsed to get an implied absorption rate, then stress-test your own stabilization timeline against it — accounting for whether the competitor\'s remaining vacancy will be active when you deliver.',
  tips: [
    'Quick check: units to stabilize ÷ observed absorption rate = months to stabilize. Then ask what changes that assumption.',
    'Track the competing complex monthly. If its pace slows (fewer leases per month), your submarket is softening.',
    'Lease-up pace and concession levels tell different stories: fast absorption with heavy concessions signals weak effective rent, not strong demand.',
  ],
};
