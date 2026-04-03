import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", country: "", password: "", confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a2540] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl p-8">
            <div className="w-16 h-16 bg-[#e6f7f5] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#13b5a3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 className="text-xl font-bold text-[#0a2540] mb-2">Account Created!</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your NovaTrust account has been created successfully. You can now sign in with your credentials.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#13b5a3] text-white py-3 rounded-lg font-semibold hover:bg-[#0f9e8f] transition-colors"
            >
              Go to Login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a2540] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white">
              Nova<span className="text-[#13b5a3]">Trust</span>
            </h1>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">Create your banking account</p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0a2540] mb-1">Get Started</h2>
          <p className="text-sm text-gray-500 mb-6">Fill in your details to open an account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3]" placeholder="John" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3]" placeholder="Doe" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3]" placeholder="john@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3]" placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3]" placeholder="United States" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} required
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3]" placeholder="Min 4 characters" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3]" placeholder="Re-enter password" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[#13b5a3] text-white py-3 rounded-lg font-semibold hover:bg-[#0f9e8f] transition-colors disabled:opacity-60">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="text-[#13b5a3] font-medium hover:underline">Sign in</Link>
          </p>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          <Link to="/" className="text-[#13b5a3] hover:underline">← Back to website</Link>
        </p>
      </motion.div>
    </div>
  );
}
