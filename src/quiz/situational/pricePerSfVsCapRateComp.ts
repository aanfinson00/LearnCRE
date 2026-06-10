import type { SituationalCase } from '../../types/situational';

export const pricePerSfVsCapRateComp: SituationalCase = {
  id: 'price-per-sf-vs-cap-rate-comp',
  title: 'Value-add office: use price/SF comps or cap rate comps?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You are pricing a 150,000 SF Class-B office building at 55% occupancy. The tenants in place are month-to-month. Your business plan is a lease-up to 90%+ occupancy over 24 months. The broker provides both types of comps: (a) five cap rate comps on stabilized office assets at 6.25%–6.75%, and (b) four price/SF comps on value-add/vacant office assets at $110–$145/SF.',
  data: [
    { label: 'Subject', value: 'Class-B office, 55% occ., M-T-M tenants' },
    { label: 'Business plan', value: 'Lease-up to 90%+ over 24 months' },
    { label: 'Stabilized cap rate comps', value: '6.25%–6.75% (5 comps)' },
    { label: 'Value-add price/SF comps', value: '$110–$145/SF (4 comps)' },
  ],
  question:
    'Which comp approach better supports pricing the subject asset?',
  options: [
    {
      label:
        'Price/SF comps on value-add and vacant office are the right anchor here. Cap rate comps apply to stabilized income streams — the subject has no reliable stabilized NOI to apply a cap to. Price/SF reflects what buyers pay for optionality and lease-up potential, which is what you are actually buying.',
      isBest: true,
      explanation:
        "Cap rates are applied to a reliable income stream. At 55% occupancy with M-T-M tenants, there is no defensible stabilized NOI to capitalize — what number do you use? In-place NOI understates potential (misses 35% upside); stabilized NOI requires underwriting assumptions that are exactly what's being debated in pricing. Price/SF comps for value-add office abstract away the occupancy issue and reflect what informed buyers have paid for similar lease-up optionality. Anchor to $110–$145/SF, then justify where within (or outside) that range your deal lands based on location, building quality, lease-up difficulty, and capital needs.",
    },
    {
      label:
        'Use the stabilized cap rate comps — apply the 6.50% cap to your projected stabilized NOI to get implied value, then discount for lease-up risk.',
      isBest: false,
      explanation:
        "This approach can work but introduces significant subjectivity: you must first project stabilized NOI (itself a market call), then determine the appropriate lease-up discount (another market call). Two guesses compound. It also requires you to have reliable comps on stabilized NOI per SF for this submarket, which you'd need to establish separately. For a deeply value-add asset, price/SF comps cut through that complexity.",
    },
    {
      label:
        'Average both approaches and use the midpoint as the pricing anchor.',
      isBest: false,
      explanation:
        "Averaging incompatible metrics doesn't produce a better answer — it blends a stabilized-asset valuation with a value-add valuation, which are pricing two different products. The result is arbitrary. Use the metric appropriate to the investment profile; you can note the stabilized implied value as an upside / exit check, not as a blend.",
    },
    {
      label:
        'Cap rate comps are always more rigorous — price/SF is a shortcut and less defensible in an IC presentation.',
      isBest: false,
      explanation:
        "Price/SF is less precise on a per-deal basis, but it is exactly the right metric when there is no reliable in-place income to capitalize. IC committees understand value-add pricing; they expect price/SF logic for vacant or distressed assets. Using a cap rate on a 55%-occupied M-T-M building would require so many assumptions that it becomes less defensible, not more.",
    },
  ],
  takeaway:
    "The appropriate valuation metric depends on the asset's income profile. Stabilized assets → cap rate. Vacant or heavily transitional assets → price/SF (or price/unit for multifamily). Lightly value-add assets may support both with a bridge: start at price/SF, then confirm the cap rate implied by your underwritten stabilized NOI is market-consistent. Never apply a cap rate to an unreliable in-place income stream.",
  tips: [
    'Rule of thumb: if occupancy is below ~75%, price/SF comps are more reliable than cap rate comps.',
    'Cap rate on value-add: you need to specify clearly whether it\'s in-place, current, or stabilized NOI.',
    'Price/SF comps: filter for similar occupancy at time of sale — vacant comps differ from 60%-occupied comps.',
  ],
};
