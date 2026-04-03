import { useState } from "react";
import { FiPlay, FiX } from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";

export default function MediaSection() {
  const titleRef = useReveal();
  const contentRef = useReveal();
  const communityRef = useReveal();
  const [videoOpen, setVideoOpen] = useState(false);

  const communityImages = [
    {
      title: "Financial Education",
      subtitle: "Free workshops helping members build wealth",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Member Success",
      subtitle: "Helping families achieve homeownership",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Community Outreach",
      subtitle: "Supporting local businesses and charities",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <>
      <section className="py-20 bg-[#0a2540] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div
            ref={titleRef}
            className="max-w-3xl mx-auto text-center mb-16 reveal"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-[#13b5a3]">NovaTrust</span>?
            </h2>
            <p className="text-xl text-gray-300">
              See what makes us different from other financial institutions.
            </p>
          </div>

          {/* Video/Media Grid */}
          <div
            ref={contentRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 reveal"
          >
            {/* Main Video Thumbnail */}
            <div
              className="relative group cursor-pointer"
              onClick={() => setVideoOpen(true)}
            >
              <div className="rounded-2xl aspect-video overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Banking services and financial planning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0a2540]/50 group-hover:bg-[#0a2540]/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-[#13b5a3] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                    <FiPlay className="text-3xl text-white ml-1" />
                  </div>
                  <p className="text-2xl font-bold">How We Serve You</p>
                  <p className="text-white/70 mt-1 text-sm">
                    Watch our story — 2 min
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery/Stats */}
            <div className="space-y-4">
              <div className="bg-[#13b5a3]/10 rounded-xl p-6 border border-[#13b5a3]/20 hover:border-[#13b5a3]/40 transition-colors duration-300">
                <div className="text-4xl font-bold text-[#13b5a3] mb-2">
                  50K+
                </div>
                <p className="text-lg text-gray-200">
                  Satisfied Members Nationwide
                </p>
              </div>
              <div className="bg-[#13b5a3]/10 rounded-xl p-6 border border-[#13b5a3]/20 hover:border-[#13b5a3]/40 transition-colors duration-300">
                <div className="text-4xl font-bold text-[#13b5a3] mb-2">
                  $2.5B
                </div>
                <p className="text-lg text-gray-200">
                  Assets Under Management
                </p>
              </div>
              <div className="bg-[#13b5a3]/10 rounded-xl p-6 border border-[#13b5a3]/20 hover:border-[#13b5a3]/40 transition-colors duration-300">
                <div className="text-4xl font-bold text-[#13b5a3] mb-2">
                  25+
                </div>
                <p className="text-lg text-gray-200">
                  Years of Trusted Service
                </p>
              </div>
            </div>
          </div>

          {/* Our Community */}
          <div
            ref={communityRef}
            className="bg-[#13b5a3]/10 border border-[#13b5a3]/20 rounded-2xl p-8 md:p-12 reveal-scale"
          >
            <h3 className="text-2xl font-bold mb-2 text-center">
              Our Community
            </h3>
            <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              We're more than a credit union — we're your neighbors, investing in the communities we serve.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityImages.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden group relative aspect-[4/3]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0a2540]/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-bold text-lg">{item.title}</p>
                    <p className="text-sm text-white/70 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#13b5a3] transition-colors"
            >
              <FiX className="text-3xl" />
            </button>
            <iframe
              className="w-full h-full rounded-2xl"
              src="https://www.youtube.com/embed/Ys3KxEv0Cno?autoplay=1"
              title="NovaTrust - Banking Services"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
