import { FiHome, FiTruck, FiDollarSign } from "react-icons/fi";

export default function LoansSection() {
  const loans = [
    {
      icon: FiHome,
      title: "Home Loans",
      description: "Build wealth with our competitive home loan programs",
      apr: "From 6.25%*",
      features: ["Fast approval", "Flexible terms", "Low down payment"],
    },
    {
      icon: FiTruck,
      title: "Auto Loans",
      description: "Finance your next vehicle with competitive rates",
      apr: "From 5.99%*",
      features: ["Quick decision", "Used & new cars", "Refinancing available"],
    },
    {
      icon: FiDollarSign,
      title: "Personal Loans",
      description: "Flexible funds for whatever matters most to you",
      apr: "From 11.99%*",
      features: ["Same-day funding", "Flexible amounts", "No collateral"],
    },
  ];

  return (
    <section id="loans" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Loans & Rates
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Competitive rates tailored to fit your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {loans.map((loan, index) => {
            const IconComponent = loan.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <div className="bg-linear-to-r from-blue-800 to-blue-600 p-8 text-center">
                  <IconComponent className="text-6xl text-white mx-auto" />
                  <h3 className="text-2xl font-bold text-white mt-4">
                    {loan.title}
                  </h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-4">{loan.description}</p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-blue-900">
                    <div className="text-sm text-gray-500 mb-1">
                      Current Rate
                    </div>
                    <div className="text-3xl font-bold text-blue-900">
                      {loan.apr}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      APR* Rates subject to credit approval
                    </div>
                  </div>
                  <ul className="space-y-2 mb-8">
                    {loan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300 font-semibold">
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rates Table */}
        <div className="bg-gray-50 rounded-xl p-8 overflow-x-auto">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            Current Rates
          </h3>
          <table className="w-full">
            <thead>
              <tr className="bg-blue-900 text-white">
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
                  status: "Online",
                },
                {
                  type: "Auto Loan",
                  apr: "5.99% - 7.25%",
                  term: "36-84 months",
                  status: "Online",
                },
                {
                  type: "Personal Loan",
                  apr: "11.99% - 14.75%",
                  term: "24-60 months",
                  status: "Online",
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="px-6 py-4 text-gray-800 font-semibold">
                    {row.type}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{row.apr}</td>
                  <td className="px-6 py-4 text-gray-700">{row.term}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">
                    {row.status}
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
