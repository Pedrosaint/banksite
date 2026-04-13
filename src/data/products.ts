export interface Product {
  slug: string;
  category: "accounts" | "loans";
  title: string;
  tagline: string;
  heroImage: string;
  description: string[];
  features: { title: string; description: string }[];
  rates?: { label: string; value: string; note?: string }[];
  benefits: string[];
  requirements?: string[];
  ctaLabel: string;
  ctaSecondaryLabel?: string;
}

export const products: Product[] = [
  {
    slug: "savings-account",
    category: "accounts",
    title: "Savings Account",
    tagline: "Build your financial future with competitive rates",
    heroImage:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    description: [
      "Our Savings Account is designed to help you grow your money over time with competitive interest rates and zero hassle. Whether you're building an emergency fund or saving for a big goal, NovaTrust makes it easy to stay on track.",
      "With no minimum balance requirements and no monthly fees, your savings work harder for you. Plus, you'll enjoy full access through our mobile app and online banking platform.",
    ],
    features: [
      {
        title: "Competitive APY",
        description:
          "Earn up to % APY on your balance — significantly higher than the national average.",
      },
      {
        title: "No Minimum Balance",
        description:
          "Open your account with as little as $ and never worry about minimum balance fees.",
      },
      {
        title: "Easy Transfers",
        description:
          "Move money instantly between your NovaTrust accounts or set up automatic transfers to grow savings effortlessly.",
      },
      {
        title: "NCUA Insured",
        description:
          "Your deposits are federally insured by the National Credit Union Administration.",
      },
      {
        title: "Mobile & Online Access",
        description:
          "Check balances, transfer funds, and manage your account from anywhere with our free mobile app.",
      },
      {
        title: "Free Checks",
        description:
          "Receive your first order of personalized checks free when you open your account.",
      },
    ],
    rates: [
      { label: "$ – $", value: "% APY" },
      { label: "$ – $", value: "% APY" },
      { label: "$+", value: "% APY" },
    ],
    benefits: [
      "No monthly maintenance fees",
      "Free online and mobile banking",
      "Free direct deposit",
      "Access to surcharge-free ATMs",
      "Automatic savings tools",
      "24/7 account access",
    ],
    requirements: [
      "Must be at least 18 years old (or have a joint account holder who is)",
      "Valid government-issued ID",
      "$5 minimum opening deposit",
      "Social Security Number or ITIN",
    ],
    ctaLabel: "Open a Savings Account",
    ctaSecondaryLabel: "Schedule a Consultation",
  },
  {
    slug: "checking-account",
    category: "accounts",
    title: "Checking Account",
    tagline: "Everyday banking with zero monthly fees",
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    description: [
      "NovaTrust's Checking Account gives you the flexibility and freedom you need for daily banking. With no monthly fees and unlimited transactions, managing your money has never been easier.",
      "Enjoy complimentary debit card, mobile check deposit, bill pay, and person-to-person transfers — all included at no extra cost.",
    ],
    features: [
      {
        title: "No Monthly Fees",
        description:
          "Keep more of your money. Our checking account has zero monthly maintenance fees, period.",
      },
      {
        title: "Unlimited Transactions",
        description:
          "Write as many checks and make as many purchases as you need without transaction limits.",
      },
      {
        title: "Debit Card Included",
        description:
          "Receive a free Visa debit card with chip technology, contactless pay, and fraud protection.",
      },
      {
        title: "Mobile Check Deposit",
        description:
          "Deposit checks from anywhere by snapping a photo with our mobile app. Funds available next business day.",
      },
      {
        title: "Online Bill Pay",
        description:
          "Pay all your bills from one place. Set up recurring payments and never miss a due date.",
      },
      {
        title: "ATM Fee Reimbursement",
        description:
          "We reimburse up to $10/month in out-of-network ATM fees so you can access cash anywhere.",
      },
    ],
    benefits: [
      "No monthly fees or minimum balance",
      "Free Visa debit card with rewards",
      "Mobile check deposit",
      "Free online bill pay",
      "Overdraft protection available",
      "Digital wallet support (Apple Pay, Google Pay)",
    ],
    requirements: [
      "Must be at least 18 years old",
      "Valid government-issued photo ID",
      "$25 minimum opening deposit",
      "Social Security Number or ITIN",
    ],
    ctaLabel: "Open a Checking Account",
    ctaSecondaryLabel: "Compare Accounts",
  },
  {
    slug: "business-account",
    category: "accounts",
    title: "Business Account",
    tagline: "Banking solutions built for your business",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    description: [
      "From startups to established enterprises, NovaTrust Business Accounts provide the tools and support your business needs to thrive. Enjoy competitive rates, dedicated service, and merchant solutions all under one roof.",
      "Our business banking specialists understand the unique challenges businesses face and are here to provide personalized guidance every step of the way.",
    ],
    features: [
      {
        title: "Dedicated Business Support",
        description:
          "Get a dedicated business banking specialist who understands your industry and goals.",
      },
      {
        title: "Merchant Services",
        description:
          "Accept credit and debit card payments with competitive processing rates and modern POS solutions.",
      },
      {
        title: "Flexible Terms",
        description:
          "Choose from multiple account tiers designed to match your transaction volume and business size.",
      },
      {
        title: "Business Lending",
        description:
          "Access lines of credit, term loans, and SBA loans to fuel your business growth.",
      },
      {
        title: "Payroll Integration",
        description:
          "Streamline payroll with direct deposit, ACH origination, and integration with major payroll providers.",
      },
      {
        title: "Business Online Banking",
        description:
          "Manage accounts, initiate wire transfers, and control user permissions — all from our business portal.",
      },
    ],
    rates: [
      { label: "Business Checking", value: "No monthly fee", note: "First transactions free" },
      { label: "Business Savings", value: "% APY" },
      { label: "Business Money Market", value: "% APY", note: "$ minimum" },
    ],
    benefits: [
      "No minimum balance requirement",
      "Free business debit cards",
      "Remote deposit capture",
      "ACH and wire transfer capabilities",
      "Multi-user access with role-based permissions",
      "Monthly account analysis statements",
    ],
    requirements: [
      "Employer Identification Number (EIN) or SSN for sole proprietors",
      "Business formation documents (Articles of Incorporation, LLC papers, etc.)",
      "Valid government-issued ID for all signers",
      "$ minimum opening deposit",
    ],
    ctaLabel: "Open a Business Account",
    ctaSecondaryLabel: "Talk to a Specialist",
  },
  {
    slug: "home-loans",
    category: "loans",
    title: "Home Loans",
    tagline: "Make your homeownership dreams a reality",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    description: [
      "Whether you're buying your first home, upgrading, or refinancing, NovaTrust offers competitive mortgage rates and personalized guidance to make the process seamless. Our experienced mortgage team will walk you through every step.",
      "We offer fixed-rate and adjustable-rate mortgages, with flexible terms and low down payment options. Pre-approval is fast and easy — apply online and get a decision within 24 hours.",
    ],
    features: [
      {
        title: "Competitive Fixed Rates",
        description:
          "Lock in a low rate for the life of your loan with terms from 10 to 30 years.",
      },
      {
        title: "Low Down Payment",
        description:
          "Qualify with as little as 3% down. First-time homebuyer programs available with 0% down.",
      },
      {
        title: "Fast Pre-Approval",
        description:
          "Get pre-approved online in minutes. Our streamlined process means less paperwork and faster closings.",
      },
      {
        title: "Refinancing Options",
        description:
          "Lower your rate, shorten your term, or cash out equity. We'll help you find the right refinance strategy.",
      },
      {
        title: "Local Processing",
        description:
          "Your loan is processed and serviced locally by people who know your community.",
      },
      {
        title: "No Hidden Fees",
        description:
          "Transparent pricing with no application fees. We'll provide a detailed cost breakdown before you commit.",
      },
    ],
    rates: [
      { label: "-Year Fixed", value: "% APR" },
      { label: "-Year Fixed", value: "% APR" },
      { label: "-Year Fixed", value: "% APR" },
      { label: "/ ARM", value: "% APR", note: "Rate adjusts after years" },
    ],
    benefits: [
      "$0 application fee",
      "Rate lock available up to 90 days",
      "First-time homebuyer programs",
      "Construction-to-permanent loans available",
      "Home equity line of credit (HELOC)",
      "Free mortgage calculators and tools",
    ],
    requirements: [
      "Minimum credit score of 620 (580 for FHA loans)",
      "Proof of income (pay stubs, W-2s, tax returns)",
      "Employment verification",
      "Down payment (varies by loan type)",
      "Property appraisal",
    ],
    ctaLabel: "Apply for a Home Loan",
    ctaSecondaryLabel: "Calculate Your Payment",
  },
  {
    slug: "auto-loans",
    category: "loans",
    title: "Auto Loans",
    tagline: "Drive your dream car with rates you'll love",
    heroImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    description: [
      "Get behind the wheel with NovaTrust's auto loans. Whether you're buying new, used, or refinancing your current vehicle, we offer some of the most competitive rates in the region with flexible repayment terms.",
      "Our fast approval process means you can shop with confidence. Get pre-approved before you visit the dealership and negotiate like a cash buyer.",
    ],
    features: [
      {
        title: "Quick Approval",
        description:
          "Apply online and get a decision in as fast as 30 minutes. Same-day funding available.",
      },
      {
        title: "New & Used Vehicles",
        description:
          "Finance new cars, trucks, and SUVs, or save with competitive used vehicle rates.",
      },
      {
        title: "Refinancing Available",
        description:
          "Already have an auto loan elsewhere? Refinance with us and potentially save hundreds per year.",
      },
      {
        title: "Flexible Terms",
        description:
          "Choose repayment terms from 36 to 84 months to fit your monthly budget.",
      },
      {
        title: "No Prepayment Penalties",
        description:
          "Pay off your loan early without any extra charges. Save on interest when you can.",
      },
      {
        title: "GAP Insurance",
        description:
          "Optional Guaranteed Asset Protection covers the difference between your loan balance and insurance payout.",
      },
    ],
    rates: [
      { label: "New Vehicle ( mo)", value: "% APR" },
      { label: "New Vehicle ( mo)", value: "% APR" },
      { label: "New Vehicle ( mo)", value: "% APR" },
      { label: "Used Vehicle ( mo)", value: "% APR" },
      { label: "Used Vehicle ( mo)", value: "% APR" },
      { label: "Refinance", value: "As low as % APR" },
    ],
    benefits: [
      "No application fee",
      "Pre-approval in minutes",
      "Dealer direct program",
      "Automatic payment discount (0.25% off)",
      "Extended warranty financing",
      "Free vehicle value lookup tools",
    ],
    requirements: [
      "Minimum credit score of 600",
      "Proof of income",
      "Valid driver's license",
      "Proof of full coverage insurance",
      "Vehicle information (for used/refinance)",
    ],
    ctaLabel: "Apply for an Auto Loan",
    ctaSecondaryLabel: "Get Pre-Approved",
  },
  {
    slug: "personal-loans",
    category: "loans",
    title: "Personal Loans",
    tagline: "Flexible funding for whatever life brings",
    heroImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    description: [
      "Need funds for a home improvement, debt consolidation, medical expenses, or a special occasion? NovaTrust personal loans give you the flexibility to use your money however you need, with fixed rates and predictable monthly payments.",
      "No collateral required. Apply online, get approved fast, and have funds deposited directly into your account — often the same day.",
    ],
    features: [
      {
        title: "Same-Day Funding",
        description:
          "Once approved, funds can be deposited into your account the same business day.",
      },
      {
        title: "Flexible Loan Amounts",
        description:
          "Borrow from $1,000 to $50,000 based on your needs and creditworthiness.",
      },
      {
        title: "No Collateral Needed",
        description:
          "Our personal loans are unsecured, so you don't need to put up your home or car as collateral.",
      },
      {
        title: "Fixed Monthly Payments",
        description:
          "Know exactly what you'll pay each month with a fixed interest rate for the life of the loan.",
      },
      {
        title: "Debt Consolidation",
        description:
          "Combine multiple high-interest debts into one lower monthly payment and save on interest.",
      },
      {
        title: "No Prepayment Penalty",
        description:
          "Pay off your loan early and save on interest with no additional fees or penalties.",
      },
    ],
    rates: [
      { label: " Months", value: "% APR" },
      { label: " Months", value: "% APR" },
      { label: " Months", value: "% APR" },
      { label: " Months", value: "% APR" },
    ],
    benefits: [
      "No application or origination fees",
      "Fixed rates — no surprises",
      "Borrow $1,000 to $50,000",
      "Use for any personal expense",
      "Automatic payment discount available",
      "Free financial counseling",
    ],
    requirements: [
      "Minimum credit score of ",
      "Proof of income (pay stubs or tax returns)",
      "Valid government-issued ID",
      "Minimum year of employment history",
      "Debt-to-income ratio below %",
    ],
    ctaLabel: "Apply for a Personal Loan",
    ctaSecondaryLabel: "Check Your Rate",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: "accounts" | "loans"): Product[] {
  return products.filter((p) => p.category === category);
}
