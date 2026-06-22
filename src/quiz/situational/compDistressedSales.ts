import type { SituationalCase } from '../../types/situational';

export const compDistressedSales: SituationalCase = {
  id: 'comp-distressed-sales',
  title: 'Your comps are all distressed — what\'s the right anchor?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You are bidding on a 95%-occupied Class-B office building in a secondary market. The most recent trades in the submarket are mostly distressed: two foreclosure sales and one deed-in-lieu. The broker is also including one arm\'s-length sale from 22 months ago at a 6.75% cap.',
  data: [
    { label: 'Subject', value: '95% occupied, Class B office, 80k SF, arm\'s-length sale' },
    { label: 'Comp 1 (foreclosure)', value: 'Traded 4 months ago — 8.50% cap' },
    { label: 'Comp 2 (foreclosure)', value: 'Traded 7 months ago — 9.25% cap' },
    { label: 'Comp 3 (deed-in-lieu)', value: 'Transferred 5 months ago — 10.00% implied cap' },
    { label: 'Comp 4 (arm\'s-length)', value: 'Traded 22 months ago — 6.75% cap' },
  ],
  question: 'Which comps should anchor your bid and how do you handle the distressed trades?',
  options: [
    {
      label:
        'Discard Comps 1–3 as non-arm\'s-length. Use Comp 4 as the baseline but apply a rate-environment adjustment of +100–150 bps for the 22-month lag (rates rose materially in that window). Arrive at a 7.75–8.25% going-in cap. Use the distressed comps only to calibrate your downside scenario.',
      isBest: true,
      explanation:
        'Foreclosure and deed-in-lieu transactions are involuntary — the seller had no negotiating leverage, so they can\'t anchor arm\'s-length pricing. Comp 4 is the only market-clearing trade, but its age means rates were 200+ bps lower. A documented time adjustment (backed by rate move) lands you at 7.75–8.25%. The distressed comps still serve a purpose: they define what happens to pricing when occupancy erodes and lenders force a sale — critical for downside underwriting.',
    },
    {
      label:
        'Average all 4 comps at face value — the market is telling you caps are 8.5–10% and the older trade is an outlier.',
      isBest: false,
      explanation:
        'The distressed comps reflect involuntary seller pricing, not market-clearing value. Using them to establish going-in cap for a stabilized, arm\'s-length transaction would produce an artificially wide cap — and a bid that either doesn\'t win or suggests a risk-adjusted return that isn\'t actually there (you\'re not buying distress).',
    },
    {
      label:
        'Use Comp 4 at face value (6.75%) — it\'s the only true arm\'s-length trade and should define market price.',
      isBest: false,
      explanation:
        'A 22-month-old trade at 6.75% ignores material market movement. Rates rose 200+ bps in this window, which mechanically pressures cap rates wider. Using it without time-adjustment would produce an unrealistic high-bid that misprices risk.',
    },
    {
      label:
        'Reject the deal — if the only recent trades are distressed, the market has no price discovery for stabilized assets.',
      isBest: false,
      explanation:
        'Thin comp sets are common in secondary markets and don\'t automatically disqualify a deal. The right response is to document the comp limitations, expand the time or geography filter with explicit adjustments, and widen the pricing range. Walking away over comp scarcity is over-reaction.',
    },
  ],
  takeaway:
    'Distressed comps (foreclosures, deeds-in-lieu, receivership sales) are not arm\'s-length. They belong in your downside scenario, not your going-in cap anchor. When the only recent trades are distressed, use the last arm\'s-length trade with a documented rate-environment adjustment. Be explicit about the uncertainty — a wider bid range is intellectually honest.',
  tips: [
    'Foreclosure / deed-in-lieu = involuntary seller, no comp value for stabilized pricing.',
    'Time-adjust by tracking the 10-year Treasury move over the lag period — 100 bps rate rise ≈ 25–50 bps cap widening in most office markets.',
    'Document "why the distressed comps are excluded" in your IC memo — the question will come up.',
  ],
};
