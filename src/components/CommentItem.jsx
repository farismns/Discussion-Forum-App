import { useDispatch, useSelector } from 'react-redux';
import { asyncToggleUpVoteComment, asyncToggleDownVoteComment, asyncNeutralVoteComment } from '../states/threadDetail/action';

function CommentItem({ comment, threadId }) {
  const dispatch = useDispatch();

  // Ambil user login dari Redux
  const authUser = useSelector((state) => state.authUser);

  // Safety check (kalau belum login)
  if (!authUser) return null;

  // Cek apakah user sudah vote
  const isUpVoted = comment.upVotesBy.includes(authUser);
  const isDownVoted = comment.downVotesBy.includes(authUser);

  const handleUpVote = () => {
    dispatch(isUpVoted ? asyncNeutralVoteComment(threadId, comment.id) : asyncToggleUpVoteComment(threadId, comment.id));
  };

  const handleDownVote = () => {
    dispatch(isDownVoted ? asyncNeutralVoteComment(threadId, comment.id) : asyncToggleDownVoteComment(threadId, comment.id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition">
      {/* HEADER */}
      <div className="flex items-start gap-3 mb-3">
        <img src={comment.owner?.avatar} alt={comment.owner?.name} className="w-9 h-9 rounded-full" />

        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{comment.owner?.name}</p>
          <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* BODY */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{comment.content}</p>

      {/* VOTE SECTION */}
      <div className="flex items-center gap-6 text-sm">
        {/* UP VOTE */}
        <button onClick={handleUpVote} className={`flex items-center gap-1 transition ${isUpVoted ? 'text-green-600 font-semibold' : 'text-gray-400 hover:text-green-500'}`}>
          ▲ <span>{comment.upVotesBy.length}</span>
        </button>

        {/* DOWN VOTE */}
        <button onClick={handleDownVote} className={`flex items-center gap-1 transition ${isDownVoted ? 'text-red-600 font-semibold' : 'text-gray-400 hover:text-red-500'}`}>
          ▼ <span>{comment.downVotesBy.length}</span>
        </button>
      </div>
    </div>
  );
}

export default CommentItem;
