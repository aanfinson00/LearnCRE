import type { SituationalCase } from '../../types/situational';

export const opUnitsUpreit: SituationalCase = {
  id: 'op-units-upreit',
  title: 'The REIT offers OP units instead of cash — should you take them?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  scenario:
    'You own a $50M Class A multifamily asset with a $5M adjusted basis (heavily depreciated over 18 years). A large public REIT is offering to acquire it via UPREIT contribution — they will contribute the property into their operating partnership and issue you OP units valued at $50M (current OP unit NAV = $22/unit; REIT share price = $21.50/unit). The cash alternative from a separate buyer is $49M. You are a taxable individual, age 55, with estate-planning intent.',
  data: [
    { label: 'REIT OP unit offer', value: '$50M (OP units at $22 NAV)' },
    { label: 'Cash sale offer', value: '$49M' },
    { label: 'Adjusted basis', value: '$5M (18 yrs of depreciation)' },
    { label: 'Estimated tax on cash sale', value: '~$10–12M (recapture + LTCG)' },
    { label: 'OP unit / REIT share spread', value: '$22 NAV vs $21.50 traded price' },
    { label: 'Owner profile', value: '55 years old, taxable, estate-planning intent' },
  ],
  question: 'What is the most important consideration when choosing between the OP unit offer and the cash sale?',
  options: [
    {
      label:
        'The OP unit contribution defers the full $45M gain including recapture — no tax event at contribution. For a 55-year-old with estate intent, deferring $10–12M in taxes and allowing that capital to compound for 10–15 years, with potential elimination via step-up at death, makes the OP unit path superior to cash in most scenarios.',
      isBest: true,
      explanation:
        'An UPREIT contribution is not a taxable exchange — you are swapping real estate for OP units, not for cash, so no gain is recognized at contribution. The gain is deferred until you convert OP units to REIT shares and sell. If you hold to death, heirs receive a step-up in basis on the OP units at FMV — the $10–12M deferred tax may evaporate entirely. At 55 with estate intent, this deferral has massive compounding value. The $1M price premium of the OP offer over cash further reinforces the choice. The risks are real (OP unit lockup periods, NAV-to-share discount at conversion, REIT operating risk) but secondary to the magnitude of the tax advantage for a taxable owner with a long horizon.',
    },
    {
      label:
        'Take cash — OP units are illiquid and the NAV-to-share discount means you are immediately underwater versus the stated offer value.',
      isBest: false,
      explanation:
        'Liquidity and NAV discount are real considerations but do not override the tax deferral math. The estimated tax on a cash sale is $10–12M — that is capital that compounds for 10–15 years in the OP unit path versus being remitted to the IRS immediately. The NAV-to-share spread of 50 cents on a $22 unit is meaningful but not comparable in magnitude to the tax liability being deferred.',
    },
    {
      label:
        'The 50-cent NAV-to-share discount is arbitrage — convert to shares immediately and lock the $1M spread.',
      isBest: false,
      explanation:
        'Converting OP units to shares is the taxable event — it triggers recognition of the deferred gain. "Arbitraging" the 50-cent spread by converting would cost $10–12M in taxes to capture a ~$1M price difference. The trade is deeply negative. OP unit lockup provisions also typically prohibit immediate conversion (12–24-month lockups are standard).',
    },
    {
      label:
        'Both paths are real-estate-backed so the outcomes are essentially equivalent — choose whichever closes faster.',
      isBest: false,
      explanation:
        'A $10–12M tax difference is not equivalent. The OP unit path defers all gain recognition at contribution; the cash sale triggers it immediately. These are materially different economic outcomes for a taxable owner.',
    },
  ],
  takeaway:
    'OP units in an UPREIT contribution are a tax-deferral vehicle, not just a payment type. The full gain — including recapture — is deferred until conversion. For a heavily depreciated asset held by a taxable owner with estate-planning intent, the deferred tax compounding and potential step-up-at-death elimination can make an OP unit offer mathematically superior to a higher cash offer. Match the structure analysis to the owner\'s tax position and time horizon before recommending cash.',
  tips: [
    'UPREIT contribution ≠ taxable event. Tax deferred until OP units are converted to shares and sold — or eliminated via step-up at death.',
    'OP unit lockup periods are typically 12–24 months. Read the operating partnership agreement before accepting.',
    'NAV discount at conversion: if shares trade at a discount to NAV, that discount bites only when you convert. If your plan is estate-step-up, conversion timing may be irrelevant.',
  ],
};
