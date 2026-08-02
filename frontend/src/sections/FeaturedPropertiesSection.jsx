import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Eye
} from "lucide-react";
import { featuredProperties } from "../data/propertiesData";
import { fadeInUp, staggerContainer } from "../animations/variants";
import { SectionHeading } from "../components/common/SectionHeading";

export const FeaturedPropertiesSection = ({ onOpenBooking }) => {
  const [selectedProperty, setSelectedProperty] = useState(featuredProperties[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <section id="properties" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Handpicked Signature Living"
          eyebrowIcon={Sparkles}
          title="Featured GharrPay"
          highlight="PGs & Suites"
          subtitle="Explore our flagship properties equipped with high-speed fiber internet, daily chef dining, ergonomic work hubs, and 24/7 security."
        />

        {/* Featured Showcase Main Spotlight Layout */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 lg:p-8 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center card-lift">
          
          {/* Left: Large Interactive Gallery View */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 group">
              <img
                src={selectedProperty.gallery[activeImageIndex] || selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#F6B400] text-[#0B4DBA] font-extrabold text-xs px-3.5 py-1 rounded-full shadow-md">
                {selectedProperty.badge}
              </div>
              
              <div className="absolute bottom-4 right-4 bg-slate-950/70 text-white backdrop-blur-md px-3 py-1 rounded-lg text-xs flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5 text-[#F6B400]" />
                <span>Hover Gallery Thumbnails</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {selectedProperty.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#F6B400] scale-105 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Property thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Property Details Panel */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0B4DBA] dark:text-[#F6B400] bg-blue-50 dark:bg-slate-900 px-3 py-1 rounded-md uppercase tracking-wider">
                {selectedProperty.type}
              </span>

              <div className="flex items-center space-x-1 text-amber-500 bg-amber-50 dark:bg-slate-900 px-2.5 py-1 rounded-md text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{selectedProperty.rating} ({selectedProperty.reviewsCount} reviews)</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {selectedProperty.title}
            </h3>

            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm">
              <MapPin className="w-4 h-4 text-[#0B4DBA] shrink-0" />
              <span>{selectedProperty.location}</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl text-xs text-slate-600 dark:text-slate-400">
              📍 <span className="font-semibold text-slate-800 dark:text-slate-200">Landmark:</span> {selectedProperty.nearestLandmark}
            </div>

            {/* Facilities List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Includes Amenities:</span>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                {selectedProperty.facilities.map((fac, i) => (
                  <div key={i} className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Monthly All-Inclusive</span>
                <div className="text-2xl font-extrabold text-[#0B4DBA] dark:text-[#F6B400]">
                  ₹{selectedProperty.price.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> /month</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenBooking}
                className="bg-gradient-to-r from-[#F6B400] to-amber-500 hover:from-amber-400 hover:to-amber-600 text-[#0B4DBA] font-extrabold px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 text-sm cursor-pointer"
              >
                <span>Schedule Visit</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

          </div>

        </div>

        {/* Secondary Property Cards Carousel Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProperties.map((prop) => (
            <motion.div
              key={prop.id}
              variants={fadeInUp}
              onClick={() => {
                setSelectedProperty(prop);
                setActiveImageIndex(0);
              }}
              className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                selectedProperty.id === prop.id
                  ? "border-[#0B4DBA] dark:border-[#F6B400] ring-2 ring-[#0B4DBA]/20"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              <div className="relative h-48 overflow-hidden group">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md">
                  {prop.type}
                </div>
                <div className="absolute bottom-3 right-3 bg-amber-400 text-[#0B4DBA] text-xs font-extrabold px-2 py-0.5 rounded shadow">
                  ★ {prop.rating}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-white text-base line-clamp-1">
                  {prop.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-[#0B4DBA] mr-1 shrink-0" />
                  <span className="truncate">{prop.location}</span>
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="text-base font-extrabold text-[#0B4DBA] dark:text-[#F6B400]">
                    ₹{prop.price.toLocaleString()}<span className="text-[10px] text-slate-500 font-normal">/mo</span>
                  </div>
                  <span className="text-xs font-bold text-[#0B4DBA] dark:text-blue-400 hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
