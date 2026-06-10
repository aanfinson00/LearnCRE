import type { SituationalCase } from '../../types/situational';

export const rentBumpFixedVsCpi: SituationalCase = {
  id: 'rent-bump-fixed-vs-cpi',
  title: 'Fixed 3% bumps vs. CPI — which lease structure is better for the landlord?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'retail',
  scenario:
    "You're negotiating a 10-year retail lease at $50/SF year-1 base rent. The tenant proposes CPI-linked escalations (floored at 0%, uncapped). You counter with 3% fixed annual bumps. Historical CPI over the past decade has averaged 2.2%. The current leasing environment has inflation running at 4.5%, but the Fed is projecting a return to 2.5% within 2–3 years.",
  data: [
    { label: 'Lease term', value: '10 years' },
    { label: 'Year-1 rent', value: '$50/SF' },
    { label: 'Option A', value: 'CPI-linked (0% floor, uncapped)' },
    { label: 'Option B', value: '3% fixed annual bumps' },
    { label: 'Recent CPI', value: '4.5%/yr' },
    { label: 'Expected CPI (Fed target)', value: '2.5% in 2–3 yrs; 2.2% long-run avg' },
  ],
  question:
    "Which escalation structure is more favorable to the landlord over the 10-year term — and what is the key risk of each?",
  options: [
    {
      label:
        "Fixed 3% bumps are preferable to the landlord if CPI averages below 3% over the term — which historical averages and Fed guidance suggest is likely. CPI linkage is only better for the landlord if inflation runs above 3% for a sustained period, and the 0% floor only benefits the tenant (limits the landlord's upside in deflation, which is already rare).",
      isBest: true,
      explanation:
        "Fixed bumps at 3% outperform CPI when inflation averages <3%, and underperform when inflation averages >3%. Long-run US CPI has averaged ~2.2–2.5%. Current 4.5% inflation is elevated but expected to normalize. Over a 10-year term: if CPI averages 2.5%, fixed 3% bumps add 0.5% incremental rent/year — compounded over 10 years, a meaningful premium. If CPI averages 4.5% the full decade, CPI linkage would generate 1.5% more rent/year. The landlord's view should be: '3% fixed locks in above-inflation rent growth if CPI normalizes, and the 10-year average is more likely 2.5% than 4.5%.' The risk of fixed bumps: in a high-inflation environment the landlord's real rent declines. The risk of CPI linkage: in a low-inflation or deflationary environment, the tenant gets the 0% floor protection (no bump years) while the landlord gets nothing.",
    },
    {
      label:
        "CPI linkage is always better for the landlord — it ensures rent keeps pace with the real economy.",
      isBest: false,
      explanation:
        "Only true if CPI averages above the fixed bump rate (3%). When CPI is below 3% — which is the historical average — CPI linkage produces LOWER rent growth than the fixed 3% alternative. The '0% floor' also removes the deflation-protection argument for the landlord; the floor helps the tenant, not the landlord.",
    },
    {
      label:
        "They're equivalent — the market sets rent levels, not the escalation structure.",
      isBest: false,
      explanation:
        "Escalation structure directly determines the year-2 through year-10 contractual rents. A 10-year lease at 3% fixed bumps vs. CPI at 2.5% compounded produces meaningfully different NER and total rent billings. On $50/SF base: fixed 3% × 10 years yields total rent of ~$574/SF over the term; CPI at 2.5% × 10 years yields ~$553/SF. A $21/SF difference over 10 years is not equivalent.",
    },
    {
      label:
        "Accept CPI linkage now — current 4.5% CPI means the landlord will earn more for the first 2–3 years.",
      isBest: false,
      explanation:
        "Lease terms are 10 years; optimizing for the first 2–3 years can hurt the full-term economics. If CPI normalizes to 2.5% in year 3 as projected, the CPI-linked lease reverts to 2.5% bumps for the remaining 7 years, well below the 3% fixed alternative. The NPV comparison over the full term (not just year 1–3) favors fixed 3%.",
    },
  ],
  takeaway:
    'Fixed rent bumps outperform CPI linkage when CPI averages below the fixed rate, and vice versa. The historical US CPI average (~2.2–2.5%) favors fixed bumps at 3%. Landlords prefer fixed bumps for three reasons: (1) certainty of above-inflation rent growth in normal environments, (2) avoidance of the tenant-favorable 0% floor in CPI structures, and (3) simpler administration. CPI linkage is most valuable in institutional leases during sustained inflationary periods — a structurally unusual regime over a 10-year horizon.',
  tips: [
    'Breakeven inflation: fixed bump % = CPI avg needed for CPI structure to match. Here, 3.0%.',
    'Check CPI floor/cap: uncapped CPI with a 0% floor gives the tenant deflation protection, limiting the landlord.',
    'Compute NER under each scenario to compare lease economics apples-to-apples.',
  ],
};
