import { createContext, useState } from "react";


export const QuizContext = createContext();

export const QuizProvider = ({ children}) => {

  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

// start the Quiz
  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setAnswer([]);
    setScore(null);
  };

  //Submitting the answer
  const submitAnswer = (questionId, answer ) => {
    setAnswer([...answer, { questionId, answer}]);
  };

  // reset to play again
  const resetQuiz = () => {
    setCurrentQuiz(null);
    setAnswer([]);
    setScore(null);
  };


  return(
    <QuizContext.Provider 
    value={{
      currentQuiz,
      answer,
      score,
      loading,
      setLoading,
      startQuiz,
      submitAnswer,
      setScore,
      resetQuiz,
    }}
    >{children}
    </QuizContext.Provider>
  );


};