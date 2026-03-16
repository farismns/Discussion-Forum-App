import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread, asyncNeutralVoteThread } from '../states/threads/action';
import toast from 'react-hot-toast';

function ThreadItem({ thread }) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);

  const userId = authUser?.id;

  const upVotes = thread.upVotesBy || [];
  const downVotes = thread.downVotesBy || [];

  const hasUpVoted = userId ? upVotes.includes(userId) : false;
  const hasDownVoted = userId ? downVotes.includes(userId) : false;

  const voteScore = upVotes.length - downVotes.length;

  // ================= VOTE HANDLER =================
  const handleUpVote = (e) => {
    e.preventDefault();

    if (!authUser) {
      toast.error('Please login first');
      return;
    }

    if (hasUpVoted) {
      dispatch(asyncNeutralVoteThread(thread.id));
    } else if (hasDownVoted) {
      dispatch(asyncNeutralVoteThread(thread.id));
    } else {
      dispatch(asyncToggleUpVoteThread(thread.id));
    }
  };

  const handleDownVote = (e) => {
    e.preventDefault();

    if (!authUser) {
      toast.error('Please login first');
      return;
    }

    if (hasDownVoted) {
      dispatch(asyncNeutralVoteThread(thread.id));
    } else if (hasUpVoted) {
      dispatch(asyncNeutralVoteThread(thread.id));
    } else if (voteScore <= 0) {
      return;
    } else {
      dispatch(asyncToggleDownVoteThread(thread.id));
    }
  };

  // ================= FORMAT DATE =================
  const createdAt = new Date(thread.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // ================= OWNER =================
  const ownerName = thread.owner?.name ?? 'Unknown User';

  // ================= BODY PREVIEW =================
  const plainTextBody = thread.body ? thread.body.replace(/<[^>]*>/g, '') : '';

  const bodyPreview = plainTextBody.length > 140 ? `${plainTextBody.slice(0, 140)}...` : plainTextBody;

  return (
    <Link to={`/threads/${thread.id}`}>
      <div className="my-6 bg-white dark:bg-gray-800 p-7 rounded-2xl shadow-md hover:shadow-lg transition duration-200">
        {/* AUTHOR + TIME */}
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span className="font-medium">Created by: {ownerName}</span>
          <span>{createdAt}</span>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{thread.title}</h2>

        {/* BODY PREVIEW */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{bodyPreview}</p>

        {/* FOOTER */}
        <div className="flex items-center gap-6 text-sm">
          {/* UPVOTE */}
          <button onClick={handleUpVote} className={`transition ${hasUpVoted ? 'text-green-600 font-semibold' : 'text-gray-400 hover:text-green-500'}`}>
            ▲
          </button>

          <span className="font-medium text-gray-700 dark:text-gray-200">{voteScore}</span>

          {/* DOWNVOTE */}
          <button onClick={handleDownVote} className={`transition ${hasDownVoted ? 'text-red-600 font-semibold' : 'text-gray-400 hover:text-red-500'}`}>
            ▼
          </button>

          {/* COMMENT COUNT */}
          <span className="text-gray-500">💬 {thread.totalComments} comments</span>
        </div>
      </div>
    </Link>
  );
}

export default ThreadItem;
