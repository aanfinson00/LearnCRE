import type { SituationalCase } from '../../types/situational';

export const industrialCaptureRateLeaseUp: SituationalCase = {
  id: 'industrial-capture-rate-lease-up',
  title: 'What share of demand will your building capture?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You are developing a 300,000 SF speculative industrial building. The submarket absorbs about 600,000 SF per year, and four comparable new buildings of the same size, quality, and pricing, including yours, are all delivering in the same year and competing for the same tenant pool.',
  data: [
    { label: 'Your building', value: '300,000 SF' },
    { label: 'Competing buildings (incl. yours)', value: '4 × 300,000 SF' },
    { label: 'Submarket net absorption', value: '600,000 SF/yr' },
    { label: 'Quality and pricing', value: 'Comparable' },
    { label: 'Pro forma lease-up', value: '6 months' },
  ],
  question: 'Using a fair-share capture assumption, how long is realistic lease-up?',
  options: [
    {
      label: 'About 24 months — four equal buildings split 600k SF/yr, so your fair share is ~150k SF/yr and 300k SF takes two years.',
      isBest: true,
      explanation:
        'Fair share = 600k ÷ 4 = 150k SF/yr. 300k ÷ 150k = 2.0 years. The 1.2M SF of new supply needs two years of total submarket demand, and all four buildings are competing for it. You can win more with a better price or product, but that is an upside case.',
    },
    {
      label: 'About 6 months — 300k SF is half of annual absorption.',
      isBest: false,
      explanation:
        'Assumes your building captures the entire submarket\'s demand. Three equal competitors are chasing the same tenants.',
    },
    {
      label: 'About 12 months — you\'ll win half the demand because yours is the best location.',
      isBest: false,
      explanation:
        'Comparable quality and pricing means no basis for a double share. Win more by price or product, not by assumption.',
    },
    {
      label: 'About 48 months — total new supply is 1.2M SF and absorption is 600k SF/yr, so wait two years, then lease.',
      isBest: false,
      explanation:
        'Two years is when the whole wave clears, and your building is leasing throughout that period, so lease-up and market absorption overlap rather than run in sequence.',
    },
  ],
  takeaway:
    'Lease-up time = building size ÷ (market absorption × expected capture share). With equal competitors, fair share is 1/N, and anything above that must be earned through a pricing or product edge.',
  tips: [
    'Fair share = 1 ÷ number of comparable competitors.',
    'Count every competitor delivering in your window.',
    'Treat above-fair-share capture as upside, not base case.',
  ],
};
