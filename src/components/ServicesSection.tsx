import {
  FiGlobe,
  FiSmartphone,
  FiCreditCard,
  FiPhone,
  FiDollarSign,
  FiRefreshCw,
  FiLock,
} from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";

export default function ServicesSection() {
  const titleRef = useReveal();
  const gridRef = useReveal();
  const securityRef = useReveal();

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
        <div ref={titleRef} className="text-center mb-12 reveal">
          <h2 className="text-4xl font-bold text-[#0a2540] mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need for modern banking, all in one place.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-16 stagger-children">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-8 hover-lift text-center group"
              >
                <div className="w-16 h-16 bg-[#e6f7f5] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#13b5a3] transition-colors duration-300">
                  <IconComponent className="text-3xl text-[#13b5a3] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Security & Trust */}
        <div ref={securityRef} className="bg-[#0a2540] rounded-xl p-6 sm:p-8 md:p-12 text-white reveal-scale">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <FiLock className="text-4xl mr-3" />
              <h3 className="text-3xl font-bold">Security You Can Trust</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <span className="text-3xl mr-4 text-[#13b5a3]">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">NCUA Insured</h4>
                  <p className="text-white/80">
                    Your deposits are protected up to $250,000 by the National
                    Credit Union Administration
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-3xl mr-4 text-[#13b5a3]">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">256-Bit Encryption</h4>
                  <p className="text-white/80">
                    Bank-level security protects all your transactions and
                    personal information
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-3xl mr-4 text-[#13b5a3]">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Multi-Factor Authentication
                  </h4>
                  <p className="text-white/80">
                    Extra layer of protection ensures only you can access your
                    accounts
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-3xl mr-4 text-[#13b5a3]">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">
                    24/7 Fraud Monitoring
                  </h4>
                  <p className="text-white/80">
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
