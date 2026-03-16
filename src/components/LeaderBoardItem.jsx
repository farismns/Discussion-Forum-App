function LeaderboardItem({ rank, item }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <span className="font-bold text-gray-700 dark:text-gray-300">#{rank}</span>

        {item.user.avatar && <img src={item.user.avatar} alt={item.user.name} className="w-10 h-10 rounded-full" />}

        <span className="text-gray-900 dark:text-white font-medium">{item.user.name}</span>
      </div>

      {/* Score */}
      <div className="text-indigo-600 font-bold">{item.score}</div>
    </div>
  );
}

export default LeaderboardItem;
