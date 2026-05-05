import type { SituationalCase } from '../../types/situational';

export const waterfallKeyPersonEvent: SituationalCase = {
  id: 'waterfall-key-person-event',
  title: 'Key-person event — what happens to the GP\'s promote?',
  category: 'deal-process',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'A $500M closed-end fund is in year 4 of a 7-year vehicle. The LPA names two key persons (the founder + the head of acquisitions). The head of acquisitions has just resigned to join a competitor. Per the LPA, this triggers a "key-person event" with a 60-day cure period. The fund has 5 active deals, 3 of which are in the catch-up tier or above. Mid-fund GP promote distributions year-to-date are $8M. The LP advisory committee meets in 14 days.',
  data: [
    { label: 'Fund', value: '$500M closed-end, year 4 of 7' },
    { label: 'Trigger', value: 'Head of acquisitions resigned' },
    { label: 'Cure period', value: '60 days (LPA standard)' },
    { label: 'Promote YTD', value: '$8M' },
    { label: 'Active deals', value: '5 (3 above pref)' },
  ],
  question:
    'What\'s the typical LPA mechanism that activates during a key-person event, and what does it mean for GP economics?',
  options: [
    {
      label:
        'Investment period is suspended (no new deals; existing deals + dispositions continue), GP carry distributions are paused or escrowed, and LPs get accelerated rights (e.g. removal vote, reduction of management fee). Existing promote distributions stay distributed (not clawed back unilaterally), but new promote on undistributed exits is held back pending LP advisory committee resolution. The 60-day cure period gives GP time to replace the key person; if cured, normal mechanics resume.',
      isBest: true,
      explanation:
        'Standard key-person event consequences: (1) **investment period suspends** — GP can\'t deploy fresh capital into new deals, but existing deals + planned dispositions continue. (2) **Carry pauses** — promote distributions to GP on new exits are held in escrow or paused entirely until LP advisory resolution. (3) **LP rights accelerate** — most LPAs grant LPs a no-fault GP removal vote (typically 75% supermajority) and/or a reduced management fee during the suspension. (4) **Cure period** — LPA usually gives GP 30-90 days to find a qualified replacement; if cured, the suspension is lifted. Existing promote already distributed isn\'t clawed back unilaterally — that requires a separate clawback mechanism. The reasoning: key-person provisions protect LPs against losing the people they invested with; the cure period balances LP protection against premature fund disruption.',
    },
    {
      label:
        'GP automatically loses all promote — past, present, and future — until a replacement is found.',
      isBest: false,
      explanation:
        'Past distributed promote isn\'t clawed back by a key-person event alone. Clawback is a separate mechanism tied to fund liquidation. Key-person events suspend *future* GP economics (new deals, new carry) but don\'t reach back to take already-distributed dollars.',
    },
    {
      label:
        'The fund automatically dissolves and proceeds to wind-down — LP gets 100% of remaining cash flows pro-rata.',
      isBest: false,
      explanation:
        'Dissolution would be the most severe LP remedy and is rare. Typical LPAs have a graduated response: investment period suspension, carry pause, and only after LP supermajority vote does the fund dissolve. Most key-person events are cured within the cure period.',
    },
    {
      label:
        'Nothing happens immediately — the LPA only requires GP to disclose the resignation; LPs have no formal rights.',
      isBest: false,
      explanation:
        'Underestimates LP protections. Key-person provisions are one of the strongest LP rights in modern LPAs — they\'re written specifically to give LPs leverage when key people leave. Disclosure alone wouldn\'t justify the term in the document.',
    },
  ],
  takeaway:
    'Key-person events trigger a graduated LP response: suspension of new investment, pause/escrow of GP carry on new exits, accelerated LP rights (removal vote, fee reduction), and a cure period for GP. Past distributed promote isn\'t clawed back by this mechanism — that\'s separate. The interplay matters: a GP with significant unpaid promote on undistributed deals has real exposure to a key-person event; a GP that\'s already taken most promote has less.',
  tips: [
    'Key-person ≠ for-cause removal. Different triggers, different LP voting thresholds.',
    'LPs negotiate harder for key-person provisions when the fund is "first-time" or sponsor-driven (vs platform).',
    'Always read the cure period — 30 days for some LPAs, 90+ for others. Bigger funds tend to have longer cures.',
    'Key-person provisions don\'t reach distributed promote, but they often pair with clawback that does at fund-end.',
  ],
};
