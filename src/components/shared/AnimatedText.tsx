import { motion } from "framer-motion";

export default function AnimatedText({ children }: { 
  children: React.ReactNode 
}) {
  return (
    <motion.div
      whileHover={{ y: -20 }}
      transition={{ ease: [0.6, 0.05, -0.01, 0.9], duration: 0.4 }}
      className="h-5"
    >
      <span className="flex items-center h-5">
        {children}
      </span>
      <span className="flex items-center h-5">
        {children}
      </span>
    </motion.div>
  )
};