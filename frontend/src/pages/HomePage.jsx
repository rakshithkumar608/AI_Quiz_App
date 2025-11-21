import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import heroIllustration from "../assets/heroIllustration.png";
import Model from "../components/UI/Model";
import Toast from "../components/UI/Toast";

import Navbar from "../components/Layouts/Navbar";


const sampleQuizzes = [
  {
    id: "1",
    title: "General Knowledge",
    questions: 5,
  },

  {
    id: "2",
    title: "Science Trivia",
    questions: 5,
  },

  {
    id: "3",
    title: "History Quiz",
    questions: 5,
  },
];

const HomePage = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });
 
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!selectedQuiz) {
      setToast({
        show: true,
        message: "Select a quiz first!",
        type: "error",
      });
      return;
    }
    setModelOpen(false);
    navigate(`/quiz/${selectedQuiz.id}`, {
      state: { quiz: selectedQuiz },
    });
  };

  return (
    <>
    <Navbar />
     
      <div className=" relative overflow-hidden min-h-screen bg-linear-to-r from-indigo-50 to-purple-50 flex flex-col md:flex-row items-center px-6 md:px-20 py-10">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-r from-purple-300 to-indigo-300 rounded-full opacity-30 animate-spin mix-blend-multiply filter blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-r from-pink-300 to-yellow-300 rounded-full opacity-30 animate-spin animation-delay-2000 mix-blend-multiply filter blur-3xl"></div>

        {/* Left Side - hero text */}
        <div className="flex-1 space-y-6 md:pr-10 z-10">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold leading-tight text-gray-900"
          >
            Welcome to{" "}
            <span className="bg-linear-to-r from-sky-400 to-rose-300 text-transparent bg-clip-text animate-pulse">
              QuizMaster AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-700"
          >
            Try a sample quiz instantly! Click any quiz below to start a live
            preview.
          </motion.p>
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {sampleQuizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                className={`p-6 bg-white rounded-xl shadow-card hover:shadow-cardHover transition transform hover:-translate-y-2 cursor-pointer ${
                  selectedQuiz?.id === quiz.id ? "border-4 border-primary" : ""
                }`}
                onClick={() => setSelectedQuiz(quiz)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-bold text-lg mb-2">{quiz.title}</h3>
                <p className="text-gray-500">{quiz.questions} Questions</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="mt-6">
            <Button
              variant="accent"
              onClick={() => setModelOpen(true)}
              className="hover:scale-105 transform transition "
            >
              Start Quiz Preview
            </Button>
          </motion.div>
        </div>

        {/* Right side:- hero illustration */}

        <motion.div
          className="flex-1 mt-10 md:mt-0 flex justify-center z-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <img
            src={heroIllustration}
            alt="Quiz Hero"
            className="w-full max-w-lg rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* Model for Quiz Preview */}
        <Model
          show={modelOpen}
          onClose={() => setModelOpen(false)}
          title={selectedQuiz?.title || "Select a Quiz"}
        >
          {selectedQuiz ? (
            <div>
              <p className="mb-4">
                This quiz has {selectedQuiz.questions} questions. Are you ready
                to start?
              </p>
              <Button variant="secondary" onClick={handleStartQuiz}>
                Start Quiz
              </Button>
            </div>
          ) : (
            <p>Please select a quiz card first.</p>
          )}
        </Model>

        {/* Toast */}
        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          setShow={(v) => setToast({ ...toast, show: v })}
        />
      </div>
    </>
  );
};

export default HomePage;
