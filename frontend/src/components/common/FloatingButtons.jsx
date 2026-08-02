import React, { useState, useEffect } from "react";
import { ArrowUp, PhoneCall, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingButtons = ({ onOpenBooking }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Floating Action Buttons Container (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 items-end">
        
        {/* Floating Book Now Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenBooking}
          className="w-13 h-13 rounded-full bg-[#F6B400] hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 cursor-pointer transition-transform group"
          title="Book Your Stay Now"
        >
          <Sparkles className="w-6 h-6 text-slate-950" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
            Book Now
          </span>
        </motion.button>

        {/* Floating Direct Call Button */}
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="tel:+919876543210"
          className="w-13 h-13 rounded-full bg-[#0B4DBA] hover:bg-blue-800 text-white flex items-center justify-center shadow-2xl shadow-blue-600/40 cursor-pointer transition-transform group"
          title="Call GharrPay Hotline"
        >
          <PhoneCall className="w-6 h-6 text-[#F6B400]" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
            Call Sales Hotline
          </span>
        </motion.a>

        {/* Back To Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-[#F6B400] hover:bg-amber-400 text-[#0B4DBA] flex items-center justify-center shadow-xl cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-6 h-6 stroke-[3]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Starting From</span>
          <span className="text-base font-extrabold text-[#0B4DBA] dark:text-[#F6B400]">₹12,900<span className="text-xs font-normal text-slate-500">/mo</span></span>
        </div>

        <button
          onClick={onOpenBooking}
          className="btn-premium font-extrabold text-sm px-6 py-2.5 rounded-xl flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Book Now</span>
        </button>
      </div>
    </>
  );
};
