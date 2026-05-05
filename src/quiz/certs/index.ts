import type { Cert } from '../../types/cert';
import { creFundamentals } from './cre-fundamentals';
import { acqAnalyst } from './acq-analyst';
import { assetManager } from './asset-manager';
import { mortgageUw } from './mortgage-uw';
import { portfolioManager } from './portfolio-manager';
import { developer } from './developer';

/**
 * Catalog of all certs. CRE Fundamentals is the foundational prerequisite;
 * the 5 role-specific certs each list it via prerequisiteCertId.
 */
export const CERTS: Cert[] = [
  creFundamentals,
  acqAnalyst,
  assetManager,
  mortgageUw,
  portfolioManager,
  developer,
];

export function certById(id: string): Cert | undefined {
  return CERTS.find((c) => c.id === id);
}
