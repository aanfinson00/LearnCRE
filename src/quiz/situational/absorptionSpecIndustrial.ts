import type { SituationalCase } from '../../types/situational';

export const absorptionSpecIndustrial: SituationalCase = {
  id: 'absorption-spec-industrial',
  title: 'Three spec warehouses delivering — what happens to the vacancy rate?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'An infill industrial submarket has 22M SF of inventory and a current vacancy rate of 4.2% (924K SF vacant). Three spec warehouses are scheduled to deliver over the next 12 months totaling 1.8M SF — all are unleased at groundbreaking. The submarket has averaged positive net absorption of 600K SF annually for the past 3 years, driven by e-commerce and last-mile logistics tenants. You\'re underwriting a 400K SF spec building of your own that would deliver in month 9 of this window.',
  data: [
    { label: 'Existing inventory', value: '22M SF' },
    { label: 'Current vacancy', value: '4.2% (924K SF)' },
    { label: 'Competing spec deliveries', value: '1.8M SF over 12 months (all vacant)' },
    { label: 'Your spec delivery', value: '400K SF in month 9' },
    { label: 'Annual net absorption', value: '600K SF/yr (trailing 3-yr avg)' },
  ],
  question:
    'What will the submarket vacancy rate look like at month 12, and what does that imply for your lease-up underwriting?',
  options: [
    {
      label:
        'Total supply increase: 1.8M SF (competitors) + 400K SF (yours) = 2.2M SF new inventory. Total new vacant: 2.2M SF − 600K SF absorbed = 1.6M SF additional vacancy. New inventory base: 24.2M SF. New vacancy: (924K + 1.6M) ÷ 24.2M ≈ 10.4%. The market goes from 4.2% to ~10% vacancy — a significant shift that will pressure asking rents and extend your lease-up.',
      isBest: true,
      explanation:
        'The math: new total inventory = 22M + 2.2M = 24.2M SF. Expected absorption over 12 months = 600K SF (assuming flat). New vacant space = existing 924K + new spec 2.2M − 600K absorbed = 2.524M SF. Vacancy rate = 2.524M ÷ 24.2M ≈ 10.4%. This nearly triples current vacancy. In a 10% vacancy environment, tenant leverage increases, spec buildings compete for the same demand pool, and asking rents face downward pressure. Your lease-up timeline should be extended from a typical 6-9 months (in a 4% vacancy market) to potentially 12-24 months.',
    },
    {
      label:
        'The trailing absorption of 600K SF/yr easily covers the 1.8M SF of new supply — spec industrial always fills quickly.',
      isBest: false,
      explanation:
        '600K SF of annual absorption covers only one-third of the 1.8M SF of competing spec supply — not "easily." The math shows a significant vacancy spike. The phrase "always fills quickly" is the kind of assumption that gets underwriters in trouble during supply cycles. Spec industrial lease-up velocity is highly sensitive to the vacancy rate when competing supply enters simultaneously.',
    },
    {
      label:
        'Focus on your building\'s spec features (clear height, truck court depth) — differentiated product absorbs regardless of market vacancy.',
      isBest: false,
      explanation:
        'Product differentiation matters at the margin but does not override submarket economics. A 10% vacancy environment with 2.2M SF of competing space means tenants have leverage and options. Your building may still lease, but it will take longer and at lower effective rents than a 4% vacancy environment allows. Differentiation is a tie-breaker, not a vacancy insulator.',
    },
    {
      label:
        'If the competing 1.8M SF is not yet permitted, half of it won\'t deliver — use 900K SF as the realistic competitive addition.',
      isBest: false,
      explanation:
        'The premise is "scheduled to deliver" — applying a haircut without specific evidence of delays introduces optimism bias. If the question gives you a delivery schedule, underwrite to it. Apply probability-weighted delays only with evidence (e.g., permitting status, financing status). Generic 50% haircuts on pipeline supply are not conservative underwriting.',
    },
  ],
  takeaway:
    'Supply-cycle analysis for spec industrial follows a simple formula: (new deliveries − expected absorption) added to existing vacancy, then divided by the new total inventory base. When multiple spec buildings deliver simultaneously into the same demand pool, they compete for the same tenant decisions — absorption is not additive for each building. High-supply windows mean wider caps, longer lease-up timelines, and pressure on asking rents — even in fundamentally strong logistics markets.',
  tips: [
    'Vacancy spike formula: (existing vacant + new supply − annual absorption) ÷ new inventory base.',
    'In a multi-spec delivery window, absorption does not multiply — the demand pool is shared.',
    'Typical spec industrial lease-up: 6-9 months at <5% vacancy, 12-24 months at 8-12% vacancy.',
    'Competing deliveries within 12 months of yours are the most relevant risk; deliveries >18 months out have less impact on your initial lease-up window.',
  ],
};
