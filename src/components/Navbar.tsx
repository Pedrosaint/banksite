import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Accounts", id: "accounts" },
    { name: "Loans & Rates", id: "loans" },
    { name: "Services", id: "services" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="shrink-0">
            <div className="text-2xl font-bold text-[#0a2540]">
              American<span className="text-[#13b5a3]"> Credit</span>
            </div>
            <div className="text-xs text-gray-500">Digital Banking</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`px-4 py-2 rounded-md transition-all duration-300 relative ${
                  activeSection === item.id
                    ? "bg-[#13b5a3] text-white"
                    : "text-gray-700 hover:text-[#13b5a3] hover:bg-[#13b5a3]/5"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Online Banking Button */}
          <div className="hidden lg:block">
            <Link
              to="/login"
              className="bg-[#13b5a3] text-white px-6 py-2 rounded-lg hover:bg-[#0f9e8f] transition-all duration-300 font-semibold btn-glow"
            >
              Online Banking
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#13b5a3] text-2xl transition-colors"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 animate-[fadeInUp_0.3s_ease-out]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`block w-full text-left px-4 py-2 rounded transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-[#13b5a3]/10 text-[#13b5a3] font-semibold"
                    : "text-gray-700 hover:bg-[#13b5a3]/5 hover:text-[#13b5a3]"
                }`}
              >
                {item.name}
              </button>
            ))}
            <Link
              to="/login"
              className="block w-full bg-[#13b5a3] text-white px-4 py-2 rounded font-semibold mt-2 hover:bg-[#0f9e8f] transition-all duration-300 text-center"
            >
              Online Banking
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
