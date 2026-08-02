import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { SectionHeading } from "../components/common/SectionHeading";

export const PricingSection = ({ onOpenBooking }) => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or quarterly

  const pricingPlans = [
    {
      id: "triple",
      name: "Triple Sharing Executive",
      priceMonthly: 12900,
      priceQuarterly: 11900,
      badge: "Budget Choice",
      popular: false,
      benefits: [
        "Spacious shared room with individual lockers",
        "3 Chef-cooked meals + evening tea",
        "High-speed 1Gbps fiber Wi-Fi",
        "Daily room cleaning & laundry access",
        "Shared lounge & gaming console area"
      ]
    },
    {
      id: "double",
      name: "Twin Sharing Luxury Studio",
      priceMonthly: 14500,
      priceQuarterly: 13500,
      badge: "Most Popular",
      popular: true,
      benefits: [
        "Premium twin bed with orthopedic mattress",
        "Attached modern balcony & washroom",
        "3 Chef-cooked meals + gourmet weekend menu",
        "Dedicated study desk & ergonomic chair",
        "Full gym membership & co-working pods access",
        "Zero electricity & maintenance hassle"
      ]
    },
    {
      id: "single",
      name: "Single Private Master Suite",
      priceMonthly: 18500,
      priceQuarterly: 17200,
      badge: "Ultimate Comfort",
      popular: false,
      benefits: [
        "100% Private bedroom with king size bed",
        "Attached luxury bathroom & private kitchenette",
        "Customized meal plans (Veg & Non-Veg)",
        "VIP concierge & priority maintenance",
        "Free monthly shuttle pass to major tech parks"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <SectionHeading
          eyebrow="Transparent Pricing • Zero Brokerage"
          eyebrowIcon={Sparkles}
          title="Simple, All-Inclusive"
          highlight="Living Packages"
          subtitle="No hidden maintenance charges, no surprise electricity bills. Pay one simple monthly rent and enjoy luxury full-service stays."
        />

        {/* Billing Cycle Switcher */}
        <div className="flex items-center justify-center space-x-4 mb-16">
          <span className={`text-sm font-semibold ${billingCycle === "monthly" ? "text-[#0B4DBA] dark:text-[#F6B400]" : "text-slate-500"}`}>
            Monthly Plan
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "quarterly" : "monthly")}
            className="relative w-14 h-8 bg-[#0B4DBA] rounded-full p-1 transition-colors duration-300 focus:outline-none"
          >
            <div
              className={`w-6 h-6 bg-[#F6B400] rounded-full shadow-md transform transition-transform duration-300 ${
                billingCycle === "quarterly" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <div className="flex items-center space-x-1.5">
            <span className={`text-sm font-semibold ${billingCycle === "quarterly" ? "text-[#0B4DBA] dark:text-[#F6B400]" : "text-slate-500"}`}>
              3-Month Plan
            </span>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              Save ₹1,000/mo
            </span>
          </div>
        </div>

        {/* Image Left + Content Right Main Feature Section */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 lg:p-12 mb-16 border border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Left */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border-4 border-white dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
                alt="GharrPay Luxury Interior"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="bg-[#F6B400] text-[#0B4DBA] font-extrabold text-xs px-3 py-1 rounded-md">
                  100% Deposit Guarantee
                </span>
                <h4 className="font-extrabold text-xl">All-Inclusive Living Hub</h4>
                <p className="text-xs text-blue-100">Rent covers room, 3 meals, fiber Wi-Fi, housekeeping & power backup.</p>
              </div>
            </div>
          </div>

          {/* Content Right Explanation */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Pay Extra For Housekeeping & Bills Elsewhere?
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Traditional flat rentals charge you for security deposits (6-10 months), maid salaries, electricity bills, cook wages, and Wi-Fi connections separately. At GharrPay, we consolidate everything into one predictable bill.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#F6B400] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">1 Month Deposit Only</h4>
                  <p className="text-xs text-slate-500">Fast 7-day refund guarantee upon checkout.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                <Zap className="w-6 h-6 text-[#0B4DBA] dark:text-[#F6B400] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Zero Maintenance Fees</h4>
                  <p className="text-xs text-slate-500">Free technical repairs & daily housekeeping.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                plan.popular
                  ? "bg-gradient-to-b from-[#0B4DBA] to-blue-900 text-white shadow-2xl ring-4 ring-[#F6B400]/40 scale-105 z-10"
                  : "card-lift bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F6B400] text-[#0B4DBA] font-extrabold text-xs px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                  ★ Most Popular Plan
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    plan.popular ? "bg-white/20 text-[#F6B400]" : "bg-blue-100 text-[#0B4DBA] dark:bg-slate-800 dark:text-[#F6B400]"
                  }`}>
                    {plan.badge}
                  </span>
                  <h3 className={`text-xl font-extrabold mt-3 ${plan.popular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {plan.name}
                  </h3>
                </div>

                {/* Price Display */}
                <div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-extrabold">
                      ₹{(billingCycle === "monthly" ? plan.priceMonthly : plan.priceQuarterly).toLocaleString()}
                    </span>
                    <span className={`text-sm ${plan.popular ? "text-blue-200" : "text-slate-500"}`}>
                      / month
                    </span>
                  </div>
                  <span className={`text-xs block mt-1 ${plan.popular ? "text-blue-200" : "text-slate-400"}`}>
                    Includes food, Wi-Fi & daily cleaning
                  </span>
                </div>

                {/* Benefits list */}
                <ul className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs leading-relaxed">
                      <div className={`p-1 rounded-full shrink-0 mt-0.5 ${
                        plan.popular ? "bg-[#F6B400] text-[#0B4DBA]" : "bg-emerald-500 text-white"
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className={plan.popular ? "text-blue-100" : "text-slate-600 dark:text-slate-300"}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-sm shadow-lg transition-transform duration-200 hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? "bg-[#F6B400] hover:bg-amber-400 text-[#0B4DBA]"
                      : "bg-[#0B4DBA] hover:bg-blue-800 text-white"
                  }`}
                >
                  <span>Book This Room</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
