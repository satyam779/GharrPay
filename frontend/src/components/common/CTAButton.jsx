import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";

export const CTAButton = ({ label = "Book Now", onClick, fluid = false, className }) => {
  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      className={cn("shrink-0", fluid && "w-full", className)}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={label}
        className={cn(
          "group flex h-[46px] items-center justify-center gap-2 rounded-full px-5 xl:px-7",
          "font-heading text-sm xl:text-[15px] font-bold tracking-[0.2px]",
          "text-[#071B3A] bg-[#F6B400] hover:bg-[#ffc526] cursor-pointer",
          "shadow-[0_8px_24px_-6px_rgba(246,180,0,0.45)]",
          "transition-all duration-300 hover:shadow-[0_18px_40px_-8px_rgba(246,180,0,0.65)]",
          fluid && "w-full"
        )}
      >
        <Sparkles className="w-[18px] h-[18px] text-[#071B3A]" />
        <span className="inline whitespace-nowrap">{label}</span>
        <ArrowRight className="hidden xl:block w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </motion.button>
    </motion.div>
  );
};

