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
];
