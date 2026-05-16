import type { SituationalCase } from '../../types/situational';

export const absorptionRetailLeaseUp: SituationalCase = {
  id: 'absorption-retail-lease-up',
  title: 'New power center — how long to stabilization?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'retail',
  scenario:
    'A developer is delivering a 320,000 SF power center in a growing suburban submarket. The anchor (80,000 SF grocery) is signed. Junior anchors and shop space (240,000 SF combined) are 30% pre-leased at delivery. The submarket has been absorbing roughly 15,000 SF of retail per quarter, and there are no other significant retail deliveries expected in the next 18 months. The developer\'s lender requires 85% occupancy before converting the construction loan to permanent debt.',
  data: [
    { label: 'Total GLA', value: '320,000 SF' },
    { label: 'Anchor (grocery)', value: '80,000 SF — signed' },
    { label: 'Junior anchors + shops', value: '240,000 SF — 30% pre-leased (72,000 SF)' },
    { label: 'Total occupied at delivery', value: '152,000 SF (47.5%)' },
    { label: 'Submarket absorption', value: '15,000 SF/quarter' },
    { label: 'Competing deliveries', value: 'None expected in 18 months' },
    { label: 'Permanent loan trigger', value: '85% occupancy' },
  ],
  question: 'How long until the center reaches the 85% threshold for loan conversion?',
  options: [
    {
      label:
        'The center needs to go from 47.5% to 85% occupancy, meaning 120,000 SF of additional leasing. At 15,000 SF/quarter submarket absorption with no competing supply, a reasonable underwrite is ~8 quarters (2 years) — but retail anchor pull typically accelerates shop leasing, so 6-7 quarters is plausible once the grocery opens.',
      isBest: true,
      explanation:
        'Math: 85% of 320,000 SF = 272,000 SF. Current occupied: 152,000 SF. Gap: 120,000 SF. Submarket absorption: 15,000 SF/quarter. Simple division: 8 quarters. But this treats the center as absorbing at the same pace as ambient submarket demand — which is conservative. Grocery-anchored centers draw traffic that accelerates shop leasing; realistic pace might be 1.5–2× submarket absorption once open. Range: 6–8 quarters. The construction loan extension must cover this.',
    },
    {
      label:
        'The anchor is signed, so the center is effectively pre-stabilized — the rest of the space will fill quickly once the grocery opens.',
      isBest: false,
      explanation:
        'A grocery anchor does drive traffic and accelerates shop leasing, but 240,000 SF of remaining space in a market absorbing 15,000 SF/quarter cannot fill "quickly." Even at 2× submarket pace, 168,000 SF of unleased shop space takes years. The anchor matters, but it does not short-circuit basic absorption math.',
    },
    {
      label:
        'Use the current 30% pre-lease rate as the run-rate — at that velocity, remaining space fills in 14 months.',
      isBest: false,
      explanation:
        'Pre-leasing rate during construction is not comparable to post-delivery leasing pace. Pre-leasing reflects early commitments from anchor tenants and national chains. Shop tenants typically wait for the center to open and validate traffic before signing. Projecting a constant 30% pre-lease velocity is an input error.',
    },
    {
      label:
        'The developer should pre-lease more aggressively before delivery — without 85% at delivery, the construction loan is in default.',
      isBest: false,
      explanation:
        '85% is a permanent loan conversion trigger, not a delivery requirement. Construction loans have interest-only periods and commonly allow post-delivery lease-up windows (12–24 months) before requiring refinance. The lender\'s 85% threshold governs loan conversion, not project delivery. The question is whether the lease-up timeline fits within the construction loan\'s extended maturity.',
    },
  ],
  takeaway:
    'Retail stabilization timing follows the same absorption framework as multifamily and office: (target SF − current SF) ÷ realistic absorption pace. The inputs that differ for retail are (1) anchor pull — anchors generate co-tenancy demand that can double ambient submarket absorption for well-located product, (2) competing supply — no deliveries in 18 months is favorable, and (3) loan conversion threshold — the lender\'s occupancy trigger sets the deadline, not an arbitrary stabilization target.',
  tips: [
    'Retail absorption pace ≠ submarket absorption if an anchor drives co-tenancy demand.',
    'Junior anchor pre-leasing is the key leading indicator — national tenants signal the center is viable.',
    'Construction loan maturities and extension options set the real clock, not the developer\'s proforma.',
    '85% occupancy ≈ stabilized for most retail — below that, permanent lenders require reserves or holdbacks.',
  ],
};
