import LeaderboardItem from './LeaderBoardItem';
import Loading from './Loading';

function LeaderboardList({ leaderboard }) {
  // ================= LOADING STATE =================
  if (leaderboard === null) {
    return <Loading />;
  }

  // ================= EMPTY STATE =================
  if (leaderboard.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 text-center">No active users yet.</p>;
  }

  // ================= DATA READY =================
  return (
    <div className="space-y-4">
      {leaderboard.map((item, index) => (
        <LeaderboardItem key={item.user.id} rank={index + 1} item={item} />
      ))}
    </div>
  );
}

export default LeaderboardList;
