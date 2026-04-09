import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  useTransferMutation, 
  useVerifyTransferOTPMutation,
  useResendTransferOTPMutation 
} from "../api/userApi";
import type { RootState } from "../../../store";
import type { TransferRequest, TransferResponse } from "../types";
import OTPVerificationModal from "../../../auth/components/OTPVerificationModal";

const initialForm: Partial<TransferRequest> = {
  accountName: "",
  accountNumber: "",
  bankName: "",
  bankAddress: "",
  country: "United States",
  currency: "USD",
  swiftCode: "",
  ibanNumber: "",
  amount: "",
  transferType: "local",
  description: "",
};

export default function LocalTransferView() {
  const user = useSelector((s: RootState) => s.auth.user);
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
      // Allow only numbers and decimals
      const numericValue = value.replace(/[^0-9.]/g, "");
      
      // Split by decimal
      const parts = numericValue.split(".");
      let formattedValue = parts[0];
      
      // Add commas to whole numbers
      if (formattedValue) {
        // Remove leading zeros
        formattedValue = parseInt(formattedValue, 10).toString();
        // Add commas
        formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      
      // Add back decimals (limit to 2 places)
      if (parts.length > 1) {
        formattedValue += "." + parts[1].slice(0, 2);
      }
      
      // Keep empty if user backspaced everything
      if (value === "") {
        formattedValue = "";
      }

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
        transferType: "local",
      } as TransferRequest).unwrap();

      if (result.success && result.transferId) {
        setPendingTransferId(result.transferId);
        setShowOTPModal(true);
        startCountdown();
        return;
      }

      if (result.success) {
        setStatus({
          type: "success",
          message:
            "Transfer initiated successfully! It may take 1–2 business days to reflect.",
        });
        setForm(initialForm);
      } else {
        setStatus({
          type: "error",
          message: result.message || "Transfer failed.",
        });
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.data?.message || "An error occurred. Please try again.",
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
        setStatus({
          type: "success",
          message: "Transfer verified and completed successfully!",
        });
        setForm(initialForm);
      } else {
        setOtpError(result.message || "Invalid verification code.");
      }
    } catch (err: any) {
      setOtpError(err.data?.message || "Verification failed.");
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP({ transferId: pendingTransferId }).unwrap();
      startCountdown();
    } catch (err: any) {
      setOtpError(err.data?.message || "Failed to resend code.");
    }
  };

  const fields = [
    {
      name: "accountName",
      label: "Recipient Name",
      type: "text",
      placeholder: "John Doe",
    },
    {
      name: "accountNumber",
      label: "Account Number",
      type: "text",
      placeholder: "1234567890",
    },
    {
      name: "bankName",
      label: "Bank Name",
      type: "text",
      placeholder: "Chase Bank",
    },
    {
      name: "bankAddress",
      label: "Bank Address",
      type: "text",
      placeholder: "123 Main St, New York",
    },
    {
      name: "swiftCode",
      label: "SWIFT Code",
      type: "text",
      placeholder: "CHASUS33",
    },
    {
      name: "ibanNumber",
      label: "IBAN Number",
      type: "text",
      placeholder: "US12CHAS34567890123456",
    },
    {
      name: "amount",
      label: "Amount (USD)",
      type: "text",
      placeholder: "0.00",
    },
    {
      name: "description",
      label: "Description / Narration",
      type: "text",
      placeholder: "Payment for services",
    },
  ];

  return (
    <>
    <div className="max-w-2xl w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0a2540]">Local Transfer</h1>
        <p className="text-gray-500 text-sm mt-1">
          Send money within the United States. Available balance:{" "}
          <span className="font-semibold text-[#13b5a3]">
            ${user?.balance?.toLocaleString() ?? "0.00"}
          </span>
        </p>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
        {status && (
          <div
            className={`p-4 rounded-md mb-6 text-sm ${status.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
              }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div
                key={f.name}
                className={f.name === "description" ? "sm:col-span-2" : ""}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {f.label}
                </label>
                <input
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={(form as Record<string, string>)[f.name] ?? ""}
                  onChange={handleChange}
                  required
                  min={f.type === "number" ? "0.01" : undefined}
                  step={f.type === "number" ? "0.01" : undefined}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#0f9e8f] text-white px-4 py-2 rounded-md text-sm disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? "Processing..." : "Send Transfer"}
            </button>
          </div>
        </form>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Transfers are subject to review. Contact support for large or urgent
        transfers.
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
    </>
  );
}
