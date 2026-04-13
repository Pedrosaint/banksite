import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  error: string;
}

export default function LoginForm({
  onSubmit,
  loading,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(email, password);
    return false;
  };

  return (
    <div className="min-h-screen bg-[#0a2540] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            American<span className="text-[#13b5a3]"> Credit</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Sign in to your banking portal
          </p>
          <p className="text-center text-gray-500 text-xs mt-2">
            <Link to="/" className="text-[#13b5a3] hover:underline">
              ← Back to website
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0a2540] mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                  placeholder="https://www.wellsfargo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
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
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#13b5a3] text-white py-3 rounded-lg font-semibold hover:bg-[#0f9e8f] transition-colors disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div />
            <a
              href="/register"
              className="text-[#13b5a3] hover:text-[#0f9e8f] transition-colors font-medium"
            >
              Create Account
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
