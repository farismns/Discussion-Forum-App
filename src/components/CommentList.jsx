import CommentItem from './CommentItem';

function CommentList({ comments, threadId }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} threadId={threadId} />
      ))}
    </div>
  );
}

export default CommentList;
