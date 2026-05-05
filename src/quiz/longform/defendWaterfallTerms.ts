import type { LongformCase } from '../../types/longform';

export const defendWaterfallTerms: LongformCase = {
  id: 'defend-waterfall-terms',
  title: 'Defend the waterfall terms to IC',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'You\'re the lead analyst on a $300M co-GP venture pitching the IC of a major institutional LP. Your sponsor is proposing: 6% pref, 50/50 catch-up to a 25% GP target, 70/30 above. The LP\'s IC counter-proposal: 9% pref, 100% catch-up to 20%, 80/20 above. Both structures clear under base-case modeling, but the dispersion across upside / downside cases is dramatically different. The relationship matters — this LP allocated $200M to the sponsor\'s last fund. The IC meeting is tomorrow.',
  data: [
    { label: 'Sponsor proposes', value: '6% / 50-50 catch-up to 25% / 70-30' },
    { label: 'LP IC counter', value: '9% / 100% catch-up to 20% / 80-20' },
    { label: 'Deal size', value: '$300M co-GP' },
    { label: 'LP relationship', value: '$200M in last fund' },
    { label: 'Sponsor edge', value: 'Track record + geographic depth' },
  ],
  question:
    'Draft a recommendation in 6-8 sentences for *which structure to land on*. Take a position; defend it on math + relationship. Explicitly address: where the sponsor wins on the sponsor proposal, where LP wins on the IC counter, and what middle position you\'d propose to close the deal.',
  modelAnswer: `Recommend landing at **8% pref / 100% catch-up to 22% / 75-25 above** — closer to the LP\'s ask but with a 200 bps higher promote target and a steeper above-split. Three reasons. First, the sponsor\'s 6% pref is unmarket-low for institutional capital today (most institutional LPs anchor at 7-9%); pushing 8% is gettable and signals seriousness. Second, 100% catch-up vs 50/50 is a real concession to LP — but the LP\'s 20% target is also on the low end, so trading "full catch-up" for "22% target" recovers ~10% of the GP\'s catch-up dollars without the LP losing cash-flow timing. Third, 75-25 above-split (vs 70-30 ask, 80-20 LP counter) is the standard middle position; it hands LP a meaningful concession from the sponsor\'s starting position while keeping GP economics defensible. Quantitatively, on a $300M deal returning $80M of profit, this middle structure pays GP ~$11M in promote vs $13M (sponsor proposal) and $9M (LP counter); LP\'s give-up vs IC counter is ~$2M, less than 1% of capital. **Relationship math**: this LP gave you $200M last fund; meeting them mostly on their terms while preserving real GP economics protects the next fundraise. Walk threshold: if LP rejects the catch-up target above 20%, drop to 21% but hold 75-25 — don\'t give up the above-split too.`,
  rubric: [
    {
      id: 'takes-position',
      dimension: 'Picks a specific middle structure with numbers; does not hedge',
      weight: 2,
    },
    {
      id: 'sponsor-side-economics',
      dimension: 'Quantifies what the sponsor wins on each lever (pref / catch-up / split)',
      weight: 1.5,
    },
    {
      id: 'lp-side-economics',
      dimension: 'Quantifies what LP wins / loses; addresses LP\'s actual cash impact',
      weight: 1.5,
    },
    {
      id: 'relationship-context',
      dimension: 'References the LP relationship + cross-deal economics, not just this deal in isolation',
      weight: 1.5,
    },
    {
      id: 'middle-position-rationale',
      dimension: 'Explains why the proposed middle position is *defensible* (not arbitrary)',
    },
    {
      id: 'walk-threshold',
      dimension: 'Includes a "what would change my mind" / fallback position',
    },
  ],
  takeaway:
    'Real LPA negotiations move on three levers (pref / catch-up / above-split) and one constraint (the LP relationship). Junior analysts pick a middle that splits the difference numerically; senior analysts pick a middle that *trades* concessions across levers — giving up something cheap to gain something valuable. The relationship math matters: a small economic give-up on this deal that protects the next fundraise is almost always the right call. Always include a walk threshold so the sponsor knows your true floor.',
  tips: [
    'When a counter is on the table, work through which lever the LP cares about most — usually pref + catch-up rate. Concede there; hold above-split.',
    'Quantify in dollars, not bps. $11M vs $13M of promote on a $300M deal is the conversation; "200 bps of catch-up target" is jargon.',
    'Always model "next fund give-up" — protecting a $200M re-up means the relationship math is worth low-single-digit-millions of GP economics this deal.',
    'Walk thresholds belong in negotiation memos. Senior partners need to know "my floor is X" so they can hold the line.',
  ],
};
