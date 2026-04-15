import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiDollarSign, FiPlus, FiCreditCard, FiArrowDown, FiArrowUp, FiCalendar } from "react-icons/fi";
import type { User, InitiateTransactionRequest } from "../types";

interface InitiateTransactionModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onInitiate: (userId: string, transactionData: InitiateTransactionRequest) => void;
  loading?: boolean;
}

export default function InitiateTransactionModal({ user, isOpen, onClose, onInitiate, loading }: InitiateTransactionModalProps) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<InitiateTransactionRequest>({
    status: "pending",
    amount: 0,
    type: "credit",
    description: "",
    date: today,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      onInitiate(user.id, formData);
    }
  };

  const handleInputChange = (field: keyof InitiateTransactionRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (!isOpen || !user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0a2540]">Initiate Transaction</h3>
              <p className="text-sm text-gray-500">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* User Balance Display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Current Balance</span>
              <span className="text-lg font-bold text-[#13b5a3]">
                {formatAmount(user.balance)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Account Number</span>
              <span className="text-sm font-mono text-gray-500">{user.accountNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Account Type</span>
              <span className="text-sm font-medium capitalize">{user.accountType}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiDollarSign className="inline mr-2 text-sm" />
                Amount ({formData.type === "credit" ? "Credit +" : "Debit −"})
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.amount === 0 ? "" : formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value === "" ? 0 : parseFloat(e.target.value))}
                  placeholder="0.00"
                  required
                  min="0.01"
                  step="0.01"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                    formData.type === "credit"
                      ? "border-gray-300 focus:ring-[#13b5a3] focus:border-[#13b5a3]"
                      : "border-gray-300 focus:ring-red-400 focus:border-red-400"
                  }`}
                />
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {formData.amount > 0 && (
                <div className={`mt-1 text-xs font-medium ${formData.type === "credit" ? "text-green-600" : "text-red-500"}`}>
                  {formData.type === "credit" ? "+" : "−"}{formatAmount(formData.amount)}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiCreditCard className="inline mr-2 text-sm" />
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleInputChange("type", "credit")}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.type === "credit"
                      ? "border-[#13b5a3] bg-[#e6f7f5] text-[#13b5a3]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FiArrowDown className="inline mr-2" />
                  Credit
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange("type", "debit")}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.type === "debit"
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FiArrowUp className="inline mr-2" />
                  Debit
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                required
              >
                <option value="pending">Pending</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiPlus className="inline mr-2 text-sm" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition resize-none"
                placeholder="Enter transaction description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiCalendar className="inline mr-2 text-sm" />
                Transaction Date
              </label>
              <input
                type="date"
                value={formData.date ?? ""}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
              />
            </div>

            {/* Transaction Preview */}
            {(formData.amount > 0 || formData.description) && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">Transaction Preview:</div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className={`text-sm font-medium ${
                    formData.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}>
                    {formData.type === "credit" ? "Credit +" : "Debit -"}{formatAmount(formData.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className="text-sm font-medium capitalize">{formData.status}</span>
                </div>
                {formData.date && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Date:</span>
                    <span className="text-sm font-medium">{formData.date}</span>
                  </div>
                )}
                {formData.description && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">Description:</span>
                    <p className="text-sm text-gray-800 mt-1">{formData.description}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || formData.amount <= 0}
                className="flex-1 px-4 py-2 bg-[#13b5a3] text-white rounded-lg text-sm font-medium hover:bg-[#0f9e8f] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Processing..." : "Initiate Transaction"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
