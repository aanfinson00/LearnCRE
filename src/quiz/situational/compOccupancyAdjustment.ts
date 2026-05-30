import type { SituationalCase } from '../../types/situational';

export const compOccupancyAdjustment: SituationalCase = {
  id: 'comp-occupancy-adjustment',
  title: 'How do you adjust a comp that traded partially vacant?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'retail',
  scenario:
    'You\'re evaluating a 95%-leased neighborhood retail center at an implied 6.25% going-in cap. The broker\'s best comp traded 5 months ago at a 7.10% going-in cap — but that asset was only 82% occupied at the time of sale. Both assets are similar-size anchored strip centers in the same metro. You need to decide whether and how to use the comp.',
  data: [
    { label: 'Subject occupancy', value: '95% leased' },
    { label: 'Subject implied cap', value: '6.25%' },
    { label: 'Comp occupancy at sale', value: '82% leased' },
    { label: 'Comp traded cap rate', value: '7.10%' },
    { label: 'Both assets', value: 'Anchored strip centers, same metro, similar SF' },
  ],
  question: 'How should you handle the occupancy difference when using this comp?',
  options: [
    {
      label: 'Stabilize the comp to estimate what it would have traded at 95% — using a market lease-up cost and time adjustment, the comp likely implies a 6.25–6.50% cap at stabilized occupancy, which is consistent with the subject ask.',
      isBest: true,
      explanation:
        'Buyers of partially vacant retail price in the lease-up cost, timing, and risk — that\'s the spread between 7.10% and where they\'d sell it stabilized. To normalize: estimate the income gap (13 ppts of vacancy × market rent), apply a lease-up timeline and discount, and back into the implied stabilized cap. A rough approximation: market lease-up for 13% vacancy in retail takes 12–18 months at $15–25/SF in TIs/LCs — that cost burden is embedded in the 7.10% going-in cap. Adjusting for it narrows the spread to 50–75 bps vs. the subject, making the subject\'s 6.25% look fair.',
    },
    {
      label: 'Discard the comp — occupancy is too different to make any comparison meaningful.',
      isBest: false,
      explanation:
        'A documented occupancy adjustment is better than no comparable data. Discarding useful comps because they require work weakens your pricing support. The bridge from 82% to 95% is quantifiable: lease-up cost, timing, and risk premium. Make the adjustment and footnote it.',
    },
    {
      label: 'Use the 7.10% directly as evidence the market trades at wider caps — the subject at 6.25% looks aggressive.',
      isBest: false,
      explanation:
        'Using the raw cap of a partially vacant asset to benchmark a stabilized asset ignores the lease-up risk premium in the vacant building\'s pricing. The 7.10% reflects the discount a buyer applies to take on 18% vacancy; your subject at 95% doesn\'t carry that burden. Comparing raw caps across different occupancy levels is apples-to-oranges.',
    },
    {
      label: 'Average the two caps — 6.68% — and use that as the market reference.',
      isBest: false,
      explanation:
        'Averaging a stabilized-asset cap with a distressed/vacant-asset cap produces a number that reflects neither market. The 7.10% is already a blended going-in cap that embeds both stabilized yield AND lease-up discount. Averaging without adjustment gives you a midpoint that doesn\'t correspond to any real asset or buyer type.',
    },
  ],
  takeaway:
    'Partially vacant comp sales require a "stabilized cap" adjustment before comparison. Estimate the lease-up cost (TIs + LCs + free rent), time value, and risk premium embedded in the distressed cap; then back into what the buyer would sell it for stabilized. The spread between going-in and stabilized-implied caps tells you how much lease-up risk the buyer priced in.',
  tips: [
    'Vacant-to-stabilized adjustment: estimate TI + LC + free rent cost, apply time value.',
    'A partially vacant retail comp at 7%+ is often closer to 6.25–6.50% on a stabilized basis.',
    'Document your adjustment assumptions — any reviewer should be able to replicate the bridge.',
  ],
};
