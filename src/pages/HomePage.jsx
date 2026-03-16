import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ThreadList from '../components/ThreadList';
import Loading from '../components/Loading';
import { asyncReceiveThreads } from '../states/threads/action';

function HomePage() {
  const dispatch = useDispatch();

  // Ambil data dari Redux Store
  const threads = useSelector((state) => state.threads);
  const authUser = useSelector((state) => state.auth);

  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    dispatch(asyncReceiveThreads());
  }, [dispatch]);

  if (!threads) {
    return <Loading />;
  }

  // ===============================
  // CATEGORY LOGIC
  // ===============================
  const categories = ['all', ...new Set(threads.map((t) => t.category))];

  const filteredThreads = activeCategory === 'all' ? threads : threads.filter((t) => t.category === activeCategory);

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="px-6 pt-6 pb-4 border-b dark:border-gray-700">
        {/* FLOATING ADD THREAD BUTTON */}
        {authUser && (
          <Link to="/create" className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-500 text-white text-3xl w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition" title="Create Thread">
            +
          </Link>
        )}

        {/* ================= CATEGORY FILTER ================= */}
        <div className="max-w-5xl mx-auto mt-4 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 text-sm rounded-full border transition ${
                activeCategory === category ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ================= THREAD LIST ================= */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-5xl mx-auto">{threads.length === 0 ? <Loading /> : <ThreadList threads={filteredThreads} />}</div>
      </div>
    </div>
  );
}

export default HomePage;
