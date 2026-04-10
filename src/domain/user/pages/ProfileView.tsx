import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ProfileView() {
  const { user, balance } = useCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        Loading profile...
      </div>
    );
  }

  const maskedAccount = user.accountNumber?.replace(
    /^(\d{5})(\d+)(\d{2})$/,
    "$1******$3"
  );

  const rows: { label: string; value: string | undefined }[] = [
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Email Address", value: user.email },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Country", value: user.country },
    { label: "Address", value: user.address },
    { label: "Date of Birth", value: user.dateOfBirth },
    { label: "Account Number", value: maskedAccount },
    { label: "Account Type", value: user.accountType },
    {
      label: "Account Status",
      value: user.isSuspicious ? "Under Review" : "Active",
    },
    {
      label: "Member Since",
      value: user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        : undefined,
    },
  ];

  return (
    <div className="max-w-2xl w-full">
      {/* Header card */}
      <div className="bg-[#0a2540] rounded-md p-6 flex items-center gap-5 mb-6 text-white">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#13b5a3] flex items-center justify-center text-2xl font-bold shrink-0">
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-white/60 mt-0.5">{user.email}</p>
          <span className="inline-block mt-2 bg-[#13b5a3]/20 border border-[#13b5a3]/40 text-[#13b5a3] text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wide">
            {user.accountType}
          </span>
        </div>
        <div className="ml-auto text-right hidden sm:block">
          <p className="text-xs text-white/40 uppercase tracking-wide mb-1">
            Balance
          </p>
          <p className="text-2xl font-bold text-[#13b5a3]">
            ${balance?.toLocaleString() ?? "0.00"}
          </p>
        </div>
      </div>

      {/* Details table */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Account Information</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center px-6 py-3 text-sm">
              <span className="w-44 text-gray-500 shrink-0">{label}</span>
              <span className="text-gray-800 font-medium">{value || "—"}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        To update your information, please contact customer support.
      </p>
    </div>
  );
}
