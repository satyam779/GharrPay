import React from "react";
import * as CountUpModule from "react-countup";
import { useInView } from "react-intersection-observer";
import { Building2, CalendarCheck, Smile, Home } from "lucide-react";
import { SectionHeading } from "../components/common/SectionHeading";

const CountUp = CountUpModule.default ?? CountUpModule;

export const StatisticsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const stats = [
    {
      id: 1,
      number: 4000,
      suffix: "+",
      label: "Users",
      sublabel: "Across 4 Major Cities",
      icon: Home
    },
    {
      id: 2,
      number: 200,
      suffix: "+",
      label: "Properties",
      sublabel: "Fully Managed PGs & Suites",
      icon: Building2
    },
    {
      id: 3,
      number: 10000,
      suffix: "+",
      label: "Bookings",
      sublabel: "Zero Brokerage Charged",
      icon: CalendarCheck
    },
    {
      id: 4,
      number: 5000,
      suffix: "+",
      label: "Happy Customers",
      sublabel: "98.5% Renewal Rate",
      icon: Smile
    }
  ];

  return (
    <section className="py-20 bg-[#0B4DBA] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        
        <SectionHeading
          tone="dark"
          title="We Deliver Demands!"
          subtitle="India's most loved tech-enabled co-living network."
          className="mb-12 max-w-2xl [&_h2]:uppercase"
        />

        {/* 4 Statistics Cards matching Reference Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComp = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-blue-800/60 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30 text-center hover:bg-blue-800/80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F6B400] text-[#0B4DBA] flex items-center justify-center shadow-md">
                  <IconComp className="w-6 h-6 stroke-[2.5]" />
                </div>

                <div className="text-4xl font-extrabold text-white tracking-tight">
                  {inView ? (
                    <CountUp start={0} end={stat.number} duration={2.5} separator="," />
                  ) : (
                    "0"
                  )}
                  {stat.suffix}
                </div>

                <div className="text-base font-bold text-[#F6B400] uppercase tracking-wider">{stat.label}</div>
                <div className="text-[11px] text-blue-200 font-medium">{stat.sublabel}</div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
