import { SET_AUTH_USER, UNSET_AUTH_USER, SET_PRELOADING } from './action';

const initialState = {
  authUser: null,
  isPreloading: true,
};

function authReducer(state = initialState, action = {}) {
  switch (action.type) {
  case SET_AUTH_USER:
    return {
      ...state,
      authUser: action.payload.authUser,
    };

  case UNSET_AUTH_USER:
    return {
      ...state,
      authUser: null,
    };

  case SET_PRELOADING:
    return {
      ...state,
      isPreloading: action.payload.isPreloading,
    };

  default:
    return state;
  }
}

export default authReducer;
