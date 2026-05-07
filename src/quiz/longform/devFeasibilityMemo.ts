import type { LongformCase } from '../../types/longform';

export const devFeasibilityMemo: LongformCase = {
  id: 'dev-feasibility-memo',
  title: 'IC memo: defend a ground-up MF dev pencil',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're presenting a 200-unit Class A ground-up multifamily dev to your firm's investment committee. TPC is $50M ($250k/unit). Stabilized NOI is $3.25M (6.5% yield-on-cost). The market cap on stabilized comps is 5.0%, giving a stabilized value of $65M and a 150 bps dev spread vs market cap. The deal is 65% LTC; equity check is $17.5M. Lease-up is 18 months from CO; you're modeling a $1.6M lease-up reserve and a 24-month construction window. Submarket vacancy is 4%; pipeline is +800 units delivering over the next 24 months in your trade area. Construction lender is asking the chairman why you're building when comps trade tighter than your YoC.",
  data: [
    { label: 'TPC', value: '$50M ($250k/unit)' },
    { label: 'Stabilized NOI', value: '$3.25M' },
    { label: 'Yield on cost', value: '6.5%' },
    { label: 'Market cap (stabilized)', value: '5.0%' },
    { label: 'Dev spread', value: '+150 bps' },
    { label: 'Stabilized value', value: '$65M' },
    { label: 'LTC / equity check', value: '65% / $17.5M' },
    { label: 'Lease-up reserve', value: '$1.6M (18 mo)' },
    { label: 'Submarket vacancy', value: '4%' },
    { label: 'Pipeline (24 mo)', value: '+800 units in trade area' },
  ],
  question:
    "Write a 4-6 sentence IC memo defending the buy. Don't pretend the lender's challenge isn't fair — address it directly. What's your dev spread, what stresses the deal, what's the trigger to re-underwrite or walk?",
  modelAnswer: `The 150 bps dev spread is the entire reason we're building rather than buying — at a 5.0% market cap we'd be paying retail for stabilized product, and 150 bps over 24 months of construction risk plus an 18-month lease-up is the standard institutional dev hurdle. We're earning that spread because we're underwriting two real risks the lender is right to flag: cost overruns (mitigated by a 5% contingency reserve and a fixed-price GMP) and supply (the 800-unit pipeline adds 4-5% to existing inventory in our submarket over 24 months — material but not lethal at 4% baseline vacancy). The stress case that matters: if stabilized NOI comes in 5% light at $3.1M and exit cap expands 50 bps to 5.5%, stabilized value drops to $56M, dev spread compresses to ~50 bps, and levered IRR falls below our 12% hurdle. Trigger to re-underwrite is +200 bps of pipeline supply or a 100 bps move in market caps before we lock TI — at that point we'd push for harder rent concessions in the lease-up plan or walk on the GMP. The buy thesis: we're earning institutional dev premium for taking quantified construction + lease-up risk, the model already absorbs a meaningful supply stress, and we have a defined walk threshold tied to the two risks the lender named.`,
  rubric: [
    {
      id: 'states-spread',
      dimension: 'States the dev spread (~150 bps) and frames it as the *reason* to build vs buy',
      weight: 2,
    },
    {
      id: 'addresses-challenge',
      dimension: "Engages with the lender's framing rather than dismissing it",
      weight: 1.5,
    },
    {
      id: 'identifies-risks',
      dimension: 'Names construction-cost + supply pipeline as the two binding risks (not generic "market risk")',
      weight: 2,
    },
    {
      id: 'stress-case',
      dimension: 'Runs a quantified stress (NOI haircut + cap expansion) and shows the IRR impact',
      weight: 1.5,
    },
    {
      id: 'walk-trigger',
      dimension: 'Names a specific re-underwrite or walk trigger tied to one of the named risks',
      weight: 1.5,
    },
  ],
  takeaway:
    "Dev spread is the comp arithmetic that justifies building over buying — but the IC question is always 'how do you know the spread is real and how would you know if you're wrong?' Strong defenses (1) state the spread numerically, (2) name the two specific risks you're paid to take, (3) run a stress that compresses spread to near-zero and shows where that lands the IRR, (4) define a walk threshold tied to the named risks. Weak defenses lean on 'comps support it' or treat construction risk as generic.",
  tips: [
    'Dev-spread targets: 100-150 bps for institutional core dev; 200+ for value-add or merchant build.',
    'The two risks worth quantifying are cost overrun and supply pipeline — interest carry is real but usually fixed in the loan structure.',
    'Walk thresholds tied to specific moves (+200 bps pipeline supply, +100 bps cap shift) are stronger than vague "we monitor it" language.',
  ],
};
