import { FiDollarSign, FiCreditCard, FiBriefcase } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

export default function AccountsSection() {
  const titleRef = useReveal();
  const cardsRef = useReveal();

  const accounts = [
    {
      icon: FiDollarSign,
      title: "Savings Account",
      slug: "savings-account",
      description:
        "Build your financial future with our competitive savings rates",
      benefits: [
        "Competitive APY",
        "No minimum balance",
        "Easy transfers",
        "Free checks",
      ],
    },
    {
      icon: FiCreditCard,
      title: "Checking Account",
      slug: "checking-account",
      description:
        "Daily banking with no monthly fees and unlimited transactions",
      benefits: [
        "No monthly fees",
        "Unlimited check writing",
        "Debit card included",
        "Online banking",
      ],
    },
    {
      icon: FiBriefcase,
      title: "Business Account",
      slug: "business-account",
      description: "Tailored solutions designed for businesses of all sizes",
      benefits: [
        "Dedicated support",
        "Merchant services",
        "Flexible terms",
        "Growth tools",
      ],
    },
  ];

  return (
    <section id="accounts" className="bg-[#e6f7f5]/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 reveal">
          <h2 className="text-4xl font-bold text-[#0a2540] mb-4">
            Our Accounts
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the account that fits your financial goals.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {accounts.map((account, index) => {
            const IconComponent = account.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover-lift group"
              >
                <div className="bg-[#0a2540] p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#13b5a3] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <IconComponent className="text-5xl text-white mx-auto relative z-10" />
                  <h3 className="text-2xl font-bold text-white mt-4 relative z-10">
                    {account.title}
                  </h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6">{account.description}</p>
                  <ul className="space-y-2 mb-8">
                    {account.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-[#13b5a3] font-bold">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/accounts/${account.slug}`}
                    className="block w-full bg-[#13b5a3] text-white py-3 rounded-lg hover:bg-[#0f9e8f] transition-all duration-300 font-semibold btn-glow text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
