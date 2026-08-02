import React from "react";
import { Globe, ArrowRight, PhoneCall } from "lucide-react";

export const LanguagesSection = ({ onOpenBooking }) => {
  const languages = [
    { code: "🇮🇳", name: "Hindi", speaker: "हिन्दी सहायता" },
    { code: "🇬🇧", name: "English", speaker: "24/7 English Desk" },
    { code: "🇮🇳", name: "Kannada", speaker: "ಕನ್ನಡ ಬೆಂಬಲ" },
    { code: "🇮🇳", name: "Telugu", speaker: "తెలుగు సహాయం" },
    { code: "🇮🇳", name: "Tamil", speaker: "தமிழ் ஆதரவு" },
    { code: "🇮🇳", name: "Marathi", speaker: "मराठी मदत" },
    { code: "🇮🇳", name: "Bengali", speaker: "বাংলা সহায়তা" },
    { code: "🇮🇳", name: "Malayalam", speaker: "മലയാളം സഹായം" }
  ];

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Blue Container */}
        <div className="bg-gradient-to-r from-[#0B4DBA] via-blue-900 to-indigo-950 rounded-3xl p-8 lg:p-12 shadow-2xl border border-blue-400/20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F6B400]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#F6B400]">
                <Globe className="w-4 h-4" />
                <span>Pan-India Multilingual Support Desk</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Feel at Home in <span className="text-[#F6B400]">Your Preferred Language</span>
              </h3>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Moving to a new city? Our resident support staff and city managers speak 8+ regional Indian languages to make your transition effortless and welcoming.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#F6B400] hover:bg-amber-400 text-[#0B4DBA] font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                  <span>Talk to Regional Advisor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:+919876543210"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-5 py-3 rounded-xl backdrop-blur-md flex items-center space-x-2 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#F6B400]" />
                  <span>Call Hotline</span>
                </a>
              </div>
            </div>

            {/* Right Language Chips Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-2xl mb-1">{lang.code}</div>
                  <div className="font-extrabold text-sm text-white">{lang.name}</div>
                  <div className="text-[10px] text-blue-200 font-medium mt-0.5">{lang.speaker}</div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
