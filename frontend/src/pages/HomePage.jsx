import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import heroIllustration from "../assets/heroIllustration.png";
import Model from "../components/UI/Model";
import Toast from "../components/UI/Toast";
import { Menu, User, LogIn, Home } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);
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
      {/* ==================TOP BAR============== */}
      <div className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* LOGo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Home className="w-6 h-6 text-primary" />
            <span className="bg-linear-to-r from-sky-600 to-rose-500 text-transparent bg-clip-text font-bold text-lg">
              QuizMaster AI
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-sky-600 hover:font-bold font-semibold transition "
            >
              Dashboard
            </Link>

            <Link
              to="/scoreboard"
              className="text-gray-700 hover:text-sky-600 hover:font-bold font-semibold transition "
            >
              Scoreboard
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>

              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-3 bg-white shadow-xl rounded-xl p-4 w-44"
                >
                  <button
                    className="w-full text-left flex items-center gap-2 py-2 px-2 text-sm hover:bg-gray-100 rounded-md"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>

                  <button
                    className="w-full text-left flex items-center gap-2 py-2 px-2 text-sm hover:bg-gray-100 rounded-md"
                    onClick={() => navigate("/login")}
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-sky-600 hover:font-bold font-semibold transition block"
            >
              Dashboard
            </Link>
            <Link
              to="/scoreboard"
              className="text-gray-700 hover:text-sky-600 hover:font-bold font-semibold transition block"
            >
              Scoreboard
            </Link>

            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-gray-700"
            >
              <LogIn className="w-4 h-4" /> LogIn
            </button>
          </div>
        )}
      </div>

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
