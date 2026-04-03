import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDollarSign, FiPhone, FiMail, FiX } from "react-icons/fi";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("wire");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0a2540]">Deposit Funds</h1>
        <p className="text-sm text-gray-500">Add funds to your NovaTrust account</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00" required min="1"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Method</label>
            <div className="space-y-2">
              {[
                { value: "wire", label: "Wire Transfer" },
                { value: "bank", label: "Bank Deposit" },
                { value: "mobile", label: "Mobile Money" },
              ].map((opt) => (
                <label key={opt.value} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${method === opt.value ? "border-[#13b5a3] bg-[#e6f7f5]" : "border-gray-200 hover:bg-gray-50"}`}>
                  <input type="radio" name="method" value={opt.value} checked={method === opt.value} onChange={(e) => setMethod(e.target.value)}
                    className="accent-[#13b5a3]" />
                  <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-[#13b5a3] text-white py-3 rounded-lg font-semibold hover:bg-[#0f9e8f] transition-colors">
            Continue Deposit
          </button>
        </form>
      </div>

      {/* Contact Support Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#0a2540]">Contact Support</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                To complete your deposit of <strong>${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> via <strong>{method === "wire" ? "Wire Transfer" : method === "bank" ? "Bank Deposit" : "Mobile Money"}</strong>, please contact our customer care team.
              </p>
              <div className="space-y-3">
                <a href="mailto:support@novatrust.com" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiMail className="text-[#13b5a3]" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Email Support</div>
                    <div className="text-xs text-gray-500">support@novatrust.com</div>
                  </div>
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiPhone className="text-[#13b5a3]" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Call Us</div>
                    <div className="text-xs text-gray-500">+1 (555) 123-4567</div>
                  </div>
                </a>
              </div>
              <button onClick={() => setShowModal(false)} className="w-full mt-4 border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
