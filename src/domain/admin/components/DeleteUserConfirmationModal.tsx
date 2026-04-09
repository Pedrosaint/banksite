import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2, FiAlertTriangle, FiUser, FiDollarSign, FiMail, FiPhone } from "react-icons/fi";
import type { User } from "../types";

interface DeleteUserConfirmationModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string) => void;
  loading?: boolean;
}

export default function DeleteUserConfirmationModal({ user, isOpen, onClose, onConfirm, loading }: DeleteUserConfirmationModalProps) {
  const handleConfirm = () => {
    if (user) {
      onConfirm(user.id);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
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
            <h3 className="text-lg font-bold text-[#0a2540]">Delete User</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="text-2xl text-red-500" />
            </div>
          </div>

          {/* Warning Message */}
          <div className="text-center mb-6">
            <p className="text-gray-700 mb-2">
              Are you sure you want to delete this user?
            </p>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>

          {/* User Information Card */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#13b5a3] rounded-full flex items-center justify-center">
                <FiUser className="text-white text-lg" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-sm text-gray-500">Account: {user.accountNumber}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <FiMail className="text-gray-400" />
                  Email
                </span>
                <span className="text-gray-900 font-medium">{user.email}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <FiPhone className="text-gray-400" />
                  Phone
                </span>
                <span className="text-gray-900 font-medium">{user.phoneNumber}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <FiDollarSign className="text-gray-400" />
                  Balance
                </span>
                <span className="text-gray-900 font-bold">
                  {formatAmount(user.balance)}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Account Type</span>
                <span className="text-gray-900 font-medium capitalize">{user.accountType}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user.isSuspicious 
                    ? "bg-orange-50 text-orange-600 border-orange-200" 
                    : "bg-green-50 text-green-600 border-green-200"
                }`}>
                  {user.isSuspicious ? "Suspicious" : "Active"}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <FiAlertTriangle className="text-red-500 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-red-800 mb-1">Important:</p>
                <ul className="text-red-700 space-y-1">
                  <li>· All user data will be permanently deleted</li>
                  <li>· Transaction history will be removed</li>
                  <li>· User will no longer be able to access their account</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-60 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <FiTrash2 />
                  Delete User
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
