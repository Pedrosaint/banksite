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
  ) => Promise<void> | void;
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="bg-white border-b border-gray-100 p-6 flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#0a2540]">
              User Transactions
            </h3>

            <button
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] flex-1 min-h-0">

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
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
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
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm flex items-center gap-2 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {sortOrder === "asc" ? "Oldest" : "Newest"}
                    {sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
                  </button>
                </div>
              </div>

              {/* LIST */}
              {loading ? (
                <div className="text-center py-20 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-[#13b5a3] border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm">Loading transactions...</p>
                </div>
              ) : sortedTransactions.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <FiFileText size={32} />
                  </div>
                  <h4 className="text-[#0a2540] font-bold">No transactions found</h4>
                  <p className="text-gray-400 text-sm">This user hasn't made any transfers yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="p-4 rounded-xl border border-gray-100 hover:border-[#13b5a3]/30 hover:shadow-sm transition-all flex justify-between bg-white"
                    >
                      <div className="flex gap-4">
                        <div
                          className={`p-3 rounded-xl flex items-center justify-center h-fit ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {getTypeIcon(transaction.type)}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900 capitalize">
                            {transaction.description || transaction.type}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg text-[#0a2540]">
                          {formatAmount(transaction.amount)}
                        </p>

                        <span
                          className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${getStatusColor(
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
                            className="block mt-2 ml-auto text-xs text-[#13b5a3] font-bold hover:underline cursor-pointer"
                          >
                            Modify
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="p-8 bg-[#fafafa] overflow-y-auto">
              <div className="text-center">
                {user.profileImageUrl ? (
                  <img
                    src={getImageUrl(user.profileImageUrl)}
                    className="w-24 h-24 rounded-full object-cover object-[center_20%] mx-auto border-4 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#13b5a3] flex items-center justify-center text-white text-3xl font-bold mx-auto border-4 border-white shadow-sm">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </div>
                )}

                <h2 className="mt-5 font-bold text-xl text-[#0a2540]">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="mt-8 bg-white p-6 rounded-2xl text-center shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Total Balance</p>
                <p className="text-2xl font-black text-[#13b5a3]">
                  {formatAmount(user.balance)}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Account Number</span>
                  <span className="font-mono font-medium text-[#0a2540]">{user.accountNumber || "—"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Account Type</span>
                  <span className="font-medium text-[#0a2540] capitalize">{user.accountType || "—"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Phone Number</span>
                  <span className="font-medium text-[#0a2540]">{user.phoneNumber || "—"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Country</span>
                  <span className="font-medium text-[#0a2540]">{user.country || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* EDIT MODAL */}
        <EditTransactionModal
          transaction={editTransaction}
          isOpen={!!editTransaction}
          onClose={() => setEditTransaction(null)}
          onUpdate={async (id, data) => {
            await onUpdateTransaction?.(id, data);
            setEditTransaction(null);
          }}
          loading={updatingTransaction}
        />
      </motion.div>
    </AnimatePresence>
  );
}