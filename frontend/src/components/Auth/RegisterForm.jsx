import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { motion } from "framer-motion";
import Toast from "../UI/Toast";
import Spinner from "../UI/Spinner";




const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/register", { name, email, password });

      login({ name: res.data.name, email: res.data.email }, res.data.token);

      setToast({
        show: true,
        message: "Registration successful!",
        type: "success",
      });

      navigate("/dashboard");
    } catch (err) {
      setToast({
        show: true,
        message: err.response?.data?.message || "Registration failed",
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <motion.div 
    initial={{ opacity: 0, y: -50}}
    animate={{ opacity: 1, y: 0}} className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-xl relative">
      <Toast
       show={toast.show}
        message={toast.message} 
        type={toast.type} 
        setShow={(v) => setToast({ ...toast, show: v})}/>

        <h2 className="text-3xl font-bold mb-6 text-center">👋 Welcome, Register</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <input type="text" placeholder="Enter your Name" className="p-3 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />

       <input type="email" placeholder="Enter your Email" className="p-3 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />

       <input type=" password" placeholder="Enter your Password" className="p-3 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />

       <motion.button whileTap={{ scale: 0.95}} type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center">{loading ? <Spinner /> : "Register"}
       </motion.button>
        </form>
    </motion.div>
  )
};

export default RegisterForm;
