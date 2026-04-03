import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers, FiUserX, FiDollarSign, FiSearch, FiEye, FiEdit2, FiTrash2, FiX, FiPlus,
} from "react-icons/fi";
import { mockUsers, mockTransactions } from "../../data/mockData";
import type { User } from "../../store/authSlice";
import type { Transaction } from "../../data/mockData";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    completed: "bg-green-50 text-green-600 border-green-200",
    pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
    failed: "bg-red-50 text-red-600 border-red-200",
  };
  return (
    <span className={`px-2 py-0.5 text-[11px] font-medium rounded-full border ${colors[status] || ""}`}>
      {status}
    </span>
  );
}

export default function AdminHome() {
  const [users, setUsers] = useState(mockUsers.filter((u) => u.role === "user"));
  const [search, setSearch] = useState("");
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [showCreditDebit, setShowCreditDebit] = useState(false);
  const [txForm, setTxForm] = useState({ amount: "", type: "credit", description: "", status: "completed" });

  const filtered = users.filter((u) =>
    u.status !== "deleted" &&
    (`${u.firstName} ${u.lastName}`).toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = users.filter((u) => u.status !== "deleted").length;
  const deletedCount = users.filter((u) => u.status === "deleted").length;
  const totalBalance = users.filter((u) => u.status !== "deleted").reduce((s, u) => s + u.balance, 0);

  const handleDelete = () => {
    if (!deleteUser) return;
    setUsers(users.map((u) => u.id === deleteUser.id ? { ...u, status: "deleted" as const } : u));
    setDeleteUser(null);
  };

  const handleEditSave = () => {
    if (!editUser) return;
    setUsers(users.map((u) => u.id === editUser.id ? editUser : u));
    setEditUser(null);
  };

  const handleCreditDebit = () => {
    if (!editUser || !txForm.amount) return;
    const amt = Number(txForm.amount);
    const newBalance = txForm.type === "credit" ? editUser.balance + amt : editUser.balance - amt;
    setEditUser({ ...editUser, balance: newBalance, availableBalance: newBalance });
    setTxForm({ amount: "", type: "credit", description: "", status: "completed" });
    setShowCreditDebit(false);
  };

  const getUserTransactions = (userId: string): Transaction[] =>
    mockTransactions.filter((t) => t.userId === userId);

  const stats = [
    { label: "Active Users", value: activeCount, icon: FiUsers, color: "text-green-600", bg: "bg-green-50" },
    { label: "Deleted Users", value: deletedCount, icon: FiUserX, color: "text-red-500", bg: "bg-red-50" },
    { label: "Total Balance", value: `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: FiDollarSign, color: "text-[#13b5a3]", bg: "bg-[#e6f7f5]" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0a2540]">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center`}>
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
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
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
                <tr key={u.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-gray-800">{u.firstName}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{u.lastName}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{u.country}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{u.accountType}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{u.phone}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setViewUser(u)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View"><FiEye /></button>
                      <button onClick={() => setEditUser({ ...u })} className="p-1.5 rounded-lg hover:bg-[#e6f7f5] text-[#13b5a3] transition-colors" title="Edit"><FiEdit2 /></button>
                      <button onClick={() => setDeleteUser(u)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400 text-sm">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Transactions Modal */}
      <AnimatePresence>
        {viewUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewUser(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
                <h3 className="font-bold text-[#0a2540]">Transactions — {viewUser.firstName} {viewUser.lastName}</h3>
                <button onClick={() => setViewUser(null)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead><tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                    <th className="px-5 py-2 font-medium">ID</th><th className="px-5 py-2 font-medium">Type</th><th className="px-5 py-2 font-medium">Amount</th>
                    <th className="px-5 py-2 font-medium">Status</th><th className="px-5 py-2 font-medium">Date</th>
                  </tr></thead>
                  <tbody>
                    {getUserTransactions(viewUser.id).map((t) => (
                      <tr key={t.id} className="border-t border-gray-100">
                        <td className="px-5 py-2.5 text-xs font-mono text-gray-500">{t.id}</td>
                        <td className="px-5 py-2.5 text-sm capitalize">{t.type}</td>
                        <td className={`px-5 py-2.5 text-sm font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-500"}`}>
                          {t.type === "credit" ? "+" : "-"}${t.amount.toFixed(2)}
                        </td>
                        <td className="px-5 py-2.5"><StatusBadge status={t.status} /></td>
                        <td className="px-5 py-2.5 text-sm text-gray-500">{t.date}</td>
                      </tr>
                    ))}
                    {getUserTransactions(viewUser.id).length === 0 && (
                      <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-400 text-sm">No transactions</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditUser(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
                <h3 className="font-bold text-[#0a2540]">Edit User</h3>
                <button onClick={() => setEditUser(null)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
              </div>
              <div className="p-5 space-y-3">
                {[
                  ["firstName", "First Name"], ["lastName", "Last Name"], ["country", "Country"],
                  ["accountType", "Account Type"], ["phone", "Phone"], ["dob", "Date of Birth"],
                  ["gender", "Gender"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                    <input value={(editUser as any)[key]} onChange={(e) => setEditUser({ ...editUser, [key]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Balance</label>
                  <input type="number" value={editUser.balance} onChange={(e) => setEditUser({ ...editUser, balance: Number(e.target.value), availableBalance: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]" />
                </div>

                <button onClick={() => setShowCreditDebit(true)} className="flex items-center gap-2 text-sm text-[#13b5a3] font-medium hover:underline mt-2">
                  <FiPlus /> Credit / Debit Account
                </button>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setEditUser(null)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleEditSave} className="flex-1 py-2.5 bg-[#13b5a3] text-white rounded-lg text-sm font-medium hover:bg-[#0f9e8f] transition-colors">Save Changes</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credit/Debit Sub-Modal */}
      <AnimatePresence>
        {showCreditDebit && editUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl w-full max-w-sm p-5 space-y-3">
              <h4 className="font-bold text-[#0a2540]">Credit / Debit</h4>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Amount ($)</label>
                <input type="number" value={txForm.amount} onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <select value={txForm.type} onChange={(e) => setTxForm({ ...txForm, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]">
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <input value={txForm.description} onChange={(e) => setTxForm({ ...txForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <select value={txForm.status} onChange={(e) => setTxForm({ ...txForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#13b5a3]">
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCreditDebit(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={handleCreditDebit} className="flex-1 py-2 bg-[#13b5a3] text-white rounded-lg text-sm font-medium hover:bg-[#0f9e8f]">Apply</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteUser(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-500 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-[#0a2540] mb-2">Delete User</h3>
              <p className="text-sm text-gray-500 mb-1">Are you sure you want to delete <strong>{deleteUser.firstName} {deleteUser.lastName}</strong>?</p>
              <p className="text-xs text-red-500 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteUser(null)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
