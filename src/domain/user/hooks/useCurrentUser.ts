import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useGetAllUsersQuery } from "../../admin/api/adminApi";
import type { User } from "../../../auth/types";

/**
 * Hook to get the current logged-in user with the most up-to-date data 
 * (including balance) by matching with the list of all users.
 */
export function useCurrentUser() {
  const authUser = useSelector((state: RootState) => state.auth.user) as User;
  const { data: allUsersData, isLoading, error, refetch } = useGetAllUsersQuery();

  // Find the current user in the list of all users to get the most up-to-date balance
  const updatedUser = allUsersData?.users?.find((u: User) => u.id === authUser?.id);
  
  // Return the updated user if found, otherwise fallback to the auth user
  const user = updatedUser || authUser;
  
  // Extract specific fields for convenience
  const balance = user?.balance ?? authUser?.balance ?? 0;

  return {
    user,
    balance,
    isLoading,
    error,
    refetch
  };
}
