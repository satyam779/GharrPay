import React from "react";
import { cn } from "../../lib/cn";
import { scrollToTarget } from "../../lib/smoothScroll";

export const ScrollLink = ({
  to,
  href,
  children,
  className,
  activeClass = "",
  spy = false,
  activeSection,
  onClick,
  ...rest
}) => {
  const isActive = spy && Boolean(activeSection) && activeSection === to;

  const handleClick = (e) => {
    if (to) {
      e.preventDefault();
      if (!scrollToTarget(to)) {
        document.getElementById(to)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
    onClick?.(e);
  };

  return (
    <a
      href={to ? `#${to}` : href}
      onClick={handleClick}
      aria-current={isActive ? "true" : undefined}
      className={cn(className, isActive && activeClass)}
      {...rest}
    >
      {children}
    </a>
  );
};
