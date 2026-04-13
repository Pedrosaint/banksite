import { useState } from "react";
import { toast } from "sonner";

const DepositView = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Wire Transfer");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    toast.info("Please follow the instructions in the modal to complete your deposit.");
  };

  const closeModal = () => {
    setShowModal(false);
    setAmount("");
    setMethod("Wire Transfer");
  };

  return (
    <>
      <div className="max-w-2xl w-full mt-10 bg-white p-8 rounded-md shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-6">
          Deposit form
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Deposit Amount */}
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deposit Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none"
              required
            />
          </div>

          {/* Deposit Method */}
          <div className="mb-6">
            <label
              htmlFor="method"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Preferred Deposit Method
            </label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none"
            >
              <option>Wire Transfer</option>
              <option>Bank Deposit</option>
              <option>Mobile Money</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-[#0f9e8f] text-white px-4 py-2 rounded-md transition duration-200 cursor-pointer"
          >
            Continue
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Deposit Request</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">
                Please contact customer care to initiate your deposit of{" "}
                <span className="font-bold">${amount}</span> via{" "}
                <span className="font-bold">{method}</span>.
              </p>
              <p className="mt-4 text-gray-600 text-sm">
                Customer care: https://www.wellsfargo.com | [Phone Removed]
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[#0f9e8f] text-white px-4 py-2 rounded-md transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DepositView;
