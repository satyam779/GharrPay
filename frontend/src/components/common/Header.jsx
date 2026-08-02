import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { CTAButton } from "./CTAButton";
import { ScrollLink } from "./ScrollLink";

export const Header = ({ onOpenBooking, isDarkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 bg-black/40 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.45)]"
      >
        <div className="mx-auto mt-3 w-[94%] max-w-[1500px] sm:mt-4 lg:w-[92%]">
          <div className="flex h-[80px] items-center justify-between px-4 sm:px-6 lg:px-7 md:h-[92px]">
            {/* Logo */}
            <ScrollLink
              to="hero"
              aria-label="GharrPay – Home"
              className="flex shrink-0 cursor-pointer items-center pl-1 sm:pl-2"
            >
              <img
                src="/logo.png"
                alt="GharrPay"
                className="h-12 w-auto object-contain md:h-[80px]"
              />
            </ScrollLink>

            {/* Desktop Center Navigation */}
            <nav className="hidden lg:block" aria-label="Primary">
              <NavLinks />
            </nav>

            {/* Right: Dark mode + CTA */}
            <div className="hidden items-center gap-3 lg:flex xl:gap-4">
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-[#F6B400] hover:bg-white/10"
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-[#F6B400]" /> : <Moon className="h-4 w-4" />}
              </button>
              <CTAButton onClick={onOpenBooking} />
            </div>

            {/* Mobile: Dark mode + Hamburger */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:bg-white/10"
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-[#F6B400]" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenBooking={onOpenBooking}
      />
    </>
  );
};
