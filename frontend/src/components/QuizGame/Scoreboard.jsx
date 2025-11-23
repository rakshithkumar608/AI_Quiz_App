import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";

// FIREWORKS
const Firework = ({ x }) => (
  <motion.div
   initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: [0, 1.5, 0.8, 1.2, 0], opacity: [1, 1, 0.8, 0.4, 0] }}
    transition={{ duration: 2 }}
    className="absolute"
    style={{ left: x, top: Math.random() * 200 + 50 }}
  >
    <div className="w-4 h-4 bg-white/70 rounded-full absolute blur-sm -translate-x-1/2 -translate-y-1/2"></div>

    {[...Array(12)].map((_,i) => {
      const angle = (i / 12) * Math.PI * 2;
      const spreadX = Math.cos(angle) * 80;
      const spreadY = Math.sin(angle) * 80;
      return (
        <motion.span 
        key={i}
        initial={{ x:0, y:0, opacity:1}}
        animate={{ x: spreadX, y:spreadY, opacity: 0}}
        transition={{ duration: 1.5}}
        className='w-2 h-2 rounded-full bg-linear-to-r from-pink-400 to-yellow-400 absolute'
        />
      );
    })}
  </motion.div>
);


// ---------Animaated Crown for gold rank---------
const AnimatedCrown = () => (
  <motion.div
  initial={{ y: -20, rotate: -20, opacity: 0 }}
  animate={{ y: 0, rotate: 0, opacity: 1 }}
  transition={{ duration: 0.6, type: "spring" }}
  className='absolute -top-6 left-1/2 -translate-x-1/2 text-5xl drop-shadow-[0_0_10px_gold]'
  >
 👑
  </motion.div>
);


// ---------Rocket score Enhance------
const RocketScore = ({ score }) => (
  <motion.div  
  initial={{ x: -200, rotate: -45, opacity: 0 }}
    animate={{ x: 0, rotate: 0, opacity: 1 }}
    transition={{ duration: 0.8, type: "spring" }}
    className='flex items-center gap-3 text-4xl font-extrabold text-white mt-4'
    >
   🚀 <span>{score}</span>
    </motion.div>
);

// ------XP Card--------
const XPLevelCard = ({ xp, level }) => {
  const nextLevelXP = (level + 1) * 1000;
  const progress = (xp / nextLevelXP ) * 100;

  return(
    <motion.div
     initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-[350px] mt-8 p-8 rounded-3xl bg-white/10 backdrop-blur-xl text-center border bordr-white/20 shadow-[0_0_40px_rgba(140,0,255,0.6)]'
    >
    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
       ⭐ Level {level}
    </h2>

    <p className="text-white/70 mt-2">{xp} XP Earned</p>

    <div className="mt-6">
      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
      <motion.div 
      initial={{ width: 0}}
      animate={{ width: `${progress}%`}}
      transition={{ duration: 1}}
      className='h-full bg-linear-to-r from-purple-500 via-pink-500 to-yellow-400 shadow-lg'
      ></motion.div>
      </div>
      <p className="mt-2 text-xs text-white/60">
      {nextLevelXP - xp} XP to next level
      </p>
    </div>
    </motion.div>
  )
};

// -------Share popup------------
const SharePopup = ({ onClose, score}) =>  (
  <motion.div 
   initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className='fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center'
  >
    <div className="bg-white/10 p-6 rounded-3xl bordr border-white/20 text-center w-[300px]">
    <h3 className="text-xl font-bold text-white">Share Results</h3>
    <p className="text-white/70 mt-2">I scored {score} points! 🔥</p>

    <button 
    onClick={onClose}
    className="mt-5 bg-white/20 px-5 py-2 rounded-xl text-white">Close</button>
    </div>

  </motion.div>
);

// ----main component---------

const Scoreboard = ({ players = [], xp, level, score}) => {
  const [fireworks, setFireworks] = useState([]);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFireworks((p) => [...p, {id:Date.now(), x: Math.random() * window.innerWidth}]);
    }, 700);
    return () => clearInterval(t);
  }, []);

  const sorted = Array.isArray(players)
    ? [...players].sort((a, b) => b.score - a.score)
    : [];

  return (
    <div className='relative min-h-screen bg-black flex flex-col items-center justify-start overflow-hidden pt-20'>

      {/* FIREWORKS */}
      {fireworks.map((fw) => (
        <Firework key={fw.id} x={fw.x}/>
      ))}

      {/* LeaderBoard Card */}
      <motion.div 
      initial={{ rotateY: 90, opacity: 0}}
      animate={{ rotateY: 0, opacity: 1}}
      transition={{ duration:0.6 }}
      className='w-[400px] bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 relative'
      >
      <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
        🏆 Leaderboard
      </h1>

      <div className="mt-6 space-y-4">
        {sorted.map((player, index) => (
          <motion.div
          key={player.id}
          initial={{ x: -30, opacity: 0}}
          animate={{ x: 0, opacity: 1}}
          transition={{ delay: index * 0.12}}
          className={`relative flex justify-between items-center px-5 py-3 rounded-2xl   ${index === 0 ? "bg-yellow-400 text-black shadow-xl" :
                index === 1 ? "bg-gray-300 text-black" :
                index === 2 ? "bg-orange-300 text-black" :
                "bg-white/10 text-white border border-white/10"}` }
         
          >
            {index === 0 && <AnimatedCrown />}
            <span className='font-bold text-lg'>{index + 1}.{player.name}</span>
            <span className='text-xl font-extrabold'>{player.score}</span>
          </motion.div>
        ))}
      </div>

      <RocketScore score={score}/>

      <button 
      onClick={() => setShareOpen(true)}
      className="mt-5 bg-white/20 px-5 py-2 rounded-xl text-white w-full">
      Share Result
      </button>
      </motion.div>

      <XPLevelCard xp={xp} level={level}/>

      {shareOpen && <SharePopup score={score} onClose={() => setShareOpen(false)}/>}
    </div>
  )
}

export default Scoreboard