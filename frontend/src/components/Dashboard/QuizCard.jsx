import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { motion } from "framer-motion";
import AIHintIcon from '../AIHints/AIHintIcon';

const QuizCard = ({ quiz, startQuiz }) => {
  const {user} = useContext(AuthContext)
  return (
    <motion.div 
    initial={{ y: 50, opacity: 0}}
    animate={{ y: 0, opacity: 1}}
    whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.2)"}}
    transition={{ type: "spring", stiffness:120}}
    className='relative bg-linear-to-tr from-white to-gray-50 rounded-2xl shadow-lg p-6 flex flex-col justify-between cursor-pointer border border-gray-100 hover:border-gray-300'
    onClick={() => startQuiz(quiz)}
    >
  
  {/* AI Hint Icon in top-right */}
  {user && (
    <div className="absolute top-4 right-4">
      <AIHintIcon question={`Give a general hint for the quiz: ${quiz.title}`}
      token={user.token}/>
    </div>
  )}

  {/* Title */}
  <h2 className="text-2xl font-extrabold mb-2 text-gray-800 tracking-wide">
    {quiz.title}
  </h2>

  {/* Question count & avgscore */}
  <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
    <span>{quiz.questions.length} Questions</span>
    {quiz.avgScore && <span>Avg Score: {quiz.avgScore.toFixed(1)}</span>}
  </div>

  {/* Gradient start quiz Button */}
  <motion.button
   whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       className="mt-auto px-5 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all"
  >
  Start Quiz
  </motion.button>
    </motion.div>
  )
}

export default QuizCard