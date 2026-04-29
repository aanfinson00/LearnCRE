/**
 * Position roles a user might be prepping for. Content (quiz templates,
 * situational cases, walkthroughs, Excel templates) carries an optional
 * `roles?: Role[]` tag; setup screens filter by role to scope a session
 * to the surface that interview emphasizes.
 *
 * Empty / missing roles tag = "shows up under all roles" (catch-all default).
 */
export type Role =
  | 'acquisitions'
  | 'assetManagement'
  | 'mortgageUw'
  | 'portfolioMgmt'
  | 'development';

export const ROLES: { id: Role; label: string; hint: string }[] = [
  {
    id: 'acquisitions',
    label: 'Acquisitions',
    hint: 'Valuation, comp set, mark-to-market, cap-rate moves.',
  },
  {
    id: 'assetManagement',
    label: 'Asset Mgmt',
    hint: 'NOI growth, rollover, OpEx, hold/refi/sell timing.',
  },
  {
    id: 'mortgageUw',
    label: 'Mortgage UW',
    hint: 'DSCR, debt yield, LTV, refinance risk.',
  },
  {
    id: 'portfolioMgmt',
    label: 'Portfolio Mgmt',
    hint: 'Diversification, weighted-avg metrics, fund economics.',
  },
  {
    id: 'development',
    label: 'Development',
    hint: 'Yield-on-cost, lease-up risk, construction discipline.',
  },
];

/**
 * Match helper: returns true when content with `tags` belongs to the requested
 * role. Untagged content matches *every* role (catch-all). When `requested`
 * is undefined or 'all', everything matches.
 */
export function matchesRole(
  tags: Role[] | undefined,
  requested: Role | 'all' | undefined,
): boolean {
  if (!requested || requested === 'all') return true;
  if (!tags || tags.length === 0) return true;
  return tags.includes(requested);
}
