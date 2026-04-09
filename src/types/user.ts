// User Domain Types

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

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  address?: string;
  gender?: string;
  dob?: string;
  accountNumber?: string;
  accountType?: string;
  swiftCode?: string;
  balance?: number;
  availableBalance?: number;
  status?: "active" | "suspended" | "deleted";
  role?: "admin" | "user";
  profileCompletion?: number;
  accountSecurity?: number;
  verification?: number;
  avatar?: string;
}

export interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
}

export interface ProfileAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface ProfileActionsProps {
  actions: ProfileAction[];
}
