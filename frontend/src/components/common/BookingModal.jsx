import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const BookingModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit inquiry");
      }
      setIsSubmitted(true);
      setTimeout(() => {
        reset();
      }, 1000);
    } catch (err) {
      setSubmitError(err.message);
      console.error("Booking submission failed:", err);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Header Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0B4DBA] via-[#1253C4] to-indigo-900 p-6 text-white">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-400/20 rounded-full blur-2xl pointer-events-none" />
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Priority Reservation</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">Book Your GharrPay Stay</h3>
            <p className="text-blue-100 text-xs mt-1">
              Lock in early-bird prices & enjoy zero brokerage with instant digital confirmation.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-slate-800 dark:text-white">Inquiry Received!</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
                  Thank you! Our GharrPay resident manager will contact you within <span className="font-bold text-[#0B4DBA] dark:text-[#F6B400]">15 minutes</span> via WhatsApp/Call with available room photos and virtual tour link.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 bg-[#0B4DBA] text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-800 transition-all text-sm"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      {...register("fullName", { required: "Full name is required" })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-xs mt-0.5 block">{errors.fullName.message}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      {...register("phone", { 
                        required: "Phone number is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit mobile number" } 
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-xs mt-0.5 block">{errors.phone.message}</span>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred City */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred City *</label>
                    <select
                      {...register("city", { required: "Please select city" })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                    >
                      <option value="">Select City</option>
                      <option value="Bengaluru">Bengaluru (Koramangala, HSR, Indiranagar)</option>
                      <option value="Hyderabad">Hyderabad (Gachibowli, Hitech City)</option>
                      <option value="Pune">Pune (Viman Nagar, Hinjewadi)</option>
                      <option value="NCR">Delhi NCR (Noida, Gurgaon)</option>
                    </select>
                    {errors.city && (
                      <span className="text-red-500 text-xs mt-0.5 block">{errors.city.message}</span>
                    )}
                  </div>

                  {/* Room Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Occupancy Preference *</label>
                    <select
                      {...register("roomType", { required: "Please select room type" })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                    >
                      <option value="Single Private Room">Single Luxury Private Room</option>
                      <option value="Twin Sharing Studio">Twin Sharing Executive Studio</option>
                      <option value="Triple Sharing Budget">Triple Sharing Budget Room</option>
                      <option value="1BHK Luxury Apartment">1BHK Private Apartment</option>
                    </select>
                  </div>
                </div>

                {/* Move-in date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Move-in Date</label>
                  <input
                    type="date"
                    {...register("moveInDate")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notes / Preferences</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking for WFH high speed internet, balcony room, vegetarian meals..."
                    {...register("notes")}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                  />
                </div>

                {/* Security pledge */}
                <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-xl flex items-center space-x-2.5 text-xs text-[#0B4DBA] dark:text-blue-300">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-[#F6B400]" />
                  <span>100% Refundable Deposit • Zero Brokerage • Verified Properties</span>
                </div>

                {/* Submit Button */}
                {submitError && (
                  <p className="text-red-500 text-xs font-semibold text-center">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-premium font-extrabold text-base py-3.5 rounded-xl cursor-pointer"
                >
                  {isSubmitting ? "Submitting Inquiry..." : "Confirm & Schedule Instant Callback"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
