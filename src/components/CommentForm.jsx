function CommentForm({ value, onChange, onSubmit }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Comment</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <textarea
          rows="3"
          required
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          placeholder="Write your comment..."
        />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow">
          Send
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
