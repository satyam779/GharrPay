import React, { useState } from "react";
import { Check } from "lucide-react";

export const FoodSection = () => {
  const [activeTab, setActiveTab] = useState("breakfast");

  const menuItems = {
    breakfast: [
      { name: "South Indian Special", items: "Fresh Steaming Idlis, Crispy Vada, Coconut Chutney & Sambar", calories: "380 kcal" },
      { name: "North Indian Delights", items: "Stuffed Aloo Paratha with Fresh Curd & Homemade Butter", calories: "420 kcal" },
      { name: "Continental Option", items: "Multi-grain Toast, Omelette / Paneer Bhurji & Fresh Fruit Juice", calories: "350 kcal" }
    ],
    lunch: [
      { name: "Executive Thali", items: "Paneer Butter Masala / Chicken Curry, Dal Tadka, Phulkas, Steamed Basmati Rice & Gulab Jamun", calories: "650 kcal" },
      { name: "Homestyle Combo", items: "Rajma Masala / Chole, Jeera Rice, Fresh Salad & Mint Raita", calories: "580 kcal" }
    ],
    snacks: [
      { name: "High Tea Specials", items: "Adrak Masala Chai / Filter Coffee with Samosa / Veg Cutlets", calories: "220 kcal" },
      { name: "Healthy Evening Nook", items: "Roasted Sprouts Salad & Lemon Green Tea", calories: "140 kcal" }
    ],
    dinner: [
      { name: "Gourmet Dinner Buffet", items: "Mix Veg Handi, Dal Makhani, Fresh Chapati, Veg Pulao & Kheer", calories: "610 kcal" },
      { name: "Weekend Special", items: "Hyderabadi Biryani Special, Salan & Ice Cream", calories: "680 kcal" }
    ]
  };

  const benefits = [
    "Prepared in 100% FSSAI-certified central kitchens",
    "Unlimited hot rotis and fresh steamed rice",
    "Separate cooking stations for Veg & Non-Veg",
    "Customizable dietary options via resident app"
  ];

  return (
    <section className="py-20 bg-[#FAF4E8] text-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Yellow Tag matching Reference Image */}
        <div className="text-center mb-4">
          <span className="bg-[#F6B400] text-[#0B4DBA] text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Food
          </span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4DBA] tracking-tight">
            70% Home Cooked Food, 30% Extra Love & Unlimited Comfort
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            3 Fresh Gourmet Meals + Evening Tea Snacks Served Daily
          </p>
        </div>

        {/* Large Image + Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
          
          {/* Thali Image Left matching Reference */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                alt="GharrPay Gourmet Dining Thali"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="bg-[#F6B400] text-[#0B4DBA] font-extrabold text-xs px-3 py-1 rounded-full">
                  FSSAI Certified Kitchen
                </span>
                <h4 className="font-extrabold text-lg mt-2">Unlimited Meal Servings</h4>
                <p className="text-xs text-blue-100">Fresh regional ingredients sourced daily.</p>
              </div>
            </div>
          </div>

          {/* Green & Cream Cards Right matching reference screenshot */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Cream Highlight Card */}
            <div className="bg-[#FFF8E7] p-6 rounded-2xl border border-amber-200/80 shadow-sm space-y-2">
              <div className="text-xs font-bold text-[#0B4DBA] uppercase">Weekly Rotating Menu</div>
              <h3 className="text-xl font-extrabold text-[#0B4DBA]">North & South Indian Regional Cuisine</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Enjoy home-style recipes with fresh chapattis, dal tadka, paneer delicacies, chicken curry, and weekend sweets.
              </p>
            </div>

            {/* Light Green Highlight Card matching reference screenshot */}
            <div className="bg-[#E8F8F0] p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-emerald-800 uppercase">Hygienic Assurance</div>
              <div className="space-y-2">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center space-x-2.5 text-xs font-semibold text-emerald-950">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Menu Cards Interactive Tabs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/60">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
            <div>
              <h4 className="text-lg font-extrabold text-[#0B4DBA]">Sample Daily Menu</h4>
              <p className="text-xs text-slate-500">Customizable menu options on resident app</p>
            </div>

            <div className="flex items-center space-x-2 bg-[#FAF4E8] p-1.5 rounded-2xl">
              {["breakfast", "lunch", "snacks", "dinner"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#0B4DBA] text-white shadow-md"
                      : "text-slate-600 hover:text-[#0B4DBA]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuItems[activeTab].map((item, idx) => (
              <div key={idx} className="bg-[#FAF4E8] p-4 rounded-xl border border-amber-200/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-extrabold text-[#0B4DBA] text-sm">{item.name}</h5>
                  <span className="text-[10px] font-bold text-[#0B4DBA] bg-white px-2 py-0.5 rounded border border-amber-200">
                    {item.calories}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.items}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
