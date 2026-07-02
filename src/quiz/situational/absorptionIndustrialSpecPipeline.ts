import type { SituationalCase } from '../../types/situational';

export const absorptionIndustrialSpecPipeline: SituationalCase = {
  id: 'absorption-industrial-spec-pipeline',
  title: 'Is speculative supply about to swamp this submarket?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'An industrial submarket has 20,000,000 SF of existing inventory, currently 95% leased — a landlord\'s market. Trailing 3-year average net absorption has been 1,200,000 SF/year. Permit and construction data show 4,800,000 SF of speculative (non-pre-leased) development currently under construction, with roughly 3,600,000 SF slated to deliver within the next 12 months. You\'re underwriting a value-add acquisition in the submarket that assumes rents grow 4% annually.',
  data: [
    { label: 'Existing inventory', value: '20,000,000 SF' },
    { label: 'Current occupancy', value: '95%' },
    { label: 'Trailing 3-yr avg net absorption', value: '1,200,000 SF/year' },
    { label: 'Spec (non-pre-leased) supply under construction', value: '4,800,000 SF' },
    { label: 'Spec supply delivering within 12 months', value: '3,600,000 SF' },
    { label: 'Underwriting assumption', value: '4% annual rent growth' },
  ],
  question: 'What does the supply pipeline imply for your rent growth assumption?',
  options: [
    {
      label:
        '3,600,000 SF delivering against a 1,200,000 SF/year absorption pace is 3x trailing demand in a single year — vacancy is likely to rise sharply and rent growth should be underwritten well below 4%, possibly flat, until the pipeline is absorbed.',
      isBest: true,
      explanation:
        'The core supply/demand test: compare pipeline deliveries to trailing absorption. 3,600,000 SF vs. a 1,200,000 SF/year pace means even three years of "normal" demand barely clears just the 12-month tranche of new supply — and there\'s another 1,200,000 SF still to come after that. A landlord\'s market (95% leased) can flip to a tenant\'s market fast when a pipeline this large hits at once; underwriting 4% rent growth into that dynamic ignores the leading indicator sitting in the permit data.',
    },
    {
      label: 'Current occupancy is 95%, which is healthy, so the rent growth assumption is reasonable regardless of the pipeline.',
      isBest: false,
      explanation:
        'Occupancy is a lagging, backward-looking metric — it describes the market before the pipeline delivers, not after. A 95%-leased market can absorb a modest amount of new supply without stress, but 3,600,000 SF in 12 months against a 1,200,000 SF/year absorption pace is not modest. Ignoring forward supply because current occupancy looks fine is exactly the mistake that catches late-cycle industrial underwriting off guard.',
    },
    {
      label:
        'Since none of the spec pipeline is pre-leased, most of it probably won\'t get built — discount the 4,800,000 SF figure and keep the rent growth assumption.',
      isBest: false,
      explanation:
        'Confuses pre-leasing percentage with construction risk. The scenario states the space is already under construction — that\'s a fact on the ground, not a future possibility contingent on pre-leasing. Spec industrial development is common in strong markets precisely because absorption has historically been fast enough to support it; assuming it won\'t get built because it isn\'t pre-leased ignores the stated facts.',
    },
    {
      label: 'Match rent growth to the trailing 3-year absorption trend of 1,200,000 SF/year, since that\'s the most recent real data point.',
      isBest: false,
      explanation:
        'Trailing absorption describes a market that hadn\'t yet absorbed this pipeline. Extrapolating a historical trend forward without adjusting for a supply shock that\'s already visible in permit data is backward-looking in the same way as the occupancy answer — it uses real data, but the wrong data for the question being asked.',
    },
  ],
  takeaway:
    'Compare pipeline deliveries to trailing absorption, not to current occupancy. When 12-month spec deliveries exceed a full year (or more) of trailing demand, rent growth assumptions should compress toward flat until the market proves it can absorb the new supply.',
  tips: [
    'Track spec (non-pre-leased) square footage separately from pre-leased/build-to-suit — only spec adds to available supply.',
    'Compare 12-month deliveries to trailing annual absorption as a quick supply-shock test.',
    'Occupancy is a lagging indicator; the permit/construction pipeline is the leading one.',
  ],
};
