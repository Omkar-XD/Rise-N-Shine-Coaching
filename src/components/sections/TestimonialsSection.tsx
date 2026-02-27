import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { staggerContainer, cardPopIn } from "@/lib/animations";

const videos = [
  "dQw4w9WgXcQ",
  "ysz5S6PUM-U",
  "tgbNymZ7vqY",
  "jNQXAC9IVRw",
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const prevIndex = (active - 1 + videos.length) % videos.length;
  const nextIndex = (active + 1) % videos.length;

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
            Student Stories
          </motion.div>

          <motion.h2
            variants={cardPopIn}
            className="text-3xl lg:text-4xl font-bold text-brand-navy mb-3"
          >
            What Our Students & Parents Say
          </motion.h2>

          <motion.p
            variants={cardPopIn}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Real experiences shared by our students and parents that reflect
            the impact of our coaching and mentorship.
          </motion.p>
        </motion.div>

        {/* Slider */}
        <div
          className="relative flex items-center justify-center gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Arrow Left */}
          <button
            onClick={prev}
            className="absolute left-0 z-20 bg-white shadow rounded-full p-2"
          >
            <ChevronLeft className="w-5 h-5 text-brand-navy" />
          </button>

          {/* Prev video */}
          <div className="w-[22%] opacity-60 scale-90">
            <iframe
              className="w-full aspect-video rounded-xl"
              src={`https://www.youtube.com/embed/${videos[prevIndex]}?mute=1`}
              allow="autoplay; encrypted-media"
            />
          </div>

          {/* Active video */}
          <motion.div
            key={active}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-[52%]"
          >
            <iframe
              className="w-full aspect-video rounded-2xl shadow-card"
              src={`https://www.youtube.com/embed/${videos[active]}?autoplay=1&mute=1&loop=1&playlist=${videos[active]}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>

          {/* Next video */}
          <div className="w-[22%] opacity-60 scale-90">
            <iframe
              className="w-full aspect-video rounded-xl"
              src={`https://www.youtube.com/embed/${videos[nextIndex]}?mute=1`}
              allow="autoplay; encrypted-media"
            />
          </div>

          {/* Arrow Right */}
          <button
            onClick={next}
            className="absolute right-0 z-20 bg-white shadow rounded-full p-2"
          >
            <ChevronRight className="w-5 h-5 text-brand-navy" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {videos.map((_, i) => (
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

export default TestimonialsSection;