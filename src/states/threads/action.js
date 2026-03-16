import toast from 'react-hot-toast';
import {
  getThreads,
  getAllUsers,
  createThread,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
} from '../../utils/api';

// =================
// ACTION TYPES
// =================
export const RECEIVE_THREADS = 'RECEIVE_THREADS';
export const ADD_THREAD = 'ADD_THREAD';

export const THREADS_OPTIMISTIC_VOTE = 'THREADS_OPTIMISTIC_VOTE';
export const THREADS_VOTE_FAILED = 'THREADS_VOTE_FAILED';

// =================
// ACTION CREATORS
// =================

function receiveThreadsActionCreator(threads) {
  return {
    type: RECEIVE_THREADS,
    payload: { threads },
  };
}

export function addThreadActionCreator(thread) {
  return {
    type: ADD_THREAD,
    payload: { thread },
  };
}

// =================
// HELPER (supaya owner tidak hilang)
// =================

async function enrichThreadsWithOwner() {
  const [threads, users] = await Promise.all([getThreads(), getAllUsers()]);

  return threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
  }));
}

// =================
// GET THREADS (INITIAL LOAD)
// =================

export function asyncReceiveThreads() {
  return async (dispatch) => {
    try {
      const threadsWithOwner = await enrichThreadsWithOwner();
      dispatch(receiveThreadsActionCreator(threadsWithOwner));
    } catch (error) {
      toast.error(error.message || 'Failed to load threads');
    }
  };
}

// =================
// CREATE THREAD
// =================

export function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      await createThread({ title, body, category });

      // reload + enrich supaya owner tetap ada
      const threadsWithOwner = await enrichThreadsWithOwner();
      dispatch(receiveThreadsActionCreator(threadsWithOwner));

      toast.success('Thread created successfully');
    } catch (error) {
      toast.error(error.message || 'Login required');
    }
  };
}

// =================
// VOTE THREAD (OPTIMISTIC)
// =================

export function asyncToggleUpVoteThread(id) {
  return async (dispatch, getState) => {
    const authUser = getState().auth.authUser;

    if (!authUser) {
      toast.error('Login required');
      return;
    }

    const prevState = getState().threads;
    const userId = authUser.id;

    dispatch({
      type: THREADS_OPTIMISTIC_VOTE,
      payload: { threadId: id, userId, voteType: 'up' },
    });

    try {
      await upVoteThread(id);
    } catch (error) {
      dispatch({
        type: THREADS_VOTE_FAILED,
        payload: { prevState },
      });
      toast.error(error.message || 'Failed to vote');
    }
  };
}

export function asyncToggleDownVoteThread(id) {
  return async (dispatch, getState) => {
    const prevState = getState().threads;
    const authUser = getState().auth.authUser;

    if (!authUser) {
      toast.error('Login required');
      return;
    }

    const userId = authUser.id;

    dispatch({
      type: THREADS_OPTIMISTIC_VOTE,
      payload: { threadId: id, userId, voteType: 'down' },
    });

    try {
      await downVoteThread(id);
    } catch (error) {
      dispatch({
        type: THREADS_VOTE_FAILED,
        payload: { prevState },
      });
      toast.error(error.message || 'Failed to vote');
    }
  };
}

export function asyncNeutralVoteThread(id) {
  return async (dispatch, getState) => {
    const prevState = getState().threads;
    const authUser = getState().auth.authUser;

    if (!authUser) {
      toast.error('Login required');
      return;
    }

    const userId = authUser.id;

    dispatch({
      type: THREADS_OPTIMISTIC_VOTE,
      payload: { threadId: id, userId, voteType: 'neutral' },
    });

    try {
      await neutralVoteThread(id);
    } catch (error) {
      dispatch({
        type: THREADS_VOTE_FAILED,
        payload: { prevState },
      });
      toast.error(error.message || 'Failed to vote');
    }
  };
}