/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useCreateAdminMutation } from "../api/adminApi";
import { toast } from "sonner";
import { FiUserPlus, FiMail, FiLock, FiUser, FiCheckCircle } from "react-icons/fi";

export default function CreateAdmin() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createAdmin(formData).unwrap();
      if (result.success) {
        toast.success(result.message || "Admin created successfully!");
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
      } else {
        toast.error(result.message || "Failed to create admin.");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "An error occurred while creating admin.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[#0a2540] p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#13b5a3]/20 text-[#13b5a3] mb-4">
            <FiUserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Admin Account</h1>
          <p className="text-gray-400 mt-2 text-sm">System Administration Portal</p>
        </div>

        <div className="p-8">

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">First Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]/20 focus:border-[#13b5a3] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Last Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]/20 focus:border-[#13b5a3] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="https://www.wellsfargo.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]/20 focus:border-[#13b5a3] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]/20 focus:border-[#13b5a3] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#13b5a3] hover:bg-[#0f9e8f] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#13b5a3]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Admin Account
                  <FiCheckCircle className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-100 flex items-center justify-center">
          <p className="text-xs text-center text-gray-400 max-w-[250px]">
            This portal is restricted to internal authorized personnel only. All access is logged and monitored.
          </p>
        </div>
      </div>

      <p className="mt-8 text-gray-400 text-xs tracking-widest uppercase">
        Apex Trust System Infrastructure • v
      </p>
    </div>
  );
}
