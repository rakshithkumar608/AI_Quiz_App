import { motion } from "framer-motion";


const QuestionCard = ({ question, handleAnswer }) => {
  return (
    <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
     exit={{ x: -300, opacity: 0 }}
     className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto my-4"
    >
     <h2 className="text-xl font-bold mb-4">{question.questionText}</h2>
     <div className="flex flex-col gap-3">
      {question.options.map((opt, ind) => (
        <button 
        key={ind}
        className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => handleAnswer(opt)}
        >
         {opt}
        </button>
      ))}
     </div>
    </motion.div>
  )
}

export default QuestionCard