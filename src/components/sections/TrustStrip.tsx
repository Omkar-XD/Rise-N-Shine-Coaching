import { motion } from "framer-motion";
import { Users, UserCheck, ClipboardCheck, Smile, Lightbulb } from "lucide-react";
import { staggerContainer, cardPopIn } from "@/lib/animations";

const trustPoints = [
  { icon: Users, label: "Small Batch Size (15 Students)" },
  { icon: UserCheck, label: "Individual Attention" },
  { icon: ClipboardCheck, label: "Regular Tests & Tracking" },
  { icon: Smile, label: "Friendly Environment" },
  { icon: Lightbulb, label: "Concept-Based Teaching" },
];

const TrustStrip = () => (
  <section className="py-12 px-6 lg:px-20 bg-brand-lavender">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 lg:gap-10"
    >
      {trustPoints.map((tp) => {
        const Icon = tp.icon;
        return (
          <motion.div
            key={tp.label}
            variants={cardPopIn}
            className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-card"
          >
            <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-brand-orange" />
            </div>
            <span className="text-sm font-semibold text-brand-navy whitespace-nowrap">{tp.label}</span>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

export default TrustStrip;
