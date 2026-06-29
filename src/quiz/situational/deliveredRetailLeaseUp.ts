import type { SituationalCase } from '../../types/situational';

export const deliveredRetailLeaseUp: SituationalCase = {
  id: 'delivered-retail-lease-up',
  title: 'When does the newly delivered retail center stabilize?',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['acquisitions', 'development'],
  assetClass: 'retail',
  scenario:
    'A 120,000 SF grocery-anchored neighborhood center just delivered. The 60,000 SF grocery anchor opened at delivery. The 40,000 SF of inline small-shop space is signing leases on a 12-month lag from anchor opening — lenders typically require the anchor to be open before funding inline TIs. The remaining 20,000 SF is vacant pad sites; no letters of intent exist and submarket demand for pads is soft at 8% pad vacancy.',
  data: [
    { label: 'Anchor (grocery)', value: '60,000 SF — open at delivery' },
    { label: 'Inline space', value: '40,000 SF — signing, 12-mo lag from anchor open' },
    { label: 'Pad sites', value: '20,000 SF — no LOIs, soft demand' },
    { label: 'Total GLA', value: '120,000 SF' },
    { label: 'Submarket pad vacancy', value: '8%' },
  ],
  question: 'When does this center reach stabilized occupancy for permanent financing purposes?',
  options: [
    {
      label: 'The leasable core (anchor + inline) stabilizes in roughly 12–15 months from delivery. The pads may remain unleased for 18–36 months; most lenders will underwrite the center at ~83% occupancy (100K SF leased ÷ 120K total) and hold a reserve for pad vacancy, rather than waiting for full pad absorption.',
      isBest: true,
      explanation:
        'Permanent lenders look at: (a) is the anchor open and paying rent, and (b) is occupancy above their stabilized threshold (typically 90% of the leasable core, or 85–90% of total GLA). Grocery + inline = 100K SF = 83% of 120K total GLA. Lenders applying a GLA threshold will require a pad stabilization reserve or accept a lower initial loan amount. 12 months from anchor open for inline to be lease-signed, plus 3–6 months for rent commencement = approximately 15–18 months is when permanent financing becomes achievable, with pads handled via reserve or carve-out.',
    },
    {
      label: 'The center stabilizes when the anchor opens — the grocery is the economic driver.',
      isBest: false,
      explanation:
        'Lenders won\'t close permanent financing on a 50% leased center. "Anchor open" is a milestone but not a stabilization event. Inline tenants and their leases are required for the NOI to support permanent debt service. Anchor open = precondition for inline lease-up, not the finish line.',
    },
    {
      label: 'The center can\'t be called stable until all 120,000 SF is leased and open, including the pads.',
      isBest: false,
      explanation:
        'Overly conservative and not market practice. Pads may remain unleased for years; most lenders handle this with a reserve rather than withholding stabilization certification. Requiring 100% occupancy is not industry standard for retail center financing.',
    },
    {
      label: 'The 12-month inline lag is overly conservative — once the anchor opens, inline tenants will sign and open within 3 months.',
      isBest: false,
      explanation:
        'Unrealistic. Inline tenants need to sign, finance their fit-out, obtain permits, and open. The full cycle from LOI to rent commencement is typically 6–12 months even after lease execution. And lenders won\'t fund TIs until the anchor is open. The 12-month lag is standard and defensible.',
    },
  ],
  takeaway:
    'Retail stabilization is not binary — separate the anchor, inline, and pad components and model each independently. Permanent lenders apply an occupancy threshold to the leasable core and handle residual vacancy with reserves. Pads are the tail risk: they may not lease up for years, which is manageable as long as the underwriting is transparent about it.',
  tips: [
    'Grocery-anchored stabilization = anchor open + inline rent commencement; pads are a bonus.',
    'Permanent financing threshold: ~90% of anchor + inline at rent-commencement, not just lease-signed.',
    'Build 12–18 months of lease-up carry cost into the development budget from delivery date.',
  ],
};
