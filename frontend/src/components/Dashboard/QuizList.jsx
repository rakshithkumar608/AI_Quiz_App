import React from 'react'
import QuizCard from './QuizCard'

const QuizList = ({ quizzes, startQuiz}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
      {
        quizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} startQuiz={startQuiz}/>
        ))
      }
    </div>
  )
}

export default QuizList