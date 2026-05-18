import type { SituationalCase } from '../../types/situational';

export const sensitivityExitCapVsNoi: SituationalCase = {
  id: 'sensitivity-exit-cap-vs-noi',
  title: 'IC question: "Is the model more sensitive to exit cap or NOI growth?" — answer quantitatively',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'mixed',
  scenario:
    "You're presenting a 5-year multifamily value-add acquisition to IC. Going-in cap is 5.0% on a $90M purchase, Year-1 NOI is $4.5M, and you've underwritten 3% annual NOI growth compounding over 5 years. Exit cap is 5.25%. Year-5 NOI compounds to $5.22M; exit value is $99.4M ($5.22M / 5.25%). Levered IRR is 14.5%. Your senior PM asks: 'Is the model more sensitive to a 50bps miss on exit cap or a 10% shortfall in NOI growth across the hold?' You need to answer with numbers.",
  data: [
    { label: 'Asset', value: 'Multifamily value-add, 5-year hold' },
    { label: 'Purchase price', value: '$90M (5.0% going-in cap)' },
    { label: 'Year-1 NOI', value: '$4.5M' },
    { label: 'NOI growth underwritten', value: '3.0% annual compound' },
    { label: 'Exit cap underwritten', value: '5.25%' },
    { label: 'Year-5 NOI (3% compounded)', value: '$5.22M' },
    { label: 'Exit value underwritten', value: '$99.4M' },
    { label: 'Levered IRR', value: '14.5%' },
  ],
  question: "Which sensitivity has greater IRR impact, and how should each risk be managed differently?",
  options: [
    {
      label:
        "Run both explicitly: (1) Exit cap +50bps (5.25% → 5.75%) on $5.22M NOI: exit value drops from $99.4M to $90.8M — $8.6M hit, ~190bps of IRR. (2) NOI -10% (3% → ~0.8% compounded growth): Year-5 NOI $4.72M at 5.25% exit cap → exit value $89.9M — $9.5M hit, ~210bps of IRR. NOI underperformance is slightly worse in this model. But the qualitative distinction matters: exit cap is externally driven (market conditions at disposition); NOI is operationally driven (rent collections, occupancy, expenses). Defend your operational assumptions in IC — those are within your control. Manage exit cap risk through hold-period flexibility, not model precision.",
      isBest: true,
      explanation:
        "Right answer: calculate both, then distinguish between controllable and uncontrollable risk. In this model, a 10% NOI growth miss is marginally more damaging than a 50bps exit cap miss. But the more important insight is the nature of each risk: NOI underperformance is operationally diagnosable and defensible in IC (rent comps, loss-to-lease, expense benchmarks). Exit cap risk is externally set at disposition — the only hedge is hold-period flexibility (ability to wait for a favorable rate environment). Knowing which axis to defend in IC and how to manage each risk type is what the PM is actually testing.",
    },
    {
      label:
        "Exit cap always dominates — it multiplies the entire terminal NOI, so a 50bps move always has more impact than any NOI shortfall.",
      isBest: false,
      explanation:
        "Not universally true. It depends on the model's NOI growth assumption and hold period. A 50bps exit cap miss on $5.22M NOI = $8.6M value hit. A 10% NOI miss compounding over 5 years produces $4.72M year-5 NOI, worth $89.9M at the same cap — a $9.5M hit. In this specific model, NOI underperformance is marginally larger. 'Exit cap always wins' is a useful heuristic for core assets with flat NOI, but breaks in value-add models where NOI growth is a significant return driver.",
    },
    {
      label:
        "NOI growth is never the binding constraint if you underwrite conservatively on the going-in cap — buying right means exit cap uncertainty matters more.",
      isBest: false,
      explanation:
        "Buying at a disciplined going-in cap reduces acquisition risk but doesn't eliminate NOI execution risk. Value-add returns depend on the value-add materializing — if rent bumps don't land or expenses blow out, the going-in cap was irrelevant. 'Buy right' protects you at entry, not through the hold.",
    },
    {
      label:
        "The two sensitivities roughly cancel out — a NOI miss typically coincides with cap rate widening (both happen in a downturn), so analyzing them separately is misleading.",
      isBest: false,
      explanation:
        "Correlation is real (rising rates often compress NOI growth AND widen caps simultaneously), but the PM's question asks you to isolate each variable — that's how sensitivity analysis works. Conflating the two tells you nothing about which deserves more underwriting scrutiny. Correlation is a scenario to stress test separately, not a reason to avoid individual sensitivity analysis.",
    },
  ],
  takeaway:
    "Sensitivity analysis answers two questions: (1) which variable has more mathematical impact on IRR; (2) which is within your control. In most 5-7 year value-add models, exit cap and NOI sensitivities are within the same order of magnitude — neither dominates by a large margin. The qualitative distinction (internally vs. externally driven) is often more important to IC than the precise basis-point difference in IRR impact. Exit cap risk is managed through hold-period flexibility; NOI risk is managed through operational underwriting discipline and active asset management.",
  tips: [
    "Sensitivity mechanics shortcut: exit cap sensitivity ≈ ΔNOI × (1/cap²). A 50bps move on a 5.25% exit cap ≈ 1.8× the annual NOI in value change — roughly $9-10M on $5M of NOI.",
    "NOI compounding: a 10% total growth miss over 5 years (3% vs. ~0.8% annual) compounds to a smaller NOI and smaller exit value. Model explicitly — don't hand-wave the 'miss' as a flat haircut to year-5 NOI.",
    "Hold-period flexibility as the exit cap hedge: stress-test IRR at year 4 and year 7 exits alongside year 5. If the model is highly sensitive to exit cap, the ability to hold longer is free optionality worth preserving in the debt structure (extension options, no hard maturity before year 7).",
  ],
};
