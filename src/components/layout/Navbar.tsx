import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { buttonMotionProps } from "@/lib/animations";

const navItems = ["Home", "Courses", "About Us", "Results"] as const;

const Navbar = ({ onEnquireClick }: { onEnquireClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (label: (typeof navItems)[number]) => {
    if (label === "Home") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (label === "Courses") {
      navigate("/courses");
      return;
    }

    if (label === "About Us") {
      navigate("/about");
      return;
    }

    if (label === "Results") {
      if (location.pathname === "/") {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate("/", { state: { scrollTo: "results" } });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0)",
        boxShadow: scrolled ? "0 4px 24px rgba(27,43,107,0.08)" : "none",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src="/assets/images/logo-rise-n-shine.jpeg"
            alt="Rise N Shine Coaching logo"
            className="h-14 w-auto object-contain"
            loading="lazy"
            decoding="async"
          />
          <span className="text-brand-navy font-bold text-lg whitespace-nowrap">Rise N Shine Coaching</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((label) => (
            <motion.button
              key={label}
              type="button"
              onClick={() => handleNavClick(label)}
              className="relative text-sm font-medium text-brand-navy"
              whileHover={{ y: -2 }}
            >
              {label}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-brand-orange w-full origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          {...buttonMotionProps}
          onClick={onEnquireClick}
          className="hidden lg:flex items-center gap-2 bg-brand-orange text-white font-semibold text-sm px-6 py-2.5 rounded-full"
          aria-label="Contact / Enroll"
        >
          Contact / Enroll <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Mobile Toggle */}
        <motion.button
          className="lg:hidden text-brand-navy"
          animate={{ rotate: isOpen ? 90 : 0 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden bg-white overflow-hidden border-t"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((label) => (
                <button
                  key={label}
                  className="text-brand-navy font-medium text-left"
                  onClick={() => {
                    setIsOpen(false);
                    handleNavClick(label);
                  }}
                >
                  {label}
                </button>
              ))}
              <motion.button
                {...buttonMotionProps}
                onClick={() => {
                  setIsOpen(false);
                  onEnquireClick();
                }}
                className="bg-brand-orange text-white font-semibold px-6 py-2.5 rounded-full w-full"
                aria-label="Contact / Enroll"
              >
                Contact / Enroll
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
