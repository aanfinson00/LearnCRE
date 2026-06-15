import type { SituationalCase } from '../../types/situational';

export const stepBumpVsCpiEscalation: SituationalCase = {
  id: 'step-bump-vs-cpi-escalation',
  title: 'Fixed step bumps vs. CPI escalation — who wins over a 10-year lease?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'industrial',
  scenario:
    "You own a 300,000 SF NNN industrial building. A credit tenant is offering two lease structures for a 10-year term at $10.00/SF base rent: (A) 3% fixed annual step bumps, or (B) CPI escalation capped at 5% / floored at 1.5%. Current CPI is running at 4.2% YoY. Your investment thesis is based on 5-year hold and sale to an institutional buyer.",
  data: [
    { label: 'Base rent', value: '$10.00/SF' },
    { label: 'Term', value: '10 years' },
    { label: 'Option A', value: '3% fixed annual step bumps' },
    { label: 'Option B', value: 'CPI, capped 5% / floored 1.5%' },
    { label: 'Current CPI', value: '4.2% YoY' },
    { label: 'Hold period', value: '5 years' },
  ],
  question: 'Which structure maximizes value for a 5-year hold, and what are the key trade-offs?',
  options: [
    {
      label:
        "Prefer Option A (3% fixed bumps) for a 5-year hold underwriting. The fixed bumps create predictable, underwritable NOI growth that institutional buyers at exit can capitalize with confidence. CPI-linked rent is harder to underwrite at exit because the future rent depends on inflation assumptions — buyers discount for that uncertainty. If CPI averages above 3% over your hold, Option B beats Option A on NOI, but Option A wins on exit multiple reliability.",
      isBest: true,
      explanation:
        "The answer has two layers: cash flow and exit multiple. On cash flow: if CPI stays at 4.2% (capped at 5%), Option B generates higher rent in years 1–5 vs. 3% fixed bumps. But the cap-rate math at exit favors the structure that's easier to underwrite. Institutional buyers can capitalize fixed-bump rent with a single cap rate; CPI-linked rent introduces a forward inflation assumption that buyers either discount (applying a wider cap) or stress-test. A 5-year hold with an institutional exit should prefer fixed step bumps unless your inflation view is materially above 3% and you're confident buyers share it. For a 10-year hold where you capture the full lease term, the CPI link is more valuable because you own the upside.",
    },
    {
      label:
        "Option B (CPI) is always better — you capture inflation upside and the floor protects you.",
      isBest: false,
      explanation:
        "CPI is better for cash flow only when inflation runs above the step-bump rate (3%). At 4.2% CPI, yes — but CPI has also run at 1.5–2% for most of the 2010s. The floor at 1.5% is meaningful protection, but a 3% fixed bump beats CPI below 3%. More importantly, CPI rent is harder to exit-price because buyers must forecast inflation across the remaining lease term. For a 5-year hold with an institutional buyer exit, predictability has real value.",
    },
    {
      label:
        "Option A (3% fixed bumps) is always better — fixed income streams are worth more because they're predictable.",
      isBest: false,
      explanation:
        "Fixed predictability is valuable, but it caps your upside. In an inflationary environment where CPI runs 4–5%, you leave real rent on the table with fixed 3% bumps. The right answer depends on inflation expectations, hold period, and exit buyer type. For long holds, CPI links are generally superior if inflation outpaces the fixed bump rate.",
    },
    {
      label:
        "The difference is trivial — both structures will produce nearly identical NOI over the hold period.",
      isBest: false,
      explanation:
        "Not trivial. At 4.2% CPI vs. 3% fixed bumps, Option B generates ~$0.50/SF more in year 5 rent, which on a 300,000 SF building is $150,000/year. Capitalized at a 5.5% cap rate, that's ~$2.7M of additional exit value — material on a deal that likely trades in the $50–75M range. Small rent growth differentials compound significantly over a 5-year hold.",
    },
  ],
  takeaway:
    "Step-bump vs. CPI escalation is a trade-off between predictability and inflation participation. Fixed bumps are easier to underwrite at exit (single NOI growth assumption) but cap your upside. CPI links capture inflation upside but introduce forecast uncertainty that buyers price in at exit. For 5-year holds with institutional exits, prefer fixed bumps unless CPI is expected to significantly outpace the step rate. For 10-year holds where you own the full NOI benefit, CPI-linked structures are generally superior in high-inflation environments. Always model the break-even CPI rate: at what inflation level do the structures produce equal NPV?",
  tips: [
    "Break-even CPI ≈ fixed step bump rate — if you expect CPI above 3%, CPI link wins on cash flow.",
    "Exit buyers capitalize fixed-bump rent more tightly (less uncertainty) — built into the exit multiple.",
    "CPI-floored at 1.5% is meaningful — eliminates deflation risk while keeping upside open.",
  ],
};
