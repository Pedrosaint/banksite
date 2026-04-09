import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiArrowUp,
  FiArrowDown,
  FiFileText,
  FiEdit2,
} from "react-icons/fi";
import type { User, Transaction, UpdateTransactionRequest } from "../types";
import EditTransactionModal from "./EditTransactionModal";

interface ViewTransactionsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  loading?: boolean;
  onUpdateTransaction?: (
    transactionId: string,
    transactionData: UpdateTransactionRequest,
  ) => void;
  updatingTransaction?: boolean;
}

export default function ViewTransactionsModal({
  user,
  isOpen,
  onClose,
  transactions,
  loading,
  onUpdateTransaction,
  updatingTransaction,
}: ViewTransactionsModalProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "status">("date");
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null,
  );

  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        comparison =
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        break;
      case "amount":
        comparison = b.amount - a.amount;
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "transfer":
        return <FiArrowUp className="text-blue-500" />;
      case "deposit":
        return <FiArrowDown className="text-green-500" />;
      case "withdrawal":
        return <FiArrowUp className="text-red-500" />;
      default:
        return <FiFileText className="text-gray-500" />;
    }
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
          className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-[#0a2540] flex items-center gap-2">
                User Details & Transactions
                {user.isSuspicious && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                    Flagged
                  </span>
                )}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(85vh - 75px)" }}
          >
            {/* User Profile Summary */}
            <div className="p-6 bg-[#fafafa] border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover shrink-0 shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#13b5a3] flex items-center justify-center text-2xl text-white font-bold shrink-0 shadow-sm">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#0a2540]">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                </div>
                <div className="bg-white px-5 py-3 rounded border border-gray-100 mt-4 sm:mt-0 text-right min-w-[150px]">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
                    Balance
                  </p>
                  <p className="text-xl font-bold text-[#13b5a3]">
                    {formatAmount(user.balance)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Account Nav</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {user.accountNumber || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Type</p>
                  <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
                    {user.accountType || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Phone</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {user.phoneNumber || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Country</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {user.country || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-bold text-[#0a2540] text-lg">
                Transactions <span className="text-sm font-normal text-gray-500 ml-2">({transactions.length})</span>
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "date" | "amount" | "status")
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3]"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="status">Status</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Order:
                  </label>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] hover:bg-gray-50 transition-colors"
                  >
                    {sortOrder === "asc" ? "Oldest" : "Newest"}
                    <span className="ml-2">
                      {sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
                    </span>
                  </button>
                </div>
              </div>

              {/* Transactions List */}
              <div className="px-6 pb-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-transparent"></div>
                      <p className="mt-4 text-gray-500">Loading transactions...</p>
                    </div>
                  </div>
                ) : sortedTransactions.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">No transactions found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {sortedTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${getStatusColor(transaction.status)}`}
                            >
                              {getTypeIcon(transaction.type)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {transaction.description}
                              </div>
                              <div className="text-sm text-gray-500">
                                {formatDate(transaction.createdAt)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              {formatAmount(transaction.amount)}
                            </div>
                            <div
                              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}
                            >
                              {transaction.status}
                            </div>
                            {onUpdateTransaction && (
                              <button
                                onClick={() => setEditTransaction(transaction)}
                                className="mt-2 p-1.5 rounded-lg hover:bg-[#e6f7f5] text-[#13b5a3] transition-colors"
                                title="Edit Transaction"
                              >
                                <FiEdit2 className="text-sm" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Transaction Modal */}
        <EditTransactionModal
          transaction={editTransaction}
          isOpen={!!editTransaction}
          onClose={() => setEditTransaction(null)}
          onUpdate={onUpdateTransaction || (() => { })}
          loading={updatingTransaction}
        />
      </motion.div>
    </AnimatePresence>
  );
}
