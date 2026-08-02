import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "../data/servicesData";
import { fadeInUp, staggerContainer } from "../animations/variants";
import { SectionHeading } from "../components/common/SectionHeading";

export const ServicesGridSection = ({ onOpenBooking }) => {
  return (
    <section id="services" className="py-20 bg-[#EDF4FF] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Reference Screenshot */}
        <SectionHeading
          tone="light"
          title="Super Amenities"
          subtitle="Everything you need for an elevated living experience, all included under one simple rent."
          className="[&_h2]:uppercase"
        />

        {/* Responsive Grid with Cream/Light Beige Cards matching reference */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="card-lift bg-[#FAF4E8] rounded-2xl p-6 border border-amber-200/60 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0B4DBA] text-[#F6B400] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0B4DBA] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-200/50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#0B4DBA] uppercase tracking-wider">
                    GharrPay Premium
                  </span>
                  <button
                    onClick={onOpenBooking}
                    className="w-7 h-7 rounded-full bg-white text-[#0B4DBA] border border-amber-300 flex items-center justify-center group-hover:bg-[#0B4DBA] group-hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
