import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiCalendar,
  FiDatabase,
  FiRefreshCw,
  FiInfo,
  FiUser,
  FiDollarSign,
} from "react-icons/fi";
import type { User, GenerateTransactionsRequest } from "../types";

interface GenerateTransactionsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (
    userId: string,
    transactionData: GenerateTransactionsRequest,
  ) => void;
  loading?: boolean;
}

export default function GenerateTransactionsModal({
  user,
  isOpen,
  onClose,
  onGenerate,
  loading,
}: GenerateTransactionsModalProps) {
  const [formData, setFormData] = useState<GenerateTransactionsRequest>({
    fromDate: "",
    toDate: "",
    count: 10,
    minAmount: 10,
    maxAmount: 5000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      onGenerate(user.id, formData);
    }
  };

  const handleInputChange = (
    field: keyof GenerateTransactionsRequest,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDateForInput = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const today = new Date();
  const defaultFromDate = new Date(today.getFullYear(), 0, 1);
  const defaultToDate = new Date(today.getFullYear(), 11, 31);

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
          className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0a2540]">
                Generate Transactions
              </h3>
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

          {/* User Info Display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#13b5a3] rounded-full flex items-center justify-center">
                <FiUser className="text-white text-lg" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-sm text-gray-500">
                  Account: {user.accountNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Current Balance</span>
              <span className="font-bold text-[#13b5a3]">
                $
                {user.balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          {/* Info Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <FiInfo className="text-blue-500 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 mb-1">
                  Generate Dummy Transactions:
                </p>
                <ul className="text-blue-700 space-y-1">
                  <li>· Creates random transactions for testing</li>
                  <li>· Transactions will appear in user history</li>
                  <li>· Use for development/demo purposes only</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiCalendar className="inline mr-2 text-sm" />
                From Date
              </label>
              <input
                type="date"
                value={formData.fromDate}
                onChange={(e) => handleInputChange("fromDate", e.target.value)}
                max={formatDateForInput(today.toISOString())}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiCalendar className="inline mr-2 text-sm" />
                To Date
              </label>
              <input
                type="date"
                value={formData.toDate}
                onChange={(e) => handleInputChange("toDate", e.target.value)}
                max={formatDateForInput(today.toISOString())}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiDatabase className="inline mr-2 text-sm" />
                Number of Transactions
              </label>
              <input
                type="number"
                value={formData.count === 0 ? "" : formData.count}
                onChange={(e) =>
                  handleInputChange("count", e.target.value === "" ? 0 : parseInt(e.target.value))
                }
                min="1"
                max="100"
                placeholder="Enter number of transactions"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Generate between 1 and 100 transactions
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiDollarSign className="inline mr-1 text-sm" />
                  Min Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.minAmount === 0 ? "" : formData.minAmount}
                    onChange={(e) =>
                      handleInputChange("minAmount", e.target.value === "" ? 0 : parseFloat(e.target.value))
                    }
                    min="0.01"
                    step="0.01"
                    placeholder="10.00"
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiDollarSign className="inline mr-1 text-sm" />
                  Max Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.maxAmount === 0 ? "" : formData.maxAmount}
                    onChange={(e) =>
                      handleInputChange("maxAmount", e.target.value === "" ? 0 : parseFloat(e.target.value))
                    }
                    min="0.01"
                    step="0.01"
                    placeholder="5000.00"
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                </div>
              </div>
            </div>

            {/* Quick Options */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Quick Options:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      fromDate: formatDateForInput(defaultFromDate.toISOString()),
                      toDate: formatDateForInput(defaultToDate.toISOString()),
                      count: 10,
                      minAmount: 10,
                      maxAmount: 5000,
                    });
                  }}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                >
                  This Year (10)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      fromDate: formatDateForInput(defaultFromDate.toISOString()),
                      toDate: formatDateForInput(defaultToDate.toISOString()),
                      count: 25,
                      minAmount: 10,
                      maxAmount: 5000,
                    });
                  }}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                >
                  This Year (25)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                    setFormData({
                      fromDate: formatDateForInput(lastMonth.toISOString()),
                      toDate: formatDateForInput(endOfLastMonth.toISOString()),
                      count: 15,
                      minAmount: 10,
                      maxAmount: 5000,
                    });
                  }}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                >
                  Last Month (15)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
                    setFormData({
                      fromDate: formatDateForInput(sixMonthsAgo.toISOString()),
                      toDate: formatDateForInput(today.toISOString()),
                      count: 50,
                      minAmount: 10,
                      maxAmount: 5000,
                    });
                  }}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                >
                  Last 6 Months (50)
                </button>
              </div>
            </div>

            {/* Preview */}
            {(formData.fromDate || formData.toDate || formData.count > 0) && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Generation Preview:
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium">{formData.fromDate || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">{formData.toDate || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Count:</span>
                    <span className="font-medium">{formData.count} transactions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount range:</span>
                    <span className="font-medium">
                      ${formData.minAmount.toLocaleString()} – ${formData.maxAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-60 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  loading ||
                  !formData.fromDate ||
                  !formData.toDate ||
                  formData.count <= 0 ||
                  formData.minAmount <= 0 ||
                  formData.maxAmount <= 0 ||
                  formData.minAmount > formData.maxAmount
                }
                className="flex-1 px-4 py-2 bg-[#13b5a3] text-white rounded-lg text-sm font-medium hover:bg-[#0f9e8f] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FiRefreshCw />
                    Generate Transactions
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
