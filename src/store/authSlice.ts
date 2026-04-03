import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  gender: string;
  dob: string;
  accountNumber: string;
  accountType: string;
  swiftCode: string;
  balance: number;
  availableBalance: number;
  status: "active" | "suspended" | "deleted";
  role: "admin" | "user";
  profileCompletion: number;
  accountSecurity: number;
  verification: number;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  role: "admin" | "user" | null;
  user: User | null;
  isAuthenticated: boolean;
}

function safeParseUser(): User | null {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

const parsedUser = safeParseUser();

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role") as "admin" | "user" | null,
  user: parsedUser,
  isAuthenticated: !!localStorage.getItem("token") && !!parsedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; role: "admin" | "user"; user: User }>) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
