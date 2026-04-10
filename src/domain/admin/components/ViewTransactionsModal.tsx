import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiArrowUp,
  FiArrowDown,
  FiFileText,
} from "react-icons/fi";
import type { User, Transaction, UpdateTransactionRequest } from "../types";
import EditTransactionModal from "./EditTransactionModal";
import { getImageUrl } from "../../../utils/imageUrl";

interface ViewTransactionsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  loading?: boolean;
  onUpdateTransaction?: (
    transactionId: string,
    transactionData: UpdateTransactionRequest
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
  const [editTransaction, setEditTransaction] =
    useState<Transaction | null>(null);

  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        comparison =
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime();
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
          className="bg-white rounded-xl w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
            <h3 className="text-lg font-bold text-[#0a2540]">
              User Transactions
            </h3>

            <button
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-100 p-2 rounded-full"
            >
              <FiX />
            </button>
          </div>

          {/* MAIN GRID */}
          <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[2fr_1fr]">

            {/* LEFT SIDE */}
            <div className="p-6 border-r border-gray-100 overflow-y-auto">
              {/* FILTERS */}
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="font-bold text-[#0a2540] text-lg">
                  Transactions ({transactions.length})
                </h3>

                <div className="flex gap-3 flex-wrap">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as "date" | "amount" | "status"
                      )
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="status">Status</option>
                  </select>

                  <button
                    onClick={() =>
                      setSortOrder(
                        sortOrder === "asc" ? "desc" : "asc"
                      )
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm flex items-center gap-2"
                  >
                    {sortOrder === "asc" ? "Oldest" : "Newest"}
                    {sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
                  </button>
                </div>
              </div>

              {/* LIST */}
              {loading ? (
                <div className="text-center py-12">Loading...</div>
              ) : sortedTransactions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No transactions found
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="p-4 rounded-xl border border-gray-200 hover:shadow-sm flex justify-between"
                    >
                      <div className="flex gap-4">
                        <div
                          className={`p-3 rounded-xl ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {getTypeIcon(transaction.type)}
                        </div>

                        <div>
                          <p className="font-semibold">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg">
                          {formatAmount(transaction.amount)}
                        </p>

                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status}
                        </span>

                        {onUpdateTransaction && (
                          <button
                            onClick={() =>
                              setEditTransaction(transaction)
                            }
                            className="block mt-2 text-xs text-[#13b5a3]"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="p-6 bg-[#fafafa] sticky top-0 h-full">
              <div className="text-center">
                {user.profileImageUrl ? (
                  <img
                    src={getImageUrl(user.profileImageUrl)}
                    className="w-20 h-20 rounded-full object-cover object-[center_20%] mx-auto"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#13b5a3] flex items-center justify-center text-white text-xl mx-auto">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </div>
                )}

                <h2 className="mt-4 font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="mt-6 bg-white p-4 rounded-lg text-center">
                <p className="text-xs text-gray-400">Balance</p>
                <p className="text-xl font-bold text-[#13b5a3]">
                  {formatAmount(user.balance)}
                </p>
              </div>

              <div className="mt-6 text-sm space-y-2">
                <p>Account: {user.accountNumber || "—"}</p>
                <p>Type: {user.accountType || "—"}</p>
                <p>Phone: {user.phoneNumber || "—"}</p>
                <p>Country: {user.country || "—"}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* EDIT MODAL */}
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