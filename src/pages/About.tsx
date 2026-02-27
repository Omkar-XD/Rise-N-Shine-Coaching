import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, cardPopIn } from "@/lib/animations";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquireTab from "@/components/ui/EnquireTab";
import EnquireModal from "@/components/ui/EnquireModal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CallButton from "@/components/ui/CallButton";
import MapSection from "@/components/sections/MapSection";

const teachers = [
  {
    name: "Mr. Ajay Shedage",
    qualification: "Mechanical Engineer and MA Economics",
    subject: "Physics and Chemistry",
    description:
      "10+ years of experience delivering concept-based Physics & Chemistry teaching with practical examples, exam strategies, and strong doubt-solving focus.",
    image: "/assets/images/teacher-1.png",
  },
  {
    name: "Mrs. Sharyu Patil",
    qualification: "MA B.Ed",
    subject: "Language Teacher",
    description:
      "Passionate language educator helping students master grammar, reading comprehension, and confident written and spoken communication.",
    image: "/assets/images/teacher-2.png",
  },
  {
    name: "Mrs. Mansi Jamgaonkar",
    qualification: "BSc B.Ed",
    subject: "Science",
    description:
      "Simplifies complex science concepts using visual learning, activities, and foundational explanations for better retention.",
    image: "/assets/images/teacher-3.png",
  },
  {
    name: "Mrs. Shital Nerkar",
    qualification: "BSc B.Ed",
    subject: "Primary Head",
    description:
      "Focuses on early academic development with engaging teaching methods that build strong numeracy, literacy, and learning confidence.",
    image: "/assets/images/teacher-4.png",
  },
  {
    name: "Dr. Samiksha Mohite",
    qualification: "Doctor of Medicine",
    subject: "Biology",
    description:
      "Guides Biology students using real-life medical insights, conceptual depth, and board exam preparation techniques.",
    image: "/assets/images/teacher-5.png",
  },
];

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Navbar onEnquireClick={() => setIsModalOpen(true)} />

      <main className="pt-28 pb-24 bg-background min-h-screen">

        {/* Intro */}
        <section className="px-6 lg:px-20 mb-20">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="flex flex-col items-center gap-4">
              <motion.div variants={cardPopIn} className="inline-flex bg-accent/10 text-accent font-semibold text-sm px-4 py-2 rounded-full">
                About Us
              </motion.div>

              <motion.h1 variants={cardPopIn} className="text-3xl lg:text-5xl text-primary">
                Where Every Student Gets <span className="text-accent">Personal Attention</span>
              </motion.h1>

              <motion.p variants={cardPopIn} className="text-muted-foreground max-w-2xl">
                Rise N Shine Coaching is a trusted institute in Narhe, Pune focused on small batches, strong concept clarity, and individual student growth from Class 1 to Class 10.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Founder */}
        <section className="px-6 lg:px-20 mb-20">
          <h2 className="text-2xl lg:text-6xl font-bold text-primary text-center mb-10">
            Meet Our Founder
          </h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div className="flex flex-col items-center lg:items-start">
              <div className="w-full max-w-xl h-[420px] overflow-hidden rounded-2xl shadow-card-hover mb-4">
                <img src="/assets/images/Founder.webp" className="w-full h-full object-cover" />
              </div>

              <p className="text-xl font-bold text-primary">Mrs. Swapnali More</p>
              <p className="text-sm font-medium text-accent">BSc B.Ed — Founder & Academic Head</p>
            </div>

            <div className="bg-card rounded-2xl shadow-card p-6 lg:p-8">
              <p className="text-muted-foreground mb-4">
                Mrs. Swapnali More, with over 12 years of academic experience, founded Rise N Shine Coaching with a vision to create a nurturing and student-focused learning environment where every child feels supported and motivated.
              </p>
              <p className="text-muted-foreground mb-4">
                Her teaching philosophy emphasizes concept clarity, patient mentoring, and consistent practice, helping students overcome fear of subjects and develop confidence in their academic abilities.
              </p>
              <p className="text-muted-foreground">
                She believes true education goes beyond marks — it builds curiosity, discipline, and a lifelong love for learning in every student.
              </p>
            </div>

          </div>
        </section>

        {/* Classroom */}
        <section className="px-6 lg:px-20 mb-20">
          <div className="max-w-5xl mx-auto">
            <img src="/assets/images/about-classroom.webp" className="w-full aspect-[16/9] object-cover rounded-2xl shadow-card-hover" />
          </div>
        </section>

        {/* Teachers */}
        <section className="px-6 lg:px-20">
          <h2 className="text-2xl lg:text-5xl font-bold text-primary text-center mb-12">
            Meet Our Teachers
          </h2>

          <div className="max-w-7xl mx-auto space-y-12">

            {teachers.map((teacher, index) => {
              const isOdd = index % 2 === 1;

              return (
                <div key={teacher.name} className={`flex flex-col md:flex-row ${isOdd ? "md:flex-row-reverse" : ""} items-center gap-8`}>

                  {/* IMAGE FIXED */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="aspect-[3/4] w-[300px] md:w-[340px] overflow-hidden rounded-2xl shadow-card">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover object-[center_20%] transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold text-primary">{teacher.name}</h3>
                    <p className="text-accent font-semibold">({teacher.qualification})</p>
                    <p className="text-accent font-semibold mb-2">({teacher.subject})</p>
                    <p className="text-muted-foreground">{teacher.description}</p>
                  </div>

                </div>
              );
            })}

          </div>
        </section>

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

export default About; 