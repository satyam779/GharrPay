import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { tenantCenterCards } from "../data/tenantCenterData";
import { fadeInUp, staggerContainer } from "../animations/variants";
import { SectionHeading } from "../components/common/SectionHeading";

export const TenantCenterSection = ({ onOpenBooking }) => {
  return (
    <section id="tenant-center" className="py-20 bg-[#F4F6FB] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching Reference Image */}
        <SectionHeading
          tone="light"
          title="Tenant / Resident Portal"
          subtitle="Manage your entire stay from your phone. Rent payments, maintenance tickets, and rules."
        />

        {/* Tenant Cards Grid matching Reference Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Illustration Graphic Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-xl space-y-5 text-center">
              <span className="bg-[#F6B400] text-[#0B4DBA] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                Digital Self-Service
              </span>

              <h3 className="text-2xl font-extrabold text-[#0B4DBA]">
                GharrPay Resident App
              </h3>

              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                alt="Tenant Portal Illustration"
                className="rounded-2xl w-full h-52 object-cover border border-slate-100 shadow-md"
              />

              <div className="space-y-2 text-left pt-2">
                {["Instant 1-Click Rent UPI Payments", "2-Hour SLA Maintenance Ticket Dispatch", "Digital KYC & E-Agreement Downloads"].map((text, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0B4DBA] shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full bg-[#0B4DBA] hover:bg-blue-800 text-white font-extrabold py-3 rounded-xl shadow-md text-xs transition-transform duration-200 hover:scale-105 cursor-pointer"
              >
                Access Tenant Portal
              </button>
            </div>
          </div>

          {/* Right Cards List */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {tenantCenterCards.slice(0, 4).map((card) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="bg-[#FAF4E8] rounded-2xl p-5 border border-amber-200/60 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#0B4DBA] text-[#F6B400] flex items-center justify-center font-bold shadow-md">
                      <IconComp className="w-5 h-5 stroke-[2.5]" />
                    </div>

                    <h4 className="text-base font-extrabold text-[#0B4DBA]">
                      {card.title}
                    </h4>

                    <p className="text-slate-600 text-xs leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-amber-200/40">
                    <button
                      onClick={onOpenBooking}
                      className="text-xs font-extrabold text-[#0B4DBA] hover:underline inline-flex items-center space-x-1"
                    >
                      <span>{card.ctaText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
