import type { SituationalCase } from '../../types/situational';

export const hotelGopMarginDrop: SituationalCase = {
  id: 'hotel-gop-margin-drop',
  title: 'Hotel: GOP margin fell 600 bps YoY despite flat RevPAR — why?',
  category: 'diagnostic',
  difficulty: 'intermediate',
  roles: ['assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You manage a 180-key select-service hotel that closed last year at 54% GOP margin. This year RevPAR is essentially flat (+0.4%), but the trailing-12 GOP margin has dropped to 48%. Total revenue is $8.4M vs $8.3M last year. The GM reports no unusual one-time items. Labor is the largest cost line.",
  data: [
    { label: 'T-12 revenue', value: '$8.4M (+1.2% YoY)' },
    { label: 'RevPAR change', value: '+0.4% YoY' },
    { label: 'Prior-year GOP margin', value: '54%' },
    { label: 'Current GOP margin', value: '48%' },
    { label: 'GOP dollar change', value: '$4.48M → $4.03M (−$450k)' },
    { label: 'No unusual one-time items reported', value: '' },
  ],
  question:
    'What are the most likely drivers of the 600 bps margin compression, and what should you investigate first?',
  options: [
    {
      label:
        'Labor cost inflation is the primary suspect — wages grew faster than revenue in a flat RevPAR environment. Pull the labor cost % of revenue line (rooms, F&B, admin) vs prior year, check whether the property is over-staffed vs the brand productivity model, and review whether minimum wage increases or new union contract terms hit mid-year.',
      isBest: true,
      explanation:
        'In select-service hotels, labor is 35–45% of total revenue and the single largest controllable cost. When RevPAR is flat and GOP compresses 600 bps, labor inflation is the most common culprit — especially post-2022 when wage rates in hospitality have risen 8–15% and managers often absorbed it via margin rather than immediate rate action. The $450k GOP shortfall on $8.4M revenue implies ~5.4% of revenue "leaked." At a typical labor cost ratio of 38%, a 14% labor rate increase (realistic for 2023–2024) would explain most of the gap. First move: pull labor cost % vs prior year by department, then compare to the brand benchmark productivity model.',
    },
    {
      label:
        'The brand is overcharging on franchise and royalty fees — review the license agreement for fee escalators that triggered this year.',
      isBest: false,
      explanation:
        'Franchise fees (typically 5–6% of rooms revenue) are contractual and escalate slowly; a 600-bps margin swing from fees alone would require a fee increase of ~$500k on $8.4M revenue, which would be extraordinary. Fees are worth checking but are almost never the primary driver of sudden margin compression in a normal operating year.',
    },
    {
      label:
        'RevPAR is flat so the issue must be on the non-rooms revenue lines — investigate F&B losses and ancillary revenue shrinkage.',
      isBest: false,
      explanation:
        "F&B is a real lever, but select-service hotels often have minimal F&B operations (limited breakfast, no full restaurant), so F&B shrinkage typically can't account for 600 bps on total margin. For a 180-key select-service property, total F&B revenue might be $300–400k; losses there couldn't bridge a $450k GOP gap unless the department went deeply negative.",
    },
    {
      label:
        'The prior-year margin was unsustainably high — revert the underwriting to 48–50% as the new base without further investigation.',
      isBest: false,
      explanation:
        "Don't accept margin compression without understanding the cause. If labor costs are structurally higher, the new base might be 50%, and the right response is a revenue ramp-up plan to recover margin through ADR growth. But if it's a controllable staffing issue or a benefit cost that can be renegotiated, the prior margin is recoverable. 'Normalize and move on' without a root-cause analysis misses the asset management opportunity.",
    },
  ],
  takeaway:
    "Hotel GOP margin is primarily a labor story in select-service. When RevPAR is flat and margin compresses significantly, labor inflation (wage rates, benefit costs, over-staffing) is the default hypothesis before fees, F&B, or non-recurring items. Always decompose the margin bridge: revenue × margin = GOP dollars — then isolate which cost bucket moved. The 600-bps drop on flat revenue means the cost structure grew ~$450k, which points directly to a fixed-cost or semi-fixed labor line.",
  tips: [
    'GOP margin = (Total Revenue − Departmental Expenses − Undistributed Operating Expenses) / Total Revenue.',
    'Brand productivity benchmarks (rooms-per-occupied-room) are the right labor efficiency target, not prior-year actual.',
    'Always check whether mid-year union contract renewals or minimum wage increases hit — these are often not flagged by GMs as "one-time items" but are.',
  ],
};
