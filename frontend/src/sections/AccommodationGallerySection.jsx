import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2 } from "lucide-react";
import { accommodationGalleryData } from "../data/propertiesData";
import { SectionHeading } from "../components/common/SectionHeading";

export const AccommodationGallerySection = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalImage, setModalImage] = useState(null);

  const categories = ["All", "Luxury Suites", "Studio PGs", "Single Occupancy", "Shared Rooms"];

  const filteredItems = activeFilter === "All"
    ? accommodationGalleryData
    : accommodationGalleryData.filter(item => item.category === activeFilter);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Interactive Visual Showcase"
          eyebrowIcon={Sparkles}
          title="Explore Our"
          highlight="Accommodation Gallery"
          subtitle="Real photos of our actual properties. Clean, sunlit, furnished, and ready for you to move in today."
          className="mb-8"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[#0B4DBA] text-[#F6B400] shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 cursor-pointer"
              >
                <div className="relative h-72 overflow-hidden img-zoom-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 bg-[#F6B400] text-[#0B4DBA] font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow">
                    {item.category}
                  </div>

                  {/* Zoom Action Icon */}
                  <button
                    onClick={() => setModalImage(item)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <h3 className="font-extrabold text-lg text-white group-hover:text-[#F6B400] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Image Fullscreen Preview Modal */}
        {modalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={() => setModalImage(null)}>
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl" onClick={e => e.stopPropagation()}>
              <img src={modalImage.image} alt={modalImage.title} className="w-full max-h-[70vh] object-cover" />
              <div className="p-6 text-white space-y-2">
                <span className="text-xs font-bold text-[#F6B400] uppercase">{modalImage.category}</span>
                <h4 className="text-2xl font-extrabold">{modalImage.title}</h4>
                <p className="text-sm text-slate-300">{modalImage.description}</p>
                <div className="pt-4 flex justify-between items-center">
                  <button onClick={onOpenBooking} className="bg-[#F6B400] text-[#0B4DBA] font-extrabold text-xs px-6 py-2.5 rounded-xl">Book Virtual Tour</button>
                  <button onClick={() => setModalImage(null)} className="text-xs text-slate-400 hover:text-white">Close Preview</button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
    </section>
  );
};
