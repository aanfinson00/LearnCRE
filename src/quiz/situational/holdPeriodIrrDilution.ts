import type { SituationalCase } from '../../types/situational';

export const holdPeriodIrrDilution: SituationalCase = {
  id: 'hold-period-irr-dilution',
  title: 'Your 3-year hold just became a 5-year hold',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'mixed',
  scenario:
    'You underwrote a $25M stabilized office acquisition with a 3-year hold and a 15% levered IRR. At Year 3, the market softens and the team votes to hold 2 more years. The asset cash-flows at a 7% unlevered yield (roughly 9–10% levered on 60% LTV debt). The exit at Year 5 is modeled at the same cap rate as Year 3. No refinancing.',
  data: [
    { label: 'Original hold period', value: '3 years' },
    { label: 'Extended hold', value: '5 years' },
    { label: 'Original levered IRR', value: '15%' },
    { label: 'Unlevered going-in yield', value: '7%' },
    { label: 'Levered cash-on-cash yield (est.)', value: '~9–10%' },
    { label: 'Exit cap rate (Year 5)', value: 'Same as Year 3 — no re-rating' },
  ],
  question: 'Does extending the hold 2 years improve or hurt the levered IRR, and why?',
  options: [
    {
      label: 'It hurts the IRR — delaying the large exit proceeds 2 years costs more in present value than 2 years of below-hurdle interim cash flow gains.',
      isBest: true,
      explanation:
        'IRR is extremely sensitive to timing. The large exit proceed (sale price) delayed 2 years at a 15% hurdle loses roughly 25–30% of its present value over those 2 extra years ($25M × ((1/1.15²) − 1) ≈ −$6.2M in PV terms). The extra 2 years of levered cash flow at 9–10% yield generates roughly $4.5–5M of additional cash — but discounted at 15%, those future flows are worth only ~$3.5–4M today. The net result: IRR drops, typically by 150–300 bps when the exit cap doesn\'t improve. The only way a hold extension is IRR-neutral or positive is when (a) the interim cash yield exceeds the IRR hurdle, or (b) the exit cap re-rates favorably in the extended period.',
    },
    {
      label: 'It improves the IRR — 2 more years of cash flow increases total return dollars.',
      isBest: false,
      explanation:
        'Confuses total dollars with time-weighted return. IRR penalizes late cash flows. The same $5M received 2 years later is worth significantly less at a 15% discount rate. Increasing total dollars while delaying the timing of the large terminal proceed almost always decreases IRR unless the interim yield clears the hurdle — and at 9–10% levered yield vs. a 15% IRR hurdle, it doesn\'t.',
    },
    {
      label: 'It\'s neutral — cash flow at 9–10% exactly offsets the delayed terminal proceeds.',
      isBest: false,
      explanation:
        'Only neutral if the annual interim cash yield exactly equals the IRR hurdle (15%). At 9–10% levered cash yield, holding extra years is below the hurdle — each year of hold extension at below-hurdle yield is return-dilutive. The breakeven hold extension requires cash flow yield = IRR hurdle. That\'s rarely the case on stabilized assets.',
    },
    {
      label: 'It depends entirely on cap rate movement — if rates fall, the extended hold is worth it.',
      isBest: false,
      explanation:
        'The scenario stipulates the exit cap is unchanged at Year 5 vs. Year 3. The question is testing the IRR impact of timing, not cap rate re-rating. In the real world, cap rate improvement is the main catalyst that makes a hold extension IRR-accretive — but the scenario explicitly excludes it to isolate the timing effect.',
    },
  ],
  takeaway:
    'Hold period extensions almost always reduce IRR when the exit cap rate doesn\'t improve, because the large terminal proceed (sale price) delayed 2 years costs more in present value than below-hurdle interim cash flows recover. The rule of thumb: hold extension is IRR-neutral only when levered cash yield ≥ hurdle rate. On stabilized 60–65% LTV deals, levered cash yields rarely hit 15%; cap rate re-rating is the only reliable IRR-accretive reason to hold.',
  tips: [
    'Hold extension IRR rule: neutral only when levered cash yield ≥ IRR hurdle. Below hurdle = dilutive.',
    'Cap rate re-rating is the primary reason a hold extension is IRR-accretive.',
    'Quick test: PV of extra cash flows vs. PV loss on delayed terminal proceeds. Compare at the hurdle.',
  ],
};
