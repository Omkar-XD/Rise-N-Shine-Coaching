import { motion } from "framer-motion";
import { staggerContainer, cardPopIn } from "@/lib/animations";

interface Topper {
  name: string;
  result: string;
  avatar: string;
}

const toppers: Topper[] = [
  { name: "Anushree Kumar", result: "7th • 96%", avatar: "/assets/images/Toppers/T1.jpeg" },
  { name: "Sharvil Chorghe", result: "7th • 95%", avatar: "/assets/images/Toppers/T2.jpeg" },
  { name: "Anveera Upadhye", result: "7th • 97%", avatar: "/assets/images/Toppers/T3.jpeg" },
  { name: "Samiksha Bhoite", result: "7th • 75%", avatar: "/assets/images/Toppers/T4.jpeg" },
  { name: "Soham Dhule", result: "9th • 95%", avatar: "/assets/images/Toppers/T5.jpeg" },
  { name: "Arjun Nigde", result: "9th • 85%", avatar: "/assets/images/Toppers/T6.jpeg" },
  { name: "Gauravi Khanvilkar", result: "8th • 80%", avatar: "/assets/images/Toppers/T7.jpeg" },
];

const ToppersSection = () => {
  return (
    <section id="results" className="py-24 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.div
            variants={cardPopIn}
            className="inline-flex items-center bg-brand-orange/10 text-brand-orange font-semibold text-sm px-4 py-2 rounded-full mb-4"
          >
            Hall of Fame
          </motion.div>

          <motion.h2
            variants={cardPopIn}
            className="text-3xl lg:text-4xl font-bold text-brand-navy mb-3"
          >
            Meet Our Toppers
          </motion.h2>

          <motion.p
            variants={cardPopIn}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Celebrating the achievements of our students who excelled with dedication and guidance.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {toppers.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center text-center"
            >
              {/* Equal Image Frame (NO CROP) */}
              <div className="w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center shadow-inner">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <p className="mt-4 text-base font-bold text-brand-navy leading-tight">
                {t.name}
              </p>

              <p className="text-sm text-brand-orange font-semibold">
                {t.result}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ToppersSection;