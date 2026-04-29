import type { SituationalCase } from '../../types/situational';

export const taxVsIrrTradeoff: SituationalCase = {
  id: 'tax-vs-irr-tradeoff',
  title: 'Same after-tax IRR — what tips the decision?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'assetManagement'],
  assetClass: 'mixed',
  scenario:
    'You\'re a fund GP. Two paths produce identical after-tax IRRs to LPs (~13%): (a) sell the asset now, distribute proceeds; (b) hold + refi to a 65% LTV loan, distribute proceeds, sell at the original year-5 mark. The fund is in year 4 of a 7-year vehicle. Sale costs and recapture/cap gains are baked into both numbers.',
  data: [
    { label: 'After-tax IRR (sell now)', value: '~13%' },
    { label: 'After-tax IRR (refi + hold)', value: '~13%' },
    { label: 'Fund vintage', value: 'Year 4 of 7' },
    { label: 'Refi proceeds', value: '~60% of original equity' },
    { label: 'Recapture / cap-gains', value: 'Same in both paths (deferred in refi)' },
  ],
  question: 'Which non-IRR factor most likely tips the decision?',
  options: [
    {
      label:
        'Tax timing — the refi defers the tax event. If your LPs are tax-sensitive and the fund has no compelling redeployment opportunity, deferral is real value even when IRRs match.',
      isBest: true,
      explanation:
        'Identical after-tax IRRs masks an important difference: the *timing* of the tax event. Sell-now triggers recapture and cap gains today; refi-and-hold defers them to the eventual sale (potentially at a lower rate, or via 1031, or via step-up at death for individual LPs). For tax-sensitive LPs, deferral compounds — same IRR but smaller tax check this year is real after-after-tax value. For institutional / tax-exempt LPs, this matters less, so the answer depends on the LP base.',
    },
    {
      label: 'Reinvestment risk — if redeploying $X today only nets a 12% deal, holding wins.',
      isBest: false,
      explanation:
        'Already baked into the 13% figure (the sell-path proceeds get redeployed at market rates, which the IRR comparison should account for). Restating reinvestment risk doesn\'t add new information.',
    },
    {
      label: 'Fund life — at year 4 of 7, you have 3 years of runway, so holding is fine.',
      isBest: false,
      explanation:
        'Fund-life math matters but the prompt says both paths land within fund life. Once the timeline isn\'t binding, fund life isn\'t the differentiator — tax treatment is.',
    },
    {
      label: 'Carry / promote economics for the GP — refi+hold often pays the GP more carry.',
      isBest: false,
      explanation:
        'Real consideration but pointing the GP toward their own incentives is a conflict, not a decision criterion the LP IC should weight. If the LP-after-tax IRRs match, the LP is indifferent on returns; the *tax* angle is where genuine LP value diverges.',
    },
  ],
  takeaway:
    'When after-tax IRRs match, the decision moves to second-order factors — tax timing usually being the biggest. Refi-and-hold defers the tax event, which compounds into real after-after-tax value for tax-sensitive LPs. For tax-exempt LPs (pensions, endowments) the decision flips back to redeployment opportunity. The LP base shapes the answer.',
  tips: [
    'Identical after-tax IRRs ≠ identical after-after-tax outcomes. Tax timing matters.',
    'Refi defers; sale crystallizes. Compounding favors deferral when rates aren\'t falling.',
    'The decision should be sensitive to the LP base — institutional vs HNW vs family-office split.',
  ],
};
