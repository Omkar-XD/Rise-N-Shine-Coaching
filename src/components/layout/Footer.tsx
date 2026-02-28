import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { fadeInUp, staggerContainer, cardPopIn } from "@/lib/animations";
import { useNavigate } from "react-router-dom";

const courseLinks = [
  "Primary (1st–5th)",
  "Middle (6th–8th)",
  "Secondary (9th–10th)",
  "Weekend Programs",
  "Special Subjects",
];

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Courses", path: "/courses" },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0F172A] text-white py-16 px-6 lg:px-20">
      <motion.div
        {...fadeInUp}
        whileInView={fadeInUp.animate}
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={cardPopIn} className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/logo-rise-n-shine.jpeg"
                alt="RiseNShine Coaching logo"
                className="h-12 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <span className="font-bold text-lg">RiseNShine Coaching</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              SSC & CBSE Coaching in Narhe, Pune. Personalized coaching for Class 1–10 students
              with small batches, strong concepts, and individual attention.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-1">
              <motion.a
                href="https://www.instagram.com/rise_n_shinecoaching"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, backgroundColor: "#F97316" }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="https://www.facebook.com/share/1CZfYbWMHn/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, backgroundColor: "#F97316" }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="https://youtube.com/@risenshinecoaching"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, backgroundColor: "#F97316" }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
              >
                <Youtube className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Courses */}
          <motion.div variants={cardPopIn} className="flex flex-col gap-3">
            <h4 className="font-bold mb-1">Courses</h4>
            {courseLinks.map((l) => (
              <motion.button
                key={l}
                onClick={() => navigate("/courses")}
                whileHover={{ x: 4, color: "#F97316" }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 text-sm text-left"
              >
                {l}
              </motion.button>
            ))}
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={cardPopIn} className="flex flex-col gap-3">
            <h4 className="font-bold mb-1">Quick Links</h4>
            {quickLinks.map((l) => (
              <motion.button
                key={l.label}
                onClick={() => navigate(l.path)}
                whileHover={{ x: 4, color: "#F97316" }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 text-sm text-left"
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Find Us */}
          <motion.div variants={cardPopIn} className="flex flex-col gap-3">
            <h4 className="font-bold mb-1">Find Us</h4>

            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Narhe, Pune, Maharashtra</span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <a href="tel:8600504861" className="hover:text-orange-400 transition-colors">
                8600504861
              </a>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a
                href="mailto:swapnalimore3020@gmail.com"
                className="hover:text-orange-400 transition-colors break-all"
              >
                swapnalimore3020@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-gray-700 mt-12 mb-6"
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-xs">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <p>© 2026 Rise N Shine Coaching. All rights reserved.</p>
          </div>

          <div className="w-full md:w-1/3 text-center space-y-1">
            <p>Designed & Developed by SynergexAi</p>
            <p>
              <a
                href="mailto:contact@synergexai.com"
                className="hover:text-orange-400 transition-colors break-all"
              >
                contact@synergexai.com
              </a>
            </p>
            <p>
              <a href="tel:7385249974" className="hover:text-orange-400 transition-colors">
                7385249974
              </a>
            </p>
          </div>

          <div className="w-full md:w-1/3 flex items-center justify-center md:justify-end gap-6">
            <motion.a onClick={() => navigate("/privacy")} whileHover={{ color: "#F97316" }}>
              Privacy Policy
            </motion.a>
            <motion.a onClick={() => navigate("/terms")} whileHover={{ color: "#F97316" }}>
              Terms of Use
            </motion.a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;