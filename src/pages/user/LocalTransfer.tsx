import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheckCircle, FiX } from "react-icons/fi";

export default function LocalTransfer() {
  const [form, setForm] = useState({
    accountName: "", accountNumber: "", bankName: "", bankAddress: "",
    country: "", currency: "USD", swiftCode: "", iban: "", amount: "", description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0a2540]">Local Transfer</h1>
        <p className="text-sm text-gray-500">Transfer funds within the same country. Processing time: <strong>24 hours</strong></p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["accountName", "Beneficiary Name", "text", "John Smith"],
              ["accountNumber", "Account Number", "text", "0123456789"],
              ["bankName", "Bank Name", "text", "First National Bank"],
              ["bankAddress", "Bank Address", "text", "123 Bank St"],
              ["country", "Country", "text", "United States"],
              ["currency", "Currency", "text", "USD"],
              ["swiftCode", "SWIFT Code", "text", "FNBAUS33"],
              ["iban", "IBAN Number", "text", "US12345678901234"],
            ].map(([key, label, type, placeholder]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={placeholder}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => update("amount", e.target.value)}
              placeholder="0.00"
              required
              min="1"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Transfer description..."
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#13b5a3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0f9e8f] transition-colors disabled:opacity-60"
          >
            <FiSend /> {loading ? "Processing..." : "Send Transfer"}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
              <button onClick={() => setSuccess(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><FiX /></button>
              <FiCheckCircle className="text-[#13b5a3] text-5xl mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#0a2540] mb-2">Transfer Submitted</h3>
              <p className="text-sm text-gray-500">Your transfer is being processed and will be completed within 24 hours.</p>
              <button onClick={() => setSuccess(false)} className="mt-4 bg-[#13b5a3] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#0f9e8f] transition-colors">
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
