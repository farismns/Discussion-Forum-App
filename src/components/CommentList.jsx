import CommentItem from './CommentItem';

function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 text-sm">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
