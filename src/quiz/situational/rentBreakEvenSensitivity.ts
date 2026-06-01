import type { SituationalCase } from '../../types/situational';

export const rentBreakEvenSensitivity: SituationalCase = {
  id: 'rent-break-even-sensitivity',
  title: 'Year 3 rollover: how far can rents fall before this office deal breaks?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'You are acquiring a Class-B office building for $50M at a 7.0% going-in cap (Year 1 NOI = $3,500,000). The 7-year hold requires a 7.0% unlevered IRR. NOI grows at 2.5%/year via embedded contractual rent bumps, and 40% of the building\'s NRA rolls in Year 3. The exit cap is 7.5%. If market rents decline and the rolling tenants renew below current rent, the 2.5%/year growth breaks. Your risk officer asks: at what level of Year 3 rent decline does the unlevered IRR drop below 7.0%?',
  data: [
    { label: 'Purchase price', value: '$50,000,000 (7.0% cap)' },
    { label: 'Year 1 NOI', value: '$3,500,000' },
    { label: 'NOI growth', value: '2.5%/yr (contractual bumps)' },
    { label: 'Year 3 rollover', value: '40% of NRA → ~40% of NOI at risk' },
    { label: 'Exit cap', value: '7.5% in Year 7' },
    { label: 'Target', value: '7.0% unlevered IRR' },
  ],
  question: 'What framework identifies the rent break-even on the Year 3 rollover?',
  options: [
    {
      label:
        'Trace the rent shock to exit value: the 40% rolling in Year 3 represents ~$1,400,000 of Year 3 NOI. If that space renews flat (no growth) instead of at +2.5%/yr, Year 3 NOI stays at roughly the same level as Year 2 NOI for that portion, and the shortfall compounds into Year 7. A rough estimate: flat renewal knocks ~$150–200k off Year 7 NOI, reducing exit proceeds by ~$2.0–2.7M at a 7.5% cap — just enough to break the 7.0% IRR. So the break-even is approximately flat renewal: rents can\'t fall at all on the rolling portion and keep the deal in-the-money.',
      isBest: true,
      explanation:
        'Year 3 NOI at 2.5%/yr = $3,500,000 × 1.025² = $3,674,000. The 40% rolling portion = ~$1,470,000. If that portion renews flat instead of at +2.5%/yr again, the Year 3 NOI shortfall is only ~$37k, but the compounding through Year 7 = ~$170–200k shortfall in Year 7 NOI. Exit proceeds fall by ~$170k ÷ 7.5% ≈ $2.3M. On a $50M unlevered investment over 7 years, that moves IRR by roughly 50–70 bps — right around the 7.0% threshold. The key insight: rollover risk flows directly into exit value, not just in-period cash flow, making it a double-counted risk at exit.',
    },
    {
      label:
        'As long as the tenant renews (any renewal), the unlevered IRR is protected because you retain occupancy.',
      isBest: false,
      explanation:
        'Occupancy alone does not protect NOI or exit proceeds. If the tenant renews at 10% below current rent, in-period NOI is lower and Year 7 NOI — which determines your exit value — is correspondingly lower. A building with 90% occupancy at below-market rents can underperform a building with 85% occupancy at market rents. Retention without pricing is not the goal.',
    },
    {
      label:
        'Focus only on the Year 7 exit cap. Rent sensitivity is a secondary driver.',
      isBest: false,
      explanation:
        'Year 7 exit NOI is the numerator in the exit cap formula; rent at rollover feeds directly into Year 7 NOI through the compounding growth model. Exit cap and in-place rent at exit are both primary drivers — they multiply together to determine exit proceeds. Treating rent sensitivity as secondary is how value-add office deals get over-estimated.',
    },
    {
      label:
        'Model the break-even by running the IRR at 0% rent growth across the board — that\'s the clean conservative case.',
      isBest: false,
      explanation:
        '0% rent growth across the board is a more severe shock than the question asks for — it stresses the 60% of the building that is NOT rolling, not just the 40% at risk. The break-even analysis requires isolating the rolling portion\'s sensitivity. Running a global 0% growth case overstates the risk and doesn\'t tell you where the marginal break-even rent level is.',
    },
  ],
  takeaway:
    'Rollover risk has two effects: it reduces in-period NOI AND reduces exit value, because Year-of-exit NOI is what drives the exit cap valuation. Tracing Year 3 renewal rents forward to Year 7 exit NOI is the right methodology. The break-even rent is often closer to flat renewal than most deal teams expect, because the compounding growth from rolling tenants is double-counted at exit.',
  tips: [
    'Build a simple table: (rent decline at rollover) × (% of NOI rolling) × (compounding years remaining) × (exit cap divisor) = impact on exit proceeds.',
    'Rollover in Year 1–2 is most dangerous: longest compounding tail to exit.',
    'Rollover in Year 6–7 is least dangerous for a 7-year hold: little time to compound, minimal exit impact.',
  ],
};
