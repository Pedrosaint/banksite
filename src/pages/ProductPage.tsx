import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiChevronRight,
  FiFileText,
  FiPhone,
} from "react-icons/fi";
import { getProductBySlug, getProductsByCategory } from "../data/products";
import type { Product } from "../data/products";
import { useReveal } from "../hooks/useReveal";

function SidebarNav({
  currentSlug,
  category,
}: {
  currentSlug: string;
  category: "accounts" | "loans";
}) {
  const siblings = getProductsByCategory(category);
  const categoryLabel = category === "accounts" ? "Accounts" : "Loans & Rates";

  return (
    <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden lg:sticky lg:top-16">
      <div className="bg-[#0a2540] px-6 py-4">
        <h3 className="text-white font-bold text-lg">{categoryLabel}</h3>
      </div>
      <ul className="py-2">
        {siblings.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/${category}/${p.slug}`}
              className={`flex items-center px-6 py-3 text-sm transition-all duration-200 ${
                currentSlug === p.slug
                  ? "bg-[#e6f7f5] text-[#13b5a3] font-semibold border-l-4 border-[#13b5a3]"
                  : "text-gray-700 hover:bg-gray-50 hover:text-[#13b5a3] border-l-4 border-transparent"
              }`}
            >
              <FiChevronRight
                className={`mr-2 text-xs ${currentSlug === p.slug ? "text-[#13b5a3]" : "text-gray-400"}`}
              />
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-6 py-4 border-t border-gray-100">
        <Link
          to="/"
          className="flex items-center text-sm text-gray-500 hover:text-[#13b5a3] transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
    </nav>
  );
}

function HeroBanner({ product }: { product: Product }) {
  return (
    <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
      <img
        src={product.heroImage}
        alt={product.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#0a2540]/70" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <nav className="flex items-center text-sm text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <FiChevronRight className="mx-2 text-xs" />
            <Link
              to={`/#${product.category}`}
              className="hover:text-white transition-colors capitalize"
            >
              {product.category === "accounts" ? "Accounts" : "Loans & Rates"}
            </Link>
            <FiChevronRight className="mx-2 text-xs" />
            <span className="text-white">{product.title}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3">
            {product.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl">
            {product.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || "");

  const contentRef = useReveal();
  const featuresRef = useReveal();
  const ratesRef = useReveal();
  const ctaRef = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0a2540] mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#13b5a3] text-white px-6 py-3 rounded-lg hover:bg-[#0f9e8f] transition-all duration-300 btn-glow"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-[#0a2540] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-[#13b5a3] transition-colors"
          >
            <FiArrowLeft />
            <span className="font-bold text-lg">
              Nova<span className="text-[#13b5a3]">Trust</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+15551234567"
              className="flex items-center gap-1 hover:text-[#13b5a3] transition-colors"
            >
              <FiPhone className="text-xs" />
              (555) 123-4567
            </a>
            <Link
              to="/"
              className="bg-[#13b5a3] px-4 py-1.5 rounded-lg hover:bg-[#0f9e8f] transition-colors text-sm font-medium"
            >
              Online Banking
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <HeroBanner product={product} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <SidebarNav
              currentSlug={product.slug}
              category={product.category}
            />

            {/* Contact Card */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-bold text-[#0a2540] mb-3">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Our team is ready to answer your questions and help you get
                started.
              </p>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2 text-[#13b5a3] font-semibold text-sm hover:text-[#0f9e8f] transition-colors"
              >
                <FiPhone />
                (555) 123-4567
              </a>
              <p className="text-xs text-gray-500 mt-2">
                Mon-Fri 8am-6pm EST
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-10">
            {/* Description */}
            <div ref={contentRef} className="reveal">
              <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 md:p-8">
                {product.description.map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div ref={featuresRef} className="reveal">
              <h2 className="text-2xl font-bold text-[#0a2540] mb-6">
                Features & Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {product.features.map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover-lift group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#e6f7f5] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#13b5a3] transition-colors duration-300">
                        <FiCheck className="text-[#13b5a3] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0a2540] mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rates Table */}
            {product.rates && (
              <div ref={ratesRef} className="reveal">
                <h2 className="text-2xl font-bold text-[#0a2540] mb-6">
                  Current Rates
                </h2>
                <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
                  <table className="w-full min-w-100">
                    <thead>
                      <tr className="bg-[#0a2540]">
                        <th className="px-6 py-4 text-left text-white font-semibold">
                          {product.category === "loans"
                            ? "Loan Type / Term"
                            : "Balance Tier"}
                        </th>
                        <th className="px-6 py-4 text-left text-white font-semibold">
                          Rate
                        </th>
                        {product.rates.some((r) => r.note) && (
                          <th className="px-6 py-4 text-left text-white font-semibold hidden md:table-cell">
                            Details
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {product.rates.map((rate, i) => (
                        <tr
                          key={i}
                          className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-[#e6f7f5] transition-colors duration-200`}
                        >
                          <td className="px-6 py-4 text-gray-800 font-medium">
                            {rate.label}
                          </td>
                          <td className="px-6 py-4 text-[#13b5a3] font-bold text-lg">
                            {rate.value}
                          </td>
                          {product.rates!.some((r) => r.note) && (
                            <td className="px-6 py-4 text-gray-500 text-sm hidden md:table-cell">
                              {rate.note || "—"}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      * Rates are subject to change and may vary based on
                      creditworthiness and other factors. APR = Annual Percentage
                      Rate. APY = Annual Percentage Yield.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-[#0a2540] text-lg mb-4">
                  What You Get
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#13b5a3] font-bold mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {product.requirements && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-[#0a2540] text-lg mb-4">
                    What You'll Need
                  </h3>
                  <ul className="space-y-3">
                    {product.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FiFileText className="text-[#13b5a3] mt-0.5 shrink-0" />
                        <span className="text-gray-700 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div ref={ctaRef} className="reveal-scale">
              <div className="bg-[#0a2540] rounded-xl p-6 sm:p-8 md:p-10 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Ready to Get Started?
                </h2>
                <p className="text-white/80 mb-6 max-w-xl mx-auto">
                  {product.category === "accounts"
                    ? "Open your account today and start enjoying all the benefits NovaTrust has to offer."
                    : "Apply now and get a decision fast. Our team is here to guide you every step of the way."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[#13b5a3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0f9e8f] transition-all duration-300">
                    {product.ctaLabel}
                  </button>
                  {product.ctaSecondaryLabel && (
                    <button className="border-2 border-white/40 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 hover:border-white transition-all duration-300">
                      {product.ctaSecondaryLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0a2540] text-gray-400 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2025 NovaTrust Credit Union. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-[#13b5a3] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-[#13b5a3] transition-colors"
            >
              Terms of Service
            </a>
            <Link
              to="/"
              className="hover:text-[#13b5a3] transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
