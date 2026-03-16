const RECEIVE_LEADERBOARDS = 'RECEIVE_LEADERBOARDS';

function leaderboardsReducer(leaderboards = null, action = {}) {
  switch (action.type) {
  case RECEIVE_LEADERBOARDS:
    return action.payload.leaderboards;

  default:
    return leaderboards;
  }
}

export default leaderboardsReducer;
export { RECEIVE_LEADERBOARDS };
