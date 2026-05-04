import type { SituationalCase } from '../../types/situational';

export const tenantImprovementApproval: SituationalCase = {
  id: 'tenant-improvement-approval',
  title: 'TI approval — who needs to sign off, and in what order?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['assetManagement'],
  scenario:
    'A new office tenant signed a 7-year lease at $32/SF with $40/SF in TI allowance. The tenant\'s GC has submitted plans + a $1.05M draw request (the first of three planned during build-out). The lender requires consent on TI draws above a certain threshold; the operating budget allocated $1.4M for TI on this lease.',
  data: [
    { label: 'Lease term', value: '7 years' },
    { label: 'TI allowance', value: '$40/SF' },
    { label: 'First draw request', value: '$1.05M' },
    { label: 'Total approved TI budget', value: '$1.4M (in operating budget)' },
    { label: 'Lender threshold for consent', value: 'Per loan docs' },
  ],
  question: 'What\'s the right approval flow for the $1.05M draw?',
  options: [
    {
      label:
        'Property manager → asset manager → owner/sponsor → (if above lender threshold) lender consent → release. PM verifies the work is consistent with the lease + approved plans. Asset manager checks budget alignment + plan compliance + lien waivers from subs. Owner approves the dollar amount. Lender releases when threshold + their docs require. Each step is gated; skipping any creates a real liability + lien risk.',
      isBest: true,
      explanation:
        'TI approval is a multi-stage gated flow because each party is checking a different concern: PM is on the ground and verifies the work is being done per the approved plans (no scope creep, no "while we\'re here" extras the tenant\'s GC slips in); asset manager checks total budget alignment + lien waivers from subs (so subs can\'t lien the building if not paid); owner approves dollar amount + retains discretion on quality items; lender consents on draws above a contract threshold (typically $250k-500k) because TI dollars come out of operating cash that affects DSCR. Skipping ANY step creates liability — sub liens, budget overruns the owner didn\'t authorize, lender covenant breach.',
    },
    {
      label: 'Owner approves directly; PM and asset manager are just for tracking.',
      isBest: false,
      explanation:
        'Owner approval IS required but it\'s the dollar-amount sign-off, not the whole process. PM verifies the work matches plans (only the on-site team can do this); AM checks budget + lien waivers (only the underwriting team can do this). Owner without those upstream checks is signing blind and creating real legal exposure.',
    },
    {
      label: 'Tenant\'s GC and the property manager handle it directly; the AM only sees the bill.',
      isBest: false,
      explanation:
        'Inverts the responsibility chain. PM doesn\'t have authority to approve owner\'s capital; AM\'s budget controls + lender consent obligations require AM eyes-on. PM-and-GC alone is how landlord-tenant TI disputes start.',
    },
    {
      label: 'Lender approves all TI draws by default; their consent is the gating step.',
      isBest: false,
      explanation:
        'Lender consent is required only above the threshold in the loan docs (typically $250k-500k single-draw, or aggregated annual). Below that threshold, lender doesn\'t need to consent — owner approval is sufficient. Routing every draw through the lender slows leasing velocity and adds friction; route only above-threshold draws.',
    },
  ],
  takeaway:
    'TI approval is a multi-party gated flow: PM verifies the work, AM checks budget + lien waivers, owner approves dollars, lender consents above threshold. Each party catches a different failure mode (scope creep, sub liens, budget overrun, covenant breach). Skipping any step is how landlord-tenant disputes + sub-lien claims start. Document each sign-off in the file.',
  tips: [
    'Sub lien waivers are non-negotiable on TI draws — protect against "tenant didn\'t pay GC, GC didn\'t pay sub, sub liens building."',
    'Lender consent threshold: typically $250k-500k single-draw; check the loan docs.',
    'Track TI draws against the approved budget cumulatively; flag at 80% drawn for re-approval before the final.',
  ],
};
