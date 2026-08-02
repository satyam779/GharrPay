import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/common/Header";
import { HeroSection } from "./sections/HeroSection";
import { FeaturedPropertiesSection } from "./sections/FeaturedPropertiesSection";
import { PricingSection } from "./sections/PricingSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection";
import { ServicesGridSection } from "./sections/ServicesGridSection";
import { StudentCommunitySection } from "./sections/StudentCommunitySection";
import { StatisticsSection } from "./sections/StatisticsSection";
import { FoodSection } from "./sections/FoodSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { GuaranteeSection } from "./sections/GuaranteeSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { WhoStaysWithUsSection } from "./sections/WhoStaysWithUsSection";
import { AccommodationGallerySection } from "./sections/AccommodationGallerySection";
import { VideoTestimonialsSection } from "./sections/VideoTestimonialsSection";
import { BookingStepsSection } from "./sections/BookingStepsSection";
import { TenantCenterSection } from "./sections/TenantCenterSection";
import { ContactSection } from "./sections/ContactSection";
import { FAQSection } from "./sections/FAQSection";
import { Footer } from "./components/common/Footer";

import { FloatingButtons } from "./components/common/FloatingButtons";
import { BookingModal } from "./components/common/BookingModal";
import { AdminPage } from "./pages/AdminPage";
import { useDarkMode } from "./hooks/useDarkMode";
import { initSmoothScroll, destroySmoothScroll } from "./lib/smoothScroll";

export function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-[#F6B400] selection:text-[#0B4DBA]">
            
            {/* 1. Sticky Navigation */}
            <Header
              onOpenBooking={handleOpenBooking}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />

            <main>
              {/* 2. Hero Section */}
              <HeroSection onOpenBooking={handleOpenBooking} />

              {/* 3. Featured Property Section */}
              <FeaturedPropertiesSection onOpenBooking={handleOpenBooking} />

              {/* 4. Pricing Section */}
              <PricingSection onOpenBooking={handleOpenBooking} />

              {/* 5. Why Choose Us */}
              <WhyChooseUsSection onOpenBooking={handleOpenBooking} />

              {/* 6. Services Grid */}
              <ServicesGridSection onOpenBooking={handleOpenBooking} />

              {/* 7. Student Community Section */}
              <StudentCommunitySection onOpenBooking={handleOpenBooking} />

              {/* 8. Statistics Section */}
              <StatisticsSection />

              {/* 9. Food Section */}
              <FoodSection onOpenBooking={handleOpenBooking} />

              {/* 10. Languages Section */}
              <LanguagesSection onOpenBooking={handleOpenBooking} />

              {/* 11. Guarantee Section */}
              <GuaranteeSection />

              {/* 12. Amenities */}
              <AmenitiesSection onOpenBooking={handleOpenBooking} />

              {/* 13. Who Stays With Us */}
              <WhoStaysWithUsSection onOpenBooking={handleOpenBooking} />

              {/* 14. Accommodation Gallery */}
              <AccommodationGallerySection onOpenBooking={handleOpenBooking} />

              {/* 15. Video Testimonials */}
              <VideoTestimonialsSection />

              {/* 16. Booking Steps */}
              <BookingStepsSection onOpenBooking={handleOpenBooking} />

              {/* 17. Tenant Center */}
              <TenantCenterSection onOpenBooking={handleOpenBooking} />

              {/* 18. Contact Section */}
              <ContactSection />

              {/* 19. FAQ */}
              <FAQSection />
            </main>

            {/* 20. Footer */}
            <Footer onOpenBooking={handleOpenBooking} />

            {/* Extra Interactive Floating UI Components */}
            <FloatingButtons onOpenBooking={handleOpenBooking} />

            {/* Booking Inquiry Modal */}
            <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />

          </div>
        }
      />
    </Routes>
  );
}

export default App;
