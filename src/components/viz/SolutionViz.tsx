import type { Question } from '../../types/question';
import { irrSingle, requiredEquityOut } from '../../math/returns';
import { CapCompressionViz } from './CapCompressionViz';
import { CompoundGrowthViz } from './CompoundGrowthViz';
import { IrrHoldViz } from './IrrHoldViz';
import { NoiWaterfallViz } from './NoiWaterfallViz';
import { VacancyViz } from './VacancyViz';

interface Props {
  question: Question;
}

export function SolutionViz({ question }: Props) {
  const ctx = question.context;

  switch (question.kind) {
    case 'capCompression':
      if (ctx.noi !== undefined && ctx.capRate !== undefined && ctx.newCapRate !== undefined) {
        return (
          <CapCompressionViz
            noi={ctx.noi}
            oldCap={ctx.capRate}
            newCap={ctx.newCapRate}
          />
        );
      }
      return null;

    case 'combinedScenario':
      if (
        ctx.gpr !== undefined &&
        ctx.vacancyRate !== undefined &&
        ctx.opex !== undefined &&
        ctx.capRate !== undefined
      ) {
        return (
          <NoiWaterfallViz
            gpr={ctx.gpr}
            otherIncome={ctx.otherIncome ?? 0}
            vacancy={ctx.vacancyRate}
            opex={ctx.opex}
            cap={ctx.capRate}
          />
        );
      }
      return null;

    case 'compoundGrowth':
      if (
        ctx.startValue !== undefined &&
        ctx.growthRate !== undefined &&
        ctx.projectionYears !== undefined
      ) {
        return (
          <CompoundGrowthViz
            start={ctx.startValue}
            rate={ctx.growthRate}
            years={ctx.projectionYears}
          />
        );
      }
      return null;

    case 'irrSimple':
      if (
        ctx.equityIn !== undefined &&
        ctx.equityOut !== undefined &&
        ctx.holdYears !== undefined
      ) {
        return (
          <IrrHoldViz
            equityIn={ctx.equityIn}
            equityOut={ctx.equityOut}
            years={ctx.holdYears}
            irr={irrSingle(ctx.equityIn, ctx.equityOut, ctx.holdYears)}
          />
        );
      }
      return null;

    case 'targetMultiple':
      if (ctx.targetIrr !== undefined && ctx.holdYears !== undefined) {
        const equityIn = 1_000_000;
        const equityOut = requiredEquityOut(equityIn, ctx.targetIrr, ctx.holdYears);
        return (
          <IrrHoldViz
            equityIn={equityIn}
            equityOut={equityOut}
            years={ctx.holdYears}
            irr={ctx.targetIrr}
          />
        );
      }
      return null;

    case 'vacancySensitivity':
      if (
        ctx.gpr !== undefined &&
        ctx.oldVacancy !== undefined &&
        ctx.newVacancy !== undefined &&
        ctx.capRate !== undefined
      ) {
        return (
          <VacancyViz
            gpr={ctx.gpr}
            otherIncome={ctx.otherIncome ?? 0}
            oldVacancy={ctx.oldVacancy}
            newVacancy={ctx.newVacancy}
            cap={ctx.capRate}
          />
        );
      }
      return null;

    default:
      return null;
  }
}
