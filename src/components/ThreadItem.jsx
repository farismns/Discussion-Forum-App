import { Link } from 'react-router-dom';

function ThreadItem({ thread }) {
  return (
    <Link to={`/threads/${thread.id}`}>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow hover:shadow-md transition">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{thread.title}</h2>

        {/* Body Preview */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{thread.body}</p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
          {/* Owner */}
          <div className="flex items-center gap-2">
            {thread.owner?.avatar && <img src={thread.owner.avatar} alt={thread.owner.name} className="w-6 h-6 rounded-full" />}
            <span>{thread.owner?.name}</span>
          </div>

          {/* Date & Comments */}
          <div>
            {new Date(thread.createdAt).toLocaleDateString()} • {thread.totalComments} comments
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ThreadItem;
