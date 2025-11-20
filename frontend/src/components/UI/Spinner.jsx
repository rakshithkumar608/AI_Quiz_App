import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div 
      animate={{ rotate: 360}}
      transition={{ repeat: Infinity, duration: 1, ease: "linear"}}
      className='w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full mx-auto'
    />
  );
};

export default Spinner;