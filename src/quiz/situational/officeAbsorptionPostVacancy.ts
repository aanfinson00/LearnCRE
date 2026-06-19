import type { SituationalCase } from '../../types/situational';

export const officeAbsorptionPostVacancy: SituationalCase = {
  id: 'office-absorption-post-vacancy',
  title: 'Large tenant vacates — how long until the block is re-leased?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    "You're underwriting a 400,000 SF suburban office campus. The anchor tenant (120,000 SF, 30% of the building) has given notice that they will vacate at lease expiration in 6 months. The submarket has 2.8 million SF of total inventory at 18% vacancy — 504,000 SF directly available. Net absorption over the last four quarters has been +40,000 SF, +25,000 SF, -15,000 SF, and +30,000 SF (trailing average: ~+20,000 SF/quarter). No new supply is under construction. Your 120,000 SF block will be the largest contiguous availability in the submarket at delivery.",
  data: [
    { label: 'Vacant block', value: '120,000 SF' },
    { label: 'Submarket inventory', value: '2.8M SF' },
    { label: 'Current vacancy', value: '18% (504,000 SF)' },
    { label: 'Net absorption (TTM)', value: '+80,000 SF total / +20,000 SF avg per quarter' },
    { label: 'New supply pipeline', value: 'None' },
    { label: 'Lease expiry', value: '6 months' },
  ],
  question:
    'Using trailing absorption as a baseline, roughly how long should you underwrite to re-stabilize the 120,000 SF block after it goes vacant?',
  options: [
    {
      label:
        'At least 18–24 months from vacancy delivery — the 120,000 SF block represents 6 quarters of average net absorption, and large-block suburban office leases typically carry 12–18 months of free rent + TI negotiation time on top of the physical re-leasing period. More conservative underwriting would push to 24–36 months.',
      isBest: true,
      explanation:
        'Right math, right framing. Net absorption at +20,000 SF/quarter means the submarket clears about 80,000 SF per year. The 120,000 SF block alone equals 1.5 years of absorption at that pace — and that assumes the entire submarket absorption lands in this one building (it won\'t). Large-block contiguous space in suburban markets is the hardest to lease; 18–24 months of downtime is realistic, 24–36 months is not unreasonable. The trailing absorption is also volatile (+40k, +25k, -15k, +30k), so using the average overstates confidence.',
    },
    {
      label:
        'About 6 months — the submarket has a strong 18% vacancy rate and absorption is positive. Large tenants shop ahead of their lease expirations, so a new tenant will likely be in the building before the incumbent leaves.',
      isBest: false,
      explanation:
        '18% vacancy is high for office (healthy is typically 8–12%); positive absorption in a high-vacancy market means the market is recovering, not tight. The claim that "large tenants shop early" is true but cuts both ways — they also have leverage to negotiate deep concessions and take time. 6-month stabilization on a 120,000 SF suburban office block after expiration is extremely optimistic and would require a pre-signed replacement tenant, which is not indicated in the scenario.',
    },
    {
      label:
        'About 12 months — take the 120,000 SF block and divide by quarterly absorption of 20,000 SF for 6 quarters, but offset by 1 quarter since leasing often precedes vacancy.',
      isBest: false,
      explanation:
        'Misapplies the absorption math. The quarterly absorption figure is for the *entire submarket*, not a single building. Assuming 100% of submarket absorption flows to your block overstates the realistic leasing pace. Additionally, subtracting one quarter for "early leasing" isn\'t supported — if anything, a large block in a high-vacancy market typically takes longer per SF than the submarket average because large users are scarce.',
    },
    {
      label:
        'You cannot estimate re-leasing time from absorption data alone — you need to know the number of active 100,000+ SF requirements in the submarket, which absorption data doesn\'t capture.',
      isBest: false,
      explanation:
        'Partially correct but unhelpfully defeatist. Broker requirement data is helpful context, but underwriters do use trailing absorption as a primary calibration tool for re-leasing timelines when requirement data is unavailable. The absorption figures give you a structural baseline; overlay requirement data when available. Refusing to estimate is not a viable response in an acquisition underwriting context.',
    },
  ],
  takeaway:
    'Re-leasing timelines for large contiguous blocks are calibrated against submarket net absorption pace, not days-on-market statistics. The key traps: (1) applying submarket-wide absorption as if it all flows to your building, (2) using the trailing average without noting its volatility, and (3) omitting concession timelines (free rent, TI build-out). For large-block suburban office, 18–36 months of downtime is the realistic range in a 15–20% vacancy submarket.',
  tips: [
    'Net absorption ÷ 4 = quarterly pace. Divide the vacant SF by quarterly pace for a raw re-leasing duration — but treat it as a floor, not a ceiling.',
    'In high-vacancy markets, large users have leverage. Budget deep TIs ($60–100/SF suburban office) and 12–24 months of free rent.',
    'Check for large-block precedents in the submarket — if no >75,000 SF deal has closed in 3 years, that\'s a red flag for your stabilization assumptions.',
    'Rolling 4-quarter absorption with high variance signals a lumpy market driven by one-off deals, not steady demand — widen your range accordingly.',
  ],
};
