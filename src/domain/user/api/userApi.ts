/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../../store";
import type {
  TransferRequest,
  TransferResponse,
  TransferVerifyOTPRequest,
  TransferVerifyOTPResponse,
  ResendTransferOTPRequest,
  ResendTransferOTPResponse,
} from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
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
    transfer: builder.mutation<TransferResponse, TransferRequest>({
      query: (transferData) => ({
        url: "transactions/transfer",
        method: "POST",
        body: transferData,
      }),
    }),
    verifyTransferOTP: builder.mutation<
      TransferVerifyOTPResponse,
      TransferVerifyOTPRequest
    >({
      query: (otpData) => ({
        url: "transactions/transfer/verify-otp",
        method: "POST",
        body: otpData,
      }),
    }),
    resendTransferOTP: builder.mutation<
      ResendTransferOTPResponse,
      ResendTransferOTPRequest
    >({
      query: (otpData) => ({
        url: "transactions/transfer/resend-otp",
        method: "POST",
        body: otpData,
      }),
    }),
    getUserTransactions: builder.query<any, string>({
      query: (userId) => `admin/user/${userId}/transactions`,
    }),
  }),
});

export const {
  useTransferMutation,
  useVerifyTransferOTPMutation,
  useResendTransferOTPMutation,
  useGetUserTransactionsQuery,
} = userApi;
