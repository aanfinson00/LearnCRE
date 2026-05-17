import type { SituationalCase } from '../../types/situational';

export const saleLeasebackCompDistortion: SituationalCase = {
  id: 'sale-leaseback-comp-distortion',
  title: 'The credit-tenant NNN sale: same comp or different product?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'retail',
  scenario:
    'You are pricing a multi-tenant retail strip center and targeting a 6.5% going-in cap. The broker provides three comps. Two are multi-tenant strip centers at 6.25–6.75%. The third is a single-tenant pad leased to a national credit tenant on a brand-new 20-year NNN lease — it traded at 4.8% six months ago in the same trade area. The broker says "all three support sub-6.5% pricing."',
  data: [
    {
      label: 'Subject',
      value: 'Multi-tenant strip center, avg remaining lease term 3–5 yrs, mixed credit tenants',
    },
    { label: 'Comp 1', value: 'Multi-tenant strip, same trade area, 6 mos ago — 6.25% cap' },
    { label: 'Comp 2', value: 'Multi-tenant strip, same trade area, 8 mos ago — 6.75% cap' },
    {
      label: 'Comp 3',
      value: 'Single-tenant NNN pad, national credit, 20-yr lease, 6 mos ago — 4.8% cap',
    },
    { label: 'Broker argument', value: 'All 3 comps support pricing tighter than 6.5%' },
  ],
  question: 'How should you treat Comp 3 in your analysis?',
  options: [
    {
      label: 'Discard Comp 3 entirely. A 20-year NNN credit-tenant sale is a structurally different product — different buyer pool, different risk profile, different pricing logic. The 150+ bps cap gap vs. the strip center comps reflects the market correctly pricing two different asset types.',
      isBest: true,
      explanation:
        'Single-tenant NNN credit leases to investment-grade tenants trade like fixed-income instruments. The buyer is a bond-like capital source pricing credit risk, not real estate operating risk. A multi-tenant strip center with 3–5 year leases and mixed credit has rollover risk, re-tenanting cost, and vacancy exposure that the NNN pad does not. These are different products with different buyer pools. The 170 bps cap gap between 4.8% (credit NNN) and 6.5% (multi-tenant strip) is the market pricing that difference — it is not a premium/discount you can bridge with an adjustment.',
    },
    {
      label: 'Apply a +150 bps adjustment to Comp 3 to normalize for multi-tenant risk, then include it.',
      isBest: false,
      explanation:
        'The adjustment is directionally correct but not defensible. "150 bps for multi-tenant risk" is an estimate, not a calculable spread. More importantly, the buyer pools do not overlap: credit-tenant NNN buyers are bond-like funds that would not bid on a multi-tenant strip, and vice versa. You cannot bridge between buyer pools with a spreadsheet entry — the 4.8% cap was set in a separate market segment.',
    },
    {
      label: 'Use Comp 3 as the tight end of the pricing range to show there is demand at 4.8%.',
      isBest: false,
      explanation:
        'The demand at 4.8% is for a fundamentally different product that your subject cannot replicate. Presenting this as the "tight end" implies the seller could reach 4.8% under favorable circumstances — no buyer of your multi-tenant strip will pay a 4.8% cap. Using it as a range anchor misleads the IC and can lead to an over-bid.',
    },
    {
      label: 'Average all three comps — broader sample size is always better for pricing accuracy.',
      isBest: false,
      explanation:
        'Sample size is a virtue only when the samples are comparable. Averaging 4.8%, 6.25%, and 6.75% gives 5.93% — 57 bps tighter than the relevant multi-tenant evidence. On a $12M deal, 57 bps of cap compression is ~$680k of artificial pricing support. This is the exact outcome the broker is engineering by including Comp 3.',
    },
  ],
  takeaway:
    'Before using a comp, ask: is this the same product to the same buyer pool? Single-tenant NNN credit leases and multi-tenant strip centers are different products with different buyers and fundamentally different pricing logic. The cap spread between them (often 150–250 bps) is not an adjustment — it is the market pricing two separate risk profiles.',
  tips: [
    'NNN credit-tenant caps can be 150–300 bps tighter than multi-tenant retail of similar vintage and location.',
    'Buyer pool test: would the buyer of Comp 3 bid on your subject? If not, the comp is from a different market.',
    'When you discard a comp, document the reason. "Different product type / buyer pool" is a defensible answer.',
  ],
};
