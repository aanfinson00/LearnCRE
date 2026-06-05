import type { SituationalCase } from '../../types/situational';

export const leaseRenewalLeverage: SituationalCase = {
  id: 'lease-renewal-leverage',
  title: 'Your tenant wants to renew — how do you assess your leverage?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "A 12,500 SF office tenant at $42/SF gross is expiring in 9 months. They've submitted an LOI to renew at $38/SF with a $75/SF TI allowance and 3 months free rent. Current market rents for comparable space in the building are $43-$45/SF; TI packages for new office leases in the building are running $60-$70/SF. The tenant has occupied the space for 8 years, has done significant custom build-out, and the CEO lives 2 miles from the building.",
  data: [
    { label: 'Space', value: '12,500 SF' },
    { label: 'Current rent', value: '$42/SF gross' },
    { label: "Tenant's ask", value: '$38/SF, $75/SF TI, 3 mos free' },
    { label: 'Market rents', value: '$43–$45/SF' },
    { label: 'Market TI (new leases)', value: '$60–$70/SF' },
    { label: 'Tenant tenure', value: '8 years, significant prior build-out' },
    { label: 'Expiry', value: '9 months' },
  ],
  question: "How do you assess your leverage in this renewal negotiation?",
  options: [
    {
      label:
        "You have meaningful leverage: the tenant is asking below-market on rent, above-market on TI for a renewal, and has high switching costs (8-yr custom build-out, CEO proximity, staff commute anchoring). Counter at $43/SF with $40-$50/SF refresh TI and no free rent — retention TI is typically 40-60% of new-lease TI because the tenant's existing build-out absorbs the majority of the landlord's capital requirement.",
      isBest: true,
      explanation:
        "Renewal economics differ from new-lease economics. Retention TI is typically 40-60% of new-lease TI because the tenant's existing, custom build-out reduces the landlord's capital requirement substantially. The tenant's $75/SF TI ask applies new-lease math to a renewal situation — incorrect. The landlord's BATNA: re-lease at $43/SF to a new tenant with 6-12 months of downtime, $65/SF TI, and 3 months free rent. NPV of that scenario vs. renewing the existing tenant at $43/SF with $45/SF TI is actually close — but the vacancy risk tips the balance toward retaining the tenant at market rent. The tenant's switching cost (abandoning a custom build-out, staff disruption, CEO proximity) is real and material, and is the source of the landlord's leverage.",
    },
    {
      label:
        "Give the tenant what they want — the cost of losing them and re-leasing is always higher than a rent concession.",
      isBest: false,
      explanation:
        "This anchors on tenant retention fear without running the math. The tenant is asking $4/SF below market on a 12,500 SF space = $50k/yr revenue loss; the $75/SF TI (vs market $65/SF) is a $125k premium. Over a 5-year renewal, the combined NPV giveaway is over $300k. The re-leasing cost is real, but so is the landlord's leverage from above-market pricing power. Running the BATNA math first tells you whether capitulating or negotiating is the better outcome.",
    },
    {
      label:
        "The tenant has all the leverage — in-place tenants can demand above-market terms because vacancy risk is too high.",
      isBest: false,
      explanation:
        "In-place tenants have leverage, but it's bounded by their own switching cost and the landlord's re-leasing prospects. A tenant who has spent $150/SF on a custom build-out won't move over a $5/SF rent difference. The landlord's leverage = the tenant's cost to relocate (custom build-out abandoned, staff disruption, new-space search, CEO relocation). When switching costs are high and market rents are above the tenant's ask, the landlord should negotiate firmly, not capitulate.",
    },
    {
      label:
        "Market rent and TI are the only relevant benchmarks — ignore the existing build-out and negotiate purely off market comps.",
      isBest: false,
      explanation:
        "Retention TI is explicitly different from new-lease TI because the existing build-out has residual value. Applying new-lease TI benchmarks to a renewal ignores the most important variable in renewal economics: the portion of the landlord's typical capital requirement that is already in place. Good asset managers quantify the build-out replacement cost ($80-150/SF for custom office) and subtract it from new-lease TI norms to arrive at a defensible retention TI budget.",
    },
  ],
  takeaway:
    "Renewal leverage analysis requires comparing the landlord's re-leasing cost against the tenant's switching cost. Retention TI is 40-60% of new-lease TI because the tenant's existing build-out absorbs most of the capital requirement. When market rent is above the tenant's ask and switching costs are high, the landlord can negotiate firmly toward market — capitulating without running the BATNA math leaves money on the table.",
  tips: [
    "Retention TI rule of thumb: 40-60% of new-lease TI, reflecting the tenant's existing build-out reducing the landlord's required spend.",
    "Tenant switching cost = new TI + moving cost + productivity loss + staff retention risk + any lease overlap.",
    "Always model the re-leasing scenario before negotiating a renewal — you need to know your BATNA before you can use your leverage.",
  ],
};
