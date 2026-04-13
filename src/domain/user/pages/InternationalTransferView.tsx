/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  useTransferMutation,
  useVerifyTransferOTPMutation,
  useResendTransferOTPMutation
} from "../api/userApi";
import type { TransferRequest, TransferResponse } from "../types";
import OTPVerificationModal from "../../../auth/components/OTPVerificationModal";
import TransactionStatusModal from "../../../components/TransactionStatusModal";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { toast } from "sonner";

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "CNY"];
const COUNTRIES = [
  "United Kingdom",
  "Germany",
  "France",
  "Canada",
  "Australia",
  "Japan",
  "Switzerland",
  "China",
  "UAE",
  "Singapore",
  "Other",
];

const initialForm: Partial<TransferRequest> = {
  accountName: "",
  accountNumber: "",
  bankName: "",
  bankAddress: "",
  country: "United Kingdom",
  currency: "USD",
  swiftCode: "",
  ibanNumber: "",
  amount: "",
  transferType: "international",
  description: "",
};

export default function InternationalTransferView() {
  const { user, balance } = useCurrentUser();
  const [form, setForm] = useState(initialForm);
  const [transfer, { isLoading }] = useTransferMutation();
  const [verifyOTP, { isLoading: isVerifying }] = useVerifyTransferOTPMutation();
  const [resendOTP, { isLoading: isResending }] = useResendTransferOTPMutation();

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingTransferId, setPendingTransferId] = useState("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(0);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const startCountdown = () => setCountdown(60);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      const parts = numericValue.split(".");
      let formattedValue = parts[0];

      if (formattedValue) {
        formattedValue = parseInt(formattedValue, 10).toString();
        formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      if (parts.length > 1) {
        formattedValue += "." + parts[1].slice(0, 2);
      }

      if (value === "") formattedValue = "";
      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const cleanForm = { ...form };
      if (cleanForm.amount) {
        cleanForm.amount = (cleanForm.amount as string).replace(/,/g, "");
      }

      const result: TransferResponse = await transfer({
        ...cleanForm,
        transferType: "international",
      } as TransferRequest).unwrap();

      if (result.success && result.transferId) {
        setPendingTransferId(result.transferId);
        setShowOTPModal(true);
        startCountdown();
        toast.info("A verification code has been sent to your email.");
        return;
      }

      if (result.success) {
        const msg = "International transfer initiated! Processing time is business days.";
        setStatus({
          type: "success",
          message: msg,
        });
        setForm(initialForm);
      } else {
        const msg = result.error || result.message || "Transfer failed.";
        setStatus({
          type: "error",
          message: msg,
        });
      }
    } catch (err: any) {
      const msg = err.data?.error || err.data?.message || err.message || "An error occurred. Please try again.";
      setStatus({
        type: "error",
        message: msg,
      });
    }
  };

  const handleOTPVerify = async (data: { otp: string }) => {
    setOtpError("");
    try {
      const result = await verifyOTP({
        transferId: pendingTransferId,
        otp: data.otp,
      }).unwrap();

      if (result.success) {
        setShowOTPModal(false);
        const msg = "International transfer verified and completed successfully!";
        setStatus({
          type: "success",
          message: msg,
        });
        setForm(initialForm);
      } else {
        const msg = result.error || result.message || "Invalid verification code.";
        setOtpError(msg);
      }
    } catch (err: any) {
      const msg = err.data?.error || err.data?.message || err.message || "Verification failed.";
      setOtpError(msg);
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP({ transferId: pendingTransferId }).unwrap();
      startCountdown();
      toast.success("Verification code resent.");
    } catch (err: any) {
      const msg = err.data?.message || "Failed to resend code.";
      setOtpError(msg);
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="max-w-2xl w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0a2540]">
            International Transfer
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Send money globally via SWIFT / IBAN. Available balance:{" "}
            <span className="font-semibold text-[#13b5a3]">
              ${balance?.toLocaleString() ?? "0.00"}
            </span>
          </p>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Name
                </label>
                <input
                  name="accountName"
                  type="text"
                  placeholder="Jane Smith"
                  value={form.accountName ?? ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none"
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  name="accountNumber"
                  type="text"
                  placeholder="REDACTED"
                  value={form.accountNumber ?? ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none"
                />
              </div>

              {/* IBAN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IBAN Number
                </label>
                <input
                  name="ibanNumber"
                  type="text"
                  placeholder="REDACTED"
                  value={form.ibanNumber ?? ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none"
                />
              </div>

              {/* SWIFT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SWIFT / BIC Code
                </label>
                <input
                  name="swiftCode"
                  type="text"
                  placeholder="REDACTED"
                  value={form.swiftCode ?? ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none"
                />
              </div>

              {/* Bank Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  name="bankName"
                  type="text"
                  placeholder="NatWest Bank"
                  value={form.bankName ?? ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none"
                />
              </div>

              {/* Bank Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Address
                </label>
                <input
                  name="bankAddress"
                  type="text"
                  placeholder="[Location Removed]"
                  value={form.bankAddress ?? ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination Country
                </label>
                <select
                  name="country"
                  value={form.country ?? "United Kingdom"}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none bg-white"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  name="currency"
                  value={form.currency ?? "USD"}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none bg-white"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  name="amount"
                  type="text"
                  placeholder="X.XX"
                  value={form.amount ?? ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose / Description
                </label>
                <input
                  name="description"
                  type="text"
                  placeholder="Invoice payment, family support, etc."
                  value={form.description ?? ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#0f9e8f] text-white px-4 py-2 rounded-md text-sm disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? "Processing..." : "Send International Transfer"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          International transfers are reviewed for compliance. Processing:          business days.
        </p>
      </div>

      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleOTPVerify}
        loading={isVerifying}
        email={user?.email}
        purpose="transfer"
        error={otpError}
        onResendOTP={handleResendOTP}
        resendLoading={isResending}
        countdown={countdown}
      />
      <TransactionStatusModal
        isOpen={!!status}
        onClose={() => setStatus(null)}
        type={status?.type === "success" ? "success" : "error"}
        title={status?.type === "success" ? "Transfer Complete" : "Transfer Failed"}
        message={status?.message || ""}
      />
    </>
  );
}
