import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Microscope, GraduationCap, Calendar, Sparkles, type LucideIcon } from "lucide-react";
import { staggerContainer, cardPopIn, buttonMotionProps } from "@/lib/animations";

export interface Offering {
  icon: LucideIcon;
  title: string;
  items: string[];
  iconBg: string;
  cardBg: string;
  num: string;
}

export const offerings: Offering[] = [
  {
    icon: BookOpen,
    title: "Primary Classes (1–4)",
    items: ["Phonics", "Foundation Maths", "Scholarship preparation"],
    iconBg: "bg-secondary",
    cardBg: "bg-secondary/40",
    num: "01",
  },
  {
    icon: Microscope,
    title: "Middle School (5–7)",
    items: ["Maths & Science", "English improvement", "Grammar development", "Olympiad preparation"],
    iconBg: "bg-accent/10",
    cardBg: "bg-accent/5",
    num: "02",
  },
  {
    icon: GraduationCap,
    title: "Secondary (8–10)",
    items: ["Maths & Science focus", "Regular tests & analysis", "Doubt-solving sessions"],
    iconBg: "bg-secondary",
    cardBg: "bg-secondary/40",
    num: "03",
  },
  {
    icon: Calendar,
    title: "SSC Preparation",
    items: ["Full syllabus revision", "Model paper practice", "Time management drills"],
    iconBg: "bg-accent/10",
    cardBg: "bg-accent/5",
    num: "04",
  },
  {
    icon: GraduationCap,
    title: "NEET / JEE Foundation",
    items: ["Strong science fundamentals", "Concept-building for NEET / JEE", "Competitive exam mindset"],
    iconBg: "bg-secondary",
    cardBg: "bg-secondary/40",
    num: "05",
  },
  {
    icon: Microscope,
    title: "Olympiad & Scholarship",
    items: ["Olympiad-focused practice", "Logical reasoning drills", "Special scholarship guidance"],
    iconBg: "bg-accent/10",
    cardBg: "bg-accent/5",
    num: "06",
  },
];

interface OffersSectionProps {
  onEnquireClick?: () => void;
}

export const CourseCard = ({
  offering,
  onEnquireClick,
}: {
  offering: Offering;
  onEnquireClick?: () => void;
}) => {
  const Icon = offering.icon;

  return (
    <motion.div
      variants={cardPopIn}
      whileHover={{ y: -10, boxShadow: "0 24px 48px rgba(27,43,107,0.16)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${offering.cardBg} relative rounded-2xl p-8 shadow-card border border-border/50 overflow-hidden group flex flex-col justify-between`}
    >
      {/* Decorative sparkle */}
      <Sparkles className="absolute top-4 right-4 w-5 h-5 text-accent/30 group-hover:text-accent/60 transition-colors duration-300" />

      {/* Number */}
      <span className="text-xs font-bold text-muted-foreground/40 tracking-widest mb-4 block">
        {offering.num}
      </span>

      <div>
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
          className={`${offering.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-5`}
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="text-lg font-bold text-primary mb-3">{offering.title}</h3>
        <ul className="space-y-1.5 mb-6">
          {offering.items.map((item) => (
            <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {onEnquireClick && (
        <div className="mt-auto pt-2 flex justify-center">
          <motion.button
            {...buttonMotionProps}
            type="button"
            onClick={onEnquireClick}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
            aria-label={`Learn more about ${offering.title}`}
          >
            Learn More
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

const OffersSection = ({ onEnquireClick }: OffersSectionProps) => {
  const navigate = useNavigate();

  return (
    <section id="courses" className="py-24 px-6 lg:px-20 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.div variants={cardPopIn} className="inline-flex items-center bg-accent/10 text-accent font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Our Programs
          </motion.div>
          <motion.h2 variants={cardPopIn} className="text-3xl lg:text-4xl font-bold text-primary mb-3">
            What We Offer
          </motion.h2>
          <motion.p variants={cardPopIn} className="text-muted-foreground max-w-xl mx-auto">
            Comprehensive coaching programs tailored for every student from Class 1 to Class 10.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {offerings.slice(0, 4).map((offering) => (
            <CourseCard
              key={offering.title}
              offering={offering}
              onEnquireClick={onEnquireClick}
            />
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            {...buttonMotionProps}
            onClick={() => navigate("/courses")}
            className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full"
            aria-label="View More Courses"
          >
            View More →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;
