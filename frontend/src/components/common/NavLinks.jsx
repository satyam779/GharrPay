import { motion } from "framer-motion";
import { Dropdown } from "./Dropdown";
import { ScrollLink } from "./ScrollLink";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { cn } from "../../lib/cn";
import { navItems } from "../../data/navItems";

const linkClasses =
  "group relative inline-flex items-center px-2.5 py-1 cursor-pointer font-heading text-[13px] xl:text-[15px] 2xl:text-[17px] font-semibold tracking-[0.2px] text-white transition-colors duration-300 hover:text-[#F6B400]";

const underlineClasses =
  "absolute left-2.5 -bottom-1 h-0.5 w-0 rounded-full bg-[#F6B400] transition-all duration-300 group-hover:w-[calc(100%-20px)]";

export const NavLinks = ({ className, onNavigate }) => {
  const sectionIds = navItems
    .filter((item) => item.to && !item.dropdown)
    .map((item) => item.to);
  const activeSection = useScrollSpy(sectionIds);

  return (
    <ul className={cn("flex items-center gap-1 xl:gap-1.5 2xl:gap-3", className)}>
      {navItems.map((item, idx) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + idx * 0.06, duration: 0.4, ease: "easeOut" }}
        >
          {item.dropdown ? (
            <Dropdown label={item.label} items={item.items} onNavigate={onNavigate} />
          ) : item.to ? (
            <ScrollLink
              to={item.to}
              spy
              activeSection={activeSection}
              activeClass="text-[#F6B400]"
              onClick={onNavigate}
              className={linkClasses}
            >
              {item.label}
              <span className={underlineClasses} />
            </ScrollLink>
          ) : (
            <a
              href={item.href}
              onClick={(e) => {
                if (item.href === "#") e.preventDefault();
                onNavigate?.();
              }}
              className={linkClasses}
            >
              {item.label}
              <span className={underlineClasses} />
            </a>
          )}
        </motion.li>
      ))}
    </ul>
  );
};
