/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiDollarSign,
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX,
  FiPlus,
  FiRefreshCw,
  FiAlertTriangle,
} from "react-icons/fi";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetUserTransactionsQuery,
  useUpdateTransactionMutation,
  useInitiateTransactionMutation,
  useDeleteUserMutation,
  useGenerateTransactionsMutation,
} from "../api/adminApi";
import type {
  User,
  UpdateTransactionRequest,
  InitiateTransactionRequest,
  GenerateTransactionsRequest,
} from "../types";
import ViewTransactionsModal from "../components/ViewTransactionsModal";
import InitiateTransactionModal from "../components/InitiateTransactionModal";
import DeleteUserConfirmationModal from "../components/DeleteUserConfirmationModal";
import GenerateTransactionsModal from "../components/GenerateTransactionsModal";

export default function AdminHome() {
  const { data: usersData } = useGetAllUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [updateTransaction, { isLoading: isUpdatingTransaction }] =
    useUpdateTransactionMutation();
  const [initiateTransaction, { isLoading: isInitiatingTransaction }] =
    useInitiateTransactionMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [deleteUserConfirm, setDeleteUserConfirm] = useState<User | null>(null);
  const [generateTransactions, { isLoading: isGeneratingTransactions }] =
    useGenerateTransactionsMutation();
  const [search, setSearch] = useState("");
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [initiateTransactionUser, setInitiateTransactionUser] =
    useState<User | null>(null);
  const [generateTransactionsUser, setGenerateTransactionsUser] =
    useState<User | null>(null);


  // Get transactions for the selected user
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetUserTransactionsQuery(viewUser?.id || "", { skip: !viewUser });

  const users = usersData?.users || [];

  const filtered = users.filter((u) =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()),
  );

  const activeCount = users.length;
  const totalBalance = users.reduce((s: number, u: User) => s + u.balance, 0);

  const handleEditSave = async () => {
    if (!editUser) return;
    try {
      await updateUser({ userId: editUser.id, userData: editUser }).unwrap();
      setEditUser(null);
    } catch (error: unknown) {
      console.error("Failed to update user:", error);
    }
  };

  const handleUpdateTransaction = async (
    transactionId: string,
    transactionData: UpdateTransactionRequest,
  ) => {
    try {
      const result = await updateTransaction({
        transactionId,
        transactionData,
      }).unwrap();
      if (result.success && result.transaction) {
        // Refresh transactions data
        // This will trigger a refetch of the transactions query
        // The ViewTransactionsModal will automatically update with the new data
      }
    } catch (error: unknown) {
      console.error("Failed to update transaction:", error);
      // Handle error (show toast, notification, etc.)
    }
  };

  const handleInitiateTransaction = async (
    userId: string,
    transactionData: InitiateTransactionRequest,
  ) => {
    try {
      const result = await initiateTransaction({
        userId,
        transactionData,
      }).unwrap();
      if (result.success) {
        // Show success message and close modal
        setInitiateTransactionUser(null);
        // Optionally refresh user data to show new balance
        // You could refetch user data here if needed
      }
    } catch (error: unknown) {
      console.error("Failed to initiate transaction:", error);
      // Handle error (show toast, notification, etc.)
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const result = await deleteUser(userId).unwrap();
      if (result.success) {
        // Close confirmation modal
        setDeleteUserConfirm(null);
        // The getAllUsers query will automatically refetch and update the UI
      }
    } catch (error: unknown) {
      console.error("Failed to delete user:", error);
      // Handle error (show toast, notification, etc.)
    }
  };

  const handleGenerateTransactions = async (
    userId: string,
    transactionData: GenerateTransactionsRequest,
  ) => {
    try {
      const result = await generateTransactions({
        userId,
        transactionData,
      }).unwrap();
      if (result.success) {
        // Close modal
        setGenerateTransactionsUser(null);
        // Optionally refresh transactions or show success message
      }
    } catch (error: unknown) {
      console.error("Failed to generate transactions:", error);
      // Handle error (show toast, notification, etc.)
    }
  };



  const stats = [
    {
      label: "Total Users",
      value: activeCount,
      icon: FiUsers,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Total Balance",
      value: `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: FiDollarSign,
      color: "text-[#13b5a3]",
      bg: "bg-[#e6f7f5]",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0a2540]">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center`}
            >
              <s.icon className={`text-xl ${s.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0a2540]">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-bold text-[#0a2540]">User Management</h3>
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[800px] whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                <th className="px-5 py-3 font-medium">First Name</th>
                <th className="px-5 py-3 font-medium">Last Name</th>
                <th className="px-5 py-3 font-medium">Country</th>
                <th className="px-5 py-3 font-medium">Account Type</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3 text-sm text-gray-800">
                    {u.firstName}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-800">
                    {u.lastName}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {u.country}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {u.accountType}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {u.phoneNumber}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setViewUser(u)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                        title="View"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => setEditUser({ ...u })}
                        className="p-1.5 rounded-lg hover:bg-[#e6f7f5] text-[#13b5a3] transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => setInitiateTransactionUser(u)}
                        className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                        title="Initiate Transaction"
                      >
                        <FiPlus />
                      </button>
                      <button
                        onClick={() => setGenerateTransactionsUser(u)}
                        className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
                        title="Generate Transactions"
                      >
                        <FiRefreshCw />
                      </button>
                      <button
                        onClick={() => setDeleteUserConfirm(u)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-gray-400 text-sm"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Transactions Modal */}
      <ViewTransactionsModal
        user={viewUser}
        isOpen={!!viewUser}
        onClose={() => setViewUser(null)}
        transactions={transactionsData?.transactions || []}
        loading={transactionsLoading}
        onUpdateTransaction={handleUpdateTransaction}
        updatingTransaction={isUpdatingTransaction}
      />

      {/* Initiate Transaction Modal */}
      <InitiateTransactionModal
        user={initiateTransactionUser}
        isOpen={!!initiateTransactionUser}
        onClose={() => setInitiateTransactionUser(null)}
        onInitiate={handleInitiateTransaction}
        loading={isInitiatingTransaction}
      />

      {/* Delete User Confirmation Modal */}
      <DeleteUserConfirmationModal
        user={deleteUserConfirm}
        isOpen={!!deleteUserConfirm}
        onClose={() => setDeleteUserConfirm(null)}
        onConfirm={handleDeleteUser}
        loading={isDeletingUser}
      />

      {/* Generate Transactions Modal */}
      <GenerateTransactionsModal
        user={generateTransactionsUser}
        isOpen={!!generateTransactionsUser}
        onClose={() => setGenerateTransactionsUser(null)}
        onGenerate={handleGenerateTransactions}
        loading={isGeneratingTransactions}
      />

      {/* Edit User Modal */}
      <AnimatePresence>
        {editUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setEditUser(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex justify-between items-center">
                <h3 className="font-bold text-[#0a2540]">Edit User</h3>
                <button
                  onClick={() => setEditUser(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <FiX />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {[
                  ["firstName", "First Name"],
                  ["lastName", "Last Name"],
                  ["email", "Email"],
                  ["country", "Country"],
                  ["accountType", "Account Type"],
                  ["phone", "Phone"],
                  ["dob", "Date of Birth"],
                  ["gender", "Gender"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {label}
                    </label>
                    {key === "gender" ? (
                      <select
                        value={(editUser as any)[key] || ""}
                        onChange={(e) =>
                          setEditUser({ ...editUser, [key]: e.target.value } as any)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3] bg-white cursor-pointer"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : key === "dob" ? (
                      <input
                        type="date"
                        value={(editUser as any)[key] || ""}
                        onChange={(e) =>
                          setEditUser({ ...editUser, [key]: e.target.value } as any)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]"
                      />
                    ) : (
                      <input
                        value={(editUser as any)[key] || ""}
                        onChange={(e) =>
                          setEditUser({ ...editUser, [key]: e.target.value } as any)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]"
                      />
                    )}
                  </div>
                ))}

                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="isSuspicious"
                    checked={editUser.isSuspicious || false}
                    onChange={(e) =>
                      setEditUser({ ...editUser, isSuspicious: e.target.checked })
                    }
                    className="accent-[#13b5a3]"
                  />
                  <label
                    htmlFor="isSuspicious"
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                  >
                    <FiAlertTriangle className="text-orange-500" />
                    Mark as suspicious
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Balance
                  </label>
                  <input
                    type="number"
                    value={editUser.balance}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
                        balance: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]"
                  />
                </div>



                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setEditUser(null)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSave}
                    className="flex-1 py-2.5 bg-[#13b5a3] text-white rounded-lg text-sm font-medium hover:bg-[#0f9e8f] transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>




    </div>
  );
}
