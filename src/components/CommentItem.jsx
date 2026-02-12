function CommentItem({ comment }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>

      <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          {comment.owner?.avatar && <img src={comment.owner.avatar} alt={comment.owner.name} className="w-6 h-6 rounded-full" />}
          <span>{comment.owner?.name}</span>
        </div>

        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default CommentItem;
