import type { SituationalCase } from '../../types/situational';

export const cpiEscalationVsFixedBumps: SituationalCase = {
  id: 'cpi-escalation-vs-fixed-bumps',
  title: 'CPI escalation or fixed 3% bumps — which do you prefer?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're negotiating a new 10-year industrial lease at $12/SF starting rent. The tenant proposes CPI-linked escalation with a 0% floor and 5% cap (annual increase = CPI, subject to the range). Your standard lease template calls for a flat 3%/yr fixed escalation. Current CPI is running at 4.2%. Your lender has a stated preference for fixed escalation schedules. You need to advise on which structure to accept.",
  data: [
    { label: 'Starting rent', value: '$12/SF' },
    { label: 'Lease term', value: '10 years' },
    { label: 'Tenant proposal', value: 'CPI escalation (0% floor / 5% cap)' },
    { label: 'Landlord template', value: '3%/yr fixed' },
    { label: 'Current CPI', value: '4.2%' },
    { label: 'Historical CPI average (2000–2021)', value: '~2.1%' },
    { label: 'Lender preference', value: 'Fixed escalation schedules' },
  ],
  question: "How do you analyze the CPI proposal vs. fixed bumps, and what's your recommendation?",
  options: [
    {
      label: "Push for CPI with a 3% floor AND 5% cap — this protects you in low-inflation environments (where flat 3% CPI would underperform) while retaining the inflation upside. Pure CPI with a 0% floor is the tenant's ideal structure, not yours.",
      isBest: true,
      explanation:
        "The analysis has three dimensions. (1) Expected value: CPI averaged 2.1% in the US from 2000–2021, well below the 3% fixed bump. At that historical average, 3% fixed outperforms CPI materially over 10 years — year-10 rent of $16.12/SF (3% fixed) vs. $14.68/SF (2% CPI), a $1.44/SF gap. In the current 4%+ inflation environment, CPI wins — but inflation environments change within a 10-year lease term. (2) Variance: the tenant's proposed 0% floor means if CPI goes negative, rent is flat — landlord gets no growth. The 5% cap limits your upside in high inflation. Both provisions benefit the tenant. (3) Financing: lenders and appraisers prefer fixed schedules because they can underwrite the exact rent trajectory; CPI creates valuation uncertainty. The hybrid (3% floor / 5% cap) protects the downside while allowing inflation upside, and it's more financeable.",
    },
    {
      label: "Take the CPI proposal — inflation is likely to persist, and 4%+ escalation beats 3% fixed for the full term.",
      isBest: false,
      explanation:
        "Anchoring on current inflation projecting it forward for 10 years is a classic error. CPI averaged 2.1% from 2000–2021 and 1.8% from 2010–2019. If inflation normalizes mid-hold, pure CPI underperforms 3% fixed for multiple years — and you cannot renegotiate the escalation mechanism during the lease term. The 0% floor also means zero rent growth in deflationary periods. Accept the CPI structure only with a floor that protects your downside.",
    },
    {
      label: "Stay at 3% fixed — predictability is worth more than potential CPI outperformance.",
      isBest: false,
      explanation:
        "Predictability has real value (for financing, valuation, and NOI planning), but accepting 3% fixed without negotiating leaves upside on the table. The better move is to push for a CPI floor at 3% — capturing inflation upside while preserving the fixed-bump floor as a worst case. Simply accepting the template without exploring the hybrid structure is not optimal lease negotiation.",
    },
    {
      label: "The choice is marginal — over 10 years the difference between CPI and 3% fixed is less than 5% of total rent.",
      isBest: false,
      explanation:
        "Incorrect by a wide margin. At $12/SF: 10 years of 3% fixed → year-10 rent of $16.12/SF; 10 years of 2% CPI → $14.63/SF — a 10% difference in terminal rent per square foot. On a 300,000 SF lease, this compounds to hundreds of thousands of dollars annually at the end of the term, all of which is capitalized into the asset's exit value. Escalation structure is one of the highest-leverage variables in a lease negotiation.",
    },
  ],
  takeaway:
    "CPI escalation is a bet on sustained inflation; fixed bumps are a guaranteed minimum. The tenant's proposed structure (0% floor / 5% cap) benefits them across most scenarios: the 0% floor prevents negative scenarios and the 5% cap limits your upside. The landlord-optimal counter is CPI with a minimum floor (e.g., 3%) and a ceiling (5%): you keep the inflation upside while being guaranteed at least 3% growth. Always model the 10-year total rent trajectory under each structure before deciding.",
  tips: [
    'Model 10-yr total rent at CPI = 1.5%, 2.5%, and 4.0% to see the full scenario range.',
    'Lenders typically prefer fixed escalation for debt underwriting — confirm before accepting pure CPI.',
    '3% floor / 5% cap CPI is the industry compromise in inflationary environments; push for it as the counter-offer.',
  ],
};
