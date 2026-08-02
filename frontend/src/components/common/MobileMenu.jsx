import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, MapPin, PhoneCall } from "lucide-react";
import { navItems } from "../../data/navItems";
import { CTAButton } from "./CTAButton";
import { ScrollLink } from "./ScrollLink";
import { stopSmoothScroll, startSmoothScroll } from "../../lib/smoothScroll";
import { cn } from "../../lib/cn";

export const MobileMenu = ({ isOpen, onClose, onOpenBooking }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      stopSmoothScroll();
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      startSmoothScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const handleNavigate = () => {
    setOpenAccordion(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.button
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-pointer bg-[#071B3A]/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile navigation"
            className="absolute right-0 top-0 flex h-full w-[86%] max-w-[400px] flex-col bg-[#071B3A] shadow-2xl"
          >
            {/* Drawer header */}
            <div className="flex h-[80px] shrink-0 items-center justify-between px-5">
              <img src="/logo.png" alt="GharrPay" className="h-20 w-auto object-contain" />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:bg-white/10 hover:text-[#F6B400]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable nav list */}
            <nav className="flex-1 overflow-y-auto px-4 py-2">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isAccordion = item.dropdown;
                  const active = openAccordion === item.id;

                  return (
                    <li key={item.id}>
                      {isAccordion ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={active}
                            onClick={() => setOpenAccordion(active ? null : item.id)}
                            className="flex w-full items-center justify-between rounded-xl px-3.5 py-3.5 font-heading text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/5"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 text-white/60 transition-transform duration-300",
                                active && "rotate-180 text-[#F6B400]"
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {active && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <li className="mx-2 my-1 overflow-hidden rounded-xl bg-white/[0.06]">
                                  <ul className="py-1.5">
                                    {item.items.map((sub) => (
                                      <li key={sub.label}>
                                        <ScrollLink
                                          to={sub.to}
                                          onClick={handleNavigate}
                                          className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-white/85 transition-colors duration-200 hover:bg-white/[0.04] hover:text-[#F6B400]"
                                        >
                                          <MapPin className="h-4 w-4 shrink-0 text-[#F6B400]/80" />
                                          {sub.label}
                                        </ScrollLink>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : item.to ? (
                        <ScrollLink
                          to={item.to}
                          onClick={handleNavigate}
                          className="block rounded-xl px-3.5 py-3.5 font-heading text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#F6B400]"
                        >
                          {item.label}
                        </ScrollLink>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            if (item.href === "#") e.preventDefault();
                            handleNavigate();
                          }}
                          className="block rounded-xl px-3.5 py-3.5 font-heading text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#F6B400]"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Drawer footer actions */}
            <div className="shrink-0 space-y-3 border-t border-white/10 px-5 py-5">
              <CTAButton fluid onClick={() => { onClose(); onOpenBooking?.(); }} />
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking?.();
                }}
                className="flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-brand-500 font-heading text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-400"
              >
                Book a Free Site Visit
              </button>
              <a
                href="tel:+919876543210"
                className="flex h-[46px] w-full items-center justify-center gap-2 rounded-full border border-white/15 font-heading text-sm font-semibold text-white/90 transition-colors duration-300 hover:bg-white/5"
              >
                <PhoneCall className="h-4 w-4 text-[#F6B400]" />
                +91 98765 43210
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
