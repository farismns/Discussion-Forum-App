import { putAccessToken, login, register, getOwnProfile, removeAccessToken } from '../../utils/api';
import toast from 'react-hot-toast';

// =================
// ACTION TYPES
// =================
const SET_AUTH_USER = 'SET_AUTH_USER';
const UNSET_AUTH_USER = 'UNSET_AUTH_USER';
const SET_PRELOADING = 'SET_PRELOADING';

// =================
// ACTION CREATORS
// =================
function setAuthUserActionCreator(authUser) {
  return {
    type: SET_AUTH_USER,
    payload: { authUser },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: UNSET_AUTH_USER,
  };
}

function setPreloadingActionCreator(isPreloading) {
  return {
    type: SET_PRELOADING,
    payload: { isPreloading },
  };
}

// =================
// PRELOAD
// =================
function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(setPreloadingActionCreator(true));

    try {
      const token = localStorage.getItem('accessToken');

      if (token) {
        putAccessToken(token);
        const profile = await getOwnProfile();
        dispatch(setAuthUserActionCreator(profile));
      } else {
        dispatch(unsetAuthUserActionCreator());
      }
    } catch {
      dispatch(unsetAuthUserActionCreator());
    } finally {
      dispatch(setPreloadingActionCreator(false));
    }
  };
}

// =================
// LOGIN
// =================
function asyncLogin({ email, password }) {
  return async (dispatch) => {
    const token = await login({ email, password }); // kalau gagal akan throw

    putAccessToken(token);

    const user = await getOwnProfile();
    dispatch(setAuthUserActionCreator(user));
  };
}

// =================
// REGISTER
// =================
function asyncRegister({ name, email, password }) {
  return async () => {
    await register({ name, email, password });
  };
}

// =================
// LOGOUT
// =================
function asyncLogout() {
  return (dispatch) => {
    removeAccessToken();
    dispatch(unsetAuthUserActionCreator());

    toast.success('You have been logged out', {
      icon: '👋',
    });
  };
}

// =================
// EXPORT
// =================
export { SET_AUTH_USER, UNSET_AUTH_USER, SET_PRELOADING, setAuthUserActionCreator, unsetAuthUserActionCreator, setPreloadingActionCreator, asyncPreloadProcess, asyncLogin, asyncRegister, asyncLogout };
