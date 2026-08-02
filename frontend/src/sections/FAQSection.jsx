import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { faqData } from "../data/faqData";
import { SectionHeading } from "../components/common/SectionHeading";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="20 Most Frequently Asked Questions"
          eyebrowIcon={HelpCircle}
          title="Got Questions?"
          highlight="We Have Answers"
          subtitle="Everything you need to know about rent inclusions, security deposit refunds, food quality, visitor rules, and check-in procedures."
          className="mb-8"
        />

        {/* FAQ Search Bar */}
        <div className="max-w-md mx-auto relative mb-12">
            <input
              type="text"
              placeholder="Search FAQ keywords (e.g. deposit, food, Wi-Fi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm shadow-sm"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white dark:bg-slate-800 border-[#0B4DBA] dark:border-[#F6B400] shadow-lg ring-1 ring-[#0B4DBA]/20"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isOpen
                          ? "bg-[#0B4DBA] text-[#F6B400]"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}>
                        Q{index + 1}
                      </span>
                      <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                        {faq.question}
                      </span>
                    </div>

                    <div className={`p-2 rounded-xl transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? "bg-[#0B4DBA] text-[#F6B400] rotate-180"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300"
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/60 mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              No matching questions found for "{searchQuery}". Try another keyword!
            </div>
          )}
        </div>

    </section>
  );
};
