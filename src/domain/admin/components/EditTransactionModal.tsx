import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiEdit2, FiFileText } from "react-icons/fi";
import type { Transaction, UpdateTransactionRequest } from "../types";

interface EditTransactionModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (
    transactionId: string,
    transactionData: UpdateTransactionRequest,
  ) => void;
  loading?: boolean;
}

export default function EditTransactionModal({
  transaction,
  isOpen,
  onClose,
  onUpdate,
  loading,
}: EditTransactionModalProps) {
  const [formData, setFormData] = useState<UpdateTransactionRequest>({
    status: transaction?.status || "",
    description: transaction?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transaction) {
      onUpdate(transaction.id, formData);
    }
  };

  const handleInputChange = (
    field: keyof UpdateTransactionRequest,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      success: "text-green-600 bg-green-50 border-green-200",
      pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
      failed: "text-red-600 bg-red-50 border-red-200",
      completed: "text-blue-600 bg-blue-50 border-blue-200",
    };
    return colors[status] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (!isOpen || !transaction) return null;

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
            <h3 className="text-lg font-bold text-[#0a2540]">
              Edit Transaction
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Transaction Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Transaction ID</span>
              <span className="text-xs font-mono text-gray-500">
                {transaction.id}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Type</span>
              <span className="text-sm font-medium capitalize">
                {transaction.type}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm font-bold text-[#13b5a3]">
                {formatAmount(transaction.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Date</span>
              <span className="text-sm text-gray-600">
                {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiFileText className="inline mr-2 text-sm" />
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                required
              >
                <option value="">Select status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiEdit2 className="inline mr-2 text-sm" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition resize-none"
                placeholder="Enter transaction description"
                required
              />
            </div>

            {/* Status Preview */}
            {formData.status && (
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status Preview:</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(formData.status)}`}
                  >
                    {formData.status}
                  </span>
                </div>
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
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#13b5a3] text-white rounded-lg text-sm font-medium hover:bg-[#0f9e8f] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Updating..." : "Update Transaction"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
