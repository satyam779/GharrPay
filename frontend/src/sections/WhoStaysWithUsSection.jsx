import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { whoStaysData } from "../data/whoStaysData";
import { fadeInUp, staggerContainer } from "../animations/variants";
import { SectionHeading } from "../components/common/SectionHeading";

export const WhoStaysWithUsSection = ({ onOpenBooking }) => {
  return (
    <section className="py-20 bg-[#F6B400] text-slate-900 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header matching Reference Image (Yellow Background Section) */}
        <SectionHeading
          tone="onGold"
          title="Who stays with us?"
          subtitle="Custom living spaces designed for your exact lifestyle and professional phase."
        />

        {/* Demographics White Cards Grid matching Reference Image */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {whoStaysData.map((item) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="card-lift bg-white rounded-2xl p-5 shadow-lg border border-amber-300 flex flex-col justify-between text-slate-800"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B4DBA] text-[#F6B400] flex items-center justify-center font-bold shadow-md">
                    <IconComp className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#0B4DBA]">
                    {item.category}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-[#0B4DBA] block">
                    {item.count}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA button matching reference screenshot */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="bg-[#0B4DBA] hover:bg-blue-900 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl transition-transform duration-200 hover:scale-105 cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Book Your Stay Today</span>
            <ArrowRight className="w-4 h-4 text-[#F6B400]" />
          </button>
        </div>

      </div>
    </section>
  );
};
