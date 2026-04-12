export default function LoginPanel() {
  return (
    <section className="bg-white py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Access your accounts anytime, anywhere with our secure online
              banking platform.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">24/7 Account Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">Real-time Transactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">Bank Securely Online</span>
              </div>
            </div>
          </div>

          {/* Right - Login Form (x2) */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Existing Member */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">
                  Member Login
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300 font-semibold cursor-pointer">
                    Login
                  </button>
                </div>
              </div>

              {/* New Member */}
              <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">
                  New to Us?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of members who trust NovaTrust Credit Union.
                  Enroll in Online Banking today.
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold cursor-pointer">
                    Enroll Now
                  </button>
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-100 transition duration-300 font-semibold cursor-pointer">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
