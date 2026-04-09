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

export interface DepositRequest {
  amount: string;
  method: string;
}

export interface DepositResponse {
  success: boolean;
  message: string;
  transactionId?: string;
}

export interface TransferRequest {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
  country: string;
  currency: string;
  swiftCode: string;
  ibanNumber: string;
  amount: string;
  transferType: string;
  description: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
  transferId?: string;
  transfer?: {
    id: string;
    userId: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankAddress: string;
    country: string;
    currency: string;
    swiftCode: string;
    ibanNumber: string;
    amount: number;
    transferType: string;
    description: string;
    status: string;
    createdAt: string;
    transactionId: string | null;
  };
  newBalance?: number;
}

export interface TransferFormData {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
  country: string;
  currency: string;
  swiftCode: string;
  ibanNumber: string;
  amount: string;
  transferType: string;
  description: string;
}

export interface TransferField {
  key: keyof TransferFormData;
  label: string;
  type: string;
  placeholder: string;
}

export interface TransferVerifyOTPRequest {
  otp: string;
  transferId: string;
}

export interface TransferVerifyOTPResponse {
  success: boolean;
  message: string;
  newBalance: number;
}

export interface ResendTransferOTPRequest {
  transferId: string;
}

export interface ResendTransferOTPResponse {
  success: boolean;
  message: string;
}
