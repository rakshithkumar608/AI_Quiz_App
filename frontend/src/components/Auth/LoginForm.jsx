import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Toast from "../UI/Toast";
import Spinner from "../UI/Spinner";
 import API from "../../services/api";

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ 
    show: false, 
    message: "", 
    type: "info"
   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });

      login(
        { name: res.data.name,
           email: res.data.email}, 
           res.data.token);

      setToast({ 
        show: true, 
        message: "Login successful!",
         type: "success" });

      navigate("/dashboard");

    } catch (error) {
      setToast({ 
        show: true, 
        message: error.response?.data?.message || "Login failed", 
        type: "error" 
      });
    }
    setLoading(false);
  }


  return (
    <motion.div 
    initial={{ opacity: 0, y: -50}}
    animate={{ opacity: 1, y: 0 }}
    className='max-w-md mx-auto mt-24 p-8 bg-white rounded-xl shadow-xl relative border border-gray-200'
    >
   
   <Toast 
   show={toast.show} 
   message={toast.message} 
   type={toast.type} 
   setShow={(v) => setToast({ ...toast, 
   show: v })}
   />

   <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

   <form 
   onSubmit={handleSubmit}
    className="flex flex-col gap-4">
     
     <input 
     type='email' 
     placeholder='Enter Your Email' className='p-3 border rounded' 
     value={email} 
     onChange={(e) => setEmail(e.target.value)} required
     />
    

    <input 
     type='password' 
     placeholder='Enter Your Password' className='p-3 border rounded' 
     value={password} 
     onChange={(e) => setPassword(e.target.value)} required
     />

    <motion.button>

    </motion.button>

    </form>
    </motion.div>
  )
}

export default LoginForm