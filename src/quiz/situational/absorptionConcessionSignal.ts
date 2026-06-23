import type { SituationalCase } from '../../types/situational';

export const absorptionConcessionSignal: SituationalCase = {
  id: 'absorption-concession-signal',
  title: 'Concessions or real demand?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    "A multifamily submarket reports 95% physical occupancy and net absorption of +300 units in Q3. Closer review reveals concessions have widened sharply: operators are offering 2 months free on 12-month leases. Effective rents are running ~8% below asking. You're considering an acquisition priced off the 95% occupancy report.",
  data: [
    { label: 'Physical occupancy (reported)', value: '95%' },
    { label: 'Q3 net absorption', value: '+300 units' },
    { label: 'Concessions offered', value: '2 months free / 12-month lease' },
    { label: 'Effective vs. asking rent', value: '−8%' },
    { label: 'Implied economic occupancy', value: '~83% (vs. 95% physical)' },
  ],
  question: 'What does the occupancy and absorption data actually tell you?',
  options: [
    {
      label: "High physical occupancy is masking economic vacancy. 2 months free on a 12-month lease = collecting rent for only 10 months. Effective economic occupancy is ~83%, not 95%. Price from actual NOI — not from heads-in-beds at face rent.",
      isBest: true,
      explanation:
        "2 free months on 12 = 10/12 rent collection per occupied unit. If 95% are physically occupied and all are on 2-months-free terms: effective income ≈ 95% × (10/12) ≈ 79% of potential GPI. Even without full concession data, the −8% effective-rent gap confirms economic occupancy is materially below physical. Paying cap-rate pricing on 95% physical occupancy when economic occupancy is ~83% means overpaying by roughly 12 points of NOI — a meaningful mispricing.",
    },
    {
      label: "Strong absorption proves demand is healthy — +300 units in one quarter is a clear positive signal.",
      isBest: false,
      explanation:
        "Absorption with heavy concessions signals the market is clearing below asking rent, not that demand is healthy at face rents. 300 units leased at a discount is a different outcome than 300 units leased at market. The count is positive; the quality of the demand — the price it commands — is the issue.",
    },
    {
      label: "Concessions are temporary and will burn off as supply tightens — underwrite the recovery.",
      isBest: false,
      explanation:
        "Concession burn-off is the upside thesis, not the base case. If concessions are required to sustain 95% physical occupancy today, the current clearing price is below asking rent — and the underwrite must reflect that. Model current economics; treat burn-off as the upside case with explicit conditions (supply absorption timeline, demand recovery triggers).",
    },
    {
      label: "95% occupancy is above the typical stabilization threshold — the deal qualifies as stabilized.",
      isBest: false,
      explanation:
        "Stabilization standards refer to economic performance, not physical heads. A building 95% physically occupied on 2-months-free terms generates the same NOI as a building ~83% occupied at face rents. Using physical occupancy to declare 'stabilized' while ignoring the concession drag means paying stabilized pricing for an unstabilized cash flow.",
    },
  ],
  takeaway:
    "Physical occupancy and net absorption become misleading signals when concessions are heavy. Always reconcile to effective rents and economic occupancy before pricing. Rising concessions in a market with stable physical occupancy is the textbook leading indicator of a rent correction — the physical statistic lags the economic signal.",
  tips: [
    "Effective rent = face rent × (1 − free months ÷ lease term).",
    "Economic occupancy = physical occupancy × (effective rent ÷ asking rent).",
    "Concession widening with flat physical occupancy = rent correction already in progress.",
  ],
};
