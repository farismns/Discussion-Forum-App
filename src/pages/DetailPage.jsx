import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CommentList from '../components/CommentList';
import Loading from '../components/Loading';

function DetailPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([
    {
      id: 'c1',
      content: 'Setuju sekali! Penjelasan Redux memang harus dipahami alurnya.',
      createdAt: '2025-02-10T12:00:00Z',
      owner: {
        name: 'Maulana',
        avatar: 'https://i.pravatar.cc/40?img=2',
      },
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const thread = {
    id,
    title: 'Belajar Redux Itu Menyenangkan',
    body: 'Redux sebenarnya tidak sesulit yang dibayangkan jika dipahami alurnya dengan benar.',
    createdAt: '2025-02-10T10:00:00Z',
    owner: {
      name: 'Faris',
      avatar: 'https://i.pravatar.cc/40?img=1',
    },
  };

  // Simulasi fetch API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      content: newComment,
      createdAt: new Date().toISOString(),
      owner: {
        name: 'You',
        avatar: null,
      },
    };

    setComments((prevComments) => [comment, ...prevComments]);
    setNewComment('');
  };

  // 🔥 Tampilkan loading sebelum render konten
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
          ← Back to Threads
        </Link>

        {/* Thread Detail */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{thread.title}</h1>

          <p className="text-gray-700 dark:text-gray-300 mt-4 whitespace-pre-line">{thread.body}</p>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              {thread.owner.avatar && <img src={thread.owner.avatar} alt={thread.owner.name} className="w-8 h-8 rounded-full" />}
              <span>{thread.owner.name}</span>
            </div>

            <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Comment Form */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Comment</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              rows="3"
              required
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="block w-full rounded-md border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Write your comment..."
            />

            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow">
              Post Comment
            </button>
          </form>
        </div>

        {/* Comments List */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comments ({comments.length})</h2>

          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
