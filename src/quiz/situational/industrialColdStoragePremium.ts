import type { SituationalCase } from '../../types/situational';

export const industrialColdStoragePremium: SituationalCase = {
  id: 'industrial-cold-storage-premium',
  title: 'Industrial: cold-storage bid comes in at a 150-bps cap premium — do you accept?',
  category: 'pricing',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're marketing a 400,000 SF Class-A bulk distribution building for $52M (5.5% cap on stabilized NOI of $2.86M). A cold-storage operator submits a 15-year NNN lease at $9.50/SF (vs. $7.15/SF market for dry storage), which would push stabilized NOI to $3.80M. Your banker says the market cap rate for single-tenant cold-storage is 7.0–7.5%, not 5.5%. At 7.25% cap on cold-storage NOI, the property value would be $52.4M — barely above your existing ask.",
  data: [
    { label: 'Building', value: '400,000 SF Class-A bulk distribution' },
    { label: 'Current ask', value: '$52M at 5.5% cap' },
    { label: 'Stabilized NOI (dry)', value: '$2.86M ($7.15/SF NNN)' },
    { label: 'Cold-storage rent offer', value: '$9.50/SF NNN (15-year NNN)' },
    { label: 'Cold-storage NOI', value: '$3.80M' },
    { label: 'Market cap rate (dry)', value: '5.5%' },
    { label: 'Market cap rate (cold)', value: '7.0–7.5%' },
  ],
  question: 'Should you accept the cold-storage lease, and how does it affect asset value and future exit?',
  options: [
    {
      label:
        "Accepting the cold-storage lease is probably value-neutral or slightly positive at close but significantly restricts your exit options. At 7.25% cap, value is $3.80M / 0.0725 = $52.4M — barely above dry-storage value. But cold storage requires $15–25M of tenant TI (refrigeration systems, insulated panels, ammonia lines) that the tenant installs, which converts the building to a single-use asset. Future buyers must either be cold-storage operators or underwrite an expensive conversion back to dry. The 150-bps cap premium reflects permanent illiquidity. Accept only if you plan to hold to lease expiry or are certain of cold-storage buyer depth in your submarket.",
      isBest: true,
      explanation:
        "The capital math: $3.80M NOI at 7.25% cap = $52.4M value — a $400k premium over the $52M dry-storage ask. That's a 0.8% value increment for accepting a fundamentally less liquid asset. The cold-storage cap premium (150 bps here) reflects: (1) smaller buyer pool — cold-storage operators and specialty REITs, not the full industrial buyer universe; (2) single-use conversion — once ammonia systems and refrigerated docks are installed, reconversion costs are $10–20/SF; (3) longer hold risk — if the cold-storage tenant vacates, you face both re-leasing and conversion costs simultaneously. On a 15-year lease to a strong operator, the cash flow is excellent — but the exit value 15 years from now is subject to cold-storage cap rate conditions, not the tight dry-storage market.",
    },
    {
      label:
        'Accept immediately — $9.50/SF NNN on a 15-year NNN lease is exceptional income, and NOI is 33% higher.',
      isBest: false,
      explanation:
        "Higher NOI is real but the cap rate expansion more than offsets it for value purposes. $3.80M at 7.25% vs $2.86M at 5.5% — the cold-storage value ($52.4M) barely exceeds the dry-storage value ($52M) despite 33% higher NOI. This is the fundamental cold-storage pricing paradox: the income is better but the illiquidity discount keeps the value flat. Accepting for 'exceptional income' without accounting for the cap rate expansion and exit illiquidity is an analytical error.",
    },
    {
      label:
        'Reject it — cold storage creates irreversible conversion costs that destroy resale value.',
      isBest: false,
      explanation:
        "Too categorical. The irreversibility risk is real but 'destroys resale value' overstates it. If cold-storage cap rates remain at 7–7.5% and the operator performs, the asset value at exit will reflect cold-storage NOI at cold-storage cap rates — which may be fine for a long-term hold. The right answer is contextual: reject if your investor base needs liquidity before lease expiry or if cold-storage buyers are thin in your market; accept if you're a long-duration holder comfortable with specialty buyer pool risk.",
    },
    {
      label:
        'Re-price the dry-storage ask to match cold-storage value and force the dry market to bid up to $52.4M.',
      isBest: false,
      explanation:
        "Misunderstands cap rate mechanics. You can't force dry-storage buyers to pay $52.4M just because a cold-storage operator would pay that. Dry-storage buyers will underwrite to dry-storage NOI ($2.86M) at dry-storage cap rates (5.5%) = $52M. Your options are $52M from dry buyers or $52.4M from the cold-storage operator — not $52.4M from dry buyers.",
    },
  ],
  takeaway:
    "Cold-storage leases are a classic high-income / low-value-creation trap: the rent premium is real but the cap rate discount erodes most of it into a value that's roughly equivalent to dry storage. The real risk is illiquidity at exit — a converted cold-storage asset trades to a narrow buyer pool at a wider cap rate, exposing the hold to cold-storage-specific market conditions rather than the broad industrial market. Underwrite both scenarios (dry vs. cold) on an NPV basis over the hold period before deciding.",
  tips: [
    'Cold-storage cap rates typically run 100–175 bps wider than dry-storage in the same submarket.',
    "Tenant cold-storage TI ($15–25/SF for refrigerated panels + mechanical) is expensive to remove — factor reconversion cost into exit underwriting.",
    'Specialty industrial buyers (cold, auto, data) create excellent in-place cash flow but narrow buyer pools. Know your LP base\'s liquidity needs before committing.',
  ],
};
