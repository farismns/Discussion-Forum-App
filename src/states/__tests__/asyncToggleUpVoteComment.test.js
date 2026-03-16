/**
 * asyncToggleUpVoteComment Thunk Test
 *
 * Skenario:
 * - should dispatch optimistic action and call API
 * - should rollback on failure
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  asyncToggleUpVoteComment,
  OPTIMISTIC_TOGGLE_COMMENT_VOTE,
  THREAD_DETAIL_VOTE_FAILED,
} from '../threadDetails/action';
import { upVoteComment } from '../../utils/api';

// Mock the API module
vi.mock('../../utils/api', () => ({
  upVoteComment: vi.fn(),
  downVoteComment: vi.fn(),
  neutralVoteComment: vi.fn(),
  upVoteThread: vi.fn(),
  downVoteThread: vi.fn(),
  neutralVoteThread: vi.fn(),
  getThreadDetail: vi.fn(),
  createComment: vi.fn(),
}));

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('asyncToggleUpVoteComment thunk', () => {
  const fakeThreadDetail = {
    id: 'thread-1',
    title: 'Thread Pertama',
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Komentar',
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  const fakeAuthUser = { id: 'user-1', name: 'User Test' };

  let dispatch;
  let getState;

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn(() => ({
      auth: { authUser: fakeAuthUser },
      threadDetail: fakeThreadDetail,
    }));
    vi.clearAllMocks();
  });

  it('should dispatch optimistic action', async () => {
    upVoteComment.mockResolvedValueOnce({});

    await asyncToggleUpVoteComment('thread-1', 'comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: OPTIMISTIC_TOGGLE_COMMENT_VOTE,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
        voteType: 'up',
      },
    });

    expect(upVoteComment).toHaveBeenCalledWith('thread-1', 'comment-1');
  });

  it('should rollback on failure', async () => {
    upVoteComment.mockRejectedValueOnce(new Error('Network error'));

    await asyncToggleUpVoteComment('thread-1', 'comment-1')(dispatch, getState);

    // Should dispatch optimistic first
    expect(dispatch).toHaveBeenCalledWith({
      type: OPTIMISTIC_TOGGLE_COMMENT_VOTE,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
        voteType: 'up',
      },
    });

    // Should rollback
    expect(dispatch).toHaveBeenCalledWith({
      type: THREAD_DETAIL_VOTE_FAILED,
      payload: { prevState: fakeThreadDetail },
    });
  });
});
