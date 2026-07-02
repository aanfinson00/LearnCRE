import type { SituationalCase } from '../../types/situational';

export const absorptionOfficeSubleaseShadow: SituationalCase = {
  id: 'absorption-office-sublease-shadow',
  title: 'Does sublease space count against absorption?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A CBD office submarket has 5,000,000 SF of inventory. The broker report shows 10% direct vacancy (500,000 SF), trending down at 40,000 SF/quarter of net absorption. Digging into individual tenant filings, you find another 150,000 SF where tenants have vacated but are still on the hook for rent and are marketing the space as sublease — none of that space appears in the "vacancy" statistic because the original tenant\'s lease is still active. You\'re underwriting a competing building in the submarket and need a realistic read on total available supply.',
  data: [
    { label: 'Submarket inventory', value: '5,000,000 SF' },
    { label: 'Reported direct vacancy', value: '10% (500,000 SF)' },
    { label: 'Shadow/sublease space (not in reported vacancy)', value: '150,000 SF' },
    { label: 'Trailing net absorption', value: '40,000 SF/quarter' },
  ],
  question: 'What total available supply should you underwrite against?',
  options: [
    {
      label:
        'About 650,000 SF (13% of inventory) — direct vacancy plus shadow/sublease space, since both compete for the same tenant demand even though only one shows up in the published vacancy rate.',
      isBest: true,
      explanation:
        'Shadow space is real competing supply: a prospective tenant touring the market will see the sublease listing alongside direct listings, often at a rent discount that pulls demand away from ownership deals. Published "vacancy" statistics track direct availability because that\'s what\'s easiest to source from leasing records — but underwriting should track total competing supply, not the published statistic. 500,000 + 150,000 = 650,000 SF, or 13% of the 5,000,000 SF base.',
    },
    {
      label:
        'Use the reported 10% direct vacancy — shadow space technically isn\'t vacant since the original tenant\'s lease is still in force.',
      isBest: false,
      explanation:
        'False comfort. The lease being technically in force doesn\'t stop the space from competing for tenants; a prospective tenant doesn\'t care whether the landlord collects rent from tenant A while tenant B occupies under a sublease. Underwriting to the reported stat alone understates true competition and overstates how fast your building will lease.',
    },
    {
      label:
        'Discount shadow space by 50% before adding it, since sublease terms are typically shorter and less competitive than direct space.',
      isBest: false,
      explanation:
        'Directionally reasonable instinct — sublease space often does compete somewhat differently (shorter term, sometimes furnished, usually priced below market) — but applying a blanket 50% haircut without specific sublease-term data is arbitrary. Better to count it in full for total available supply and treat any pricing differential as a separate variable when modeling achievable rent.',
    },
    {
      label: 'Absorption pace already reflects the full supply picture, so no adjustment is needed to the vacancy stat.',
      isBest: false,
      explanation:
        'Absorption (SF leased per period) and vacancy (SF available) are different measures. A stat can show falling direct vacancy while shadow supply grows if net absorption is driven by direct-space leasing while sublistings pile up separately. You need to look at the shadow space directly — it won\'t automatically show up by cross-referencing the absorption trend.',
    },
  ],
  takeaway:
    'Total competing supply = direct vacancy + shadow/sublease space, even when only the former shows up in a market report\'s headline vacancy rate. Sublease space still competes for tenant demand and belongs in your underwriting.',
  tips: [
    'Always ask whether a vacancy report is "direct only" or "direct + sublease".',
    'Shadow space often prices below market — model it as competing supply and, separately, as a rent-comp risk.',
    'A shrinking direct-vacancy stat can mask a growing shadow-vacancy problem — check both trends.',
  ],
};
