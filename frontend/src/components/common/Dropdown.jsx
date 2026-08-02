import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollLink } from "./ScrollLink";
import { ChevronDown, MapPin, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

export const Dropdown = ({ label, items = [], onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const closeTimer = useRef(null);

  const open = () => {
    clearTimeout(closeTimer.current);
    setIsOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 150);
  };

  const cancelClose = () => clearTimeout(closeTimer.current);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onFocus={open}
        onBlur={(e) => {
          if (!containerRef.current.contains(e.relatedTarget)) setIsOpen(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsOpen(false);
            e.currentTarget.focus();
          }
        }}
        className="group relative inline-flex items-center gap-1 rounded-md px-2.5 py-1 cursor-pointer font-heading text-[13px] xl:text-[15px] 2xl:text-[17px] font-semibold tracking-[0.2px] text-white transition-colors duration-300 hover:text-[#F6B400] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B400]/70"
      >
        {label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            isOpen && "rotate-180 text-[#F6B400]"
          )}
        />
        <span className="absolute left-2.5 -bottom-1 h-0.5 w-0 rounded-full bg-[#F6B400] transition-all duration-300 group-hover:w-[calc(100%-20px)]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="absolute left-1/2 top-full z-50 mt-4 -translate-x-1/2">
            <motion.ul
              role="menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="w-60 rounded-xl bg-white p-2 shadow-[0_20px_50px_-12px_rgba(7,27,58,0.35)] ring-1 ring-black/5"
            >
              {items.map((item) => (
              <li key={item.label}>
                <ScrollLink
                  to={item.to}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate?.();
                  }}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  className="group/item flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-[#EDF4FF] hover:text-brand-500 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 shrink-0 text-brand-400 transition-colors duration-200 group-hover/item:text-[#F6B400]" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:text-brand-400" />
                </ScrollLink>
              </li>
              ))}
            </motion.ul>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
