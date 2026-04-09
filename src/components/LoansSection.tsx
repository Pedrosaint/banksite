import { FiHome, FiTruck, FiDollarSign } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

export default function LoansSection() {
  const titleRef = useReveal();
  const cardsRef = useReveal();
  const tableRef = useReveal();

  const loans = [
    {
      icon: FiHome,
      title: "Home Loans",
      slug: "home-loans",
      description: "Build wealth with our competitive home loan programs",
      apr: "From 6.25%*",
      features: ["Fast approval", "Flexible terms", "Low down payment"],
    },
    {
      icon: FiTruck,
      title: "Auto Loans",
      slug: "auto-loans",
      description: "Finance your next vehicle with competitive rates",
      apr: "From 5.99%*",
      features: ["Quick decision", "Used & new cars", "Refinancing available"],
    },
    {
      icon: FiDollarSign,
      title: "Personal Loans",
      slug: "personal-loans",
      description: "Flexible funds for whatever matters most to you",
      apr: "From 11.99%*",
      features: ["Same-day funding", "Flexible amounts", "No collateral"],
    },
  ];

  return (
    <section id="loans" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 reveal">
          <h2 className="text-4xl font-bold text-[#0a2540] mb-4">
            Loans & Rates
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Competitive rates tailored to fit your needs.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 stagger-children">
          {loans.map((loan, index) => {
            const IconComponent = loan.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover-lift group"
              >
                <div className="bg-[#0a2540] p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#13b5a3] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <IconComponent className="text-6xl text-white mx-auto relative z-10" />
                  <h3 className="text-2xl font-bold text-white mt-4 relative z-10">
                    {loan.title}
                  </h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-4">{loan.description}</p>
                  <div className="bg-[#e6f7f5] rounded-lg p-4 mb-6 border-l-4 border-[#13b5a3]">
                    <div className="text-sm text-gray-500 mb-1">
                      Current Rate
                    </div>
                    <div className="text-3xl font-bold text-[#0a2540]">
                      {loan.apr}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      APR* Rates subject to credit approval
                    </div>
                  </div>
                  <ul className="space-y-2 mb-8">
                    {loan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-[#13b5a3] font-bold">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/loans/${loan.slug}`}
                    className="block w-full bg-[#13b5a3] text-white py-3 rounded-lg hover:bg-[#0f9e8f] transition-all duration-300 font-semibold btn-glow text-center"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rates Table */}
        <div ref={tableRef} className="bg-gray-50 rounded-xl p-8 overflow-x-auto reveal">
          <h3 className="text-2xl font-bold text-[#0a2540] mb-6">
            Current Rates
          </h3>
          <table className="w-full">
            <thead>
              <tr className="bg-[#0a2540] text-white">
                <th className="px-6 py-3 text-left font-semibold">Loan Type</th>
                <th className="px-6 py-3 text-left font-semibold">APR*</th>
                <th className="px-6 py-3 text-left font-semibold">Term</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Application
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  type: "Home Loan",
                  apr: "6.25% - 7.5%",
                  term: "15-30 years",
                  slug: "home-loans",
                },
                {
                  type: "Auto Loan",
                  apr: "5.99% - 7.25%",
                  term: "36-84 months",
                  slug: "auto-loans",
                },
                {
                  type: "Personal Loan",
                  apr: "11.99% - 14.75%",
                  term: "24-60 months",
                  slug: "personal-loans",
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-[#e6f7f5] transition-colors duration-200`}
                >
                  <td className="px-6 py-4 text-gray-800 font-semibold">
                    {row.type}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{row.apr}</td>
                  <td className="px-6 py-4 text-gray-700">{row.term}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/loans/${row.slug}`}
                      className="text-[#13b5a3] font-semibold hover:text-[#0f9e8f] transition-colors animated-underline"
                    >
                      Apply Online
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-4">
            * APR = Annual Percentage Rate. Rates are subject to credit approval
            and may vary based on creditworthiness and other factors.
          </p>
        </div>
      </div>
    </section>
  );
}
