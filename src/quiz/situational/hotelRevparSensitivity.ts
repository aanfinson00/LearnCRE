import type { SituationalCase } from '../../types/situational';

export const hotelRevparSensitivity: SituationalCase = {
  id: 'hotel-revpar-sensitivity',
  title: 'Hotel acquisition: how far can RevPAR fall before the deal breaks?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You are acquiring a 200-key full-service hotel for $50M (an 8.0x EBITDA multiple / ~7.0% going-in cap). Year 1 underwritten RevPAR is $130 (75% occupancy at $173 ADR). Stabilized hotel EBITDA is $6,250,000. The deal requires a 9.0% cash-on-cash return on a $20M equity check (60% LTV IO loan at 7.0%). Your IC partner asks: if a demand shock drops RevPAR by 15%, does the deal still service the debt?",
  data: [
    { label: 'Purchase price', value: '$50,000,000' },
    { label: 'Year 1 RevPAR', value: '$130 (75% occ × $173 ADR)' },
    { label: 'Stabilized EBITDA', value: '$6,250,000 (before FF&E reserves)' },
    { label: 'FF&E reserve', value: '$800,000/yr (4% of revenue)' },
    { label: 'NOI (EBITDA − FF&E)', value: '$5,450,000' },
    { label: 'Loan', value: '$30M at 7.0% IO → $2,100,000/yr debt service' },
    { label: 'RevPAR stress', value: '−15%' },
  ],
  question: 'At a 15% RevPAR decline, does the hotel generate sufficient NOI to cover debt service?',
  options: [
    {
      label:
        'A 15% RevPAR decline likely breaks debt service coverage. Hotel revenue = occupancy × ADR × rooms × 365. At 15% RevPAR decline, revenues fall roughly 15%. Hotel EBITDA margins are highly sensitive to revenue changes due to fixed cost leverage (fixed expenses like labor minimums, property taxes, insurance do not fall with revenue). A 15% revenue decline typically produces a 25–35% EBITDA decline given ~50–55% operating expense ratio. Stressed EBITDA ≈ $6,250,000 × (1 − 0.30) = ~$4,375,000. Less FF&E reserve ($800k adjusted down slightly) ≈ NOI of ~$3,600,000. DSCR = $3,600,000 ÷ $2,100,000 = 1.71x — technically above 1.0x but well below the typical 1.25–1.35x DSCR covenant. The deal is likely in cash trap or covenant breach territory.',
      isBest: true,
      explanation:
        'Hotel operating leverage is the key concept: revenue falls proportionally with RevPAR, but EBITDA falls by a larger percentage because fixed costs (management fees on a fixed base, taxes, insurance, minimum labor) do not scale down with revenue. The relationship between revenue decline and EBITDA decline is roughly 2:1 to 2.5:1 (i.e., 15% revenue decline → 30–37% EBITDA decline) depending on fixed cost ratio. At 1.71x DSCR, most lenders would trigger a cash trap or cash sweep at 1.25x and potentially a springing recourse or reserve deposit at 1.10x. The deal does not "break" in the sense of negative cash flow, but it very likely trips loan covenants.',
    },
    {
      label:
        'A 15% RevPAR decline produces a 15% NOI decline — DSCR falls from 2.6x to about 2.2x, well above 1.25x.',
      isBest: false,
      explanation:
        'This assumes EBITDA declines 1:1 with RevPAR, ignoring operating leverage from fixed costs. Hotel OpEx is not 100% variable — labor, property tax, insurance, and management fees have fixed components that do not decline proportionally with revenue. EBITDA falls by more than revenue, making the NOI/DSCR impact larger than a linear model implies.',
    },
    {
      label:
        'Hotel operators can cut staffing and costs proportionally, so a 15% RevPAR decline is fully manageable.',
      isBest: false,
      explanation:
        'Labor cost cutting is partially possible but operationally limited. Minimum service levels (front desk, housekeeping, security) cannot be eliminated and are largely fixed below a revenue threshold. In a full-service hotel with restaurant, meeting space, and fitness, fixed costs are an even larger share of the expense base. The operator has flexibility at the margin, not at 1:1 revenue-to-cost reduction.',
    },
    {
      label:
        'Only exit cap matters for the deal — a temporary RevPAR dip does not affect IRR significantly.',
      isBest: false,
      explanation:
        'For a leveraged hotel deal, debt service coverage is an ongoing operational constraint, not just an IRR input. A 15% RevPAR decline that trips DSCR covenants can trigger cash sweeps, springing recourse, or lender intervention that affects ownership control — potentially forcing an early sale at a stressed valuation. In-period cash flow risk and covenant breach risk are material to the investment thesis, not secondary to exit cap.',
    },
  ],
  takeaway:
    'Hotel EBITDA exhibits significant operating leverage: a 15% revenue decline typically produces a 25–35% EBITDA decline due to the large fixed cost base (labor floors, taxes, insurance, management fees). For debt service coverage analysis, always apply this operating leverage factor rather than a 1:1 revenue-to-NOI mapping. Present IC with revenue sensitivity scenarios at −10%, −15%, and −20% RevPAR, showing the resulting DSCR vs. the loan\'s covenant threshold.',
  tips: [
    'Hotel revenue = Keys × 365 × Occupancy × ADR. RevPAR = Occupancy × ADR.',
    'EBITDA margin sensitivity rule of thumb: 1% revenue change ≈ 1.5–2% EBITDA change (due to fixed cost base).',
    'DSCR covenant triggers in hotel loans are typically: 1.25x = cash trap, 1.10x = springing recourse or reserve deposit.',
    'Full-service hotels have higher fixed costs and more operating leverage than limited-service; limited-service EBITDA falls less on a revenue decline.',
  ],
};
