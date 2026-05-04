import type { SituationalCase } from '../../types/situational';

export const sponsorRecourseVsCovenants: SituationalCase = {
  id: 'sponsor-recourse-vs-covenants',
  title: 'Recourse vs covenants — which structures protect the lender?',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You\'re structuring a $40M permanent loan on a stabilized MF asset. Sponsor is mid-tier (good track record, modest balance sheet, no public credit rating). Sponsor is asking for non-recourse. The credit committee wants protection beyond just the asset itself.',
  data: [
    { label: 'Loan size', value: '$40M' },
    { label: 'LTV / DSCR', value: '70% / 1.25x' },
    { label: 'Sponsor', value: 'Mid-tier, decent track record' },
    { label: 'Sponsor balance sheet', value: '~$25M net worth (estimated)' },
    { label: 'Term', value: '10-yr / 30-yr amort' },
  ],
  question: 'What\'s the right protection structure?',
  options: [
    {
      label:
        'Non-recourse with carve-outs (a "bad-boy" guaranty) PLUS strong financial covenants — DSCR maintenance, minimum debt yield, cash sweep on covenant breach. The carve-outs become full recourse on specific bad acts (fraud, voluntary bankruptcy, environmental). The covenants protect against deterioration without requiring sponsor recourse.',
      isBest: true,
      explanation:
        'Modern CRE lending almost always uses non-recourse-with-carve-outs (the "bad-boy" guaranty) plus tight covenants. The carve-outs convert non-recourse to full recourse for specific bad acts — fraud, misrepresentation, voluntary bankruptcy filings, environmental contamination, transfer of title without lender consent. They protect the lender against the borrower acting in bad faith without forcing the sponsor to put their personal balance sheet on a perfectly-managed loan. Covenants (DSCR maintenance test at 1.10x, debt yield floor at 7%, cash sweep when triggered) protect against operating decline without requiring the sponsor to backstop. Together, they cover the realistic risk surface without making the loan unattractive to a typical mid-tier sponsor.',
    },
    {
      label: 'Demand full recourse — the sponsor\'s $25M net worth covers the LTV gap and gives the lender a deep-pocket backstop.',
      isBest: false,
      explanation:
        'Full recourse on $40M against a $25M sponsor balance sheet doesn\'t actually cover the gap (if the asset goes to $20M and recourse is needed for $20M, the sponsor can\'t pay). It also makes the loan unattractive — most institutional borrowers won\'t pledge personal balance sheets on a clean stabilized deal. You\'ll lose the deal to a competitor who structures non-recourse with covenants.',
    },
    {
      label: 'Non-recourse with no carve-outs — covenants alone are enough on a stabilized asset with strong DSCR.',
      isBest: false,
      explanation:
        'Skips the carve-out layer that protects against bad acts. Covenants protect against *performance* decline; carve-outs protect against *behavior* (fraud, transfer without consent, etc.). Lenders need both. Non-recourse without carve-outs is rare and only at very large institutional scale.',
    },
    {
      label: 'Tight covenants only — DSCR maintenance plus a low LTV floor — and skip both recourse and carve-outs to win the deal.',
      isBest: false,
      explanation:
        'Loses the bad-act protection (fraud, environmental) which has nothing to do with covenants. Covenants trigger on operating metrics; they don\'t trigger when the sponsor commits fraud or transfers title. Bad-boy carve-outs are nearly universal in CRE non-recourse lending — skipping them is genuinely uncommon.',
    },
  ],
  takeaway:
    'Lender protection is a layered stack: (1) the asset itself (the primary collateral), (2) covenants that catch operating deterioration before default, (3) bad-boy carve-outs that convert to recourse on specific bad acts, (4) full recourse only when the asset/sponsor combination justifies it. Most stabilized CRE permanent loans land at layers 1-3 (non-recourse + carve-outs + covenants), with layer 4 reserved for higher-risk transactions.',
  tips: [
    'Bad-boy triggers: fraud, misrepresentation, voluntary bankruptcy, environmental, transfer without consent.',
    'Springing-recourse covenants: DSCR maintenance, debt yield floor, cash sweep activation.',
    'Springing recourse triggers full recourse if the borrower breaches a covenant — a middle ground when full recourse is too aggressive.',
  ],
};
