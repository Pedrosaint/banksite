import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiMail,
  FiShield,
  FiKey,
  FiCheck,
  FiClock,
  FiRefreshCw,
} from "react-icons/fi";

interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otpData: {
    otp: string;
    email?: string;
    transferId?: string;
  }) => void;
  loading?: boolean;
  email?: string;
  purpose?: string;
  error?: string;
  onResendOTP?: () => void;
  resendLoading?: boolean;
  countdown?: number;
}

export default function OTPVerificationModal({
  isOpen,
  onClose,
  onVerify,
  loading,
  email = "",
  purpose = "login",
  error,
  onResendOTP,
  resendLoading = false,
  countdown = 0,
}: OTPVerificationModalProps) {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const lastSubmittedOtpRef = useRef<string | null>(null);

  const handleInputChange = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value.slice(0, 1); // Only allow single digit
    setOTP(newOTP);

    // Move to next input automatically when a digit is entered
    if (value && index < newOTP.length - 1) {
      const nextInput = document.getElementById(
        `otp-input-${index + 1}`,
      ) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Move to previous input
      if (index > 0) {
        const prevInput = document.getElementById(
          `otp-input-${index - 1}`,
        ) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(
        `otp-input-${index - 1}`,
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      const nextInput = document.getElementById(
        `otp-input-${index + 1}`,
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOTP = pastedData
      .split("")
      .map((char, index) => (index < 6 ? char : ""));
    setOTP(newOTP);

    // Focus on the last filled input
    const lastFilledIndex = newOTP.findIndex((char) => char === "");
    const targetIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex - 1;
    setTimeout(() => {
      const targetInput = document.getElementById(
        `otp-input-${targetIndex}`,
      ) as HTMLInputElement;
      if (targetInput) {
        targetInput.focus();
        targetInput.setSelectionRange(1, 1);
      }
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 6) {
      onVerify({ email, otp: otpString });
    }
  };

  const handleResendOTP = () => {
    if (onResendOTP) {
      onResendOTP();
    }
  };

  const isComplete = otp.join("").length === 6;
  const hasError = !!error;

  // Auto-submit when the OTP is complete
  useEffect(() => {
    if (!isOpen) return;
    if (loading) return;
    if (hasError) return;

    const otpString = otp.join("");
    if (otpString.length !== 6) return;

    // Prevent duplicate submissions for the same value
    if (lastSubmittedOtpRef.current === otpString) return;
    lastSubmittedOtpRef.current = otpString;

    onVerify({ email, otp: otpString });
  }, [email, hasError, isOpen, loading, onVerify, otp]);

  // Reset the submit guard when the modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      lastSubmittedOtpRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4"
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
              <h3 className="text-lg font-bold text-[#0a2540]">
                {purpose === "login"
                  ? "Login Verification"
                  : "Transfer Verification"}
              </h3>
              <p className="text-sm text-gray-500">
                {purpose === "login"
                  ? "Enter the 6-digit code sent to your email"
                  : "Enter the 6-digit code to complete your transfer"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Email Display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <FiMail className="text-blue-600 text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Verification sent to:</p>
                <p className="font-medium text-gray-900">{email}</p>
              </div>
            </div>
          </div>

          {/* OTP Input */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <div key={index} className="relative">
                  <input
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg transition-colors ${hasError
                        ? "border-red-300 text-red-500 bg-red-50"
                        : isComplete
                          ? "border-green-300 text-green-600 bg-green-50"
                          : "border-gray-300 text-gray-900 bg-white focus:border-[#13b5a3] focus:ring-2 focus:ring-[#13b5a3] focus:ring-offset-2"
                      }`}
                    placeholder="0"
                    autoFocus={index === 0}
                  />
                  {digit && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full">
                      <FiCheck className="text-white text-xs" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <FiShield className="text-red-500" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Resend OTP */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendLoading || countdown > 0}
                className="text-sm text-[#13b5a3] hover:text-[#0f9e8f] font-medium disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
              >
                {resendLoading ? (
                  <div className="w-4 h-4 border-2 border-[#13b5a3] border-t-transparent rounded-full animate-spin"></div>
                ) : countdown > 0 ? (
                  <>
                    <FiClock className="text-sm" />
                    {`Resend in ${countdown}s`}
                  </>
                ) : (
                  <>
                    <FiRefreshCw className="text-sm" />
                    Resend Code
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
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
                disabled={loading || !isComplete || hasError}
                className="flex-1 px-4 py-2 bg-[#13b5a3] text-white rounded-lg text-sm font-medium hover:bg-[#0f9e8f] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <FiKey />
                    Verify
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <FiShield className="text-blue-500 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 mb-1">
                  Security Notice:
                </p>
                <ul className="text-blue-700 space-y-1">
                  <li>· Enter the 6-digit code within 10 minutes</li>
                  <li>· Never share your verification code with anyone</li>
                  <li>· This code can only be used once</li>
                  <li>· If you didn't request this, please contact support</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
