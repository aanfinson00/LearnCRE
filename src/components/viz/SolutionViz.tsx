import type { Question } from '../../types/question';
import { irrSingle, requiredEquityOut } from '../../math/returns';
import { AllInBasisViz } from './AllInBasisViz';
import { CapCompressionViz } from './CapCompressionViz';
import { CashOnCashViz } from './CashOnCashViz';
import { CompoundGrowthViz } from './CompoundGrowthViz';
import { DebtYieldViz } from './DebtYieldViz';
import { DevSpreadViz } from './DevSpreadViz';
import { DscrLoanSizingViz } from './DscrLoanSizingViz';
import { EquityMultipleViz } from './EquityMultipleViz';
import { IrrHoldViz } from './IrrHoldViz';
import { NoiWaterfallViz } from './NoiWaterfallViz';
import { RentChangeViz } from './RentChangeViz';
import { RentRollChangeViz } from './RentRollChangeViz';
import { ReplacementCostViz } from './ReplacementCostViz';
import { TiVsRentViz } from './TiVsRentViz';
import { VacancyViz } from './VacancyViz';
import { PricePerSfViz } from './PricePerSfViz';
import { PricePerUnitViz } from './PricePerUnitViz';
import { RentPerUnitViz } from './RentPerUnitViz';
import { OpexPerUnitViz } from './OpexPerUnitViz';
import { SalesPerSfViz } from './SalesPerSfViz';
import { GoingInCapViz } from './GoingInCapViz';
import { LoanConstantViz } from './LoanConstantViz';
import { DscrFromNoiAndDsViz } from './DscrFromNoiAndDsViz';
import { DscrTestPassesViz } from './DscrTestPassesViz';
import { GrossRentMultiplierViz } from './GrossRentMultiplierViz';

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

    case 'rentChange':
      if (
        ctx.oldRent !== undefined &&
        ctx.newRent !== undefined &&
        ctx.vacancyRate !== undefined &&
        ctx.capRate !== undefined
      ) {
        return (
          <RentChangeViz
            oldRent={ctx.oldRent}
            newRent={ctx.newRent}
            vacancy={ctx.vacancyRate}
            cap={ctx.capRate}
          />
        );
      }
      return null;

    case 'rentRollChange':
      if (
        ctx.buildingSf !== undefined &&
        ctx.oldRentPerSf !== undefined &&
        ctx.newRentPerSf !== undefined &&
        ctx.rolloverPct !== undefined &&
        ctx.vacancyRate !== undefined &&
        ctx.capRate !== undefined
      ) {
        return (
          <RentRollChangeViz
            buildingSf={ctx.buildingSf}
            oldRentPerSf={ctx.oldRentPerSf}
            newRentPerSf={ctx.newRentPerSf}
            rolloverPct={ctx.rolloverPct}
            vacancyRate={ctx.vacancyRate}
            capRate={ctx.capRate}
          />
        );
      }
      return null;

    case 'tiVsRent':
      if (
        ctx.altRentPerSf !== undefined &&
        ctx.altTiPerSf !== undefined &&
        ctx.rentPerSf !== undefined &&
        ctx.tiPerSf !== undefined &&
        ctx.leaseTermYears !== undefined
      ) {
        return (
          <TiVsRentViz
            altRentPerSf={ctx.altRentPerSf}
            altTiPerSf={ctx.altTiPerSf}
            rentPerSf={ctx.rentPerSf}
            tiPerSf={ctx.tiPerSf}
            leaseTermYears={ctx.leaseTermYears}
          />
        );
      }
      return null;

    case 'replacementCost':
      if (ctx.replacementCostPerSf !== undefined && ctx.buildingSf !== undefined) {
        return (
          <ReplacementCostViz
            replacementCostPerSf={ctx.replacementCostPerSf}
            buildingSf={ctx.buildingSf}
          />
        );
      }
      return null;

    case 'devSpread':
      if (
        ctx.stabilizedNoi !== undefined &&
        ctx.totalProjectCost !== undefined &&
        ctx.marketCapRate !== undefined
      ) {
        return (
          <DevSpreadViz
            stabilizedNoi={ctx.stabilizedNoi}
            totalProjectCost={ctx.totalProjectCost}
            marketCapRate={ctx.marketCapRate}
          />
        );
      }
      return null;

    case 'debtYield':
      if (ctx.noi !== undefined && ctx.debtYieldTarget !== undefined) {
        return <DebtYieldViz noi={ctx.noi} debtYieldTarget={ctx.debtYieldTarget} />;
      }
      return null;

    case 'dscrLoanSizing':
      if (
        ctx.noi !== undefined &&
        ctx.dscrTarget !== undefined &&
        ctx.interestRate !== undefined &&
        ctx.amortYears !== undefined
      ) {
        return (
          <DscrLoanSizingViz
            noi={ctx.noi}
            dscrTarget={ctx.dscrTarget}
            interestRate={ctx.interestRate}
            amortYears={ctx.amortYears}
          />
        );
      }
      return null;

    case 'cashOnCash':
      if (
        ctx.noi !== undefined &&
        ctx.debtServiceAnnual !== undefined &&
        ctx.equityIn !== undefined &&
        ctx.loanAmount !== undefined &&
        ctx.purchasePrice !== undefined
      ) {
        return (
          <CashOnCashViz
            noi={ctx.noi}
            debtServiceAnnual={ctx.debtServiceAnnual}
            equityIn={ctx.equityIn}
            loanAmount={ctx.loanAmount}
            purchasePrice={ctx.purchasePrice}
          />
        );
      }
      return null;

    case 'equityMultiple':
      if (ctx.equityIn !== undefined && ctx.equityOut !== undefined) {
        return <EquityMultipleViz equityIn={ctx.equityIn} equityOut={ctx.equityOut} />;
      }
      return null;

    case 'allInBasis':
      if (
        ctx.purchasePrice !== undefined &&
        ctx.capex !== undefined &&
        ctx.closingCostRate !== undefined &&
        ctx.buildingSf !== undefined
      ) {
        return (
          <AllInBasisViz
            purchasePrice={ctx.purchasePrice}
            capex={ctx.capex}
            closingCostRate={ctx.closingCostRate}
            buildingSf={ctx.buildingSf}
          />
        );
      }
      return null;

    case 'pricePerSf':
      if (ctx.purchasePrice !== undefined && ctx.buildingSf !== undefined) {
        return (
          <PricePerSfViz
            purchasePrice={ctx.purchasePrice}
            buildingSf={ctx.buildingSf}
          />
        );
      }
      return null;

    case 'pricePerUnit':
      if (ctx.purchasePrice !== undefined && ctx.units !== undefined) {
        return (
          <PricePerUnitViz
            purchasePrice={ctx.purchasePrice}
            units={ctx.units}
          />
        );
      }
      return null;

    case 'rentPerUnit':
      if (ctx.gpr !== undefined && ctx.units !== undefined) {
        return <RentPerUnitViz gpr={ctx.gpr} units={ctx.units} />;
      }
      return null;

    case 'opexPerUnit':
      if (ctx.opex !== undefined && ctx.units !== undefined) {
        return <OpexPerUnitViz opex={ctx.opex} units={ctx.units} />;
      }
      return null;

    case 'salesPerSf':
      if (ctx.tenantSales !== undefined && ctx.buildingSf !== undefined) {
        return (
          <SalesPerSfViz
            tenantSales={ctx.tenantSales}
            buildingSf={ctx.buildingSf}
          />
        );
      }
      return null;

    case 'goingInCap':
      if (ctx.purchasePrice !== undefined && ctx.noi !== undefined) {
        return (
          <GoingInCapViz purchasePrice={ctx.purchasePrice} noi={ctx.noi} />
        );
      }
      return null;

    case 'loanConstant':
      if (ctx.interestRate !== undefined && ctx.amortYears !== undefined) {
        return (
          <LoanConstantViz
            interestRate={ctx.interestRate}
            amortYears={ctx.amortYears}
          />
        );
      }
      return null;

    case 'dscrFromNoiAndDs':
      if (ctx.noi !== undefined && ctx.debtServiceAnnual !== undefined) {
        return (
          <DscrFromNoiAndDsViz
            noi={ctx.noi}
            debtServiceAnnual={ctx.debtServiceAnnual}
          />
        );
      }
      return null;

    case 'dscrTestPasses':
      if (
        ctx.noi !== undefined &&
        ctx.debtServiceAnnual !== undefined &&
        ctx.dscrTarget !== undefined
      ) {
        return (
          <DscrTestPassesViz
            noi={ctx.noi}
            debtServiceAnnual={ctx.debtServiceAnnual}
            dscrTarget={ctx.dscrTarget}
          />
        );
      }
      return null;

    case 'grossRentMultiplier':
      if (ctx.purchasePrice !== undefined && ctx.gpr !== undefined) {
        return (
          <GrossRentMultiplierViz
            purchasePrice={ctx.purchasePrice}
            gpr={ctx.gpr}
          />
        );
      }
      return null;

    default:
      return null;
  }
}
