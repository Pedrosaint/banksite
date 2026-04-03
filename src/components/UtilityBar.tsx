import { FiPhone, FiMail } from "react-icons/fi";

export default function UtilityBar() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-slate-900 text-white py-2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-6">
          <a
            href="tel:+15551234567"
            className="hover:text-blue-300 transition flex items-center space-x-1"
          >
            <FiPhone className="w-4 h-4" />
            <span>(555) 123-4567</span>
          </a>
          <a
            href="mailto:support@novatrust.com"
            className="hover:text-blue-300 transition flex items-center space-x-1"
          >
            <FiMail className="w-4 h-4" />
            <span>support@novatrust.com</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-blue-300 transition">
            Login
          </a>
          <span>|</span>
          <a href="#" className="hover:text-blue-300 transition">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
