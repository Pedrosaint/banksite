import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0a2540] text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Nova<span className="text-[#13b5a3]">Trust</span>
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Building trust and empowering financial futures for over 25 years.
              Your credit union, your community.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#13b5a3]/20 text-[#13b5a3] rounded-full flex items-center justify-center hover:bg-[#13b5a3] hover:text-white transition-all duration-300"
                title="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#13b5a3]/20 text-[#13b5a3] rounded-full flex items-center justify-center hover:bg-[#13b5a3] hover:text-white transition-all duration-300"
                title="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#13b5a3]/20 text-[#13b5a3] rounded-full flex items-center justify-center hover:bg-[#13b5a3] hover:text-white transition-all duration-300"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#13b5a3]/20 text-[#13b5a3] rounded-full flex items-center justify-center hover:bg-[#13b5a3] hover:text-white transition-all duration-300"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => handleScroll("home")}
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("about")}
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("accounts")}
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  Accounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("loans")}
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  Loans & Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("services")}
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  Services
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  Online Banking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  Mobile App
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  Bill Pay
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  ATM Locator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  Customer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+15551234567"
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@novatrust.com"
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300"
                >
                  support@novatrust.com
                </a>
              </li>
              <li className="text-gray-500 text-xs">Mon-Fri: 8am - 6pm EST</li>
              <li>
                <button
                  onClick={() => handleScroll("contact")}
                  className="text-gray-400 hover:text-[#13b5a3] transition duration-300 mt-2"
                >
                  Contact Form
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom Info */}
        <div className="border-t border-[#13b5a3]/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
            <div className="text-gray-400">
              <p>&copy; 2025 NovaTrust Credit Union. All rights reserved.</p>
            </div>
            <div className="md:text-right space-y-2 md:space-y-0 md:flex md:justify-end md:gap-6 text-gray-400">
              <a href="#" className="hover:text-[#13b5a3] transition duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#13b5a3] transition duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#13b5a3] transition duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>

        {/* NCUA Notice */}
        <div className="p-4 bg-[#13b5a3]/10 border border-[#13b5a3]/20 rounded text-xs text-gray-400">
          <p className="font-semibold text-[#13b5a3] mb-1">
            NCUA Insurance Notice
          </p>
          <p>
            This credit union is federally insured by the National Credit Union
            Administration. Your account is insured up to $250,000 by the NCUA.
          </p>
        </div>
      </div>
    </footer>
  );
}
