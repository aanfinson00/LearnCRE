import type { SituationalCase } from '../../types/situational';

export const compSelectionOffMarketOutlier: SituationalCase = {
  id: 'comp-selection-off-market-outlier',
  title: 'Should a related-party trade set your cap rate?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a 250-unit multifamily asset. Your comp set includes 4 arm\'s-length market transactions averaging a 5.25% cap rate, plus one additional "comp" — a recent trade between two entities that share a common ownership group (an internal restructuring, not a market sale), which closed at a 4.50% cap rate. Including that fifth comp pulls your average down to 5.10%.',
  data: [
    { label: 'Comp 1 (arm\'s length)', value: '5.4% cap' },
    { label: 'Comp 2 (arm\'s length)', value: '5.1% cap' },
    { label: 'Comp 3 (arm\'s length)', value: '5.3% cap' },
    { label: 'Comp 4 (arm\'s length)', value: '5.2% cap' },
    { label: 'Comp 5 (related-party restructuring)', value: '4.5% cap' },
    { label: 'Average of all 5', value: '5.10% cap' },
    { label: 'Average of Comps 1-4 only', value: '5.25% cap' },
  ],
  question: 'How should Comp 5 factor into your cap rate?',
  options: [
    {
      label: 'Exclude Comp 5 entirely — a related-party transfer isn\'t a market-tested price; use the 5.25% average of the 4 arm\'s-length comps.',
      isBest: true,
      explanation:
        'Cap rates are only meaningful as a pricing signal when they come from a transaction where a buyer and seller negotiated at arm\'s length, each trying to get the best price for themselves. A related-party restructuring can be priced for tax, financing, or internal accounting reasons that have nothing to do with market value — it might be deliberately priced aggressively (low cap) to support a refinance, or conservatively for other reasons. Including it treats a non-market data point as if it were market evidence, which pulls your anchor cap 15 bps tighter than the real comp set supports.',
    },
    {
      label: 'Include Comp 5 but weight it at half the influence of the other comps, since it\'s still a real closed transaction.',
      isBest: false,
      explanation:
        'A partial weighting still lets a non-market price influence your anchor. The issue with Comp 5 isn\'t that it\'s "less reliable" data needing a smaller weight — it\'s that it doesn\'t measure the thing you\'re trying to measure (an arm\'s-length market clearing price) at all. The right treatment is exclusion, not dilution.',
    },
    {
      label: 'Include Comp 5 at full weight — a closed transaction is a closed transaction regardless of who the parties are.',
      isBest: false,
      explanation:
        'Ignores why cap rate comps are useful in the first place: they proxy for what an independent buyer would pay. A related-party transfer doesn\'t answer that question, so treating it identically to the arm\'s-length comps corrupts the average with a price that may reflect motives unrelated to market value.',
    },
    {
      label: 'Investigate further before deciding — if the related-party deal used a third-party appraisal to set price, it may be usable; otherwise exclude it.',
      isBest: false,
      explanation:
        'A reasonable diligence instinct in the abstract, but even a third-party appraisal on a related-party deal is typically produced to support the specific transaction\'s internal purpose (financing, tax basis, etc.), not to represent a market test of what an unrelated buyer would pay competitively. Absent evidence the property was marketed to and bid on by unrelated parties, the safer default is exclusion.',
    },
  ],
  takeaway:
    'Cap rate comps derive their value from being arm\'s-length, market-tested prices. Related-party transfers, even when they close and record a price, don\'t answer the question a comp set is supposed to answer — exclude them rather than diluting the average.',
  tips: [
    'Ask who the buyer and seller are before trusting a comp — related-party and 1031-driven trades can be priced for reasons other than market value.',
    'A single outlier comp that moves your average by 10-20+ bps deserves scrutiny before inclusion, not just averaging-in.',
    'When in doubt about a comp\'s arm\'s-length status, exclude it and note the gap rather than force a number.',
  ],
};
