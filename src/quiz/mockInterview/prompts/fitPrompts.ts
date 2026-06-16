import type { MockProsePrompt } from '../../../types/mockInterview';

/**
 * Fit / opening prompts — flow and self-presentation, not technical.
 * Rubric is intentionally lighter (3 axes) since these are warmups; the
 * point is to practice the cadence, not nail every dimension.
 */
export const FIT_PROMPTS: MockProsePrompt[] = [
  {
    id: 'fit-tell-me-about-yourself',
    kind: 'fit',
    prompt:
      'Tell me about yourself. Walk me through your background and what brought you to commercial real estate.',
    expectedDurationSec: 90,
    rubric: [
      { id: 'concise', dimension: 'Stays under 90 seconds; doesn\'t ramble', weight: 1 },
      { id: 'narrative', dimension: 'Has a clear narrative arc (origin → focus → why CRE → why this firm)' },
      { id: 'specificity', dimension: 'Includes 1-2 specific anecdotes or numbers, not just adjectives' },
    ],
    modelAnswer:
      'I grew up watching my dad run a small commercial property in our hometown — collecting rents, dealing with tenants, fixing things. That\'s where I first saw real estate as a *business*, not just an asset class. In undergrad at Michigan I focused on finance and took the CRE concentration classes, then spent two summers at Cushman doing brokerage analytics — that\'s where I learned to read a rent roll and understand cap-rate dynamics on real deals. Since then I\'ve been at JLL on the underwriting team, working primarily on industrial and multifamily acquisitions, ~$2B of cumulative bid-modeling. I\'m drawn to your firm specifically because of your sector specialization and the deal-team-driven approach — I want to underwrite deals end-to-end, not just hand off to PMs after sourcing.',
    tips: [
      'Open with something *specific* — a memory, a deal, a moment — not "I\'ve always been interested in finance."',
      'Connect the dots: each step should explain the next. Avoid resume narration.',
      'Land the close: why *this* firm, why *now*. The interviewer is looking for fit, not biography.',
    ],
  },
  {
    id: 'fit-why-cre',
    kind: 'fit',
    prompt:
      'Why commercial real estate, as opposed to corporate finance, private equity, or investment banking?',
    expectedDurationSec: 60,
    rubric: [
      { id: 'thoughtful', dimension: 'Doesn\'t bash other paths; explains positive draw to CRE' },
      { id: 'differentiator', dimension: 'Names something CRE-specific you find compelling (operational, tangible, etc.)' },
      { id: 'evidence', dimension: 'Backs the answer with personal experience, not just abstractions' },
    ],
    modelAnswer:
      'A few things. First, CRE is *tangible* — every deal is a building you can walk through, talk to tenants in, see the asset. That physicality makes the underwriting more concrete than typical corporate finance. Second, the value-creation lever set is broader: you\'re not just doing financial engineering, you\'re also operating — lease-up, capex, ground-up, repositioning. Third, the path to running a deal team is faster — junior analysts at strong sponsors are quoting bids in their second year. I tested this against IB and corp PE through informational interviews and a summer in M&A — found I was more energized by the operational side of CRE than by precedent comps and industry research.',
    tips: [
      'Avoid putting down other tracks. Frame CRE as *additive*, not as "anything but X."',
      'Name a specific thing: tangibility, operational levers, sector specialization, deal-team speed. Specificity signals real reflection.',
      'Reference how you tested the alternative — internships, conversations, projects. Otherwise this answer reads as theoretical.',
    ],
  },
  {
    id: 'fit-why-this-firm',
    kind: 'fit',
    prompt:
      'Why our firm specifically? What do you see in our platform that draws you here over our peers?',
    expectedDurationSec: 75,
    rubric: [
      { id: 'firm-specific', dimension: 'Names something firm-specific (sector, market, deal style, leadership)' },
      { id: 'evidence-of-research', dimension: 'Demonstrates having read recent deals / press / fund history' },
      { id: 'fit-to-self', dimension: 'Connects firm specifics back to the candidate\'s strengths and goals' },
    ],
    modelAnswer:
      'Three things drew me. First, your value-add MF focus in Sun Belt secondary markets — I read the JLL coverage piece on your most recent fund\'s deployment, and the bid discipline at 7-8% YoC stood out. Most managers in that vintage chased 6.5% YoC; you held the line. That\'s the kind of underwriting culture I want to learn under. Second, your team structure — having read about your apprenticeship model where analysts shadow specific principals through full deal cycles, that\'s exactly how I learn best. Third, the geography: I grew up in Atlanta and have a direct read on tenant trends in the Southeast that I think compounds into pricing edge over time. So it\'s a fit on philosophy, structure, and geographic comparative advantage.',
    tips: [
      'Three things, named specifically. Generic praise ("great culture, great people") is worse than no answer.',
      'Reference a real recent deal, fund, or press item if you can. Even one detail signals diligence.',
      'Tie firm-specifics back to *your* edge — what they get from you, not just what you get from them.',
    ],
  },
  {
    id: 'fit-five-year-goal',
    kind: 'fit',
    prompt:
      'Where do you want to be in your career five years from now, and how does this role specifically fit into that path?',
    expectedDurationSec: 75,
    rubric: [
      { id: 'specific', dimension: 'Names a specific role or capability, not just "VP at a real estate firm"', weight: 1.5 },
      { id: 'logical-path', dimension: 'Draws a credible line from this role to that goal', weight: 1.5 },
      { id: 'firm-fit', dimension: 'The goal is plausibly achievable from this firm\'s platform specifically', weight: 1 },
    ],
    modelAnswer:
      'In five years I want to be a senior underwriter or junior deal lead — someone who owns a transaction from sourcing through close, not just a model-builder supporting someone else\'s read. This role is the right first step because it gives me deal-team exposure on real acquisitions, not just support work. Specifically I want to run my first full IC memo inside two years and have underwritten at least $500M of cumulative transaction volume before I\'m 28. The reason I want to do it here rather than at a larger platform: smaller deal teams mean faster responsibility. At a 200-person fund I\'m handing off at IC; here I\'m in the room.',
    tips: [
      'Name something specific — a role, a skill, a deal type. Generic ambition ("I want to grow") reads as unprepared.',
      'Connect the dots explicitly: how does *this* role accelerate the path, not just any role?',
      '"VP in two years" reads as naive; "lead analyst in two years, deal lead in five" reads as calibrated.',
    ],
  },
  {
    id: 'fit-deal-youve-worked-on',
    kind: 'fit',
    prompt:
      'Walk me through a real transaction or project you\'ve worked on — your contribution and what you learned.',
    expectedDurationSec: 120,
    rubric: [
      { id: 'specificity', dimension: 'Names a real deal with numbers (price, size, sector, market)', weight: 1.5 },
      { id: 'your-role', dimension: 'Clearly defines your contribution vs the team\'s', weight: 1.5 },
      { id: 'lesson', dimension: 'Names something non-obvious learned, not just "I improved my Excel skills"', weight: 1 },
    ],
    modelAnswer:
      'Last fall I was the junior underwriter on a $28M industrial acquisition in the Inland Empire — 150k SF multi-tenant flex, 2008-vintage, one anchor taking 60% of GLA with a 3-year rollover. My contribution: I built the lease-up model for the anchor rollover, running four scenarios from in-place renewal at flat rent through full vacancy for 12 months, then cascaded each scenario to exit valuation. The key insight: the anchor rollover made the cap-rate sensitivity misleading — you couldn\'t stress-test exit caps independently of lease-up timing. I linked them: 12-month vacancy plus 50 bps wider exit cap was the real downside, and on that basis the deal only penciled at $24M, not $28M. We bid $25.5M. Seller walked. Six months later the asset re-traded at $23.8M. That was the clearest lesson in rollover risk I\'ve had.',
    tips: [
      'Open with the deal, not your title. "I worked on a $28M industrial acquisition" starts stronger than "as a junior analyst."',
      'Be precise about your contribution. "I built the lease-up model" beats "I helped with underwriting."',
      'Land the lesson with a number. "Deal re-traded at $23.8M" validates the analysis more than any adjective.',
    ],
  },
  {
    id: 'fit-development-area',
    kind: 'fit',
    prompt:
      'If I called your last manager today, what would they say is your biggest development area?',
    expectedDurationSec: 60,
    rubric: [
      { id: 'honest', dimension: 'Names a real gap, not a disguised strength ("I work too hard")', weight: 2 },
      { id: 'context', dimension: 'Gives context that makes the gap plausible for someone at this career stage', weight: 1 },
      { id: 'action', dimension: 'Names what they\'re actively doing to close the gap', weight: 1 },
    ],
    modelAnswer:
      'Probably executive communication. My MD would say I\'m thorough and technically strong, but early in the internship I\'d walk into a check-in with five things to update when he had 10 minutes and wanted one. I didn\'t know how to compress insights for time-constrained senior people. I\'ve worked on it deliberately — I now prep a one-sentence lead and two supporting data points before every verbal update. I still default to more detail under pressure, but I\'m aware of it and it\'s the thing I\'d most want to get reps on in this role.',
    tips: [
      'Interviewers see through "perfectionism" or "I care too much" — name a real, specific gap.',
      'Keep it to one thing. Listing three development areas reads as insecure or unfocused.',
      'Show awareness AND a concrete action. Self-awareness without a plan reads as static.',
    ],
  },
];
