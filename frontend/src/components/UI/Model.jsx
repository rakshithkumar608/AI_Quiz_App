import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const Model = ({ show, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
        <motion.div 
        initial= {{ opacity: 0 }}
        animate= {{ opacity: 0.6 }}
        exit= {{ opacity: 0 }}
        className='fixed inset-0 bg-black z-40'
        onClick={onClose}
        />
        <motion.div 
        initial={{ y: "-100vh", opacity: 0 }}
         animate= {{ y: "0", opacity: 1 }}
        exit= {{ y: "-100vh", opacity: 0 }}
        className='fixed inset-x-0 top-20 mx-auto max-w-md p-6 bg-white rounded-xl shadow-xl z-50'
      >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div>{children}</div>
      <button 
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
        Close
        </button>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Model