import ThreadItem from './ThreadItem';

function ThreadList({ threads, loading = false }) {
  // Loading State
  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-gray-500 dark:text-gray-400">Loading threads...</p>
      </div>
    );
  }

  // Empty State
  if (!threads || threads.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400 text-sm">No threads available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default ThreadList;
