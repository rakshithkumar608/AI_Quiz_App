import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, User, LogIn, Home } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
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
            className="text-gray-700 hover:text-sky-600 font-semibold transition"
          >
            Dashboard
          </Link>

          <Link
            to="/scoreboard"
            className="text-gray-700 hover:text-sky-600 font-semibold transition"
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
                  onClick={() => navigate("/profile")}
                  className="w-full text-left flex items-center gap-2 py-2 px-2 text-sm hover:bg-gray-100 rounded-md"
                >
                  <User className="w-4 h-4" /> Profile
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full text-left flex items-center gap-2 py-2 px-2 text-sm hover:bg-gray-100 rounded-md"
                >
                  <LogIn className="w-4 h-4" /> Login
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4">
          <Link
            to="/dashboard"
            className="block text-gray-700 hover:text-sky-600 font-semibold"
          >
            Dashboard
          </Link>

          <Link
            to="/scoreboard"
            className="block text-gray-700 hover:text-sky-600 font-semibold"
          >
            Scoreboard
          </Link>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-gray-700"
          >
            <LogIn className="w-4 h-4" /> Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;  