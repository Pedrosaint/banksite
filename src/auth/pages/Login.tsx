/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "../../store/authSlice";
import {
  useLoginMutation,
  useAdminLoginMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
} from "../api/authApi";
import LoginForm from "../components/LoginForm";
import OTPVerificationModal from "../components/OTPVerificationModal";

export default function Login() {
  const [error, setError] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [adminLoginMutation] = useAdminLoginMutation();
  const [verifyOTPMutation, { isLoading: isVerifyingOTP }] =
    useVerifyOTPMutation();
  const [resendOTPMutation, { isLoading: isResendingOTP }] =
    useResendOTPMutation();

  const handleSubmit = async (email: string, password: string) => {
    setError("");
    setPendingEmail(email);

    try {
      const userResult = await loginMutation({ email, password }).unwrap();

      // Check if OTP is required
      if (
        userResult.message &&
        userResult.message.toLowerCase().includes("otp")
      ) {
        setShowOTPModal(true);
        startCountdown();
        return;
      }

      if (userResult.user) {
        dispatch(
          login({
            user: userResult.user,
            token: userResult.token,
            role: "user",
          }),
        );
        toast.success("Login successful! Welcome back.");
        navigate("/user/dashboard/home");
      }
      return;
    } catch (userError: any) {
      // Check if error indicates OTP is required
      if (
        userError.data?.message &&
        userError.data.message.toLowerCase().includes("otp")
      ) {
        setShowOTPModal(true);
        startCountdown();
        return;
      }
      console.log("User login failed, trying admin login...");

      try {
        const adminResult = await adminLoginMutation({
          email,
          password,
        }).unwrap();

        // Admin login successful - route to admin portal
        const adminData = adminResult.admin || adminResult.user;
        if (adminData) {
          dispatch(
            login({
              user: adminData as any,
              token: adminResult.token,
              role: "admin",
            }),
          );
          toast.success("Admin login successful!");
          navigate("/admin/dashboard/home");
        }
        return;
      } catch (adminError: any) {
        const errorMsg = adminError.data?.message || "Invalid credentials. Please check your email and password.";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  const handleVerifyOTP = async (otpData: { otp: string; email?: string }) => {
    setOtpError("");
    try {
      const result = await verifyOTPMutation({
        email: otpData.email || pendingEmail,
        otp: otpData.otp,
      }).unwrap();

      if (result.success && result.token && result.user) {
        const user = {
          id: result.user.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
          accountNumber: result.user.accountNumber,
          accountType: result.user.accountType,
          balance: 0,
          isSuspicious: false,
          dateOfBirth: "",
          phoneNumber: "",
          country: "",
          address: "",
          createdAt: "",
          updatedAt: "",
          profileImageUrl: result.user.profileImageUrl,
          role: "user" as const,
        };

        dispatch(
          login({
            token: result.token,
            role: "user",
            user,
          }),
        );

        setShowOTPModal(false);
        toast.success("Verification successful!");
        navigate("/user/dashboard/home");
      } else {
        const msg = "Invalid OTP. Please try again.";
        setOtpError(msg);
        toast.error(msg);
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as any)?.data?.message || "OTP verification failed.";
      setOtpError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleResendOTP = async () => {
    setOtpError("");
    try {
      const result = await resendOTPMutation({
        email: pendingEmail,
      }).unwrap();

      if (result.success) {
        startCountdown();
        toast.success("OTP has been resent to your email.");
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
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

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} loading={isLoading} error={error} />


      {/* OTP Verification Modal */}
      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleVerifyOTP}
        loading={isVerifyingOTP}
        email={pendingEmail}
        purpose="login"
        error={otpError}
        onResendOTP={handleResendOTP}
        resendLoading={isResendingOTP}
        countdown={countdown}
      />
    </div>
  );
}
