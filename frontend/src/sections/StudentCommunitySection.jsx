import React from "react";
import { motion } from "framer-motion";
import { Star, Users, ArrowRight, Quote } from "lucide-react";
import { communityData } from "../data/communityData";

export const StudentCommunitySection = ({ onOpenBooking }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#F6B400]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content + Rating + CTA */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#F6B400]">
              <Users className="w-4 h-4" />
              <span>Thriving Community Hub</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              More Than Just a Room. <br />
              <span className="bg-gradient-to-r from-[#F6B400] via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                A Lifelong Community.
              </span>
            </h2>

            <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
              Connect with fellow software developers, designers, startup founders, and graduate students. Build friendships, find co-founders, and enjoy unforgettable weekend activities.
            </p>

            {/* Rating Banner */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-[#F6B400]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F6B400]" />
                ))}
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">{communityData.rating}</div>
                <div className="text-xs text-blue-200">Verified resident satisfaction survey</div>
              </div>
            </div>

            {/* Bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {communityData.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-blue-100">
                  <div className="w-2 h-2 rounded-full bg-[#F6B400]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenBooking}
                className="bg-gradient-to-r from-[#F6B400] to-amber-500 hover:from-amber-400 hover:to-amber-600 text-[#0B4DBA] font-extrabold text-base px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 cursor-pointer"
              >
                <span>Join GharrPay Community</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

          </div>

          {/* Right Column: Masonry Image Gallery & Mini Testimonial Bubble */}
          <div className="lg:col-span-6 relative">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={communityData.galleryImages[0]}
                  alt="Community Event 1"
                  className="rounded-3xl shadow-2xl w-full h-56 object-cover hover:scale-105 transition-transform duration-500 border-2 border-white/10"
                />
                <img
                  src={communityData.galleryImages[1]}
                  alt="Community Event 2"
                  className="rounded-3xl shadow-2xl w-full h-44 object-cover hover:scale-105 transition-transform duration-500 border-2 border-white/10"
                />
              </div>

              <div className="space-y-4 pt-6">
                <img
                  src={communityData.galleryImages[2]}
                  alt="Community Event 3"
                  className="rounded-3xl shadow-2xl w-full h-44 object-cover hover:scale-105 transition-transform duration-500 border-2 border-white/10"
                />
                <img
                  src={communityData.galleryImages[3]}
                  alt="Community Event 4"
                  className="rounded-3xl shadow-2xl w-full h-56 object-cover hover:scale-105 transition-transform duration-500 border-2 border-white/10"
                />
              </div>
            </div>

            {/* Floating Quote Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl text-center max-w-sm w-full hidden sm:block">
              <Quote className="w-6 h-6 text-[#F6B400] mx-auto mb-1 opacity-80" />
              <p className="text-xs text-slate-200 italic">
                "Made my best friends in Bangalore during GharrPay rooftop FIFA night!"
              </p>
              <span className="text-[10px] font-bold text-[#F6B400] mt-1 block">— Siddharth, Resident since 2024</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
