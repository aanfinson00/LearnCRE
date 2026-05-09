import type { SituationalCase } from '../../types/situational';

export const absorptionNewSupplyTipping: SituationalCase = {
  id: 'absorption-new-supply-tipping',
  title: 'When does new industrial supply tip the market?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'industrial',
  scenario:
    "A logistics submarket has 40M SF of inventory at 97% occupancy (1.2M SF vacant). Developers have announced 4M SF of new construction delivering over the next 18 months. Trailing 12-month net absorption has been 2.5M SF. You need to assess whether the submarket will tip to oversupply — conventionally defined as vacancy exceeding 5% — before the new supply is absorbed.",
  data: [
    { label: 'Total inventory', value: '40M SF' },
    { label: 'Current occupancy', value: '97% (1.2M SF vacant)' },
    { label: 'Pipeline (18 months)', value: '4M SF new construction' },
    { label: 'T12 net absorption', value: '2.5M SF/yr (≈208k SF/mo)' },
    { label: 'Oversupply threshold', value: '>5% vacancy' },
  ],
  question: "Will the submarket tip to oversupply, and when does peak vacancy occur?",
  options: [
    {
      label: "No — but peak vacancy reaches ~3.3% in month 18, not the current 3%. By month 18: 4M SF delivered, 3.75M SF absorbed. Total effective vacancy: 1.2M existing + 4M new − 3.75M absorbed = 1.45M SF on 44M base = 3.3%. Stays below 5% but is the tightest pressure point.",
      isBest: true,
      explanation:
        "Cumulative absorption over 18 months: 208k SF/mo × 18 = 3.75M SF. Total new supply: 4M SF. Net new vacancy at month 18: 4M − 3.75M = 250k SF incremental. Total vacancy: 1.2M + 250k = 1.45M on a 44M SF base = 3.3%. The market doesn't tip past 5% — absorption slightly lags delivery by 250k SF — but the pressure point is month 18 when all deliveries land. Beyond month 18, absorption starts winning back and vacancy retreats.",
    },
    {
      label: "Yes — 4M SF of new supply on a 40M SF base is 10% of inventory. Markets always tip when supply exceeds 10% of base.",
      isBest: false,
      explanation:
        "Supply-to-inventory percentage is a useful screen but not a conclusion. 10% new supply in a market with strong absorption and existing tight vacancy (3%) may not tip. The question is the pace and timing of delivery versus the pace of absorption — math resolves this, not rules of thumb.",
    },
    {
      label: "No — market absorption at 2.5M SF/yr easily outpaces 4M SF of new supply over 18 months.",
      isBest: false,
      explanation:
        "Close but imprecise. 18-month absorption (3.75M SF) slightly lags 18-month new supply (4M SF), meaning vacancy does rise temporarily by ~250k SF before retreating. Calling it 'easy' overstates the margin. The correct answer acknowledges the pressure point at month 18 before recovery.",
    },
    {
      label: "Impossible to assess without knowing the pre-leasing percentage on the pipeline.",
      isBest: false,
      explanation:
        "Pre-leasing de-risks spec supply but doesn't make the analysis impossible without that data. Run the worst case (0% pre-leased) and the upside case (50% pre-leased) to frame the range. The base case above assumes full speculative delivery. 'Impossible without pre-leasing data' skips the modeling step.",
    },
  ],
  takeaway:
    "Supply tipping math: (existing vacancy + new supply − absorbed during delivery period) ÷ new inventory base = peak vacancy %. Compare to the oversupply threshold (typically 4–5% for industrial). If cumulative absorption lags cumulative delivery, vacancy rises; the crossover is the peak pressure point. After delivery, absorption clears the backlog and vacancy retreats.",
  tips: [
    "Industrial equilibrium vacancy is typically 4–5%; below it, landlords have pricing power.",
    "Pre-leased supply removes from the speculative pool — subtract it before running absorption math.",
    "Check whether trailing absorption is accelerating or decelerating: a decelerating trend changes the base case materially.",
  ],
};
