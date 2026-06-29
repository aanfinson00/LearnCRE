import type { SituationalCase } from '../../types/situational';

export const fixedVsCpiRentBumps: SituationalCase = {
  id: 'fixed-vs-cpi-rent-bumps',
  title: 'Fixed 3% bumps vs CPI-linked — which is better for the landlord?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You\'re negotiating a 10-year industrial lease at $8.00/SF starting rent. The tenant offers two escalation structures: (A) 3% fixed annual bumps, or (B) CPI-linked bumps with a 1.5% floor and 4.0% cap. Trailing 10-year CPI has averaged 2.8% per year. Current 10-year CPI expectations implied by TIPS breakevens are approximately 2.5%.',
  data: [
    { label: 'Starting rent', value: '$8.00/SF' },
    { label: 'Lease term', value: '10 years' },
    { label: 'Option A', value: '3% fixed annual bumps' },
    { label: 'Option B', value: 'CPI-linked: 1.5% floor, 4.0% cap' },
    { label: 'Trailing 10-yr CPI', value: '2.8%/yr average' },
    { label: 'Forward CPI expectation (TIPS)', value: '~2.5%/yr' },
  ],
  question: 'Which escalation structure produces better economics for the landlord over the 10-year term?',
  options: [
    {
      label: 'Option A (3% fixed) is better for the landlord in the base case. At 2.5–2.8% expected CPI, fixed 3% bumps exceed expected inflation every year. The CPI structure only outperforms if actual CPI exceeds 3% — possible but not the consensus forecast.',
      isBest: true,
      explanation:
        'At 3% fixed: year-10 rent = $8.00 × (1.03)^9 ≈ $10.43/SF. At 2.5% CPI: year-10 rent = $8.00 × (1.025)^9 ≈ $9.97/SF. At 2.8% CPI: year-10 rent = $8.00 × (1.028)^9 ≈ $10.26/SF — still below the 3% fixed path. Fixed bumps outperform whenever actual CPI < 3%, which is the base case. The CPI floor (1.5%) protects the landlord against deflation — valuable in a tail scenario — but the cap (4.0%) limits upside in a high-inflation scenario, which is precisely when CPI-linked would be most favorable. In the base case, Option A wins by a meaningful compound margin.',
    },
    {
      label: 'Option B (CPI-linked) is better — it protects the landlord against unexpected inflation and the floor prevents rent from declining.',
      isBest: false,
      explanation:
        'Correct that CPI-linked protects against inflation spikes, but wrong about which side of the expected-return tradeoff is more likely. Under expected CPI of 2.5%, fixed 3% bumps produce higher rent every single year. The CPI structure only beats fixed if CPI > 3% — not the base case. The floor matters only if CPI < 1.5%, which is also not the base case.',
    },
    {
      label: 'They\'re equivalent — 2.8% CPI is close enough to 3% that the difference is immaterial over 10 years.',
      isBest: false,
      explanation:
        'Compounding makes small differences material. A 20 bps difference compounded over 9 years on $8.00/SF produces a $0.17/SF difference at year 10. On a 50,000 SF lease, that\'s $8,500/yr of NOI at the end of the term — not immaterial. "Close enough" reasoning ignores the direction and consistency of the compounding effect.',
    },
    {
      label: 'Option B is better because the 4% cap creates upside for the landlord in high-inflation environments.',
      isBest: false,
      explanation:
        'This misreads the cap. The 4% cap is a ceiling that limits how high CPI bumps can go — it protects the TENANT against extreme inflation, not the landlord. The landlord\'s upside under CPI-linked is to receive CPI bumps up to 4%; above that, the landlord is capped. Fixed 3% is not capped at all — it delivers exactly 3% regardless of inflation environment.',
    },
  ],
  takeaway:
    'Fixed bumps vs. CPI-linked is a bet on future inflation relative to the fixed rate. If the fixed rate exceeds expected CPI, fixed bumps are better for the landlord in the base case. CPI-linked is a hedge against an inflation spike — valuable, but at the cost of trailing the fixed rate when inflation stays moderate. Know which scenario you\'re underwriting.',
  tips: [
    'Rule of thumb: if fixed > expected CPI, landlord prefers fixed; if fixed < expected CPI, landlord prefers CPI.',
    'CPI floor protects landlord against deflation; CPI cap protects TENANT against hyperinflation — know which side each collar is on.',
    'In multi-tenant buildings, mixing bump structures complicates NOI modeling — standardize where possible.',
  ],
};
