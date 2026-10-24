import type { SituationalCase } from '../../types/situational';

export const hotelReserveNoiBasis: SituationalCase = {
  id: 'hotel-reserve-noi-basis',
  title: 'Which NOI do you cap on a hotel?',
  category: 'pricing',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'hotel',
  scenario:
    'You are pricing a 150-key select-service hotel. The broker\'s package shows $1.50M of NOI and a price of $18.75M at an 8.0% cap rate. Reading the footnotes, that NOI is struck before the 4% FF&E reserve the brand requires. Your lender and your IC both cap hotel NOI after reserves.',
  data: [
    { label: 'Total revenue', value: '$8.0M' },
    { label: 'NOI before reserve', value: '$1.50M' },
    { label: 'FF&E reserve', value: '4% of revenue' },
    { label: 'Market cap rate', value: '8.0%' },
    { label: 'Broker price', value: '$18.75M' },
  ],
  question: 'At an 8.0% cap rate, what is the supportable price?',
  options: [
    {
      label: 'About $14.75M — deduct the $320K reserve to get $1.18M of NOI, then divide by 8.0%.',
      isBest: true,
      explanation:
        '4% × $8.0M = $320K. NOI after reserve = $1.50M − $0.32M = $1.18M. $1.18M ÷ 8.0% = $14.75M. The reserve is a real cash cost the owner must fund to keep the brand flag, so it belongs above the line when you cap.',
    },
    {
      label: '$18.75M — the broker\'s NOI is the headline number and the market cap rate already reflects reserves.',
      isBest: false,
      explanation:
        'Only true if the 8.0% was derived from comps capped on pre-reserve NOI. Hotel comps are conventionally reported after reserve, so applying that rate to pre-reserve NOI overpays by roughly $4M.',
    },
    {
      label: 'About $16.5M — split the difference, since reserves are spent unevenly over time.',
      isBest: false,
      explanation:
        'Splitting the difference has no basis. Reserve is lumpy in timing but certain in aggregate; the PIP cycle eventually consumes it. Averaging understates the burden.',
    },
    {
      label: 'About $13.5M — deduct the reserve and also haircut for the brand\'s franchise fees.',
      isBest: false,
      explanation:
        'Franchise fees are already inside the operating expenses that produced the $1.50M NOI. Deducting them again double-counts.',
    },
  ],
  takeaway:
    'Hotel NOI is only comparable across deals once it is struck on the same reserve basis. Always confirm whether a quoted cap rate is before or after FF&E reserve before you compare it to anything.',
  tips: [
    'Hotel cap rates are conventionally quoted on NOI after FF&E reserve.',
    'Check the brand standard for the reserve percentage, which often steps up over the term.',
    'A 4% reserve on an 18% NOI margin hotel is over 20% of NOI.',
  ],
};
