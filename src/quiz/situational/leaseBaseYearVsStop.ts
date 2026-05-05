import type { SituationalCase } from '../../types/situational';

export const leaseBaseYearVsStop: SituationalCase = {
  id: 'lease-base-year-vs-stop',
  title: 'Base year vs expense stop — which one are you actually reading?',
  category: 'document-literacy',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  documentExcerpt: {
    docType: 'lease',
    label: 'Article 5.1 — Operating Expense Pass-Through',
    text: `5.1(a) Operating Expenses. Tenant shall pay, as Additional Rent,
    Tenant\'s Pro Rata Share of Operating Expenses for each calendar
    year during the Lease Term in excess of the "Base Year Expenses"
    (the actual Operating Expenses incurred during calendar year
    2024). For the avoidance of doubt, the Base Year Expenses shall
    be calculated using the same methodology as subsequent years and
    shall be "grossed up" to reflect 95% occupancy if actual building
    occupancy was less.

5.1(b) Calculation Method. For the period commencing January 1,
    2025, the increase shall be calculated as: (Operating Expenses
    for the applicable year — Base Year Expenses) × Tenant\'s Pro
    Rata Share. There shall be no "expense stop" or fixed cap on
    Operating Expenses; Tenant pays the full year-over-year increase.

5.1(c) "Gross Up" Methodology. For purposes of calculating both
    Base Year Expenses and any subsequent year\'s Operating Expenses,
    variable expenses shall be grossed up to reflect 95% occupancy
    if actual occupancy was less than 95%. Fixed expenses (such as
    real estate taxes and insurance) shall not be grossed up.`,
  },
  scenario:
    'You\'re reviewing a 5-year lease in an office building you\'re acquiring. The building is currently 80% occupied. Base Year is 2024 with $5.50/SF in operating expenses (across the whole building). The seller\'s OM is touting "tenant pays 100% of OpEx growth" but the lease says "Base Year" — which is structurally different from a "stop." The tenant occupies 12,500 SF in a 425,000 SF building.',
  question:
    'Under the Base Year structure (5.1(a)) plus the gross-up clause (5.1(c)), what\'s the tenant\'s exposure on year-over-year OpEx growth, and how does this differ from a true expense stop?',
  options: [
    {
      label:
        'Base Year + gross-up = tenant pays growth in OpEx above the *grossed-up* 2024 baseline. Grossing the 2024 expenses up to 95% occupancy means the baseline is *higher* than actual 2024 expenses, which *reduces* the tenant\'s exposure to growth (because the bar is set higher). Expense Stop, by contrast, is a fixed dollar cap that doesn\'t adjust for occupancy. Practical impact here: at 80% actual occupancy, ~$5.50/SF actual OpEx grosses up to ~$5.85/SF baseline (variable expenses scale with occupancy). The tenant pays growth above $5.85/SF, not $5.50/SF. Better for tenant; worse for landlord acquisition math.',
      isBest: true,
      explanation:
        'Critical distinction: **Base Year** = the baseline against which growth is measured, recalculated each year for occupancy via the gross-up clause. **Expense Stop** = a fixed dollar amount per SF that the tenant pays nothing under, regardless of occupancy or year. Base Year is more common in modern Class A office; Expense Stop is older / more common in retail and some Class B office. The gross-up math here: 2024 OpEx had ~70% variable / 30% fixed (typical ratio). At 80% occupancy, variable expenses are ~80%/95% × what they would be at 95%. To gross up to a 95%-occupancy baseline: variable portion × 95%/80%, fixed portion unchanged. So $5.50/SF actual = ~$3.85 variable + $1.65 fixed → grossed-up = $3.85 × 95/80 + $1.65 = $4.57 + $1.65 = $6.22/SF baseline. (Wait — if variable expenses scale with occupancy, then at 80% the actual variable was lower than at 95%; grossing up makes it higher.) The point: gross-up *raises* the baseline, which *lowers* tenant\'s growth exposure compared to a non-grossed-up calc. Landlord-friendly buyers prefer Expense Stop (no occupancy adjustment); tenants prefer Base Year + gross-up.',
    },
    {
      label:
        'Base Year and Expense Stop are functionally the same — both protect tenant from inflationary increases.',
      isBest: false,
      explanation:
        'They\'re not equivalent. Base Year is a *moving* baseline that recalculates each year (for occupancy via gross-up); Expense Stop is a *fixed* dollar number that doesn\'t adjust. The gross-up alone is a multi-cents-per-SF differentiator.',
    },
    {
      label:
        'Tenant pays the full $5.50/SF, then $5.50/SF + 100% of growth — Base Year just means there\'s a starting point.',
      isBest: false,
      explanation:
        'Misreads the structure. Tenant pays *only the growth above* the Base Year. They don\'t pay the Base Year itself unless the Base Rent is structured to include OpEx (which is a different lease type — full-service gross or modified gross).',
    },
    {
      label:
        'The gross-up clause works against the tenant — it inflates expenses on the landlord side and increases tenant\'s share.',
      isBest: false,
      explanation:
        'Inverts the math. Gross-up *of the Base Year* raises the baseline, which *reduces* the growth exposure for tenant. Gross-up of subsequent years raises those years too, but the *delta* between baseline and current year shrinks. Net effect is tenant-friendly.',
    },
  ],
  takeaway:
    'Base Year vs Expense Stop is one of the most-misread lease structural distinctions. **Base Year** = Year 1 actual expenses (often grossed up for occupancy); tenant pays growth above that. **Expense Stop** = fixed $/SF cap; tenant pays nothing below; landlord pays nothing above. Modified gross / Full-service gross leases use Base Year; older / triple-net leases sometimes use Expense Stop. The gross-up clause is sneaky — landlord-friendly text says "if occupancy is below 95%, gross up actual expenses to 95% to compute the Base Year"; this raises the baseline and reduces tenant exposure (good for tenant, bad for landlord).',
  tips: [
    'Base Year ≠ Expense Stop. Read carefully — they look similar in passing but produce very different cash flows.',
    'Gross-up to 95% (sometimes 100%) is standard in Base Year leases. It\'s a tenant protection.',
    'When buying an asset with Base Year leases, model OpEx growth carefully — under-stated growth = inflated NOI projection.',
    '"Modified Gross" + Base Year + gross-up is the most tenant-friendly mainstream structure. NNN + Expense Stop is the most landlord-friendly.',
    'Always run the math: at 80% occupancy, gross-up moves the baseline by 5-10% of variable expenses — material to NOI growth modeling.',
  ],
};
