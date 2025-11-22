import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
});

export const getAIHint = async (question, token) =>{
  const res = await API.post(
    "quizzes/ai-hint",
    { question },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.hint;
};

export default API;
