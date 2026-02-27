import { motion } from "framer-motion";

const EnquireTab = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      whileHover={{
        backgroundColor: "#FFFFFF",
        color: "#F97316",
        borderColor: "#F97316",
      }}
      whileTap={{ scale: 0.96 }}
      className="fixed right-0 top-1/2 z-40 bg-brand-orange text-white font-bold py-4 px-3 rounded-l-2xl shadow-lg border-2 border-transparent"
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: "translateY(-50%) rotate(180deg)",
        transition: "background-color 0.25s, color 0.25s, border-color 0.25s",
      }}
      aria-label="Enquire Now"
    >
      Enquire Now
    </motion.button>
  );
};

export default EnquireTab;
