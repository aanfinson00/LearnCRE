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
import { OtherIncomeImpactViz } from './OtherIncomeImpactViz';
import { LossToLeaseViz } from './LossToLeaseViz';
import { OccupancyCostRatioViz } from './OccupancyCostRatioViz';
import { OperatingExpenseRatioViz } from './OperatingExpenseRatioViz';
import { YieldOnCostViz } from './YieldOnCostViz';
import { ReversionValueViz } from './ReversionValueViz';
import { BreakEvenOccupancyViz } from './BreakEvenOccupancyViz';
import { NetEffectiveRentViz } from './NetEffectiveRentViz';
import { WaltViz } from './WaltViz';
import { CagrViz } from './CagrViz';
import { PrefAccrualViz } from './PrefAccrualViz';
import { GpCatchUpViz } from './GpCatchUpViz';
import { WaterfallSimpleSplitViz } from './WaterfallSimpleSplitViz';
import { GpEffectivePromoteViz } from './GpEffectivePromoteViz';
import { LeveredIrrViz } from './LeveredIrrViz';
import { HoldVsSellIrrViz } from './HoldVsSellIrrViz';
import { IrrAfterPromoteViz } from './IrrAfterPromoteViz';
import { DscrSensitivityRateViz } from './DscrSensitivityRateViz';
import { ExtensionDragViz } from './ExtensionDragViz';
import { TaxAdjustedExitViz } from './TaxAdjustedExitViz';
import { CostToCompleteViz } from './CostToCompleteViz';
import { DrawAllocationViz } from './DrawAllocationViz';
import { ContingencyDrawDownViz } from './ContingencyDrawDownViz';
import { RetainageRunningViz } from './RetainageRunningViz';
import { FfeReserveDollarsViz } from './FfeReserveDollarsViz';
import { RevparFromAdrOccViz } from './RevparFromAdrOccViz';
import { GopMarginViz } from './GopMarginViz';
import { RevporVsRevparViz } from './RevporVsRevparViz';
import { PercentageRentBreakpointViz } from './PercentageRentBreakpointViz';
import { ClearHeightPremiumViz } from './ClearHeightPremiumViz';
import { TruckCountPerSfViz } from './TruckCountPerSfViz';
import { TaxReassessmentViz } from './TaxReassessmentViz';
import { OpexChangeViz } from './OpexChangeViz';
import { NoiFromOerViz } from './NoiFromOerViz';
import { TiPaybackViz } from './TiPaybackViz';
import { TiPerSfPerYearOfTermViz } from './TiPerSfPerYearOfTermViz';
import { RenewalProbabilityWeightedRentViz } from './RenewalProbabilityWeightedRentViz';

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

    case 'otherIncomeImpact':
      if (
        ctx.otherIncome !== undefined &&
        ctx.vacancyRate !== undefined &&
        ctx.capRate !== undefined
      ) {
        return (
          <OtherIncomeImpactViz
            otherIncome={ctx.otherIncome}
            vacancyRate={ctx.vacancyRate}
            capRate={ctx.capRate}
          />
        );
      }
      return null;

    case 'lossToLease':
      if (ctx.marketRent !== undefined && ctx.inPlaceRent !== undefined) {
        return (
          <LossToLeaseViz
            marketRent={ctx.marketRent}
            inPlaceRent={ctx.inPlaceRent}
          />
        );
      }
      return null;

    case 'occupancyCostRatio':
      if (ctx.baseRent !== undefined && ctx.tenantSales !== undefined) {
        return (
          <OccupancyCostRatioViz
            baseRent={ctx.baseRent}
            tenantSales={ctx.tenantSales}
          />
        );
      }
      return null;

    case 'operatingExpenseRatio':
      if (ctx.egi !== undefined && ctx.opex !== undefined) {
        return <OperatingExpenseRatioViz egi={ctx.egi} opex={ctx.opex} />;
      }
      return null;

    case 'yieldOnCost':
      if (
        ctx.totalProjectCost !== undefined &&
        ctx.stabilizedNoi !== undefined
      ) {
        return (
          <YieldOnCostViz
            totalProjectCost={ctx.totalProjectCost}
            stabilizedNoi={ctx.stabilizedNoi}
          />
        );
      }
      return null;

    case 'reversionValue':
      if (ctx.stabilizedNoi !== undefined && ctx.exitCap !== undefined) {
        return (
          <ReversionValueViz
            stabilizedNoi={ctx.stabilizedNoi}
            exitCap={ctx.exitCap}
            holdYears={ctx.holdYears}
          />
        );
      }
      return null;

    case 'breakEvenOccupancy':
      if (
        ctx.pgi !== undefined &&
        ctx.opex !== undefined &&
        ctx.debtServiceAnnual !== undefined
      ) {
        return (
          <BreakEvenOccupancyViz
            pgi={ctx.pgi}
            opex={ctx.opex}
            debtServiceAnnual={ctx.debtServiceAnnual}
          />
        );
      }
      return null;

    case 'netEffectiveRent':
      if (
        ctx.rentPerSf !== undefined &&
        ctx.leaseTermYears !== undefined &&
        ctx.tiPerSf !== undefined &&
        ctx.freeMonths !== undefined
      ) {
        return (
          <NetEffectiveRentViz
            rentPerSf={ctx.rentPerSf}
            leaseTermYears={ctx.leaseTermYears}
            tiPerSf={ctx.tiPerSf}
            freeMonths={ctx.freeMonths}
          />
        );
      }
      return null;

    case 'walt':
      if (Array.isArray(ctx.leases) && ctx.leases.length > 0) {
        return <WaltViz leases={ctx.leases} />;
      }
      return null;

    case 'cagr':
      if (
        ctx.startValue !== undefined &&
        ctx.endValue !== undefined &&
        ctx.projectionYears !== undefined
      ) {
        return (
          <CagrViz
            startValue={ctx.startValue}
            endValue={ctx.endValue}
            projectionYears={ctx.projectionYears}
          />
        );
      }
      return null;

    case 'prefAccrual':
      if (
        ctx.lpCapital !== undefined &&
        ctx.prefRate !== undefined &&
        ctx.holdYears !== undefined
      ) {
        return (
          <PrefAccrualViz
            lpCapital={ctx.lpCapital}
            prefRate={ctx.prefRate}
            holdYears={ctx.holdYears}
          />
        );
      }
      return null;

    case 'gpCatchUp':
      if (
        ctx.prefPaid !== undefined &&
        ctx.catchUpTargetGpPct !== undefined
      ) {
        return (
          <GpCatchUpViz
            prefPaid={ctx.prefPaid}
            catchUpTargetGpPct={ctx.catchUpTargetGpPct}
          />
        );
      }
      return null;

    case 'waterfallSimpleSplit':
      if (
        ctx.residual !== undefined &&
        ctx.lpSplitPct !== undefined &&
        ctx.gpSplitPct !== undefined
      ) {
        return (
          <WaterfallSimpleSplitViz
            residual={ctx.residual}
            lpSplitPct={ctx.lpSplitPct}
            gpSplitPct={ctx.gpSplitPct}
          />
        );
      }
      return null;

    case 'gpEffectivePromote':
      if (
        ctx.lpCapital !== undefined &&
        ctx.gpCapital !== undefined &&
        ctx.totalDistributable !== undefined &&
        ctx.gpTake !== undefined
      ) {
        return (
          <GpEffectivePromoteViz
            lpCapital={ctx.lpCapital}
            gpCapital={ctx.gpCapital}
            totalDistributable={ctx.totalDistributable}
            gpTake={ctx.gpTake}
          />
        );
      }
      return null;

    case 'leveredIrr':
      if (
        ctx.unleveredIrr !== undefined &&
        ctx.borrowRate !== undefined &&
        ctx.ltv !== undefined
      ) {
        return (
          <LeveredIrrViz
            unleveredIrr={ctx.unleveredIrr}
            borrowRate={ctx.borrowRate}
            ltv={ctx.ltv}
          />
        );
      }
      return null;

    case 'holdVsSellIrr':
      if (
        ctx.noi !== undefined &&
        ctx.capRate !== undefined &&
        ctx.holdYears !== undefined
      ) {
        return (
          <HoldVsSellIrrViz
            noi={ctx.noi}
            capRate={ctx.capRate}
            holdYears={ctx.holdYears}
            extensionIrr={question.expected}
          />
        );
      }
      return null;

    case 'irrAfterPromote':
      if (
        ctx.irrBeforePromote !== undefined &&
        ctx.promotePctOfProfit !== undefined &&
        ctx.holdYears !== undefined
      ) {
        return (
          <IrrAfterPromoteViz
            irrBeforePromote={ctx.irrBeforePromote}
            promotePctOfProfit={ctx.promotePctOfProfit}
            holdYears={ctx.holdYears}
            irrAfterPromote={question.expected}
          />
        );
      }
      return null;

    case 'dscrSensitivityRate':
      if (
        ctx.noi !== undefined &&
        ctx.loanAmount !== undefined &&
        ctx.interestRate !== undefined &&
        ctx.amortYears !== undefined
      ) {
        return (
          <DscrSensitivityRateViz
            noi={ctx.noi}
            loanAmount={ctx.loanAmount}
            interestRate={ctx.interestRate}
            amortYears={ctx.amortYears}
          />
        );
      }
      return null;

    case 'extensionDrag':
      if (
        ctx.equityIn !== undefined &&
        ctx.equityOut !== undefined &&
        ctx.holdYears !== undefined
      ) {
        return (
          <ExtensionDragViz
            equityIn={ctx.equityIn}
            equityOut={ctx.equityOut}
            holdYears={ctx.holdYears}
            drag={question.expected}
          />
        );
      }
      return null;

    case 'taxAdjustedExit':
      if (
        ctx.purchasePrice !== undefined &&
        ctx.saleProceeds !== undefined &&
        ctx.accumulatedDep !== undefined &&
        ctx.saleCostRate !== undefined &&
        ctx.recaptureRate !== undefined &&
        ctx.capGainsRate !== undefined
      ) {
        return (
          <TaxAdjustedExitViz
            purchasePrice={ctx.purchasePrice}
            saleProceeds={ctx.saleProceeds}
            accumulatedDep={ctx.accumulatedDep}
            saleCostRate={ctx.saleCostRate}
            recaptureRate={ctx.recaptureRate}
            capGainsRate={ctx.capGainsRate}
          />
        );
      }
      return null;

    case 'costToComplete':
      if (ctx.totalBudget !== undefined && ctx.incurred !== undefined) {
        return (
          <CostToCompleteViz
            totalBudget={ctx.totalBudget}
            incurred={ctx.incurred}
          />
        );
      }
      return null;

    case 'drawAllocation':
      if (
        ctx.equityCommitted !== undefined &&
        ctx.equityDrawnSoFar !== undefined &&
        ctx.drawAmount !== undefined
      ) {
        return (
          <DrawAllocationViz
            equityCommitted={ctx.equityCommitted}
            equityDrawnSoFar={ctx.equityDrawnSoFar}
            drawAmount={ctx.drawAmount}
          />
        );
      }
      return null;

    case 'contingencyDrawDown':
      if (
        ctx.hardCostBudget !== undefined &&
        ctx.contingency !== undefined &&
        ctx.overrunsToDate !== undefined
      ) {
        return (
          <ContingencyDrawDownViz
            hardCostBudget={ctx.hardCostBudget}
            contingency={ctx.contingency}
            overrunsToDate={ctx.overrunsToDate}
          />
        );
      }
      return null;

    case 'retainageRunning':
      if (
        ctx.cumulativeDraws !== undefined &&
        ctx.retainagePct !== undefined
      ) {
        return (
          <RetainageRunningViz
            cumulativeDraws={ctx.cumulativeDraws}
            retainagePct={ctx.retainagePct}
          />
        );
      }
      return null;

    case 'ffeReserveDollars':
      if (
        ctx.totalRevenue !== undefined &&
        ctx.ffeReserveRate !== undefined
      ) {
        return (
          <FfeReserveDollarsViz
            totalRevenue={ctx.totalRevenue}
            ffeReserveRate={ctx.ffeReserveRate}
          />
        );
      }
      return null;

    case 'revparFromAdrOcc':
      if (ctx.adr !== undefined && ctx.roomsAvailable !== undefined) {
        return (
          <RevparFromAdrOccViz
            adr={ctx.adr}
            roomsAvailable={ctx.roomsAvailable}
            revpar={question.expected}
          />
        );
      }
      return null;

    case 'gopMargin':
      if (ctx.totalRevenue !== undefined) {
        return (
          <GopMarginViz
            totalRevenue={ctx.totalRevenue}
            gopMargin={question.expected}
          />
        );
      }
      return null;

    case 'revporVsRevpar':
      if (
        ctx.roomsAvailable !== undefined &&
        ctx.roomsSold !== undefined &&
        ctx.totalRevenue !== undefined
      ) {
        return (
          <RevporVsRevparViz
            roomsAvailable={ctx.roomsAvailable}
            roomsSold={ctx.roomsSold}
            totalRevenue={ctx.totalRevenue}
          />
        );
      }
      return null;

    case 'percentageRentBreakpoint':
      if (ctx.baseRent !== undefined && ctx.percentageRate !== undefined) {
        return (
          <PercentageRentBreakpointViz
            baseRent={ctx.baseRent}
            percentageRate={ctx.percentageRate}
          />
        );
      }
      return null;

    case 'clearHeightPremium':
      if (
        ctx.baselineRent !== undefined &&
        ctx.clearHeight !== undefined &&
        ctx.premiumPerFt !== undefined
      ) {
        return (
          <ClearHeightPremiumViz
            baselineRent={ctx.baselineRent}
            clearHeight={ctx.clearHeight}
            premiumPerFt={ctx.premiumPerFt}
            finalRent={question.expected}
          />
        );
      }
      return null;

    case 'truckCountPerSf':
      if (ctx.buildingSf !== undefined && ctx.truckCount !== undefined) {
        return (
          <TruckCountPerSfViz
            buildingSf={ctx.buildingSf}
            truckCount={ctx.truckCount}
          />
        );
      }
      return null;

    case 'taxReassessment':
      if (
        ctx.purchasePrice !== undefined &&
        ctx.oldAnnualTax !== undefined &&
        ctx.newTaxRate !== undefined &&
        ctx.capRate !== undefined
      ) {
        return (
          <TaxReassessmentViz
            purchasePrice={ctx.purchasePrice}
            oldAnnualTax={ctx.oldAnnualTax}
            newTaxRate={ctx.newTaxRate}
            capRate={ctx.capRate}
          />
        );
      }
      return null;

    case 'opexChange':
      if (ctx.opex !== undefined && ctx.capRate !== undefined) {
        return <OpexChangeViz opexDelta={ctx.opex} capRate={ctx.capRate} />;
      }
      return null;

    case 'noiFromOer':
      if (ctx.egi !== undefined && ctx.opexRatioValue !== undefined) {
        return (
          <NoiFromOerViz egi={ctx.egi} opexRatioValue={ctx.opexRatioValue} />
        );
      }
      return null;

    case 'tiPayback':
      if (ctx.tiPerSf !== undefined && ctx.paybackYears !== undefined) {
        return (
          <TiPaybackViz
            tiPerSf={ctx.tiPerSf}
            paybackYears={ctx.paybackYears}
          />
        );
      }
      return null;

    case 'tiPerSfPerYearOfTerm':
      if (ctx.tiPerSf !== undefined && ctx.leaseTermYears !== undefined) {
        return (
          <TiPerSfPerYearOfTermViz
            tiPerSf={ctx.tiPerSf}
            leaseTermYears={ctx.leaseTermYears}
          />
        );
      }
      return null;

    case 'renewalProbabilityWeightedRent':
      if (
        ctx.inPlaceRent !== undefined &&
        ctx.marketRent !== undefined &&
        ctx.renewalProbability !== undefined
      ) {
        return (
          <RenewalProbabilityWeightedRentViz
            inPlaceRent={ctx.inPlaceRent}
            marketRent={ctx.marketRent}
            renewalProbability={ctx.renewalProbability}
          />
        );
      }
      return null;

    default:
      return null;
  }
}
