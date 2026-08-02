import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Play, Star, Sparkles, Quote, X } from "lucide-react";
import { testimonialsData } from "../data/testimonialsData";
import { SectionHeading } from "../components/common/SectionHeading";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const VideoTestimonialsSection = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Verified Resident Video Reviews"
          eyebrowIcon={Sparkles}
          title="Hear From Our"
          highlight="Happy Residents"
          subtitle="Real stories from software engineers, startup founders, and graduate students who call GharrPay home."
        />

        {/* Swiper Video Testimonial Carousel */}
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          className="pb-16"
        >
          {testimonialsData.map((testi) => (
            <SwiperSlide key={testi.id}>
              <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group">
                
                <div>
                  {/* Video Thumbnail Frame */}
                  <div className="relative h-52 overflow-hidden bg-slate-950">
                    <img
                      src={testi.videoThumbnail}
                      alt={testi.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setActiveVideoUrl(testi.videoUrl)}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#F6B400] text-[#0B4DBA] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-[#0B4DBA] ml-1" />
                      </div>
                    </button>

                    <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md">
                      Video Story
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    {/* Star Rating */}
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(testi.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <Quote className="w-8 h-8 text-[#0B4DBA]/20 dark:text-[#F6B400]/20" />
                    
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic line-clamp-4">
                      "{testi.quote}"
                    </p>
                  </div>
                </div>

                {/* Resident Profile Footer */}
                <div className="p-6 pt-0 flex items-center space-x-3">
                  <img
                    src={testi.avatar}
                    alt={testi.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#F6B400]"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                      {testi.name}
                    </h4>
                    <p className="text-[11px] text-[#0B4DBA] dark:text-[#F6B400] font-semibold">
                      {testi.role}
                    </p>
                    <span className="text-[10px] text-slate-400 block">{testi.location}</span>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Video Player Modal */}
        {activeVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md" onClick={() => setActiveVideoUrl(null)}>
            <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20" onClick={e => e.stopPropagation()}>
              <button onClick={() => setActiveVideoUrl(null)} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 text-white">
                <X className="w-6 h-6" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  src={activeVideoUrl}
                  title="GharrPay Resident Testimonial Video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
