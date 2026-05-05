import type { SituationalCase } from '../../types/situational';

export const leaseCamReconciliation: SituationalCase = {
  id: 'lease-cam-reconciliation',
  title: 'CAM reconciliation — what does the year-end true-up actually do?',
  category: 'document-literacy',
  difficulty: 'intermediate',
  roles: ['assetManagement'],
  documentExcerpt: {
    docType: 'lease',
    label: 'Article 7 — CAM Reconciliation',
    text: `7.1 Estimated Monthly Payments. Tenant shall pay, in advance and
    along with each monthly Base Rent payment, an estimate of
    Tenant\'s share of Common Area Maintenance ("CAM") for the
    upcoming month, as reasonably determined by Landlord based on
    the prior calendar year\'s actuals plus a reasonable estimate of
    increases.

7.2 Annual Reconciliation. Within ninety (90) days following the
    end of each calendar year, Landlord shall deliver to Tenant a
    statement (the "CAM Statement") setting forth: (i) Total CAM
    Expenses for such calendar year; (ii) Tenant\'s Pro Rata Share;
    (iii) the amounts paid by Tenant during such year on account of
    CAM; (iv) any amount due from Tenant or to Tenant.

7.3 Payment of Reconciliation. If Tenant\'s actual share exceeds
    Tenant\'s estimated payments, Tenant shall pay the difference
    within thirty (30) days of receipt of the CAM Statement. If
    Tenant\'s estimated payments exceed Tenant\'s actual share,
    Landlord shall credit the overpayment against the next month\'s
    Base Rent.

7.4 Subsequent Adjustments. Landlord may, but shall not be required
    to, make adjustments to Tenant\'s estimated monthly CAM payments
    during the calendar year if circumstances warrant.

7.5 Limitation. Nothing in this Article 7 shall obligate Landlord
    to deliver a CAM Statement, or any portion thereof, more than
    twelve (12) months after the end of the applicable calendar year;
    any claim for additional CAM not so delivered shall be waived.`,
  },
  scenario:
    'You\'re a tenant on a NNN lease. You paid $250/month CAM estimates throughout 2024 ($3,000 total). The 2024 CAM Statement arrived on April 15, 2025 (~3.5 months after year-end), showing actual annual CAM of $4,200 — so $1,200 due. Then in November 2025, the landlord sends a "Supplemental CAM Reconciliation" claiming $800 of additional 2024 expenses they "missed" in the original statement. You challenge.',
  question:
    'Under the lease language, what\'s your strongest argument and likely outcome?',
  options: [
    {
      label:
        'Section 7.5 limits Landlord\'s ability to deliver "any portion" of the CAM Statement more than 12 months after year-end. The original statement was timely (April 2025, well within 12 months). The November 2025 supplemental, however, claims additional CAM for 2024 — and 2024 ended December 31. November 2025 is 11 months after year-end, so just inside the 12-month window. Your strongest argument is *good faith*: Landlord delivered a "CAM Statement" in April purporting to be complete and is now adding to it 7 months later. The lease says "any claim... not so delivered shall be waived" — courts often read this to mean Landlord can\'t serially supplement after delivering a "final" statement. But if pure clock matters, the 11-month timing is technically within bounds.',
      isBest: true,
      explanation:
        'Two doctrines fight here: (1) **strict construction** of the 12-month deadline — the November statement is technically within 12 months of year-end, so Landlord wins on the clock. (2) **estoppel / accord and satisfaction** — Landlord delivered an April statement that did not flag itself as preliminary or subject to amendment; Tenant paid $1,200 against that final-looking statement; equity says Landlord can\'t now add $800. Modern courts often read 7.5 to mean *serial supplements* are barred once a Statement is delivered, but the language is ambiguous. Best play: refuse to pay until Landlord shows the calendar-year invoices supporting the new $800; ask for an audit (Section 7.4 / 5.4 audit rights typically apply); negotiate a 50/50 split rather than litigate. Most landlords back down on supplemental reconciliations because the optics of going to court over $800 are bad and they\'ll usually accept a partial recovery.',
    },
    {
      label:
        'You owe the full $800 — Landlord has 12 months from year-end to bill, and November is within that window.',
      isBest: false,
      explanation:
        'Concedes too quickly. The 12-month clock is technical, but the equity argument (April statement was held out as complete) is real. Plus, a tenant who pays without pushing back on every supplemental is the tenant who gets billed every supplemental for the rest of the lease.',
    },
    {
      label:
        'You owe nothing — once Landlord delivers a CAM Statement, the year is closed; supplemental statements are categorically barred.',
      isBest: false,
      explanation:
        'Overstates the law. The lease language doesn\'t expressly close the year on initial delivery. The argument for closure is equity-based, not text-based, and may not win at trial.',
    },
    {
      label:
        'Audit rights are the only remedy — invoke them and pay whatever the audit determines.',
      isBest: false,
      explanation:
        'Audit rights are *one* remedy but not the only one. Tenant can challenge the supplemental directly under 7.5\'s implicit one-statement rule, audit the books, and negotiate. Mixing remedies is the smart play.',
    },
  ],
  takeaway:
    'CAM reconciliation creates a year-end true-up: monthly estimates → year-end actual → tenant pays / lands credits. The procedural rules matter more than the math. Most lease language gives landlord ~12 months to deliver the Statement; some language allows supplemental adjustments (read carefully) but most reads to mean one Statement per year. When landlord serially supplements, push back: ask for invoices, invoke audit rights, negotiate. Most landlords back down rather than litigate.',
  tips: [
    'Always read 7.4-7.5 (or equivalent) before paying any supplemental CAM. The language often bars serial supplements.',
    'Annual statements should arrive within 90-180 days of year-end. Delays past 12 months are typically waived under most lease language.',
    'Estimated CAM monthly payments are the landlord\'s convenience. If estimates are way off, demand a mid-year adjustment.',
    'Build a "CAM file" each year: invoices, original statement, any supplements, audit results. Tenants with clean records win these arguments; tenants without records pay.',
    'When in dispute, ask for audit rights *before* paying. Once you pay, you\'ve effectively accepted the bill.',
  ],
};
