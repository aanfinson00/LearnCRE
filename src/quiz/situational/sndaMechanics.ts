import type { SituationalCase } from '../../types/situational';

export const sndaMechanics: SituationalCase = {
  id: 'snda-mechanics',
  title: 'What does an SNDA actually require the tenant to do?',
  category: 'document-literacy',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement', 'mortgageUw'],
  scenario:
    'A landlord is refinancing a retail center. The new lender requires each anchor tenant to execute a Subordination, Non-Disturbance and Attornment Agreement (SNDA) before closing. The grocery anchor tenant has asked their counsel to explain what they\'re being asked to sign and whether it is adverse to their interests.',
  data: [
    { label: 'Document type', value: 'SNDA (Subordination, Non-Disturbance and Attornment)' },
    { label: 'Who executes', value: 'Tenant, landlord, and lender (tripartite agreement)' },
    { label: 'Tenant\'s primary concern', value: 'What happens if the landlord defaults on the loan?' },
  ],
  question: 'What are the three components of an SNDA and how do they affect the tenant?',
  options: [
    {
      label: 'Subordination: tenant agrees its lease is junior to the mortgage lien. Non-Disturbance: lender agrees that if it forecloses, it will honor the tenant\'s lease as long as the tenant is not in default. Attornment: tenant agrees to recognize the lender (or new owner post-foreclosure) as its new landlord. Collectively, it protects both sides: the lender gets priority; the tenant keeps its space.',
      isBest: true,
      explanation:
        'SNDA is a tripartite agreement with three interdependent components: (1) **Subordination** — the tenant acknowledges its lease is junior to the lender\'s deed of trust/mortgage. This means in a foreclosure, the lender\'s lien takes priority and could theoretically extinguish the lease. (2) **Non-Disturbance** — in exchange for the tenant\'s subordination, the lender contractually agrees that if it forecloses, it will not disturb the tenant\'s possession as long as the tenant is not in default. This is the critical protection the tenant receives — without it, subordination would expose the tenant to eviction by a foreclosing lender. (3) **Attornment** — the tenant agrees to recognize and pay rent to whoever acquires the property through foreclosure or the lender\'s exercise of remedies. This gives the lender and any successor landlord contractual continuity of the tenant relationship. The SNDA is generally neutral-to-favorable to a tenant in good standing — the non-disturbance clause protects them in the default scenario they most fear.',
    },
    {
      label: 'SNDA is primarily a document that protects the lender — the tenant receives nothing and should push back on signing.',
      isBest: false,
      explanation:
        'An SNDA that includes a non-disturbance clause is not purely lender-favorable. Without the SNDA, the tenant\'s lease is already subordinate to the lender\'s mortgage in most jurisdictions. The SNDA makes the subordination explicit — but the non-disturbance clause adds protection the tenant didn\'t previously have in a contractual form. A well-negotiated SNDA is a reasonable exchange: the tenant formalizes existing legal position and gains explicit lease protection in the lender\'s foreclosure scenario.',
    },
    {
      label: 'The subordination clause means the tenant can be evicted if the landlord defaults.',
      isBest: false,
      explanation:
        'Subordination alone, without non-disturbance, could allow the lender to extinguish the lease on foreclosure. That\'s exactly why the non-disturbance clause exists as part of the SNDA package. If the SNDA contains a proper non-disturbance clause, the tenant is explicitly protected from eviction by a foreclosing lender as long as they aren\'t in default. A tenant should confirm the non-disturbance is present before signing — if it\'s missing, that\'s the item to negotiate.',
    },
    {
      label: 'Attornment is the most important clause — without it, the tenant can cancel the lease on ownership change.',
      isBest: false,
      explanation:
        'Attornment requires the tenant to recognize a successor landlord, which is important for lender continuity — but the most important clause for the *tenant* is non-disturbance. Attornment primarily serves the lender and any successor owner. The tenant\'s key protection is the non-disturbance clause, which prevents the lender from using foreclosure as a mechanism to evict a performing tenant.',
    },
  ],
  takeaway:
    'SNDA = Subordination + Non-Disturbance + Attornment, each serving a different party. A tenant signing an SNDA with a proper non-disturbance clause is not conceding anything harmful — they\'re formalizing existing legal position and gaining explicit lease-continuity protection in a lender-default scenario. The non-disturbance clause is the key quid pro quo for the tenant.',
  tips: [
    'No non-disturbance clause → tenant should negotiate to add it before signing.',
    'Tenant\'s default exception is standard: non-disturbance only protects tenants who are not themselves in default.',
    'SNDAs are routinely required by lenders on any property with material lease obligations — expect one on every refinancing or new financing of a tenanted property.',
  ],
};
