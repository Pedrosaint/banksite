import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";
import type {
  LoginRequest,
  LoginResponse,
  CreateUserResponse,
  GetAllUsersResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
  ResendOTPRequest,
  ResendOTPResponse,
} from "../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BANK_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Admin login endpoint
    adminLogin: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "admin/login",
        method: "POST",
        body: credentials,
      }),
    }),

    createUser: builder.mutation<CreateUserResponse, FormData>({
      query: (formData) => ({
        url: "users/create",
        method: "POST",
        body: formData,
      }),
    }),
    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => "admin/getAll",
    }),
    verifyOTP: builder.mutation<VerifyOTPResponse, VerifyOTPRequest>({
      query: (otpData) => ({
        url: "users/verify-otp",
        method: "POST",
        body: otpData,
      }),
    }),
    resendOTP: builder.mutation<ResendOTPResponse, ResendOTPRequest>({
      query: (otpData) => ({
        url: "users/resend-otp",
        method: "POST",
        body: otpData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useAdminLoginMutation,
  useCreateUserMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
} = authApi;
