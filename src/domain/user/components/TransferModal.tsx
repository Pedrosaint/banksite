/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiDollarSign, FiUser, FiBriefcase, FiSend } from "react-icons/fi";
import { toast } from "sonner";
import {
  useVerifyTransferOTPMutation,
  useResendTransferOTPMutation,
} from "../api/userApi";
import OTPVerificationModal from "../../../auth/components/OTPVerificationModal";
import type { TransferRequest, TransferResponse } from "../types";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (transferData: TransferRequest) => Promise<TransferResponse>;
  loading?: boolean;
  currentBalance?: number;
}

export default function TransferModal({
  isOpen,
  onClose,
  onTransfer,
  loading,
  currentBalance = 0,
}: TransferModalProps) {
  const [formData, setFormData] = useState<TransferRequest>({
    accountName: "",
    accountNumber: "",
    bankName: "",
    bankAddress: "",
    country: "",
    currency: "dollar",
    swiftCode: "",
    ibanNumber: "",
    amount: "",
    transferType: "current",
    description: "",
  });
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingTransferId, setPendingTransferId] = useState<string>("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [verifyTransferOTPMutation, { isLoading: isVerifyingOTP }] =
    useVerifyTransferOTPMutation();
  const [resendTransferOTPMutation, { isLoading: isResendingOTP }] =
    useResendTransferOTPMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // First submit the transfer to get a transfer ID
    try {
      const result = await onTransfer(formData);
      if (result && result.transfer && result.transfer.id) {
        setPendingTransferId(result.transfer.id);
        setShowOTPModal(true);
        startCountdown();
        toast.info("A verification code has been sent to your email.");
      }
    } catch (error) {
      toast.error("Transfer failed. Please check your details and try again.");
      console.error("Transfer submission failed:", error);
    }
  };

  const handleVerifyOTP = async (otpData: {
    otp: string;
    email?: string;
    transferId?: string;
  }) => {
    setOtpError("");

    try {
      const result = await verifyTransferOTPMutation({
        otp: otpData.otp,
        transferId: pendingTransferId,
      }).unwrap();

      if (result.success) {
        // OTP verified, transfer completed successfully
        toast.success("Transfer completed successfully!");
        setShowOTPModal(false);
        onClose();
      } else {
        const msg = result.message || "Transfer verification failed";
        setOtpError(msg);
        toast.error(msg);
      }
    } catch (err: unknown) {
      const msg = (err as any)?.data?.message || "Transfer verification failed. Please try again.";
      setOtpError(msg);
      toast.error(msg);
    }
  };

  const handleResendOTP = async () => {
    if (!pendingTransferId) return;

    try {
      const result = await resendTransferOTPMutation({
        transferId: pendingTransferId,
      }).unwrap();

      if (result.success) {
        startCountdown();
        toast.success("Verification code resent.");
      } else {
        toast.error(result.message || "Failed to resend code.");
      }
    } catch (error) {
      toast.error("Failed to resend code. Please try again.");
      console.error("Failed to resend OTP:", error);
    }
  };

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInputChange = (field: keyof TransferRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatAmount = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(num);
  };

  if (!isOpen) return null;

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
          className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-[#0a2540]">
                Transfer Money
              </h3>
              <p className="text-sm text-gray-500">
                Available Balance: {formatAmount(currentBalance.toString())}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Recipient Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiUser className="text-[#13b5a3]" />
                Recipient Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Name *
                  </label>
                  <input
                    type="text"
                    value={formData.accountName}
                    onChange={(e) =>
                      handleInputChange("accountName", e.target.value)
                    }
                    placeholder="Enter recipient account name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      handleInputChange("accountNumber", e.target.value)
                    }
                    placeholder="Enter account number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiBriefcase className="text-[#13b5a3]" />
                Bank Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) =>
                      handleInputChange("bankName", e.target.value)
                    }
                    placeholder="Enter bank name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Address *
                  </label>
                  <input
                    type="text"
                    value={formData.bankAddress}
                    onChange={(e) =>
                      handleInputChange("bankAddress", e.target.value)
                    }
                    placeholder="Enter bank address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    placeholder="Enter country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency *
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      handleInputChange("currency", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  >
                    <option value="dollar">USD ($)</option>
                    <option value="euro">EUR (</option>
                    <option value="pound">GBP (£)</option>
                    <option value="naira">NGN (</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Transfer Details */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiSend className="text-[#13b5a3]" />
                Transfer Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        handleInputChange("amount", e.target.value)
                      }
                      placeholder="X.XX"
                      min="1"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                      required
                    />
                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  {formData.amount && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatAmount(formData.amount)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transfer Type *
                  </label>
                  <select
                    value={formData.transferType}
                    onChange={(e) =>
                      handleInputChange("transferType", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  >
                    <option value="current">Current Account</option>
                    <option value="savings">Savings Account</option>
                    <option value="business">Business Account</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SWIFT Code *
                  </label>
                  <input
                    type="text"
                    value={formData.swiftCode}
                    onChange={(e) =>
                      handleInputChange("swiftCode", e.target.value)
                    }
                    placeholder="Enter SWIFT code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IBAN Number *
                  </label>
                  <input
                    type="text"
                    value={formData.ibanNumber}
                    onChange={(e) =>
                      handleInputChange("ibanNumber", e.target.value)
                    }
                    placeholder="Enter IBAN number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] focus:border-[#13b5a3] transition resize-none"
                placeholder="Enter transfer description"
                required
              />
            </div>

            {/* Transfer Preview */}
            {(formData.amount || formData.accountName) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  Transfer Preview:
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">
                      {formData.accountName || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account:</span>
                    <span className="font-medium">
                      {formData.accountNumber || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">
                      {formData.bankName || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-[#13b5a3]">
                      {formData.amount
                        ? formatAmount(formData.amount)
                        : "$X.XX"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">
                      {formData.transferType}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
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
                  !formData.amount ||
                  parseFloat(formData.amount) <= 0
                }
                className="flex-1 px-4 py-2 bg-[#13b5a3] text-white rounded-lg text-sm font-medium hover:bg-[#0f9e8f] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Transfer
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* OTP Verification Modal */}
      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleVerifyOTP}
        loading={isVerifyingOTP}
        email="" // Transfer OTP doesn't use email
        purpose="transfer"
        error={otpError}
        onResendOTP={handleResendOTP}
        resendLoading={isResendingOTP}
        countdown={countdown}
      />
    </AnimatePresence>
  );
}
