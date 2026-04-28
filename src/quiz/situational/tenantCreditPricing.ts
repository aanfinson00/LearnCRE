import type { SituationalCase } from '../../types/situational';

export const tenantCreditPricing: SituationalCase = {
  id: 'tenant-credit-pricing',
  title: 'How much should credit compress the cap?',
  category: 'pricing',
  difficulty: 'advanced',
  assetClass: 'industrial',
  scenario:
    'You\'re bidding on a single-tenant industrial distribution asset. The tenant is investment-grade rated (BBB+ from S&P), occupies 100% of the building, and has a 15-year remaining lease term with 2.5% annual escalations. Comparable trades for spec-grade or short-term-leased product are pricing at 6.0% caps in this submarket.',
  data: [
    { label: 'Tenant rating', value: 'BBB+ (IG)' },
    { label: 'Occupancy', value: '100% single-tenant' },
    { label: 'Lease term remaining', value: '15 years' },
    { label: 'Annual escalations', value: '2.5%' },
    { label: 'Spec-grade comp cap', value: '6.0%' },
  ],
  question: 'Where should this asset price?',
  options: [
    {
      label: '~50–100 bps tighter than spec-grade comps — the 15-year IG lease is essentially a corporate bond on real estate, so cap compression is real but bounded by the spread between IG corporate yields and CRE.',
      isBest: true,
      explanation:
        'IG-tenant single-tenant deals trade tighter than spec-grade because the income is bond-like: long-dated, contractual, low default probability. The compression is typically 50-100 bps depending on rating, term, and the gap between corporate-bond yields and prevailing cap rates. So at a 6.0% spec-grade cap, this asset prices at 5.0-5.5%. Tighter than that is reaching; wider is overlooking the credit.',
    },
    {
      label: 'Same 6.0% as spec-grade — the lease economics already include the credit and cap rates capture the asset, not the tenant.',
      isBest: false,
      explanation:
        'Misses how single-tenant pricing works in practice. Cap rates for single-tenant net-leased assets are heavily driven by tenant credit because the income stream IS the underwriting. Treating an IG-anchor 15-year lease the same as a 5-year spec-grade rollover materially underprices the certainty of the income.',
    },
    {
      label: '200+ bps tighter — IG-tenant on a 15-year lease should price like a corporate bond, in the 4% range.',
      isBest: false,
      explanation:
        'Overshoots. CRE doesn\'t trade fully to corporate-bond yields because there\'s residual risk: the building still needs to exist, be leasable, and retain land value at lease expiry. The compression is real but the floor is the underlying real estate value at exit, not the tenant credit. 200+ bps is more aggressive than what single-tenant net-lease specialists pay.',
    },
    {
      label: 'Wider than 6.0% — single-tenant deals carry binary risk (one departure = 100% vacant) that should *expand* the cap.',
      isBest: false,
      explanation:
        'Inverts the analysis. Single-tenant credit risk concentration is real, but it\'s offset (and then some) by lease term: a 15-year IG lease has very low departure probability over the underwriting horizon. The binary risk concern dominates *short-dated* single-tenant deals; on long IG, the income certainty wins.',
    },
  ],
  takeaway:
    'Single-tenant net-lease pricing is heavily a function of tenant credit + lease term. IG-anchor + long term = bond-like cash flow + cap compression. The compression is 50-100 bps for a typical IG, more for AAA / sovereign, less for low-IG. The floor is set by underlying real estate value, not by corporate yields.',
  tips: [
    'Single-tenant cap = base CRE cap − credit spread, bounded below by underlying RE value.',
    'IG: 50-100 bps tighter. Sovereign / AAA: 100-200 bps tighter. Sub-IG: spec-grade pricing.',
    'Watch for "rent roll mark-to-market" plays masked as IG cap compression — those are different stories.',
  ],
};
