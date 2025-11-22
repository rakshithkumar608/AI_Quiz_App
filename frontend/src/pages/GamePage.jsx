import { useState } from "react";
import { useLocation } from "react-router-dom";

import QuestionCard from "../components/QuizGame/QuestionCard";
import AIHint from "../components/AIHints/AIHint";
import Timer from "../components/QuizGame/Timer";
import Scoreboard from "../components/QuizGame/Scoreboard";
import Model from "../components/UI/Model";        // FIXED
import Toast from "../components/UI/Toast";
import API from "../services/api";

const GamePage = () => {
  const { state } = useLocation();
  const quiz = state.quiz;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const handleAnswer = (answer) => {
    const updatedAnswers = [
      ...answers,
      { questionId: quiz.questions[currentIndex]._id, answer },
    ];

    setAnswers(updatedAnswers);

    const correct = quiz.questions[currentIndex].correctAnswer === answer;

    setToast({
      show: true,
      message: correct ? "Correct!" : "Wrong!",
      type: correct ? "success" : "error",
    });

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitQuiz(updatedAnswers);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    setLoading(true);
    try {
      const res = await API.post(`/quizzes/${quiz._id}/submit`, {
        answers: finalAnswers,
      });

      setScore(res.data.score);

      setToast({
        show: true,
        message: "Quiz submitted successfully!",
        type: "success",
      });

    } catch (err) {
      setToast({
        show: true,
        message: "Failed to submit quiz!",
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleTimeUp = () => {
    handleAnswer(null);
  };

  if (score !== null) {
    return <Scoreboard score={score} total={quiz.questions.length} />;
  }

  const question = quiz.questions[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Modal */}
      <Model
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Quiz Instructions"
      >
        <p>Answer all questions. Use AI hints if stuck. A timer runs for each question.</p>
      </Model>

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        setShow={(v) => setToast({ ...toast, show: v })}
      />

      {!showModal && (
        <>
          <Timer duration={15} onTimeUp={handleTimeUp} />

          <QuestionCard
            question={question}
            handleAnswer={handleAnswer}
          />

          <AIHint question={question.questionText} />
        </>
      )}
    </div>
  );
};

export default GamePage;
