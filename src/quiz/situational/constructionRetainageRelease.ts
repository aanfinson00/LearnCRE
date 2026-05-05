import type { SituationalCase } from '../../types/situational';

export const constructionRetainageRelease: SituationalCase = {
  id: 'construction-retainage-release-trigger',
  title: 'Retainage release — when does the contractor get paid?',
  category: 'deal-process',
  difficulty: 'advanced',
  roles: ['development', 'mortgageUw'],
  documentExcerpt: {
    docType: 'construction',
    label: 'Article 9 — Retainage',
    text: `(a) Hold-Back. Owner shall retain ten percent (10%) from each
    progress payment to Contractor (the "Retainage").

(b) Step-Down. Upon achievement of fifty percent (50%) Substantial
    Completion of the Work (as certified by the Architect), the
    Retainage held against future progress payments shall be reduced
    to five percent (5%); previously held Retainage shall not be
    released or reduced at this milestone.

(c) Release at Substantial Completion. Upon Substantial Completion
    of the entire Work, Owner shall release fifty percent (50%) of
    the cumulative Retainage to Contractor, less any amounts
    necessary to cover incomplete or defective Work as identified on
    the Punch List.

(d) Final Release. The remaining Retainage shall be released upon:
    (i) issuance of the Final Certificate of Occupancy; (ii) delivery
    of all warranties, lien releases, and as-built drawings;
    (iii) completion of the Punch List; and (iv) the lapse of the
    statutory mechanic\'s lien filing period.`,
  },
  scenario:
    'Your $50M project (40M hard costs + 10M soft) just achieved Substantial Completion. Cumulative hard-cost draws to date: $40M. Retainage of 10% held against the first $20M of draws (pre-50%-milestone), then 5% on the second $20M. Punch list contains $300k of items.',
  question:
    'How much retainage is released to the Contractor at Substantial Completion, and what triggers the rest?',
  options: [
    {
      label:
        'Retainage held: $20M × 10% + $20M × 5% = $2M + $1M = $3M total. At Substantial Completion, 50% releases ($1.5M) less the $300k punch-list reserve = $1.2M paid to Contractor. The remaining $1.5M is released only when (1) Final CO issues, (2) warranties + lien releases delivered, (3) punch list completed, and (4) the mechanic\'s lien period lapses (typically 60-90 days post-completion).',
      isBest: true,
      explanation:
        'Retainage step-down + release math: (1) Pre-50%-milestone: 10% of $20M = $2M. (2) Post-50%-milestone (the *future* draws step down to 5%, prior holds unchanged per (b)): 5% of $20M = $1M. (3) Cumulative held = $3M. (4) At Substantial Completion: 50% release = $1.5M, less punch list of $300k = $1.2M paid. (5) Final 50% release ($1.5M) is gated on Final CO + warranties + punch + lien period lapse — typically 60-90 days. Critical sponsor-side cash management: that final retainage release can be 6+ months post-Substantial-Completion, and Contractor is funding their working capital during that gap. Sponsors with strong relationships sometimes negotiate accelerated final release in exchange for waiver of certain warranty claims.',
    },
    {
      label:
        'All $3M of retainage releases at Substantial Completion. The "final release" language is just procedural confirmation.',
      isBest: false,
      explanation:
        'Section (d) explicitly gates the *remaining* retainage on four separate conditions, all of which take time post-Substantial-Completion. The 50% release at SC is partial; full release requires Final CO, warranties, punch completion, and lien-period lapse.',
    },
    {
      label:
        'The 5% step-down at 50% completion releases the *prior* 10% retainage too, dropping all held retainage to 5% across the board.',
      isBest: false,
      explanation:
        'Section (b) is explicit: the step-down applies to *future* progress payments only; previously held retainage stays at 10%. This is a common drafting nuance — owner-friendly versions explicitly say "previously held retainage is unaffected" so the contractor doesn\'t get a windfall release at the milestone.',
    },
    {
      label:
        'Owner can hold all $3M indefinitely until punch is complete, regardless of Substantial Completion.',
      isBest: false,
      explanation:
        'Most modern contracts (and many state laws) require partial release at Substantial Completion (typically 50%) — owners cannot withhold 100% of retainage post-SC. The language reflects this: 50% release at SC + final 50% on conditions.',
    },
  ],
  takeaway:
    'Retainage release is a multi-tier mechanism: (1) **Step-down at 50% completion** — future-draw retainage drops, prior holds unchanged. (2) **Release at Substantial Completion** — 50% of cumulative retainage releases, less punch-list reserve. (3) **Final release** — gated on Final CO, warranties, punch completion, and statutory lien period (typically 60-90 days). Contractor cash flow exposure is significant: they\'ve fronted 5-10% of cumulative project costs that don\'t fully flow back until ~6 months post-completion. Sponsors should plan for this gap when negotiating GMP terms.',
  tips: [
    'Retainage step-down typically happens at 50% Substantial Completion. Read whether prior holds are released or just *future* holds step down.',
    'Substantial Completion ≠ Final Completion. Punch list closes the gap; SC happens when the project can be occupied/used.',
    'Final retainage is gated on the *statutory mechanic\'s lien filing period* — varies by state from 30 to 120 days. A full 90-day lien period plus 30-day administrative buffer = 120 days post-Substantial Completion.',
    'Lenders typically require lien-release proofs from all major subs before releasing final retainage. Track this proactively — gathering lien releases is administratively painful but unavoidable.',
  ],
};
