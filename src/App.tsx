import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ProductPage from "./pages/ProductPage";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accounts/:slug" element={<ProductPage />} />
        <Route path="/loans/:slug" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
