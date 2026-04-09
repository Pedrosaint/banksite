export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  admin?: AdminUser;
  user?: User;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  profilePicture?: File;
  dateOfBirth: string;
  phoneNumber: string;
  country: string;
  address: string;
  password: string;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
}

export interface GetAllUsersResponse {
  success: boolean;
  users: User[];
}

export interface AuthState {
  token: string | null;
  role: "admin" | "user" | null;
  user: User | null;
  isAuthenticated: boolean;
}

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
  // Legacy fields for compatibility
  phone?: string;
  gender?: string;
  dob?: string;
  swiftCode?: string;
  availableBalance?: number;
  status?: "active" | "suspended" | "deleted";
  role?: "admin" | "user";
  profileCompletion?: number;
  accountSecurity?: number;
  verification?: number;
  avatar?: string;
}

export type UserRole = "admin" | "user";
export type UserStatus = "active" | "suspended" | "deleted";

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    accountType: string;
    profileImageUrl?: string;
  };
}

export interface ResendOTPRequest {
  email: string;
}

export interface ResendOTPResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    accountType: string;
    profileImageUrl?: string;
  };
}
