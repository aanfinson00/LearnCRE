import type { SituationalCase } from '../../types/situational';

export const industrialTruckCourtBid: SituationalCase = {
  id: 'industrial-truck-court-bid',
  title: 'Industrial: defend a higher $/SF bid on a wider truck court',
  category: 'pricing',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're in best-and-final on a 500,000 SF Class A logistics facility (32' clear, ESFR sprinklers, 60 dock doors). A competing bidder is at $135/SF; you're at $145/SF — 7% higher. The asset has a 200' deep truck court; the comp set in the submarket averages 130'. Your in-place rent is 15% below the comp set's market rent, and you've underwritten an 18-month rollover to market on lease expiration in year 3. The seller's broker is asking why you're paying 7% above the competing bid when in-place rent is below market.",
  data: [
    { label: 'Building', value: '500,000 SF Class A' },
    { label: 'Clear height', value: "32'" },
    { label: 'Truck court depth', value: "200' (vs 130' submarket avg)" },
    { label: 'Dock doors', value: '60' },
    { label: 'Your bid', value: '$145/SF ($72.5M)' },
    { label: 'Competing bid', value: '$135/SF ($67.5M)' },
    { label: 'In-place vs market rent', value: '-15%' },
    { label: 'Lease expiry', value: 'Year 3' },
  ],
  question:
    "Defend the 7% premium in your bid letter to the seller. What does the truck court depth actually buy you, and how does it pencil?",
  options: [
    {
      label:
        "The 200' truck court is the structural reason this asset commands a $/SF premium and a tighter cap rate at exit — modern e-commerce and 3PL tenants need 185'+ for tractor-trailer staging and through-flow loading; sub-150' courts cap your tenant pool at LTL and regional distribution. The 70' of incremental court is the difference between a 5.0% and 5.5% exit cap on stabilization and supports a $5/SF rent premium at rollover. Even haircut for execution risk, that earns the 7% bid premium against the comp.",
      isBest: true,
      explanation:
        "Right thesis. Modern industrial pricing is increasingly bifurcated by physical specs — 32'+ clear is table stakes for big-box, but truck-court depth has become the binding constraint for e-commerce / large 3PL tenants who need trailer drop-yards. 200' is materially superior to 130' (the latter caps you at LTL / parcel users). At exit, that physical-spec premium translates into 25-50 bps of cap compression and 5-10% of rent premium on rollover — over 5 years the math earns the 7% bid premium. Strong defenses tie a physical attribute to a specific cap-spread / rent-spread number.",
    },
    {
      label:
        "The truck court is a nice-to-have but doesn't justify a 7% bid premium when in-place rent is below market — the rollover upside in year 3 (15% mark-to-market) is what really earns the bid, and that's available to the competing bidder too.",
      isBest: false,
      explanation:
        "Misses the structural argument. The mark-to-market upside is shared with the competing bidder by definition — it's not a differentiator. The truck-court depth IS the differentiator: it expands the tenant pool at rollover (e-commerce / 3PL), which translates into both *higher* market rent at rollover (your $-15% gap is wider than the comp underwriting realizes) and a tighter exit cap. Physical specs that gate the tenant pool are how you justify $/SF premiums in best-and-final.",
    },
    {
      label:
        "200' vs 130' is a 70' difference — not material at this asset size. The bid premium has to come from the rent mark-to-market, which depends on submarket vacancy and concession pace at rollover.",
      isBest: false,
      explanation:
        "Industrial brokers and tenants treat truck-court depth as a binary spec floor, not a smooth gradient — there are tenant categories (large-box e-commerce, big-rig 3PL) that need 185'+ and won't sign at 130'. 70' isn't 'just' a length difference; it's a tenant-category boundary. The pricing gap is real and asymmetric.",
    },
    {
      label:
        'You should match the competing bid at $135/SF — paying 7% more on a single physical attribute is overpaying when you could deploy the spread elsewhere.',
      isBest: false,
      explanation:
        "Mathematically not the right call if the 200' court genuinely earns 25-50 bps of exit cap compression — at $145/SF and a 25 bps cap improvement on $4M stabilized NOI, you're picking up $4-8M of stabilized value vs the lower bid. The discipline is to know which physical specs translate into cap / rent premia and price accordingly; matching at $135/SF concedes structural alpha to the seller (or to the competing bidder).",
    },
  ],
  takeaway:
    "Industrial pricing is increasingly driven by physical specs that gate the tenant pool — clear height ≥ 32', truck-court depth ≥ 185', ESFR sprinklers, and adequate dock-to-SF ratio. Each of these specs has a binary or near-binary effect on which tenant categories will sign, which translates into rent premia + cap compression at exit. Strong bid defenses connect a specific physical attribute to a specific rent or cap-rate number; weak defenses describe the spec without quantifying the financial impact.",
  tips: [
    "Truck-court tiers: <130' = LTL / parcel only; 130-185' = regional distribution; 185'+ = big-box e-commerce / 3PL.",
    "Other binary spec floors: 32'+ clear height, 1 dock per 10k SF, ESFR sprinklers, 36' bay spacing.",
    "Best-and-final wins are usually about *one* differentiating spec the competition lacks — find it, price it, and structure the bid letter around it.",
  ],
};
