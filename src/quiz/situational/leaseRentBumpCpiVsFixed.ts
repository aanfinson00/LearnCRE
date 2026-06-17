import type { SituationalCase } from '../../types/situational';

export const leaseRentBumpCpiVsFixed: SituationalCase = {
  id: 'lease-rent-bump-cpi-vs-fixed',
  title: 'CPI bumps vs. fixed bumps — who wins when inflation is high?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  scenario:
    'You own a 10-year NNN lease with a credit tenant. At signing, you had the choice between (A) fixed 3%/year rent bumps or (B) CPI-based bumps with a 2% floor and 4% ceiling. At the time, CPI was running ~2.5%. Three years into the lease, CPI is running at 7%. The tenant is now pushing to renegotiate the bump structure mid-lease, arguing that CPI bumps are "excessive." You need to decide how to respond.',
  data: [
    { label: 'Lease term', value: '10 years NNN' },
    { label: 'Option A (signed)', value: 'Fixed 3%/yr bumps' },
    { label: 'Option B (alternative)', value: 'CPI with 2% floor / 4% ceiling' },
    { label: 'CPI at signing', value: '~2.5%' },
    { label: 'CPI now (year 3)', value: '7%' },
    { label: 'Tenant ask', value: 'Mid-lease renegotiation of bumps' },
  ],
  question:
    "The tenant says CPI bumps are unfair in a high-inflation environment. How should you frame your response, and who benefits from each structure?",
  options: [
    {
      label:
        'If you signed the CPI-capped structure (Option B), your bumps are capped at 4% even at 7% CPI — less than CPI but more than Option A\'s 3%. Decline the renegotiation: the cap protects the tenant from extreme CPI while you got the floor protection. Both parties accepted this symmetric risk at signing. If you signed Option A (fixed 3%), the tenant is actually BELOW CPI, so their effective real rent is declining — they have even less grounds to ask for relief.',
      isBest: true,
      explanation:
        "The CPI-with-collar structure was designed to share inflation risk symmetrically. At 7% CPI, the tenant gets capped at 4% bumps — they're already protected from the extreme scenario. The floor at 2% protected the landlord from a low-inflation outcome. This is precisely what the collar structure was designed to do. Declining renegotiation mid-lease is appropriate: the contract is performing within its stated terms. If you signed fixed 3% bumps, the tenant's real rent is falling (3% bump vs 7% inflation) — they're getting a subsidy and have no claim at all.",
    },
    {
      label:
        'Agree to renegotiate the bumps — maintaining tenant relationships is more important than a few percentage points of annual escalation.',
      isBest: false,
      explanation:
        "Capitulating to mid-lease renegotiation creates a precedent and destroys the value of contractual structures. The bump structure was priced into the lease at signing. If you amend down, you're giving away real cash on the remaining 7 years of the lease, which is directly reflected in NOI and cap-rate value. More importantly, a tenant asking to renegotiate mid-lease when the contract is performing within its stated terms is testing your discipline — acquiescing signals you'll renegotiate again when rates change.",
    },
    {
      label:
        'CPI bumps are better for landlords in all environments — they pass inflation risk to tenants unconditionally.',
      isBest: false,
      explanation:
        "Only true with no collar. A CPI bump with a 2% floor and 4% ceiling is better than fixed 3% when CPI runs 4%+, but worse when CPI runs below 2% (you get floored higher than CPI). Uncapped CPI is better in high inflation; fixed bumps are better in low inflation. The collar is the risk-sharing compromise. And in this scenario the CPI structure has a *cap* at 4%, not unconditional pass-through.",
    },
    {
      label:
        'Switch to CPI uncapped going forward — if the tenant wants to renegotiate, accept only if they drop the ceiling.',
      isBest: false,
      explanation:
        "A mid-lease amendment to drop the cap in a 7% CPI environment is a landgrab that no tenant would accept. The negotiating dynamic goes both ways: you can't unilaterally improve your position at the tenant's expense mid-lease either. And practically, uncapped CPI in a high-inflation environment is what the tenant is trying to get away from — proposing it as a concession offer makes no sense.",
    },
  ],
  takeaway:
    "CPI-collared bumps (floor + ceiling) are a symmetric risk-sharing mechanism — the landlord sacrifices upside above the cap in exchange for a guaranteed floor. At 7% CPI with a 4% cap, the tenant benefits, but that was the deal. Mid-lease renegotiations of performing contracts should be resisted: they erode the NOI, set a precedent, and discount the value of the signed agreement. Fixed bumps are simpler and protect against low-CPI scenarios; CPI bumps with collars are better when inflation trends above the fixed rate. Always model both scenarios at lease signing.",
  tips: [
    'CPI bump crossover: if you expect CPI < fixed rate, take fixed; if CPI > fixed rate, prefer CPI.',
    'A 2%/4% CPI collar beats fixed 3% when CPI runs between 3% and 4% (breakeven at 3%).',
    'Mid-lease amendments should require genuine give-and-take — never give away bump structures without a concession in return.',
  ],
};
