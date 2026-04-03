import { useSelector } from "react-redux";
import { FiShield, FiCamera, FiLock, FiKey } from "react-icons/fi";
import type { RootState } from "../../store";

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-700">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function Profile() {
  const { user } = useSelector((s: RootState) => s.auth);
  if (!user) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0a2540]">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-[#13b5a3] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <h3 className="font-bold text-[#0a2540] text-lg">{user.firstName} {user.lastName}</h3>
            <span className="inline-block mt-1 bg-green-50 text-green-600 border border-green-200 text-[10px] font-medium px-3 py-0.5 rounded-full uppercase">
              {user.status}
            </span>
            <div className="text-xs text-gray-500 mt-2 font-mono">{user.accountNumber}</div>
          </div>

          <div className="space-y-4">
            <ProgressBar label="Profile Completion" value={user.profileCompletion} color="#13b5a3" />
            <ProgressBar label="Account Security" value={user.accountSecurity} color="#0a2540" />
            <ProgressBar label="Verification" value={user.verification} color="#e8b84b" />
          </div>

          <div className="mt-6 space-y-2">
            {[
              { icon: FiLock, label: "Change Password" },
              { icon: FiKey, label: "Change PIN" },
              { icon: FiCamera, label: "Update Photo" },
            ].map((action) => (
              <button key={action.label} className="w-full flex items-center gap-3 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <action.icon className="text-[#13b5a3]" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-6">
            <FiShield className="text-[#13b5a3]" />
            <h3 className="font-bold text-[#0a2540] text-lg">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["Email", user.email],
              ["Phone", user.phone],
              ["First Name", user.firstName],
              ["Last Name", user.lastName],
              ["Date of Birth", user.dob],
              ["Country", user.country],
              ["Address", user.address],
              ["Gender", user.gender],
            ].map(([label, value]) => (
              <div key={label} className="space-y-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
                <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
