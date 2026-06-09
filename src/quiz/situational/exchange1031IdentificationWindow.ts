import type { SituationalCase } from '../../types/situational';

export const exchange1031IdentificationWindow: SituationalCase = {
  id: '1031-identification-window',
  title: '45-day ID window: your primary target just fell through on day 42',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  scenario:
    'You sold a $12M multifamily asset and are in a 1031 exchange. You identified three replacement properties on day 15. It is now day 42 and your first choice has fallen out of contract — the seller re-traded the deal. Your second option is a $10M industrial asset (boots-on-ground due diligence incomplete). Your third is a DST interest in a Class A MF portfolio at an 80% sponsor-controlled basis. The 45-day ID window closes in 3 days; the 180-day close deadline is 135 days away.',
  data: [
    { label: 'Exchange proceeds (gain to defer)', value: '$12M proceeds (~$4M gain)' },
    { label: 'Days elapsed (ID window)', value: '42 of 45' },
    { label: 'Option 1', value: 'Fallen out — no longer available' },
    { label: 'Option 2', value: '$10M industrial; due diligence incomplete' },
    { label: 'Option 3', value: 'DST interest, $10M, institutional MF portfolio' },
    { label: '180-day close deadline', value: '135 days remaining' },
  ],
  question:
    'What is the most important action in the next 3 days, and what risk does each remaining option carry?',
  options: [
    {
      label:
        'Confirm in writing with your QI that Options 2 and/or 3 remain on your identification list before day 45 — you cannot add new properties after the window closes. Option 2 carries execution risk; Option 3 closes the ID risk but trades control for liquidity.',
      isBest: true,
      explanation:
        'IRS rules are strict: after day 45, you cannot identify any new replacement property — you may only close on what is already formally listed with your qualified intermediary. With Option 1 gone, Options 2 and 3 are your entire universe. The immediate priority is not finding new targets but protecting the existing list in writing. Option 2 risk: closing a $10M industrial deal in 135 days with incomplete due diligence is aggressive — execution failure means a taxable exchange. Option 3 risk: DST interests are illiquid and non-controlled, but they are valid IRS-recognized like-kind property per Rev Rul 2004-86. Knowing which risk you are accepting is the decision you must make before day 45.',
    },
    {
      label:
        'Add as many new properties as possible to the list before day 45 — the 3-property rule means you still have room.',
      isBest: false,
      explanation:
        'The 3-property rule limits you to identifying up to three properties without a value ceiling. But the urgent issue is not how many properties you have listed — it\'s that after day 45 you cannot add anything. With 3 days left, the task is protecting the two existing valid targets, not expanding the list with new targets you haven\'t vetted.',
    },
    {
      label:
        'Request a 45-day extension from the IRS — disaster relief precedent from COVID Rev Proc 2020-58 applies.',
      isBest: false,
      explanation:
        'There is no routine mechanism to extend the 45-day ID window. Extensions have only been granted under formally declared federal disasters. Absent a disaster declaration, no extension is available. If this window lapses without valid identified property, the exchange fails and the entire gain is recognized immediately.',
    },
    {
      label:
        'Forget the DST — it is not real like-kind property; only direct real estate qualifies for 1031.',
      isBest: false,
      explanation:
        'Wrong. IRS Revenue Ruling 2004-86 expressly confirms that properly structured DST beneficial interests qualify as like-kind real property for Section 1031 purposes. A DST interest is a valid replacement property. The trade-off is illiquidity and loss of control — not exchange eligibility.',
    },
  ],
  takeaway:
    'The 45-day identification window is an absolute hard deadline — no extensions without a declared disaster. After day 45, you can only close on properties already formally identified in writing with your qualified intermediary. When a target falls through late in the window, the job is protecting valid alternatives, not hunting new ones. DSTs are commonly used as late-window backups precisely because they can close quickly and satisfy the like-kind requirement.',
  tips: [
    'Always over-identify (up to 3 under the 3-property rule) from day 1 as insurance against deal fallout.',
    'DST interests are valid 1031 replacement property per IRS Rev Rul 2004-86 — illiquid and non-controlled, but exchange-eligible.',
    'After day 45: no new identification, period. Before day 45: identification must be in writing to your QI — verbal identification is not sufficient.',
  ],
};
