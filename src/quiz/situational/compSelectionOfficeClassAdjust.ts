import type { SituationalCase } from '../../types/situational';

export const compSelectionOfficeClassAdjust: SituationalCase = {
  id: 'comp-selection-office-class-adjust',
  title: "Three office comps, an $85/SF spread — where does your asset land?",
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You're pricing a 150,000 SF Class-B 1995-vintage suburban office building with surface parking, currently 92% leased. The broker provides three recent comparables from the same submarket:",
  data: [
    { label: 'Subject asset', value: 'Class B, 1995-built, surface parking, 92% leased' },
    { label: 'Comp A', value: '$240/SF · Class A · 2018-built · structured parking · 95% leased' },
    { label: 'Comp B', value: '$165/SF · Class B · 1998-built · surface parking · 88% leased' },
    { label: 'Comp C', value: '$155/SF · Class B · 1992-built · surface parking · 82% leased' },
    { label: 'Broker ask', value: '$190/SF ("mid-range of comp set")' },
  ],
  question:
    "How do you frame the comp set, and what is the defensible pricing range for the subject asset?",
  options: [
    {
      label:
        "Exclude Comp A as a non-comparable — Class A 2018 product commands structural premiums (higher quality, lower capex burden, structured parking) not applicable to a 1995 Class-B asset. Comps B and C are the relevant anchors. The subject is 3 years newer and 10 occupancy points stronger than Comp C, warranting a modest upward adjustment from $155. Subject is 3 years older and 4 occupancy points stronger than Comp B, broadly comparable at $165. Defensible range: $160–$175/SF, not the broker's $190 blend.",
      isBest: true,
      explanation:
        "The discipline in comp selection is to identify which attributes create material pricing differences and filter accordingly. Class A vs Class B is a capital-markets pricing tier — institutional buyers underwrite them differently, and the 30-year vintage gap (1995 vs 2018) means structurally different capex outlooks. Blending Comp A into the average pulls the midpoint ~$25/SF too high. Comps B and C are the same quality tier and comparable vintage; the 4-point occupancy premium of the subject over Comp B and the 3-year vintage premium over Comp C support pricing near the high end of the B comp range, not above it.",
    },
    {
      label:
        "Average all three comps: ($240 + $165 + $155) / 3 = $187/SF — close to the broker's ask, which validates $190.",
      isBest: false,
      explanation:
        "Simple averaging treats all three comps as equally applicable, which they aren't. Comp A is a fundamentally different asset class (A vs B) and vintage (2018 vs 1995) — including it in the average is the broker's tactic to inflate the midpoint. The average of the two relevant comps (B and C) is $160/SF, a full $27/SF below the broker's implied anchor.",
    },
    {
      label:
        "Use only Comp C ($155/SF) — it's the most conservative and protects against overpaying.",
      isBest: false,
      explanation:
        "Single-comp pricing is too thin, and Comp C has two negative adjustments vs the subject (older vintage, 10 pts lower occupancy) that justify a premium. Throwing out Comp B ignores useful data. The right move is to use both B and C, apply transparent adjustments, and arrive at a range — not to anchor on the most conservative single data point.",
    },
    {
      label:
        "Discard all three comps because none is an exact match — ask the broker for a better set before pricing.",
      isBest: false,
      explanation:
        "No comp is ever an exact match. The analyst's job is to document the differences and apply defensible adjustments, not to wait for a perfect comp that doesn't exist. Comp B (same class, similar vintage, same parking, same submarket) is highly relevant with minor adjustments. Requesting new comps is a stalling tactic that doesn't change the underlying asset.",
    },
  ],
  takeaway:
    "Office comp selection requires explicit filtering by quality class, vintage, parking structure, and occupancy level before pricing. Including a Class-A comp in a Class-B analysis is the most common broker-driven inflation tactic. The right discipline: (1) exclude comps that are a class tier away; (2) apply documented adjustments for vintage (capex burden), occupancy, and parking; (3) produce a range anchored on the remaining 2-3 comparable transactions, not a simple average of everything provided.",
  tips: [
    "Vintage adjustment rule of thumb: pre-2000 Class-B office trades 15–25% below post-2010 Class-B due to capex and functional obsolescence.",
    "Each 5 pts of occupancy difference in office typically corresponds to 5–10% of pricing difference (lease-up risk is priced in).",
    "Structured vs surface parking can move pricing 10–15% in suburban office markets where parking ratios gate tenant requirements.",
  ],
};
