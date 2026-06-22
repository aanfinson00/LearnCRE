import type { SituationalCase } from '../../types/situational';

export const absorptionRetailHeadwinds: SituationalCase = {
  id: 'absorption-retail-headwinds',
  title: 'Retail vacancy is falling — but should you believe it?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    'A retail submarket report shows vacancy declining from 8.2% to 7.6% over the past 4 quarters, with positive net absorption of 320,000 SF. New leases are dominated by fitness, food-and-beverage, and experiential tenants. Traditional apparel and soft-goods retailers account for zero new leases. You\'re bidding on an 180,000 SF strip center anchored by a national grocery chain, with 3 inline apparel tenants whose leases expire in 18 months.',
  data: [
    { label: 'Submarket vacancy trend', value: '8.2% → 7.6% (4 qtrs)' },
    { label: 'Net absorption', value: '+320k SF over 4 quarters' },
    { label: 'New lease categories', value: 'Fitness, F&B, experiential — 100% of new leases' },
    { label: 'Apparel / soft goods', value: '0 new leases signed in submarket' },
    { label: 'Subject anchor', value: 'National grocery (long-term lease, strong credit)' },
    { label: 'Subject inline tenants', value: '3 apparel tenants, 18-month lease expiry' },
  ],
  question: 'How do you underwrite the apparel tenant rollover given the absorption data?',
  options: [
    {
      label:
        'The submarket absorption trend is not relevant to the apparel rollover — zero apparel leases in 4 quarters signals structural secular decline for that tenant category. Underwrite the 3 apparel spaces as permanently vacant at expiry; model the re-leasing to experiential/F&B at market rents with 12–18 months downtime and TI of $60–80/SF.',
      isBest: true,
      explanation:
        'Headline net absorption masks composition. Retail vacancy is declining, but entirely because experiential and food tenants are backfilling space that physical retail is vacating — not because apparel demand is returning. Underwriting apparel renewal assumes a trend that the market data directly contradicts. The grocery anchor insulates NOI, but the inline box must be re-leased into the secular winners, not the secular losers. Model the downtime and re-tenanting cost explicitly.',
    },
    {
      label:
        'Vacancy is tightening and absorption is positive — apply a 90% renewal probability and market rent growth of 3% at rollover.',
      isBest: false,
      explanation:
        'Headline vacancy and absorption are positive — but category-level analysis shows zero apparel demand. Applying a generic 90% renewal probability ignores the secular trend destroying apparel tenant demand. This is the exact mistake that left many retail investors exposed in 2018–2022.',
    },
    {
      label:
        'Negotiate a 5-year extension with each apparel tenant during diligence before closing, and underwrite renewal rents flat.',
      isBest: false,
      explanation:
        'Locking in apparel leases pre-close is good risk reduction if achievable — but the pricing should reflect the reality: you are locking in a declining category. A 5-year extension with apparel tenants who face secular headwinds still carries binary risk at the next rollover. Price accordingly.',
    },
    {
      label:
        'Exclude the 3 inline spaces from the NOI underwrite entirely and price the deal on grocery anchor income only.',
      isBest: false,
      explanation:
        'Excluding inline income is too conservative — the spaces will eventually be re-leased, just to different tenant types. The right approach is to model the downtime, the re-tenanting cost, and the likely re-leased rent (likely to experiential/F&B at similar or higher rents than apparel). Zeroing out income permanently understates stabilized value.',
    },
  ],
  takeaway:
    'Retail absorption must be read by tenant category, not just as an aggregate headline. Rising headline absorption driven entirely by experiential tenants does nothing for a landlord with apparel rollover exposure. Underwrite the specific tenant categories you own, not the market as a whole.',
  tips: [
    'Always decompose retail absorption by category: grocery, QSR/F&B, fitness, apparel, services.',
    'Zero new leases in a category = structural demand problem, not cyclical — price accordingly.',
    'Grocery-anchored strip centers are insulated on anchor NOI; inline boxes are not if the category is in decline.',
    'Re-tenanting to experiential (gym, restaurant, urgent care) often requires 24–30 months and $60–100/SF TI.',
  ],
};
