import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { amenitiesList } from "../data/amenitiesData";
import { fadeInUp, staggerContainer } from "../animations/variants";
import { SectionHeading } from "../components/common/SectionHeading";

export const AmenitiesSection = ({ onOpenBooking }) => {
  return (
    <section id="amenities" className="py-20 bg-[#FAF4E8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching Reference Image */}
        <SectionHeading
          tone="light"
          title="Amenities"
          subtitle="Full-spectrum living facilities designed for maximum comfort and peace of mind."
        />

        {/* 6-8 White Cards with colorful circle icons matching reference image grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {amenitiesList.map((amenity) => {
            const IconComp = amenity.icon;
            return (
              <motion.div
                key={amenity.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="card-lift bg-white rounded-2xl p-6 border border-amber-200/60 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className={`w-13 h-13 rounded-full bg-gradient-to-r ${amenity.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <IconComp className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0B4DBA]">
                    {amenity.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {amenity.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Included Free
                  </span>
                  <span className="text-xs font-semibold text-[#0B4DBA] group-hover:translate-x-1 transition-transform">
                    Learn More →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center space-x-2 bg-[#0B4DBA] hover:bg-blue-800 text-white font-extrabold px-8 py-3 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer text-sm"
          >
            <span>Explore Facilities in Person</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
