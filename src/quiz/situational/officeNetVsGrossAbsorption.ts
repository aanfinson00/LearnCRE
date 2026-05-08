import type { SituationalCase } from '../../types/situational';

export const officeNetVsGrossAbsorption: SituationalCase = {
  id: 'office-net-vs-gross-absorption',
  title: "Why is gross absorption misleading here?",
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    "A suburban office submarket reports 220,000 SF of gross absorption in Q3 — the highest quarterly figure in two years. Your acquisition memo cites this as evidence of improving demand. A senior reviewer flags the quarterly market report: net absorption for the same period was −110,000 SF. Two large tenants downsized out of the submarket during Q3, giving back a combined 330,000 SF.",
  data: [
    { label: 'Gross absorption (Q3)', value: '220,000 SF' },
    { label: 'Net absorption (Q3)', value: '−110,000 SF' },
    { label: 'Move-outs / downsizes', value: '330,000 SF' },
    { label: 'Current vacancy', value: '17%' },
    { label: 'Submarket inventory', value: '4.2M SF' },
  ],
  question:
    "How should you interpret the Q3 gross absorption figure in your underwriting?",
  options: [
    {
      label:
        "Gross absorption only counts space newly leased; it ignores space returned. Negative net absorption means the submarket got looser in Q3, not tighter — the memo's demand narrative is wrong.",
      isBest: true,
      explanation:
        "Net absorption = space leased − space vacated. 220K leased − 330K returned = −110K net. The submarket added 110K SF of vacancy in Q3 despite visible leasing activity. Anchoring on gross absorption to support a tightening thesis misreads the data: new tenants moved in, but more space hit the market than was absorbed. Vacancy will likely drift higher next quarter, not lower.",
    },
    {
      label:
        "220,000 SF of gross absorption is a strong demand signal regardless of net — new tenants choosing this submarket is what matters for underwriting.",
      isBest: false,
      explanation:
        "New tenant arrivals are a positive signal, but the supply side matters just as much. If for every new tenant, 1.5 tenants leave, occupancy deteriorates. Brokers and OMs routinely cite gross absorption because it sounds larger; underwriters must convert to net to understand true market health.",
    },
    {
      label:
        "Ignore both figures — absorption is a lagging indicator and has no value for forward underwriting.",
      isBest: false,
      explanation:
        "Net absorption is a core market health indicator. It's not perfect, but dismissing it entirely leaves you without a directional read on vacancy trends. The right answer is to use net absorption carefully, not to ignore it.",
    },
    {
      label:
        "The negative net absorption is a one-quarter anomaly from the two move-outs; long-run gross absorption trend is more reliable.",
      isBest: false,
      explanation:
        "Large tenant downsizes in office markets are often structural, not one-off. Two tenants giving back 330K SF in a single quarter may signal remote-work-driven footprint reductions that won't reverse. Treating it as a one-time blip without further diligence is precisely the underwriting risk.",
    },
  ],
  takeaway:
    "Gross absorption and net absorption measure different things. Gross counts new leasing; net subtracts space returned. In markets with downsizing or relocation, gross can look healthy while the vacancy rate is quietly rising. Always use net absorption as the primary market health indicator.",
  tips: [
    "Net absorption = newly occupied SF − vacated SF; positive = market tightening.",
    "Negative net absorption alongside positive gross signals tenant churn, not demand growth.",
    "Office markets post-2020 often show persistently negative net absorption even in 'active' leasing quarters.",
  ],
};
