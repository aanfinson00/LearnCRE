import type { SituationalCase } from '../../types/situational';

export const industrialSubleaseOverhang: SituationalCase = {
  id: 'industrial-sublease-overhang',
  title: "How does the sublease wave change your stabilization timeline?",
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    "You're underwriting a 200,000 SF Class-A industrial acquisition. The submarket has 8,000,000 SF of inventory currently 94% occupied (480,000 SF vacant). Over the past quarter, three large occupiers announced lease returns, adding 600,000 SF of sublease space to the market. Quarterly net absorption has been running at 200,000 SF. Your deal requires the submarket to tighten to 96% occupancy before you can refi at the underwritten cap rate.",
  data: [
    { label: 'Submarket inventory', value: '8,000,000 SF' },
    { label: 'Current occupancy', value: '94%' },
    { label: 'Direct vacant SF', value: '480,000 SF' },
    { label: 'New sublease additions', value: '+600,000 SF' },
    { label: 'Quarterly net absorption', value: '200,000 SF' },
    { label: 'Refi occupancy target', value: '96%' },
  ],
  question:
    "How long until the submarket reaches 96% occupancy, and what risk does the sublease wave introduce?",
  options: [
    {
      label:
        "Sublease space effectively extends the total availability to ~1,080,000 SF. At 200K SF/quarter absorption, full absorption takes ~5–6 quarters. The submarket won't hit 96% until you've cleared most of the new sublease supply — roughly 18 months out, and absorption pace is at risk of slowing as sublease supply competes with direct vacancy.",
      isBest: true,
      explanation:
        "Total availability: 480K direct + 600K sublease = 1,080K SF. At 96% occupancy on 8M SF, you need 7,680K SF leased. Currently leased: 7,520K. Gap to close: 160K SF of direct vacancy, but the 600K sublease overhang will depress net absorption as tenants shop sublease space (which typically prices at a discount to direct). The realistic recovery timeline is 5–6 quarters, not 2–3 — and the absorption pace assumption of 200K/quarter likely slows as sublease space competes.",
    },
    {
      label:
        "The 96% target is only 480K SF of direct vacancy away. At 200K SF/quarter that's about 2–3 quarters.",
      isBest: false,
      explanation:
        "Ignores the sublease overhang entirely. Sublease space competes directly with vacant space for tenants — often at 10–20% lower rents. When 600K SF of sublease hits the market, it absorbs demand that would otherwise reduce direct vacancy. Net absorption of the total availability pool (1,080K SF) still runs at roughly 200K/quarter, but it's drawn from the combined pool, not just the direct bucket.",
    },
    {
      label:
        "Sublease space doesn't count — it eventually expires and returns to landlords at market rents. Ignore it for underwriting.",
      isBest: false,
      explanation:
        "Sublease space actively competes in the market during its term and depresses effective rents. It does eventually expire or get sublet, but calling it irrelevant ignores 600K SF of competing inventory that will delay the absorption of direct vacancy and put downward pressure on asking rents near-term.",
    },
    {
      label:
        "Widen the refi threshold rather than change the timeline — model the refi at 94% instead of 96% to avoid timeline uncertainty.",
      isBest: false,
      explanation:
        "Moving the underwriting target to match a weaker market rather than modeling the actual trajectory is underwriting to the path of least resistance. The lender's refi test is likely contractual. If the market fundamentals don't support the timeline, model that honestly and decide whether the deal still pencils.",
    },
  ],
  takeaway:
    "Sublease overhang extends absorption timelines and depresses effective rents because it competes with direct vacancy, often at a discount. Model total availability (direct + sublease) when estimating market recovery, and stress-test whether trailing absorption rates are sustainable once a large sublease slug hits the market.",
  tips: [
    "Total availability = direct vacant + sublease available; use this for submarket health checks.",
    "Sublease space typically prices 10–20% below direct asking rents, compressing the whole market.",
    "If >5% of submarket inventory is hitting sublease in a single quarter, extend your stabilization timeline assumption.",
  ],
};
