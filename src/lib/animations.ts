import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  useInView,
  type Variants,
  type Easing,
} from "framer-motion";

// --- Named animation variants ---

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as Easing },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" as Easing },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" as Easing },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const cardPopIn: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const floatLoop = {
  animate: { y: [0, -12, 0] },
  transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
};

export const pulseGlow = {
  animate: { scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] },
  transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
};

export const blobPulse = {
  animate: {
    scale: [1, 1.06, 1],
    borderRadius: [
      "60% 40% 50% 50%",
      "50% 60% 40% 50%",
      "60% 40% 50% 50%",
    ],
  },
  transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
};

export const modalEntrance = {
  initial: { opacity: 0, scale: 0.92, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.94, y: 20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export const backdropFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export const slideInStagger: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const imageReveal = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: { clipPath: "inset(0 0% 0 0)" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 },
};

export const buttonMotionProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
};

// --- useCounterAnimation hook ---

export function useCounterAnimation(end: number, duration: number = 2) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, end, {
        duration,
        ease: "easeOut",
      });
      const unsub = rounded.on("change", (v) => setDisplayValue(v));
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [isInView, end, duration, motionVal, rounded]);

  return { ref, displayValue };
}
