import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { staggerContainer, cardPopIn } from "@/lib/animations";

const reviews = [
  {
    name: "Mohini Chandrakant",
    text: "Provides excellent guidance and quality education. Teaching methodology is clear, concept-oriented and easy to understand. Faculty is supportive and gives individual attention.",
  },
  {
    name: "Shanta Mathapati",
    text: "My son has been studying here since 1st standard. I have seen big improvement. Special thanks to Swapnali Ma’am.",
  },
  {
    name: "Deepali Bhelke",
    text: "Excellent teaching style. Very patient explanations. Helps understand tough topics easily. Always well-prepared and energetic.",
  },
  {
    name: "Ajay Shedge",
    text: "This class focuses on every student. Faculty is well qualified and experienced.",
  },
  {
    name: "Shital Rikibe",
    text: "Best tuition classes. Good study environment with expert teachers.",
  },
  {
    name: "Pranav Shinde",
    text: "All teachers are experts and give attention to individual students. Extra efforts are always taken.",
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const prevIndex = (active - 1 + reviews.length) % reviews.length;
  const nextIndex = (active + 1) % reviews.length;

  const next = () => setActive(nextIndex);
  const prev = () => setActive(prevIndex);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, active]);

  return (
    <section className="py-24 px-6 lg:px-20 bg-brand-lavender">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            variants={cardPopIn}
            className="inline-flex items-center bg-brand-orange/10 text-brand-orange font-semibold text-sm px-4 py-2 rounded-full mb-4"
          >
            Google Reviews
          </motion.div>

          <motion.h2
            variants={cardPopIn}
            className="text-3xl lg:text-4xl font-bold text-brand-navy mb-3"
          >
            What Parents & Students Say
          </motion.h2>

          <motion.p
            variants={cardPopIn}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Real feedback shared by parents and students about their learning experience.
          </motion.p>
        </motion.div>

        {/* Slider */}
        <div
          className="relative flex items-center justify-center gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-0 z-20 bg-white shadow rounded-full p-2"
          >
            <ChevronLeft className="w-5 h-5 text-brand-navy" />
          </button>

          {/* Previous Card */}
          <ReviewCard review={reviews[prevIndex]} small />

          {/* Active Card */}
          <motion.div
            key={active}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-[52%]"
          >
            <ReviewCard review={reviews[active]} />
          </motion.div>

          {/* Next Card */}
          <ReviewCard review={reviews[nextIndex]} small />

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-0 z-20 bg-white shadow rounded-full p-2"
          >
            <ChevronRight className="w-5 h-5 text-brand-navy" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full transition ${
                active === i ? "bg-brand-navy scale-125" : "bg-brand-navy/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review, small = false }: any) => {
  return (
    <div
      className={`${
        small ? "w-[22%] opacity-60 scale-90" : ""
      } transition-all`}
    >
      <div className="bg-white rounded-2xl shadow-card p-6 h-full">
        <div className="flex items-center gap-1 mb-3 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-500" />
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {review.text}
        </p>

        <h4 className="font-semibold text-brand-navy">
          {review.name}
        </h4>
      </div>
    </div>
  );
};

export default TestimonialsSection;