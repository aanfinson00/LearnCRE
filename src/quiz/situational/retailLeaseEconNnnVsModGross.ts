import type { SituationalCase } from '../../types/situational';

export const retailLeaseEconNnnVsModGross: SituationalCase = {
  id: 'retail-lease-econ-nnn-vs-mod-gross',
  title: 'Retail: NNN vs modified gross — which lease structure puts more NOI in your pocket?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You own a 12,000 SF inline retail strip. A prospective tenant is willing to sign under either of two lease structures for a 5-year term on a 2,000 SF space. Option 1: NNN at $28/SF with tenant paying taxes, insurance, and CAM directly. Option 2: modified gross at $36/SF with landlord paying taxes, insurance, and CAM. You estimate taxes + insurance + CAM for this space at $6.50/SF/yr, and you expect that number to grow 3% per year.",
  data: [
    { label: 'Space size', value: '2,000 SF' },
    { label: 'Option 1 — NNN', value: '$28/SF; tenant pays taxes + insurance + CAM' },
    { label: 'Option 2 — Modified Gross', value: '$36/SF; landlord pays taxes + insurance + CAM' },
    { label: 'Est. taxes + insurance + CAM', value: '$6.50/SF/yr, growing 3%/yr' },
    { label: 'Lease term', value: '5 years' },
  ],
  question: 'Which lease structure produces higher NOI to the landlord, and why does it matter for valuation?',
  options: [
    {
      label:
        'NNN produces higher NOI over the 5-year term. Year 1 net difference: NNN NOI = $28/SF vs. Modified Gross NOI = $36 − $6.50 = $29.50/SF — modified gross is $1.50/SF ahead in Year 1. But the NNN structure insulates you from expense growth: by Year 5, modified gross NOI erodes to $36 − $7.53 = $28.47/SF while NNN stays at $28/SF flat. Over 5 years, modified gross NOI per SF is $29.50, $29.21, $28.91, $28.61, $28.47 — averaging $28.94 — still slightly above NNN $28 flat. Modified gross wins total NOI dollars, but NNN has no expense risk and no cap on recovery upside.',
      isBest: true,
      explanation:
        "Year-by-year modified gross NOI (assuming flat base rent): $36 − $6.50 = $29.50 (Yr1), − $6.70 = $29.30 (Yr2), − $6.90 = $29.10 (Yr3), − $7.10 = $28.90 (Yr4), − $7.31 = $28.69 (Yr5). Average: $29.10/SF vs NNN $28.00 flat. Modified gross produces ~$1.10/SF more NOI/yr on average — $2,200/yr on a 2,000 SF space, or $11,000 over 5 years. BUT: the NNN structure protects the landlord from expense growth above 3% (if utilities spike, insurance rises, or special assessments hit, the tenant absorbs it). For a landlord who owns a larger portfolio, NNN also reduces management complexity since tenants pay direct.",
    },
    {
      label:
        'Modified gross is always better for the tenant and NNN is always better for the landlord — pick NNN.',
      isBest: false,
      explanation:
        "Not automatically true — it depends on the spread between gross rent and net rent vs. actual expenses. In this case the gross rent premium ($36 vs $28 = $8/SF) exceeds estimated expenses ($6.50/SF), so the landlord actually nets more from the modified gross structure in early years. The rule of thumb 'NNN is always better for landlords' ignores the rent-setting process: tenants underwriting full NNN exposure often negotiate the base rent down to compensate. The right comparison requires modeling both structures at the actual rent and expense levels.",
    },
    {
      label:
        'They produce identical NOI — the $8/SF rent spread exactly offsets the $6.50/SF expense assumption with a 3% growth escalator.',
      isBest: false,
      explanation:
        "The spread ($8/SF) does not equal expenses ($6.50/SF) — it\'s $1.50/SF wider in Year 1. And expenses grow 3%/yr while the base rent is fixed; by Year 5, expenses are $7.31/SF and the spread has compressed to $0.69/SF net advantage for modified gross. If expenses grew faster (say 5%/yr), they would cross the NNN NOI line by Year 7. The structures are not identical.",
    },
    {
      label:
        'Cap the NOI from both structures at a 7% cap rate to see which produces higher value — whichever wins on value, choose that structure.',
      isBest: false,
      explanation:
        "Applying a cap rate is the right direction but you haven't computed the NOI first. The question is which structure produces more NOI; cap-rate valuation is downstream of that answer. Also, lenders and buyers generally cap NNN cash flows at tighter cap rates (more predictable, less expense risk) while modified gross leases may get a slightly wider cap due to expense risk.",
    },
  ],
  takeaway:
    "Comparing lease structures requires modeling NOI net of expenses under each structure at the actual rent and expense assumptions — 'NNN is always better' or 'gross rents are always higher' are shortcuts that fail when rents are properly adjusted. In this case modified gross produces slightly more NOI in early years but erodes as expenses grow; NNN provides expense-growth insulation and simpler management. For a long-term hold, the NNN floor value is more predictable even if the gross structure earns more in dollar terms over the first 5 years.",
  tips: [
    'Modified gross NOI = gross rent − landlord-paid expenses. Model the expense growth rate, not just Year 1.',
    'NNN gives landlords infinite upside on recovery if expenses spike; it also gives tenants infinite risk — expect tenants to negotiate hard on CAM caps.',
    "For valuation purposes, institutional buyers cap NNN leases tighter than gross because the cash flow is more predictable — a NNN lease at $28/SF may be valued the same as a gross lease at $30/SF.",
  ],
};
