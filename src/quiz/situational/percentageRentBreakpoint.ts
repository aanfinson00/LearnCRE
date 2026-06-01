import type { SituationalCase } from '../../types/situational';

export const percentageRentBreakpoint: SituationalCase = {
  id: 'percentage-rent-breakpoint',
  title: 'Grocery anchor: does the percentage rent clause actually generate any income?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'retail',
  scenario:
    "A national grocery anchor occupies 45,000 SF at $18/SF base rent. The lease includes a percentage rent clause: tenant pays the greater of base rent OR 1.5% of gross sales. Last year's reported sales were $28,000,000 and projected to grow 5% next year. You are reviewing the rent roll to assess total rent income.",
  data: [
    { label: 'Tenant space', value: '45,000 SF' },
    { label: 'Base rent', value: '$18/SF → $810,000/yr' },
    { label: 'Percentage rent rate', value: '1.5% of gross sales' },
    { label: 'Last year sales', value: '$28,000,000' },
    { label: 'Projected sales growth', value: '+5% → $29,400,000' },
  ],
  question: 'Does the percentage rent clause trigger, and if so, by how much?',
  options: [
    {
      label:
        'The clause does not trigger — and will not trigger at projected sales levels. The natural breakpoint = base rent ÷ percentage rate = $810,000 ÷ 1.5% = $54,000,000 in annual sales. Last year\'s $28M sales generate only 1.5% × $28M = $420,000 in percentage rent, well below the $810,000 base. The tenant pays base rent only. At 5% growth, next year\'s $29.4M × 1.5% = $441,000 — still far below the $810,000 base. The clause is largely decorative at this tenant\'s sales volume.',
      isBest: true,
      explanation:
        'Percentage rent = the greater of base rent OR (% rate × gross sales). Only when % rate × gross sales > base rent does overage kick in. Here, the natural breakpoint (the sales volume at which % rent equals base rent) is $810k ÷ 1.5% = $54M — nearly double this tenant\'s actual sales. For grocery anchors with relatively low percentage rates (1–2%), the natural breakpoint is typically very high, making the clause a blue-sky provision that rarely pays out unless the tenant is an extremely high-volume performer.',
    },
    {
      label:
        'Yes — percentage rent = 1.5% × $28M = $420,000 in additional rent on top of base rent.',
      isBest: false,
      explanation:
        'Misreads "the greater of" structure. Percentage rent replaces base rent when it exceeds it — it does not stack on top of it. The tenant pays max(base rent, % rent). Since $420k < $810k, the tenant pays the base rent of $810k, not $810k + $420k = $1.23M.',
    },
    {
      label:
        'The clause will trigger once sales grow past $1M above the base rent level.',
      isBest: false,
      explanation:
        'Confuses the dollar threshold with the breakpoint calculation. The trigger is a sales volume comparison, not a dollar amount above base rent. The natural breakpoint is $54M in sales — a very specific figure derived from dividing base rent by the percentage rate.',
    },
    {
      label:
        'Percentage rent clauses in grocery leases always generate meaningful incremental income.',
      isBest: false,
      explanation:
        'The opposite is typically true. Grocery and big-box anchors negotiate low percentage rates (1–2%) precisely because their high-volume, low-margin business model means the natural breakpoint would be unreachably high. Percentage rent is most meaningful for specialty retailers (jewelry, electronics) with high sales-per-SF and higher percentage rates (6–10%).',
    },
  ],
  takeaway:
    "The natural breakpoint formula (base rent ÷ % rate) is the key to quickly evaluating whether a percentage rent clause has any practical value. For grocery anchors with low % rates, the breakpoint is often $50M+ in annual sales — a level most stores never reach. Do not include speculative percentage rent in your base NOI projection for anchors with below-breakpoint sales histories.",
  tips: [
    'Natural breakpoint = base rent ÷ percentage rent rate. This is the annual sales figure at which % rent equals base rent.',
    'Only sales ABOVE the natural breakpoint generate incremental landlord income.',
    'Percentage rent rates by tenant type: grocery/big-box = 1–2%, apparel = 4–6%, jewelry/electronics = 6–10%.',
    'Never underwrite percentage rent overage without a specific sales history showing the tenant is at or above the breakpoint.',
  ],
};
