import type { SituationalCase } from '../../types/situational';

export const renewalOptionBelowMarket: SituationalCase = {
  id: 'renewal-option-below-market',
  title: "Tenant's below-market renewal option: accept or push back?",
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "You've acquired an office building and are underwriting year 4, when your anchor tenant (25,000 SF, 30% of GLA) has a renewal option. The option gives them the right to renew for 5 years at $28/SF NNN — 20% below current market rent of $35/SF. Market rent has been growing at 3%/year; by year 4, market rent will be approximately $38.50/SF. The tenant has invested $80/SF in their own improvements above the landlord's TI allowance. Their option is exercisable at their sole discretion with 12 months' notice.",
  data: [
    { label: 'Tenant space', value: '25,000 SF (30% of building)' },
    { label: 'Option rent', value: '$28/SF NNN' },
    { label: 'Current market rent', value: '$35/SF NNN' },
    { label: 'Market rent at Year 4 (3%/yr growth)', value: '~$38.50/SF' },
    { label: 'Discount to market (Year 4)', value: '~27%' },
    { label: 'Tenant\'s own improvements', value: '$80/SF above landlord TI' },
    { label: 'Option notice requirement', value: '12 months prior' },
  ],
  question:
    "How do you underwrite the renewal option risk, and what's the value impact of the option being exercised versus the tenant vacating?",
  options: [
    {
      label:
        "Model two scenarios with probability weights: (1) 70% probability option is exercised at $28/SF — tenant's $80/SF in improvements is 2–3 years of rent spread at the option rate, making exercise highly rational; (2) 30% probability tenant vacates — underwrite 18 months of downtime, $50/SF new TI, and replacement rent at $38.50/SF market. The blended cap-rate impact of the option is roughly $10.50/SF/yr income haircut on 25,000 SF for 5 years. At a 6.5% cap rate, that's ~$4M of value erosion. Factor this into your bid.",
      isBest: true,
      explanation:
        "Correct framework. Option rationality analysis: the tenant spent $80/SF above the landlord's TI, which amortizes over their lease. At $28/SF option rent vs $38.50/SF market, they save $10.50/SF/year — $262,500/year, or $1.3M over 5 years in PV terms. Their fit-out investment effectively anchors them. Probability-weighted value modeling is the right approach; a 70% exercise probability is conservative but defensible. The $4M value haircut at a 6.5% cap is the real number to put in front of the IC.",
    },
    {
      label:
        "Assume the option is exercised with 100% certainty and underwrite 5 years at $28/SF — the $80/SF tenant investment is a strong anchor signal and the option is clearly in the money.",
      isBest: false,
      explanation:
        "100% probability is too strong. Even deeply in-the-money options aren't always exercised — businesses pivot, companies downsize, or acquirers dictate space rationalization. A more rigorous approach probability-weights the outcome. Additionally, by fixing the assumption at 100% exercise, you lose the ability to show the IC the upside case where the tenant vacates and you replace at market. Probability-weighted modeling also gives you a framework for negotiating with the seller on pricing.",
    },
    {
      label:
        "The tenant's $80/SF investment is a sunk cost — they'll make the renewal decision based on future rent savings, not past investment. Treat the option as 50/50.",
      isBest: false,
      explanation:
        "The sunk-cost logic is correct in theory but wrong in practice for real estate tenants. In CRE, tenant improvements are almost always highly idiosyncratic (custom finishes, specialized mechanical, etc.) and largely non-recoverable. A tenant weighing relocation must budget $60-120/SF in new TI for comparable space — the implicit cost of not exercising is not just the rent spread but also the relocation capital. This makes exercise more rational than a sunk-cost framing suggests. 50/50 understimates the true exercise probability.",
    },
    {
      label:
        "Underwrite the option as a vacancy event — it's a risk that depresses cap-rate value and you should discount the building to account for potential loss of the tenant at market rent.",
      isBest: false,
      explanation:
        "This conflates the two scenarios. If the option is exercised, the tenant stays but at below-market rent. If the option is not exercised, the tenant may vacate — which is a value-add opportunity to re-lease at $38.50/SF. The renewal option risk is *income compression* (exercise scenario), not necessarily vacancy. Treating it as a vacancy event misunderstands the mechanics: exercise = tenant stays at $28/SF; non-exercise = tenant vacates, potential upside at market.",
    },
  ],
  takeaway:
    'Below-market renewal options are acquisition pricing events, not abstract risks. Quantify: (1) the probability of exercise using tenant investment anchor, rent discount depth, and business condition; (2) the income haircut if exercised (spread × SF × term) and its cap-rate value impact; (3) the downtime and re-leasing cost if the tenant vacates instead. Probability-weight the two scenarios and build this into your bid price. The key insight: a large tenant with deep custom improvements is very likely to exercise an option 20%+ in the money.',
  tips: [
    'Rule of thumb: option exercise probability rises sharply when option rent is > 15% below market and tenant has > $50/SF in non-recoverable improvements.',
    'A 1-year notice requirement is a long look-ahead — tenants often decide earlier, which gives you negotiating window to buy out the option before it\'s formally exercised.',
    'Buying out a renewal option can be cheaper than the 5-year income haircut: offer a one-time payment and a new market-rate lease. Quantify both paths.',
    'Below-market options show up in rent roll analysis — always reconcile option rents vs. current market in any acquisition rent roll review.',
  ],
};
