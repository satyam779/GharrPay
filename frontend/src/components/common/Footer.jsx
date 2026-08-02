import React from "react";
import { ScrollLink } from "./ScrollLink";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Send
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export const Footer = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#18181B] text-slate-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Privilege Newsletter Banner matching Reference */}
        <div className="relative overflow-hidden rounded-3xl p-8 lg:p-10 mb-16 shadow-2xl text-white border border-blue-400/20 bg-gradient-to-br from-[#0B4DBA] via-[#1253C4] to-[#06286E]">
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-gold-400/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-grid-blue opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center relative z-10">
            <div>
              <span className="bg-gold-400 text-brand-500 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                Exclusive Deals & Updates
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Subscribe to GharrPay Privilege Circle
              </h3>
              <p className="text-blue-100 text-xs mt-1 max-w-md">
                Get priority access to newly launched PGs & luxury studio suites.
              </p>
            </div>

            <div>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white/10 text-white placeholder-blue-200 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="btn-premium font-extrabold px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm whitespace-nowrap cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F6B400] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#0B4DBA]" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Gharr<span className="text-[#F6B400]">Pay</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India's premier modern co-living & executive student PG network. Fully-managed, hygienic, and secure homes across top IT hubs.
            </p>

            <div className="pt-2 flex items-center space-x-2.5">
              <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-slate-400 hover:text-[#F6B400] transition-colors">
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-slate-400 hover:text-[#F6B400] transition-colors">
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-slate-400 hover:text-[#F6B400] transition-colors">
                <FaTwitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-slate-400 hover:text-[#F6B400] transition-colors">
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-slate-400 hover:text-[#F6B400] transition-colors">
                <FaYoutube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 border-l-4 border-[#F6B400] pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {["Hero", "Properties", "Pricing", "Services", "Amenities", "Testimonials"].map((item) => (
                <li key={item}>
                  <ScrollLink
                    to={item.toLowerCase()}
                    className="hover:text-[#F6B400] cursor-pointer transition-colors"
                  >
                    {item}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support & Tenant Hub */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 border-l-4 border-[#F6B400] pl-2">
              Support & Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#tenant-center" className="hover:text-[#F6B400] transition-colors">Tenant Center</a></li>
              <li><a href="#faq" className="hover:text-[#F6B400] transition-colors">Resident FAQ</a></li>
              <li><a href="#contact" className="hover:text-[#F6B400] transition-colors">House Rules</a></li>
              <li><a href="#guarantee" className="hover:text-[#F6B400] transition-colors">100% Refund Policy</a></li>
              <li><button onClick={onOpenBooking} className="hover:text-[#F6B400] text-left transition-colors">Book Virtual Tour</button></li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 border-l-4 border-[#F6B400] pl-2">
              Headquarters
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#F6B400] shrink-0 mt-0.5" />
                <span className="text-slate-400">#42, 80 Feet Road, Koramangala 4th Block, Bengaluru, KA 560034</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#F6B400] shrink-0" />
                <span className="text-slate-200 font-semibold">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#F6B400] shrink-0" />
                <span className="text-slate-400">support@gharrpay.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>© {new Date().getFullYear()} GharrPay Living Technologies Pvt. Ltd. All rights reserved.</div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
