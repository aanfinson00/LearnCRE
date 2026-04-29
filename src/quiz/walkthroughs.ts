import { egi, noi as computeNoi, value as computeValue } from '../math/core';
import { loanConstant, maxLoanByDscr } from '../math/debt';
import { irrMulti } from '../math/returns';
import { afterTaxSaleProceeds, depreciationStraightLine } from '../math/tax';
import { formatPct, formatUsd, formatYears } from '../math/rounding';
import type { WalkthroughDef } from '../types/walkthrough';

function combinedScenarioWalk(): WalkthroughDef {
  // Hand-tuned realistic scenario
  const gpr = 4_500_000;
  const otherIncome = 250_000;
  const vacancy = 0.05;
  const opex = 1_900_000;
  const cap = 0.06;

  const gross = gpr + otherIncome;
  const egiVal = egi({ gpr, otherIncome, vacancyRate: vacancy });
  const noiVal = computeNoi({ gpr, otherIncome, vacancyRate: vacancy, opex });
  const value = computeValue(noiVal, cap);

  return {
    id: 'walk-combined-1',
    kind: 'combinedScenarioWalk',
    label: 'Combined Proforma — chained',
    description: 'Walk a full proforma from gross income to value, one step at a time.',
    context: {
      gpr,
      otherIncome,
      vacancyRate: vacancy,
      opex,
      capRate: cap,
    },
    setupNarrative: `You're underwriting an apartment building. GPR is ${formatUsd(gpr)}, other income is ${formatUsd(otherIncome)}, vacancy is ${formatPct(vacancy)}, OpEx is ${formatUsd(opex)}, and you're using a ${formatPct(cap)} cap rate. Walk it step by step.`,
    steps: [
      {
        id: 'gross',
        label: 'Step 1 — Gross income',
        prompt: 'What\'s the gross income (GPR + other income, before vacancy)?',
        expected: gross,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Just GPR + Other.',
        resultDescription: `${formatUsd(gpr)} + ${formatUsd(otherIncome)} = ${formatUsd(gross)}.`,
      },
      {
        id: 'egi',
        label: 'Step 2 — Effective gross income',
        prompt: `Apply ${formatPct(vacancy)} vacancy. What's EGI?`,
        expected: egiVal,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Gross × (1 − vacancy).',
        resultDescription: `${formatUsd(gross)} × (1 − ${formatPct(vacancy)}) = ${formatUsd(egiVal)}.`,
      },
      {
        id: 'noi',
        label: 'Step 3 — Net operating income',
        prompt: 'Subtract OpEx. What\'s NOI?',
        expected: noiVal,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'EGI − OpEx.',
        resultDescription: `${formatUsd(egiVal)} − ${formatUsd(opex)} = ${formatUsd(noiVal)}.`,
      },
      {
        id: 'value',
        label: 'Step 4 — Implied value',
        prompt: `At a ${formatPct(cap)} cap, what's the implied value?`,
        expected: value,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI / cap.',
        resultDescription: `${formatUsd(noiVal)} / ${formatPct(cap)} = ${formatUsd(value)}.`,
      },
    ],
    takeaway:
      'Each line of a proforma is a single arithmetic step. Chaining them is the whole valuation. Master each step in isolation and the full proforma collapses to one expression: ((GPR + Other) × (1 − vac) − OpEx) / cap.',
    roles: ['acquisitions'],
  };
}

function dscrLoanSizingWalk(): WalkthroughDef {
  // Realistic deal
  const noi = 750_000;
  const dscr = 1.25;
  const rate = 0.06;
  const years = 30;

  const constant = loanConstant(rate, years);
  const annualDsAllowance = noi / dscr;
  const maxLoan = maxLoanByDscr({ noi, dscrTarget: dscr, annualRate: rate, years });

  return {
    id: 'walk-dscr-1',
    kind: 'dscrLoanSizingWalk',
    label: 'DSCR Loan Sizing — chained',
    description: 'Decompose lender sizing into the constant, the DS allowance, and the loan.',
    context: {
      noi,
      dscrTarget: dscr,
      interestRate: rate,
      amortYears: years,
    },
    setupNarrative: `Your stabilized NOI is ${formatUsd(noi)}. Your lender requires a ${dscr.toFixed(2)}× DSCR on a ${formatYears(years)} amortizing loan at ${formatPct(rate)}. Size the loan in three steps.`,
    steps: [
      {
        id: 'constant',
        label: 'Step 1 — Loan constant',
        prompt: `What's the loan constant for a ${formatYears(years)} amortizing loan at ${formatPct(rate)}? (answer in bps)`,
        expected: Math.round(constant * 10_000),
        unit: 'bps',
        tolerance: { type: 'abs', band: 15 },
        hint: '30yr @ 6% ≈ 720 bps. Memorize a few — it\'s the bridge from rate to debt service.',
        resultDescription: `${formatYears(years)} amort @ ${formatPct(rate)} → loan constant ≈ ${(constant * 10_000).toFixed(0)} bps.`,
      },
      {
        id: 'allowance',
        label: 'Step 2 — Max annual debt service',
        prompt: `At ${dscr.toFixed(2)}× DSCR, what's the max annual debt service NOI can cover?`,
        expected: annualDsAllowance,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI / DSCR. Every $1 of NOI supports $1/DSCR of debt service.',
        resultDescription: `${formatUsd(noi)} / ${dscr.toFixed(2)} = ${formatUsd(annualDsAllowance)} max DS.`,
      },
      {
        id: 'loan',
        label: 'Step 3 — Max loan amount',
        prompt: 'Convert that DS allowance into a loan amount. What\'s the max loan?',
        expected: maxLoan,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.03 },
        hint: 'Max DS / loan constant.',
        resultDescription: `${formatUsd(annualDsAllowance)} / ${(constant * 100).toFixed(2)}% ≈ ${formatUsd(maxLoan)}.`,
      },
    ],
    takeaway:
      'DSCR sizing is just three divisions. NOI / DSCR gives you the DS allowance; DS / constant gives you the loan. Memorize the loan constants for 4–8% / 25–30y and you can size any deal in your head.',
    roles: ['mortgageUw', 'acquisitions'],
  };
}

function mockAcquisitionWalk(): WalkthroughDef {
  // Stabilized acquisition. Unlevered to keep the IRR step clean.
  const gpr = 4_000_000;
  const otherIncome = 200_000;
  const vacancy = 0.05;
  const opex = 1_600_000;
  const goingInCap = 0.055;
  const noiGrowth = 0.03;
  const holdYears = 5;
  const exitCap = 0.06;
  const saleCostRate = 0.015;

  const grossIncome = gpr + otherIncome;
  const egiVal = grossIncome * (1 - vacancy);
  const noiYr1 = egiVal - opex;
  const goingInValue = noiYr1 / goingInCap;
  // NOI in year 5 — Year 1 grows for 4 compounding periods through end of Year 5
  const noiYr5 = noiYr1 * Math.pow(1 + noiGrowth, holdYears - 1);
  const exitValueGross = noiYr5 / exitCap;
  const netExitProceeds = exitValueGross * (1 - saleCostRate);
  // Sum of NOI over Years 1–5
  let totalNoi = 0;
  for (let y = 0; y < holdYears; y++) {
    totalNoi += noiYr1 * Math.pow(1 + noiGrowth, y);
  }
  // All-cash unlevered: equity in = going-in value
  const totalReturned = netExitProceeds + totalNoi;
  const em = totalReturned / goingInValue;
  // Geometric IRR approximation: EM^(1/n) - 1. Real IRR with periodic
  // distributions is slightly higher (typically 30–80 bps).
  const irrApprox = Math.pow(em, 1 / holdYears) - 1;

  return {
    id: 'walk-acq-mock-1',
    kind: 'mockAcquisitionWalk',
    label: 'Mock Acquisition — full unlevered walkthrough',
    description: `Underwrite a stabilized acquisition end-to-end: income, value, exit, and unlevered return.`,
    context: {
      gpr,
      otherIncome,
      vacancyRate: vacancy,
      opex,
      capRate: goingInCap,
      exitCap,
      holdYears,
    },
    setupNarrative: `Stabilized multifamily acquisition. GPR ${formatUsd(gpr)}, other income ${formatUsd(otherIncome)}, ${formatPct(vacancy)} vacancy, OpEx ${formatUsd(opex)}. Going-in cap ${formatPct(goingInCap)}; you're modeling a ${formatYears(holdYears)} hold with ${formatPct(noiGrowth)} annual NOI growth and a ${formatPct(exitCap)} exit cap (${((exitCap - goingInCap) * 10_000).toFixed(0)} bps spread). Sale costs ${formatPct(saleCostRate)}. All-cash analysis — unlevered IRR.`,
    steps: [
      {
        id: 'gross',
        label: 'Step 1 — Gross income',
        prompt: 'GPR + other income, before vacancy. What\'s the gross?',
        expected: grossIncome,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Just GPR + Other.',
        resultDescription: `${formatUsd(gpr)} + ${formatUsd(otherIncome)} = ${formatUsd(grossIncome)}.`,
      },
      {
        id: 'egi',
        label: 'Step 2 — Effective gross income',
        prompt: `Apply ${formatPct(vacancy)} vacancy. What's EGI?`,
        expected: egiVal,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Gross × (1 − vacancy).',
        resultDescription: `${formatUsd(grossIncome)} × (1 − ${formatPct(vacancy)}) = ${formatUsd(egiVal)}.`,
      },
      {
        id: 'noi-yr1',
        label: 'Step 3 — NOI Year 1',
        prompt: 'Subtract OpEx. What\'s Year-1 NOI?',
        expected: noiYr1,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'EGI − OpEx.',
        resultDescription: `${formatUsd(egiVal)} − ${formatUsd(opex)} = ${formatUsd(noiYr1)}.`,
      },
      {
        id: 'going-in-value',
        label: 'Step 4 — Going-in value',
        prompt: `At a ${formatPct(goingInCap)} going-in cap, what's the implied value?`,
        expected: goingInValue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI₁ / cap.',
        resultDescription: `${formatUsd(noiYr1)} / ${formatPct(goingInCap)} = ${formatUsd(goingInValue)}. This is your equity check (all-cash).`,
      },
      {
        id: 'noi-yr5',
        label: 'Step 5 — NOI Year 5',
        prompt: `Apply ${formatPct(noiGrowth)} annual NOI growth over 4 compounding periods. What's Year-5 NOI?`,
        expected: noiYr5,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: `NOI₁ × (1 + ${formatPct(noiGrowth)})^${holdYears - 1}.`,
        resultDescription: `${formatUsd(noiYr1)} × ${(Math.pow(1 + noiGrowth, holdYears - 1)).toFixed(4)} = ${formatUsd(noiYr5)}.`,
      },
      {
        id: 'exit-gross',
        label: 'Step 6 — Gross exit value',
        prompt: `At a ${formatPct(exitCap)} exit cap, what's the gross exit value?`,
        expected: exitValueGross,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Year-5 NOI / exit cap.',
        resultDescription: `${formatUsd(noiYr5)} / ${formatPct(exitCap)} = ${formatUsd(exitValueGross)}.`,
      },
      {
        id: 'exit-net',
        label: 'Step 7 — Net exit proceeds',
        prompt: `Sale costs are ${formatPct(saleCostRate)}. What hits your bank account?`,
        expected: netExitProceeds,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Gross × (1 − sale cost rate).',
        resultDescription: `${formatUsd(exitValueGross)} × (1 − ${formatPct(saleCostRate)}) = ${formatUsd(netExitProceeds)}.`,
      },
      {
        id: 'total-noi',
        label: 'Step 8 — Cumulative NOI distributed',
        prompt: 'Sum the NOI distributed in years 1 through 5.',
        expected: totalNoi,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.03 },
        hint: 'Geometric series — NOI₁ × ((1+g)^n − 1) / g.',
        resultDescription: `Σ NOI_y from y=1..5 ≈ ${formatUsd(totalNoi)} at ${formatPct(noiGrowth)} growth.`,
      },
      {
        id: 'em',
        label: 'Step 9 — Equity multiple (unlevered)',
        prompt: 'Total cash returned (NOI + net exit) / equity in. What\'s the EM?',
        expected: em,
        unit: 'multiple',
        tolerance: { type: 'pct', band: 0.03 },
        hint: '(Σ NOI + net exit) / going-in equity.',
        resultDescription: `(${formatUsd(totalNoi)} + ${formatUsd(netExitProceeds)}) / ${formatUsd(goingInValue)} = ${em.toFixed(2)}x.`,
      },
      {
        id: 'irr-approx',
        label: 'Step 10 — Approximate unlevered IRR',
        prompt: `EM^(1/n) − 1 over a ${formatYears(holdYears)} hold. What's the approximate IRR?`,
        expected: irrApprox,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.01 },
        hint: `${em.toFixed(2)}^(1/${holdYears}) − 1.`,
        resultDescription: `${em.toFixed(2)}^(1/${holdYears}) − 1 ≈ ${formatPct(irrApprox)}. Real IRR with periodic distributions is ~30–80 bps higher; the geometric approx is the right anchor for back-of-envelope.`,
      },
    ],
    takeaway:
      'A full unlevered acquisition is just income → value → exit → return, broken into 10 steps. The two non-obvious links are walking NOI forward to the exit year and reducing exit value for sale costs. Skip either and your IRR is wrong by a meaningful margin.',
    roles: ['acquisitions'],
  };
}

function valueAddWalk(): WalkthroughDef {
  // 100-unit MF value-add. Renovate units, push rents, exit at lower cap.
  const startingNoi = 1_200_000;
  const renovatedUnits = 100;
  const renoCostPerUnit = 12_000;
  const totalRenoCost = renoCostPerUnit * renovatedUnits;
  const reserveDrag = totalRenoCost; // capex during hold = renovation cost
  const newRentLiftPct = 0.18; // rent up 18% post-reno on full property
  const noiAfterReno = startingNoi * (1 + newRentLiftPct);
  const goingInCap = 0.055;
  const goingInValue = startingNoi / goingInCap;
  const exitCap = 0.0525; // -25 bps cap compression on improved asset
  const stabilizedValue = noiAfterReno / exitCap;
  const yieldOnCost = noiAfterReno / (goingInValue + reserveDrag);

  return {
    id: 'walk-am-valueadd-1',
    kind: 'valueAddWalk',
    label: 'Value-Add Underwriting — chained',
    description: 'Renovate, push rents, capture cap compression — 8 steps.',
    context: {
      noi: startingNoi,
      capRate: goingInCap,
      capex: totalRenoCost,
      exitCap,
      stabilizedNoi: noiAfterReno,
    },
    setupNarrative: `100-unit Class-B garden-style MF. Year-1 NOI ${formatUsd(startingNoi)}. Renovation budget ${formatUsd(renoCostPerUnit)}/unit (${formatUsd(totalRenoCost)} total) drives ${formatPct(newRentLiftPct)} rent uplift. Acquire at ${formatPct(goingInCap)}, exit at ${formatPct(exitCap)} (cap compression on improved asset). Walk the value-creation arc.`,
    steps: [
      {
        id: 'starting-value',
        label: 'Step 1 — Going-in value',
        prompt: `At ${formatPct(goingInCap)} going-in cap, what's the asset's purchase price?`,
        expected: goingInValue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI / cap.',
        resultDescription: `${formatUsd(startingNoi)} / ${formatPct(goingInCap)} = ${formatUsd(goingInValue)}.`,
      },
      {
        id: 'reno-budget',
        label: 'Step 2 — Renovation budget',
        prompt: `${renovatedUnits} units × ${formatUsd(renoCostPerUnit)}/unit. What's the total renovation cost?`,
        expected: totalRenoCost,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.01 },
        hint: 'Units × $/unit.',
        resultDescription: `${renovatedUnits} × ${formatUsd(renoCostPerUnit)} = ${formatUsd(totalRenoCost)}.`,
      },
      {
        id: 'all-in-basis',
        label: 'Step 3 — All-in basis',
        prompt: 'Going-in value + renovation cost. What\'s your basis after the renovation?',
        expected: goingInValue + reserveDrag,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Purchase + capex.',
        resultDescription: `${formatUsd(goingInValue)} + ${formatUsd(reserveDrag)} = ${formatUsd(goingInValue + reserveDrag)}.`,
      },
      {
        id: 'rent-lift',
        label: 'Step 4 — Post-reno NOI',
        prompt: `Apply ${formatPct(newRentLiftPct)} rent lift to the starting NOI (assume opex unchanged). What's the stabilized post-reno NOI?`,
        expected: noiAfterReno,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI × (1 + lift).',
        resultDescription: `${formatUsd(startingNoi)} × (1 + ${formatPct(newRentLiftPct)}) = ${formatUsd(noiAfterReno)}.`,
      },
      {
        id: 'yield-on-cost',
        label: 'Step 5 — Yield on cost',
        prompt: 'Post-reno NOI / all-in basis. What\'s your yield on cost?',
        expected: yieldOnCost,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.0025 },
        hint: 'NOI_stab / (purchase + capex).',
        resultDescription: `${formatUsd(noiAfterReno)} / ${formatUsd(goingInValue + reserveDrag)} = ${formatPct(yieldOnCost)}. Compare this to the going-in cap to gauge the value-add lift.`,
      },
      {
        id: 'dev-spread',
        label: 'Step 6 — Yield-on-cost spread',
        prompt: `Yield on cost vs the ${formatPct(exitCap)} exit cap. What's the spread (in bps)?`,
        expected: Math.round((yieldOnCost - exitCap) * 10_000),
        unit: 'bps',
        tolerance: { type: 'abs', band: 25 },
        hint: 'YoC − exit cap, in bps.',
        resultDescription: `${formatPct(yieldOnCost)} − ${formatPct(exitCap)} ≈ ${((yieldOnCost - exitCap) * 10_000).toFixed(0)} bps. The spread is the value-add margin you\'re paid for the execution risk.`,
      },
      {
        id: 'stabilized-value',
        label: 'Step 7 — Stabilized value',
        prompt: `At a ${formatPct(exitCap)} exit cap, what's the stabilized asset value?`,
        expected: stabilizedValue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Post-reno NOI / exit cap.',
        resultDescription: `${formatUsd(noiAfterReno)} / ${formatPct(exitCap)} = ${formatUsd(stabilizedValue)}.`,
      },
      {
        id: 'value-creation',
        label: 'Step 8 — Value created',
        prompt: 'Stabilized value − all-in basis. What\'s the value created (gross)?',
        expected: stabilizedValue - (goingInValue + reserveDrag),
        unit: 'usdChange',
        tolerance: { type: 'pct', band: 0.05 },
        hint: 'Stabilized value − (purchase + capex).',
        resultDescription: `${formatUsd(stabilizedValue)} − ${formatUsd(goingInValue + reserveDrag)} ≈ ${formatUsd(stabilizedValue - (goingInValue + reserveDrag))}. That\'s the gross profit before financing, sale costs, and taxes.`,
      },
    ],
    takeaway:
      'Value-add math is income lift × cap compression − capex. The two levers — pushing NOI and tightening the cap on a "completed" asset — multiply together. Yield-on-cost vs exit cap is the cleanest single metric: the spread is what you\'re being paid for taking the execution risk.',
    roles: ['assetManagement'],
  };
}

function developmentFeasibilityWalk(): WalkthroughDef {
  // Mid-rise MF development. Build it, lease it up, sell or hold.
  const landCost = 8_000_000;
  const hardCost = 38_000_000;
  const softCost = 7_000_000;
  const contingencyRate = 0.05;
  const contingency = (hardCost + softCost) * contingencyRate;
  const totalProjectCost = landCost + hardCost + softCost + contingency;
  const stabilizedNoi = 4_500_000;
  const yieldOnCost = stabilizedNoi / totalProjectCost;
  const marketCap = 0.05;
  const stabilizedValue = stabilizedNoi / marketCap;
  const devSpreadBps = Math.round((yieldOnCost - marketCap) * 10_000);
  const profit = stabilizedValue - totalProjectCost;
  const profitMargin = profit / totalProjectCost;

  return {
    id: 'walk-dev-feasibility-1',
    kind: 'developmentFeasibilityWalk',
    label: 'Development Feasibility — chained',
    description: 'Land + hard + soft + contingency → stabilized NOI → exit. 10 steps.',
    context: {
      capex: hardCost,
      stabilizedNoi,
      totalProjectCost,
      marketCapRate: marketCap,
    },
    setupNarrative: `Mid-rise multifamily development. Land ${formatUsd(landCost)}; hard cost ${formatUsd(hardCost)}; soft cost ${formatUsd(softCost)}; contingency ${formatPct(contingencyRate)} of (hard + soft). Stabilized NOI projected ${formatUsd(stabilizedNoi)}; market cap ${formatPct(marketCap)} on completed product. Walk the feasibility test.`,
    steps: [
      {
        id: 'contingency',
        label: 'Step 1 — Contingency',
        prompt: `${formatPct(contingencyRate)} of hard + soft cost. What's the contingency?`,
        expected: contingency,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: '(hard + soft) × 5%.',
        resultDescription: `(${formatUsd(hardCost)} + ${formatUsd(softCost)}) × ${formatPct(contingencyRate)} = ${formatUsd(contingency)}.`,
      },
      {
        id: 'tpc',
        label: 'Step 2 — Total project cost',
        prompt: 'Land + hard + soft + contingency. What\'s the TPC?',
        expected: totalProjectCost,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Sum the four lines.',
        resultDescription: `${formatUsd(landCost)} + ${formatUsd(hardCost)} + ${formatUsd(softCost)} + ${formatUsd(contingency)} = ${formatUsd(totalProjectCost)}.`,
      },
      {
        id: 'land-pct',
        label: 'Step 3 — Land as % of TPC',
        prompt: 'What % of the project cost is land?',
        expected: landCost / totalProjectCost,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.005 },
        hint: 'Land / TPC.',
        resultDescription: `${formatUsd(landCost)} / ${formatUsd(totalProjectCost)} = ${formatPct(landCost / totalProjectCost)}. Healthy MF dev land is typically 15–25% of TPC; outside that range merits a closer look.`,
      },
      {
        id: 'hard-pct',
        label: 'Step 4 — Hard cost as % of TPC',
        prompt: 'What % of TPC is hard cost?',
        expected: hardCost / totalProjectCost,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.005 },
        hint: 'Hard / TPC.',
        resultDescription: `${formatUsd(hardCost)} / ${formatUsd(totalProjectCost)} = ${formatPct(hardCost / totalProjectCost)}. Hard cost is typically 60–70% of TPC for mid-rise MF.`,
      },
      {
        id: 'yoc',
        label: 'Step 5 — Yield on cost',
        prompt: 'Stabilized NOI / TPC. What\'s YoC?',
        expected: yieldOnCost,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.0025 },
        hint: 'NOI_stab / TPC.',
        resultDescription: `${formatUsd(stabilizedNoi)} / ${formatUsd(totalProjectCost)} = ${formatPct(yieldOnCost)}.`,
      },
      {
        id: 'dev-spread',
        label: 'Step 6 — Development spread',
        prompt: `YoC vs ${formatPct(marketCap)} market cap. Spread in bps?`,
        expected: devSpreadBps,
        unit: 'bps',
        tolerance: { type: 'abs', band: 25 },
        hint: 'YoC − market cap, in bps.',
        resultDescription: `${formatPct(yieldOnCost)} − ${formatPct(marketCap)} ≈ ${devSpreadBps} bps. Industry rule: 100–150+ bps is typically required to justify development risk over buying stabilized.`,
      },
      {
        id: 'go-no-go',
        label: 'Step 7 — Go / no-go threshold',
        prompt: `Industry threshold is 125 bps. By how many bps does this deal exceed (or miss) it?`,
        expected: devSpreadBps - 125,
        unit: 'bps',
        tolerance: { type: 'abs', band: 25 },
        hint: 'Computed spread − 125 bps.',
        resultDescription: `${devSpreadBps} − 125 = ${devSpreadBps - 125} bps. Positive = above threshold, deal pencils for development risk; negative = better to buy stabilized.`,
      },
      {
        id: 'exit-value',
        label: 'Step 8 — Stabilized value',
        prompt: `At ${formatPct(marketCap)} market cap, what's the stabilized exit value?`,
        expected: stabilizedValue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI_stab / market cap.',
        resultDescription: `${formatUsd(stabilizedNoi)} / ${formatPct(marketCap)} = ${formatUsd(stabilizedValue)}.`,
      },
      {
        id: 'profit',
        label: 'Step 9 — Gross development profit',
        prompt: 'Stabilized value − TPC. What\'s the profit?',
        expected: profit,
        unit: 'usdChange',
        tolerance: { type: 'pct', band: 0.05 },
        hint: 'Stabilized value − TPC.',
        resultDescription: `${formatUsd(stabilizedValue)} − ${formatUsd(totalProjectCost)} = ${formatUsd(profit)}.`,
      },
      {
        id: 'profit-margin',
        label: 'Step 10 — Profit margin on cost',
        prompt: 'Profit / TPC. What\'s the profit margin?',
        expected: profitMargin,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.005 },
        hint: 'Profit / TPC.',
        resultDescription: `${formatUsd(profit)} / ${formatUsd(totalProjectCost)} = ${formatPct(profitMargin)}. Industry rule: 20%+ margin on cost typically required for institutional development.`,
      },
    ],
    takeaway:
      'Development feasibility collapses to one ratio (yield on cost) and one comparison (vs market cap). Add a profit-margin sanity check (≥20% on cost). If both pencil, the deal is feasible; if either falls short, the development risk isn\'t paying off vs buying stabilized.',
    roles: ['development', 'acquisitions'],
  };
}

function holdSellWalk(): WalkthroughDef {
  // Year-3 of a 5-year hold; LP IC asks: hold or sell now?
  const purchase = 40_000_000;
  const noiToday = 2_400_000;
  const noiGrowth = 0.03;
  const sellNowCap = 0.06;
  const sellNowValue = noiToday / sellNowCap;
  const yearsHeld = 3;
  const remainingYears = 2;
  const totalHold = yearsHeld + remainingYears;
  const futureExitCap = 0.0625;     // +25 bps cap drift over 2 more years
  const yearNNoi = noiToday * Math.pow(1 + noiGrowth, remainingYears);
  const futureExitValue = yearNNoi / futureExitCap;

  // Sell-now realized IRR (Year 0 to Year 3, with NOI distributions)
  const cfSellNow: number[] = [-purchase];
  for (let y = 1; y <= yearsHeld; y++) {
    const noiY = noiToday * Math.pow(1 + noiGrowth, y - yearsHeld);
    cfSellNow.push(y === yearsHeld ? noiY + sellNowValue : noiY);
  }
  const sellNowIrr = irrMulti(cfSellNow);

  // Hold-through-Year-5 IRR
  const cfHold: number[] = [-purchase];
  for (let y = 1; y <= totalHold; y++) {
    const noiY = noiToday * Math.pow(1 + noiGrowth, y - yearsHeld);
    cfHold.push(y === totalHold ? noiY + futureExitValue : noiY);
  }
  const holdIrr = irrMulti(cfHold);

  // After-tax: assume 80% depreciable basis, 27.5-yr life
  const accumulatedDep = depreciationStraightLine(purchase * 0.8, yearsHeld);
  const afterTaxSellNow = afterTaxSaleProceeds({
    purchasePrice: purchase,
    saleProceeds: sellNowValue,
    accumulatedDepreciation: accumulatedDep,
  });

  return {
    id: 'walk-am-holdsell-1',
    kind: 'holdSellWalk',
    label: 'Hold or Sell — chained',
    description: 'Compare sell-now vs hold-2-more-years on a value-add asset.',
    context: {
      purchasePrice: purchase,
      noi: noiToday,
      capRate: sellNowCap,
      exitCap: futureExitCap,
      holdYears: totalHold,
    },
    setupNarrative: `Year 3 of a 5-year hold. Bought for ${formatUsd(purchase)}; current NOI ${formatUsd(noiToday)}; today's value ${formatUsd(sellNowValue)} at a ${formatPct(sellNowCap)} cap. NOI growing ${formatPct(noiGrowth)}/yr. If you hold 2 more years, expect a ${formatPct(futureExitCap)} exit cap (${((futureExitCap - sellNowCap) * 10_000).toFixed(0)} bps drift). Walk the sell-now vs hold-through math.`,
    steps: [
      {
        id: 'sellnow-irr',
        label: 'Step 1 — Sell-now realized IRR',
        prompt: `Cash flows are: −${formatUsd(purchase)} at Y0; ${formatUsd(noiToday * Math.pow(1+noiGrowth, -2))}, ${formatUsd(noiToday * Math.pow(1+noiGrowth, -1))}, ${formatUsd(noiToday)} for Y1-Y3 NOI; plus ${formatUsd(sellNowValue)} at Y3 sale. What's the IRR if you sell now?`,
        expected: sellNowIrr,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.005 },
        hint: 'Multi-period IRR — solve for r where NPV = 0.',
        resultDescription: `IRR(cash flows) ≈ ${formatPct(sellNowIrr)}. This is your "in the bag" return if you stop here.`,
      },
      {
        id: 'noi-yr5',
        label: 'Step 2 — Year-5 NOI',
        prompt: `Apply ${formatPct(noiGrowth)}/yr growth for ${formatYears(remainingYears)} more. What's Year-5 NOI?`,
        expected: yearNNoi,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI_today × (1 + g)^N.',
        resultDescription: `${formatUsd(noiToday)} × (1 + ${formatPct(noiGrowth)})^${remainingYears} = ${formatUsd(yearNNoi)}.`,
      },
      {
        id: 'future-exit',
        label: 'Step 3 — Future exit value',
        prompt: `At a ${formatPct(futureExitCap)} exit cap, what's the future exit value?`,
        expected: futureExitValue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Year-5 NOI / future cap.',
        resultDescription: `${formatUsd(yearNNoi)} / ${formatPct(futureExitCap)} = ${formatUsd(futureExitValue)}. Note: ${formatPct(futureExitCap)} is wider than today\'s ${formatPct(sellNowCap)} — the cap drift compounds against you.`,
      },
      {
        id: 'hold-irr',
        label: 'Step 4 — Hold-through IRR',
        prompt: 'IRR with the same Y0 entry, Y1-Y4 NOI, and Y5 NOI + future exit. What\'s the hold-through IRR?',
        expected: holdIrr,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.005 },
        hint: 'Same IRR machinery; longer cash-flow series.',
        resultDescription: `IRR(cash flows) ≈ ${formatPct(holdIrr)}. Compare to sell-now IRR above.`,
      },
      {
        id: 'irr-delta',
        label: 'Step 5 — Pre-tax IRR delta',
        prompt: 'Hold IRR − sell-now IRR. Positive = holding wins on pre-tax.',
        expected: holdIrr - sellNowIrr,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.005 },
        hint: 'Subtract.',
        resultDescription: `${formatPct(holdIrr)} − ${formatPct(sellNowIrr)} = ${formatPct(holdIrr - sellNowIrr)}. ${holdIrr > sellNowIrr ? 'Holding pencils on pre-tax' : 'Selling pencils on pre-tax'}.`,
      },
      {
        id: 'accum-dep',
        label: 'Step 6 — Accumulated depreciation',
        prompt: `${formatYears(yearsHeld)} of depreciation at 80% depreciable basis (27.5-yr MF life). What's accumulated?`,
        expected: accumulatedDep,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: '(80% × purchase) / 27.5 × yearsHeld.',
        resultDescription: `(${formatUsd(purchase * 0.8)}) / 27.5 × ${yearsHeld} = ${formatUsd(accumulatedDep)}.`,
      },
      {
        id: 'after-tax-sell',
        label: 'Step 7 — After-tax sell-now proceeds',
        prompt: 'Sale costs 1.5%, recapture 25%, cap gains 20%. What\'s after-tax cash?',
        expected: afterTaxSellNow.afterTaxProceeds,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Net sale − recapture tax − cap-gains tax.',
        resultDescription: `Net ${formatUsd(afterTaxSellNow.netSale)} − recap ${formatUsd(afterTaxSellNow.recaptureTax)} − cap gains ${formatUsd(afterTaxSellNow.capGainsTax)} = ${formatUsd(afterTaxSellNow.afterTaxProceeds)}. Sell-now real cash ≈ ${formatPct(afterTaxSellNow.afterTaxProceeds / sellNowValue - 1)} below the gross — and the hold path defers this entirely.`,
      },
    ],
    takeaway:
      'Hold-vs-sell decisions live in three layers: pre-tax IRR (Steps 1–5), after-tax cash (Steps 6–7), and the LP-tax-position lens (deferral matters more for tax-sensitive LPs). When pre-tax IRR is similar, deferral usually tips toward holding — but the cap-rate drift on the hold side often offsets the deferral benefit. Always run all three layers; never decide on pre-tax alone.',
    roles: ['assetManagement', 'portfolioMgmt'],
  };
}

export const walkthroughs: WalkthroughDef[] = [
  combinedScenarioWalk(),
  dscrLoanSizingWalk(),
  mockAcquisitionWalk(),
  valueAddWalk(),
  developmentFeasibilityWalk(),
  holdSellWalk(),
];

export function getWalkthroughById(id: string): WalkthroughDef | undefined {
  return walkthroughs.find((w) => w.id === id);
}
