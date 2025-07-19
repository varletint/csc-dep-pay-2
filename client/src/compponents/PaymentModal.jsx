import ReactDOM from "react-dom";
import { motion } from "framer-motion";

export default function PaymentModal({ open, children, onClose }) {
  const modal = document.querySelector("modal");
  console.log({ onClose });

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <motion.div
      className=' z-[100]  modal popup
      min-h-screen w-full transition-all duration-200 ease-in-out  bg-red-500'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }}>
      {children}
    </motion.div>,
    document.getElementById("portal")
  );
}
