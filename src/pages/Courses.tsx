import { motion } from "framer-motion";
import { staggerContainer, cardPopIn } from "@/lib/animations";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import EnquireTab from "@/components/ui/EnquireTab";
import EnquireModal from "@/components/ui/EnquireModal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CallButton from "@/components/ui/CallButton";
import MapSection from "@/components/sections/MapSection";
import { CourseCard, offerings } from "@/components/sections/OffersSection";

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Navbar onEnquireClick={() => setIsModalOpen(true)} />
      <main className="pt-28 pb-24 px-6 lg:px-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.div variants={cardPopIn} className="inline-flex items-center bg-brand-orange/10 text-brand-orange font-semibold text-sm px-4 py-2 rounded-full mb-4">
              All Programs
            </motion.div>
            <motion.h1 variants={cardPopIn} className="text-3xl lg:text-4xl font-bold text-brand-navy mb-3">
              Our Courses & Programs
            </motion.h1>
            <motion.p variants={cardPopIn} className="text-muted-foreground max-w-xl mx-auto">
              Explore our comprehensive range of coaching programs for Class 1 to Class 10.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {offerings.map((offering) => (
              <CourseCard
                key={offering.title}
                offering={offering}
                onEnquireClick={() => setIsModalOpen(true)}
              />
            ))}
          </motion.div>
        </div>
      </main>
      <MapSection />
      <Footer />
      <EnquireTab onClick={() => setIsModalOpen(true)} />
      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppButton />
      <CallButton />
    </motion.div>
  );
};

export default Courses;
