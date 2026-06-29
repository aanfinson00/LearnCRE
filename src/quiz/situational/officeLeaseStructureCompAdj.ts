import type { SituationalCase } from '../../types/situational';

export const officeLeaseStructureCompAdj: SituationalCase = {
  id: 'office-lease-structure-comp-adj',
  title: 'Comparing office cap rates across lease structures',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re underwriting a 200,000 SF Class-B downtown office building on full-service gross leases (landlord pays all OpEx, including utilities, taxes, insurance, and janitorial). Three recent trades in your submarket: Comp A at 7.00% cap (NNN — tenant pays all OpEx); Comp B at 6.50% cap (gross — landlord pays all OpEx); Comp C at 6.75% cap (modified gross — tenant pays above-base-year OpEx). Market OpEx on comparable properties runs approximately $18/SF.',
  data: [
    { label: 'Subject lease structure', value: 'Full-service gross (landlord pays all OpEx)' },
    { label: 'Comp A cap', value: '7.00% (NNN)' },
    { label: 'Comp B cap', value: '6.50% (gross)' },
    { label: 'Comp C cap', value: '6.75% (modified gross)' },
    { label: 'Market OpEx', value: '~$18/SF on comparable properties' },
  ],
  question: 'Which comp is most directly comparable to the subject, and how do you treat the others?',
  options: [
    {
      label: 'Comp B (gross-to-gross) is the most direct comp; use it as the primary anchor at 6.50%. Comp A (NNN) requires a cap adjustment — the NNN cap is wider because the landlord bears no OpEx risk. Comp C is middle ground and useful as a secondary reference.',
      isBest: true,
      explanation:
        'When comparing cap rates across lease structures, the NOI definition changes. NNN NOI = full rent (tenant pays everything); gross NOI = rent net of landlord OpEx. A 7.0% NNN cap and a 6.5% gross cap on similar assets can be economically equivalent — the wider NNN cap compensates for no landlord OpEx risk; the tighter gross cap reflects that the landlord has already baked OpEx into the rent. The cap spread between structures (roughly 25–75 bps for Class-B office) is the market\'s pricing of who bears cost-inflation risk. For the subject (gross), anchor to gross comps first; if you use NNN comps, adjust the cap upward by the structure premium (commonly ~50 bps for B-class office) before applying.',
    },
    {
      label: 'Average all three caps — different lease structures don\'t matter for cap rate purposes because NOI accounts for them.',
      isBest: false,
      explanation:
        'Only valid if NOI is computed on an equivalent basis across all three comps. In practice, NOI is often reported on a face-rent basis without netting the landlord\'s OpEx obligation. Averaging without adjustment embeds a structural error. Always verify whether reported NOI is before or after landlord OpEx before blending.',
    },
    {
      label: 'Discard Comp A (NNN) entirely — you can only use comps with the same lease structure.',
      isBest: false,
      explanation:
        'Discarding cuts your sample size unnecessarily. NNN caps are adjustable to a gross-equivalent with a documented cap-structure spread. Adjusting and including is better practice, especially if the adjusted figure supports the gross comp set.',
    },
    {
      label: 'Use the NNN comp as the primary anchor because NNN cap rates are cleaner — there\'s no ambiguity about who pays OpEx.',
      isBest: false,
      explanation:
        'NNN caps are simpler to interpret, but using a NNN cap as the primary reference for a gross building without adjustment systematically overstates value. A 7.0% NNN cap implies lower asset value than a 7.0% gross cap, because gross NOI has OpEx already subtracted out. Direction of adjustment matters as much as magnitude.',
    },
  ],
  takeaway:
    'Lease structure is a cap-rate driver, not just a deal-mechanic detail. Always verify whether comps are NNN, gross, or modified gross before applying the cap to the subject. The cap spread between structures reflects OpEx risk allocation: gross landlords bear OpEx (tighter cap); NNN landlords don\'t (wider cap). Same economics, different cap level.',
  tips: [
    'Cap structure spread rule of thumb for Class-B office: NNN → Modified gross ≈ +25–50 bps; NNN → Full gross ≈ +50–100 bps.',
    'Always confirm whether comp NOI is reported before or after the landlord\'s OpEx contribution.',
    'Full-service gross buildings are the hardest to comp — verify every sale\'s lease structure before including it.',
  ],
};
