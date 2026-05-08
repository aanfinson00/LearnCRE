import type { SituationalCase } from '../../types/situational';

export const anchorLeaseUpTiming: SituationalCase = {
  id: 'anchor-lease-up-timing',
  title: "When does economic occupancy differ from physical?",
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You're acquiring a 120,000 SF neighborhood retail center at 72% physically occupied. Since going under contract, you've signed a 25,000 SF grocery anchor to fill the largest vacancy. The anchor lease has a 10-month build-out period before rent commencement. During build-out, the tenant pays no base rent but the landlord is on the hook for $500K in TI reimbursements. The remaining 8,000 SF of vacancy has three prospective tenants waiting on the anchor to open.",
  data: [
    { label: 'Total GLA', value: '120,000 SF' },
    { label: 'Physical occupancy (today)', value: '72%' },
    { label: 'Anchor space signed', value: '25,000 SF' },
    { label: 'Build-out period', value: '10 months' },
    { label: 'TI reimbursement due', value: '$500,000' },
    { label: 'Remaining vacancy', value: '8,000 SF' },
  ],
  question:
    "How should you present occupancy and NOI in your underwriting for the first 12 months post-close?",
  options: [
    {
      label:
        "Show physical occupancy improving to 97% on day one (signed leases), but model economic occupancy at 72% for months 1–10, stepping up to 93%+ when anchor rent commences. Year-1 NOI is based on economic occupancy, not signed occupancy.",
      isBest: true,
      explanation:
        "Physical occupancy (signed leases ÷ total GLA) reaches ~93% once the anchor is signed. But economic occupancy — what actually generates rent — stays at 72% for 10 months. Year-1 NOI must reflect only tenants paying rent. The anchor's $500K TI is also a cash outflow hitting year 1. Presenting 93% occupancy without this distinction overstates near-term cash flow and creates a gap the lender or IC will catch.",
    },
    {
      label:
        "Report 93% occupancy immediately — the lease is signed and the anchor is committed.",
      isBest: false,
      explanation:
        "Signed ≠ rent-paying. Until rent commencement, the tenant contributes $0 to NOI. Presenting 93% occupancy in the underwriting without qualification implies income that doesn't exist for 10 months. This misrepresentation is a common source of first-year NOI misses in retail acquisitions.",
    },
    {
      label:
        "Ignore the anchor lease in year-1 underwriting since it hasn't opened yet; model 72% occupancy flat for year 1.",
      isBest: false,
      explanation:
        "Too conservative in the other direction. Ignoring a signed lease entirely understates the asset's trajectory and the value of the signed tenancy. The right answer is to model economic occupancy: 72% for months 1–10, stepping to 93%+ as rent commences. The signed lease is a real asset even if it produces no rent immediately.",
    },
    {
      label:
        "Use 80% occupancy as a blended assumption — average the opening and closing occupancy for year 1.",
      isBest: false,
      explanation:
        "Blending is arithmetically lazy and misleading. Month-by-month cash flow modeling is better — especially when a single large tenant starts paying rent partway through the year. Blending also doesn't capture the $500K TI outflow in month 3 or the step-up in inline tenant signings that typically follows an anchor opening.",
    },
  ],
  takeaway:
    "Physical occupancy (signed) and economic occupancy (rent-paying) diverge whenever new leases have build-out or free-rent periods. Always model NOI from economic occupancy. Signed leases are a positive indicator of trajectory, not of current income.",
  tips: [
    "Year-1 NOI = rent actually commencing in that period; do not include free-rent or build-out months.",
    "Anchor tenants often catalyze inline leasing after opening — model this as a lagged effect, not simultaneous.",
    "TI reimbursements are cash outflows, even if they hit before rent commencement. Show them in the waterfall.",
  ],
};
