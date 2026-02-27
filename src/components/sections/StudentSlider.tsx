import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const students = [
  { id: 1, img: "/assets/images/st1.png", bg: "#F97316" },
  { id: 2, img: "/assets/images/st2.png", bg: "#7C3AED" },
  { id: 3, img: "/assets/images/st3.png", bg: "#16A34A" },
  { id: 4, img: "/assets/images/st4.png", bg: "#EF4444" },
  { id: 5, img: "/assets/images/st5.png", bg: "#EAB308" },
  { id: 6, img: "/assets/images/st6.png", bg: "#7C3AED" },
  { id: 7, img: "/assets/images/st7.png", bg: "#F97316" },
  { id: 8, img: "/assets/images/st8.png", bg: "#16A34A" },
  { id: 9, img: "/assets/images/st9.png", bg: "#EF4444" },
  { id: 10, img: "/assets/images/st10.png", bg: "#EAB308" },
  { id: 11, img: "/assets/images/st11.png", bg: "#7C3AED" },
  { id: 12, img: "/assets/images/st12.png", bg: "#F97316" },
  { id: 13, img: "/assets/images/st13.png", bg: "#16A34A" },
  { id: 14, img: "/assets/images/st14.png", bg: "#EF4444" },
  { id: 15, img: "/assets/images/st15.png", bg: "#EAB308" },
  { id: 16, img: "/assets/images/st16.png", bg: "#7C3AED" },
  { id: 17, img: "/assets/images/st17.png", bg: "#F97316" },
];

const doubled = [...students, ...students.map((s) => ({ ...s, id: s.id + 100 }))];

const scrollTransition = {
  x: "-50%",
  transition: { duration: 26, repeat: Infinity, ease: "linear" as const },
};

const StudentSlider = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(scrollTransition);
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <section
        className="w-full py-12 overflow-hidden"
        style={{ backgroundColor: "#F8F9FF" }}
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => controls.start(scrollTransition)}
      >
        <motion.div
          animate={controls}
          initial={{ x: "0%" }}
          className="flex gap-4"
          style={{ width: "max-content", paddingTop: 32, paddingBottom: 16 }}
        >
          {doubled.map((s) => (
            <div
              key={s.id}
              className="flex-shrink-0 relative overflow-visible"
              style={{
                width: 170,
                height: 210,
                borderRadius: 20,
                backgroundColor: s.bg,
              }}
            >
              <img
                src={s.img}
                alt="Student"
                className="absolute"
                style={{
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 160,
                  height: 230,
                  objectFit: "cover",
                  objectPosition: "top center",
                  filter: "grayscale(100%)",
                  borderRadius: "0 0 16px 16px",
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default StudentSlider;