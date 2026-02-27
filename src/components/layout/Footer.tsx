import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { fadeInUp, staggerContainer, cardPopIn } from "@/lib/animations";
import { useNavigate } from "react-router-dom";

const courseLinks = ["Primary (1st–5th)", "Middle (6th–8th)", "Secondary (9th–10th)", "Weekend Programs", "Special Subjects"];
const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Courses", path: "/courses" },
];
const socials = ["Instagram", "WhatsApp", "Facebook", "YouTube"] as const;

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
              SSC & CBSE Coaching in Narhe, Pune. Personalized coaching for Class 1–10 students with small batches,
              strong concepts, and individual attention.
            </p>
            <div className="flex gap-2 mt-1">
              {socials.map((label) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.2, backgroundColor: "#F97316" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
                  aria-label={label}
                >
                  {label === "Instagram" && <Instagram className="w-4 h-4" />}
                  {label === "Facebook" && <Facebook className="w-4 h-4" />}
                  {label === "YouTube" && <Youtube className="w-4 h-4" />}
                  {label === "WhatsApp" && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Courses */}
          <motion.div variants={cardPopIn} className="flex flex-col gap-3">
            <h4 className="font-bold mb-1">Courses</h4>
            {courseLinks.map((l) => (
              <motion.a
                key={l}
                href="#"
                whileHover={{ x: 4, color: "#F97316" }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 text-sm"
              >
                {l}
              </motion.a>
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

          {/* Find Us / Credits */}
          <motion.div variants={cardPopIn} className="flex flex-col gap-3">
            <h4 className="font-bold mb-1">Find Us</h4>
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Narhe, Pune, Maharashtra</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <a href="tel:8888888888" className="hover:text-orange-400 transition-colors">
                8888888888
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a
                href="mailto:contact@synergexai.com"
                className="hover:text-orange-400 transition-colors break-all"
              >
                contact@synergexai.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
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
            <p>Designed &amp; Developed by SynergexAi</p>
            <p>
              <a
                href="mailto:contact@synergexai.com"
                className="hover:text-orange-400 transition-colors break-all"
              >
                contact@synergexai.com
              </a>
            </p>
            <p>
              <a href="tel:8888888888" className="hover:text-orange-400 transition-colors">
                8888888888
              </a>
            </p>
          </div>
          <div className="w-full md:w-1/3 flex items-center justify-center md:justify-end gap-6">
            <motion.a href="#" whileHover={{ color: "#F97316" }}>
              Privacy Policy
            </motion.a>
            <motion.a href="#" whileHover={{ color: "#F97316" }}>
              Terms of Use
            </motion.a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
