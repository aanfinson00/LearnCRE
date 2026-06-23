import type { SituationalCase } from '../../types/situational';

export const absorptionRetailCorridor: SituationalCase = {
  id: 'absorption-retail-corridor',
  title: 'Will the retail corridor fill in time?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You're evaluating a 60,000 SF neighborhood retail center currently at 72% occupancy (16,800 SF vacant). The corridor has competing centers with 45,000 SF of aggregate available space. Historical corridor net absorption has run at 8,000–10,000 SF per year. Your underwriting requires stabilization at 90% — filling 10,800 SF — within 24 months to hit the target IRR.",
  data: [
    { label: 'Subject vacancy', value: '16,800 SF (28%)' },
    { label: 'Corridor competing supply', value: '45,000 SF available' },
    { label: 'Historical corridor absorption', value: '8,000–10,000 SF/yr' },
    { label: 'Target occupancy', value: '90% in 24 months' },
    { label: 'SF needed to fill on subject', value: '10,800 SF' },
  ],
  question: 'Does the absorption rate support your 24-month stabilization assumption?',
  options: [
    {
      label: "Unlikely — total corridor supply (61,800 SF) absorbs at ~9,000 SF/yr, clearing in ~7 years. For the subject to stabilize in 24 months it must capture ~60% of corridor absorption. That requires an explicit 'why us first' thesis, not just a blank 24-month assumption.",
      isBest: true,
      explanation:
        "Total supply competing for the same tenant pool: 16,800 (subject) + 45,000 (competing centers) = 61,800 SF. At 9,000 SF/yr corridor-wide absorption, clearing takes ~7 years. For the subject to fill 10,800 SF in 24 months it must capture roughly 60% of total corridor leasing over that window — possible if the asset has anchor credit, superior visibility, or aggressive pricing, but each rationale must be explicit and defensible. A blank 24-month assumption without a capture-rate thesis is an unsupported bet in this supply environment.",
    },
    {
      label: "Yes — 24 months gives 18,000 SF of total corridor absorption, more than the 10,800 SF needed.",
      isBest: false,
      explanation:
        "This treats all corridor absorption as flowing to the subject asset. The 18,000 SF absorbed over 24 months is distributed across every center with available space, including the 45,000 SF already on the market. Your subject competes for the same limited tenant demand — it doesn't receive market absorption by default.",
    },
    {
      label: "Retail absorption is anchor-driven, not submarket-driven — corridor data is irrelevant here.",
      isBest: false,
      explanation:
        "Anchors shift leasing velocity at the specific center but don't manufacture corridor demand that isn't there. If total corridor demand is thin, even an anchored center sees extended small-shop lease-up. Dismissing submarket absorption data ignores the ceiling on how much total leasing can occur in the corridor regardless of who captures it.",
    },
    {
      label: "Lower rents will accelerate absorption — price below corridor asking and stabilization will come faster.",
      isBest: false,
      explanation:
        "Rent cuts improve competitive position within the corridor but don't expand total corridor demand. In an oversupplied corridor, discounted rents may still clear slowly if there are simply too few retailers seeking space. Stabilization timing flows from demand, not from price incentives alone — and demand needs to be quantified, not assumed.",
    },
  ],
  takeaway:
    "Retail lease-up timelines must be benchmarked against total corridor supply, not just subject-level vacancy. The fraction of corridor absorption your asset can realistically capture is the key variable — and it needs a defensible 'why us first' thesis, not a default timeline. Oversupplied corridors clear in years, not months.",
  tips: [
    "Total competition = subject vacancy + all competing available SF in the corridor.",
    "Capture-rate thesis: why does your asset win tenants ahead of competing space?",
    "If corridor absorption can't support the timeline, widen the stabilization window or reprice.",
  ],
};
