import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

interface TransactionStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  title: string;
  message: string;
}

export default function TransactionStatusModal({
  isOpen,
  onClose,
  type,
  title,
  message,
}: TransactionStatusModalProps) {
  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative border border-gray-100"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <FiX size={20} />
            </button>

            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isSuccess ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
                }`}
            >
              {isSuccess ? (
                <FiCheckCircle size={48} className="" />
              ) : (
                <FiXCircle size={48} />
              )}
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${isSuccess ? "text-green-600" : "text-red-600"
                }`}
            >
              {title}
            </h3>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {message}
            </p>

            <button
              onClick={onClose}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 cursor-pointer ${isSuccess
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
                }`}
            >
              {isSuccess ? "Got it, thanks!" : "Try Again"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
