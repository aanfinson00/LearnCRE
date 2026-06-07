import type { SituationalCase } from '../../types/situational';

export const compsSizeTierAdjustment: SituationalCase = {
  id: 'comps-size-tier-adjustment',
  title: 'Your comps are 3× bigger than the subject',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re pricing a 50,000 SF Class-B multi-tenant office building. The broker provides 3 comps: two are 150,000–180,000 SF Class-A towers that traded at 6.25–6.50% caps (4–6 months ago), and one is a 60,000 SF Class-B building of similar vintage that traded at 7.00% cap 9 months ago. The broker blends all three and recommends a 6.50% cap for the subject.',
  data: [
    { label: 'Subject', value: '50,000 SF, Class B, multi-tenant' },
    { label: 'Comp 1', value: '150,000 SF, Class A, 6.25% cap (4 mos ago)' },
    { label: 'Comp 2', value: '180,000 SF, Class A, 6.50% cap (6 mos ago)' },
    { label: 'Comp 3', value: '60,000 SF, Class B, 7.00% cap (9 mos ago)' },
    { label: 'Broker recommendation', value: '6.50% going-in cap (blended)' },
  ],
  question: 'How do you arrive at a defensible cap rate for the subject?',
  options: [
    {
      label: 'Discard Comps 1 and 2 (wrong asset class and wrong size) and anchor to Comp 3, then apply a small +15–25 bps adjustment for the 9-month age. Defensible cap: approximately 7.15–7.25%.',
      isBest: true,
      explanation:
        'Comps 1 and 2 fail on two dimensions: (1) asset class — Class A trades at tighter caps than Class B because institutional demand, lower capex burden, and stronger tenant covenants compress the yield premium; (2) size — 150–180k SF towers attract a deeper institutional buyer pool, compressing caps further. A 50k SF Class-B building trades with a thinner, less liquid buyer set at wider caps. The only true peer is Comp 3 at 7.00%, 9 months old. In a stable rate environment, a 9-month stale adjustment is +15–25 bps. Final anchor: ~7.15–7.25%. Bidding at the broker\'s 6.50% would overpay by roughly 65–75 bps — on a $25M building that\'s approximately $1.5–2M of overpayment vs. fair value.',
    },
    {
      label: 'Blend all three comps equally — the broker sourced them as a single comp set.',
      isBest: false,
      explanation:
        'The broker\'s "comp set" definition is shaped by the goal of supporting the ask price. Blending two large Class-A towers with a small Class-B building pulls the average to 6.58% — 40–65 bps tighter than the only real peer transaction. Blending apples and oranges doesn\'t create a useful average.',
    },
    {
      label: 'Blend Comps 1 and 2 at 25% weight each and Comp 3 at 50% weight.',
      isBest: false,
      explanation:
        'Arbitrary weighting. If Comps 1 and 2 are structurally not comparable (wrong asset class, wrong size, different buyer pool), including them at any positive weight introduces noise. The blended cap at 50/25/25 weighting is roughly 6.69% — still 30–55 bps tighter than anchoring to the actual peer. One defensible comp with a documented age adjustment is more rigorous than three heterogeneous comps averaged.',
    },
    {
      label: 'Ask the broker for more Class-B comps before accepting any pricing recommendation.',
      isBest: false,
      explanation:
        'Requesting better comps is appropriate due diligence for the full underwriting process, but it doesn\'t answer the immediate pricing question. Even with only one Class-B peer, you can form a defensible view at ~7.15–7.25%. "We can\'t price without more comps" is deferral, not analysis. Present a supported view with documented adjustments; update it if better comps surface.',
    },
  ],
  takeaway:
    'Comp discipline requires filtering on multiple dimensions simultaneously: market, asset class, size tier, and vintage. Each dimension where a comp diverges from the subject requires either a documented adjustment or a discard. Two Class-A towers are wrong on asset class AND size — that\'s two strikes, and discarding them is the right call. One defensible adjusted peer comp is more rigorous than three heterogeneous comps blended into a misleading average.',
  tips: [
    'Size tier spread: larger assets trade at tighter caps due to deeper institutional demand and better liquidity.',
    'Class A to Class B spread: typically 50–100 bps in the same submarket.',
    'Single peer comp + documented age adjustment > three heterogeneous comps blended. Quality over quantity.',
  ],
};
