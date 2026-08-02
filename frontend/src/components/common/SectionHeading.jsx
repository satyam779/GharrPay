import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../animations/variants";
import { cn } from "../../lib/cn";

const tones = {
  light: {
    eyebrow: "bg-brand-50 text-brand-500 ring-brand-500/15 dark:bg-white/10 dark:text-gold-400 dark:ring-white/20",
    eyebrowIcon: "text-brand-500 dark:text-gold-400",
    title: "text-slate-900 dark:text-white",
    subtitle: "text-slate-500 dark:text-slate-300"
  },
  dark: {
    eyebrow: "bg-white/10 text-gold-400 ring-white/20",
    eyebrowIcon: "text-gold-400",
    title: "text-white",
    subtitle: "text-blue-100/80"
  },
  onGold: {
    eyebrow: "bg-white/80 text-brand-500 ring-white/40",
    eyebrowIcon: "text-brand-500",
    title: "text-brand-500",
    subtitle: "text-brand-600/80"
  }
};

export const SectionHeading = ({
  eyebrow,
  eyebrowIcon: Icon,
  title,
  highlight,
  subtitle,
  tone = "light",
  className
}) => {
  const t = tones[tone] || tones.light;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("max-w-3xl mx-auto mb-14 space-y-4 text-center", className)}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ring-1",
            t.eyebrow
          )}
        >
          {Icon && <Icon className={cn("w-4 h-4", t.eyebrowIcon)} />}
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
        <span className={t.title}>
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-gradient-gold animate-gradient-x bg-[length:200%_auto]">
                {highlight}
              </span>
            </>
          )}
        </span>
      </h2>

      {subtitle && (
        <p className={cn("text-base sm:text-lg font-normal leading-relaxed text-balance", t.subtitle)}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
