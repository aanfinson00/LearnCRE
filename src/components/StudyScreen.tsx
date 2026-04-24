import { capCompressionPctChange } from '../math/sensitivity';
import { loanConstant } from '../math/debt';
import { cagr, compoundGrowth } from '../math/growth';
import { requiredMultiple } from '../math/returns';
import {
  formatBps,
  formatMultiple,
  formatPct,
  formatPctChange,
  formatYears,
} from '../math/rounding';
import { Button } from './ui/Button';
import { SimpleStudyList, StudyTable } from './StudyTable';

interface Props {
  onBack: () => void;
}

const capRates = [0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.09, 0.1];
const fineCaps = [0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08];
const irrs = [0.06, 0.08, 0.1, 0.12, 0.15, 0.18, 0.2, 0.25];
const holdYears = [3, 5, 7, 10];
const holdYearsWide = [2, 3, 5, 7, 10];
const ems = [1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 3.0];
const rates = [0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08];
const amorts = [20, 25, 30];
const growthRates = [0.02, 0.025, 0.03, 0.035, 0.04, 0.05];
const growthYears = [3, 5, 7, 10, 15];
const vacancies = [0.03, 0.05, 0.07, 0.1, 0.15];
const opexRatios = [0.3, 0.35, 0.4, 0.45, 0.5];

const capMultiplierRows = capRates.map((c) => ({
  label: formatPct(c, 2),
  value: `${(1 / c).toFixed(2)}×`,
  hint: `$1 NOI = ${(1 / c).toFixed(2)} value`,
}));

const rule72Rows = [0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.12, 0.15, 0.18, 0.2, 0.25].map(
  (r) => ({
    label: formatPct(r, 0),
    value: `${(72 / (r * 100)).toFixed(1)}y  ·  ${(114 / (r * 100)).toFixed(1)}y  ·  ${(144 / (r * 100)).toFixed(1)}y`,
    hint: '2× · 3× · 4×',
  }),
);

export function StudyScreen({ onBack }: Props) {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="display text-4xl text-warm-black">
            Study Tables<span className="text-copper">.</span>
          </h1>
          <p className="editorial text-lg text-warm-stone">
            Reference cheat sheets for the relationships that show up most often.
            Memorize the anchors, interpolate for the rest.
          </p>
        </div>
        <Button variant="secondary" onClick={onBack} className="text-xs">
          ← Back to setup
        </Button>
      </header>

      <section className="space-y-2">
        <div className="flex items-baseline gap-3">
          <div className="h-px flex-1 bg-warm-line" />
          <h2 className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Cap rate
          </h2>
          <div className="h-px flex-1 bg-warm-line" />
        </div>
      </section>

      <SimpleStudyList
        title="Cap rate → NOI multiplier"
        description="1 / cap. $1 of NOI equals this many dollars of value."
        rows={capMultiplierRows}
      />

      <StudyTable
        title="Cap compression — % change in value"
        description="Old cap → new cap. Cell = (old / new) − 1. Negative = cap expansion (value lost)."
        rowLabel="Old cap"
        colLabel="New cap"
        rowValues={fineCaps}
        colValues={fineCaps}
        formatRow={(v) => formatPct(v, 2)}
        formatCol={(v) => formatPct(v, 2)}
        compute={capCompressionPctChange}
        formatCell={(v) => formatPctChange(v, 1)}
        highlightDiagonal
      />

      <section className="space-y-2 pt-4">
        <div className="flex items-baseline gap-3">
          <div className="h-px flex-1 bg-warm-line" />
          <h2 className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Returns
          </h2>
          <div className="h-px flex-1 bg-warm-line" />
        </div>
      </section>

      <StudyTable
        title="IRR × Hold years → required equity multiple"
        description="What EM do you need to hit a given IRR over n years? (1 + IRR)^n."
        rowLabel="IRR"
        colLabel="Hold"
        rowValues={irrs}
        colValues={holdYears}
        formatRow={(v) => formatPct(v, 0)}
        formatCol={formatYears}
        compute={requiredMultiple}
        formatCell={(v) => formatMultiple(v, 2)}
      />

      <StudyTable
        title="Equity multiple × Hold years → implied IRR"
        description="Given you got EM × your equity back over n years. (EM)^(1/n) − 1."
        rowLabel="EM"
        colLabel="Hold"
        rowValues={ems}
        colValues={holdYearsWide}
        formatRow={(v) => formatMultiple(v, 2)}
        formatCol={formatYears}
        compute={(em, years) => cagr(1, em, years)}
        formatCell={(v) => formatPct(v, 1)}
      />

      <SimpleStudyList
        title="Rules of 72 / 114 / 144 — years to 2×, 3×, 4×"
        description="Rule of N says time to multiply by the target ≈ N / rate%. Quick way to back into doubling/tripling horizons."
        rows={rule72Rows}
      />

      <section className="space-y-2 pt-4">
        <div className="flex items-baseline gap-3">
          <div className="h-px flex-1 bg-warm-line" />
          <h2 className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Debt
          </h2>
          <div className="h-px flex-1 bg-warm-line" />
        </div>
      </section>

      <StudyTable
        title="Rate × Amortization → loan constant"
        description="Annualized monthly-amort payment as % of loan balance. For IO debt, constant = rate exactly."
        rowLabel="Rate"
        colLabel="Amort"
        rowValues={rates}
        colValues={amorts}
        formatRow={(v) => formatPct(v, 2)}
        formatCol={(v) => `${v}y`}
        compute={(rate, years) => loanConstant(rate, years)}
        formatCell={(v) => formatBps(v)}
      />

      <section className="space-y-2 pt-4">
        <div className="flex items-baseline gap-3">
          <div className="h-px flex-1 bg-warm-line" />
          <h2 className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Growth & margin
          </h2>
          <div className="h-px flex-1 bg-warm-line" />
        </div>
      </section>

      <StudyTable
        title="Growth rate × Years → compound factor"
        description="(1 + r)^n. Multiply any starting value (rent, NOI, taxes) by this to project forward."
        rowLabel="Rate"
        colLabel="Years"
        rowValues={growthRates}
        colValues={growthYears}
        formatRow={(v) => formatPct(v, 1)}
        formatCol={formatYears}
        compute={(r, n) => compoundGrowth(1, r, n)}
        formatCell={(v) => `${v.toFixed(3)}×`}
      />

      <StudyTable
        title="Vacancy × OpEx ratio → NOI margin"
        description="(1 − vacancy) × (1 − opex ratio). % of GPR that drops through to NOI."
        rowLabel="Vacancy"
        colLabel="OpEx ratio"
        rowValues={vacancies}
        colValues={opexRatios}
        formatRow={(v) => formatPct(v, 0)}
        formatCol={(v) => formatPct(v, 0)}
        compute={(vac, oer) => (1 - vac) * (1 - oer)}
        formatCell={(v) => formatPct(v, 1)}
      />

      <footer className="pt-4 text-center text-xs text-warm-mute">
        Ranges mirror the quiz bands. Tap-and-hold to copy a value on mobile; use ⌘F to find any anchor.
      </footer>
    </div>
  );
}
