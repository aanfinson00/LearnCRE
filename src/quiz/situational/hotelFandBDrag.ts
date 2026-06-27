import type { SituationalCase } from '../../types/situational';

export const hotelFandBDrag: SituationalCase = {
  id: 'hotel-fandb-drag',
  title: 'Hotel: the F&B outlet is dragging GOP — cut it or fix it?',
  category: 'diagnostic',
  difficulty: 'advanced',
  roles: ['assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You asset-manage a 280-key full-service hotel with a flag requirement to operate a restaurant, bar, and room service. T-12 F&B revenue is $3.1M. F&B cost of goods is $1.1M (35% COGS), F&B labor is $1.5M, and other F&B expenses are $400k — leaving F&B operating income at $100k before allocated overhead. The broader hotel GOP is 32% — below the 36-38% comp-set benchmark. The operator is requesting a $600k renovation of the restaurant to 'drive covers' and close the GOP gap.",
  data: [
    { label: 'Hotel keys', value: '280' },
    { label: 'F&B revenue (T-12)', value: '$3.1M' },
    { label: 'F&B COGS', value: '$1.1M (35%)' },
    { label: 'F&B labor', value: '$1.5M' },
    { label: 'F&B other expenses', value: '$400k' },
    { label: 'F&B operating income', value: '$100k' },
    { label: 'Hotel GOP', value: '32% (vs 36-38% comp-set benchmark)' },
    { label: 'Proposed restaurant reno', value: '$600k' },
  ],
  question:
    'Before approving the $600k renovation, what do you need to diagnose, and what are the alternative paths to closing the GOP gap?',
  options: [
    {
      label:
        "F&B is running a 3.2% operating margin on $3.1M revenue — barely positive before overhead allocation, which likely makes it a net drag. Before committing $600k, diagnose three things: (1) labor cost per cover vs. comp set (labor at 48% of revenue is high for full-service; 38-42% is typical); (2) the flag's minimum service requirement — can you reduce hours, eliminate room service, or lease the outlet to a third-party F&B operator; (3) whether the GOP gap is all F&B or also rooms/OpEx. If F&B labor is the culprit, renovating the restaurant won't fix it. Alternatives: third-party lease (converts drag to a small fixed income), hours reduction, or renegotiating with the flag.",
      isBest: true,
      explanation:
        "Right diagnosis. F&B at 3.2% margin is essentially breakeven — after overhead allocation it's almost certainly negative. The operator's proposed renovation would generate incremental revenue but also incremental labor (more covers = more servers); renovations rarely fix structural labor inefficiency. The three diagnostics (labor cost per cover, flag minimum requirement, full GOP waterfall) are the right starting points. Third-party leasing is the most effective structural fix for full-service hotels where brand standards allow it — it converts a loss center into a fixed-income line.",
    },
    {
      label:
        "Approve the $600k renovation — the operator is right that driving covers will improve the F&B margin since fixed costs get spread over more revenue.",
      isBest: false,
      explanation:
        "Misunderstands F&B cost structure. F&B labor is largely variable (server hours, kitchen staff), not fixed — more covers means more labor. A restaurant renovation that doubles covers might increase revenue from $3.1M to $4.5M but also adds $500-700k of labor and COGS, leaving the margin largely unchanged. The $600k renovation has a long payback on a 3.2% F&B margin. The right question is 'why is margin low' before investing in more throughput.",
    },
    {
      label:
        "Close the restaurant entirely — a 3.2% F&B margin is unacceptable and the outlet should be converted to event space or meeting rooms.",
      isBest: false,
      explanation:
        "May conflict with brand standards. Full-service flags (Marriott, Hilton, Hyatt) typically require food service as a condition of the franchise agreement. Closing the outlet without brand approval could trigger a flag termination event, which carries far larger financial consequences than a breakeven F&B operation. Understand the minimum service requirement first — sometimes you can reduce to continental breakfast only or operate a ghost kitchen, but full closure requires flag consent.",
    },
    {
      label:
        "The GOP gap is a rooms issue, not an F&B issue — focus on RevPAR to close the benchmark gap, since F&B is only 3.2% of hotel revenue.",
      isBest: false,
      explanation:
        "F&B is 15-25% of full-service hotel revenue — $3.1M on what's likely a $12-15M revenue hotel is ~20-25%, which is material. More importantly, $100k in F&B operating income before overhead allocation likely becomes a loss after allocation, directly suppressing GOP. The rooms department benchmark gap and the F&B drag are additive problems; ignoring the latter because rooms is the bigger driver leaves money on the table.",
    },
  ],
  takeaway:
    "F&B in full-service hotels is structurally difficult to operate profitably — labor costs at 40-50% of revenue and COGS at 30-35% leave thin margins. The asset manager's job is to diagnose whether the drag is structural (labor model, covers volume) or curable (reno, menu engineering, third-party lease). Always check the flag's minimum service requirements before pursuing structural solutions. Third-party F&B leases are the most effective structural fix where the brand allows it — they convert a cost center into fixed income.",
  tips: [
    "F&B margin benchmarks: full-service hotel ~15-20% GOP contribution; below 10% signals a structural problem.",
    "Flag minimum service clauses vary: luxury flags often require 24/7 room service; select-service flags may allow 'grab and go' only.",
    "Third-party F&B lease structure: landlord gets a rent floor + percentage of sales (typically 8-12%). Converts labor risk to the operator.",
  ],
};
