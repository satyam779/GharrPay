import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Star,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Wifi,
  UtensilsCrossed,
  MapPin,
  ChevronDown
} from "lucide-react";

const keyBenefits = [
  { icon: ShieldCheck, label: "Zero Brokerage Deposit" },
  { icon: UtensilsCrossed, label: "3 Daily Home Meals" },
  { icon: Wifi, label: "1Gbps Fiber Wi-Fi" }
];

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
];

export const HeroSection = ({ onOpenBooking }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] bg-gradient-to-b from-[#0B4DBA] via-[#09419E] to-[#062E73] text-white pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient Soft Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] md:w-[750px] h-[300px] sm:h-[400px] bg-blue-400/15 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-5 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-amber-400/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center py-2 sm:py-6">
          
          {/* ============ Left Content Column ============ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-[#FFD75C] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F6B400] shrink-0" />
              <span>India's Premium Student & Executive Co-Living</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.18] sm:leading-[1.15]">
              Experience Modern Living <br className="hidden sm:inline" />
              <span className="text-[#F6B400]">in Prime Locations.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-blue-100/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Fully furnished luxury private suites with 3 daily home-style meals, 1Gbps fiber Wi-Fi, 
              housekeeping, and zero brokerage terms.
            </p>

            {/* Key Benefits List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 pt-1">
              {keyBenefits.map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm border border-white/15 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium text-white"
                >
                  <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F6B400] shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons (Full width on mobile for easy tapping) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-[#F6B400] hover:bg-[#ffc526] text-[#071B3A] font-bold text-sm sm:text-base px-7 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-black/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-95"
              >
                <span>Book Your Stay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl backdrop-blur-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-[#F6B400]" />
                <span>Call Sales Desk</span>
              </a>
            </div>

            {/* Social Proof */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {avatars.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="Resident"
                      className="w-7 h-7 rounded-full border border-blue-900 object-cover"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#F6B400] fill-[#F6B400]" />
                  ))}
                  <span className="font-bold text-white ml-1">4.9/5</span>
                </div>
              </div>
              <span className="text-blue-200 text-[11px] sm:text-xs">Trusted by 2,500+ Happy Residents</span>
            </div>
          </motion.div>

          {/* ============ Right Visual Column ============ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-sm sm:max-w-md bg-black/20 backdrop-blur-md border border-white/20 p-2 sm:p-2.5 rounded-2xl shadow-2xl">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
                  alt="GharrPay Luxury Room"
                  className="w-full h-[260px] xs:h-[300px] sm:h-[380px] object-cover"
                />
                
                {/* Status Tag */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Instant Move-in</span>
                </div>

                {/* Bottom Card Caption */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 p-3 sm:p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white">
                  <div className="flex items-center justify-between text-xs text-blue-200 font-medium mb-1">
                    <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                      <MapPin className="w-3.5 h-3.5 text-[#F6B400]" /> Koramangala, Bengaluru
                    </span>
                    <span className="text-[10px] text-[#F6B400] bg-[#F6B400]/15 border border-[#F6B400]/30 px-1.5 py-0.5 rounded font-semibold">
                      Featured
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-white">Executive Luxury Suite</h3>
                      <p className="text-[10px] sm:text-[11px] text-blue-200">3 Meals + 1Gbps Wi-Fi Included</p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <span className="text-sm sm:text-base font-extrabold text-white">₹14,500</span>
                      <span className="text-[9px] sm:text-[10px] text-blue-200 block">/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ============ Trust Guarantee Strip ============ */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/15 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center md:justify-between gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-medium text-blue-100">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6B400] shrink-0" />
            <span>100% Refundable Deposit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6B400] shrink-0" />
            <span>Daily Housekeeping</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6B400] shrink-0" />
            <span>Biometric Security</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6B400] shrink-0" />
            <span>24/7 On-Site Manager</span>
          </div>
          <div className="flex items-center gap-2 col-span-2 sm:col-span-1 justify-center sm:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6B400] shrink-0" />
            <span>Zero Brokerage</span>
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <a
        href="#properties"
        className="mt-4 mx-auto hidden lg:flex flex-col items-center gap-1 text-blue-200/70 hover:text-white transition-colors text-[11px]"
        aria-label="Scroll down"
      >
        <span>Explore Properties</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};

