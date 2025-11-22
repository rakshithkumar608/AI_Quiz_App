import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { motion } from "framer-motion";
import Spinner from "../components/UI/Spinner";
import AIHintIcon from "../components/AIHints/AIHintIcon";
import Button from "../components/UI/Button";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get("/quizzes");
        setQuizzes(res.data);
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
      }
      setLoading(false);
    };
    fetchQuizzes();
  }, []);

  const startQuiz = (quiz) => {
    navigate(`/quiz/${quiz._id}`, { state: { quiz } });
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 px-6 py-10 overflow-hidden">
      {/* Floating background element */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-r from-purple-300 to-indigo-300 rounded-full opacity-20 animate-pulse animation-delay-2000 mix-blend-multiply filter blue-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-r from-pink-300 to-yellow-300 rounded-full opacity-20 animate-blob animation-delay-2000 mix-blend-multiply filter blur-3xl"></div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10"
      >
        Your Quizzes
      </motion.h1>
      {loading ? (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {quizzes.map((quiz) => (
            <motion.div
              key={quiz._id}
              className="bg-white rounded-2xl shadow-card p-6 flex flex-col justify-between transform transition-all hover:-translate-y-2 hover:shadow-cardHover cursor-pointer group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Quiz INfo */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{quiz.title}</h3>

                {/* AI Hint Icon */}
                {user && (
                  <div className="ml-2">
                    <AIHintIcon
                      question={`Give a general hint for the quiz: ${quiz.title}`}
                      token={user.token}
                    />
                  </div>
                )}
              </div>

              <p className="text-gray-500">
                {quiz.description || "Test your knowledge!"}
              </p>

              {/* Expandable Quiz Preview on Hover  */}
              <motion.div
                className="mt-4 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-sm font-semibold text-gray-600">
                  Preview Questions:
                </h4>
                {quiz.questions?.length > 3 && (
                  <p className="text-gray-400 text-xs">and more...</p>
                )}
              </motion.div>

              {/* Stats& Start Button */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Avg Score: {quiz.avgScore || 0}%
                </span>
                <Button variant="accent" onClick={() => startQuiz(quiz)}>
                  Start
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
