/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image3 from "../assets/eduardo-soares-utWyPB8_FU8-unsplash.jpg";

const GREEN = "#13b5a3";
const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: {
      color: "bg-white/10 border-white/20 text-white/85",
      dot: `bg-[${GREEN}]`,
      label: "Member-owned since 1974",
    },
    title: ["Banking built", "for ", "real life", " moments"],
    titleEm: "real life",
    desc: "Personalized financial solutions that grow with you — from your first savings account to your dream home.",
    cta: {
      primary: "Open Account",
      primaryStyle: `bg-[${GREEN}] hover:bg-opacity-90 text-white`,
      secondary: "Explore Products",
      secondaryModal: "explore",
    },
    stats: [
      { num: "$2.4B", lbl: "Assets" },
      { num: "98k+", lbl: "Members" },
      { num: "4.9★", lbl: "Rated" },
    ],
    loginBtn: `bg-[${GREEN}] hover:opacity-90`,
    accentLink: `text-[${GREEN}]`,
    enrollStyle: `bg-[${GREEN}}/10 border-[${GREEN}]/30`,
    enrollText: `text-[${GREEN}]`,
    mockup: "card",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: {
      color: "bg-white/10 border-white/20 text-white/85",
      dot: `bg-[${GREEN}]`,
      label: "Limited time offer",
    },
    title: ["Rates so low,", "you'll say ", "yes", " to that home"],
    titleEm: "yes",
    desc: "Fixed mortgage rates from 5.49% APR — locking in your future has never been more affordable.",
    cta: {
      primary: "Apply for Mortgage",
      primaryStyle: `bg-[${GREEN}] hover:bg-opacity-90 text-white`,
      secondary: "View All Rates",
      secondaryModal: "rates",
    },
    stats: [
      { num: "5.49%", lbl: "Mortgage APR" },
      { num: "30-yr", lbl: "Fixed term" },
      { num: "$0", lbl: "App fee" },
    ],
    loginBtn: `bg-[${GREEN}] hover:opacity-90`,
    accentLink: `text-[${GREEN}]`,
    enrollStyle: `bg-[${GREEN}]/10 border-[${GREEN}]/30`,
    enrollText: `text-[${GREEN}]`,
    mockup: "rate",
  },
  {
    id: 3,
    image: Image3,
    badge: {
      color: "bg-white/10 border-white/20 text-white/85",
      dot: `bg-[${GREEN}]`,
      label: "Financial Growth Plans",
    },
    title: ["Invest in your", "financial ", "future", " with confidence"],
    titleEm: "future",
    desc: "Build wealth with personalized investment strategies, competitive returns, and expert guidance at every step.",
    cta: {
      primary: "Start Investing",
      primaryStyle: `bg-[${GREEN}] hover:bg-opacity-90 text-white`,
      secondary: "View Portfolio Options",
      secondaryModal: "portfolio",
    },
    stats: [
      { num: "7.2%", lbl: "Avg. Return" },
      { num: "500k+", lbl: "Accounts" },
      { num: "$50B", lbl: "Assets Managed" },
    ],
    loginBtn: `bg-[${GREEN}] hover:opacity-90`,
    accentLink: `text-[${GREEN}]`,
    enrollStyle: `bg-[${GREEN}]/10 border-[${GREEN}]/30`,
    enrollText: `text-[${GREEN}]`,
    mockup: "none",
  },
];

function LoginPanel() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the actual login page
    navigate("/login");
  };

  return (
    <div className="hidden lg:flex w-72 lg:w-80 xl:w-84 shrink-0 bg-white/97 rounded-xl p-5 lg:p-7 flex-col gap-4 border border-white/20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: GREEN }}
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 18 18">
            <path
              d="M2 13V8l7-5 7 5v5M2 13h14M5.5 13V9.5h7V13"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <span className="font-serif text-lg text-[#0a2540] font-medium">
          American Credit
        </span>
      </div>

      {/* Heading */}
      <div>
        <p className="text-[15px] font-medium text-[#0a2540]">
          Online Banking Login
        </p>
        <p className="text-[12px] text-[#8ea3bc] mt-0.5">
          Secure member access
        </p>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4 text-sm">
          Ready to access your account?
        </p>
        <button
          onClick={handleLogin}
          className="w-full text-white py-3 rounded-lg text-sm font-medium tracking-wide transition-all hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: GREEN }}
        >
          Go to Login Page
        </button>
      </div>

      <div className="flex justify-end -mt-1">
        <a
          href="/register"
          className="text-[12px] font-medium transition-colors hover:text-[#0a2540]"
          style={{ color: GREEN }}
        >
          Create Account
        </a>
      </div>

      <div className="h-px bg-[#edf0f7]" />

      <div
        onClick={() => navigate("/register")}
        className="border-dashed border-[1.5px] rounded-lg p-3 text-center cursor-pointer hover:opacity-90 transition-opacity"
        style={{
          backgroundColor: `rgb(19, 181, 163, 0.1)`,
          borderColor: `rgb(19, 181, 163, 0.3)`,
        }}
      >
        <p className="text-[12px] font-medium" style={{ color: GREEN }}>
          New to American Credit? Create your account
        </p>
        <p className="text-[11px] text-[#8ea3bc] mt-0.5">
          Join thousands of satisfied customers
        </p>
      </div>
    </div>
  );
}

function CardMockup() {
  return (
    <div
      className="absolute right-10 bottom-12 z-10 rounded-2xl p-4 w-55 animate-floatUp"
      style={{ backgroundColor: GREEN }}
    >
      <div className="w-7 h-5 bg-[#e8b84b] rounded mb-3" />
      <div className="text-[13px] tracking-widest text-white/85 font-mono mb-3">
        •••• •••• •••• 4291
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-[11px] text-white/70 uppercase tracking-wider">
            Nova Debit
          </div>
          <div className="text-[12px] text-white/90 mt-0.5">$3,842.50</div>
        </div>
        <div className="text-[10px] text-white/50 text-right">
          VALID
          <br />
          09/27
        </div>
      </div>
    </div>
  );
}

function NotifBubble() {
  return (
    <div className="absolute left-14 bottom-14 z-10 bg-white rounded-xl px-4 py-3 flex items-center gap-2.5 animate-floatUp">
      <div className="w-8 h-8 bg-[#e8f8f5] rounded-full flex items-center justify-center shrink-0">
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1a9e8f"
          strokeWidth="2.5"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div>
        <div className="text-[12px] font-medium text-[#0a2540]">
          Transfer complete
        </div>
        <div className="text-[11px] text-[#1a9e8f] font-semibold">
          + $1,200.00 received
        </div>
        <div className="text-[10px] text-[#b0bdd6]">Just now</div>
      </div>
    </div>
  );
}

function RateMockup() {
  return (
    <div
      className="absolute left-14 bottom-12 z-10 rounded-xl px-5 py-3.5 animate-floatUp"
      style={{ backgroundColor: GREEN }}
    >
      <div className="text-[11px] text-white/60 uppercase tracking-widest">
        Today's rate
      </div>
      <div className="text-[28px] font-serif text-[#e8b84b] my-1">
        5.49% <span className="text-[14px] text-white/60">APR</span>
      </div>
      <div className="text-[11px] text-white/50">
        30-Year Fixed • Updated today
      </div>
    </div>
  );
}

function AppMockup() {
  return (
    <div className="absolute left-14 bottom-11 z-10 animate-floatUp">
      <div
        className="border rounded-xl px-4 py-3 flex items-center gap-3"
        style={{ backgroundColor: GREEN }}
      >
        <div
          className="w-9 h-9 flex items-center justify-center shrink-0 rounded-lg"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18" />
          </svg>
        </div>
        <div>
          <div className="text-[12px] text-white font-medium">
            Get the mobile app
          </div>
          <h1 className="text-3xl font-bold text-white">
            American<span className="text-[#13b5a3]"> Credit</span>
          </h1>
          <div className="text-[11px] text-white/50">
            Available free on all devices
          </div>
        </div>
      </div>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b flex items-center justify-between p-6">
          <h2
            className="text-2xl font-serif font-normal"
            style={{ color: "#0a2540" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const goTo = (n: number) => {
    setCurrent(n);
  };

  const move = (d: number) => {
    goTo((current + d + slides.length) % slides.length);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => move(1), 4000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  const slide = slides[current];

  const modalContents = {
    explore: {
      title: "Explore Our Products",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-lg border"
              style={{ borderColor: GREEN }}
            >
              <h3
                className="font-serif text-xl font-normal mb-3"
                style={{ color: GREEN }}
              >
                Checking Accounts
              </h3>
              <p className="text-gray-600 mb-4">
                Free checking with no minimum balance requirements. Enjoy
                unlimited transactions, online bill pay, and mobile access.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Zero monthly fees</li>
                <li>✓ ATM fee reimbursements</li>
                <li>✓ Digital wallet support</li>
              </ul>
            </div>
            <div
              className="p-6 rounded-lg border"
              style={{ borderColor: GREEN }}
            >
              <h3
                className="font-serif text-xl font-normal mb-3"
                style={{ color: GREEN }}
              >
                Savings Accounts
              </h3>
              <p className="text-gray-600 mb-4">
                Competitive savings rates to help your money grow. FDIC insured
                up to $250,000.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ 4.5% APY</li>
                <li>✓ No monthly fees</li>
                <li>✓ Easy online access</li>
              </ul>
            </div>
            <div
              className="p-6 rounded-lg border"
              style={{ borderColor: GREEN }}
            >
              <h3
                className="font-serif text-xl font-normal mb-3"
                style={{ color: GREEN }}
              >
                Money Market Accounts
              </h3>
              <p className="text-gray-600 mb-4">
                Higher earnings potential with check-writing privileges and
                flexible withdrawal options.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Tiered interest rates</li>
                <li>✓ Check writing</li>
                <li>✓ Minimum $2,500 to open</li>
              </ul>
            </div>
            <div
              className="p-6 rounded-lg border"
              style={{ borderColor: GREEN }}
            >
              <h3
                className="font-serif text-xl font-normal mb-3"
                style={{ color: GREEN }}
              >
                Certificates of Deposit
              </h3>
              <p className="text-gray-600 mb-4">
                Lock in guaranteed rates. Choose from 3-month to 5-year terms.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Guaranteed returns</li>
                <li>✓ Up to 5.25% APY</li>
                <li>✓ FDIC insured</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    rates: {
      title: "Current Mortgage Rates",
      content: (
        <div className="space-y-6">
          <p className="text-gray-600 mb-6">
            Our competitive rates are updated daily and designed to help you
            achieve your homeownership dreams.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                term: "15-Year Fixed",
                rate: "4.99%",
                points: "0.5",
                discount: "$0",
              },
              {
                term: "20-Year Fixed",
                rate: "5.24%",
                points: "0.5",
                discount: "$0",
              },
              {
                term: "30-Year Fixed",
                rate: "5.49%",
                points: "0.5",
                discount: "$0",
              },
              { term: "7/1 ARM", rate: "4.75%", points: "0.5", discount: "$0" },
            ].map((item) => (
              <div
                key={item.term}
                className="p-4 border rounded-lg"
                style={{ borderColor: GREEN }}
              >
                <h4 className="font-semibold mb-3" style={{ color: GREEN }}>
                  {item.term}
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>APR:</span>
                    <span className="font-semibold" style={{ color: GREEN }}>
                      {item.rate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points:</span>
                    <span>{item.points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>App Fee:</span>
                    <span>{item.discount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="bg-blue-50 p-4 rounded-lg border-l-4"
            style={{ borderColor: GREEN }}
          >
            <p className="text-sm text-gray-600">
              Rates vary by loan amount, credit score, and property type.
              Contact us for a personalized quote.
            </p>
          </div>
        </div>
      ),
    },
    portfolio: {
      title: "Investment Portfolio Options",
      content: (
        <div className="space-y-6">
          <p className="text-gray-600 mb-6">
            Choose from our carefully curated portfolio options designed to
            match your goals and risk tolerance.
          </p>
          <div className="space-y-4">
            {[
              {
                name: "Conservative Growth",
                desc: "Bonds and stable dividend stocks",
                allocation: "80% Bonds, 20% Stocks",
                return: "3.8% avg annual return",
              },
              {
                name: "Balanced Portfolio",
                desc: "Mixed stocks and bonds for steady growth",
                allocation: "50% Bonds, 50% Stocks",
                return: "5.2% avg annual return",
              },
              {
                name: "Growth Portfolio",
                desc: "Primarily stocks with growth potential",
                allocation: "20% Bonds, 80% Stocks",
                return: "7.8% avg annual return",
              },
              {
                name: "Aggressive Growth",
                desc: "High-growth stocks and emerging markets",
                allocation: "5% Bonds, 95% Stocks",
                return: "10.5% avg annual return",
              },
            ].map((portfolio) => (
              <div
                key={portfolio.name}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                style={{ borderColor: GREEN }}
              >
                <h4 className="font-semibold mb-2" style={{ color: GREEN }}>
                  {portfolio.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{portfolio.desc}</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Allocation:</span>
                    <p className="font-medium text-gray-700">
                      {portfolio.allocation}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Avg Return:</span>
                    <p className="font-medium" style={{ color: GREEN }}>
                      {portfolio.return}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
        .font-sans-custom { font-family: 'DM Sans', sans-serif; }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1);   }
          50%      { opacity: 0.6; transform: scale(1.3); }
        }
        .animate-floatUp { animation: floatUp 0.6s ease 0.6s both; }
        .badge-dot       { animation: pulse 2s infinite; }
      `}</style>

      <div
        className="w-full font-sans-custom mt-20 md:mt-21"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* HERO WRAPPER */}
        <div
          className="relative overflow-hidden rounded-2xl transition-all duration-700"
          style={{
            minHeight: "clamp(400px, 70vh, 540px)",
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          />
          {/* Slide content */}
          <div
            className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-10 gap-8 lg:gap-12"
            style={{
              paddingTop: "clamp(24px, 5vw, 48px)",
              paddingBottom: "clamp(24px, 5vw, 48px)",
              minHeight: "clamp(400px, 70vh, 540px)",
            }}
          >
            {/* Left */}
            <div className="flex-1 flex flex-col gap-5 text-white">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 border rounded-full px-3.5 py-1.5 text-[12px] uppercase tracking-widest w-fit ${slide.badge.color}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full badge-dot`}
                  style={{ backgroundColor: GREEN }}
                />
                {slide.badge.label}
              </div>

              {/* Title */}
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[42px] leading-tight font-normal">
                {slide.title[0]}
                <br />
                {slide.title[1]}
                <em className="italic" style={{ color: GREEN }}>
                  {slide.title[2]}
                </em>
                {slide.title[3]}
              </h1>

              <p className="text-[15px] text-white/72 leading-relaxed max-w-xl">
                {slide.desc}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-7 py-3 rounded-lg text-[14px] font-medium tracking-wide transition-all hover:opacity-90 text-white cursor-pointer"
                  style={{ backgroundColor: GREEN }}
                >
                  Login
                </button>
                <button
                  onClick={() =>
                    setActiveModal(slide.cta.secondaryModal || null)
                  }
                  className="px-7 py-3 rounded-lg text-[14px] font-medium tracking-wide transition-all text-white border-[1.5px] border-white/40 hover:border-white/80 hover:bg-white/8"
                >
                  {slide.cta.secondary}
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-4 sm:gap-6 text-white">
                {slide.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-xl sm:text-2xl font-bold">
                      {stat.num}
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      {stat.lbl}
                    </div>
                  </div>
                ))}
              </div>


            </div>

            {/* Login Panel */}
            <LoginPanel />
          </div>

          {/* Slide-specific mockups (hidden on mobile) */}
          <div className="hidden lg:block">
            {slide.mockup === "card" && (
              <>
                <CardMockup />
                <NotifBubble />
              </>
            )}
            {slide.mockup === "rate" && <RateMockup />}
            {slide.mockup === "app" && <AppMockup />}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-2 bg-white/30"}`}
                style={{ height: "8px" }}
              />
            ))}
          </div>

          {/* Navigation arrows (hidden on small screens) */}
          <button
            onClick={() => move(-1)}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full items-center justify-center hover:bg-white/22 transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => move(1)}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full items-center justify-center hover:bg-white/22 transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <Modal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          title={
            modalContents[activeModal as keyof typeof modalContents]?.title ||
            ""
          }
          children={
            modalContents[activeModal as keyof typeof modalContents]?.content
          }
        />
      )}
    </>
  );
}
