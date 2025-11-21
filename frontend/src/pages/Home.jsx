import { motion } from "framer-motion";


const sampleQuizzes = [
  {id: "1", title: "General Knowledge", questions: 5},
  
]


const Home = () => {
  return (
    <div className='relative overflow-hidden min-h-screen bg-linear-to-r from-indigo-50 to-purple-50 flex flex-col md:flex-row items-center px-6 md:px-20 py-10'>

      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-r from-purple-300 to-indigo-300 rounded-full opacity-30 animate-spin mix-blend-multiply filter blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-r from-pink-300 to-yellow-300 rounded-full opacity-30 animate-spin animation-delay-2000 mix-blend-multiply filter blur-3xl"></div>

      {/* Left Side - hero text */}
      <div className="flex-1 space-y-6 md:pr-10 z-10">
        <motion.h1 
        initial={{ y: -50, opacity: 0}}
        animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 1 }}
         className="text-5xl md:text-6xl font-bold leading-tight text-gray-900"
        >
          Welcome to{" "}
          <span className="bg-linear-to-r from-sky-400 to-rose-300 text-transparent bg-clip-text animate-pulse">QuizMaster AI</span>
        </motion.h1>

        <motion.p 
        initial={{ y: -20, opacity: 0}}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.3 }}
         className="text-lg md:text-xl text-gray-700"
        >
        Try a sample quiz instantly! Click any quiz below to start a live preview.
        </motion.p>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {sampleQuizzes.map((quiz) => (
            <motion.div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Home