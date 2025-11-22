import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";

export default function Toast({ message, type = "info", show, setShow }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-5 right-5 text-white px-6 py-3 rounded shadow-lg ${bgColor}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
