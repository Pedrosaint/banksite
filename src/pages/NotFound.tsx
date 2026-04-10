import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a2540] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#13b5a3] opacity-10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#13b5a3] opacity-10 blur-[120px] rounded-full"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="mb-12 relative inline-block">
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              delay: 0.2 
            }}
            className="text-[12rem] md:text-[18rem] font-black text-white/5 leading-none select-none"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
              className="bg-[#13b5a3] p-8 rounded-3xl shadow-[0_20px_50px_rgba(19,181,163,0.3)]"
            >
              <FiAlertCircle size={80} className="text-white" />
            </motion.div>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Oops! Page Not Found
        </h2>
        <p className="text-white/60 text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
          The link you followed may be broken, or the page may have been removed. 
          Don't worry, our secure systems are still running perfectly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#13b5a3] hover:bg-[#0f9e8f] text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl hover:shadow-[#13b5a3]/20 hover:-translate-y-1 active:scale-95 group"
          >
            <FiHome className="text-xl group-hover:scale-110 transition-transform" />
            RETURN TO HOME
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-black transition-all backdrop-blur-md hover:-translate-y-1 active:scale-95 group"
          >
            <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            GO BACK
          </button>
        </div>
        
        <div className="mt-20 flex items-center justify-center gap-8 opacity-20 text-white text-xs font-black tracking-[0.3em] uppercase">
          <span>Security Guaranteed</span>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <span>24/7 Monitoring</span>
        </div>
      </motion.div>
    </div>
  );
}
