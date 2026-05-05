import type { SituationalCase } from '../../types/situational';

export const leaseBillbackAllowance: SituationalCase = {
  id: 'lease-billback-allowance',
  title: 'Bill-back allowance — what can the landlord actually pass through?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  documentExcerpt: {
    docType: 'lease',
    label: 'Article 5 — Operating Expense Pass-Through',
    text: `5.1 Tenant\'s Share. Tenant shall pay Tenant\'s Pro Rata Share of
    Operating Expenses (defined below) in excess of the Base Year
    Stop. "Tenant\'s Pro Rata Share" means 12,500 RSF / 425,000 RSF =
    2.94% (or as adjusted upon a re-measurement by Landlord pursuant
    to Section 1.5).

5.2 Operating Expenses. "Operating Expenses" shall include all
    reasonable costs and expenses of operating, maintaining, and
    repairing the Building, including: real estate taxes; insurance
    premiums; utilities (excluding utilities separately metered to
    Tenant); janitorial, security, and elevator service; HVAC;
    grounds and parking; management fees not to exceed three percent
    (3%) of gross rents; provided, however, that Operating Expenses
    shall NOT include: capital expenditures (except as expressly set
    forth in Section 5.3); leasing commissions; depreciation;
    interest or principal on any indebtedness; expenses incurred for
    other tenants\' improvements; or any expense reimbursed by
    insurance.

5.3 Capital Expenditures. Notwithstanding the foregoing, the
    amortized cost of capital improvements that (a) are required by
    law first enacted after the Lease Commencement Date, or (b)
    Landlord reasonably determines will reduce Operating Expenses,
    may be included in Operating Expenses; provided that such cost
    shall be amortized over the useful life of such improvement
    pursuant to GAAP and the annual amortization shall be limited to
    the actual savings realized in the case of clause (b).

5.4 Audit Rights. Tenant may, no more than once per calendar year
    and at Tenant\'s expense, audit Landlord\'s books for the prior
    twelve months. If the audit reveals overcharges of more than
    five percent (5%) of Tenant\'s Pro Rata Share, Landlord shall
    refund the overcharge plus reimburse Tenant\'s reasonable audit
    costs.`,
  },
  scenario:
    'You\'re reviewing year-end CAM reconciliation for an office tenant. The landlord billed $185k for the tenant\'s 2.94% share. Items in the bill: real estate taxes ($90k pro-rated to tenant), insurance ($15k), utilities/janitorial/HVAC ($45k), management fees ($18k = 4.2% of gross rents — slightly above the 3% cap), a new ADA-required ramp installation amortized over 15 years ($8k pro-rata for year 1 of amortization), and $9k for the buildout of an adjacent vacant suite that never got leased to anyone.',
  question:
    'Which line items can the tenant push back on, and what\'s the dollar exposure?',
  options: [
    {
      label:
        'Two items violate the lease: (1) management fees of 4.2% exceed the 3% cap — overcharge ≈ 1.2/4.2 × $18k ≈ $5.1k. (2) The $9k buildout for an adjacent vacant suite is *expressly excluded* under "expenses incurred for other tenants\' improvements" — full $9k overcharge. Total overcharge = $14.1k on a $185k bill = 7.6%, which exceeds the 5% audit-trigger threshold, so the landlord must also reimburse audit costs. The ADA ramp amortization is *legitimate* under 5.3(a) — required by law enacted after Commencement.',
      isBest: true,
      explanation:
        'Line-by-line analysis: (1) Management fee cap is 3% of gross rents, written explicitly. The 4.2% exceeds; overcharge = the excess portion = (4.2% − 3.0%) / 4.2% × $18k = $5.1k. (2) "Buildout of vacant suite" is excluded under 5.2 — clear pass-through violation, full $9k. (3) ADA ramp passes through cleanly: the lease language at 5.3(a) explicitly permits amortized cost of capex required by law enacted *after* Lease Commencement; only the *amortized* portion (year 1 share) flows through, and that\'s how the landlord billed it. (4) Real estate taxes / insurance / utilities are standard pass-throughs. Total push-back = $5.1k + $9k = $14.1k. The 7.6% overcharge crosses the 5% audit threshold under 5.4, so the landlord must refund AND pay tenant\'s audit costs.',
    },
    {
      label:
        'The ADA ramp amortization is the biggest issue — capex is excluded from pass-through, period.',
      isBest: false,
      explanation:
        'Misreads 5.3. Capex is *generally* excluded but Section 5.3 has explicit carve-outs for (a) law-required capex enacted after Commencement and (b) operating-expense-reducing capex. The ADA ramp falls cleanly under (a).',
    },
    {
      label:
        'Tenant has no recourse on the management fee — 3% caps are aspirational; landlords routinely bill higher.',
      isBest: false,
      explanation:
        'Caps in lease language are enforceable. The lease says "not to exceed 3%" — that\'s a hard ceiling. Tenant has explicit audit rights to recover overcharges.',
    },
    {
      label:
        'The 2.94% pro-rata share is wrong; tenants should always re-measure and reduce their share.',
      isBest: false,
      explanation:
        'The lease grants the *Landlord* the re-measurement right, not the Tenant. And re-measurement isn\'t the operative issue here — the issue is what costs are includable under 5.2. Don\'t pick fights you can\'t win.',
    },
  ],
  takeaway:
    'Lease pass-through clauses are dense and tenants should audit annually. The big four exclusions to memorize: (1) capital expenditures (with narrow carve-outs); (2) leasing commissions; (3) interest/depreciation; (4) other-tenant improvement costs. Management fee caps (typically 3-4%) are real and enforceable. Audit-trigger thresholds (typically 3-5% overcharge) can trigger landlord reimbursement of audit costs. Tenants should run the math themselves — landlords routinely bill items that violate the lease, and most tenants never check.',
  tips: [
    'Memorize the four big exclusions: capex (with carve-outs), leasing commissions, interest/depreciation, other-tenant work.',
    'Management fees are usually capped at 3-5% of gross rents. Read the cap; calculate the overage; bill back the landlord.',
    'Pro-rata share definitions matter — sometimes based on RSF, sometimes USF; "or as adjusted upon re-measurement" is a sneaky landlord-friendly clause.',
    'Audit rights typically run *one year* and are *at tenant\'s expense* — but with a refund + cost-reimbursement trigger if overcharges exceed a threshold (3-5%).',
    'Keep the prior-year reconciliation — landlords re-bill items that should have been captured in year 1, and audit rights typically only look back 12 months.',
  ],
};
