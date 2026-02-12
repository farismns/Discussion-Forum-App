import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import Loading from '../components/Loading';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Simulasi API call
    setTimeout(() => {
      setThreads([
        {
          id: '1',
          title: 'Belajar Redux Itu Menyenangkan',
          body: 'Redux sebenarnya tidak sesulit yang dibayangkan...',
          createdAt: '2025-02-10T10:00:00Z',
          totalComments: 4,
          owner: {
            name: 'Faris',
            avatar: 'https://i.pravatar.cc/40?img=1',
          },
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Forum Threads</h1>

          <Link to="/create" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow">
            + Create Thread
          </Link>
        </header>

        {loading ? <Loading /> : <ThreadList threads={threads} />}
      </div>
    </div>
  );
}

export default HomePage;
