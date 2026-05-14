import type { SituationalCase } from '../../types/situational';

export const industrialSpecAbsorption: SituationalCase = {
  id: 'industrial-spec-absorption',
  title: 'Industrial: spec building delivers into a submarket that just added 8M SF — is your lease-up underwriting defensible?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    "You're underwriting a 600,000 SF spec Class-A industrial building delivering in Q3. The submarket had 2% vacancy before a wave of spec deliveries: 8M SF of new supply came online over the past 18 months, pushing vacancy to 11%. Historical absorption in the submarket has been 4M SF/year. Your sponsor's pro forma shows lease-up to 95% in 18 months at a $7.25/SF NNN asking rent.",
  data: [
    { label: 'Building size', value: '600,000 SF' },
    { label: 'Submarket vacancy (current)', value: '11%' },
    { label: 'Submarket vacancy (18 mos ago)', value: '2%' },
    { label: 'New supply delivered (18 mos)', value: '8M SF' },
    { label: 'Historical annual absorption', value: '4M SF/yr' },
    { label: 'Sponsor lease-up underwriting', value: '95% in 18 months' },
    { label: 'Asking rent', value: '$7.25/SF NNN' },
  ],
  question: 'Is the 18-month lease-up underwriting defensible? What would you change?',
  options: [
    {
      label:
        'The 18-month timeline is aggressive. Excess supply = ~6M SF still to absorb (8M delivered minus ~2M of historical absorption in the 18-month period). At 4M SF/yr absorption, clearing that overhang takes 18+ months — and your 600k SF building competes with all the other vacant new product for the same tenants. A more defensible underwriting is 24–30 months to 85–90% occupancy with a rental rate concession (free rent, TI) that reflects a tenant-favorable market.',
      isBest: true,
      explanation:
        'The math: 8M SF delivered over 18 months means ~6M SF of new supply arrived faster than absorption (4M SF/yr × 1.5 yrs = 6M SF absorbed). Net new vacant supply = 8M − 6M = ~2M SF still overhanging, plus 9% vacancy on total existing inventory (which in a large submarket might be another 10–20M SF). In a tenant\'s market with this much competing product, a 600k SF building should underwrite to 24–30 months for 85–90% at market, not 95% in 18 months. Rent concessions (3–6 months free rent, higher TI) are standard in this environment and suppress effective rents below face.',
    },
    {
      label:
        "Historical absorption is 4M SF/yr, and your building is only 600k SF — that's 15% of one year's absorption. The 18-month timeline is fine.",
      isBest: false,
      explanation:
        "This logic ignores the competition. Your 600k SF building competes with ~2M SF of other vacant new spec product for the same pool of tenants. If annual absorption stays at 4M SF and the total vacant new supply is ~2M SF, it still takes ~6 months just to clear the overhang — before your tenant pool replenishes for renewals and new demand. The relevant metric is your share of the remaining vacant supply, not of total annual absorption.",
    },
    {
      label:
        'The submarket went from 2% to 11% vacancy — this is a broken market. Don\'t underwrite any lease-up; model it as a hold until the cycle recovers.',
      isBest: false,
      explanation:
        "Too pessimistic. 11% vacancy in industrial is elevated but not broken — pre-COVID industrial markets ran 5–7% as a healthy range. The market will absorb back toward equilibrium over time. A complete hold assumption ignores partial lease-up economics (anchor tenant at 50% + extension period) and misses the opportunity to structure a deal at a distressed basis where the cycle correction is already in the price.",
    },
    {
      label:
        "Trust the sponsor's 18-month underwriting — they know the local market better than a model can capture.",
      isBest: false,
      explanation:
        'Developer sponsors have an inherent incentive to present optimistic lease-up assumptions when raising equity. The data in this scenario directly contradicts the timeline: supply delivered 2× faster than absorption for 18 months, vacancy jumped 9 points, and there is still significant overhang. Local market knowledge is valuable context, but it should sharpen the model, not replace it.',
    },
  ],
  takeaway:
    "Industrial lease-up timing is a supply-vs-absorption race. The key model inputs are (1) total currently vacant new supply, (2) historical annual absorption, and (3) your share of the vacant pool. When supply outpaces absorption and pushes vacancy to elevated levels, a sponsor's standard 18-month underwriting needs to be stress-tested against the overhang — the correct question is not 'is absorption strong?' but 'how long does it take to clear the inventory ahead of me?'",
  tips: [
    'Effective rent ≠ face rent in a tenant-favorable market. Free rent and elevated TI reduce NPV by 10–20% vs face.',
    'Track submarket vacancy relative to historical equilibrium (typically 4–6% for industrial). Above 8–10% is a tenant\'s market.',
    'Large-block tenants (300k+ SF) have very few buildings to choose from — bulk supply is different from mid-bay supply. Segment the competition by building size.',
  ],
};
