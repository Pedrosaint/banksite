export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  profileImageUrl?: string;
  isSuspicious: boolean;
  dateOfBirth: string;
  phoneNumber: string;
  country: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllUsersResponse {
  success: boolean;
  users: User[];
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  isSuspicious?: boolean;
}

export interface UpdateUserResponse {
  success: boolean;
  user: User;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  userId: string;
  createdAt: string;
}

export interface GetUserTransactionsResponse {
  success: boolean;
  transactions: Transaction[];
}

export interface UpdateTransactionRequest {
  status?: string;
  description?: string;
}

export interface UpdateTransactionResponse {
  success: boolean;
  transaction: Transaction;
}

export interface InitiateTransactionRequest {
  status: string;
  amount: number;
  type: string;
  description: string;
}

export interface InitiateTransactionResponse {
  success: boolean;
  message: string;
  transaction: Transaction;
  newBalance: number;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export interface GenerateTransactionsRequest {
  fromDate: string;
  toDate: string;
  count: number;
}

export interface GenerateTransactionsResponse {
  success: boolean;
  message: string;
  fromDate: string;
  toDate: string;
}
