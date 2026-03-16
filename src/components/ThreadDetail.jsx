import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncToggleUpVoteComment, asyncToggleDownVoteComment, asyncNeutralVoteComment, asyncToggleUpVoteThreadDetail, asyncToggleDownVoteThreadDetail, asyncNeutralVoteThreadDetail } from '../states/threadDetails/action';
import toast from 'react-hot-toast';

function ThreadDetail({ threadDetail }) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);

  if (!threadDetail) return null;

  const userId = authUser?.id;

  const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=random';

  // ================= THREAD VOTE =================

  const hasUpVoted = threadDetail.upVotesBy?.includes(userId);
  const hasDownVoted = threadDetail.downVotesBy?.includes(userId);

  const voteScore = (threadDetail.upVotesBy?.length || 0) - (threadDetail.downVotesBy?.length || 0);

  const requireLogin = () => {
    toast.error('Please login first to perform this action');
  };

  const handleUpVoteThread = () => {
    if (!authUser) return requireLogin();

    if (hasUpVoted) {
      dispatch(asyncNeutralVoteThreadDetail(threadDetail.id));
    } else if (hasDownVoted) {
      dispatch(asyncNeutralVoteThreadDetail(threadDetail.id));
    } else {
      dispatch(asyncToggleUpVoteThreadDetail(threadDetail.id));
    }
  };

  const handleDownVoteThread = () => {
    if (!authUser) return requireLogin();

    if (hasDownVoted) {
      dispatch(asyncNeutralVoteThreadDetail(threadDetail.id));
    } else if (hasUpVoted) {
      dispatch(asyncNeutralVoteThreadDetail(threadDetail.id));
    } else if (voteScore <= 0) {
      return;
    } else {
      dispatch(asyncToggleDownVoteThreadDetail(threadDetail.id));
    }
  };

  // ================= FORMAT DATA =================

  const createdAt = new Date(threadDetail.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const ownerName = threadDetail.owner?.name ?? 'Unknown User';
  const ownerAvatar = threadDetail.owner?.avatar || defaultAvatar;

  // ================= COMMENT HANDLERS =================

  const handleUpVoteComment = (commentId, isUp, isDown) => {
    if (!authUser) return requireLogin();

    if (isUp) {
      dispatch(asyncNeutralVoteComment(threadDetail.id, commentId));
    } else if (isDown) {
      dispatch(asyncNeutralVoteComment(threadDetail.id, commentId));
    } else {
      dispatch(asyncToggleUpVoteComment(threadDetail.id, commentId));
    }
  };

  const handleDownVoteComment = (commentId, isDown, isUp, commentScore) => {
    if (!authUser) return requireLogin();

    if (isDown) {
      dispatch(asyncNeutralVoteComment(threadDetail.id, commentId));
    } else if (isUp) {
      dispatch(asyncNeutralVoteComment(threadDetail.id, commentId));
    } else if (commentScore <= 0) {
      return;
    } else {
      dispatch(asyncToggleDownVoteComment(threadDetail.id, commentId));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* BACK BUTTON */}
      <div className="mb-4">
        <Link to="/" className="text-indigo-600 text-sm hover:underline">
          ← Back to Threads
        </Link>
      </div>

      {/* THREAD */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">{threadDetail.title}</h1>

        {/* OWNER WITH AVATAR */}
        <div className="flex items-center gap-3 mt-4">
          <img src={ownerAvatar} alt={ownerName} className="w-10 h-10 rounded-full object-cover" />

          <div className="text-sm text-gray-500">
            <p>
              Created by <b>{ownerName}</b>
            </p>
            <p>{createdAt}</p>
          </div>
        </div>

        <div className="mt-4" dangerouslySetInnerHTML={{ __html: threadDetail.body }} />

        {/* THREAD VOTE */}
        <div className="flex items-center gap-6 mt-6">
          <button onClick={handleUpVoteThread} className={hasUpVoted ? 'text-green-600 font-bold' : 'text-gray-400 hover:text-green-500'}>
            ▲
          </button>

          <span>{voteScore}</span>

          <button onClick={handleDownVoteThread} className={hasDownVoted ? 'text-red-600 font-bold' : 'text-gray-400 hover:text-red-500'}>
            ▼
          </button>
        </div>
      </div>

      {/* COMMENTS */}
      <div className="mt-6 space-y-4">
        {threadDetail.comments?.map((comment) => {
          const commentOwner = comment.owner?.name ?? 'Unknown User';
          const commentAvatar = comment.owner?.avatar || defaultAvatar;

          const commentUp = comment.upVotesBy?.includes(userId);
          const commentDown = comment.downVotesBy?.includes(userId);

          const commentScore = (comment.upVotesBy?.length || 0) - (comment.downVotesBy?.length || 0);

          return (
            <div key={comment.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              {/* COMMENT OWNER WITH AVATAR */}
              <div className="flex items-center gap-3">
                <img src={commentAvatar} alt={commentOwner} className="w-8 h-8 rounded-full object-cover" />

                <div>
                  <p className="font-semibold">{commentOwner}</p>
                  <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString('id-ID')}</p>
                </div>
              </div>

              <div className="mt-2" dangerouslySetInnerHTML={{ __html: comment.content }} />

              {/* COMMENT VOTE */}
              <div className="flex items-center gap-5 mt-3">
                <button onClick={() => handleUpVoteComment(comment.id, commentUp, commentDown)} className={commentUp ? 'text-green-600 font-bold' : 'text-gray-400 hover:text-green-500'}>
                  ▲
                </button>

                <span>{commentScore}</span>

                <button onClick={() => handleDownVoteComment(comment.id, commentDown, commentUp, commentScore)} className={commentDown ? 'text-red-600 font-bold' : 'text-gray-400 hover:text-red-500'}>
                  ▼
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ThreadDetail;
