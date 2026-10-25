import type { SituationalCase } from '../../types/situational';

export const multifamilyConcessionBoughtAbsorption: SituationalCase = {
  id: 'multifamily-concession-bought-absorption',
  title: 'Is strong absorption real or bought?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    'A multifamily submarket posted its best leasing quarter in three years: 1,200 units absorbed against 900 delivered. But concessions have crept up from half a month free to a month and a half free on 12-month leases, while asking rents are flat at $2,000 per month. A broker is using the absorption headline to justify 4% rent growth in your underwriting.',
  data: [
    { label: 'Quarterly absorption', value: '1,200 units' },
    { label: 'Quarterly deliveries', value: '900 units' },
    { label: 'Concessions (prior)', value: '0.5 months free' },
    { label: 'Concessions (now)', value: '1.5 months free' },
    { label: 'Asking rent', value: '$2,000/mo' },
  ],
  question: 'How should you treat the absorption headline?',
  options: [
    {
      label: 'Underwrite on net effective rent: effective rent fell from ~$1,917 to $1,750 (about −8.7%), so part of the absorption is being bought and rent growth shouldn\'t be assumed.',
      isBest: true,
      explanation:
        'Net effective rent = asking × (12 − free months) ÷ 12. Before: $2,000 × 11.5/12 ≈ $1,917. Now: $2,000 × 10.5/12 = $1,750. Asking rent is flat but price per month of occupancy fell ~8.7%. Absorption above deliveries is a real positive, but you should test whether it persists once concessions burn off.',
    },
    {
      label: 'Accept 4% growth — absorption exceeded deliveries, so demand is outpacing supply.',
      isBest: false,
      explanation:
        'Absorption exceeding deliveries is meaningful only if it isn\'t being purchased with price cuts. Here, effective rents are falling while asking rents look flat.',
    },
    {
      label: 'Ignore concessions — they\'re temporary and don\'t affect rent.',
      isBest: false,
      explanation:
        'Concessions are price. They hit effective rent and, when lenders and buyers underwrite in-place leases, they reduce NOI.',
    },
    {
      label: 'Assume rents fall 12.5% — the new concession load is the whole decline.',
      isBest: false,
      explanation:
        'The 12.5% compares to asking rent ($1,750 vs $2,000), but the market was already giving 0.5 months. The change in effective rent is the relevant move: about −8.7%.',
    },
  ],
  takeaway:
    'Absorption and concessions have to be read together. If leasing speeds up while free rent grows, demand is being bought, so underwrite net effective rent and stress the burn-off of concessions.',
  tips: [
    'Net effective rent = asking × (12 − free months) ÷ 12.',
    'Compare absorption to deliveries and to concession trend.',
    'Ask what happens to absorption when concessions burn off.',
  ],
};
