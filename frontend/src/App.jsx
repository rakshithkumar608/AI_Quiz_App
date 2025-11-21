import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QuizProvider } from "./context/QuizContext";
import Home from "./pages/HomePage";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Dashboard from "./pages/Dashboard";
import GamePage from "./pages/GamePage";
import Scoreboard from "./components/QuizGame/Scoreboard";


const App = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz/:id" element={<GamePage />} />
            <Route path="/scoreboard" element={<Scoreboard />}/>
          </Routes>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
