import { getLeaderboards } from '../../utils/api';
import { RECEIVE_LEADERBOARDS } from './reducer';

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: RECEIVE_LEADERBOARDS,
    payload: { leaderboards },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    const leaderboards = await getLeaderboards();
    dispatch(receiveLeaderboardsActionCreator(leaderboards));
  };
}

export { asyncReceiveLeaderboards };
