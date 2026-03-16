import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const leaderboards = useSelector((state) => state.leaderboards);

  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  // ================= LOADING =================
  if (leaderboards === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-500">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <div className="max-w-3xl mx-auto">
        {/* ================= BACK BUTTON ================= */}
        <button onClick={() => navigate(-1)} className="mb-4 text-sm text-indigo-600 hover:underline cursor-pointer">
          ← Back To Threads
        </button>

        {/* ================= TITLE ================= */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Aktivitas Teratas</h1>

        {/* ================= INFO SCORING ================= */}
        <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
          <p className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Aktivitas yang Menambah Skor:</p>
          <ul>Peringkat dihitung berdasarkan aktivitas membuat thread, komentar, serta interaksi yang mendapat respon dari pengguna lain.</ul>
        </div>

        {/* ================= LIST ================= */}
        <div className="space-y-4">
          {leaderboards.map((item, index) => {
            const isCurrentUser = authUser && item.user.id === authUser.id;

            return (
              <div
                key={item.user.id}
                className={`flex justify-between items-center px-5 py-4 rounded-lg shadow transition
                ${isCurrentUser ? 'bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-400' : 'bg-white dark:bg-gray-800'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold w-5">{index + 1}</span>

                  <img src={item.user.avatar} alt={item.user.name} className="w-10 h-10 rounded-full" />

                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.user.name}
                    {isCurrentUser && <span className="ml-2 text-sm text-indigo-500 font-semibold">(you)</span>}
                  </span>
                </div>

                <span className="font-bold text-indigo-600">{item.score}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
