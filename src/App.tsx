import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import StudentSlider from "./components/sections/StudentSlider";
import LegacySection from "./components/sections/LegacySection";
import OffersSection from "./components/sections/OffersSection";
import TrustStrip from "./components/sections/TrustStrip";
import Footer from "./components/layout/Footer";
import EnquireTab from "./components/ui/EnquireTab";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import CallButton from "./components/ui/CallButton";
import ScrollToTop from "./components/ScrollToTop";

const Courses = lazy(() => import("./pages/Courses"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TestimonialsSection = lazy(() => import("./components/sections/TestimonialsSection"));
const ToppersSection = lazy(() => import("./components/sections/ToppersSection"));
const MapSection = lazy(() => import("./components/sections/MapSection"));
const EnquireModal = lazy(() => import("./components/ui/EnquireModal"));

const queryClient = new QueryClient();

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo === "results") {
      // Delay to ensure section is rendered before scrolling
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar onEnquireClick={() => setIsModalOpen(true)} />
      <main>
        <HeroSection onEnrollClick={() => setIsModalOpen(true)} />
        <section className="px-6 lg:px-20 py-10 bg-white">
          <div className="max-w-5xl mx-auto">
            <img
              src="/assets/images/Interact.jpeg"
              alt="Students in classroom at Rise N Shine Coaching"
              className="w-full max-w-4xl mx-auto aspect-[16/9] object-cover rounded-2xl shadow-card"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
        <StudentSlider />
        <LegacySection />
        <OffersSection onEnquireClick={() => setIsModalOpen(true)} />
        <TrustStrip />
        <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading testimonials…</div>}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading results…</div>}>
          <ToppersSection />
        </Suspense>
        <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading map…</div>}>
          <MapSection />
        </Suspense>
      </main>
      <Footer />
      <EnquireTab onClick={() => setIsModalOpen(true)} />
      <Suspense fallback={null}>
        <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Suspense>
      <WhatsAppButton />
      <CallButton />
    </motion.div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
