import React from "react";
import { motion } from "framer-motion";
import { Search, Calendar, FileCheck, Key, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "../animations/variants";
import { SectionHeading } from "../components/common/SectionHeading";

export const BookingStepsSection = ({ onOpenBooking }) => {
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Browse & Virtual Tour",
      description: "Explore verified room photos, 360 virtual tours, and menu schedules.",
      icon: Search
    },
    {
      id: 2,
      number: "02",
      title: "Select Room & Visit",
      description: "Pick your preferred occupancy and schedule a live physical or video walkthrough.",
      icon: Calendar
    },
    {
      id: 3,
      number: "03",
      title: "Online KYC & Deposit",
      description: "Complete paperless digital verification & 1 month deposit.",
      icon: FileCheck
    },
    {
      id: 4,
      number: "04",
      title: "Instant Move In",
      description: "Unlock your room with digital biometric key access and enjoy!",
      icon: Key
    }
  ];

  return (
    <section className="py-20 bg-[#FAF4E8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching Reference Image */}
        <SectionHeading
          tone="light"
          title="Fast & Simple 4 Steps"
          subtitle="From online discovery to moving into your disinfected suite in 30 minutes."
        />

        {/* 4 Step Cards matching Reference Image Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="card-lift bg-white rounded-2xl p-6 border border-amber-200/60 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0B4DBA] text-[#F6B400] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <IconComp className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-2xl font-extrabold text-[#0B4DBA]/30">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#0B4DBA]">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2 rounded-xl bg-[#FAF4E8] text-[#0B4DBA] hover:bg-[#0B4DBA] hover:text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Start Step {step.number}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Big Yellow CTA Button matching Reference Image ("SCHEDULE FREE VISIT") */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="bg-[#F6B400] hover:bg-amber-400 text-[#0B4DBA] font-extrabold text-base px-10 py-4 rounded-full shadow-xl transition-transform duration-200 hover:scale-105 cursor-pointer inline-flex items-center space-x-2"
          >
            <span>SCHEDULE FREE VISIT</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
