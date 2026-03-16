import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetails/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  threads: threadsReducer,
  threadDetail: threadDetailReducer,
  leaderboards: leaderboardsReducer,
});

export default rootReducer;
