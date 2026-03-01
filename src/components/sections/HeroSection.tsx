import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  cardPopIn,
  blobPulse,
  floatLoop,
  buttonMotionProps,
} from "@/lib/animations";

interface HeroSectionProps {
  onEnrollClick: () => void;
}

const HeroSection = ({ onEnrollClick }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    "/assets/images/hero-education.jpeg",
    "/assets/images/Interact.jpeg",
  ];

  // ✅ Preload images to prevent flicker
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-brand-lavender to-[#F9FAFB] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 lg:px-20 py-28 pt-32">

        {/* LEFT COLUMN */}
        <motion.div
          {...fadeInLeft}
          whileInView={fadeInLeft.animate}
          viewport={{ once: true, margin: "-80px" }}
          className="relative z-10"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={cardPopIn}
              className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange font-semibold text-sm px-4 py-2 rounded-full w-fit"
            >
              <Sparkles className="w-4 h-4" /> Trusted Coaching in Narhe
            </motion.div>

            <motion.div variants={cardPopIn} className="flex flex-col gap-5 max-w-xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-navy leading-tight">
                Empowering Young Minds.
                <span className="block text-brand-green mt-2">
                  Shaping Academic Excellence.
                </span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Personalized Coaching for 1st–10th Students
                <br />
                SSC & CBSE | English & Marathi Medium
              </p>
            </motion.div>

            <motion.div variants={cardPopIn} className="flex flex-wrap gap-4">
              <motion.button
                {...buttonMotionProps}
                onClick={onEnrollClick}
                className="flex items-center gap-2 bg-brand-navy text-white font-semibold px-7 py-3 rounded-full"
              >
                Enroll Now
                <motion.span whileHover={{ x: 5 }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>

              <motion.button
                {...buttonMotionProps}
                onClick={() => navigate("/courses")}
                className="flex items-center gap-2 border-2 border-brand-navy text-brand-navy font-semibold px-7 py-3 rounded-full bg-transparent"
              >
                Explore Courses
              </motion.button>
            </motion.div>

            <motion.div variants={cardPopIn} className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://placehold.co/32x32/E0E7FF/1B2B6B?text=${i}`}
                    alt={`Student ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-brand-navy">
                500+ Happy Students
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          {...fadeInRight}
          whileInView={fadeInRight.animate}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            {...blobPulse}
            className="absolute w-72 h-72 lg:w-80 lg:h-80 bg-blue-100 opacity-70 blur-sm z-0"
          />

          {/* Fixed container prevents white flash */}
          <div className="relative w-full h-[400px] lg:h-[480px] rounded-2xl overflow-hidden">
            <AnimatePresence>
              <motion.img
                key={activeImage}
                src={images[activeImage]}
                loading="eager"
                decoding="async"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                alt="Hero classroom"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <motion.div
            {...floatLoop}
            className="absolute top-6 left-0 lg:-left-4 z-20 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5 text-brand-green" />
            <span className="text-sm font-bold text-brand-navy">
              {activeImage === 0 ? "Small Batches" : "Regular Tests & Tracking"}
            </span>
          </motion.div>

          <motion.div
            animate={floatLoop.animate}
            transition={{ ...floatLoop.transition, delay: 1.2 }}
            className="absolute bottom-8 right-0 lg:-right-4 z-20 bg-brand-orange rounded-xl shadow-lg p-3 flex items-center gap-2"
          >
            <Trophy className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">
              {activeImage === 0 ? "Individual Attention" : "Friendly Environment"}
            </span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;