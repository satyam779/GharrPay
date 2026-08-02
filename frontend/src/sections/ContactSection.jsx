import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  MessageSquare
} from "lucide-react";
import { SectionHeading } from "../components/common/SectionHeading";

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form submitted:", data);
    setSubmitted(true);
    setTimeout(() => {
      reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Get in Touch With Us"
          eyebrowIcon={Sparkles}
          title="We'd Love to"
          highlight="Hear From You"
          subtitle="Have questions about room availability, meal schedules, or booking a virtual walkthrough? Drop us a message!"
        />

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-[#0B4DBA] dark:text-[#F6B400]" />
              <span>Send Us an Inquiry</span>
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Our regional stay executive will reply to your email or call your mobile within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0B4DBA] text-white font-bold text-xs px-6 py-2.5 rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Vikram Seth"
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. vikram@example.com"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } 
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      {...register("phone", { required: "Phone number is required" })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Target Location</label>
                    <select
                      {...register("location")}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                    >
                      <option value="Bengaluru - Koramangala">Bengaluru - Koramangala</option>
                      <option value="Bengaluru - HSR Layout">Bengaluru - HSR Layout</option>
                      <option value="Bengaluru - Indiranagar">Bengaluru - Indiranagar</option>
                      <option value="Hyderabad - Gachibowli">Hyderabad - Gachibowli</option>
                      <option value="Pune - Hinjewadi">Pune - Hinjewadi</option>
                    </select>
                  </div>

                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">How Can We Help You? *</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us your move-in timeline, preferred room type, dietary preferences..."
                    {...register("message", { required: "Message is required" })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
                  />
                  {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-premium font-extrabold text-base py-4 rounded-xl cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Google Map Embed & Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Cards */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">Contact Information</h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-5 h-5 text-[#0B4DBA] dark:text-[#F6B400] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Central Experience Center:</span>
                    #42, 80 Feet Road, Koramangala 4th Block, Bengaluru, Karnataka 560034
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                  <Phone className="w-5 h-5 text-[#0B4DBA] dark:text-[#F6B400] shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Hotline:</span> +91 98765 43210
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                  <Mail className="w-5 h-5 text-[#0B4DBA] dark:text-[#F6B400] shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Email Desk:</span> support@gharrpay.com
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <Clock className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Support Hours:</span> 24/7 Round the Clock
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Responsive Google Map Preview */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 h-64 relative bg-slate-200 dark:bg-slate-800">
              <iframe
                title="GharrPay Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.751684346851!2d77.6225!3d12.9345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA0LjIiTiA3N8KwMzcnMjEuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
