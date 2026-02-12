import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CreateThreadPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Untuk sekarang hanya console.log (dummy)
    console.log({
      title,
      body,
    });

    // Reset form
    setTitle('');
    setBody('');

    // Redirect ke Home (sementara)
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
          ← Back to Threads
        </Link>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Thread</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">Body</label>
              <textarea
                rows="5"
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow">
                Create Thread
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateThreadPage;
