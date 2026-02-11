import { Link } from 'react-router-dom';

export default function ThreadItem({ id, title, body, createdAt, totalComments, owner }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-md transition">
      {/* Info Pembuat */}
      <div className="flex items-center gap-3 mb-3">
        <img src={owner.avatar} alt={owner.name} className="w-8 h-8 rounded-full" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{owner.name}</span>
      </div>

      {/* Judul */}
      <Link to={`/threads/${id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600">
        {title}
      </Link>

      {/* Potongan Body */}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{body}</p>

      {/* Footer */}
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>{new Date(createdAt).toLocaleString()}</span>
        <span>💬 {totalComments} komentar</span>
      </div>
    </div>
  );
}
