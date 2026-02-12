import ThreadItem from './ThreadItem';

function ThreadList({ threads }) {
  if (!threads || threads.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">No threads available.</p>;
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default ThreadList;
