import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome, FiSend, FiGlobe, FiDollarSign, FiUser, FiLogOut, FiMenu, FiX,
} from "react-icons/fi";
import type { RootState } from "../store";
import { logout } from "../store/authSlice";

const userNav = [
  { label: "ACCOUNT", items: [{ name: "Home", path: "home", icon: FiHome }] },
  {
    label: "FUND TRANSFER",
    items: [
      { name: "Local Transfer", path: "transfer", icon: FiSend },
      { name: "International Transfer", path: "international-transfer", icon: FiGlobe },
      { name: "Deposit", path: "deposit", icon: FiDollarSign },
    ],
  },
  { label: "USER", items: [{ name: "Profile", path: "profile", icon: FiUser }] },
];

const adminNav = [
  { label: "ACCOUNT", items: [{ name: "Home", path: "home", icon: FiHome }] },
];

export default function DashboardLayout() {
  const { role, user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const nav = role === "admin" ? adminNav : userNav;
  const basePath = role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
      isActive
        ? "bg-[#13b5a3] text-white font-medium"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-xl font-bold text-white">
          Nova<span className="text-[#13b5a3]">Trust</span>
        </div>
        <div className="text-[11px] text-gray-500 mt-0.5 uppercase tracking-wider">
          {role === "admin" ? "Admin Portal" : "Banking Portal"}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
        {nav.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={`${basePath}/${item.path}`}
                  className={linkClass}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="text-lg" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        {/* Logout section */}
        <div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">
            AUTHENTICATION
          </div>
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 w-full"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </nav>

      {/* User card */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-[#13b5a3] flex items-center justify-center text-white text-sm font-bold">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="min-w-0">
            <div className="text-sm text-white font-medium truncate">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-[11px] text-gray-500 truncate">{user?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0a2540] flex-col fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#0a2540] z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-[#13b5a3] transition-colors"
          >
            <FiMenu className="text-xl" />
          </button>
          <div className="text-sm text-gray-500 hidden sm:block">
            Welcome back, <span className="font-semibold text-[#0a2540]">{user?.firstName}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#13b5a3] flex items-center justify-center text-white text-xs font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* Logout modal */}
      <AnimatePresence>
        {showLogout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLogout(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-sm text-center"
            >
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLogOut className="text-red-500 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-[#0a2540] mb-2">Confirm Logout</h3>
              <p className="text-sm text-gray-500 mb-6">Are you sure you want to sign out of your account?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogout(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
