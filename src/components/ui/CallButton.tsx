import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

const CallButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-16 bottom-3 bg-white text-gray-800 text-sm font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap pointer-events-none"
          >
            Call us
          </motion.span>
        )}
      </AnimatePresence>
      <motion.a
        href="tel:8600504861"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shadow-lg"
        aria-label="Call Rise N Shine Coaching"
      >
        <Phone className="w-6 h-6 text-white" />
      </motion.a>
    </div>
  );
};

export default CallButton;

