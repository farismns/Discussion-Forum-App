import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import toast from 'react-hot-toast';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authUser } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      toast('Title and Body are required');
      return;
    }

    await dispatch(
      asyncAddThread({
        title,
        body,
        category,
      }),
    );

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* BACK BUTTON */}
        <Link to="/" className="inline-block mb-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to Threads
        </Link>

        {/* CARD */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h1 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Create New Thread</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* TITLE */}
            <input className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

            {/* CATEGORY */}
            <input className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Category (optional)" value={category} onChange={(e) => setCategory(e.target.value)} />

            {/* BODY */}
            <textarea className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" rows="6" placeholder="Write something..." value={body} onChange={(e) => setBody(e.target.value)} required />

            {/* SUBMIT */}
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition">
              Create Thread
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateThreadPage;
