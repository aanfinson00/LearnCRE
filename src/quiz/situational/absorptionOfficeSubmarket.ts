import type { SituationalCase } from '../../types/situational';

export const absorptionOfficeSubmarket: SituationalCase = {
  id: 'absorption-office-submarket',
  title: 'When will downtown office stabilize after the big sublease wave?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A downtown CBD office submarket has 8.5M SF of total inventory. Direct vacancy is 14% (1.19M SF) and sublease availability adds another 900K SF, bringing total available space to roughly 2.09M SF. Net absorption has averaged −80K SF/quarter over the past 6 quarters as tenants downsize. Two new Class A towers totaling 650K SF are delivering next year; both are 40% pre-leased. You\'re considering an acquisition at a 7.5% cap on in-place NOI and need to assess when the submarket could return to 10% availability.',
  data: [
    { label: 'Total inventory', value: '8.5M SF' },
    { label: 'Direct vacancy', value: '14% (1.19M SF)' },
    { label: 'Sublease availability', value: '900K SF' },
    { label: 'Total available', value: '~2.09M SF (24.6%)' },
    { label: 'Net absorption (trailing)', value: '−80K SF/quarter' },
    { label: 'New deliveries (next 12 mos)', value: '650K SF, 40% pre-leased' },
  ],
  question:
    'How do you frame the absorption outlook and what does it mean for the acquisition decision?',
  options: [
    {
      label:
        'Negative net absorption means available space is growing, not shrinking. Add the 390K SF of unleased new supply to today\'s 2.09M SF available → 2.48M SF. To reach 10% availability (850K SF), the market must absorb 1.63M SF net — at −80K SF/quarter that\'s a deteriorating scenario, not stabilization. The acquisition must underwrite further NOI pressure, not recovery.',
      isBest: true,
      explanation:
        'This is the correct framing. Net absorption is negative, meaning demand is below supply run-off. New deliveries with 60% vacancy add supply. The path to 10% availability requires a reversal from −80K to positive absorption AND absorption of a large backlog. A 7.5% going-in cap in a market with negative absorption and rising available space is aggressive — the in-place NOI is at risk as leases roll. Conservative underwriting would model continued NOI erosion for 2-4 years before any recovery.',
    },
    {
      label:
        'The 40% pre-leasing on new towers shows demand exists. The market is close to bottoming; buy now before recovery reprices the asset.',
      isBest: false,
      explanation:
        '40% pre-leasing on new Class A product is the flight-to-quality trade, not a submarket absorption signal. The pre-leased tenants are often moving from existing Class B/C stock, increasing available space elsewhere. Net absorption remains the governing metric, and it\'s been negative for 6 consecutive quarters. Bottoming requires positive absorption, not pre-leasing of a flight-to-quality delivery.',
    },
    {
      label:
        'Model the 900K SF of sublease as burning off at 150K SF/year — that\'s the historical sublease absorption pace for major CBDs.',
      isBest: false,
      explanation:
        'Sublease availability doesn\'t mechanically "burn off" — it disappears when companies recall the space, expand into it, or let the sublease term expire. Historical averages from prior cycles don\'t apply if remote work has permanently reduced office demand. Applying a generic burn-off rate without examining the underlying lease expiry schedule and demand composition is a placeholder, not an analysis.',
    },
    {
      label:
        'Total available at 24.6% is already above a distress threshold; the market can\'t get much worse. Downside is limited.',
      isBest: false,
      explanation:
        '"Can\'t get much worse" is not underwriting. CBD office markets hit 30-35% availability in the early 1990s recession and again in 2008-2010 in gateway cities. With negative absorption and new supply incoming, 24.6% can become 28-30%. The acquisition must stress-test NOI at higher vacancy, not assume a floor.',
    },
  ],
  takeaway:
    'Office submarket absorption analysis starts with the sign on net absorption — positive or negative. Negative absorption means available space is growing even before new supply is counted. To project stabilization timing, compute the total available space deficit vs. target, then divide by a realistic positive absorption scenario — which itself requires a demand catalyst. In markets with structural demand headwinds (remote work, lease expirations), conservative analysts widen the stabilization timeline significantly.',
  tips: [
    'Net absorption = new leases signed − space given back. Negative = market shrinking demand.',
    'Sublease space is a leading indicator of future direct vacancy — model it expiring into vacant.',
    'New deliveries with <50% pre-leasing typically add net supply, even if pre-leasing appears healthy.',
    'A going-in cap on in-place NOI in a market with negative absorption requires a rent-roll stress test at rollover.',
  ],
};
