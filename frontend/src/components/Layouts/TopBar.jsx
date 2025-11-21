import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, scale } from "framer-motion";
import { Menu, User, LogIn, Home, BookOpen, Trophy, Star,  } from "lucide-react";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-linear-to-br from-[#0a0a1a] via-[#111133] to-[#1b0033] text-white">
    <div className="w-full fixed top-0 left-0 z-50 bg-white/10 backdrop-blur-lg shadow-lg border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <Home className="w-6 h-6 text-sky-400 group-hover:text-pink-400 transition" />
          <span className="bg-linear-to-r from-sky-400 to-pink-500 text-transparent bg-clip-text font-bold text-lg group-hover:scale-110 transition">
            QuizMaster AI
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-white hover:text-sky-600 font-semibold transition"
          >
            Dashboard
          </Link>

          <Link
            to="/scoreboard"
            className="text-white hover:text-sky-600 font-semibold transition"
          >
            Scoreboard
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full hover:bg-white/20 transition border border-white/20"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <User className="w-5 h-5 text-gray-200" />
            </button>

            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-3 bg-[#111122] shadow-xl rounded-xl p-4 w-44 border bordr-white/10"
              >
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left flex items-center gap-2 py-2 px-2 text-sm hover:bg-white/10 rounded-md text-gray-200"
                >
                  <User className="w-4 h-4" /> Profile
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full text-left flex items-center gap-2 py-2 px-2 text-sm hover:bg-white/10 rounded-md text-gray-200"
                >
                  <LogIn className="w-4 h-4" /> Login
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <button 
        className="md:hidden" 
        onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1a2b] shadow-md py-4 px-6 space-y-4 border-t border-white/10">
          <Link
            to="/dashboard"
            className="block text-gray-200 hover:text-sky-400 font-semibold"
          >
            Dashboard
          </Link>

          <Link
            to="/scoreboard"
            className="block text-gray-200 hover:text-sky-400 font-semibold"
          >
            Scoreboard
          </Link>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-gray-200"
          >
            <LogIn className="w-4 h-4" /> Login
          </button>
        </div>
      )}
    </div>

    {/* -----------Hero Section--------------- */}
    <div className="pt-32 pb-10 px-6 max-w-6xl mx-auto text-center">
      <motion.h1  
      initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-sky-400 to-purple-500 text-transparent bg-clip-text"
          >
         Level Up Your Knowledge
      </motion.h1>

      <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-lg">Challenge yourself with AI-powered quizzes that adapt to your skills.
        Track progress, earn badges, dominate the scoreboard.
      </p>

      <motion.button 
      onClick={() => navigate("/home")} 
      className="mt-8 px-10 py-3 bg-linear-to-r from-sky-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition">
        Start Quiz Now
      </motion.button>
    </div>

    {/* -------------Features Section---------------*/}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mt-10">
      {[
        {
          icon: <BookOpen className="w-10 h-10 text-sky-400"/>,
          title: "AI Generated Questions",
          desc: "Unique questions for every topic generated instantly.",
        },

        {
          icon: <Trophy className="w-10 h-10 text-purple-400"/>,
           title: "Auto Score Tracking",
            desc: "All scores are calculated, saved & ranked automatically.",
        },

        {
          icon: <Star className="w-10 h-10 text-pink-400"/>,
           title: "Smart Ranking System",
            desc: "Compete on global leaderboards with real-time updates.",
        },
      ].map((card, index) => (
        <motion.div key={index} whileHover={{scale: 1.05 }} className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl text-center">
          
          <div className="mb-3 flex justify-center">{card.icon}</div>
          <h3 className="text-xl font-bold text-white">{card.title}</h3>
          <p className="text-gray-300 text-sm mt-2">{card.desc}</p>
        </motion.div>
      ))}
    </div>

    {/* --------Stats Strip--------- */}
    <div className="grid grid-cols-3 max-w-4xl mx-auto mt-14 text-center">
      <div>
        <h2 className="text-3xl font-bold text-sky-400">10K+</h2>
        <p className="text-gray-400 text-sm">Quizzez Taken</p>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-purple-400">500+</h2>
         <p className="text-gray-400 text-sm">Active Players</p>
      </div>

     <div>
        <h2 className="text-3xl font-bold text-purple-400">120+</h2>
         <p className="text-gray-400 text-sm">AI Topics</p>
      </div>
    </div>

    {/* -----Footer------- */}
    <div className="mt-20 py-6 text-center text-gray-400 text-sm border-t border-white/10">
    © {new Date().getFullYear()} QuizMaster AI – Powered by React & Tailwind
    </div>
    </div>
  );
};

export default TopBar;
