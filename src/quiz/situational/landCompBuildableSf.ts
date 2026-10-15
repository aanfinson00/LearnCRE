import type { SituationalCase } from '../../types/situational';

export const landCompBuildableSf: SituationalCase = {
  id: 'land-comp-buildable-sf',
  title: 'Development: how do you value the land?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  scenario:
    "You're pricing a 2.0-acre entitled site that allows a FAR of 3.0. You have two recent entitled land sales. Comp A was 1.5 acres with a FAR of 5.0 and sold for $9.8M. Comp B was 3.0 acres with a FAR of 2.0 and sold for $6.5M. The seller is pointing to the average price per land SF.",
  data: [
    { label: 'Subject', value: '2.0 acres (87,120 SF), FAR 3.0 = 261,360 buildable SF' },
    { label: 'Comp A', value: '65,340 SF land, FAR 5.0, $9.8M ($150/land SF)' },
    { label: 'Comp B', value: '130,680 SF land, FAR 2.0, $6.5M ($50/land SF)' },
    { label: 'Seller claim', value: 'Average about $100/land SF = $8.7M' },
  ],
  question: 'How should you compare the land sales to the subject?',
  options: [
    {
      label:
        "Compare on price per buildable SF: Comp A is about $30/BSF and Comp B about $25/BSF. Applied to the subject's 261,360 buildable SF, that supports roughly $6.5–7.8M, below the seller's $8.7M.",
      isBest: true,
      explanation:
        "Developers pay for what they can build. Comp A has 65,340 × 5.0 = 326,700 buildable SF, so $9.8M ÷ 326,700 is about $30/BSF. Comp B has 130,680 × 2.0 = 261,360 buildable SF, so $6.5M ÷ 261,360 is about $25/BSF. At $25–30 per buildable SF the subject indicates $6.5–7.8M. Price per land SF reads very differently only because the comps have very different densities.",
    },
    {
      label:
        "Average the price per land SF of the two comps ($100) and apply it to the subject's 87,120 SF.",
      isBest: false,
      explanation:
        "Land SF ignores density, which is the main driver of land value. Comp A's land SF price is three times Comp B's because it can hold 2.5 times as much building on each acre. Averaging two numbers that are not on the same basis gives a figure that is not tied to either.",
    },
    {
      label:
        "Use only Comp B because its density is closest to the subject's FAR of 3.0.",
      isBest: false,
      explanation:
        "Comp B's FAR is 2.0 and Comp A's is 5.0, so the subject sits between them. Using one comp discards information, and the point of normalizing per buildable SF is that both comps become usable. Normalize, then adjust for location and timing.",
    },
    {
      label:
        "Use a residual land value from your own pro forma and ignore the comps, since land is a plug.",
      isBest: false,
      explanation:
        "A residual value is a valuable check, but it depends on your rent, cost and return assumptions and moves a lot with each input. The comps show what other developers paid. The two methods should be reconciled, not substituted for each other.",
    },
  ],
  takeaway:
    "Entitled land is priced per buildable SF, not per land SF. Normalize for density first, then adjust for location, timing and entitlement risk.",
  tips: [
    "Buildable SF = land SF × FAR.",
    "Price per land SF only compares sites with the same density.",
    "Cross-check the comp range against a residual land value.",
  ],
};
