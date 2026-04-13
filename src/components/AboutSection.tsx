import { useReveal } from "../hooks/useReveal";

export default function AboutSection() {
  const leftRef = useReveal();
  const rightRef = useReveal();

  return (
    <section id="about" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div ref={leftRef} className="reveal-left">
            <h2 className="text-4xl font-bold text-[#0a2540] mb-6">
              About <span className="text-[#13b5a3]">NovaTrust</span>
            </h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              NovaTrust Credit Union has been serving our community with
              integrity and excellence for over 25 years. We believe in
              empowering our members to achieve their financial goals through
              personalized service and innovative solutions.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Founded on the principle of "People Helping People," we are
              committed to providing fair rates, transparent fees, and products
              designed with our members in mind.
            </p>

            {/* Mission & Values */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#0a2540] mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  To deliver exceptional financial services that enable our
                  members to succeed.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0a2540] mb-2">
                  Our Values
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Trust",
                    "Integrity",
                    "Innovation",
                    "Community",
                    "Excellence",
                  ].map((value) => (
                    <span
                      key={value}
                      className="bg-[#e6f7f5] text-[#0a2540] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#13b5a3] hover:text-white transition-colors duration-300 cursor-default"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Member Benefits */}
            <div className="bg-[#e6f7f5]/60 rounded-lg p-6 border border-[#13b5a3]/15">
              <h3 className="text-lg font-bold text-[#0a2540] mb-4">
                Member Benefits
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-[#13b5a3] font-bold mr-2">✓</span>{" "}
                  Competitive interest rates
                </li>
                <li className="flex items-center">
                  <span className="text-[#13b5a3] font-bold mr-2">✓</span> NCUA
                  insured up to $
                </li>
                <li className="flex items-center">
                  <span className="text-[#13b5a3] font-bold mr-2">✓</span>{" "}
                  Award-winning customer service
                </li>
                <li className="flex items-center">
                  <span className="text-[#13b5a3] font-bold mr-2">✓</span> No
                  hidden fees
                </li>
              </ul>
            </div>
          </div>

          {/* Right - Stats */}
          <div ref={rightRef} className="bg-[#0a2540] rounded-xl p-5 sm:p-6 md:p-8 text-white reveal-right">
            <div className="space-y-8">
              <div className="group">
                <div className="text-5xl font-bold mb-2 group-hover:text-[#13b5a3] transition-colors duration-300">25+</div>
                <p className="text-white/80 text-lg">
                  Years Serving Our Community
                </p>
              </div>
              <div className="border-t border-white/20 pt-8 group">
                <div className="text-5xl font-bold mb-2 group-hover:text-[#13b5a3] transition-colors duration-300">50K+</div>
                <p className="text-white/80 text-lg">Trusted Members</p>
              </div>
              <div className="border-t border-white/20 pt-8 group">
                <div className="text-5xl font-bold mb-2 group-hover:text-[#13b5a3] transition-colors duration-300">$B</div>
                <p className="text-white/80 text-lg">Assets Under Management</p>
              </div>
              <div className="border-t border-white/20 pt-8 text-center">
                <p className="text-white/80 italic text-lg">
                  "Your financial success is our success."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
