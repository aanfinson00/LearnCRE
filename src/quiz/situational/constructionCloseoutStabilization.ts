import type { SituationalCase } from '../../types/situational';

export const constructionCloseoutStabilization: SituationalCase = {
  id: 'construction-closeout-stabilization',
  title: 'Construction closeout: punch list delay and interest reserve crunch',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['development', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    "You're the developer on a 180,000 SF Class A office building. Your proforma scheduled rent commencement in month 24 of construction. The GC issued the Certificate of Substantial Completion (CSC) in month 24 as planned, but a 90-item punch list remains. Your anchor tenant (60,000 SF at $35/SF NNN = $2.1M/yr) has a lease clause: if punch list items 'materially interfere with normal business operations,' they may withhold rent for up to 90 days from CSC. The tenant's counsel has flagged 14 items as material (HVAC balancing, lobby finishes, restroom incomplete, two life-safety code items). Your construction loan interest reserve has exactly 2 months of coverage remaining ($840K total at $420K/month). Your construction lender has not yet been notified of the punch list dispute.",
  data: [
    { label: 'Anchor tenant', value: '60,000 SF at $35/SF NNN = $2.1M/yr ($175K/mo)' },
    { label: 'Punch list items total', value: '90 items' },
    { label: "Tenant's flagged 'material' items", value: '14 items (HVAC, lobby, restrooms, life-safety)' },
    { label: 'Rent abatement window', value: 'Up to 90 days from CSC date' },
    { label: 'Interest reserve remaining', value: '$840K (2 months at $420K/mo)' },
    { label: 'Monthly anchor rent (if collecting)', value: '$175K' },
    { label: 'Net monthly cash burn (no anchor rent)', value: '$420K interest − $0 rent = $420K' },
    { label: 'Net monthly cash burn (with anchor rent)', value: '$420K interest − $175K rent = $245K' },
  ],
  question:
    "What's the right priority sequence in the next 30 days, and why does the sequencing matter?",
  options: [
    {
      label:
        "Priority 1: Triage the 14 material items and mobilize the GC to close them within 30 days — specifically the 2 life-safety items (which must be done regardless) and the HVAC/restroom items that most directly affect habitability. Eliminating the materiality claim restarts the rent clock. Priority 2: Immediately notify the construction lender and request a 60-day interest reserve extension — don't wait until month 26 when you're out of reserve. Priority 3: Have legal counsel assess whether the 14 items actually meet the 'material interference' standard in the lease; some may be negotiable. Sequencing matters because the reserve expires before the 90-day abatement window closes — you cannot float both costs without lender cooperation.",
      isBest: true,
      explanation:
        "Right sequencing. The critical constraint is the reserve timeline: 2 months of reserve vs. a potential 3-month abatement window creates a gap. If the rent abatement runs the full 90 days, you face month 3 with no reserve and no anchor rent — a liquidity crisis. The triage priority is correct: resolve items that (a) affect habitability or code compliance first (non-negotiable), then (b) items the tenant can most credibly argue are 'material.' Lender notification is time-sensitive — most construction loans require prompt notice of material events; notifying proactively positions you to request a reserve extension before you're in default. Sending the lender a surprise in month 26 with an empty reserve is far worse than a proactive conversation in month 24.",
    },
    {
      label:
        "Issue a written notice to the tenant that the punch list items are cosmetic and do not constitute 'material interference' — demand rent commencement immediately from CSC date and prepare to enforce the lease.",
      isBest: false,
      explanation:
        "Dangerous without legal review. If 2 of the 14 items are life-safety code violations (as stated), those almost certainly meet the 'material interference' standard — a court won't side with the developer on a lease enforcement action when the building has open code violations. More practically, threatening the anchor tenant before resolving legitimate items poisons the relationship before the building is even stabilized. The aggressive enforcement posture only makes sense after the material items are resolved and the tenant is still refusing to pay; using it as a first move guarantees a dispute.",
    },
    {
      label:
        "Use the $840K reserve to pay a contractor bonus incentive for rapid closeout — offer $100K over GC's contract price to complete all 90 items within 45 days.",
      isBest: false,
      explanation:
        "Using the interest reserve to fund construction incentives is a misappropriation of the reserve facility — most construction loans restrict reserve funds to interest payments. Beyond the loan compliance issue, $840K is your only liquidity buffer; committing $100K of it before notifying the lender removes flexibility precisely when you need it most. The right lever to accelerate closeout is the GC's retainage (typically 5–10% of contract value, withheld at CSC) — that's the existing contractual incentive to close out the punch list.",
    },
    {
      label:
        "Trigger the force majeure clause in the construction loan agreement to pause interest payments while the punch list dispute is resolved.",
      isBest: false,
      explanation:
        "Force majeure in construction loans applies to genuinely unforeseeable external events (natural disaster, government shutdown, supply disruption) — not to a punch list dispute arising from the GC's incomplete work. Attempting to invoke force majeure for this situation would likely be denied by the lender and could constitute a default under the loan agreement (false representation about triggering conditions). It is not a legitimate tool here.",
    },
  ],
  takeaway:
    "Construction closeout is a liquidity race: interest reserve burns regardless of whether rent has started, so punch list disputes that delay rent commencement create a compressing window. Priority sequence: (1) triage material items and resolve life-safety issues first, (2) notify the construction lender proactively and request reserve extension before you need it, (3) have legal counsel assess the lease language. Use the GC's retainage — not the interest reserve — as the incentive lever for rapid closeout.",
  tips: [
    "Retainage is the developer's best closeout tool: 5–10% of GC contract value is withheld at CSC and released upon punch list completion. Use it — that's what it's for.",
    "Most office leases tie rent commencement to 'Substantial Completion' or 'Tenant's Certificate of Occupancy,' not punch list completion. Read the specific lease language before concluding the tenant has a valid abatement claim.",
    "Construction lender notification requirements: most loans require written notice within 5–10 business days of any material event that could affect the collateral or loan repayment. A rent abatement dispute with an anchor tenant qualifies.",
  ],
};
