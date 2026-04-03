import { FiPhone, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function UtilityBar() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-slate-900 text-white py-2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm">
        <div className="flex items-center space-x-2 sm:space-x-6">
          <a
            href="tel:+15551234567"
            className="hover:text-[#13b5a3] transition flex items-center space-x-1"
          >
            <FiPhone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">(555) 123-4567</span>
            <span className="sm:hidden">Call</span>
          </a>
          <a
            href="mailto:support@novatrust.com"
            className="hover:text-[#13b5a3] transition flex items-center space-x-1"
          >
            <FiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">support@novatrust.com</span>
            <span className="sm:hidden">Email</span>
          </a>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to="/login" className="hover:text-[#13b5a3] transition">
            Login
          </Link>
          <span>|</span>
          <Link to="/register" className="hover:text-[#13b5a3] transition">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
