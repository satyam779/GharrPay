import React from "react";
import { motion } from "framer-motion";
import { guaranteeCards } from "../data/guaranteeData";
import { fadeInUp, staggerContainer } from "../animations/variants";
import { SectionHeading } from "../components/common/SectionHeading";

export const GuaranteeSection = () => {
  return (
    <section id="guarantee" className="py-20 bg-[#F2F6FC] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching Reference Image */}
        <SectionHeading
          tone="light"
          title="The Gharrpay Guarantee"
          subtitle="Service SLA guarantees designed so you never have to compromise."
        />

        {/* 6 Clean White Cards matching Reference Image Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {guaranteeCards.map((card) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="card-lift bg-white p-7 rounded-2xl border border-blue-100 space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B4DBA] text-[#F6B400] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <IconComp className="w-6 h-6 stroke-[2.5]" />
                </div>

                <h3 className="text-lg font-extrabold text-[#0B4DBA]">
                  {card.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
