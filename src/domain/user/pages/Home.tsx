import { useState } from "react";
import { toast } from "sonner";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  useTransferMutation,
  useGetUserTransactionsQuery,
} from "../api/userApi";
import { useCurrentUser } from "../hooks/useCurrentUser";
import TransferModal from "../components/TransferModal";
import type { TransferRequest, TransferResponse } from "../types";

// Define transaction type for better type safety
interface Transaction {
  id: string;
  type: string;
  amount: number;
  date?: string;
  createdAt?: string;
  status: string;
  description?: string;
}

export default function UserHome() {
  const { user, balance } = useCurrentUser();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transfer, { isLoading }] = useTransferMutation();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetUserTransactionsQuery(user?.id || "");
  const transactions: Transaction[] = transactionsData?.transactions || [];
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTransfer = async (
    transferData: TransferRequest,
  ): Promise<TransferResponse> => {
    try {
      const result = await transfer(transferData).unwrap();
      if (result.success) {
        // Close modal
        setShowTransferModal(false);
        // Return the result for further processing
        return result;
      }
      throw new Error(result.message || "Transfer failed");
    } catch (error: unknown) {
      console.error("Failed to transfer:", error);
      throw new Error("Transfer failed");
    }
  };



  const maskedAccountNumber = user.accountNumber.replace(
    /^(\d{5})(\d+)(\d{2})$/,
    "$1******$3",
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="">
        <div className="w-full flex flex-col md:flex-col lg:flex-col xl:flex-row gap-3 md:gap-6">
          {/* Balance card */}
          <div className="w-full flex flex-col gap-6">
            <div className="flex gap-5 md:gap-20 flex-col md:flex-row">
              <div>
                <p className="text-gray-500">Total Balance</p>
                <h2 className="text-3xl font-bold">
                                    ${balance.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                </h2>
              </div>
              <div>
                <p className="text-gray-500">Available Balance</p>
                <h2 className="text-3xl font-bold">
                                    ${balance.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                </h2>
              </div>
            </div>

            <div className="w-full md:w-85 h-47 perspective">
              <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
                {/* Front of the card */}
                <div className="absolute w-full h-full backface-hidden bg-[#0f9e8f] text-white rounded-lg p-4 shadow cursor-pointer">
                  <div className="flex justify-end">
                    <span className="font-bold text-lg">
                                        ${balance.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                    </span>
                  </div>
                  <div className="mt-6 text-xl tracking-widest text-center font-semibold">
                    {user.accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="mt-4 text-lg">
                      <p className="uppercase text-[55%]">Card Holder</p>
                      <p className="font-bold">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <div className="mt-2 text-lg">
                      <p className="uppercase text-[55%]">Expires</p>
                      <p className="font-bold">
                        {(() => {
                          const d = new Date();
                          d.setFullYear(d.getFullYear() + 1);
                          return `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
                        })()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back of the card */}
                <div className="cursor-pointer absolute w-full h-full backface-hidden rotate-y-180 bg-[#0f9e8f] text-white rounded-lg p-4 shadow flex flex-col justify-between">
                  <div className="h-10 bg-black rounded-sm mt-2"></div>
                  <div className="mt-6 relative">
                    <div className="bg-white h-8 flex items-center px-2 pr-10 text-black text-sm italic bg-[repeating-linear-gradient(45deg,white,white_5px,#ccc_5px,#ccc_10px)] rounded-sm">
                      Signature
                    </div>
                    <div className="absolute right-2 top-0 bottom-0 flex items-center bg-white px-2 text-black font-bold rounded-sm">
                      934
                    </div>
                  </div>
                  <div className="flex justify-between items-end text-xs opacity-50 mt-8">
                    <span className="text-white font-light">
                      AMERICAN CREDIT
                    </span>
                    <span className="text-white font-bold text-base">VISA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white p-4 rounded w-full shadow-md mb-5">
            <h2 className="text-xl font-semibold w-full mb-4">
              Account Details
            </h2>
            <div className="space-y-2 text-sm w-full">
              <div className="flex justify-between">
                <span>Account Name :</span>
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Balance :</span>
                <span>                  ${balance.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}</span>
              </div>
              <div className="flex justify-between">
                <span>Account Type :</span>
                <span>{user.accountType}</span>
              </div>
              <div className="flex justify-between">
                <span>Account Number :</span>
                <span>{maskedAccountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Swift Code :</span>
                <span>REDACTED</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
                <IoIosAddCircleOutline size={15} className="font-bold" />
                <span className="uppercase text-[75%]">Delete Card</span>
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                  toast.info("Please follow the instructions to initiate your deposit.");
                }}
                className="bg-[#13b5a3] text-white px-4 py-2 rounded cursor-pointer"
              >
                <span className="uppercase text-[75%]">Fund Card</span>
              </button>
            </div>

            {showModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Deposit Request</h3>
                    <button
                      onClick={() => closeModal()}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700">
                      Please contact customer care to initiate your deposit
                    </p>
                    <p className="mt-4 text-gray-600 text-sm">
                      Email:{" "}
                      <a href="mailto:customercare@amerafirste.org" className="text-[#13b5a3] hover:underline">
                        customercare@amerafirste.org
                      </a>
                      <br />
                      Phone:{" "}
                      <a href="tel:+14094442555" className="text-[#13b5a3] hover:underline">
                        +1 (409) 444-2555
                      </a>
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => closeModal()}
                      className="bg-[#0f9e8f] text-white px-4 py-2 rounded-md hover:bg-[#0d8a7a] transition cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-white rounded shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>

          {transactionsLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No transactions found
            </div>
          ) : (() => {
            const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
            const paginated = transactions.slice(
              (currentPage - 1) * PAGE_SIZE,
              currentPage * PAGE_SIZE,
            );
            return (
              <>
                <div className="w-full overflow-x-auto">
                  <table className="min-w-200 w-full text-xs text-left text-gray-700 border-separate border-spacing-y-1">
                    <thead className="bg-[#F5F6FA] text-gray-500 font-medium border-b border-gray-300">
                      <tr>
                        <th className="py-2 px-2">REFERENCE ID</th>
                        <th className="px-2">TYPE</th>
                        <th className="px-2">AMOUNT</th>
                        <th className="px-2">STATUS</th>
                        <th className="px-2">DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((transaction: Transaction) => (
                        <tr
                          key={transaction.id}
                          className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-2 px-2">#{transaction.id.slice(0, 8)}</td>
                          <td className="px-2 capitalize">{transaction.type}</td>
                          <td
                            className={`px-2 ${
                              transaction.type === "transfer" || transaction.type === "debit"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {transaction.type === "transfer" || transaction.type === "debit" ? "-" : "+"}$
                            {Math.abs(transaction.amount).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                transaction.status === "completed" || transaction.status === "success"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-2">
                            {new Date(transaction.createdAt || transaction.date || "").toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (() => {
                  const pages: (number | "...")[] = [];
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else {
                    pages.push(1);
                    if (currentPage > 3) pages.push("...");
                    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                      pages.push(i);
                    }
                    if (currentPage < totalPages - 2) pages.push("...");
                    pages.push(totalPages);
                  }

                  return (
                    <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                      <span>
                        Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, transactions.length)} of {transactions.length}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          Prev
                        </button>
                        {pages.map((page, i) =>
                          page === "..." ? (
                            <span key={`ellipsis-${i}`} className="px-2 py-1 text-gray-400 select-none">…</span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 rounded border transition-colors cursor-pointer ${
                                page === currentPage
                                  ? "bg-[#13b5a3] text-white border-[#13b5a3]"
                                  : "border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              {page}
                            </button>
                          )
                        )}
                        <button
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </>
            );
          })()}
        </div>
      </div>

      {/* Transfer Modal */}
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onTransfer={handleTransfer}
        loading={isLoading}
        currentBalance={balance}
      />
    </div>
  );
}
