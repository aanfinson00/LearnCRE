import type { SituationalCase } from '../../types/situational';

export const absorptionIndustrialOverbuilt: SituationalCase = {
  id: 'absorption-industrial-overbuilt',
  title: 'How long does this industrial glut take to clear?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'industrial',
  scenario:
    'A Sunbelt logistics submarket experienced a development boom in 2022–2023. The submarket now has 18M SF of total inventory, with 3.2M SF vacant and an additional 2.4M SF of speculative construction set to deliver over the next 12 months. Historically, net absorption has run 600k SF per quarter. However, the most recent quarter came in at 350k SF due to a major e-commerce tenant contracting footprint.',
  data: [
    { label: 'Total inventory', value: '18M SF' },
    { label: 'Current vacancy', value: '3.2M SF (17.8%)' },
    { label: 'New supply delivering', value: '2.4M SF over next 12 months' },
    { label: 'Historical net absorption', value: '600k SF/quarter' },
    { label: 'Most recent quarter absorption', value: '350k SF' },
  ],
  question: 'How do you forecast the clearing timeline and what does it imply for underwriting?',
  options: [
    {
      label: 'Use a stepped absorption approach: assume 350–450k SF/quarter for the near-term (12–18 months) while the e-commerce tenant footprint overhang clears, then revert toward 500k SF/quarter. At those rates, the combined 5.6M SF of current + new vacancy takes 3–4 years to clear.',
      isBest: true,
      explanation:
        'Total supply to clear: 3.2M SF existing + 2.4M SF delivering = 5.6M SF. At the depressed 350k SF/quarter pace, that\'s 16 quarters (4 years). Even at a recovery pace of 500k SF/quarter, it\'s ~11 quarters (nearly 3 years). The right answer acknowledges (a) near-term demand weakness is structural (e-commerce rightsizing), not cyclical, and (b) new spec supply delivering into an already-soft market extends the timeline. Rent concessions (free rent, TI) will likely persist through the clearing period, depressing NOI relative to asking rents.',
    },
    {
      label: 'Use historical 600k SF/quarter — one soft quarter isn\'t a trend.',
      isBest: false,
      explanation:
        'One data point doesn\'t make a trend, but it also shouldn\'t be dismissed if there\'s a fundamental explanation. E-commerce tenant contraction is a documented cyclical dynamic (Amazon, FedEx, and others shed ~100M SF nationally in 2022–23). Assuming immediate reversion to peak absorption ignores both the near-term supply overhang and a demand driver that is still unwinding.',
    },
    {
      label: 'The 17.8% vacancy will clear quickly because industrial is a long-term supply-constrained asset class.',
      isBest: false,
      explanation:
        'Industrial is supply-constrained in certain coastal markets, but Sunbelt logistics corridors have demonstrated the ability to deliver significant spec supply rapidly. Long-run structural arguments don\'t resolve near-term clearing math. Underwrite to the cycle, not the asset class thesis.',
    },
    {
      label: 'There\'s no way to forecast accurately — just exit conservatively by widening the exit cap.',
      isBest: false,
      explanation:
        'Widening the exit cap is a valid stress, but not a substitute for absorbing (pun intended) the market dynamics into a timeline estimate. The clearing math is straightforward: (vacancy + new supply) ÷ absorption pace. Work through it and let the result inform your hold period, exit cap, and lease-up reserve assumptions.',
    },
  ],
  takeaway:
    'Clearing timeline = total supply to absorb ÷ absorption pace. In an overbuilt market, use the forward-looking pace (near-term depressed, recovering later), not the historical peak. Combine a stepped absorption approach with widened exit cap and lease-up reserves — the two tools reinforce each other.',
  tips: [
    'Total supply to clear = current vacancy + deliveries over hold. Don\'t forget the pipeline.',
    'E-commerce tenant contraction is a demand driver, not noise — track leasing activity by tenant type.',
    'In overbuilt markets: wider concession packages (free rent, TI) depress effective rents below asking even as absorption continues.',
  ],
};
