import type { SituationalCase } from '../../types/situational';

export const distressedCompAdjustment: SituationalCase = {
  id: 'distressed-comp-adjustment',
  title: 'A comp was a bank REO sale — how do you treat it?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You're pricing a stabilized Class-B office asset in a CBD submarket. Your comp set includes four trades: three arm's-length market sales and one bank REO (real-estate-owned) sale where the lender sold a defaulted borrower's asset at a 9.5% going-in cap. The three market sales printed at 6.75–7.25%. The asset being bid is stabilized, multi-tenant, and not under any financing or operational distress.",
  data: [
    { label: 'Comp 1 (REO)', value: '9.5% going-in cap · bank-forced sale' },
    { label: 'Comp 2 (market)', value: '7.25% cap' },
    { label: 'Comp 3 (market)', value: '6.90% cap' },
    { label: 'Comp 4 (market)', value: '6.75% cap' },
    { label: 'Subject asset', value: 'Stabilized · multi-tenant · no distress' },
  ],
  question: 'How do you treat the REO comp when anchoring your pricing?',
  options: [
    {
      label:
        "Exclude the REO from the cap rate average, or include it with a documented 150–250 bps adjustment, and anchor pricing to the three market comps at 6.75–7.25%. REO sales transact at distressed pricing because buyers take on unknowns (deferred maint, tenant instability, legal encumbrances, no seller reps/warranties) that your stabilized subject doesn't have. Averaging the REO in without adjustment would artificially inflate the market cap rate anchor by ~50 bps.",
      isBest: true,
      explanation:
        "REO sales reflect a specific set of risks that differ fundamentally from arm's-length transactions: (1) no seller representations or warranties — buyers must underwrite blindly; (2) unknown deferred maintenance and tenant relationship gaps from absentee ownership; (3) often sold with existing litigation or tenant defaults the new buyer inherits; (4) bank disposition timeline pressure that compresses the marketing period and limits buyer competition. These factors create a 'distress premium' in cap rates — the buyer demands a wider cap to compensate for underwriting uncertainty. For your stabilized, multi-tenant subject, none of those risks apply. Using the REO cap rate as evidence of 'market pricing' conflates a risk-specific transaction with arm's-length market evidence.",
    },
    {
      label:
        "Include the REO in the average — it traded in the same submarket and represents a real transaction; excluding it is cherry-picking.",
      isBest: false,
      explanation:
        "Including unqualified comps isn't objective — it's unexamined. The job of comp selection is to identify transactions that reflect the same risk profile as the subject, or to document adjustments that bridge the differences. Averaging a 9.5% REO cap into a 6.75–7.25% market set without adjustment produces a 7.50% anchor that overstates the market cap by ~40 bps. That's not objectivity; it's imprecision masquerading as comprehensiveness.",
    },
    {
      label:
        "The REO comp is evidence of cap rate risk in this submarket — use 9.5% as the floor and bid conservatively to protect downside.",
      isBest: false,
      explanation:
        "Confuses the cause of the REO discount with a market signal. The 9.5% doesn't say 'this submarket is risky for stabilized assets' — it says 'that specific bank-owned asset had extraordinary uncertainty that buyers priced accordingly.' Using it as a floor for your stabilized subject would under-bid relative to market, potentially killing a deal that deserves to be done.",
    },
    {
      label:
        "Average all four comps and add a 25 bps premium to the result for the general office market uncertainty.",
      isBest: false,
      explanation:
        "Adding a flat 25 bps premium to an already-distorted average doesn't solve the underlying problem — you've included a non-comparable transaction and then added an ad hoc adjustment. The right answer is to isolate the comps by quality (arm's-length vs. distressed) and build the cap rate anchor from the appropriate peer group, then apply any market adjustments to that clean baseline.",
    },
  ],
  takeaway:
    "Comp selection requires transaction type screening, not just submarket filtering. REO/bank sales, estate sales, and related-party transactions all reflect motivations that differ from the arm's-length standard. Always categorize comps by transaction type before averaging — distressed comps should be flagged, adjusted, or excluded, with the rationale documented. A 3-comp arm's-length average beats a 4-comp set that includes a distressed outlier.",
  tips: [
    'REO sales typically trade at a 150–300 bps cap premium to arm\'s-length comparables in the same submarket.',
    'Flag each comp with: transaction type (arm\'s-length / REO / related party), occupancy at sale, and age of data.',
    'If your comp set has ≤ 2 arm\'s-length transactions, widen the geographic or time radius rather than mixing transaction types.',
  ],
};
