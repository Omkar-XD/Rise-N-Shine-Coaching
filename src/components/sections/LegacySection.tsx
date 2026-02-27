import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  cardPopIn,
  buttonMotionProps,
  useCounterAnimation,
} from "@/lib/animations";
import { Users, UserCheck, BookOpen } from "lucide-react";

const stats = [
  { end: 15, label: "Students / Batch", display: "", icon: Users },
  { end: 500, label: "Happy Students", display: "+", icon: UserCheck },
  { end: 10, label: "Subjects", display: "+", icon: BookOpen },
];

const StatBlock = ({ end, label, display }: { end: number; label: string; display: string }) => {
  const { ref, displayValue } = useCounterAnimation(end);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl lg:text-4xl font-bold text-brand-navy">
        {displayValue}{display}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

const LegacySection = () => {
  const navigate = useNavigate();

  return (
    <section id="about-us" className="py-24 px-6 lg:px-20 bg-white">
      <motion.div
        variants={cardPopIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto rounded-3xl bg-brand-beige shadow-lg p-10 lg:p-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            {...fadeInLeft}
            whileInView={fadeInLeft.animate}
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              <motion.div variants={cardPopIn} className="inline-flex items-center bg-brand-orange/10 text-brand-orange font-semibold text-sm px-4 py-2 rounded-full w-fit">
                About Us
              </motion.div>
              <motion.h2 variants={cardPopIn} className="text-3xl lg:text-4xl font-bold text-brand-navy">
                Where Every Student<br />
                <span className="text-brand-orange">Gets Personal Attention</span>
              </motion.h2>
              <motion.p variants={cardPopIn} className="text-muted-foreground leading-relaxed">
                Located in Narhe, our coaching institute believes in quality over quantity. With a small batch size of just 15 students, we ensure every child receives individual attention, concept-based teaching, and a friendly learning environment. Our experienced teachers focus on building strong foundations and academic confidence.
              </motion.p>

              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-8 mt-4">
                {stats.map((s) => (
                  <motion.div key={s.label} variants={cardPopIn}>
                    <StatBlock end={s.end} label={s.label} display={s.display} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                variants={cardPopIn}
                {...buttonMotionProps}
                onClick={() => navigate("/about")}
                className="mt-4 bg-brand-navy text-white font-semibold px-7 py-3 rounded-full w-fit"
                aria-label="Learn More About Us"
              >
                Learn More About Us →
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            {...fadeInRight}
            whileInView={fadeInRight.animate}
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-center"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src="/assets/images/student-class.webp"
              alt="Students in classroom"
              className="rounded-2xl shadow-xl object-cover w-full h-[350px] lg:h-[400px]"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LegacySection;
