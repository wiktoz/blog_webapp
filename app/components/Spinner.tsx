import { motion } from "framer-motion"

const Spinner = () => {
  return (
    <motion.span
    className="rounded-full w-5 h-5 block border border-[#fff8e4] border-t-[#666]"
    animate={{ rotate: 360 }}
    transition={{
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      duration: 1
    }}
    exit={{ x: -300, opacity: 0 }}
  />
  )
}

export default Spinner