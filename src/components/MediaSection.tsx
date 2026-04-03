import { FiPlay } from "react-icons/fi";

export default function MediaSection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose NovaTrust?
          </h2>
          <p className="text-xl text-gray-300">
            See what makes us different from other financial institutions.
          </p>
        </div>

        {/* Video/Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Main Video */}
          <div className="relative group">
            <div className="bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl aspect-video flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="text-center">
                <FiPlay className="text-7xl mb-4 mx-auto text-white" />
                <p className="text-2xl font-bold">How We Serve You</p>
                <p className="text-blue-100 mt-2">[Video Placeholder]</p>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
            </div>
          </div>

          {/* Gallery/Stats */}
          <div className="space-y-4">
            <div className="bg-blue-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-blue-200 mb-2">50K+</div>
              <p className="text-lg">Satisfied Members Nationwide</p>
            </div>
            <div className="bg-blue-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-blue-200 mb-2">$2.5B</div>
              <p className="text-lg">Assets Under Management</p>
            </div>
            <div className="bg-blue-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-blue-200 mb-2">25+</div>
              <p className="text-lg">Years of Trusted Service</p>
            </div>
          </div>
        </div>

        {/* Image Carousel Placeholder */}
        <div className="bg-blue-800 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Our Community</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Team Success", "Member Stories", "Community Impact"].map(
              (title, i) => (
                <div
                  key={i}
                  className="bg-blue-700 rounded-xl aspect-square flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="font-semibold">{title}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
