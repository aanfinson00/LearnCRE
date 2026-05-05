import type { MockArchetypeSpec } from '../../../types/mockInterview';

/**
 * REIT Asset Management — operational / NOI-growth-focused mock. Heavy
 * lease economics, asset-class-native math, NOI variance diagnosis.
 * ~30 minutes / 8 prompts.
 *
 * REIT AM interviews care less about underwriting new acquisitions and
 * more about *running* a portfolio: NOI growth drivers, lease rollover
 * concentration, capex efficiency, asset-class-specific KPIs.
 */
export const REIT_AM: MockArchetypeSpec = {
  id: 'reit-am',
  title: 'REIT Asset Management',
  description:
    'Operational mock for REIT / public-CRE asset management roles. NOI growth + variance, leasing economics, asset-class KPIs. ~30 minutes.',
  durationMin: 30,
  roles: ['assetManagement'],
  composition: [
    { kind: 'fit', sectionLabel: 'Opening · Fit' },
    { kind: 'technical', difficulty: 'intermediate', sectionLabel: 'Quant · NOI mechanics' },
    { kind: 'technical', difficulty: 'intermediate', sectionLabel: 'Quant · Lease economics' },
    { kind: 'technical', difficulty: 'intermediate', sectionLabel: 'Quant · Asset-class KPI' },
    { kind: 'situational', sectionLabel: 'Case · NOI variance' },
    { kind: 'situational', sectionLabel: 'Case · Rollover risk' },
    { kind: 'longform', sectionLabel: 'Diagnose the NOI miss' },
    { kind: 'behavioral', sectionLabel: 'Behavioral · Tenant work' },
  ],
  contentScopes: {
    technicalKindPool: [
      // NOI mechanics
      'rentChange',
      'opexChange',
      'noiFromOer',
      'operatingExpenseRatio',
      // Lease economics
      'netEffectiveRent',
      'tiVsRent',
      'tiPayback',
      'walt',
      'tiPerSfPerYearOfTerm',
      'renewalProbabilityWeightedRent',
      // Asset-class
      'lossToLease',
      'revparFromAdrOcc',
      'gopMargin',
      'occupancyCostRatio',
      'salesPerSf',
    ],
    situationalIdPool: [
      'noi-growth-smell-test',
      'noi-growth-missing',
      'budget-vs-actual-variance',
      'ti-vs-rent-giveback',
      'rollover-concentration',
      'capex-reserve-discipline',
      'tax-reassessment-surprise',
      'lease-billback-allowance',
      'lease-base-year-vs-stop',
      'lease-cam-reconciliation',
    ],
    longformIdPool: ['diagnose-noi-miss', 'refi-or-sell-memo'],
    fitIdPool: ['fit-tell-me-about-yourself', 'fit-why-cre', 'fit-why-this-firm'],
    behavioralIdPool: [
      'beh-tenant-negotiation',
      'beh-data-vs-instinct',
      'beh-mentor-feedback',
      'beh-time-pressure',
    ],
    marketViewIdPool: ['mv-sector-overweight', 'mv-cap-rate-direction'],
  },
};
