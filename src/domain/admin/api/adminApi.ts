import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../../store";
import type {
  GetAllUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  GetUserTransactionsResponse,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
  InitiateTransactionRequest,
  InitiateTransactionResponse,
  DeleteUserResponse,
  GenerateTransactionsRequest,
  GenerateTransactionsResponse,
} from "../types";

export const adminApi = createApi({
  reducerPath: "adminApi",
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
    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => "admin/getAll",
    }),
    updateUser: builder.mutation<
      UpdateUserResponse,
      { userId: string; userData: UpdateUserRequest }
    >({
      query: ({ userId, userData }) => ({
        url: `admin/update/${userId}`,
        method: "PUT",
        body: userData,
      }),
    }),
    getUserTransactions: builder.query<GetUserTransactionsResponse, string>({
      query: (userId) => `admin/user/${userId}/transactions`,
    }),
    updateTransaction: builder.mutation<
      UpdateTransactionResponse,
      { transactionId: string; transactionData: UpdateTransactionRequest }
    >({
      query: ({ transactionId, transactionData }) => ({
        url: `admin/transaction/${transactionId}`,
        method: "PUT",
        body: transactionData,
      }),
    }),
    initiateTransaction: builder.mutation<
      InitiateTransactionResponse,
      { userId: string; transactionData: InitiateTransactionRequest }
    >({
      query: ({ userId, transactionData }) => ({
        url: `admin/user/${userId}/transaction`,
        method: "POST",
        body: transactionData,
      }),
    }),
    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (userId) => ({
        url: `admin/user/delete/${userId}`,
        method: "DELETE",
      }),
    }),
    generateTransactions: builder.mutation<
      GenerateTransactionsResponse,
      { userId: string; transactionData: GenerateTransactionsRequest }
    >({
      query: ({ userId, transactionData }) => ({
        url: `admin/user/${userId}/generate-transactions`,
        method: "POST",
        body: transactionData,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetUserTransactionsQuery,
  useUpdateTransactionMutation,
  useInitiateTransactionMutation,
  useDeleteUserMutation,
  useGenerateTransactionsMutation,
} = adminApi;
