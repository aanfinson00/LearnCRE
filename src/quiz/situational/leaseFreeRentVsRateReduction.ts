import type { SituationalCase } from '../../types/situational';

export const leaseFreeRentVsRateReduction: SituationalCase = {
  id: 'lease-free-rent-vs-rate-reduction',
  title: 'Free rent vs. rent reduction — which concession is cheaper for the landlord?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A tenant is negotiating a 7-year lease at $30/SF/year face rent. They are asking for one of two concession packages: (A) 6 months free rent at the start of the lease, or (B) a permanent $2.50/SF/year rent reduction to $27.50/SF for the entire 7-year term. The landlord\'s cost of capital is 7%. There are no TIs in either scenario.',
  data: [
    { label: 'Face rent', value: '$30/SF/year' },
    { label: 'Lease term', value: '7 years' },
    { label: 'Option A', value: '6 months free rent (months 1–6)' },
    { label: 'Option B', value: '$2.50/SF/yr permanent reduction (7 yrs)' },
    { label: 'Discount rate', value: '7%' },
  ],
  question:
    'Which concession is less costly for the landlord, and how do you frame the comparison?',
  options: [
    {
      label:
        'Option A (free rent) is cheaper. PV of lost rent under A ≈ $14.50/SF (6 months × $30/SF discounted). PV of lost rent under B ≈ $13.25/SF per year × 7 yrs... wait — $2.50/yr × 7 yrs PV factor ≈ $14.40/SF. They\'re nearly equivalent in PV terms — but A is slightly better because the foregone rent is front-loaded and discounted more heavily, while B erodes every year at full face value.',
      isBest: false,
      explanation:
        "Close reasoning but the conclusion is inverted. Let's run the math: Option A: 6 months of $30/SF = $15/SF forgone, but months 1–6 are barely discounted (PV factor ~0.97–0.93) so PV of lost rent ≈ $14.45/SF. Option B: $2.50/yr × annuity factor at 7% for 7 yrs = $2.50 × 5.389 = $13.47/SF. Option B is actually CHEAPER in PV terms. The correct answer is B — even though it runs all 7 years, each year's $2.50 is discounted at increasing rates, while the free rent is lost in full almost immediately.",
    },
    {
      label:
        'Option B (permanent rate reduction) is cheaper in PV terms. $2.50/yr for 7 years at 7% = $2.50 × 5.389 = $13.47/SF of foregone income. Option A\'s 6-month free rent = $15/SF nominal, PV ≈ $14.45/SF — more costly because it\'s concentrated in the near term where discount is minimal.',
      isBest: true,
      explanation:
        "Correct. The 7-year annuity factor at 7% is 5.389, making Option B cost 2.50 × 5.389 = $13.47/SF in present value. Option A loses $15/SF nominal in months 1–6, which barely discounts (PV ≈ $14.45/SF). The permanence of Option B sounds worse but the math says otherwise — small, annual losses discounted over many years are less costly than a large, near-term loss. Note also that Option B reduces NOI permanently, which directly caps valuation; Option A creates a one-time dip but the asset stabilizes at full rent faster. Both effects matter — run both the PV-of-lost-cash and the impact-on-cap-rate-value side by side.",
    },
    {
      label:
        'Neither can be compared without knowing the tenant\'s credit — a weaker tenant with free rent is less risk than a strong tenant with a rate reduction.',
      isBest: false,
      explanation:
        "Tenant credit affects default risk, not the economics of the concession itself. The question asks about cost to the landlord, which is a discounted cash flow comparison independent of credit. Credit considerations affect how much concession is appropriate, but they don't change which structure is cheaper for a given concession amount.",
    },
    {
      label:
        'Always prefer the rate reduction — it shows up as a lower face rent and protects the comp base, which matters for your lease comps at renewal.',
      isBest: false,
      explanation:
        "The reasoning is backwards. Face rent comp integrity actually favors free rent (Option A), not rate reduction. Free rent keeps the face rent at $30/SF, which is what shows up in comp databases and in renewal negotiations. Option B structurally reduces the face rent to $27.50/SF, setting a lower comp for the next lease. From a comp-base-protection standpoint, A is better — though it's costlier in PV terms.",
    },
  ],
  takeaway:
    "Free rent and rate reductions are structurally different concessions even when their nominal dollar value is similar. Free rent is a near-term cash loss that discounts substantially and preserves face rent for comp purposes. A permanent rate reduction costs less in PV terms (small amounts discounted over many years) but sets a lower face rent and caps NOI permanently — affecting both the hold-period cash flows and the exit value. Always run the PV comparison side by side with the cap-rate impact. The right answer depends on your priorities: comp preservation (favor free rent) or per-dollar-efficiency (favor rate reduction).",
  tips: [
    "PV of free rent ≈ (monthly rent × free months) × discount factor ≈ close to face value if front-loaded.",
    "PV of rate reduction = annual δ × 7% annuity factor (7 yrs: 5.39, 5 yrs: 4.10, 10 yrs: 7.02).",
    "Free rent protects face rent comp base; rate reductions permanently anchor the rent level lower.",
  ],
};
