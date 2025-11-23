import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";

const Timer = ({ duration, onTimeUp }) => {

  const [time, setTime] = useState(duration);
  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const progress = (time / duration) * 100;

  return (
    <div className='w-full h-4 bg-gray-300 rounded-full overflow-hidden my-4'>
      <motion.div className='h-full bg-linear-to-r from-green-400 to-blue-500'
      initial={{ width: "100%" }}
      animate={{ width: `${progress}%` }}
       transition={{ ease: "linear", duration: 0.5 }} />

     
    </div>
  )
}

export default Timer