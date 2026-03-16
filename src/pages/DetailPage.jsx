import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail, asyncAddComment } from '../states/threadDetails/action';
import Loading from '../components/Loading';
import ThreadDetail from '../components/ThreadDetail';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const threadDetail = useSelector((state) => state.threadDetail);

  const [comment, setComment] = useState('');

  // Ambil data thread saat halaman dibuka
  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return <Loading />;
  }

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    dispatch(
      asyncAddComment({
        threadId: id,
        content: comment,
      }),
    );

    setComment('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <ThreadDetail threadDetail={threadDetail} />

      {/* COMMENT FORM */}
      <div className="max-w-3xl mx-auto mt-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <form onSubmit={handleSubmitComment}>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your comment..." className="w-full border rounded p-2" required />

          <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">Post Comment</button>
        </form>
      </div>
    </div>
  );
}

export default DetailPage;
