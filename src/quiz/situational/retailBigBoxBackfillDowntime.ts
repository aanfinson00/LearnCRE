import type { SituationalCase } from '../../types/situational';

export const retailBigBoxBackfillDowntime: SituationalCase = {
  id: 'retail-big-box-backfill-downtime',
  title: 'How long will the vacant box sit?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'retail',
  scenario:
    'A grocery-anchored center is 94% leased, but the former 120,000 SF junior anchor box went dark. The submarket has 25 vacant boxes over 50,000 SF, and brokers report only three of that size leased per year. The seller\'s pro forma assumes the box re-leases in 9 months.',
  data: [
    { label: 'Center occupancy', value: '94%' },
    { label: 'Vacant box size', value: '120,000 SF' },
    { label: 'Competing vacant boxes (>50k SF)', value: '25' },
    { label: 'Box leases per year (submarket)', value: '~3' },
    { label: 'Seller downtime assumption', value: '9 months' },
  ],
  question: 'What downtime and strategy should you underwrite for the box?',
  options: [
    {
      label: '24+ months of downtime plus capital to demise it into smaller junior boxes or shops — box-specific absorption is far slower than the center\'s 94% occupancy suggests.',
      isBest: true,
      explanation:
        '25 vacant boxes ÷ 3 leases/year ≈ 8 years of supply. Your box is competing for roughly a 12% share of annual demand, so a 9-month re-lease is unlikely unless the space is repositioned. Demising into 20–40k SF units broadens the tenant pool, which requires capex, TI, and a longer lease-up that belong in the base case.',
    },
    {
      label: 'Accept the 9-month assumption — the center is 94% leased, which shows tenant demand.',
      isBest: false,
      explanation:
        'Center-level occupancy is dominated by small shop space. Box absorption is a different submarket with its own supply glut.',
    },
    {
      label: 'Underwrite 9 months but add a 5% rent haircut.',
      isBest: false,
      explanation:
        'A rent haircut doesn\'t fix a time problem. With roughly eight years of box supply, downtime, not rent, is the main variable.',
    },
    {
      label: 'Assume the box never re-leases and write the income to zero in perpetuity.',
      isBest: false,
      explanation:
        'Too punitive. Boxes do re-lease or get repurposed; the right answer is a longer, capital-funded downtime assumption, not permanent vacancy.',
    },
  ],
  takeaway:
    'Absorb by space type, not by property or center. Large-format vacancy clears on its own, much slower timetable, and the realistic path is often demising or repurposing at real cost.',
  tips: [
    'Segment absorption by size bucket before borrowing a center-wide occupancy.',
    'Months of supply = vacant boxes ÷ annual leases.',
    'Price the capex to demise as part of the base case.',
  ],
};
