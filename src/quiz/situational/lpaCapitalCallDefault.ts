import type { SituationalCase } from '../../types/situational';

export const lpaCapitalCallDefault: SituationalCase = {
  id: 'lpa-capital-call-default',
  title: 'Capital call default — what does the LPA actually do to a non-funder?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'acquisitions'],
  documentExcerpt: {
    docType: 'lpa',
    label: 'Section 4.5 — Member Default Remedies',
    text: `If a Member fails to fund any required Capital Contribution within
ten (10) Business Days following the date specified in the Capital
Call Notice (a "Defaulting Member"), the non-defaulting Members may
elect, by majority of Percentage Interests held by non-defaulting
Members, to exercise one or more of the following remedies:

(a) Funding by Other Members. Non-defaulting Members may fund the
    Defaulting Member\'s shortfall (the "Default Loan"). The Default
    Loan shall accrue interest at the Default Rate (the lesser of
    18% per annum or the maximum rate permitted by law) and be
    repaid out of distributions otherwise payable to the Defaulting
    Member.

(b) Forced Dilution. The Defaulting Member\'s Percentage Interest
    shall be diluted using a "Dilution Multiplier" of 1.5x: the
    Defaulting Member\'s Percentage Interest shall be reduced, and
    the funding Member(s)\' Percentage Interest shall be increased,
    based on a contribution-to-Default-Loan calculation as if the
    Default Loan had been a Capital Contribution at 1.5x face value.

(c) Loss of Voting Rights. The Defaulting Member shall forfeit all
    voting and consent rights for so long as any Default Loan
    remains outstanding.

(d) Forced Buyout. The non-defaulting Members may, by Supermajority
    Consent, force a buyout of the Defaulting Member\'s remaining
    Interest at 75% of the Capital Account balance.`,
  },
  scenario:
    'A capital call has been issued for $3M (LP\'s pro-rata share). LP cannot fund — their internal allocation has been frozen pending a fund-raise. The 10-business-day cure period passes. LP is now a Defaulting Member. The non-defaulting Members are evaluating their remedies.',
  question:
    'Among the four remedies, which is typically the *most punitive* in dollar terms, and why do non-defaulting Members usually pick a combination of remedies rather than one?',
  options: [
    {
      label:
        'Forced Dilution (b) is most punitive: the 1.5x multiplier means LP loses ~50% more economic interest than the dollars contributed by funding Members. Combined remedies — usually Default Loan (a) + Forced Dilution (b) + Loss of Voting (c) — let non-defaulting Members extract economic value (dilution) while preserving capital recovery (Default Loan with 18% interest) and operational control (vote forfeiture). Forced Buyout (d) is the nuclear option, rarely used except to clear out a chronically defaulting partner.',
      isBest: true,
      explanation:
        'Remedy economics: (a) Default Loan at 18% / max-legal recovers principal + steep interest, but doesn\'t shift economic interest. (b) Dilution multiplier of 1.5x means each $1 of funded shortfall translates to $1.50 of effective contribution for the dilution math — so LP\'s defaulted $3M becomes $4.5M of equivalent contribution by funders, and LP\'s ownership shrinks accordingly. (c) Vote forfeiture eliminates LP\'s ability to block decisions — material on supermajority items like sale/refi/budget approval. (d) Forced buyout at 75% of Capital Account is the worst economically *if used*, but requires Supermajority consent and is rare. The combination (a)+(b)+(c) is the standard playbook: lend the money at penalty rate, take economic upside via dilution, and lock the defaulter out of governance. Funders get rewarded for stepping up; defaulter pays multiple ways.',
    },
    {
      label:
        'Default Loan (a) is most punitive — 18% interest compounds aggressively and recovers more than the original obligation.',
      isBest: false,
      explanation:
        '18% on $3M over a typical 2-3 year recovery is $1-1.5M of interest. Forced Dilution at 1.5x on a $3M shortfall costs LP economic interest worth typically $5-8M+ over the life of the deal — far more punitive in dollar terms.',
    },
    {
      label:
        'Loss of Voting Rights (c) is most punitive because it makes the LP irrelevant to governance.',
      isBest: false,
      explanation:
        'Vote loss is operationally painful but not directly economic. The LP still owns their (now-diluted) economic share. Dilution + Default Loan strip more dollar value than vote loss.',
    },
    {
      label:
        'Non-defaulting Members would always pick Forced Buyout (d) because it ends the relationship cleanly.',
      isBest: false,
      explanation:
        'Forced Buyout requires Supermajority Consent, ties up capital to fund the buyout, and crystallizes the LP\'s exit at a fixed (low) price. Most JVs prefer ongoing dilution + vote forfeiture as the punitive lever, reserving buyout for partners who chronically default.',
    },
  ],
  takeaway:
    'Capital-call defaults trigger a menu of remedies — non-defaulting Members typically combine Default Loan (recovers cash + interest), Forced Dilution (extracts economic value at a multiplier), and Vote Forfeiture (control). Forced Buyout is the nuclear option. Dilution is usually the most punitive in dollar terms because of the multiplier. LPs should structure their LPA participation only after stress-testing what a 1.5-2.0x dilution multiplier on their pro-rata share would do to their effective ownership.',
  tips: [
    'Dilution multipliers are the LP\'s biggest exposure on capital-call defaults. 1.5x is sponsor-friendly default; 2.0x is aggressive; 1.0x (no penalty) is rare.',
    'Default rates of 12-18% are typical. Capped at "max permitted by law" (usury cap) to stay enforceable.',
    'Negotiation lever: LPs with leverage push for lower dilution multipliers and longer cure periods (e.g. 30 days vs 10).',
    'Always ask: what does my model look like at 0.7× ownership, 0.5× ownership? If you can\'t survive that, negotiate harder upfront.',
  ],
};
