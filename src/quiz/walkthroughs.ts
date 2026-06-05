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
function distressedLoanWorkoutWalk(): WalkthroughDef {
  // Buying a non-performing $40M senior loan on a Class-B office. Asset value
  // ~$30M; bank asks $24M. The walkthrough shows the dual-path math: own at
  // foreclosure vs collect at workout.
  const loanFace = 40_000_000;
  const askingPrice = 24_000_000;
  const assetValue = 30_000_000;
  const yearsToResolve = 2;       // foreclosure timeline assumption
  const foreclosureCostRate = 0.08; // legal + holding costs as % of asset value
  const workoutRate = 0.07;        // modified interest rate during collect path
  const workoutTermYears = 5;      // remaining loan term post-modification

  // Path A — foreclosure: pay $24M, take title at year 2, sell at then-market
  // (assume flat asset value); IRR is roughly the implicit yield on basis vs
  // recovery, less timeline costs.
  const recoverable = assetValue * (1 - foreclosureCostRate);
  const ownPathIrr = Math.pow(recoverable / askingPrice, 1 / yearsToResolve) - 1;

  // Path B — collect: borrower modifies; you receive a stream of interest
  // payments at the modified rate on the original face. Then a balloon (or
  // payoff at re-sale).
  const annualInterest = loanFace * workoutRate;
  const collectPayoff = loanFace; // assume par recovery at modified maturity
  // Approx IRR on the collect path: -basis at t=0, annual interest yrs 1..N-1,
  // payoff + last interest at year N. Use a simple geometric approximation.
  const totalCollectCash = annualInterest * workoutTermYears + collectPayoff;
  const collectEm = totalCollectCash / askingPrice;
  const collectIrrApprox = Math.pow(collectEm, 1 / workoutTermYears) - 1;

  // Buy decision: take the WORSE of the two paths and check vs hurdle.
  const worsePathIrr = Math.min(ownPathIrr, collectIrrApprox);
  const hurdle = 0.15;

  return {
    id: 'walk-distressed-1',
    kind: 'distressedLoanWorkoutWalk',
    label: 'Distressed Loan Workout — chained',
    description: 'Buy at $24M, own-or-collect, dual-path IRR check against hurdle.',
    context: {
      noi: annualInterest,
      capRate: workoutRate,
      purchasePrice: askingPrice,
      holdYears: workoutTermYears,
    },
    setupNarrative: `A regional bank is selling a non-performing $40M senior loan on a Class-B office building (asset value ~$30M). They're asking $24M (60¢ on the dollar). Two paths to resolution: (a) borrower defaults, you foreclose, take title in ~${yearsToResolve} yrs at recoverable value (asset less ~${formatPct(foreclosureCostRate)} legal + holding); (b) borrower modifies at ${formatPct(workoutRate)}, pays interest for ${formatYears(workoutTermYears)}, payoff at par. The buy works only if BOTH paths clear your hurdle. Walk both.`,
    steps: [
      {
        id: 'basis',
        label: 'Step 1 — Your basis vs asset value',
        prompt: `Basis is ${formatUsd(askingPrice)}; asset is worth ${formatUsd(assetValue)}. What's basis as % of asset value?`,
        expected: askingPrice / assetValue,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.01 },
        hint: 'Basis / asset value.',
        resultDescription: `${formatUsd(askingPrice)} / ${formatUsd(assetValue)} = ${formatPct(askingPrice / assetValue)}. ~80% basis on a senior loan is the entry point — gives a real cushion for the foreclosure path.`,
      },
      {
        id: 'foreclosure-cost',
        label: 'Step 2 — Foreclosure cost drag',
        prompt: `Asset value ${formatUsd(assetValue)} × ${formatPct(foreclosureCostRate)} legal/holding cost. What's the cost to take?`,
        expected: assetValue * foreclosureCostRate,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.05 },
        hint: 'Asset × cost rate.',
        resultDescription: `${formatUsd(assetValue)} × ${formatPct(foreclosureCostRate)} = ${formatUsd(assetValue * foreclosureCostRate)}. Foreclosure is rarely free — legal fees, broker commissions if you sell, taxes during the process, asset deterioration during the lawsuit.`,
      },
      {
        id: 'recoverable',
        label: 'Step 3 — Recoverable value (own path)',
        prompt: 'Asset value less foreclosure costs. What\'s your effective recovery if you take and sell?',
        expected: recoverable,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.05 },
        hint: 'Asset × (1 − cost rate).',
        resultDescription: `${formatUsd(assetValue)} × (1 − ${formatPct(foreclosureCostRate)}) = ${formatUsd(recoverable)}. That's the cash you'd see at sale; deduct your basis for profit.`,
      },
      {
        id: 'own-irr',
        label: 'Step 4 — Foreclosure-path IRR',
        prompt: `Year-2 recovery of ${formatUsd(recoverable)} on ${formatUsd(askingPrice)} basis. Approximate IRR?`,
        expected: ownPathIrr,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.01 },
        hint: '(recovery / basis)^(1/N) − 1.',
        resultDescription: `(${formatUsd(recoverable)} / ${formatUsd(askingPrice)})^(1/${yearsToResolve}) − 1 ≈ ${formatPct(ownPathIrr)}. The foreclosure path gives you a thin but real return even before any workout upside.`,
      },
      {
        id: 'collect-interest',
        label: 'Step 5 — Annual interest if borrower modifies',
        prompt: `Loan face ${formatUsd(loanFace)} × ${formatPct(workoutRate)} modified rate. Annual interest?`,
        expected: annualInterest,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Face × rate.',
        resultDescription: `${formatUsd(loanFace)} × ${formatPct(workoutRate)} = ${formatUsd(annualInterest)}. Note: interest is on the FACE, not your basis. That's the buy thesis — you bought at 60¢ but collect on a $1.00.`,
      },
      {
        id: 'collect-total',
        label: 'Step 6 — Total cash on collect path',
        prompt: `${formatYears(workoutTermYears)} of interest + par payoff at maturity. Total cash to you?`,
        expected: totalCollectCash,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: '(annual interest × N) + payoff.',
        resultDescription: `(${formatUsd(annualInterest)} × ${workoutTermYears}) + ${formatUsd(collectPayoff)} = ${formatUsd(totalCollectCash)}.`,
      },
      {
        id: 'collect-em',
        label: 'Step 7 — Collect-path equity multiple',
        prompt: 'Total collect-path cash / your basis. EM?',
        expected: collectEm,
        unit: 'multiple',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Total / basis.',
        resultDescription: `${formatUsd(totalCollectCash)} / ${formatUsd(askingPrice)} = ${collectEm.toFixed(2)}x. The high EM reflects collecting interest on face while having paid only 60% of face.`,
      },
      {
        id: 'collect-irr',
        label: 'Step 8 — Collect-path approximate IRR',
        prompt: `EM^(1/${workoutTermYears}) − 1. Approximate IRR over the workout term?`,
        expected: collectIrrApprox,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.01 },
        hint: 'Geometric approximation.',
        resultDescription: `${collectEm.toFixed(2)}^(1/${workoutTermYears}) − 1 ≈ ${formatPct(collectIrrApprox)}. Real IRR is slightly higher (~50-100 bps) because of the interim interest payments.`,
      },
      {
        id: 'worse-path',
        label: 'Step 9 — Worse-path IRR',
        prompt: 'For the buy thesis to work, the WORSE path must clear your hurdle. Which IRR is worse, and what is it?',
        expected: worsePathIrr,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.01 },
        hint: 'Min of the two paths.',
        resultDescription: `Worse path = ${formatPct(worsePathIrr)} (the ${ownPathIrr < collectIrrApprox ? 'foreclosure' : 'collect'} path). This is the floor on your return; everything above is upside.`,
      },
      {
        id: 'go-no-go',
        label: 'Step 10 — Go / no-go vs hurdle',
        prompt: `Hurdle is ${formatPct(hurdle)}. By how much does the worse path beat (or miss) the hurdle?`,
        expected: worsePathIrr - hurdle,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.01 },
        hint: 'Worse-path IRR − hurdle.',
        resultDescription: `${formatPct(worsePathIrr)} − ${formatPct(hurdle)} = ${formatPct(worsePathIrr - hurdle)}. ${worsePathIrr > hurdle ? 'Both paths clear; this is a buy.' : 'Worse path misses hurdle; renegotiate basis or pass.'}`,
      },
    ],
    takeaway:
      'Distressed loan investing is dual-path math. Compute IRR assuming foreclosure (asset becomes yours at basis) and IRR assuming workout (collect modified interest + payoff). Buy when the WORSE of the two paths clears your hurdle. Buying based on the better path alone leaves you exposed when the world delivers the worse one.',
    roles: ['acquisitions', 'portfolioMgmt'],
  };
}

function waterfallWalk(): WalkthroughDef {
  // 3-tier American waterfall, hand-tuned realistic numbers.
  const lpCapital = 20_000_000;
  const gpCapital = 2_200_000;
  const totalCap = lpCapital + gpCapital;
  const prefRate = 0.08;
  const holdYears = 5;
  const totalDistributable = 40_000_000;
  const catchUpTarget = 0.20;

  const prefDue = lpCapital * (Math.pow(1 + prefRate, holdYears) - 1);
  const afterPref = totalDistributable - prefDue;
  const afterRoc = afterPref - totalCap;
  const catchUp = (prefDue * catchUpTarget) / (1 - catchUpTarget);
  const aboveResidual = afterRoc - catchUp;
  const lpAbove = aboveResidual * 0.8;
  const gpAbove = aboveResidual * 0.2;
  const gpTotal = gpCapital + catchUp + gpAbove;
  const totalProfit = totalDistributable - totalCap;
  const gpProRataProfit = (gpCapital / totalCap) * totalProfit;
  const gpPromote = gpTotal - gpCapital - gpProRataProfit;

  return {
    id: 'walk-waterfall-1',
    kind: 'waterfallWalk',
    label: 'Capital-Stack Waterfall — 3-tier American',
    description:
      'Walk a JV waterfall step by step: pref → ROC → catch-up → above-split. End with LP/GP totals and the GP\'s effective promote.',
    context: {
      lpCapital,
      gpCapital,
      prefRate,
      holdYears,
      totalDistributable,
      catchUpTargetGpPct: catchUpTarget,
    },
    setupNarrative: `Joint venture: LP contributed ${formatUsd(lpCapital)} (90%), GP contributed ${formatUsd(gpCapital)} (10%). Hold is ${formatYears(holdYears)}. Total cash to distribute at exit is ${formatUsd(totalDistributable)}. Waterfall: ${formatPct(prefRate)} compound pref to LP, then return of capital pro-rata, then 100% catch-up to GP until GP has ${formatPct(catchUpTarget, 0)} of (pref + cat-up), then 80/20 above. Walk it tier by tier.`,
    steps: [
      {
        id: 'pref',
        label: 'Step 1 — Pref due to LP',
        prompt: `What's the cumulative compound pref due to LP after ${formatYears(holdYears)} at ${formatPct(prefRate)}?`,
        expected: prefDue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'LP × ((1 + r)^n − 1). 8% over 5y compounds to ~46.9%.',
        resultDescription: `${formatUsd(lpCapital)} × ((1.08)^5 − 1) ≈ ${formatUsd(prefDue)}.`,
      },
      {
        id: 'after-pref',
        label: 'Step 2 — Cash remaining after pref',
        prompt: `After paying LP the pref, how much cash is left to distribute?`,
        expected: afterPref,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: `${formatUsd(totalDistributable)} − pref.`,
        resultDescription: `${formatUsd(totalDistributable)} − ${formatUsd(prefDue)} = ${formatUsd(afterPref)}.`,
      },
      {
        id: 'after-roc',
        label: 'Step 3 — Cash remaining after return of capital',
        prompt: `Return of capital is pro-rata to LP and GP (total ${formatUsd(totalCap)}). What's left after ROC?`,
        expected: afterRoc,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Subtract LP capital + GP capital from cash remaining.',
        resultDescription: `${formatUsd(afterPref)} − ${formatUsd(totalCap)} = ${formatUsd(afterRoc)}.`,
      },
      {
        id: 'catch-up',
        label: 'Step 4 — GP catch-up',
        prompt: `100% catch-up runs until GP has ${formatPct(catchUpTarget, 0)} of (pref + cat-up). What's the catch-up amount?`,
        expected: catchUp,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.03 },
        hint: 'Catch-up = pref × target / (1 − target). 20% target → 0.20/0.80 = 0.25 of pref.',
        resultDescription: `${formatUsd(prefDue)} × (0.20 / 0.80) ≈ ${formatUsd(catchUp)}.`,
      },
      {
        id: 'above-split-lp',
        label: 'Step 5 — LP take from above-split residual',
        prompt: `Above-split residual after pref + ROC + catch-up gets split 80/20 (LP/GP). What does LP get at this tier?`,
        expected: lpAbove,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.03 },
        hint: 'Residual × 80%.',
        resultDescription: `(${formatUsd(afterRoc)} − ${formatUsd(catchUp)}) × 80% = ${formatUsd(lpAbove)}.`,
      },
      {
        id: 'gp-promote',
        label: 'Step 6 — GP effective promote',
        prompt: `What\'s the GP\'s effective promote (dollars beyond pure pro-rata)?`,
        expected: gpPromote,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.05 },
        hint: 'GP profit dollars (GP take − GP cap) − GP cap% × total profit.',
        resultDescription: `GP took ${formatUsd(gpTotal)}; pro-rata share would be ${formatUsd(gpProRataProfit + gpCapital)}. Promote ≈ ${formatUsd(gpPromote)}.`,
      },
    ],
    takeaway:
      'A 3-tier American waterfall is just four arithmetic steps stacked: pref → ROC → catch-up → above-split. The GP\'s real economics are in the catch-up + above-split tiers — pro-rata-of-capital alone would have given them ~10% of profits; the waterfall gets them ~30%. That delta is the promote.',
    roles: ['portfolioMgmt', 'acquisitions'],
  };
}

function constructionDrawWalk(): WalkthroughDef {
  // $50M project, 60/40 D/E, equity-first, 10% retainage, 5% contingency.
  const totalBudget = 50_000_000;
  const hardCostBudget = 40_000_000;
  const softCostBudget = 7_500_000;
  const contingencyPct = 0.05;
  const contingency = hardCostBudget * contingencyPct; // $2.0M
  const equityCommitted = totalBudget * 0.40; // $20M
  const lenderCommitted = totalBudget * 0.60; // $30M
  const retainagePct = 0.10;

  // Mid-project state: 60% complete by dollars
  const incurred = totalBudget * 0.60; // $30M
  // Equity is exhausted at this point (60% complete on equity-first basis).
  const cumulativeHardCostDraws = hardCostBudget * 0.60; // $24M
  const overrunsToDate = 1_200_000;
  const contingencyRemainingPct = (contingency - overrunsToDate) / contingency; // 0.40

  // Next draw: $5M
  const nextDraw = 5_000_000;
  const nextDrawFromLender = nextDraw; // equity exhausted, all from lender
  const newRetainage = cumulativeHardCostDraws * retainagePct; // $2.4M

  return {
    id: 'walk-construction-draw-1',
    kind: 'constructionDrawWalk',
    label: 'Construction Draw Cycle — chained',
    description: 'Walk through a draw cycle on a development deal: cost-to-complete, equity-first allocation, retainage held, contingency burn.',
    context: {
      totalBudget,
      hardCostBudget,
      contingency,
      equityCommitted,
      lenderCommitted,
      retainagePct,
      incurred,
    },
    setupNarrative: `Ground-up project, ${formatUsd(totalBudget)} total budget (${formatUsd(hardCostBudget)} hard / ${formatUsd(softCostBudget)} soft / ${formatUsd(contingency)} contingency). Capital stack: ${formatUsd(equityCommitted)} equity (40%) and ${formatUsd(lenderCommitted)} lender (60%), equity-first basis. Retainage on hard costs is ${formatPct(retainagePct, 0)}. Mid-project: ${formatUsd(incurred)} of total budget incurred. ${formatUsd(overrunsToDate)} of approved overruns has hit contingency. Walk through the next draw.`,
    steps: [
      {
        id: 'pct-complete',
        label: 'Step 1 — % complete by dollars',
        prompt: `Total budget is ${formatUsd(totalBudget)}; ${formatUsd(incurred)} incurred. % complete?`,
        expected: 0.60,
        unit: 'pct',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Incurred / Total Budget.',
        resultDescription: `${formatUsd(incurred)} / ${formatUsd(totalBudget)} = 60% complete by dollars.`,
      },
      {
        id: 'next-draw-lender',
        label: 'Step 2 — Next draw funded from lender',
        prompt: `On equity-first basis, equity ($20M) is fully drawn. The next draw is ${formatUsd(nextDraw)}. How much funds from the lender?`,
        expected: nextDrawFromLender,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Equity exhausted → 100% from lender.',
        resultDescription: `Equity is exhausted, so the full ${formatUsd(nextDraw)} comes from the lender.`,
      },
      {
        id: 'retainage-current',
        label: 'Step 3 — Cumulative retainage held',
        prompt: `Cumulative hard-cost draws to date are ${formatUsd(cumulativeHardCostDraws)}. At ${formatPct(retainagePct, 0)} retainage, how much is the lender holding back?`,
        expected: newRetainage,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Cumulative draws × retainage rate.',
        resultDescription: `${formatUsd(cumulativeHardCostDraws)} × 10% = ${formatUsd(newRetainage)}.`,
      },
      {
        id: 'contingency-remaining',
        label: 'Step 4 — Contingency remaining',
        prompt: `Contingency reserve was ${formatUsd(contingency)}; ${formatUsd(overrunsToDate)} of overruns has been approved. What % of contingency is remaining?`,
        expected: contingencyRemainingPct,
        unit: 'pct',
        tolerance: { type: 'pct', band: 0.02 },
        hint: '(Contingency − Used) / Contingency.',
        resultDescription: `(${formatUsd(contingency)} − ${formatUsd(overrunsToDate)}) / ${formatUsd(contingency)} = 40% remaining.`,
      },
      {
        id: 'cost-to-complete',
        label: 'Step 5 — Cost-to-complete dollars',
        prompt: `What\'s the remaining budget (cost-to-complete in dollars)?`,
        expected: totalBudget - incurred,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Total Budget − Incurred.',
        resultDescription: `${formatUsd(totalBudget)} − ${formatUsd(incurred)} = ${formatUsd(totalBudget - incurred)} cost-to-complete.`,
      },
      {
        id: 'overrun-warning',
        label: 'Step 6 — Overrun stress test',
        prompt: `If physical completion is only 50% but dollars-incurred is 60%, the project is over-spent vs progress. What\'s the additional capital needed beyond original budget if final cost runs to $55M?`,
        expected: 5_000_000,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.05 },
        hint: 'Final cost − original budget.',
        resultDescription: `$55M − ${formatUsd(totalBudget)} = $5M of additional capital — funded from contingency (only $0.8M left) + cost-overrun tier (sponsor + LP per LPA).`,
      },
    ],
    takeaway:
      'A construction draw cycle is four arithmetic checks: % complete, equity-vs-lender allocation, retainage held, and contingency burn. When dollars-incurred > physical-completion, project is over-spent vs progress — the lender starts paying close attention. Tracking *contingency-remaining vs time-remaining* is the early-warning signal that a project will need additional capital before substantial completion.',
    roles: ['development', 'mortgageUw'],
  };
}

function hotelRevparWalk(): WalkthroughDef {
  // 240-key limited-service hotel.
  const totalRooms = 240;
  const adr = 195;
  const occupancy = 0.72;
  const days = 365;
  const roomsSold = totalRooms * occupancy * days; // 63,072
  const roomRevenue = roomsSold * adr; // 12,299,040
  const otherRevPctOfRoom = 0.18; // F&B, parking, ancillary
  const otherRevenue = roomRevenue * otherRevPctOfRoom;
  const totalRevenue = roomRevenue + otherRevenue;
  const gopMarginPct = 0.36;
  const gop = totalRevenue * gopMarginPct;
  const fixedCosts = 1_200_000; // taxes, insurance, mgmt fee
  const ffeReserveRate = 0.04;
  const ffeReserve = totalRevenue * ffeReserveRate;
  const noi = gop - fixedCosts - ffeReserve;
  const capRate = 0.075;
  const value = noi / capRate;

  return {
    id: 'walk-hotel-revpar-1',
    kind: 'hotelRevparWalk',
    label: 'Hotel — RevPAR to Value',
    description:
      'Walk a hotel from operating drivers (ADR + occupancy) all the way to enterprise value via RevPAR → Total Revenue → GOP → NOI → Cap.',
    context: {
      adr,
      roomsAvailable: totalRooms,
      capRate,
    },
    setupNarrative: `${totalRooms}-room limited-service hotel running at ${formatUsd(adr)} ADR and ${formatPct(occupancy, 0)} occupancy. Other-revenue (F&B, parking, ancillary) is ~${formatPct(otherRevPctOfRoom, 0)} of room revenue. GOP margin is ${formatPct(gopMarginPct, 0)}; fixed costs (taxes/ins/mgmt) total ${formatUsd(fixedCosts)}; FF&E reserve is ${formatPct(ffeReserveRate, 0)} of total revenue. Market cap rate is ${formatPct(capRate, 1)}. Compute the property value.`,
    steps: [
      {
        id: 'revpar',
        label: 'Step 1 — RevPAR',
        prompt: `Compute RevPAR from ADR and occupancy.`,
        expected: adr * occupancy,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'RevPAR = ADR × Occupancy.',
        resultDescription: `${formatUsd(adr)} × ${formatPct(occupancy, 0)} = ${formatUsd(adr * occupancy)} RevPAR.`,
      },
      {
        id: 'room-rev',
        label: 'Step 2 — Annual room revenue',
        prompt: `Total annual room revenue (rooms × occ × 365 × ADR)?`,
        expected: roomRevenue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'RevPAR × rooms × 365 — or rooms-sold × ADR.',
        resultDescription: `${totalRooms} × ${formatPct(occupancy, 0)} × 365 × ${formatUsd(adr)} ≈ ${formatUsd(roomRevenue)}.`,
      },
      {
        id: 'total-rev',
        label: 'Step 3 — Total revenue (incl. ancillary)',
        prompt: `Add other-revenue at 18% of room revenue. What\'s total revenue?`,
        expected: totalRevenue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Room rev × (1 + ancillary %).',
        resultDescription: `${formatUsd(roomRevenue)} × 1.18 ≈ ${formatUsd(totalRevenue)}.`,
      },
      {
        id: 'gop',
        label: 'Step 4 — GOP at 36% margin',
        prompt: `GOP at ${formatPct(gopMarginPct, 0)} margin?`,
        expected: gop,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Total revenue × GOP margin.',
        resultDescription: `${formatUsd(totalRevenue)} × ${formatPct(gopMarginPct, 0)} ≈ ${formatUsd(gop)}.`,
      },
      {
        id: 'noi',
        label: 'Step 5 — NOI (after fixed costs + FF&E reserve)',
        prompt: `Subtract fixed costs (${formatUsd(fixedCosts)}) and FF&E reserve (${formatPct(ffeReserveRate, 0)} of total rev). What\'s NOI?`,
        expected: noi,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'GOP − fixed − FF&E reserve.',
        resultDescription: `${formatUsd(gop)} − ${formatUsd(fixedCosts)} − ${formatUsd(ffeReserve)} ≈ ${formatUsd(noi)}.`,
      },
      {
        id: 'value',
        label: 'Step 6 — Value at market cap',
        prompt: `Cap NOI at ${formatPct(capRate, 1)}. What\'s the property value?`,
        expected: value,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.03 },
        hint: 'NOI / Cap.',
        resultDescription: `${formatUsd(noi)} / ${formatPct(capRate, 1)} ≈ ${formatUsd(value)}.`,
      },
    ],
    takeaway:
      'Hotel valuation chains down from ADR + occupancy: RevPAR → room revenue → total revenue → GOP → NOI → cap. The two hospitality-only adjustments are FF&E reserve (4% of revenue) and the GOP margin (function of service tier). Buyers who skip FF&E reserve overstate NOI by 4% of revenue — material to value.',
    roles: ['acquisitions', 'assetManagement'],
  };
}

function officeWaltWalk(): WalkthroughDef {
  // 5-tenant office building, computing rent-weighted WALT + roll impact.
  const leases = [
    { rent: 1_200_000, remainingTerm: 7, suite: 'Floor 12' },
    { rent: 850_000, remainingTerm: 3, suite: 'Floor 8-9' },
    { rent: 620_000, remainingTerm: 5, suite: 'Floor 5' },
    { rent: 450_000, remainingTerm: 2, suite: 'Floor 3' },
    { rent: 380_000, remainingTerm: 9, suite: 'Floor 2 retail' },
  ];
  const totalRent = leases.reduce((s, l) => s + l.rent, 0);
  const weightedSum = leases.reduce((s, l) => s + l.rent * l.remainingTerm, 0);
  const walt = weightedSum / totalRent;

  // Tenant 4 (Floor 3) is rolling in 2 years
  const rollingTenant = leases[3];
  const inPlaceRent = rollingTenant.rent;
  // Suite is 18,000 SF; in-place is $25/SF, market is $32/SF
  const sf = 18_000;
  const inPlacePerSf = inPlaceRent / sf;
  const marketPerSf = 32;
  const renewalProb = 0.65;
  const expectedRentPerSf = renewalProb * inPlacePerSf + (1 - renewalProb) * marketPerSf;
  const expectedAnnualRent = expectedRentPerSf * sf;
  // TI on rollover: $45/SF × 18,000 SF, amortized over 7-year new lease
  const newLeaseTermYears = 7;
  const tiPerSf = 45;
  const tiTotal = tiPerSf * sf;
  const amortizedTiPerYear = tiTotal / newLeaseTermYears;
  // Net effective rent annual on the rolling tenant
  const netEffectiveAnnual = expectedAnnualRent - amortizedTiPerYear;

  return {
    id: 'walk-office-walt-1',
    kind: 'officeWaltWalk',
    label: 'Office — WALT, Rollover, and Net-Effective Rent',
    description:
      'Walk a multi-tenant office stack: WALT, identify rollover risk, weight in-place vs market on rollover, then bridge to net-effective via amortized TI.',
    context: {
      leases: leases.map(({ rent, remainingTerm }) => ({ rent, remainingTerm })),
      walt,
    },
    setupNarrative: `Multi-tenant Class-A office, 5 tenants on stacked floors. Rent roll: ${leases.map((l) => `${l.suite} ${formatUsd(l.rent)}/yr / ${l.remainingTerm}y left`).join('; ')}. Tenant on Floor 3 (18,000 SF) is rolling in 2 years; in-place rent is ${formatUsd(inPlacePerSf)}/SF; market is ${formatUsd(marketPerSf)}/SF. Renewal probability is ${formatPct(renewalProb, 0)}. New-lease TI on rollover is $${tiPerSf}/SF over a ${newLeaseTermYears}-year term.`,
    steps: [
      {
        id: 'walt',
        label: 'Step 1 — Rent-weighted WALT',
        prompt: `Compute the rent-weighted WALT across all 5 leases.`,
        expected: walt,
        unit: 'multiple',
        tolerance: { type: 'pct', band: 0.03 },
        hint: 'Σ(rent × term) / Σ(rent).',
        resultDescription: `Σ(rent × term) ${weightedSum.toLocaleString()} / Σ(rent) ${totalRent.toLocaleString()} ≈ ${walt.toFixed(2)} years.`,
      },
      {
        id: 'expected-rent',
        label: 'Step 2 — Expected rent on Floor 3 rollover',
        prompt: `Renewal-probability-weighted rent on rollover (in-place $${inPlacePerSf}/SF; market $${marketPerSf}/SF; renewal prob ${formatPct(renewalProb, 0)})?`,
        expected: expectedRentPerSf,
        unit: 'usdPerSf',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'P × in-place + (1−P) × market.',
        resultDescription: `${formatPct(renewalProb, 0)} × $${inPlacePerSf}/SF + ${formatPct(1 - renewalProb, 0)} × $${marketPerSf}/SF ≈ $${expectedRentPerSf.toFixed(2)}/SF.`,
      },
      {
        id: 'expected-annual',
        label: 'Step 3 — Expected annual rent (Floor 3)',
        prompt: `On 18,000 SF, what\'s the expected annual rent post-rollover?`,
        expected: expectedAnnualRent,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Expected rent/SF × SF.',
        resultDescription: `$${expectedRentPerSf.toFixed(2)}/SF × 18,000 SF ≈ ${formatUsd(expectedAnnualRent)}.`,
      },
      {
        id: 'amortized-ti',
        label: 'Step 4 — Amortized TI/yr',
        prompt: `TI cost is $${tiPerSf}/SF over a ${newLeaseTermYears}-year lease. What\'s the annual amortized cost across the suite?`,
        expected: amortizedTiPerYear,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: '(TI/SF × SF) / lease term years.',
        resultDescription: `($${tiPerSf} × 18,000) / ${newLeaseTermYears} years ≈ ${formatUsd(amortizedTiPerYear)}/yr.`,
      },
      {
        id: 'net-effective',
        label: 'Step 5 — Net-effective annual rent',
        prompt: `Subtract amortized TI from expected annual rent. What\'s the NER on the suite?`,
        expected: netEffectiveAnnual,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.03 },
        hint: 'Expected annual rent − amortized TI/yr.',
        resultDescription: `${formatUsd(expectedAnnualRent)} − ${formatUsd(amortizedTiPerYear)} ≈ ${formatUsd(netEffectiveAnnual)}.`,
      },
    ],
    takeaway:
      'Office WALT tells you when income is at risk; renewal-weighted rent + amortized TI tell you what income will be after rollover. NER on rollovers is materially below face rent (often 70-85%) once TI + LC are amortized — sponsor pro-formas that show face-rent NER on rollovers are over-stating economics.',
    roles: ['acquisitions', 'assetManagement'],
  };
}

// ============================================================
// Concept primers — the "what is X, actually?" series
// ============================================================
// Designed as foundational lessons for any audience tier (career switcher /
// student / analyst). The math is intentionally light; the depth lives in
// step prompts, result descriptions, and takeaways.

function capRateActuallyWalk(): WalkthroughDef {
  // Round numbers so each step is computable in head.
  const noi = 1_000_000;
  const baseCap = 0.06;
  const baseValue = noi / baseCap;          // $16.67M
  const tenYearRate = 0.04;
  const spreadBps = Math.round((baseCap - tenYearRate) * 10_000); // 200
  const growth = 0.03;
  const impliedDiscountRate = baseCap + growth;                    // 9%
  const exitCap = 0.07;
  const exitValueFlat = noi / exitCap;                             // $14.29M
  const compressedCap = 0.05;
  const compressedValue = noi / compressedCap;                     // $20M
  const compressedValueLiftPct = (compressedValue - baseValue) / baseValue;
  const driftValueLossPct = (baseValue - exitValueFlat) / baseValue;

  return {
    id: 'walk-cap-rate-1',
    kind: 'capRateActuallyWalk',
    label: 'Cap rate — what it actually is',
    description:
      'Primer: cap rate as divisor, yield, sensitivity, and market verdict. The four mental models every CRE pro reasons in.',
    context: {
      noi,
      capRate: baseCap,
      growthRate: growth,
      exitCap,
    },
    setupNarrative: `Cap rate is the most-thrown-around number in CRE and the most loosely defined. You'll hear it used as a price, a yield, a spread, and a vibe. This primer walks through what it actually is — four mental models you can switch between depending on the question. Anchors: NOI ${formatUsd(noi)}, market cap ${formatPct(baseCap)}, 10Y treasury at ${formatPct(tenYearRate)}.`,
    steps: [
      {
        id: 'value-from-cap',
        label: 'Step 1 — Cap rate as a divisor',
        prompt: `At a ${formatPct(baseCap)} cap and ${formatUsd(noi)} NOI, what's the implied value?`,
        expected: baseValue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI / cap.',
        resultDescription: `${formatUsd(noi)} / ${formatPct(baseCap)} = ${formatUsd(baseValue)}. The literal definition: cap rate is a divisor that turns income into value. That's the surface — the next 5 steps unpack what the number actually means.`,
      },
      {
        id: 'cap-as-yield',
        label: 'Step 2 — Cap rate as a yield',
        prompt: `If you paid ${formatUsd(baseValue)} all-cash and collected ${formatUsd(noi)} of NOI in year 1, what's your Y1 unlevered yield?`,
        expected: baseCap,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.0025 },
        hint: 'NOI / price.',
        resultDescription: `${formatUsd(noi)} / ${formatUsd(baseValue)} = ${formatPct(baseCap)}. Cap rate IS the Y1 unlevered yield. When someone says "I bought at a 6 cap," they're telling you their starting unlevered return. Everything from here — growth, exit, leverage — is layered on top.`,
      },
      {
        id: 'compression-sensitivity',
        label: 'Step 3 — Sensitivity (100 bps of cap compression)',
        prompt: `If the cap compresses from ${formatPct(baseCap)} to ${formatPct(compressedCap)} (NOI unchanged), what's the new value?`,
        expected: compressedValue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Same NOI, new cap.',
        resultDescription: `${formatUsd(noi)} / ${formatPct(compressedCap)} = ${formatUsd(compressedValue)} — a ${formatPct(compressedValueLiftPct)} value lift for a 100 bps cap move. Cap rates are high-beta — small moves drive big value swings. This is why senior PMs talk about caps in 25 bps increments and why "I have a directional view on caps" is a real thesis.`,
      },
      {
        id: 'spread-to-treasury',
        label: 'Step 4 — Cap rate as a spread',
        prompt: `10Y treasury is ${formatPct(tenYearRate)}. What's the cap-rate spread (in bps)?`,
        expected: spreadBps,
        unit: 'bps',
        tolerance: { type: 'abs', band: 10 },
        hint: '(Cap − 10Y) × 10,000.',
        resultDescription: `${formatPct(baseCap)} − ${formatPct(tenYearRate)} = ${spreadBps} bps. The spread is the risk premium the market demands for CRE over risk-free. Historical avg ~250–300 bps; tighter = aggressive market; wider = early cycle / dislocation. A 200 bps spread is on the tight side — markets are paying you less for CRE risk vs treasuries than the long-term average.`,
      },
      {
        id: 'gordon-equivalence',
        label: 'Step 5 — Cap rate vs implied discount rate',
        prompt: `If the market expects ${formatPct(growth)}/yr NOI growth forever on this asset, what's the implied discount rate? (Gordon: r = cap + g.)`,
        expected: impliedDiscountRate,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.0025 },
        hint: 'Cap rate + growth.',
        resultDescription: `${formatPct(baseCap)} + ${formatPct(growth)} = ${formatPct(impliedDiscountRate)}. Cap rate = discount rate − growth. A "compressed" cap isn't always overvalued — sometimes the market is pricing in faster growth (life sci '21, data centers '23–'24). Always ask: what growth rate would justify this cap? If the implied growth is plausible, the cap isn't crazy. If it isn't, you're looking at froth.`,
      },
      {
        id: 'exit-cap-drift',
        label: 'Step 6 — Going-in vs exit (cap drift)',
        prompt: `If you buy at ${formatPct(baseCap)} and exit at ${formatPct(exitCap)} (NOI unchanged), what's the exit value?`,
        expected: exitValueFlat,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI / exit cap.',
        resultDescription: `${formatUsd(noi)} / ${formatPct(exitCap)} = ${formatUsd(exitValueFlat)} — a ${formatPct(driftValueLossPct)} value loss from cap drift alone. Cap-rate drift between going-in and exit is the single biggest risk in any underwriting without NOI growth. 100 bps of drift ≈ 14% of value evaporated. If your underwriting doesn't justify the exit cap, your IRR is a guess.`,
      },
    ],
    takeaway:
      'Cap rate is four things at once: (1) a divisor (NOI/cap = value), (2) a yield (Y1 unlevered return), (3) a sensitivity (high-beta — 100 bps ≈ 14–20% of value), (4) a market verdict (= discount rate − growth, anchored to a 10Y spread). Most analysts only learn the first. Dealmakers reason about all four — and you can tell which kind of investor you\'re talking to by which model they default to.',
    roles: ['acquisitions', 'assetManagement', 'mortgageUw', 'portfolioMgmt', 'development'],
  };
}

function riskAdjustedReturnWalk(): WalkthroughDef {
  // Same building, two capital structures, two outcomes — forces the user
  // to actually compute leverage's asymmetric impact on downside.
  const noi = 1_400_000;
  const baseCap = 0.07;
  const assetValue = noi / baseCap;                                // $20M
  const tenYearRate = 0.04;
  const riskPremiumBps = Math.round((baseCap - tenYearRate) * 10_000); // 300

  // Downside: NOI permanently impaired 10%, exit cap +100 bps
  const downsideNoi = noi * 0.9;                                   // $1.26M
  const downsideExitCap = baseCap + 0.01;                          // 8%
  const downsideExitValue = downsideNoi / downsideExitCap;          // $15.75M
  const holdYears = 5;
  const unleveredDownsideTotal = downsideNoi * holdYears + downsideExitValue;
  const unleveredDownsideEm = unleveredDownsideTotal / assetValue;

  // Levered: 60% LTV interest-only at 5%
  const ltv = 0.60;
  const debt = assetValue * ltv;                                   // $12M
  const equityCheck = assetValue - debt;                           // $8M
  const debtRate = 0.05;
  const debtServiceAnnual = debt * debtRate;                       // $0.6M
  const leveredDownsideNetExit = downsideExitValue - debt;         // $3.75M
  const leveredDownsideInterimCf = (downsideNoi - debtServiceAnnual) * holdYears;

  return {
    id: 'walk-rar-1',
    kind: 'riskAdjustedReturnWalk',
    label: 'Risk-adjusted return — what it actually is',
    description:
      'Primer: RAR is a discipline, not a formula. Anchor to risk-free, run downside, layer leverage. See how the same building becomes two different deals.',
    context: {
      noi,
      capRate: baseCap,
      purchasePrice: assetValue,
      ltv,
      interestRate: debtRate,
      exitCap: downsideExitCap,
      holdYears,
    },
    setupNarrative: `You're underwriting a stabilized asset. NOI is ${formatUsd(noi)}, market cap is ${formatPct(baseCap)}, 10Y treasury at ${formatPct(tenYearRate)}. The same deal looks very different to two investors depending on (a) the leverage they use and (b) what they assume in the downside. This primer walks through risk-adjusted return as a discipline: anchor to risk-free, run the downside, layer in leverage.`,
    steps: [
      {
        id: 'y1-yield',
        label: 'Step 1 — Unlevered Y1 yield',
        prompt: `NOI ${formatUsd(noi)} at a ${formatPct(baseCap)} cap. What's the unlevered Y1 yield?`,
        expected: baseCap,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.0025 },
        hint: 'Cap rate = Y1 unlevered yield.',
        resultDescription: `${formatPct(baseCap)}. Your starting return. Everything above this is growth, market movement, or leverage — each carrying its own risk.`,
      },
      {
        id: 'risk-premium',
        label: 'Step 2 — Risk premium vs treasuries',
        prompt: `10Y treasury is ${formatPct(tenYearRate)}. What's the risk premium (in bps)?`,
        expected: riskPremiumBps,
        unit: 'bps',
        tolerance: { type: 'abs', band: 10 },
        hint: '(Y1 yield − 10Y) × 10,000.',
        resultDescription: `${formatPct(baseCap)} − ${formatPct(tenYearRate)} = ${riskPremiumBps} bps. This is the market\'s price for CRE risk vs risk-free — illiquidity, asset-specific, operating, cap-rate risk all rolled into one spread. If a future deal offers tighter spread for similar risk, you\'re being paid less for the same exposure. Anchoring to this baseline is step one of every risk-adjusted comparison.`,
      },
      {
        id: 'downside-exit',
        label: 'Step 3 — Downside exit value',
        prompt: `Downside: NOI drops 10% to ${formatUsd(downsideNoi)} and exit cap widens 100 bps to ${formatPct(downsideExitCap)}. What's the downside exit value?`,
        expected: downsideExitValue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Downside NOI / downside cap.',
        resultDescription: `${formatUsd(downsideNoi)} / ${formatPct(downsideExitCap)} = ${formatUsd(downsideExitValue)}. NOI down 10% AND cap +100 bps — the two compound. Value drops ${formatPct((assetValue - downsideExitValue) / assetValue)} from a 10% NOI miss. This compounding IS the mechanism of CRE downside risk. No serious underwriting skips it.`,
      },
      {
        id: 'unlevered-recovery',
        label: 'Step 4 — Unlevered downside: total cash returned',
        prompt: `Unlevered, ${formatYears(holdYears)} hold of the downside scenario: ${formatUsd(downsideNoi)} × ${holdYears} NOI + ${formatUsd(downsideExitValue)} exit. Total cash returned?`,
        expected: unleveredDownsideTotal,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: `${holdYears} × downside NOI + downside exit.`,
        resultDescription: `${formatUsd(downsideNoi)} × ${holdYears} + ${formatUsd(downsideExitValue)} = ${formatUsd(unleveredDownsideTotal)}. On a ${formatUsd(assetValue)} check, you got back ${formatUsd(unleveredDownsideTotal)}. EM ≈ ${unleveredDownsideEm.toFixed(2)}x — thin positive return. Even in the downside, the unlevered investor preserves capital. That\'s the unlevered investor\'s structural advantage.`,
      },
      {
        id: 'levered-equity-check',
        label: 'Step 5 — Levered equity check at 60% LTV',
        prompt: `Asset ${formatUsd(assetValue)}, ${formatPct(ltv)} LTV. What's the equity check?`,
        expected: equityCheck,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Asset × (1 − LTV).',
        resultDescription: `${formatUsd(assetValue)} × (1 − ${formatPct(ltv)}) = ${formatUsd(equityCheck)}. ${formatPct(ltv)} leverage means you put up ${formatUsd(equityCheck)} to control a ${formatUsd(assetValue)} asset. Same building, half the cash — but debt sits in front of you in the capital stack.`,
      },
      {
        id: 'levered-downside-net',
        label: 'Step 6 — Levered downside: net equity proceeds',
        prompt: `Downside exit ${formatUsd(downsideExitValue)}, debt of ${formatUsd(debt)} to repay. Net cash to equity at exit?`,
        expected: leveredDownsideNetExit,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.05 },
        hint: 'Exit value − debt principal.',
        resultDescription: `${formatUsd(downsideExitValue)} − ${formatUsd(debt)} = ${formatUsd(leveredDownsideNetExit)}. You put in ${formatUsd(equityCheck)} and get back ${formatUsd(leveredDownsideNetExit)} of exit (plus ${formatYears(holdYears)} of thin interim CF ≈ ${formatUsd(leveredDownsideInterimCf)}). You\'re materially under water on the levered downside — while the unlevered investor on the SAME building still made money. Leverage doesn\'t just amplify upside; it accelerates downside disproportionately.`,
      },
    ],
    takeaway:
      'Risk-adjusted return is a discipline, not a formula. (1) Anchor every return to the risk-free rate — the spread is what you\'re being paid for risk. (2) Run a downside case where NOI misses by 10% AND caps widen 100 bps — they compound, and that compounding is the real mechanism of CRE downside. (3) Re-run with the leverage you intend to use; leverage cuts both ways but harder on downside. The "right" deal is the one whose downside is tolerable AND whose upside compensates you for the leverage required to get there.',
    roles: ['acquisitions', 'assetManagement', 'mortgageUw', 'portfolioMgmt', 'development'],
  };
}

function gpLpPrimerWalk(): WalkthroughDef {
  // Small round numbers so the intuition lands cleanly. No catch-up tier —
  // this primer focuses on pref + ROC + 80/20 above. The deeper
  // 'Capital-Stack Waterfall' walkthrough covers the full 3-tier American
  // structure with catch-up using realistic deal numbers.
  const lpCapital = 9_000_000;
  const gpCapital = 1_000_000;
  const totalCap = lpCapital + gpCapital;                          // $10M
  const lpPctOfCap = lpCapital / totalCap;                          // 90%
  const gpPctOfCap = gpCapital / totalCap;                          // 10%
  const prefRate = 0.08;
  const holdYears = 5;
  const prefDue = lpCapital * prefRate * holdYears;                 // simple: $3.6M
  const totalDistributable = 25_000_000;
  const cashAfterPref = totalDistributable - prefDue;               // $21.4M
  const cashAfterRoc = cashAfterPref - totalCap;                    // $11.4M
  const gpSplitAbove = 0.20;
  const lpSplitAbove = 0.80;
  const gpAboveSplit = cashAfterRoc * gpSplitAbove;                 // $2.28M
  const totalProfit = totalDistributable - totalCap;                // $15M
  const gpProfit = gpAboveSplit;                                    // $2.28M (no pref/ROC adds to profit)
  const gpProRataProfitWouldBe = gpPctOfCap * totalProfit;          // $1.5M
  const gpPromoteDollars = gpProfit - gpProRataProfitWouldBe;       // $0.78M

  return {
    id: 'walk-gp-lp-1',
    kind: 'gpLpPrimerWalk',
    label: 'GP/LP — what it actually is',
    description:
      'Primer: what each party brings, how cash flows in a 2-tier waterfall, and when the GP\'s promote actually pays vs pure pro-rata.',
    context: {
      lpCapital,
      gpCapital,
      prefRate,
      holdYears,
      totalDistributable,
      gpSplitPct: gpSplitAbove,
      lpSplitPct: lpSplitAbove,
    },
    setupNarrative: `Almost every CRE deal has two sides: a GP (General Partner — the sponsor/operator who finds and runs the deal and puts up a small slice of equity) and one or more LPs (Limited Partners — the capital partners who fund the bulk). This primer walks the basic 2-tier waterfall: ${formatPct(prefRate)} pref to LP → return of capital → 80/20 above. The deeper "Capital-Stack Waterfall" walkthrough covers the full 3-tier American structure with catch-up. Setup: LP ${formatUsd(lpCapital)}; GP ${formatUsd(gpCapital)}; ${formatYears(holdYears)} hold; exit distributes ${formatUsd(totalDistributable)}.`,
    steps: [
      {
        id: 'capital-pct',
        label: 'Step 1 — Capital split',
        prompt: `LP puts in ${formatUsd(lpCapital)}, GP puts in ${formatUsd(gpCapital)}. What % of total capital is LP?`,
        expected: lpPctOfCap,
        unit: 'pct',
        tolerance: { type: 'abs', band: 0.005 },
        hint: 'LP / total.',
        resultDescription: `${formatUsd(lpCapital)} / ${formatUsd(totalCap)} = ${formatPct(lpPctOfCap)}. The LP is almost always the dominant capital contributor (typically 85–95%). The GP\'s 5–15% "co-invest" exists to align interests (skin in the game) — but the GP\'s real economics come from somewhere else: the promote.`,
      },
      {
        id: 'pref-due',
        label: 'Step 2 — LP preferred return',
        prompt: `LP gets a ${formatPct(prefRate)} simple preferred return on its capital over ${formatYears(holdYears)}. What's the pref due?`,
        expected: prefDue,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'LP × rate × years (simple).',
        resultDescription: `${formatUsd(lpCapital)} × ${formatPct(prefRate)} × ${holdYears} = ${formatUsd(prefDue)}. The pref is the LP\'s minimum acceptable return — first dollars out before GP sees any promote. 8% is the standard pref; some funds run 6% (lower hurdle), value-add can require 9–10% (higher hurdle). The pref is the price the LP charges for taking capital risk.`,
      },
      {
        id: 'cash-after-roc',
        label: 'Step 3 — Cash after pref + return of capital',
        prompt: `From ${formatUsd(totalDistributable)} distributable, subtract LP pref (${formatUsd(prefDue)}) and total return of capital (${formatUsd(totalCap)}, both sides). What's the residual?`,
        expected: cashAfterRoc,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: `${formatUsd(totalDistributable)} − pref − total capital.`,
        resultDescription: `${formatUsd(totalDistributable)} − ${formatUsd(prefDue)} − ${formatUsd(totalCap)} = ${formatUsd(cashAfterRoc)}. This residual is where the GP actually earns its promote. If the deal had only produced ${formatUsd(prefDue + totalCap)} total, residual would be zero and GP gets nothing extra. The whole structure incentivizes GPs to deliver beyond pref + capital.`,
      },
      {
        id: 'gp-promote-take',
        label: 'Step 4 — GP take from above-pref split',
        prompt: `Residual splits 80/20 (LP/GP). What does the GP get from this tier?`,
        expected: gpAboveSplit,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Residual × 20%.',
        resultDescription: `${formatUsd(cashAfterRoc)} × ${formatPct(gpSplitAbove)} = ${formatUsd(gpAboveSplit)}. 20% of the upside on top of GP\'s pro-rata return of capital. GP put in 10% of equity but takes 20% of profits above pref — the 10pp delta is the GP\'s compensation for sourcing, structuring, and executing.`,
      },
      {
        id: 'gp-pro-rata-comparison',
        label: 'Step 5 — Pure pro-rata comparison',
        prompt: `If this were pure pro-rata (no pref, no promote), GP would get ${formatPct(gpPctOfCap)} of total profit (${formatUsd(totalProfit)}). What\'s GP\'s pure-pro-rata profit?`,
        expected: gpProRataProfitWouldBe,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'GP capital % × total profit.',
        resultDescription: `${formatPct(gpPctOfCap)} × ${formatUsd(totalProfit)} = ${formatUsd(gpProRataProfitWouldBe)}. This is what GP *would* earn in a plain-vanilla pro-rata deal — the baseline against which the promote is measured.`,
      },
      {
        id: 'gp-effective-promote',
        label: 'Step 6 — GP effective promote',
        prompt: `GP actually earned ${formatUsd(gpProfit)} of profit. Pure pro-rata would have been ${formatUsd(gpProRataProfitWouldBe)}. What's the effective promote (the delta)?`,
        expected: gpPromoteDollars,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.05 },
        hint: 'GP profit − pure-pro-rata profit.',
        resultDescription: `${formatUsd(gpProfit)} − ${formatUsd(gpProRataProfitWouldBe)} = ${formatUsd(gpPromoteDollars)}. That delta IS the promote. Now flip the framing: on a smaller exit (say ${formatUsd(prefDue + totalCap + 100_000)}), residual is near-zero and the promote is essentially nothing — GP would have earned more under pure pro-rata. The structure rewards GPs only when deals significantly exceed pref + capital. That\'s why GP cash flows are bimodal: nothing or a lot.`,
      },
    ],
    takeaway:
      'A GP/LP deal is a structural answer to one question: how do you align a capital partner (LP) with an operator (GP) who controls execution? LP gets a preferred return + return of capital first (downside protection); GP gets a disproportionate share of upside above that hurdle (alignment). The mental model: GP\'s promote pays only on deals that significantly exceed pref — which is exactly what you want. Operators who don\'t deliver get pure pro-rata; operators who deliver get rewarded asymmetrically.',
    roles: ['acquisitions', 'assetManagement', 'mortgageUw', 'portfolioMgmt', 'development'],
  };
}

export const walkthroughs: WalkthroughDef[] = [
  combinedScenarioWalk(),
  dscrLoanSizingWalk(),
  mockAcquisitionWalk(),
  valueAddWalk(),
  developmentFeasibilityWalk(),
  holdSellWalk(),
  distressedLoanWorkoutWalk(),
  waterfallWalk(),
  constructionDrawWalk(),
  hotelRevparWalk(),
  officeWaltWalk(),
  capRateActuallyWalk(),
  riskAdjustedReturnWalk(),
  gpLpPrimerWalk(),
];

export function getWalkthroughById(id: string): WalkthroughDef | undefined {
  return walkthroughs.find((w) => w.id === id);
}
