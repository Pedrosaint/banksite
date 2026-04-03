import { FiDollarSign, FiCreditCard, FiBriefcase } from "react-icons/fi";

export default function AccountsSection() {
  const accounts = [
    {
      icon: FiDollarSign,
      title: "Savings Account",
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
    <section id="accounts" className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Our Accounts
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the account that fits your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accounts.map((account, index) => {
            const IconComponent = account.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <div className="bg-linear-to-r from-blue-900 to-blue-700 p-8 text-center">
                  <IconComponent className="text-5xl text-white mx-auto" />
                  <h3 className="text-2xl font-bold text-white mt-4">
                    {account.title}
                  </h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6">{account.description}</p>
                  <ul className="space-y-2 mb-8">
                    {account.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300 font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
