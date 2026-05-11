import type { SituationalCase } from '../../types/situational';

export const hotelSeasonalUnderwriting: SituationalCase = {
  id: 'hotel-seasonal-underwriting',
  title: 'Hotel: disaggregating seasonal revenue for accurate projection',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'hotel',
  scenario:
    "You're underwriting a 150-key resort hotel in a ski-and-summer destination market. The seller's trailing 12-month revenue is $8.5M. The T12 is highly seasonal: ski season (Q1 + Q4, ~6 months) generates RevPAR of $240; summer shoulder (Q2 + Q3, ~6 months) generates RevPAR of $85. The seller's forward proforma projects $9.2M of revenue (+8.2%) by applying the trailing blended growth rate uniformly across all months. You've reviewed 3-year historical STR data: ski season RevPAR has grown at a 10% CAGR; summer shoulder RevPAR has grown at only 3% CAGR. The resort has 150 keys; assume 182 days per half-year for simplicity.",
  data: [
    { label: 'T12 total revenue', value: '$8.5M' },
    { label: 'Ski season (Q1+Q4) RevPAR', value: '$240 / night' },
    { label: 'Summer shoulder (Q2+Q3) RevPAR', value: '$85 / night' },
    { label: 'Ski season revenue (calc)', value: '$240 × 150 × 182 = $6.55M' },
    { label: 'Summer shoulder revenue (calc)', value: '$85 × 150 × 182 = $2.32M' },
    { label: 'Ski season historical RevPAR CAGR', value: '+10%/yr' },
    { label: 'Summer shoulder historical RevPAR CAGR', value: '+3%/yr' },
    { label: "Seller's forward revenue projection", value: '$9.2M (+8.2% blended)' },
  ],
  question:
    "What's wrong with applying the blended 8.2% growth rate uniformly, and what does a disaggregated projection look like?",
  options: [
    {
      label:
        "The blended rate overstates summer-shoulder growth: it applies ski season momentum to a structurally weaker demand period. Disaggregated: ski season $6.55M × 1.10 = $7.21M; summer shoulder $2.32M × 1.03 = $2.39M; total = $9.60M. Interestingly, the disaggregated number is slightly higher than the seller's blended projection — but the composition matters: if ski demand softens (weather event, competitor resort opening), the downside is concentrated in the 73% ski-season revenue base, not smoothed across all months. Model both seasons separately to isolate this concentration risk.",
      isBest: true,
      explanation:
        "Right approach. The blended 8.2% growth rate conceals the seasonal revenue structure: 77% of revenue is ski-season-dependent. Applying a uniform rate masks both upside (ski season growing at 10%) and the structural softness of the shoulder (3%). The disaggregated forward estimate actually comes in slightly above the seller's number ($9.60M vs. $9.2M), but more importantly it surfaces a concentration risk: a 1-year ski season RevPAR miss of 10% (weather or competitive shock) reduces total revenue by $721K — a 7.5% miss on total revenue from one season's disruption. The uniform-rate approach makes this risk invisible.",
    },
    {
      label:
        "The blended growth rate is fine for a full-year revenue projection — the seasons average out over time. The important thing is to nail the total revenue number, not its composition.",
      isBest: false,
      explanation:
        "Season-level composition matters significantly for resort underwriting because (1) operating costs don't flex proportionally between seasons — a 20% occupancy shoulder season still carries a near-full staffing base, compressing NOI margin; (2) debt service is paid monthly regardless of seasonality, so cash-flow timing matters for liquidity; and (3) lenders and buyers stress-test by season, not by annual average. A total revenue number that hides a 77%/23% seasonal concentration carries different risk than one with 55%/45% split — even at the same annual total.",
    },
    {
      label:
        "Use only the ski season revenue in your underwriting — summer shoulder is too volatile to project and should be treated as upside.",
      isBest: false,
      explanation:
        "Unnecessarily conservative and operationally incorrect. A 150-key resort doesn't close in the shoulder — it continues to operate with lower occupancy. The shoulder RevPAR is lower and growth slower, but at $2.32M of trailing revenue it is not de minimis. Ignoring it understates stabilized revenue by 27% and produces a systematically low valuation. The right approach is to model each season with its own growth rate, not to exclude the slower-growing one.",
    },
    {
      label:
        "Apply the summer shoulder growth rate (3%) to the full year as the conservative case — this gives a defensible floor for the acquisition.",
      isBest: false,
      explanation:
        "Applying 3% uniformly understates ski season revenue by 7 percentage points of growth per year — a material error over a 5-year hold. At 3% uniform growth, Year 1 projected revenue is $8.5M × 1.03 = $8.76M vs. $9.60M disaggregated. That $840K of Year 1 revenue difference compounds forward and produces a materially lower NOI and exit valuation. 'Conservative' should mean stress-testing reasonable downside scenarios, not systematically misapplying a seasonally inappropriate growth rate to the wrong revenue base.",
    },
  ],
  takeaway:
    "Seasonal resort hotels must be underwritten season-by-season, not on a blended annual basis. Each season has its own demand drivers, growth trajectory, and operating cost structure. Blended growth rates hide concentration risk and make sensitivity analysis impossible. At minimum: (1) decompose historical RevPAR by season, (2) apply segment-specific growth rates, and (3) model the full-year P&L with seasonal cash-flow timing to assess liquidity and DSCR compliance.",
  tips: [
    "Season decomposition formula: revenue by season = RevPAR × keys × operating days. Verify the seller's T12 against this arithmetic — rounding can hide underperformance.",
    'Ski resort concentration risk factors: snowfall variance, season length (Thanksgiving open / Easter close), terrain park investment, and proximity to competing resorts with better snowmaking.',
    'Lenders underwriting resort hotels typically apply higher DSCR floors (1.45–1.55× vs. 1.25× for urban full-service) to account for revenue volatility and seasonal cash flow timing.',
  ],
};
