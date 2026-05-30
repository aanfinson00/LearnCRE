import type { SituationalCase } from '../../types/situational';

export const vacancySensitivityOnLeveredReturn: SituationalCase = {
  id: 'vacancy-sensitivity-levered-return',
  title: 'How much vacancy can you absorb before the deal breaks?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'mixed',
  scenario:
    'You are underwriting a 100,000 SF office acquisition at a 6.0% going-in cap, 95% occupancy, and $30/SF gross rent. The deal is leveraged at 65% LTV on a 5-yr fixed rate at 6.75% with 30-year amortization. Your base IRR is 13.2% on a 5-year hold. A senior partner asks: "What occupancy level causes the deal to break even on a levered basis, and what breaks first — cash flow or your DSCR covenant?"',
  data: [
    { label: 'Building size', value: '100,000 SF' },
    { label: 'Base occupancy', value: '95%' },
    { label: 'Gross rent', value: '$30/SF' },
    { label: 'Going-in cap', value: '6.0%' },
    { label: 'Leverage', value: '65% LTV, 6.75% fixed, 30-yr am' },
    { label: 'DSCR covenant', value: '1.20x (tested annually)' },
    { label: 'Base levered IRR', value: '13.2%' },
  ],
  question: 'Which breaks first — cash-on-cash coverage or the DSCR covenant — and roughly at what vacancy?',
  options: [
    {
      label: 'The DSCR covenant breaks first, around 83–85% occupancy — well before the deal goes cash-flow negative for equity. Levered deals have a narrower safety buffer than the gross numbers suggest because debt service is fixed.',
      isBest: true,
      explanation:
        'Approximate NOI at 95%: $30 × 95,000 SF × ~50% expense ratio ≈ ~$1.425M (or use the 6.0% cap implied: purchase price = $1.425M ÷ 6% = $23.75M). Loan = $23.75M × 65% ≈ $15.44M. Annual debt service at 6.75%, 30-yr am ≈ $1.21M/yr. DSCR at 95%: $1.425M ÷ $1.21M ≈ 1.18x — already close to the 1.20x trigger. At ~90–92% occupancy, NOI drops ~5% to ~$1.35M: DSCR ≈ 1.12x — covenant breach. The deal doesn\'t go cash-flow negative for equity until occupancy drops to ~80–83%, but the DSCR covenant trips at 90–92%. The lender catches the problem before the equity goes negative — that\'s leverage discipline working as designed.',
    },
    {
      label: 'Cash flow to equity breaks first — once rents fall, debt service consumes the equity cushion quickly.',
      isBest: false,
      explanation:
        'On a fixed-rate loan, debt service doesn\'t change when occupancy falls. The DSCR covenant (fixed at 1.20x) acts as a trip wire that activates cash management and reserve requirements well before equity cash flow turns negative. Lenders design covenants to trigger before the equity is impaired.',
    },
    {
      label: 'Neither breaks until occupancy falls below 70% — the going-in cap gives you plenty of cushion.',
      isBest: false,
      explanation:
        'A 6.0% going-in cap at 95% occupancy gives the *unlevered* deal a cushion — but the DSCR covenant tightens that significantly. At 65% LTV and a 6.75% rate, the debt service coverage at base is already close to the 1.20x trigger. A 5-10% occupancy drop trips the covenant before equity is meaningfully impaired. The covenant, not the unlevered yield, sets the binding constraint.',
    },
    {
      label: 'It depends entirely on whether the lease structure is NNN or gross — NNN shifts expense risk to tenants.',
      isBest: false,
      explanation:
        'Lease structure affects the NOI volatility under occupancy stress (in a gross lease, you keep paying expenses on vacant space), but it doesn\'t change the core analytical framework. The question is about DSCR covenant vs. equity cash flow sensitivity — the answer is the same qualitatively for both lease structures, though the break-even occupancy level shifts.',
    },
  ],
  takeaway:
    'On a leveraged deal, the DSCR covenant is the first binding constraint, not equity cash flow. Lenders size covenants to trip before equity is meaningfully impaired. Always solve for the break-even occupancy for both (a) DSCR covenant breach and (b) negative equity cash flow — the gap between them is your safety buffer. On high-LTV deals, that buffer can be as narrow as 3–5 occupancy points.',
  tips: [
    'DSCR break-even occupancy = (annual DS × covenant trigger) ÷ NOI per SF occupied.',
    'Levered equity break-even occupancy is always lower than DSCR break-even — by design.',
    'The gap between covenant trip and equity break-even narrows as LTV increases.',
  ],
};
