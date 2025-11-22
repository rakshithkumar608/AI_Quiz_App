import { useState } from "react";
import API from "../../services/api";
import Spinner from "../UI/Spinner";
import Toast from "../UI/Toast";



const AIHint = ({ question }) => {
 const [loading, setLoading] = useState(false);
 const [toast, setToast] = useState({ show: false, message: "", type: "info" });
 const [hint, setHint] = useState(null);

 const getHint = async () => {
  setLoading(true);
  try {
    const res = await API.post("/ai/hint", { question });
    setHint(res.data.hint);
   setToast({ show: true, message: "AI Hint generated!", type: "success" });

   } catch (err) {
    setToast({ show: true, message: "Failed to get hint", type: "error" });
   }
  setLoading(false);
 };

 return (
   <div className="my-4 relative">
     <Toast show={toast.show} message={toast.message} type={toast.type} setShow={(v) => setToast({ ...toast, show: v })} />
     <button
       className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark transition flex items-center justify-center"
      onClick={getHint}
       disabled={loading}
     >

       {loading ? <Spinner /> : "Get AI Hint"}
     </button>
     {hint && <p className="mt-2 p-2 bg-yellow-100 rounded">{hint}</p>}
   </div>
 );

};


export default AIHint;