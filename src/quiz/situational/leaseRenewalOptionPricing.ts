import type { SituationalCase } from '../../types/situational';

export const leaseRenewalOptionPricing: SituationalCase = {
  id: 'lease-renewal-option-pricing',
  title: 'How does a below-market renewal option affect value?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'industrial',
  scenario:
    'You are acquiring a 200,000 SF single-tenant industrial asset. The tenant signed a 10-year NNN lease 7 years ago at $4.50/SF/yr. They hold two 5-year renewal options at $5.50/SF/yr. Current market rents for comparable space in this submarket are $9.00/SF/yr. The lease expires in 3 years. The options give the tenant the right, but not the obligation, to renew.',
  data: [
    { label: 'In-place rent', value: '$4.50/SF/yr (NNN)' },
    { label: 'Lease expiry', value: '3 years' },
    { label: 'Renewal options', value: '2 × 5-yr at $5.50/SF/yr' },
    { label: 'Market rent', value: '$9.00/SF/yr' },
    { label: 'Building size', value: '200,000 SF' },
  ],
  question: 'What is the primary valuation risk created by the below-market renewal options?',
  options: [
    {
      label:
        'The options cap the upside: if the tenant exercises, rents are locked at $5.50/SF for up to 10 more years — 39% below market. A proforma projecting $9.00/SF after lease expiry overpays relative to the near-certain option exercise. Both scenarios — exercise and vacancy — must be modeled explicitly.',
      isBest: true,
      explanation:
        'Rational tenants exercise options that save them money. The benefit here is ($9.00 − $5.50) × 200,000 SF = $700,000/yr — an overwhelming incentive. A buyer who underwrites $9.00/SF in Year 4 without modeling option exercise is building in upside that almost certainly will not materialize. The correct approach: (a) exercise scenario — tenant stays at $5.50 for 10 years (high probability); (b) vacancy scenario — tenant vacates, buyer re-leases at $9.00 after a gap period (low probability). Weight the scenarios by probability and use the weighted value as the bid anchor. The gap between the two scenarios is where the negotiation lives.',
    },
    {
      label:
        'The options don\'t affect value — the tenant might not exercise, and you can\'t price hypothetical scenarios.',
      isBest: false,
      explanation:
        'A $700,000/yr economic incentive to exercise makes option exercise near-certain. "They might not exercise" is not a valid underwriting argument when the financial incentive is this large. Buyers who ignore option exercise on deeply in-the-money options systematically overpay for the mark-to-market they will never collect.',
    },
    {
      label:
        'The options are a positive for the buyer — they guarantee rent continuity without re-leasing risk.',
      isBest: false,
      explanation:
        'Guaranteed continuity at $5.50 vs market $9.00 is not a net positive from a value perspective. The vacancy risk benefit is real but dwarfed by 10 years of below-market rents. Options that lock in $3.50/SF below market on a 200,000 SF building cost $700,000/yr. That is a liability, not a feature, unless the buyer underwrites at option rent.',
    },
    {
      label:
        'The primary risk is the 3-year lease expiration — focus on that, not the options.',
      isBest: false,
      explanation:
        'The 3-year expiration and the options are the same risk event: at expiration, the tenant exercises at $5.50 (likely) or vacates (less likely). Without modeling the option scenario, the expiration analysis is incomplete. The options define the range of outcomes at expiration — they cannot be analyzed in isolation.',
    },
  ],
  takeaway:
    'Below-market renewal options are hidden liabilities. When option rent is significantly below current market, rational tenants will exercise — and each exercise year locks in a rent discount relative to an unencumbered lease. Always model both the option-exercise and vacancy scenarios, assign probabilities, and use the weighted value as your bid anchor. An asset with a deeply in-the-money below-market option is not a mark-to-market story; it is an encumbered-rent story.',
  tips: [
    'If option rent is 20%+ below market, treat exercise probability as high — model it explicitly.',
    'Model both scenarios; weight by probability; bid on the weighted value.',
    'Below-market options suppress NOI AND compress terminal value — the impact compounds.',
  ],
};
