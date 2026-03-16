import toast from 'react-hot-toast';
import {
  getThreadDetail,
  createComment,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
} from '../../utils/api';

// ========================
// ACTION TYPES
// ========================
export const RECEIVE_THREAD_DETAIL = 'RECEIVE_THREAD_DETAIL';

export const OPTIMISTIC_TOGGLE_THREAD_VOTE = 'OPTIMISTIC_TOGGLE_THREAD_VOTE';
export const OPTIMISTIC_TOGGLE_COMMENT_VOTE = 'OPTIMISTIC_TOGGLE_COMMENT_VOTE';
export const THREAD_DETAIL_VOTE_FAILED = 'THREAD_DETAIL_VOTE_FAILED';

// ========================
// ACTION CREATOR
// ========================
function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

// ========================
// GET THREAD DETAIL
// ========================
export function asyncReceiveThreadDetail(id) {
  return async (dispatch) => {
    try {
      const detailThread = await getThreadDetail(id);
      dispatch(receiveThreadDetailActionCreator(detailThread));
    } catch (error) {
      toast.error(error.message || 'Failed to load thread');
    }
  };
}

// ========================
// CREATE COMMENT (boleh tetap reload)
// ========================
export function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      await createComment({ threadId, content });

      toast.success('Comment posted successfully');
      dispatch(asyncReceiveThreadDetail(threadId));
    } catch (error) {
      toast.error('You must login to comment');
      throw error;
    }
  };
}

// ========================
// VOTE THREAD (DETAIL)
// ========================
export function asyncToggleUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const prevState = getState().threadDetail;
    const authUser = getState().auth.authUser;

    if (!authUser) {
      toast.error('Login required');
      return;
    }

    const userId = authUser.id;

    dispatch({
      type: OPTIMISTIC_TOGGLE_THREAD_VOTE,
      payload: { userId, voteType: 'up' },
    });

    try {
      await upVoteThread(threadId);
    } catch (error) {
      dispatch({
        type: THREAD_DETAIL_VOTE_FAILED,
        payload: { prevState },
      });
      toast.error(error.message || 'Failed to vote');
    }
  };
}

export function asyncToggleDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const prevState = getState().threadDetail;
    const authUser = getState().auth.authUser;

    if (!authUser) {
      toast.error('Login required');
      return;
    }

    const userId = authUser.id;

    dispatch({
      type: OPTIMISTIC_TOGGLE_THREAD_VOTE,
      payload: { userId, voteType: 'down' },
    });

    try {
      await downVoteThread(threadId);
    } catch (error) {
      dispatch({
        type: THREAD_DETAIL_VOTE_FAILED,
        payload: { prevState },
      });
      toast.error(error.message || 'Failed to vote');
    }
  };
}

export function asyncNeutralVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const prevState = getState().threadDetail;
    const authUser = getState().auth.authUser;

    if (!authUser) {
      toast.error('Login required');
      return;
    }

    const userId = authUser.id;

    dispatch({
      type: OPTIMISTIC_TOGGLE_THREAD_VOTE,
      payload: { userId, voteType: 'neutral' },
    });

    try {
      await neutralVoteThread(threadId);
    } catch (error) {
      dispatch({
        type: THREAD_DETAIL_VOTE_FAILED,
        payload: { prevState },
      });
      toast.error(error.message || 'Failed to vote');
    }
  };
}

// ========================
// VOTE COMMENT
// ========================
export function asyncToggleUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const prevState = getState().threadDetail;
    const authUser = getState().auth.authUser;

    if (!authUser) {
      toast.error('Login required');
      return;
    }

    const userId = authUser.id;

    dispatch({
      type: OPTIMISTIC_TOGGLE_COMMENT_VOTE,
      payload: { commentId, userId, voteType: 'up' },
    });

    try {
      await upVoteComment(threadId, commentId);
    } catch (error) {
      dispatch({
        type: THREAD_DETAIL_VOTE_FAILED,
        payload: { prevState },
      });
      toast.error(error.message || 'Failed to vote');
    }
  };
}

export function asyncToggleDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const prevState = getState().threadDetail;
    const authUser = getState().auth.authUser;

    if (!authUser) {
      toast.error('Login required');
      return;
    }

    const userId = authUser.id;

    dispatch({
      type: OPTIMISTIC_TOGGLE_COMMENT_VOTE,
      payload: { commentId, userId, voteType: 'down' },
    });

    try {
      await downVoteComment(threadId, commentId);
    } catch (error) {
      dispatch({
        type: THREAD_DETAIL_VOTE_FAILED,
        payload: { prevState },
      });
      toast.error(error.message || 'Failed to vote');
    }
  };
}

export function asyncNeutralVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const prevState = getState().threadDetail;
    const authUser = getState().auth.authUser;

    if (!authUser) {
      toast.error('Login required');
      return;
    }

    const userId = authUser.id;

    dispatch({
      type: OPTIMISTIC_TOGGLE_COMMENT_VOTE,
      payload: { commentId, userId, voteType: 'neutral' },
    });

    try {
      await neutralVoteComment(threadId, commentId);
    } catch (error) {
      dispatch({
        type: THREAD_DETAIL_VOTE_FAILED,
        payload: { prevState },
      });
      toast.error(error.message || 'Failed to vote');
    }
  };
}