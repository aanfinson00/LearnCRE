import type { SituationalCase } from '../../types/situational';

export const hotelCompSetRebuild: SituationalCase = {
  id: 'hotel-comp-set-rebuild',
  title: 'Hotel: is a 98 RevPAR index really upside?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'hotel',
  scenario:
    "A broker markets a 140-key select-service hotel with a RevPAR index of 98 against its six-hotel STR comp set and argues you can reach 110 with new management and a renovation. Looking at the comp set, two hotels opened within the last 18 months and are still ramping, and one is a full-service hotel with 30,000 SF of meeting space. The other three are select-service hotels of similar age.",
  data: [
    { label: 'Subject', value: '140-key select-service' },
    { label: 'RevPAR index', value: '98 vs six-hotel comp set' },
    { label: 'Broker target', value: '110 after renovation' },
    { label: 'Comp set', value: '3 similar select-service, 2 ramping new builds, 1 full-service' },
  ],
  question: 'How should you test the broker\'s claim?',
  options: [
    {
      label:
        "Rebuild the comp set around true peers (the three similar select-service hotels), look at index trends with and without the ramping new builds, and ask what the renovation does for ADR and occupancy compared with the peers. Then test whether 110 is supported.",
      isBest: true,
      explanation:
        "An index is only as good as its comp set. A full-service hotel with large meeting space earns group and banquet revenue the subject never will, and new builds in ramp-up are still gaining share, so both distort the benchmark in different directions. Re-cutting to the three true peers and watching the index over time shows the subject's real position. Then the renovation case has to justify the 12-point gain with specific rate and occupancy drivers.",
    },
    {
      label:
        "Accept the 98 index as reported. It is the official STR number and the broker's 110 target is a reasonable lift.",
      isBest: false,
      explanation:
        "STR reports the index for whichever comp set the owner submitted, so it is not an audited judgment on peer quality. A set that mixes segments and ramping properties can make the subject look better or worse than it is. A 12-point lift needs a plan based on the correct peers.",
    },
    {
      label:
        "Drop the full-service hotel and keep the two new builds, because new product is the best indicator of where the market is heading.",
      isBest: false,
      explanation:
        "New builds still ramping have not reached stabilized occupancy, so their performance is not representative. Their share will change as they mature. Removing one distortion while keeping another does not produce a clean peer set.",
    },
    {
      label:
        "Ignore the index and underwrite from the subject's own RevPAR growth over the last three years.",
      isBest: false,
      explanation:
        "Subject-only trends cannot separate market movement from share gain or loss. The index exists to show whether the hotel is outperforming its market. Own-history trends are useful alongside it, not in place of it.",
    },
  ],
  takeaway:
    "A RevPAR index is a function of its comp set. Rebuild it around true peers, compare trends with and without ramping properties, and require a specific plan for any share gain.",
  tips: [
    "Comp sets should match segment, age, size and location.",
    "New builds in ramp-up and full-service hotels distort a select-service index.",
    "A projected index gain needs named rate and occupancy drivers.",
  ],
};
