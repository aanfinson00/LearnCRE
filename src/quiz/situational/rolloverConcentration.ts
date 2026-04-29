import type { SituationalCase } from '../../types/situational';

export const rolloverConcentration: SituationalCase = {
  id: 'rollover-concentration',
  title: 'A single tenant rolling 40% of NRSF — hold or sell?',
  category: 'risk',
  difficulty: 'intermediate',
  roles: ['assetManagement'],
  assetClass: 'office',
  scenario:
    'You own a 250,000 SF Class-A office building. The largest tenant (100,000 SF, 40% of NRSF) has a lease expiring in 14 months. They\'ve given mixed signals on renewal but historically have always renewed. The submarket vacancy is at a 10-year high (15%). You\'re deciding whether to sell *now* (with the lease in place) or hold and risk the rollover.',
  data: [
    { label: 'Building size', value: '250,000 SF' },
    { label: 'Anchor tenant', value: '100,000 SF (40%)' },
    { label: 'Lease expires', value: '14 months' },
    { label: 'Submarket vacancy', value: '15% (10-yr high)' },
    { label: 'Renewal probability', value: 'Mixed signals; historical ~80%' },
  ],
  question: 'How should the rollover concentration shape your hold/sell decision?',
  options: [
    {
      label:
        'Sell now — the lease in place is worth more to a buyer than the unknown 14 months from now. Selling at peak certainty captures the full value of the existing income; selling 6 months pre-rollover with no renewal commitment puts you at the buyer\'s mercy.',
      isBest: true,
      explanation:
        'Buyers price uncertainty harshly. A building with 40% of NRSF rolling in 14 months sells at a meaningful discount to one with 5+ years of remaining term. Even with an "80% historical" renewal track record, a 20% vacate probability times 40% of NRSF in a 15%-vacancy market is a real downside scenario the buyer underwrites *to*. The asset is at peak salability today.',
    },
    {
      label:
        'Hold — the tenant always renews; just wait it out and refinance when they sign the renewal.',
      isBest: false,
      explanation:
        '"Always renews" is comforting but not contractual. In a 15%-vacancy submarket, even if they renew they\'ll demand TI / free rent / a lower face rent. The asset value declines either way: harder math if they vacate, softer math if they renegotiate. Holding through the unknown means accepting both downside scenarios; selling now monetizes the current certainty.',
    },
    {
      label: 'Pursue a renewal-and-extend now, then sell with a longer WALT in hand.',
      isBest: false,
      explanation:
        'Theoretically ideal but creates a forced negotiation. Approaching a tenant for an early renewal in a soft market signals that you *need* the renewal — they\'ll demand below-market terms. The renewal you get won\'t be on landlord-friendly terms, and you\'ll have given up the optionality of selling now.',
    },
    {
      label: 'Recapitalize via a JV partner now — keep upside if they renew, share downside if they don\'t.',
      isBest: false,
      explanation:
        'Possible structurally but doesn\'t solve the core problem (selling at uncertainty). Recap markets price the same risk the sale market does; you\'ll get a comparable haircut. And finding a partner willing to share concentrated rollover risk in a soft submarket is hard. Sale is cleaner.',
    },
  ],
  takeaway:
    'Concentration + uncertainty is a sell signal. The peak value of an asset is the moment its income is most certain — usually with a long lease in place and well before any major rollover. Holding through a single-tenant rollover in a soft submarket means accepting either renegotiation or downtime; both compress value vs selling now with the tenant in place.',
  tips: [
    'Single-tenant > 30% NRSF + soft submarket + lease expiring within 18 mos = sell signal.',
    'Buyers underwrite to the rollover scenario, not the historical renewal pattern.',
    'Approaching a tenant for early renewal in a soft market = you negotiate weak.',
  ],
};
