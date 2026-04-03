import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../store/authSlice";
import { mockUsers } from "../data/mockData";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        setError("No account found with this email.");
        setLoading(false);
        return;
      }
      if (password.length < 4) {
        setError("Invalid password.");
        setLoading(false);
        return;
      }

      dispatch(login({ token: "mock-jwt-token-" + user.id, role: user.role, user }));
      navigate(user.role === "admin" ? "/admin/dashboard/home" : "/user/dashboard/home");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a2540] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white">
              Nova<span className="text-[#13b5a3]">Trust</span>
            </h1>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">Sign in to your banking portal</p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0a2540] mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your credentials to access your account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                  placeholder="Enter your password"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#13b5a3] text-white py-3 rounded-lg font-semibold hover:bg-[#0f9e8f] transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">Demo accounts:</p>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex justify-between bg-gray-50 rounded-lg px-3 py-2">
                <span>User: <strong>john.doe@email.com</strong></span>
                <span>Pass: <strong>any 4+ chars</strong></span>
              </div>
              <div className="flex justify-between bg-gray-50 rounded-lg px-3 py-2">
                <span>Admin: <strong>admin@novatrust.com</strong></span>
                <span>Pass: <strong>any 4+ chars</strong></span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          <Link to="/" className="text-[#13b5a3] hover:underline">← Back to website</Link>
        </p>
      </motion.div>
    </div>
  );
}
