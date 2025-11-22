import React, { useState } from "react";
import Tooltip from "../UI/Tooltip";
import Spinner from "../UI/Spinner";
import { getAIHint } from "../../services/api";

const AIHintIcon = ({ question, token }) => {
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHint = async () => {
    if (!hint) {
      setLoading(true);
      try {
        const aiHint = await getAIHint(question, token);
        setHint(aiHint);
      } catch (error) {
        setHint("Failed to fetch hint");
      }
      setLoading(false);
    }
  };

  return (
    <Tooltip
      text={loading ? <Spinner /> : hint || "Hover to get hint"}
      onMouseEnter={fetchHint}
    >
      <svg
        className="w-5 h-5 text-purple-500 cursor-pointer hover:text-purple-700 transition"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-4a1 1 0 00-1 1v2a1 1 0 002 0V7a1 1 0 00-1-1zm1 6H9v2h2v-2z" />
      </svg>
    </Tooltip>
  );
};

export default AIHintIcon;
