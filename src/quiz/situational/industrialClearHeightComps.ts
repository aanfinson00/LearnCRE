import type { SituationalCase } from '../../types/situational';

export const industrialClearHeightComps: SituationalCase = {
  id: 'industrial-clear-height-comps',
  title: 'Are 36-foot comps valid for a 24-foot box?',
  category: 'comp-selection',
  difficulty: 'beginner',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'industrial',
  scenario:
    'You are valuing a 150,000 SF distribution building with 24-foot clear height. The appraiser\'s best comps are three recent deals at 36-foot clear averaging $9.50/SF NNN. Older 24 to 28-foot buildings in the same submarket are leasing at $7.25/SF NNN.',
  data: [
    { label: 'Subject clear height', value: '24 feet' },
    { label: 'Comp A–C clear height', value: '36 feet' },
    { label: '36-foot comp rent', value: '$9.50/SF NNN' },
    { label: '24–28 foot rents', value: '$7.25/SF NNN' },
    { label: 'Subject in-place rent', value: '$7.40/SF NNN' },
  ],
  question: 'How should you use these comps?',
  options: [
    {
      label: 'Anchor on the 24–28 foot rents and treat the 36-foot comps as a ceiling, adjusting only for what tenants will actually pay for height.',
      isBest: true,
      explanation:
        'Clear height drives racking capacity and tenant demand; modern distributors pay a premium for 32 to 36 feet. The $2.25/SF spread is the market\'s price for height and does not transfer to the subject. The $7.40 in-place rent is already close to the like-for-like evidence.',
    },
    {
      label: 'Use the $9.50 comps because they are the most recent.',
      isBest: false,
      explanation:
        'Recency does not fix a physical mismatch. The comps are a different product and would imply a rent about 28% above the subject\'s real market.',
    },
    {
      label: 'Average all comps to get about $8.40/SF.',
      isBest: false,
      explanation:
        'Averaging blends two product types and fits neither. It overstates the subject and understates the 36-foot comps.',
    },
    {
      label: 'Ignore rent comps and value on price per SF only.',
      isBest: false,
      explanation:
        'Price per SF is subject to the same height mismatch, and it drops the income evidence.',
    },
  ],
  takeaway:
    'Comp selection starts with physical fit. If a key attribute such as clear height differs, use like-for-like comps and treat the rest as bounds.',
  tips: [
    'Industrial adjustments: clear height, dock ratio, truck court depth, power.',
    'Use outlier comps to bracket the range, not to set the point.',
    'Check that the in-place rent is not already supported by like-for-like deals.',
  ],
};
