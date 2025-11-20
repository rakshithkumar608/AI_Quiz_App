import { motion } from "framer-motion";
import { useState } from "react";

const Tooltip = ({ children, text}) => {
  const [show, setShow] = useState(false);
  return (
    <div 
    className="relative inline-block" 
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
    >
      {children}

      {show && (
        <motion.div  
        initial={{ opacity: 0, y: -5 }}
         animate={{ opacity: 1, y: 0 }}
         className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap z-50"
         >
          {text}
         </motion.div>
      )}
      </div>
  )
}

export default Tooltip