import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlus, FiSend, FiCopy, FiCheck } from "react-icons/fi";
import type { RootState } from "../../store";
import { mockTransactions } from "../../data/mockData";

function BankCard({ user }: { user: any }) {
  const [flipped, setFlipped] = useState(false);
  const masked = user.accountNumber.slice(0, 4) + " •••• •••• " + user.accountNumber.slice(-4);

  return (
    <div
      className="perspective-[1000px] w-full max-w-sm cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-48 sm:h-52"
      >
        {/* Front */}
        <div className="absolute inset-0 bg-[#0a2540] rounded-2xl p-5 sm:p-6 text-white backface-hidden">
          <div className="flex justify-between items-start mb-6 sm:mb-8">
            <div className="text-lg font-bold">Nova<span className="text-[#13b5a3]">Trust</span></div>
            <div className="w-10 h-7 bg-[#e8b84b] rounded" />
          </div>
          <div className="text-sm sm:text-base tracking-[0.2em] font-mono mb-4 sm:mb-6">{masked}</div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Card Holder</div>
              <div className="text-sm font-medium">{user.firstName} {user.lastName}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-400 uppercase">Expires</div>
              <div className="text-sm">09/28</div>
            </div>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 bg-[#0a2540] rounded-2xl text-white backface-hidden" style={{ transform: "rotateY(180deg)" }}>
          <div className="h-10 bg-gray-700 mt-6" />
          <div className="px-6 mt-4">
            <div className="bg-gray-200 h-8 rounded flex items-center justify-end px-3 text-sm text-gray-800 font-mono">
              •••
            </div>
            <p className="text-[10px] text-gray-500 mt-3">
              This card is property of NovaTrust Credit Union. If found, please return to the nearest branch.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

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

export default function UserHome() {
  const { user } = useSelector((s: RootState) => s.auth);
  const [copied, setCopied] = useState(false);
  if (!user) return null;

  const transactions = mockTransactions.filter((t) => t.userId === user.id);
  const maskedAcct = user.accountNumber.slice(0, 5) + "•••••" + user.accountNumber.slice(-2);

  const copyAccount = () => {
    navigator.clipboard.writeText(user.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0a2540]">Financial Overview</h1>
          <p className="text-sm text-gray-500">Manage your accounts and track transactions</p>
        </div>
        <div className="flex gap-2">
          <Link to="/user/dashboard/deposit" className="flex items-center gap-1.5 bg-[#13b5a3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0f9e8f] transition-colors">
            <FiPlus className="text-sm" /> Add Deposit
          </Link>
          <Link to="/user/dashboard/transfer" className="flex items-center gap-1.5 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FiSend className="text-sm" /> Make Transfer
          </Link>
        </div>
      </div>

      {/* Balance + Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="text-sm text-gray-500 mb-1">Total Balance</div>
          <div className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-1">
            ${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-gray-400">
            Available: ${user.availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-6">
            <BankCard user={user} />
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-4">
          <h3 className="font-bold text-[#0a2540] text-lg">Account Details</h3>
          <div className="space-y-3">
            {[
              ["Account Name", `${user.firstName} ${user.lastName}`],
              ["Account Type", user.accountType],
              ["Balance", `$${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`],
              ["Account Number", maskedAcct],
              ["Swift Code", user.swiftCode],
              ["Status", user.status],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-medium text-[#0a2540] flex items-center gap-2">
                  {value}
                  {label === "Account Number" && (
                    <button onClick={copyAccount} className="text-gray-400 hover:text-[#13b5a3] transition-colors">
                      {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                    </button>
                  )}
                  {label === "Status" && (
                    <span className="bg-green-50 text-green-600 border border-green-200 text-[10px] font-medium px-2 py-0.5 rounded-full uppercase">
                      {value}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <h3 className="font-bold text-[#0a2540] text-lg">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                <th className="px-5 py-3 font-medium">Reference</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm font-mono text-gray-600">{t.reference}</td>
                  <td className="px-5 py-3 text-sm capitalize text-gray-700">{t.type}</td>
                  <td className={`px-5 py-3 text-sm font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-500"}`}>
                    {t.type === "credit" ? "+" : "-"}${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{t.description}</td>
                  <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-5 py-3 text-sm text-gray-500">{t.date}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400 text-sm">No transactions found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
