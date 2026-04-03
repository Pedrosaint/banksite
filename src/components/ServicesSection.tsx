import {
  FiGlobe,
  FiSmartphone,
  FiCreditCard,
  FiPhone,
  FiDollarSign,
  FiRefreshCw,
  FiLock,
} from "react-icons/fi";

export default function ServicesSection() {
  const services = [
    {
      title: "Online Banking",
      description:
        "Manage your accounts 24/7 from anywhere with our secure online platform.",
      icon: FiGlobe,
    },
    {
      title: "Mobile App",
      description:
        "Banking in your pocket. Download our app and stay connected on the go.",
      icon: FiSmartphone,
    },
    {
      title: "ATM Network",
      description: "Access to 30,000+ surcharge-free ATMs nationwide.",
      icon: FiCreditCard,
    },
    {
      title: "Customer Support",
      description:
        "Our dedicated team is ready to help you Monday-Friday, 8am-6pm EST.",
      icon: FiPhone,
    },
    {
      title: "Bill Pay",
      description: "Pay bills safely and securely without leaving your home.",
      icon: FiDollarSign,
    },
    {
      title: "Money Transfer",
      description:
        "Send money to friends and family quickly with ACH transfers.",
      icon: FiRefreshCw,
    },
  ];

  return (
    <section id="services" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need for modern banking, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 text-center"
              >
                <IconComponent className="text-6xl text-blue-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Security & Trust */}
        <div className="bg-linear-to-r from-blue-900 to-blue-700 rounded-xl p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <FiLock className="text-4xl mr-3" />
              <h3 className="text-3xl font-bold">Security You Can Trust</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <span className="text-3xl mr-4">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">NCUA Insured</h4>
                  <p className="text-blue-100">
                    Your deposits are protected up to $250,000 by the National
                    Credit Union Administration
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-3xl mr-4">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">256-Bit Encryption</h4>
                  <p className="text-blue-100">
                    Bank-level security protects all your transactions and
                    personal information
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-3xl mr-4">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Multi-Factor Authentication
                  </h4>
                  <p className="text-blue-100">
                    Extra layer of protection ensures only you can access your
                    accounts
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-3xl mr-4">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">
                    24/7 Fraud Monitoring
                  </h4>
                  <p className="text-blue-100">
                    Continuous monitoring to detect and prevent unauthorized
                    activity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
