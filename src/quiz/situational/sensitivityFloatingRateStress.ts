import type { SituationalCase } from '../../types/situational';

export const sensitivityFloatingRateStress: SituationalCase = {
  id: 'sensitivity-floating-rate-stress',
  title: 'What does a rate hike do to a floating-rate deal?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'mixed',
  scenario:
    "A deal was acquired at 60% LTV with a 3-year floating rate loan at SOFR + 200 bps. At acquisition, SOFR was 2.0%, making the all-in rate 4.0%. Eighteen months in, SOFR has risen to 4.5%, making the all-in rate 6.5%. The property has a 6.0% going-in cap rate on $50M of value, generating $3M of annual NOI. The loan is interest-only.",
  data: [
    { label: 'Property value / NOI', value: '$50M / $3.0M (6.0% cap)' },
    { label: 'Loan', value: '60% LTV = $30M · IO · SOFR + 200 bps' },
    { label: 'Original all-in rate', value: 'SOFR 2.0% + 200 bps = 4.0%' },
    { label: 'Current all-in rate', value: 'SOFR 4.5% + 200 bps = 6.5% (+250 bps)' },
    { label: 'Original debt service', value: '$30M × 4.0% = $1.20M/yr' },
    { label: 'Current debt service', value: '$30M × 6.5% = $1.95M/yr' },
  ],
  question: "How has the rate rise affected deal economics, and what is the primary risk going forward?",
  options: [
    {
      label: "Cash-on-cash yield dropped from 9.0% to 5.25% on $20M of equity. The deal is now in negative leverage territory (debt rate 6.5% > cap rate 6.0%). The primary forward risk is refinancing: at maturity, the asset must qualify for a same-LTV refi at elevated rates — which may require NOI growth or a partial paydown.",
      isBest: true,
      explanation:
        "Original CoC: ($3.0M − $1.2M) ÷ $20M = 9.0%. Current CoC: ($3.0M − $1.95M) ÷ $20M = 5.25%. The $750k/yr rate increase cost 375 bps of CoC yield. Negative leverage: debt rate (6.5%) > cap rate (6.0%) — each dollar of debt now costs more than it earns. Refi risk: at maturity, lenders underwrite using DSCR and debt yield. Current DSCR = $3.0M ÷ $1.95M = 1.54× (still above a 1.25× covenant). Debt yield = $3.0M ÷ $30M = 10.0% (borderline at typical 9.5–10.5% thresholds). A NOI shortfall of even 10% would breach both tests.",
    },
    {
      label: "Minimal impact — the property is IO so there's no principal reduction, and the 6.0% cap rate exceeds the original 4.0% loan rate.",
      isBest: false,
      explanation:
        "The relevant comparison is cap rate vs. CURRENT rate, not the original rate. Cap rate 6.0% vs. current rate 6.5% = negative leverage — the loan now costs more than the unlevered yield. IO structure doesn't protect against negative leverage; it just means no principal paydown is building equity. Cash flow is being squeezed right now.",
    },
    {
      label: "The deal is underwater — when the debt rate exceeds the cap rate, the investment always loses principal.",
      isBest: false,
      explanation:
        "Negative leverage means each marginal dollar of debt earns less than it costs, compressing equity returns. But it doesn't mean certain principal loss unless property values decline. If SOFR reverts or NOI grows, the deal can still produce positive IRR. The risk is value erosion (if cap rates rise alongside rates) and refi stress — not automatic principal loss.",
    },
    {
      label: "The deal is actually fine — DSCR of 1.54× is comfortably above the 1.25× covenant threshold, so there's no lender concern.",
      isBest: false,
      explanation:
        "DSCR at 1.54× clears the covenant today, but leaves thin headroom. A 15% NOI decline (common in a stress scenario) drops DSCR to ~1.31×, and any further deterioration triggers a covenant breach. The more pressing concern is the debt yield test at refi maturity, and the compressing equity cash flow that weakens the sponsor's ability to carry the asset through a difficult period.",
    },
  ],
  takeaway:
    "Floating rate exposure creates negative leverage when rates rise above the cap rate. The double hit: (1) annual cash flow compresses because debt service rises while NOI holds flat; (2) refi risk increases because higher rates mean lenders underwrite lower LTV against the same NOI. Always model +150 and +250 bps rate stresses on floating-rate deals. Flag negative leverage explicitly in the IC memo — it means every dollar of leverage is working against you.",
  tips: [
    "Negative leverage: debt rate > cap rate. Every dollar of debt costs more than it earns — equity suffers the delta.",
    "DSCR test: NOI ÷ debt service. Covenant is typically 1.20–1.25×; refi qualification is typically 1.25–1.35×.",
    "Debt yield test: NOI ÷ loan balance. Refi lenders want 9.0–10.5% minimum; below it means recourse or paydown.",
  ],
};
