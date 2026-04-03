import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Contact us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-8">
              Contact Information
            </h3>

            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <FiMapPin className="text-3xl mr-4 text-blue-900 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Main Office
                  </h4>
                  <p className="text-gray-600">
                    123 Financial Boulevard
                    <br />
                    Riverside, OH 45202
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FiPhone className="text-3xl mr-4 text-blue-900 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Phone
                  </h4>
                  <p className="text-gray-600">
                    <a
                      href="tel:+15551234567"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      +1 (555) 123-4567
                    </a>
                    <br />
                    Mon-Fri, 8am-6pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FiMail className="text-3xl mr-4 text-blue-900 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Email
                  </h4>
                  <p className="text-gray-600">
                    <a
                      href="mailto:support@novatrust.com"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      support@novatrust.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FiClock className="text-3xl mr-4 text-blue-900 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Business Hours
                  </h4>
                  <p className="text-gray-600">
                    Mon-Fri: 8:00 AM - 6:00 PM
                    <br />
                    Sat: 9:00 AM - 2:00 PM
                    <br />
                    Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
                <p className="text-green-800 font-semibold">
                  ✓ Thank you! We'll be in touch soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300 font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
