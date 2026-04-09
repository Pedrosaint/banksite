import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { store } from "./store";
import type { RootState } from "./store";

import UtilityBar from "./components/UtilityBar";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AccountsSection from "./components/AccountsSection";
import LoansSection from "./components/LoansSection";
import ServicesSection from "./components/ServicesSection";
import MediaSection from "./components/MediaSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProductPage from "./domain/ProductPage";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import UserHome from "./domain/user/pages/Home";
import LocalTransferView from "./domain/user/pages/LocalTransferView";
import InternationalTransferView from "./domain/user/pages/InternationalTransferView";
import DepositView from "./domain/user/pages/DepositView";
import ProfileView from "./domain/user/pages/ProfileView";
import AdminHome from "./domain/admin/pages/Home";

function ProtectedRoute({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: "admin" | "user";
}) {
  const { isAuthenticated, role } = useSelector((s: RootState) => s.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role !== allowedRole) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "accounts",
        "loans",
        "services",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <AccountsSection />
      <LoansSection />
      <ServicesSection />
      <MediaSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/accounts/:slug" element={<ProductPage />} />
      <Route path="/loans/:slug" element={<ProductPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Portal */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute allowedRole="user">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<UserHome />} />
        <Route path="transfer" element={<LocalTransferView />} />
        <Route path="international-transfer" element={<InternationalTransferView />} />
        <Route path="deposit" element={<DepositView />} />
        <Route path="profile" element={<ProfileView />} />
      </Route>

      {/* Admin Portal */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<AdminHome />} />
      </Route>
    </Routes>
  );
}

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const step = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + Math.random() * step * 0.5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 300);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-[#0a2540] z-100 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        z-100
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Logo */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-[#13b5a3] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 13V8l7-5 7 5v5M2 13h14M5.5 13V9.5h7V13"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">
            American<span className="text-[#13b5a3]"> Credit</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Credit Union</p>
        </div>

        {/* Progress bar */}
        <div className="w-48 mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#13b5a3] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-3">
            {progress < 30
              ? "Loading resources..."
              : progress < 70
                ? "Preparing your experience..."
                : progress < 100
                  ? "Almost ready..."
                  : "Welcome!"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("splashScreenShown");
  });
  const handleFinish = useCallback(() => {
    sessionStorage.setItem("splashScreenShown", "true");
    setLoading(false);
  }, []);

  return (
    <Provider store={store}>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen key="splash" onFinish={handleFinish} />}
      </AnimatePresence>
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </motion.div>
      )}
    </Provider>
  );
}

export default App;
