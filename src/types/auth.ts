// Auth Domain Types

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
  admin: AdminUser;
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

export interface GetAllUsersResponse {
  success: boolean;
  users: User[];
}

export type UserRole = "admin" | "user";
export type UserStatus = "active" | "suspended" | "deleted";
