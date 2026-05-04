import type { SituationalCase } from '../../types/situational';

export const lenderDrawMechanics: SituationalCase = {
  id: 'lender-draw-mechanics',
  title: 'Construction loan draw — what does the bank actually require?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['development', 'mortgageUw'],
  scenario:
    'You\'re submitting a $4M construction draw for the next 30 days of work on a ground-up MF project. The lender has 5 business days to approve. The GC says they need the funds wired by the 28th to pay subs on time.',
  data: [
    { label: 'Draw amount', value: '$4M' },
    { label: 'Lender approval window', value: '5 business days' },
    { label: 'Sub payment deadline', value: '28th' },
    { label: 'Draw frequency (per loan docs)', value: 'Monthly' },
  ],
  question: 'What does a typical construction-loan draw package require?',
  options: [
    {
      label:
        'Standard package: G702/G703 (AIA pay app showing % complete by line item), GC + sub lien waivers (conditional for the requested period, unconditional for the prior period), updated cost-to-complete, third-party inspector\'s report verifying work in place, title bring-down endorsement. Banks often add: sworn statements, evidence of insurance, signed lien-waiver releases.',
      isBest: true,
      explanation:
        'Construction draws are documentation-heavy because the bank is funding work claimed but not yet paid. The standard package: (1) AIA G702/G703 — itemized pay-app showing % complete per cost code, (2) lien waivers — protect the bank against mechanic\'s liens (subs whose work was funded but not paid can lien the property; waivers prove they\'ve been paid), (3) inspector\'s report — independent verification that work is actually in place at claimed %, (4) cost-to-complete update — confirms no overruns are hiding, (5) title bring-down — confirms no new liens since prior draw. Skipping any one of these is a deal-stopper for most lenders.',
    },
    {
      label: 'A simple invoice from the GC showing the $4M owed; lender wires within 24 hrs once approved.',
      isBest: false,
      explanation:
        'Hugely under-stated. The bank isn\'t buying a service from a vendor; they\'re funding interim construction at risk. They need verification that the work has been done, that subcontractors won\'t lien the property, and that the project is on track for completion. A bare invoice doesn\'t come close to satisfying that.',
    },
    {
      label: 'GC certification of % complete + photos. The bank trusts the GC since they\'re bonded.',
      isBest: false,
      explanation:
        'GC bonding protects the borrower (and lender) from GC default — it\'s not a substitute for draw verification. Banks always require independent inspection (a third-party inspector or the bank\'s own construction loan officer) plus formal AIA paperwork. Photos and self-certification aren\'t enough.',
    },
    {
      label: 'A written request from the borrower; lender will release funds based on the loan agreement schedule without further docs.',
      isBest: false,
      explanation:
        'Misreads how construction loans work. Construction loans don\'t have a fixed draw schedule — they release funds based on completed work, verified per draw. Permanent loans (after CO) have fixed payment schedules; construction loans are draw-by-draw, work-verified.',
    },
  ],
  takeaway:
    'Construction draws = documented evidence of work in place + protected lien position + verified cost-to-complete. The five-piece package (AIA pay app, lien waivers, inspector report, cost-to-complete, title bring-down) is universal across institutional construction lenders. Plan 5-10 business days from package submission to wire; build that into the GC payment schedule.',
  tips: [
    'AIA G702 = summary; G703 = line-item detail. Both are typically required.',
    'Conditional lien waivers cover the requested-but-not-yet-paid period; unconditional cover prior periods.',
    'Title bring-down catches any new liens or encumbrances since the last draw.',
  ],
};
