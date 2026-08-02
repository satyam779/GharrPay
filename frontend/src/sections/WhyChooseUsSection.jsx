import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  HeartHandshake,
  Zap,
  CheckCircle
} from "lucide-react";
import { SectionHeading } from "../components/common/SectionHeading";

export const WhyChooseUsSection = ({ onOpenBooking }) => {
  const timelineSteps = [
    {
      step: "1",
      title: "Easy Digital Onboarding",
      description: "Book online in 2 minutes, complete paperless e-KYC, and get your digital key access instantly.",
      icon: Clock
    },
    {
      step: "2",
      title: "Biometric & 3-Tier Security",
      description: "Biometric card locks, 24/7 CCTV surveillance, and verified resident background checks.",
      icon: ShieldCheck
    },
    {
      step: "3",
      title: "Chef-Prepared Fresh Meals",
      description: "Enjoy 3 nutritious regional home-style meals daily prepared in certified hygienic kitchens.",
      icon: HeartHandshake
    },
    {
      step: "4",
      title: "Instant 2-Hour SLA Maintenance",
      description: "Raise any ticket on the app and get a certified technician at your door within 2 hours.",
      icon: Zap
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-[#FAF4E8] text-slate-800 transition-colors relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header matching reference style */}
        <SectionHeading
          tone="light"
          title="Why Choose Us?"
          subtitle="India's most trusted luxury co-living & PG brand built for modern students and tech professionals."
          className="mb-10"
        />

        <div className="text-center mb-14 -mt-2">
          <button
            onClick={onOpenBooking}
            className="btn-primary font-extrabold px-7 py-3 rounded-full text-xs cursor-pointer"
          >
            Explore Options
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Graphic Card */}
          <div className="lg:col-span-5 relative">
            <div className="card-lift bg-white rounded-3xl p-8 border border-amber-200/60 text-slate-800 space-y-6">
              <span className="bg-[#F6B400] text-[#0B4DBA] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                100% Guaranteed Living Standard
              </span>

              <h3 className="text-2xl font-extrabold text-[#0B4DBA] leading-tight">
                Hassle-Free, High Tech & Full Service Living
              </h3>

              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="GharrPay Community Illustration"
                className="rounded-2xl shadow-md w-full h-56 object-cover border border-slate-100"
              />

              <div className="space-y-2.5 pt-1">
                {["100% Deposit Refund Guarantee", "1Gbps Fiber Wi-Fi Uptime", "24/7 Resident Support Manager"].map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-700 font-semibold">
                    <CheckCircle className="w-4 h-4 text-[#0B4DBA] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Timeline Steps with Blue Circular Badges matching Reference */}
          <div className="lg:col-span-7 space-y-5">
            {timelineSteps.map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ x: 6 }}
                className="card-lift bg-white p-5 rounded-2xl border border-amber-200/50 flex items-start space-x-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#0B4DBA] text-white flex items-center justify-center font-extrabold text-base shrink-0 shadow-md">
                  {item.step}
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-[#0B4DBA]">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
