import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
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

   <h2 className="text-3xl font-bold mb-6 text-center text-gray-800"> Welcome Back 👋</h2>

   <p className="text-center text-gray-500 mb-6 font-semibold">Please login to your account</p>

   <form 
   onSubmit={handleSubmit}
    className="flex flex-col gap-4">
     
    {/* Email */}
    <div>
      <label className='text-sm text-gray-600 ml-1 font-semibold'>Email : </label>
     <input 
     type='email' 
     placeholder='Enter Your Email' className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition' 
     value={email} 
     onChange={(e) => setEmail(e.target.value)} required
     />
     </div>

     {/* Password */}
    
    <div>
      <label  className="text-sm text-gray-600 ml-1 font-semibold">Password : </label>
    <input 
     type='password' 
     placeholder='Enter Your Password' className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition' 
     value={password} 
     onChange={(e) => setPassword(e.target.value)} required
     />
     </div>

     {/* Forget password */}
     <div className="flex justify-end">
      <Link to="/forget-password" className='text-sm text-blue-600 hover:underline'>Forget password?</Link>
     </div>

     {/* Login Button */}

    <motion.button
     whileTap={{ scale: 0.95 }} 
     type='submit' 
     className='p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center'>
     {loading ? <Spinner /> : "Login"}
    </motion.button>

    </form>

    {/* Registre link */}
    <p className="text-center text-gray-600 mt-6">Don't have an account?{" "}
      <Link 
      to="/register"
       className='text-blue-600 font-medium hover:underline'>Create Account</Link>
    </p>
    </motion.div>
  )
}

export default LoginForm