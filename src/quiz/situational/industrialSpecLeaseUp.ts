import type { SituationalCase } from '../../types/situational';

export const industrialSpecLeaseUp: SituationalCase = {
  id: 'industrial-spec-lease-up',
  title: 'How long until your spec industrial deal reaches stabilization?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    "You're buying a speculative 500,000 SF Class-A distribution center that delivered vacant 4 months ago. The submarket has 3.2M SF of total inventory and currently sits at 8% vacancy (256,000 SF available). Three other spec buildings delivered in the past 12 months, adding 900,000 SF. Historical quarterly net absorption has averaged 120,000 SF, but the past two quarters have come in at 60,000 SF. Your lender requires 90% occupancy (450,000 SF leased) to convert from the construction loan to a permanent loan.",
  data: [
    { label: 'Subject building', value: '500,000 SF, 0% leased' },
    { label: 'Submarket inventory', value: '3.2M SF (8% vacancy = 256k SF)' },
    { label: 'Recent spec deliveries', value: '+900,000 SF in past 12 months' },
    { label: 'Historical absorption', value: '120,000 SF/quarter' },
    { label: 'Recent absorption (2 qtrs)', value: '60,000 SF/quarter' },
    { label: 'Perm loan trigger', value: '90% occupancy (450,000 SF)' },
  ],
  question:
    'How do you underwrite the lease-up timeline, and what absorption pace should you use?',
  options: [
    {
      label:
        "Use the recent 60k SF/quarter pace — the supply wave has clearly outrun demand — and add your 500k SF to the 256k SF already on the market. At 60k SF/quarter, clearing the combined 756k SF to near-zero vacancy takes 12+ quarters, but your building only needs 450k SF leased (90%), which suggests a 7–8 quarter timeline if you capture pro-rata share. Flag this as a thin underwrite given the perm-loan timing.",
      isBest: true,
      explanation:
        "The market signal is clear: three spec deliveries totaling 900k SF in 12 months while absorption has halved from 120k to 60k SF/quarter. This is a classic supply-overhang cycle. Using the historical 120k SF pace would be aggressive — that rate existed BEFORE the supply wave. The cautious underwrite uses the degraded pace. Your building competes with ~756k SF of available space for 60k SF/quarter of demand. Pro-rata share: ~500k / 756k × 60k = ~40k SF/quarter absorbed into your building, meaning 450k SF leased takes ~11 quarters. Even at an optimistic share capture, this is a 6–8 quarter lease-up. If the perm loan converts in 24 months, you need a downside case to show lender covenant compliance risk.",
    },
    {
      label:
        "Use the historical 120k SF/quarter pace — two quarters of slowdown isn't a trend.",
      isBest: false,
      explanation:
        "Two consecutive quarters of 50% lower absorption right after a large supply wave is a trend, not noise. The supply-demand imbalance is visible in the data and supported by the fundamental: 900k SF delivered vs. 480k SF absorbed in the same period means you're in oversupply. Using the pre-wave absorption pace systematically overstates lease-up speed and will make the deal look more attractive than it is.",
    },
    {
      label:
        "Model 100% occupancy at delivery since spec buildings in this submarket have always leased within 18 months.",
      isBest: false,
      explanation:
        'Historical lease-up performance is not forward-looking when supply conditions have changed materially. The \"always leases in 18 months\" observation covers a period before the spec wave. Now the available inventory is 4× the quarterly absorption pace. Underwriting to historical performance when market conditions have structurally shifted is one of the most common spec development errors.',
    },
    {
      label:
        "The lender requirement doesn't matter for underwriting — focus on the 5-year hold IRR, not the conversion trigger.",
      isBest: false,
      explanation:
        "The perm loan conversion is directly tied to IRR: if you can't convert in time, you carry higher construction loan costs (typically L+300–500 bps vs. perm at L+150–250 bps) and risk a maturity default. The lender's threshold IS a critical underwriting variable — missing it extends your carry cost and compresses returns, potentially below your hurdle.",
    },
  ],
  takeaway:
    'Spec industrial lease-up underwriting has two absorption rates: the historical pace (what the market absorbed before your deal) and the current pace (what demand looks like given current supply). When a supply wave is active, use the current degraded pace and flag the divergence. Layer pro-rata market-share logic: your building captures absorption proportional to its share of available SF unless you have a differentiated product story. Always tie lease-up timing to debt milestones — perm conversion, maturity dates, and covenant tests are the real consequences of being wrong on absorption.',
  tips: [
    'Pro-rata absorption: your building\'s share ≈ (your vacancy ÷ total market vacancy) × market absorption pace.',
    'If absorption has dropped 50% after a supply wave, the market is in oversupply until the wave clears.',
    'Perm loan trigger dates create hard deadlines — absorption risk becomes a debt risk if timing slips.',
  ],
};
