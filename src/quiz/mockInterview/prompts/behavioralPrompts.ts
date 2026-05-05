import type { MockProsePrompt } from '../../../types/mockInterview';

/**
 * Behavioral prompts — "tell me about a time when..." STAR-format. Rubric
 * weighs (1) clear specific situation, (2) what *you* did vs the team,
 * (3) numerical or concrete outcome, (4) reflection.
 */
export const BEHAVIORAL_PROMPTS: MockProsePrompt[] = [
  {
    id: 'beh-disagree-with-vp',
    kind: 'behavioral',
    prompt:
      'Tell me about a time you disagreed with someone more senior on a deal. How did you handle it, and what was the outcome?',
    expectedDurationSec: 120,
    rubric: [
      { id: 'situation', dimension: 'Sets the stage with a specific deal / context (not abstract)', weight: 1 },
      { id: 'your-action', dimension: 'Distinguishes what *you* did from what the team did', weight: 1.5 },
      { id: 'judgment', dimension: 'Shows you raised the disagreement constructively, not as defiance', weight: 1.5 },
      { id: 'outcome', dimension: 'Concrete outcome, including whether your view was right or wrong' },
      { id: 'reflection', dimension: 'Names what you\'d do differently or what you learned' },
    ],
    modelAnswer:
      'Last summer at JLL, my VP and I were preparing a $42M MF acquisition memo for IC. He wanted to use the OM\'s 5% Year-1 NOI growth assumption directly; I had pulled the comp set and saw historical submarket rent growth was tracking 2.8%. I flagged it the night before submission, walked him through my comp pull, and said "I\'d feel better re-cutting this to 3.0% and letting IC see the variance." He pushed back — said the OM had been priced off 5% for a reason and IC trusted the broker. Rather than dig in, I asked if I could prepare both versions in parallel and let him decide which to lead with. I worked late and produced a single-page sensitivity showing how IRR moved across 2.8% / 3.5% / 5%. He used the sensitivity table in IC; the deal got priced at the lower-end assumption and we won the bid with room left in our IRR. The outcome was good, but I learned that *how* I raised the disagreement mattered as much as the substance — going around him would have torched the relationship; offering parallel work let him keep authorship.',
    tips: [
      'Use STAR: Situation, Task, Action, Result. Skip any that aren\'t there.',
      'Highlight what *you* specifically did. "We" is the death of behavioral interviews.',
      'Always include reflection — interviewers look for self-awareness, not just outcomes.',
    ],
  },
  {
    id: 'beh-failed-deal',
    kind: 'behavioral',
    prompt:
      'Tell me about a deal that didn\'t work out the way you expected. What happened, and what did you learn?',
    expectedDurationSec: 120,
    rubric: [
      { id: 'situation', dimension: 'Specific deal with concrete details (numbers, sector, vintage)', weight: 1 },
      { id: 'ownership', dimension: 'Takes some ownership rather than purely external blame', weight: 1.5 },
      { id: 'analysis', dimension: 'Identifies which assumption(s) broke and why', weight: 1.5 },
      { id: 'lesson', dimension: 'Names a transferable lesson, not just "we should\'ve been more conservative"', weight: 1 },
    ],
    modelAnswer:
      'Sophomore-year project — I co-modeled a $25M industrial flex deal in Phoenix as part of a real-estate club case competition. We bid aggressively at a 5.5% going-in cap on the assumption that the submarket would tighten given e-commerce tailwinds. We won the case but in our 6-month follow-up review, the actual market trade for that asset class had widened ~50 bps and our hypothetical bid would\'ve been underwater. The miss wasn\'t the cap rate per se — it was that we hadn\'t built downside cases. Our model went 5%-5.5%-6%; the actual outcome was 6.25%, outside our range. The lesson I took: stress your downside *past* what feels reasonable, especially in markets where you don\'t have local pricing edge. Now whenever I model, I deliberately include a "what if I\'m wrong by 100 bps on the exit cap" scenario — even if it makes the deal look bad, the discipline of seeing the bottom matters.',
    tips: [
      'Pick a deal where the lesson is *transferable*, not unique to that scenario.',
      'Avoid blaming external factors entirely. Senior interviewers want to see ownership.',
      'A real number — 50 bps wider, 6-month miss — is worth more than vague descriptions.',
    ],
  },
  {
    id: 'beh-data-vs-instinct',
    kind: 'behavioral',
    prompt:
      'Tell me about a time the data said one thing and your instinct said another. What did you do?',
    expectedDurationSec: 100,
    rubric: [
      { id: 'situation', dimension: 'Names a specific decision with clear data + instinct sides', weight: 1 },
      { id: 'process', dimension: 'Shows you didn\'t just pick a side — you investigated the gap', weight: 1.5 },
      { id: 'outcome', dimension: 'Honest about whether instinct or data won and why', weight: 1 },
      { id: 'reflection', dimension: 'Articulates when to lean which direction', weight: 1 },
    ],
    modelAnswer:
      'Spring of last year, I was screening MF deals in a Dallas submarket. The data said 92% submarket occupancy, healthy 4-5% YoY rent growth, 5.5% comps — looked tight. My instinct said something was off because I\'d driven the submarket on a visit and seen lots of "for lease" banners, which didn\'t square with 92%. I called two property managers I knew in the area and learned that the headline 92% was lagged by 90 days; current real-time occupancy was closer to 86% as a major employer downsized. I brought that to my team and we passed on a deal that, in hindsight, was probably 6-9 months from a real cap-rate widening event. Lesson: when ground-truth contradicts data, don\'t override either — investigate the gap. The lag was the problem, not the data, and I would\'ve missed it without the field check.',
    tips: [
      'The strongest answers show *both* — instinct prompted investigation, investigation produced new data, new data resolved the gap.',
      'Avoid framing as "my gut beat the spreadsheet." That reads as anti-analytical.',
      'A specific source of the instinct (visit, contact, prior deal) is more credible than "I just felt."',
    ],
  },
  {
    id: 'beh-mentor-feedback',
    kind: 'behavioral',
    prompt:
      'Tell me about a piece of critical feedback you received that changed how you work. What was the feedback, and what did you do about it?',
    expectedDurationSec: 90,
    rubric: [
      { id: 'specificity', dimension: 'Specific feedback, not "I needed to be more polished"', weight: 1.5 },
      { id: 'self-awareness', dimension: 'Owns the gap rather than minimizing it', weight: 1.5 },
      { id: 'action', dimension: 'Concrete change, with evidence the change happened', weight: 1.5 },
      { id: 'compounding', dimension: 'Shows the change has stuck (or is sticking)' },
    ],
    modelAnswer:
      'Mid-internship at JLL, my MD pulled me aside and said: "Your models are right but your IC memos read like a homework assignment. I want a thesis in the first two sentences, then evidence." I\'d been writing in a build-up-the-argument style — situation first, then numbers, then conclusion. He wanted top-line first. Felt obvious in retrospect, but it changed everything. I started drafting every memo by writing the *recommendation* first and forcing myself to defend it, rather than letting the analysis lead. By end of summer, two of my memos went to the IC packet without my MD\'s usual edits. Bigger picture: I started applying the same "thesis first" framing to verbal updates too. When my VP asks "what did you find on the comp pull?" I answer with the conclusion in one sentence, then the supporting numbers — that\'s the seniorship habit she modeled and I\'d been resisting.',
    tips: [
      'Pick a real piece of feedback, not "be more confident." Specific = credible.',
      'Show the change worked. "Two memos went without edits" is more compelling than "I improved."',
      'Bonus: connect the lesson to a *broader* habit beyond the original context.',
    ],
  },
  {
    id: 'beh-time-pressure',
    kind: 'behavioral',
    prompt:
      'Tell me about a time you had to deliver under serious time pressure. How did you prioritize, and what got done vs left on the floor?',
    expectedDurationSec: 100,
    rubric: [
      { id: 'situation', dimension: 'Real time-constrained scenario with concrete stakes', weight: 1 },
      { id: 'prioritization', dimension: 'Explicit triage logic — what got cut and why', weight: 1.5 },
      { id: 'judgment', dimension: 'The cuts were defensible (high-effort low-value items, not lazy)', weight: 1.5 },
      { id: 'outcome', dimension: 'Concrete delivery; honest about quality trade-offs' },
    ],
    modelAnswer:
      'IC packet for a $60M industrial portfolio bid was due Tuesday morning; my VP got pulled into a Friday emergency on another deal, and I learned at 5pm Monday that I\'d be lead-modeling solo. I had ~14 hours. I prioritized by impact-on-IC-decision: full underwriting model with 3-scenario sensitivity (the must-have), comp set table with vintage / SF / cap-rate adjustments (high-credibility item), and a single-page IC summary with my recommendation. Things I cut: the supplemental tax-reassessment scenario the VP usually included (low-likelihood for the assets), the historical NOI trend chart (visually nice but not load-bearing for the rec), and a draft email to the broker (not actually IC-relevant). Got the packet in at 7:45am, IC ran on time, deal got priced. My VP came back and said "I would\'ve cut the same things." That was the affirmation that mattered.',
    tips: [
      'Show explicit triage — *what cut, why*. Generic "I worked late" is weak.',
      'Hierarchy: highest-impact-on-decision wins; nice-to-have visuals lose.',
      'The closer is "and I delivered." Be specific about what landed and what didn\'t.',
    ],
  },
  {
    id: 'beh-tenant-negotiation',
    kind: 'behavioral',
    prompt:
      'Tell me about a tenant negotiation you led where the stakes were high. What did you ask for, what did you concede, and what was the outcome?',
    expectedDurationSec: 110,
    roles: ['assetManagement', 'acquisitions'],
    rubric: [
      { id: 'situation', dimension: 'Specific tenant + lease + leverage on each side', weight: 1 },
      { id: 'strategy', dimension: 'Articulates the trade-offs you walked into the negotiation with', weight: 1.5 },
      { id: 'concession', dimension: 'Honest about what you gave up + why it was the right give-up', weight: 1.5 },
      { id: 'outcome', dimension: 'Quantitative outcome: rent / term / cost / value impact', weight: 1 },
      { id: 'relationship', dimension: 'Frames the negotiation as preserving the long-term relationship, not zero-sum', weight: 0.5 },
    ],
    modelAnswer:
      'Last winter I led a renewal negotiation on a 32k-SF anchor tenant rolling on a 2-year-old Class-A office. They were paying $36/SF; market had moved to $42/SF. They opened by asking for a 5-year extension at $30/SF — anchored low. We had real leverage: their build-out was specific to them and re-tenanting would require $80/SF of new TI. I countered at $40/SF flat for 7 years with $20/SF refresh TI. They came back at $36/SF + 5-year + $25 TI. We landed at $38/SF + 6-year + $20 TI + 3% annual escalators. NER was ~$33/SF after TI amortization vs comp NER of $34 — slight discount but with a quality long-term tenant on lease. The give-up I had to make: a co-tenancy clause they wanted that protected them if our other anchor left. I conceded because I had a 95% confidence the other anchor was renewing and the optics value (preserved their commitment) outweighed the contingent risk. Tenant signed; we held the building 92% leased through the soft 2024 office market.',
    tips: [
      'Show both leverage analyses — *what they had, what you had*. Bilateral framing reads more sophisticated.',
      'Quantify the outcome: NER vs comp, length of term, capex avoided.',
      'Always include a give-up. Negotiations without concessions read as fictitious.',
    ],
  },
  {
    id: 'beh-credit-decision',
    kind: 'behavioral',
    prompt:
      'Tell me about a close credit-call you made on a deal — one where you had to weigh borrower strength against deal economics. What did you decide, and how did it play out?',
    expectedDurationSec: 100,
    roles: ['mortgageUw'],
    rubric: [
      { id: 'situation', dimension: 'Specific deal: asset, size, sponsor profile', weight: 1 },
      { id: 'analysis', dimension: 'Articulates the tension — strong borrower / weak deal or vice versa', weight: 1.5 },
      { id: 'decision', dimension: 'States the call and the reasoning, not "we approved with conditions"', weight: 1.5 },
      { id: 'outcome', dimension: 'How the deal performed; honest if call was wrong' },
      { id: 'lesson', dimension: 'Names what you would weigh more (or less) heavily next time' },
    ],
    modelAnswer:
      'Last Q3 I was on the credit team for a $40M MF construction loan to a first-time GP — solid track record on stabilized acquisitions but no ground-up deals. Underwriting was tight: 75% LTC, 1.40× DSCR at stabilization, but the YoC was only 6.0% on a 5.0% market cap rate (100 bps of dev spread, thin for ground-up). My call: the borrower\'s strength compensated for the deal\'s thin spread *because* (1) sponsor had personal liquidity covering 18 months of debt service, (2) the project was in a market we knew and underwriting was conservative on rents, (3) they brought us all their refinance work historically. I recommended approval with a 12-month interest reserve and a sponsor-funded completion guaranty. The deal stabilized 2 months ahead of schedule at $0.10/SF higher rents than we underwrote — YoC closed at 6.4%, well within the dev-spread band. The lesson: relationship-quality borrowers can carry slightly thinner deals if the structure adds protection. Pure transactional underwriting on the same numbers I might have declined.',
    tips: [
      'Frame the *tension*. Credit calls are interesting when there\'s a real trade-off, not when the answer is obvious.',
      'Specify the structure you added (reserves, guaranties, covenants). That\'s the lever credit gets to use.',
      'Honest outcome reporting separates strong candidates. "Worked out fine" reads as luck; "they outperformed underwriting on these specific lines" reads as judgment.',
    ],
  },
];
