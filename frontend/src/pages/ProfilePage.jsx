import React, { useEffect, useState } from 'react';
import Navbar from '../components/Layouts/Navbar';
import { Edit3, Mail } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Rakshith Kumar",
    email: "rakshith@gmail.com",
     avatar: "https://ui-avatars.com/api/?name=R+K&background=0D8ABC&color=fff",
  });

  const [stats, setStats] = useState({
    totalQuizzes: 0,
     highestScore: 0,
    averageScore: 0,
  });

  const [history, setHistory] = useState([]);
  const [editing, setEditing] = useState(false);

  //load quiz data from localstorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);

    if(savedHistory.length > 0) {
      const total = savedHistory.length;
      const highest = Math.max(...savedHistory.map((h) => h.score));
      const avg = 
      savedHistory.reduce((acc, h) => acc + h.score, 0) / savedHistory.length;

      setStats({
        totalQuizzes: total,
        highestScore: highest,
        averageScore: Math.round(avg), 
      });
    } else {
      setStats({
        totalQuizzes: 0,
        highestScore: 0,
        averageScore: 0,
      });
    }

  }, []);

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <>
    <Navbar />
    <div className='min-h-screen bg-gray-100 p-6 pt-24'>
      <div className="max-w-3xl mx-auto">
         

         {/* Profile card */}
         <div className="bg-white rounded-xl shadow-lg p-6 flex gap-6 items-center">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-2 border-blue-500"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">{user.name}

            <Edit3 className='w-5 h-5 text-blue-600 cursor-pointer' onClick={() => setEditing(true)}/>
            </h2>

            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <Mail className='w-4 h-4'/> {user.email}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg border">
                <p className="text-xl font-bold text-blue-600">{stats.totalQuizzes}</p>
                 <p className="text-gray-600 text-sm">Total Quizzes</p>
              </div>

               <div className="bg-gray-50 p-3 rounded-lg border">
                <p className="text-xl font-bold text-blue-600">{stats.highestScore}%</p>
                <p className="text-gray-600 text-sm">Highest Score</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border">
                <p className="text-xl font-bold text-blue-600">{stats.averageScore}%</p>
                <p className="text-gray-600 text-sm">Avg Score</p>
              </div> 
            </div>
          </div>
         </div>


         {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Recent Activity</h3>

          {history.length === 0 ? (
            <p className="text-gray-500">No quizzes attempted yet.</p>
          ) : (
            <div className="space-y-3">
              {history.map((quiz, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md border">
                  <p className="font-semibold">{quiz.quizName}</p>
                  <p className="text-gray-600 text-sm">Score: {quiz.score}%</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Edit Popup */}

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>

             <input
              className="w-full mb-3 p-2 border rounded"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <input
              className="w-full mb-3 p-2 border rounded"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

             <div className="flex justify-between gap-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-1 bg-gray-300 rounded text-left"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    

    

    </>
  )
}

export default ProfilePage